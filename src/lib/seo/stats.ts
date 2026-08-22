import type { SupabaseClient } from "@supabase/supabase-js";
import { isGscConfigured } from "@/lib/seo/gsc";
import { isSerpConfigured } from "@/lib/seo/serp";

// Aggregation helpers shared by the SEO stats API and the monthly report
// email. All heavy lifting reads from the local seo_* tables (no external
// API calls), so it's cheap to call often.

export interface GscDailyRow {
  date: string;
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GscTotals {
  clicks: number;
  impressions: number;
  ctr: number; // 0..1
  position: number; // impression-weighted average
}

export interface KeywordStat {
  id: string;
  keyword: string;
  target_url: string | null;
  location: string;
  active: boolean;
  current: number | null;
  best: number | null;
  previous7: number | null;
  previous30: number | null;
  history: { date: string; position: number | null }[];
}

export interface MonthBucket {
  month: string; // YYYY-MM
  label: string; // e.g. "Aug 2026"
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface SeoStats {
  configured: { gsc: boolean; serp: boolean };
  generatedAt: string;
  keywords: KeywordStat[];
  gsc: {
    range: string;
    totals: GscTotals;
    previous: GscTotals;
    daily: { date: string; clicks: number; impressions: number; position: number }[];
    topQueries: (GscTotals & { query: string })[];
    topPages: (GscTotals & { page: string })[];
  };
  monthlyTrend: MonthBucket[];
}

const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function toDateString(d: Date): string {
  return d.toISOString().split("T")[0];
}

function monthLabel(key: string): string {
  const [y, m] = key.split("-");
  return `${MONTH_LABELS[parseInt(m, 10) - 1]} ${y}`;
}

// Impression-weighted average position + summed clicks/impressions.
function summarize(rows: GscDailyRow[]): GscTotals {
  let clicks = 0;
  let impressions = 0;
  let weightedPos = 0;
  for (const r of rows) {
    clicks += r.clicks;
    impressions += r.impressions;
    weightedPos += r.position * r.impressions;
  }
  return {
    clicks,
    impressions,
    ctr: impressions > 0 ? clicks / impressions : 0,
    position: impressions > 0 ? weightedPos / impressions : 0,
  };
}

// Page through all seo_gsc_daily rows on/after startDate (PostgREST caps each
// request at ~1000 rows, so we loop).
async function fetchGscDailySince(
  supabase: SupabaseClient,
  startDate: string
): Promise<GscDailyRow[]> {
  const out: GscDailyRow[] = [];
  const pageSize = 1000;
  let from = 0;

  for (;;) {
    const { data, error } = await supabase
      .from("seo_gsc_daily")
      .select("date, query, page, clicks, impressions, ctr, position")
      .gte("date", startDate)
      .order("date", { ascending: true })
      .range(from, from + pageSize - 1);

    if (error) throw new Error(error.message);
    const batch = (data || []) as GscDailyRow[];
    out.push(...batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }

  return out;
}

function rangeToDays(range: string): number {
  switch (range) {
    case "7d":
      return 7;
    case "90d":
      return 90;
    case "30d":
    default:
      return 30;
  }
}

export async function buildSeoStats(
  supabase: SupabaseClient,
  range = "30d"
): Promise<SeoStats> {
  const days = rangeToDays(range);
  const now = new Date();

  // GSC window + the equal-length window before it (for growth comparison).
  const currentStart = new Date(now);
  currentStart.setDate(currentStart.getDate() - days);
  const prevStart = new Date(now);
  prevStart.setDate(prevStart.getDate() - days * 2);

  // Pull enough history for the current + previous window AND the 6-month
  // trend, whichever is longer.
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  const earliest =
    prevStart < sixMonthsAgo ? prevStart : sixMonthsAgo;

  let allRows: GscDailyRow[] = [];
  try {
    allRows = await fetchGscDailySince(supabase, toDateString(earliest));
  } catch (err) {
    console.error("GSC daily fetch error:", err);
  }

  const currentStartStr = toDateString(currentStart);
  const prevStartStr = toDateString(prevStart);

  const currentRows = allRows.filter((r) => r.date >= currentStartStr);
  const previousRows = allRows.filter(
    (r) => r.date >= prevStartStr && r.date < currentStartStr
  );

  // Daily trend (current window).
  const dailyMap: Record<string, { clicks: number; impressions: number; weightedPos: number }> = {};
  for (const r of currentRows) {
    if (!dailyMap[r.date]) dailyMap[r.date] = { clicks: 0, impressions: 0, weightedPos: 0 };
    dailyMap[r.date].clicks += r.clicks;
    dailyMap[r.date].impressions += r.impressions;
    dailyMap[r.date].weightedPos += r.position * r.impressions;
  }
  const daily = Object.entries(dailyMap)
    .map(([date, d]) => ({
      date,
      clicks: d.clicks,
      impressions: d.impressions,
      position: d.impressions > 0 ? d.weightedPos / d.impressions : 0,
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  // Top queries / pages (current window).
  const topQueries = aggregateBy(currentRows, "query")
    .map((x) => ({ query: x.key, ...x.totals }))
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 25);

  const topPages = aggregateBy(currentRows, "page")
    .map((x) => ({ page: x.key, ...x.totals }))
    .sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions)
    .slice(0, 25);

  // 6-month trend.
  const monthMap: Record<string, GscDailyRow[]> = {};
  for (const r of allRows) {
    const key = r.date.slice(0, 7); // YYYY-MM
    (monthMap[key] ||= []).push(r);
  }
  const monthlyTrend: MonthBucket[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const totals = summarize(monthMap[key] || []);
    monthlyTrend.push({ month: key, label: monthLabel(key), ...totals });
  }

  // Keyword rankings.
  const keywords = await buildKeywordStats(supabase);

  return {
    configured: { gsc: isGscConfigured(), serp: isSerpConfigured() },
    generatedAt: now.toISOString(),
    keywords,
    gsc: {
      range,
      totals: summarize(currentRows),
      previous: summarize(previousRows),
      daily,
      topQueries,
      topPages,
    },
    monthlyTrend,
  };
}

function aggregateBy(
  rows: GscDailyRow[],
  key: "query" | "page"
): { key: string; totals: GscTotals }[] {
  const groups: Record<string, GscDailyRow[]> = {};
  for (const r of rows) {
    const k = r[key] || "(unknown)";
    (groups[k] ||= []).push(r);
  }
  return Object.entries(groups).map(([k, rs]) => ({ key: k, totals: summarize(rs) }));
}

async function buildKeywordStats(
  supabase: SupabaseClient
): Promise<KeywordStat[]> {
  const { data: keywords, error } = await supabase
    .from("seo_keywords")
    .select("id, keyword, target_url, location, active")
    .order("created_at", { ascending: true });

  if (error || !keywords || keywords.length === 0) return [];

  const { data: history } = await supabase
    .from("seo_rank_history")
    .select("keyword_id, checked_date, position")
    .order("checked_date", { ascending: true });

  const byKeyword: Record<string, { date: string; position: number | null }[]> = {};
  for (const h of history || []) {
    (byKeyword[h.keyword_id] ||= []).push({
      date: h.checked_date,
      position: h.position,
    });
  }

  const now = new Date();
  const sevenAgo = toDateString(new Date(now.getTime() - 7 * 864e5));
  const thirtyAgo = toDateString(new Date(now.getTime() - 30 * 864e5));

  return keywords.map((kw) => {
    const hist = byKeyword[kw.id] || [];
    const withPos = hist.filter((h) => h.position != null);

    const current = withPos.length ? withPos[withPos.length - 1].position! : null;
    const best = withPos.length
      ? Math.min(...withPos.map((h) => h.position!))
      : null;

    // Closest measurement on/before the 7d / 30d marker.
    const previous7 = pickNear(withPos, sevenAgo);
    const previous30 = pickNear(withPos, thirtyAgo);

    return {
      id: kw.id,
      keyword: kw.keyword,
      target_url: kw.target_url,
      location: kw.location,
      active: kw.active,
      current,
      best,
      previous7,
      previous30,
      history: hist,
    };
  });
}

// The position from the latest measurement on or before `marker`, else the
// earliest available (so week/month deltas still work with sparse history).
function pickNear(
  withPos: { date: string; position: number | null }[],
  marker: string
): number | null {
  if (!withPos.length) return null;
  let chosen: number | null = null;
  for (const h of withPos) {
    if (h.date <= marker) chosen = h.position;
  }
  return chosen ?? withPos[0].position;
}
