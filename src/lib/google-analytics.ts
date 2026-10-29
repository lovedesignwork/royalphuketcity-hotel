import { google, type analyticsdata_v1beta } from "googleapis";
import { ANALYTICS_RANGES, type AnalyticsBrand, type AnalyticsRange, type BrandAnalyticsReport } from "./ga4-types";

const SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const propertyVariables: Record<AnalyticsBrand, string> = {
  hotel: "GA4_HOTEL_PROPERTY_ID", yanlong: "GA4_YANLONG_PROPERTY_ID", twist: "GA4_TWIST_PROPERTY_ID", spa: "GA4_SPA_PROPERTY_ID",
};
export class AnalyticsError extends Error {
  constructor(public code: string, message: string, public status = 503) { super(message); }
}
export function analyticsProperty(brand: AnalyticsBrand) {
  const value = (process.env[propertyVariables[brand]] || (brand === "hotel" ? process.env.GA4_PROPERTY_ID : "") || "").trim().replace(/^properties\//, "");
  if (!/^\d+$/.test(value)) throw new AnalyticsError("property_missing", "This brand’s Google Analytics property has not been connected yet.");
  return value;
}
function reportingClient() {
  // A dedicated reporting identity takes precedence. Never mix credential pairs.
  const dedicated = process.env.GA4_SERVICE_ACCOUNT_EMAIL || process.env.GA4_PRIVATE_KEY;
  const email = dedicated ? process.env.GA4_SERVICE_ACCOUNT_EMAIL : process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = dedicated ? process.env.GA4_PRIVATE_KEY : process.env.GOOGLE_PRIVATE_KEY;
  if (email && key && key !== "[SENSITIVE]") {
    const auth = new google.auth.JWT({ email, key: key.replace(/\\n/g, "\n"), scopes: [SCOPE] });
    return google.analyticsdata({ version: "v1beta", auth });
  }
  if (!dedicated && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    const auth = new google.auth.GoogleAuth({ keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS, scopes: [SCOPE] });
    return google.analyticsdata({ version: "v1beta", auth });
  }
  throw new AnalyticsError("credentials_missing", "Google reporting access needs to be configured before this brand’s data can load.");
}
type Report = analyticsdata_v1beta.Schema$RunReportResponse;
type Request = analyticsdata_v1beta.Schema$RunReportRequest;
function metric(report: Report, index: number, rowIndex = 0) {
  const row = report.rows?.[rowIndex];
  if (!row) return 0; // A successful empty GA report is a genuine zero.
  const raw = row.metricValues?.[index]?.value;
  if (raw == null || !Number.isFinite(Number(raw))) throw new AnalyticsError("invalid_response", "Google Analytics returned an incomplete report. Please try again.", 502);
  return Number(raw);
}
function breakdown(report: Report) {
  return (report.rows || []).map((row, index) => ({ name: row.dimensionValues?.[0]?.value || "(not set)", value: metric(report, 0, index) }));
}
export function reportDates(days: number, timeZone: string, now: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone }).formatToParts(now);
  const part = (name: string) => parts.find((item) => item.type === name)!.value;
  const today = Date.UTC(Number(part("year")), Number(part("month")) - 1, Number(part("day")));
  return Array.from({ length: days }, (_, i) => new Date(today - (days - i) * 86400000).toISOString().slice(0, 10));
}
async function loadReport(brand: AnalyticsBrand, range: AnalyticsRange, propertyId: string): Promise<BrandAnalyticsReport> {
  const client = reportingClient();
  const days = ANALYTICS_RANGES.find((item) => item.value === range)!.days;
  const property = `properties/${propertyId}`;
  const request = (dimensions: string[], metrics: string[], limit = 10): Request => ({
    dateRanges: [{ startDate: `${days}daysAgo`, endDate: "yesterday" }],
    dimensions: dimensions.map((name) => ({ name })), metrics: metrics.map((name) => ({ name })),
    limit: String(limit), orderBys: dimensions.length ? [{ metric: { metricName: metrics[0] }, desc: true }] : undefined,
  });
  const reports: Request[] = [
    request([], ["screenPageViews", "totalUsers", "sessions", "engagementRate", "keyEvents", "bounceRate", "averageSessionDuration"]),
    { ...request(["date"], ["screenPageViews"], days), orderBys: [{ dimension: { dimensionName: "date" } }] },
    request(["pagePath"], ["screenPageViews", "totalUsers"]),
    request(["country", "countryId"], ["totalUsers"]),
    request(["sessionDefaultChannelGroup"], ["sessions"]),
    request(["deviceCategory"], ["totalUsers"]),
    request(["eventName"], ["eventCount"]),
  ];
  if (brand === "hotel") reports.push({
    ...request([], ["screenPageViews", "totalUsers"]),
    dimensionFilter: { filter: { fieldName: "pagePath", inListFilter: { values: ["/download-fact-sheets", "/download-fact-sheets/"] } } },
  });
  // Google accepts at most five reports in one batch.
  const batches = await Promise.all([reports.slice(0, 5), reports.slice(5)].map((requests) =>
    client.properties.batchRunReports({ property, requestBody: { requests } }, { timeout: 20000, retry: false })
  ));
  const result = batches.flatMap((batch) => batch.data.reports || []);
  if (result.length !== reports.length) throw new AnalyticsError("invalid_response", "Google Analytics returned an incomplete report. Please try again.", 502);
  const [totals, daily, pages, countries, channels, devices, events, downloads] = result;
  const timeZone = totals.metadata?.timeZone || "UTC";
  const now = new Date();
  const dates = reportDates(days, timeZone, now);
  const dailyMap = new Map((daily.rows || []).map((row, i) => [row.dimensionValues?.[0]?.value, metric(daily, 0, i)]));
  const warnings: string[] = [];
  if (result.some((item) => item.metadata?.subjectToThresholding)) warnings.push("Google may withhold some low-volume data to protect privacy.");
  if (result.some((item) => item.metadata?.dataLossFromOtherRow)) warnings.push("Google grouped some high-cardinality results into an ‘other’ row.");
  if (result.some((item) => item.metadata?.samplingMetadatas?.length)) warnings.push("Google used sampled data for one or more reports.");
  return {
    source: "Google Analytics 4", brand, propertyId, range, timeZone, startDate: dates[0], endDate: dates[dates.length - 1], fetchedAt: now.toISOString(),
    totals: { views: metric(totals, 0), users: metric(totals, 1), sessions: metric(totals, 2), engagementRate: metric(totals, 3), keyEvents: metric(totals, 4), bounceRate: metric(totals, 5), averageSessionDuration: metric(totals, 6) },
    daily: dates.map((date) => ({ date, views: dailyMap.get(date.replaceAll("-", "")) || 0 })),
    pages: (pages.rows || []).map((row, i) => ({ path: row.dimensionValues?.[0]?.value || "(not set)", views: metric(pages, 0, i), users: metric(pages, 1, i) })),
    countries: breakdown(countries).map((row, i) => ({ ...row, countryCode: countries.rows?.[i]?.dimensionValues?.[1]?.value || undefined })),
    devices: breakdown(devices), channels: breakdown(channels), events: breakdown(events),
    downloads: downloads ? { views: metric(downloads, 0), users: metric(downloads, 1) } : null,
    warnings,
  };
}
const cache = new Map<string, { expires: number; data: BrandAnalyticsReport }>();
const pending = new Map<string, Promise<BrandAnalyticsReport>>();
export async function getBrandAnalytics(brand: AnalyticsBrand, range: AnalyticsRange) {
  const propertyId = analyticsProperty(brand);
  const key = `${brand}:${propertyId}:${range}`;
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) return cached.data;
  const existing = pending.get(key);
  if (existing) return existing;
  const promise = loadReport(brand, range, propertyId).then((data) => {
    if (cache.size >= 24) cache.delete(cache.keys().next().value!);
    cache.set(key, { expires: Date.now() + 60000, data });
    return data;
  }).finally(() => pending.delete(key));
  pending.set(key, promise);
  return promise;
}
export function analyticsFailure(error: unknown) {
  if (error instanceof AnalyticsError) return error;
  const code = Number((error as { response?: { status?: number }; code?: number })?.response?.status || (error as { code?: number })?.code);
  if (code === 401 || code === 403) return new AnalyticsError("access_denied", "Google denied reporting access. Check the service account’s Viewer access and that the Google Analytics Data API is enabled.", 503);
  if (code === 404) return new AnalyticsError("property_not_found", "Google could not find this Analytics property. Check its numeric property ID.", 503);
  if (code === 429) return new AnalyticsError("quota_exceeded", "Google’s reporting quota is temporarily exhausted. Please try again shortly.", 429);
  return new AnalyticsError("report_unavailable", "Google Analytics could not be reached. Please try again shortly.", 502);
}
