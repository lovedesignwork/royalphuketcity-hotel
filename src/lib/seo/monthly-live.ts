import type { SupabaseClient } from "@supabase/supabase-js";
import { classifyReferrer } from "@/lib/seo/channels";
import { countryName, toCountryCode } from "@/lib/seo/country-names";
import { fetchGa4Audience, isGa4Configured } from "@/lib/seo/ga4";
import {
  fetchGscByDimensions,
  isGscConfigured,
  type GscDimRow,
} from "@/lib/seo/gsc";
import type {
  LiveBucket,
  LiveChannel,
  LiveDevice,
  LiveHighlight,
  LiveKpis,
  LiveMonthlyReport,
  LivePage,
  LiveTrendPoint,
  MonthRef,
} from "@/lib/seo/monthly-types";

export type { LiveMonthlyReport } from "@/lib/seo/monthly-types";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const SKIP_PATH = (path: string) =>
  path.startsWith("/admin") ||
  path.startsWith("/api") ||
  path.startsWith("/_next");

interface PageViewRow {
  path: string;
  visitor_id: string | null;
  device: string | null;
  country: string | null;
  referrer: string | null;
  created_at: string;
}

interface MonthAgg {
  views: number;
  visitors: Set<string>;
  sessions: Map<string, number>;
  countries: Map<string, number>;
  devices: Map<string, number>;
  channels: Map<string, number>;
  pages: Map<string, { views: number; visitors: Set<string> }>;
}

