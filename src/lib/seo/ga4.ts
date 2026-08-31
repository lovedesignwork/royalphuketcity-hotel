import { google } from "googleapis";

const GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";

export function isGa4Configured(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GA4_PROPERTY_ID
  );
}

function getPrivateKey(): string {
  return (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
}

function getAnalyticsData() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: getPrivateKey(),
    scopes: [GA_SCOPE],
  });
  return google.analyticsdata({ version: "v1beta", auth });
}

function propertyName(): string {
  const id = (process.env.GA4_PROPERTY_ID || "").replace(/^properties\//, "");
  return `properties/${id}`;
}

export interface Ga4Row {
  keys: string[];
  sessions: number;
  users: number;
  bounceRate: number;
  views: number;
}

async function runReport(
  startDate: string,
  endDate: string,
  dimensions: string[],
  metrics: string[]
): Promise<Ga4Row[]> {
  if (!isGa4Configured()) return [];

  const analytics = getAnalyticsData();
  const res = await analytics.properties.runReport({
    property: propertyName(),
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      dimensions: dimensions.map((name) => ({ name })),
      metrics: metrics.map((name) => ({ name })),
      limit: "50",
    },
  });

  return (res.data.rows || []).map((row) => {
    const values = row.metricValues || [];
    return {
      keys: (row.dimensionValues || []).map((d) => d.value || ""),
      sessions: Number(values[0]?.value || 0),
      users: Number(values[1]?.value || 0),
      bounceRate: Number(values[2]?.value || 0),
      views: Number(values[3]?.value || 0),
    };
  });
}

export async function fetchGa4Audience(startDate: string, endDate: string) {
  const [countries, devices, channels, totals] = await Promise.all([
    runReport(startDate, endDate, ["countryId"], [
      "sessions",
      "totalUsers",
      "bounceRate",
      "screenPageViews",
    ]),
    runReport(startDate, endDate, ["deviceCategory"], [
      "sessions",
      "totalUsers",
      "bounceRate",
      "screenPageViews",
    ]),
    runReport(startDate, endDate, ["sessionDefaultChannelGroup"], [
      "sessions",
      "totalUsers",
      "bounceRate",
      "screenPageViews",
    ]),
    runReport(startDate, endDate, [], [
      "sessions",
      "totalUsers",
      "bounceRate",
      "screenPageViews",
    ]),
  ]);

  return { countries, devices, channels, totals: totals[0] || null };
}
