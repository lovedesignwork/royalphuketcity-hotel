export const ANALYTICS_BRANDS = [
  { id: "hotel", name: "Royal Phuket City" },
  { id: "yanlong", name: "Yan Long" },
  { id: "twist", name: "TWIST" },
  { id: "spa", name: "Royal Wellness Spa" },
] as const;
export type AnalyticsBrand = typeof ANALYTICS_BRANDS[number]["id"];
export const ANALYTICS_RANGES = [
  { value: "7d", label: "Last 7 days", days: 7 },
  { value: "30d", label: "Last 30 days", days: 30 },
  { value: "90d", label: "Last 90 days", days: 90 },
] as const;
export type AnalyticsRange = typeof ANALYTICS_RANGES[number]["value"];
export interface Ga4Breakdown { name: string; value: number; countryCode?: string }
export interface BrandAnalyticsReport {
  source: "Google Analytics 4";
  brand: AnalyticsBrand;
  propertyId: string;
  range: AnalyticsRange;
  startDate: string;
  endDate: string;
  timeZone: string;
  fetchedAt: string;
  totals: { views: number; users: number; sessions: number; engagementRate: number; bounceRate: number; keyEvents: number; averageSessionDuration: number };
  daily: { date: string; views: number }[];
  pages: { path: string; views: number; users: number }[];
  countries: Ga4Breakdown[];
  devices: Ga4Breakdown[];
  channels: Ga4Breakdown[];
  events: Ga4Breakdown[];
  downloads: { views: number; users: number } | null;
  warnings: string[];
}