function monthKey(d: Date): string {
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}`;
}

function monthBounds(key: string): { start: string; end: string; startDate: string; endDate: string } {
  const [y, m] = key.split("-").map(Number);
  const start = new Date(Date.UTC(y, m - 1, 1));
  const end = new Date(Date.UTC(y, m, 1));
  const last = new Date(Date.UTC(y, m, 0));
  return {
    start: start.toISOString(),
    end: end.toISOString(),
    startDate: start.toISOString().slice(0, 10),
    endDate: last.toISOString().slice(0, 10),
  };
}

function toMonthRef(key: string): MonthRef {
  const [y, m] = key.split("-").map(Number);
  return {
    key,
    label: `${MONTH_NAMES[m - 1]} ${y}`,
    short: `${MONTH_NAMES[m - 1].slice(0, 3)} ${String(y).slice(2)}`,
  };
}

function emptyAgg(): MonthAgg {
  return {
    views: 0,
    visitors: new Set(),
    sessions: new Map(),
    countries: new Map(),
    devices: new Map(),
    channels: new Map(),
    pages: new Map(),
  };
}

function bump(map: Map<string, number>, key: string, n = 1) {
  map.set(key, (map.get(key) || 0) + n);
}

function addView(agg: MonthAgg, row: PageViewRow) {
  if (SKIP_PATH(row.path || "/")) return;
  agg.views += 1;
  if (row.visitor_id) {
    agg.visitors.add(row.visitor_id);
    const day = row.created_at.slice(0, 10);
    const session = `${row.visitor_id}|${day}`;
    bump(agg.sessions, session);
  }
  const code = toCountryCode(row.country || "");
  if (code) bump(agg.countries, code);
  const device = row.device || "Desktop";
  bump(agg.devices, device);
  bump(agg.channels, classifyReferrer(row.referrer));
  const path = row.path || "/";
  const page = agg.pages.get(path) || { views: 0, visitors: new Set<string>() };
  page.views += 1;
  if (row.visitor_id) page.visitors.add(row.visitor_id);
  agg.pages.set(path, page);
}

function kpisFromAgg(agg: MonthAgg, gsc?: { clicks: number; impressions: number; ctr: number; position: number } | null): LiveKpis {
  const sessionHits = [...agg.sessions.values()];
  const sessionCount = sessionHits.length || 1;
  const bounced = sessionHits.filter((n) => n === 1).length;
  const organic = agg.channels.get("Organic search") || 0;
  const channelTotal = [...agg.channels.values()].reduce((a, b) => a + b, 0) || 1;
  return {
    visitors: agg.visitors.size,
    views: agg.views,
    bounce: sessionHits.length ? (bounced / sessionHits.length) * 100 : 0,
    pagesPerSession: agg.views / sessionCount,
    organicShare: (organic / channelTotal) * 100,
    clicks: gsc ? gsc.clicks : null,
    impressions: gsc ? gsc.impressions : null,
    ctr: gsc ? gsc.ctr * 100 : null,
    position: gsc ? gsc.position : null,
  };
}

function shareRows<T extends { sessions: number }>(rows: T[]): (T & { share: number })[] {
  const total = rows.reduce((a, r) => a + r.sessions, 0) || 1;
  return rows.map((r) => ({ ...r, share: (r.sessions / total) * 100 }));
}

function summarizeGsc(rows: GscDimRow[]) {
  let clicks = 0;
  let impressions = 0;
  let weighted = 0;
  for (const r of rows) {
    clicks += r.clicks;
    impressions += r.impressions;
    weighted += r.position * r.impressions;
  }
  return {
    clicks,
    impressions,
    ctr: impressions > 0 ? clicks / impressions : 0,
    position: impressions > 0 ? weighted / impressions : 0,
  };
}

function rankBuckets(rows: GscDimRow[]): { buckets: LiveBucket[]; total: number } {
  let top3 = 0;
  let toTen = 0;
  let toTwenty = 0;
  let toFifty = 0;
  let rest = 0;
  for (const r of rows) {
    const p = r.position;
    if (p <= 3) top3 += 1;
    else if (p <= 10) toTen += 1;
    else if (p <= 20) toTwenty += 1;
    else if (p <= 50) toFifty += 1;
    else rest += 1;
  }
  return {
    total: rows.length,
    buckets: [
      { label: "Top 3", count: top3, color: "#16a34a" },
      { label: "4 – 10", count: toTen, color: "#8B7355" },
      { label: "11 – 20", count: toTwenty, color: "#d97706" },
      { label: "21 – 50", count: toFifty, color: "#9ca3af" },
      { label: "51+", count: rest, color: "#e5e7eb" },
    ],
  };
}

async function fetchMonthViews(
  supabase: SupabaseClient,
  start: string,
  end: string
): Promise<PageViewRow[]> {
  const out: PageViewRow[] = [];
  const pageSize = 1000;
  let from = 0;
  for (;;) {
    const { data, error } = await supabase
      .from("page_views")
      .select("path, visitor_id, device, country, referrer, created_at")
      .gte("created_at", start)
      .lt("created_at", end)
      .order("created_at", { ascending: true })
      .range(from, from + pageSize - 1);
    if (error) throw new Error(error.message);
    const batch = (data || []) as PageViewRow[];
    out.push(...batch);
    if (batch.length < pageSize) break;
    from += pageSize;
  }
  return out;
}

function buildMonths(): MonthRef[] {
  const out: MonthRef[] = [];
  const now = new Date();
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const cursor = new Date(Date.UTC(2026, 3, 1)); // April 2026 — first month with real traffic
  while (cursor <= end) {
    out.push(toMonthRef(monthKey(cursor)));
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }
  return out;
}

export async function buildLiveMonthlyReport(
  supabase: SupabaseClient,
  month?: string
): Promise<LiveMonthlyReport> {
  const months = buildMonths();
  const selected =
    month && months.some((m) => m.key === month)
      ? month
      : months[months.length - 1]?.key || monthKey(new Date());

  const idx = Math.max(0, months.findIndex((m) => m.key === selected));
  const trendKeys = months.slice(Math.max(0, idx - 5), idx + 1);

  const viewAggs = new Map<string, MonthAgg>();
  const monthRows = await Promise.all(
    trendKeys.map(async (m) => {
      const { start, end } = monthBounds(m.key);
      const rows = await fetchMonthViews(supabase, start, end);
      const agg = emptyAgg();
      for (const row of rows) addView(agg, row);
      return [m.key, agg] as const;
    })
  );
  for (const [key, agg] of monthRows) viewAggs.set(key, agg);

  const selectedAgg = viewAggs.get(selected) || emptyAgg();
  const prevKey = idx > 0 ? months[idx - 1].key : null;
  const prevAgg = prevKey ? viewAggs.get(prevKey) : null;

  let gscByMonth = new Map<string, ReturnType<typeof summarizeGsc>>();
  let gscPages: GscDimRow[] = [];
  let buckets: LiveBucket[] | null = null;
  let queryCount = 0;
  let seoSource: "gsc" | null = null;

  if (isGscConfigured()) {
    try {
      const gscMonths = await Promise.all(
        trendKeys.map(async (m) => {
          const { startDate, endDate } = monthBounds(m.key);
          const rows = await fetchGscByDimensions(startDate, endDate, ["query"]);
          return { key: m.key, rows };
        })
      );
      for (const item of gscMonths) {
        if (item.rows.length) seoSource = "gsc";
        gscByMonth.set(item.key, summarizeGsc(item.rows));
        if (item.key === selected) {
          const ranked = rankBuckets(item.rows);
          buckets = ranked.buckets;
          queryCount = ranked.total;
        }
      }
      const { startDate, endDate } = monthBounds(selected);
      gscPages = await fetchGscByDimensions(startDate, endDate, ["page"]);
    } catch (err) {
      console.error("Live GSC monthly fetch failed:", err);
    }
  }

  let source: "ga4" | "page_views" = "page_views";
  let countries = shareRows(
    [...selectedAgg.countries.entries()]
      .map(([code, sessions]) => ({ code, name: countryName(code), sessions }))
      .sort((a, b) => b.sessions - a.sessions)
      .slice(0, 10)
  );
  let devices: LiveDevice[] = (() => {
    const total = [...selectedAgg.devices.values()].reduce((a, b) => a + b, 0) || 1;
    return ["Mobile", "Desktop", "Tablet"].map((label) => ({
      label,
      share: Math.round(((selectedAgg.devices.get(label) || 0) / total) * 100),
    }));
  })();
  let channels = shareRows(
    [...selectedAgg.channels.entries()]
      .map(([label, sessions]) => ({ label, sessions }))
      .sort((a, b) => b.sessions - a.sessions)
  );

  if (isGa4Configured()) {
    try {
      const { startDate, endDate } = monthBounds(selected);
      const ga = await fetchGa4Audience(startDate, endDate);
      if (ga.totals) {
        source = "ga4";
        countries = shareRows(
          ga.countries
            .map((r) => {
              const code = toCountryCode(r.keys[0] || "") || r.keys[0] || "";
              return { code, name: countryName(code), sessions: r.sessions };
            })
            .filter((r) => r.code)
            .sort((a, b) => b.sessions - a.sessions)
            .slice(0, 10)
        );
        const deviceTotal = ga.devices.reduce((a, r) => a + r.sessions, 0) || 1;
        devices = ["mobile", "desktop", "tablet"].map((key) => {
          const row = ga.devices.find((d) => (d.keys[0] || "").toLowerCase() === key);
          return {
            label: key[0].toUpperCase() + key.slice(1),
            share: Math.round(((row?.sessions || 0) / deviceTotal) * 100),
          };
        });
        channels = shareRows(
          ga.channels
            .map((r) => ({ label: r.keys[0] || "Unassigned", sessions: r.sessions }))
            .sort((a, b) => b.sessions - a.sessions)
        );
      }
    } catch (err) {
      console.error("Live GA4 monthly fetch failed:", err);
    }
  }

  const selectedGsc = gscByMonth.get(selected) || null;
  const prevGsc = prevKey ? gscByMonth.get(prevKey) || null : null;
  const kpis = kpisFromAgg(selectedAgg, selectedGsc);
  const prev = prevAgg ? kpisFromAgg(prevAgg, prevGsc) : null;

  const gscPageMap = new Map(
    gscPages.map((r) => {
      try {
        const path = new URL(r.keys[0] || "/", "https://royalphuketcity.com").pathname;
        return [path, r] as const;
      } catch {
        return [r.keys[0] || "/", r] as const;
      }
    })
  );

  const pages: LivePage[] = [...selectedAgg.pages.entries()]
    .map(([page, info]) => {
      const gsc = gscPageMap.get(page);
      return {
        page,
        views: info.views,
        visitors: info.visitors.size,
        clicks: gsc ? gsc.clicks : null,
        ctr: gsc ? gsc.ctr * 100 : null,
        position: gsc ? gsc.position : null,
      };
    })
    .sort((a, b) => (b.clicks ?? b.views) - (a.clicks ?? a.views))
    .slice(0, 8);

  const highlights: LiveHighlight[] = [];
  if (prev) {
    const visitorDelta = kpis.visitors - prev.visitors;
    if (visitorDelta !== 0) {
      highlights.push({
        tone: visitorDelta > 0 ? "up" : "down",
        text: `Unique visitors ${visitorDelta > 0 ? "rose" : "fell"} from ${prev.visitors.toLocaleString()} to ${kpis.visitors.toLocaleString()} this month.`,
      });
    }
  }
  if (countries[0]) {
    highlights.push({
      tone: "info",
      text: `${countries[0].name} is the largest audience (${countries[0].share.toFixed(1)}%)${countries[1] ? `, then ${countries[1].name}` : ""}.`,
    });
  }
  if (channels[0]) {
    highlights.push({
      tone: "info",
      text: `${channels[0].label} brought ${channels[0].share.toFixed(1)}% of sessions.`,
    });
  }
  if (pages[0]) {
    highlights.push({
      tone: "up",
      text: `${pages[0].page} was the top landing page with ${pages[0].views.toLocaleString()} views.`,
    });
  }

  const trend: LiveTrendPoint[] = trendKeys.map((m) => {
    const agg = viewAggs.get(m.key) || emptyAgg();
    const gsc = gscByMonth.get(m.key) || null;
    return {
      key: m.key,
      label: m.label,
      short: m.short,
      visitors: agg.visitors.size,
      views: agg.views,
      clicks: gsc ? gsc.clicks : null,
      impressions: gsc ? gsc.impressions : null,
    };
  });

  return {
    configured: {
      gsc: isGscConfigured(),
      ga4: isGa4Configured(),
      pageViews: true,
    },
    source,
    seoSource,
    months,
    selected,
    kpis,
    prev,
    trend,
    countries,
    pages,
    devices,
    channels,
    buckets,
    queryCount,
    highlights,
  };
}
