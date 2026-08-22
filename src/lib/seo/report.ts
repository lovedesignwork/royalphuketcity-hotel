import type { SupabaseClient } from "@supabase/supabase-js";
import type { GscDailyRow } from "@/lib/seo/stats";

// Builds the monthly SEO report: the most recent complete calendar month vs
// the one before it, plus the biggest keyword movers. Used by the monthly
// email cron.

export interface MonthMetrics {
  label: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface KeywordMove {
  keyword: string;
  current: number | null;
  previous: number | null;
  change: number | null; // previous - current (positive = improved)
}

export interface MonthlyReport {
  reportMonthLabel: string;
  current: MonthMetrics;
  previous: MonthMetrics;
  topKeywords: KeywordMove[];
  improved: KeywordMove[];
  declined: KeywordMove[];
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function monthRange(year: number, month0: number): { start: string; end: string } {
  const start = new Date(Date.UTC(year, month0, 1));
  const end = new Date(Date.UTC(year, month0 + 1, 0)); // last day of month
  return {
    start: start.toISOString().split("T")[0],
    end: end.toISOString().split("T")[0],
  };
}

function summarize(rows: GscDailyRow[], label: string): MonthMetrics {
  let clicks = 0;
  let impressions = 0;
  let weightedPos = 0;
  for (const r of rows) {
    clicks += r.clicks;
    impressions += r.impressions;
    weightedPos += r.position * r.impressions;
  }
  return {
    label,
    clicks,
    impressions,
    ctr: impressions > 0 ? clicks / impressions : 0,
    position: impressions > 0 ? weightedPos / impressions : 0,
  };
}

async function fetchGscBetween(
  supabase: SupabaseClient,
  start: string,
  end: string
): Promise<GscDailyRow[]> {
  const out: GscDailyRow[] = [];
  const pageSize = 1000;
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from("seo_gsc_daily")
      .select("date, query, page, clicks, impressions, ctr, position")
      .gte("date", start)
      .lte("date", end)
      .range(from, from + pageSize - 1);
    if (error) throw new Error(error.message);
    const batch = (data || []) as GscDailyRow[];
    out.push(...batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }
  return out;
}

export async function buildMonthlyReport(
  supabase: SupabaseClient,
  reference: Date = new Date()
): Promise<MonthlyReport> {
  // Most recent complete month = the month before `reference`'s month.
  const curYear = reference.getUTCFullYear();
  const curMonth0 = reference.getUTCMonth();
  const reportDate = new Date(Date.UTC(curYear, curMonth0 - 1, 1));
  const prevDate = new Date(Date.UTC(curYear, curMonth0 - 2, 1));

  const reportRange = monthRange(reportDate.getUTCFullYear(), reportDate.getUTCMonth());
  const prevRange = monthRange(prevDate.getUTCFullYear(), prevDate.getUTCMonth());

  const reportLabel = `${MONTHS[reportDate.getUTCMonth()]} ${reportDate.getUTCFullYear()}`;
  const prevLabel = `${MONTHS[prevDate.getUTCMonth()]} ${prevDate.getUTCFullYear()}`;

  const [reportRows, prevRows] = await Promise.all([
    fetchGscBetween(supabase, reportRange.start, reportRange.end),
    fetchGscBetween(supabase, prevRange.start, prevRange.end),
  ]);

  const current = summarize(reportRows, reportLabel);
  const previous = summarize(prevRows, prevLabel);

  // Keyword movers: compare last measured position in each month.
  const topKeywords = await buildKeywordMoves(
    supabase,
    reportRange.end,
    prevRange.end
  );
  const improved = topKeywords
    .filter((k) => k.change != null && k.change > 0)
    .sort((a, b) => (b.change || 0) - (a.change || 0))
    .slice(0, 5);
  const declined = topKeywords
    .filter((k) => k.change != null && k.change < 0)
    .sort((a, b) => (a.change || 0) - (b.change || 0))
    .slice(0, 5);

  return {
    reportMonthLabel: reportLabel,
    current,
    previous,
    topKeywords,
    improved,
    declined,
  };
}

async function buildKeywordMoves(
  supabase: SupabaseClient,
  reportMonthEnd: string,
  prevMonthEnd: string
): Promise<KeywordMove[]> {
  const { data: keywords } = await supabase
    .from("seo_keywords")
    .select("id, keyword");
  if (!keywords || keywords.length === 0) return [];

  const { data: history } = await supabase
    .from("seo_rank_history")
    .select("keyword_id, checked_date, position")
    .order("checked_date", { ascending: true });

  const byKeyword: Record<string, { date: string; position: number | null }[]> = {};
  for (const h of history || []) {
    (byKeyword[h.keyword_id] ||= []).push({ date: h.checked_date, position: h.position });
  }

  const near = (arr: { date: string; position: number | null }[], marker: string) => {
    let chosen: number | null = null;
    for (const h of arr) {
      if (h.date <= marker && h.position != null) chosen = h.position;
    }
    return chosen;
  };

  return keywords.map((kw) => {
    const arr = byKeyword[kw.id] || [];
    const current = near(arr, reportMonthEnd);
    const previous = near(arr, prevMonthEnd);
    const change = current != null && previous != null ? previous - current : null;
    return { keyword: kw.keyword, current, previous, change };
  });
}

// ---------------------------------------------------------------------------
// Email HTML
// ---------------------------------------------------------------------------
function growthBadge(current: number, previous: number, lowerIsBetter = false): string {
  if (previous === 0) return current > 0 ? '<span style="color:#16a34a;">New</span>' : "—";
  const change = ((current - previous) / previous) * 100;
  const better = lowerIsBetter ? change < 0 : change > 0;
  const color = better ? "#16a34a" : "#dc2626";
  return `<span style="color:${color};">${change >= 0 ? "+" : ""}${change.toFixed(1)}%</span>`;
}

export function renderMonthlyReportHtml(report: MonthlyReport): string {
  const { current, previous } = report;
  const metricRow = (
    label: string,
    cur: string,
    prev: string,
    badge: string
  ) => `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;color:#333;font-weight:bold;">${label}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;color:#333;">${cur}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;color:#888;">${prev}</td>
      <td style="padding:10px 8px;border-bottom:1px solid #eee;font-weight:bold;">${badge}</td>
    </tr>`;

  const moverRow = (m: KeywordMove) => `
    <tr>
      <td style="padding:8px;border-bottom:1px solid #eee;color:#333;">${m.keyword}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;color:#333;">${m.current == null ? "—" : "#" + m.current}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;color:#888;">${m.previous == null ? "—" : "#" + m.previous}</td>
      <td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;color:${
        (m.change || 0) > 0 ? "#16a34a" : (m.change || 0) < 0 ? "#dc2626" : "#888"
      };">${m.change == null ? "—" : (m.change > 0 ? "▲ " : m.change < 0 ? "▼ " : "") + Math.abs(m.change)}</td>
    </tr>`;

  const moversSection =
    report.improved.length || report.declined.length
      ? `
    <h3 style="color:#333;border-bottom:1px solid #eee;padding-bottom:8px;margin-top:30px;">Keyword Movements</h3>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr style="background:#f9f9f9;">
        <th style="text-align:left;padding:8px;color:#666;">Keyword</th>
        <th style="text-align:left;padding:8px;color:#666;">Now</th>
        <th style="text-align:left;padding:8px;color:#666;">Prev</th>
        <th style="text-align:left;padding:8px;color:#666;">Change</th>
      </tr>
      ${[...report.improved, ...report.declined].map(moverRow).join("")}
    </table>`
      : "";

  return `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
    <div style="background-color:#8B7355;padding:24px;text-align:center;">
      <h1 style="color:white;margin:0;">Royal Phuket City Hotel</h1>
      <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;">Monthly SEO Report — ${report.reportMonthLabel}</p>
    </div>
    <div style="padding:30px;background:#ffffff;">
      <h2 style="color:#8B7355;margin-top:0;">Search Performance</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr style="background:#f9f9f9;">
          <th style="text-align:left;padding:8px;color:#666;">Metric</th>
          <th style="text-align:left;padding:8px;color:#666;">${current.label}</th>
          <th style="text-align:left;padding:8px;color:#666;">${previous.label}</th>
          <th style="text-align:left;padding:8px;color:#666;">Change</th>
        </tr>
        ${metricRow("Clicks", current.clicks.toLocaleString(), previous.clicks.toLocaleString(), growthBadge(current.clicks, previous.clicks))}
        ${metricRow("Impressions", current.impressions.toLocaleString(), previous.impressions.toLocaleString(), growthBadge(current.impressions, previous.impressions))}
        ${metricRow("Avg CTR", (current.ctr * 100).toFixed(2) + "%", (previous.ctr * 100).toFixed(2) + "%", growthBadge(current.ctr, previous.ctr))}
        ${metricRow("Avg Position", current.position.toFixed(1), previous.position.toFixed(1), growthBadge(current.position, previous.position, true))}
      </table>
      ${moversSection}
      <p style="color:#888;font-size:12px;margin-top:30px;">
        Generated automatically on ${new Date().toLocaleString("en-US", { dateStyle: "full" })}.
        View the live dashboard at /admin/seo.
      </p>
    </div>
    <div style="background-color:#1a1a2e;padding:16px;text-align:center;">
      <p style="color:rgba(255,255,255,0.5);margin:0;font-size:11px;">
        Royal Phuket City Hotel · Automated SEO report
      </p>
    </div>
  </div>`;
}
