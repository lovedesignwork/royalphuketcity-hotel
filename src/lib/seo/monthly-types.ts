export interface MonthRef {
  key: string;
  label: string;
  short: string;
}

export interface LiveKpis {
  visitors: number;
  views: number;
  bounce: number;
  pagesPerSession: number;
  organicShare: number;
  clicks: number | null;
  impressions: number | null;
  ctr: number | null;
  position: number | null;
}

export interface LiveCountry {
  code: string;
  name: string;
  sessions: number;
  share: number;
}

export interface LivePage {
  page: string;
  views: number;
  visitors: number;
  clicks: number | null;
  ctr: number | null;
  position: number | null;
}

export interface LiveChannel {
  label: string;
  sessions: number;
  share: number;
}

export interface LiveDevice {
  label: string;
  share: number;
}

export interface LiveBucket {
  label: string;
  count: number;
  color: string;
}

export interface LiveHighlight {
  tone: "up" | "down" | "info";
  text: string;
}

export interface LiveTrendPoint {
  key: string;
  label: string;
  short: string;
  visitors: number;
  views: number;
  clicks: number | null;
  impressions: number | null;
}

export interface LiveMonthlyReport {
  configured: { gsc: boolean; ga4: boolean; pageViews: boolean };
  source: "ga4" | "page_views";
  seoSource: "gsc" | null;
  months: MonthRef[];
  selected: string;
  kpis: LiveKpis;
  prev: LiveKpis | null;
  trend: LiveTrendPoint[];
  countries: LiveCountry[];
  pages: LivePage[];
  devices: LiveDevice[];
  channels: LiveChannel[];
  buckets: LiveBucket[] | null;
  queryCount: number;
  highlights: LiveHighlight[];
}
