"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";
import BrandMonthlyReports from "./monthly-report";

// ---------------------------------------------------------------------------
// Types (mirror /api/admin/seo/stats)
// ---------------------------------------------------------------------------
interface GscTotals {
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface KeywordStat {
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
interface MonthBucket {
  month: string;
  label: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}
interface SeoStats {
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

const BRAND = "#8B7355";

const LOCATION_CODES: Record<string, string> = {
  Thailand: "TH",
  "United States": "US",
};

// ---------------------------------------------------------------------------
// Small presentational helpers
// ---------------------------------------------------------------------------
function fmt(n: number): string {
  return n.toLocaleString();
}
function pct(n: number): string {
  return `${(n * 100).toFixed(1)}%`;
}
function pos(n: number | null): string {
  if (n == null) return "—";
  return n.toFixed(1);
}
function growth(current: number, previous: number): { text: string; up: boolean } | null {
  if (previous === 0) return current > 0 ? { text: "New", up: true } : null;
  const change = ((current - previous) / previous) * 100;
  if (!isFinite(change)) return null;
  return { text: `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`, up: change >= 0 };
}

// Rank line chart. Lower position = better, so the Y axis is inverted.
function RankSparkline({ history }: { history: { date: string; position: number | null }[] }) {
  const points = history.filter((h) => h.position != null) as { date: string; position: number }[];
  if (points.length < 2) {
    return <span className="text-xs text-gray-400">Not enough data</span>;
  }
  const w = 160;
  const h = 40;
  const positions = points.map((p) => p.position);
  const min = Math.min(...positions);
  const max = Math.max(...positions);
  const span = max - min || 1;
  const step = w / (points.length - 1);
  // Invert: best (min) at top.
  const coords = points.map((p, i) => {
    const x = i * step;
    const y = ((p.position - min) / span) * (h - 8) + 4;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const improving = points[points.length - 1].position <= points[0].position;
  const color = improving ? "#16a34a" : "#dc2626";
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {coords.map((c, i) => {
        const [x, y] = c.split(",");
        return <circle key={i} cx={x} cy={y} r={i === coords.length - 1 ? 3 : 1.5} fill={color} />;
      })}
    </svg>
  );
}

// Horizontal bar (impressions/clicks list).
function BarRow({ label, value, max, sub }: { label: string; value: number; max: number; sub?: string }) {
  const width = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="text-gray-700 truncate max-w-[70%]" title={label}>
          {label}
        </span>
        <span className="font-medium text-gray-900">
          {fmt(value)}
          {sub && <span className="text-gray-400 font-normal ml-1">{sub}</span>}
        </span>
      </div>
      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full" style={{ width: `${width}%`, backgroundColor: BRAND }} />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  delta,
  hint,
}: {
  label: string;
  value: string;
  delta?: { text: string; up: boolean } | null;
  hint?: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <div className="flex items-end gap-2 mt-1">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {delta && (
          <span
            className={`text-xs font-medium mb-1.5 px-1.5 py-0.5 rounded ${
              delta.up ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {delta.text}
          </span>
        )}
      </div>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
type Tab = "rankings" | "console" | "monthly";

// Flip to true to bring back the Keyword Rankings + Search Console tabs.
const SHOW_TRACKING_TABS = false;

export default function SeoPage() {
  const [stats, setStats] = useState<SeoStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState("30d");
  const [tab, setTab] = useState<Tab>(SHOW_TRACKING_TABS ? "rankings" : "monthly");
  const [syncing, setSyncing] = useState(false);
  const [syncMsg, setSyncMsg] = useState<string | null>(null);

  // Add-keyword form
  const [newKeyword, setNewKeyword] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newLocation, setNewLocation] = useState("Thailand");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/seo/stats?range=${range}`);
      if (res.ok) setStats(await res.json());
    } catch (err) {
      console.error("Failed to load SEO stats:", err);
    } finally {
      setLoading(false);
    }
  }, [range]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  async function addKeyword(e: React.FormEvent) {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    setAdding(true);
    setAddError(null);
    try {
      const res = await fetch("/api/admin/seo/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword: newKeyword,
          target_url: newUrl,
          location: newLocation,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAddError(data.error || "Failed to add keyword");
      } else {
        setNewKeyword("");
        setNewUrl("");
        await fetchStats();
      }
    } catch {
      setAddError("Network error");
    } finally {
      setAdding(false);
    }
  }

  async function toggleKeyword(id: string, active: boolean) {
    await fetch("/api/admin/seo/keywords", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, active }),
    });
    await fetchStats();
  }

  async function deleteKeyword(id: string) {
    if (!confirm("Remove this keyword and its rank history?")) return;
    await fetch(`/api/admin/seo/keywords?id=${id}`, { method: "DELETE" });
    await fetchStats();
  }

  async function runSync(backfill: boolean) {
    setSyncing(true);
    setSyncMsg(null);
    try {
      const res = await fetch("/api/admin/seo/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ backfill }),
      });
      const data = await res.json();
      if (res.ok) {
        let msg = `Synced: ${data.gscRowsUpserted} Search Console rows, ${data.ranksRecorded}/${data.keywordsChecked} keyword ranks.`;
        if (data.errors?.length) {
          msg += ` Warnings: ${data.errors.join(" | ")}`;
        }
        setSyncMsg(msg);
        await fetchStats();
      } else {
        setSyncMsg(data.error || "Sync failed");
      }
    } catch {
      setSyncMsg("Sync failed");
    } finally {
      setSyncing(false);
    }
  }

  const gsc = stats?.gsc;
  const clicksDelta = gsc ? growth(gsc.totals.clicks, gsc.previous.clicks) : null;
  const imprDelta = gsc ? growth(gsc.totals.impressions, gsc.previous.impressions) : null;
  // For average position, lower is better -> invert the "up" flag.
  const posDelta = useMemo(() => {
    if (!gsc || gsc.previous.position === 0) return null;
    const change = gsc.totals.position - gsc.previous.position;
    return { text: `${change >= 0 ? "+" : ""}${change.toFixed(1)}`, up: change <= 0 };
  }, [gsc]);

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-[#8B7355] border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SEO Rankings</h1>
          <p className="text-gray-500 mt-1">
            Google keyword positions & Search Console performance
          </p>
        </div>
        {SHOW_TRACKING_TABS && (
          <div className="flex items-center gap-3">
            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
            >
              <option value="7d">📅 Last 7 Days</option>
              <option value="30d">📅 Last 30 Days</option>
              <option value="90d">📅 Last 90 Days</option>
            </select>
            <button
              onClick={() => runSync(false)}
              disabled={syncing}
              className="px-4 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#75613f] transition-colors disabled:opacity-60 text-sm font-medium"
            >
              {syncing ? "Syncing…" : "Sync now"}
            </button>
          </div>
        )}
      </div>

      {syncMsg && (
        <div className="rounded-lg border border-[#8B7355]/30 bg-[#8B7355]/5 px-4 py-3 text-sm text-gray-700">
          {syncMsg}
        </div>
      )}

      {/* Tabs */}
      {SHOW_TRACKING_TABS && (
        <div className="flex gap-1 border-b border-gray-200">
          {([
            ["rankings", "Keyword Rankings"],
            ["console", "Search Console"],
            ["monthly", "Monthly Report"],
          ] as [Tab, string][]).map(([id, label]) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
                tab === id
                  ? "border-[#8B7355] text-[#8B7355]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {tab === "rankings" && (
        <RankingsTab
          stats={stats}
          newKeyword={newKeyword}
          setNewKeyword={setNewKeyword}
          newUrl={newUrl}
          setNewUrl={setNewUrl}
          newLocation={newLocation}
          setNewLocation={setNewLocation}
          adding={adding}
          addError={addError}
          addKeyword={addKeyword}
          toggleKeyword={toggleKeyword}
          deleteKeyword={deleteKeyword}
        />
      )}

      {tab === "console" && (
        <ConsoleTab
          stats={stats}
          clicksDelta={clicksDelta}
          imprDelta={imprDelta}
          posDelta={posDelta}
        />
      )}

      {tab === "monthly" && <MonthlyTab onBackfill={() => runSync(true)} syncing={syncing} />}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Keyword rankings
// ---------------------------------------------------------------------------
function RankDelta({ current, previous }: { current: number | null; previous: number | null }) {
  if (current == null || previous == null) return <span className="text-gray-400 text-xs">—</span>;
  const diff = previous - current; // positive = moved up (better)
  if (diff === 0) return <span className="text-gray-400 text-xs">0</span>;
  const up = diff > 0;
  return (
    <span className={`text-xs font-medium ${up ? "text-green-600" : "text-red-600"}`}>
      {up ? "▲" : "▼"} {Math.abs(diff).toFixed(0)}
    </span>
  );
}

function RankingsTab({
  stats,
  newKeyword,
  setNewKeyword,
  newUrl,
  setNewUrl,
  newLocation,
  setNewLocation,
  adding,
  addError,
  addKeyword,
  toggleKeyword,
  deleteKeyword,
}: {
  stats: SeoStats | null;
  newKeyword: string;
  setNewKeyword: (v: string) => void;
  newUrl: string;
  setNewUrl: (v: string) => void;
  newLocation: string;
  setNewLocation: (v: string) => void;
  adding: boolean;
  addError: string | null;
  addKeyword: (e: React.FormEvent) => void;
  toggleKeyword: (id: string, active: boolean) => void;
  deleteKeyword: (id: string) => void;
}) {
  const keywords = stats?.keywords || [];
  return (
    <div className="space-y-6">
      {/* Add keyword */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Track a new keyword</h2>
        <form onSubmit={addKeyword} className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Keyword</label>
            <input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              placeholder="e.g. hotel phuket old town"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B7355]"
            />
          </div>
          <div className="flex-1 min-w-[220px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">
              Target URL <span className="text-gray-400">(optional)</span>
            </label>
            <input
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              placeholder="defaults to your site"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B7355]"
            />
          </div>
          <div className="min-w-[140px]">
            <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
            <select
              value={newLocation}
              onChange={(e) => setNewLocation(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-[#8B7355]"
            >
              <option value="Thailand">🇹🇭 Thailand</option>
              <option value="United States">🇺🇸 United States</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={adding}
            className="px-5 py-2 bg-[#8B7355] text-white rounded-lg hover:bg-[#75613f] transition-colors disabled:opacity-60 font-medium"
          >
            {adding ? "Adding…" : "Add"}
          </button>
        </form>
        {addError && <p className="text-sm text-red-600 mt-2">{addError}</p>}
      </div>

      {/* Keyword table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left font-medium px-4 py-3">Keyword</th>
                <th className="text-center font-medium px-4 py-3">Current</th>
                <th className="text-center font-medium px-4 py-3">Best</th>
                <th className="text-center font-medium px-4 py-3">7d</th>
                <th className="text-center font-medium px-4 py-3">30d</th>
                <th className="text-center font-medium px-4 py-3">Trend</th>
                <th className="text-right font-medium px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {keywords.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-4 py-10 text-center text-gray-400">
                    No keywords tracked yet. Add one above, then press
                    &nbsp;<strong>Sync now</strong> to fetch the first rankings.
                  </td>
                </tr>
              )}
              {keywords.map((kw) => (
                <tr key={kw.id} className={kw.active ? "" : "opacity-50"}>
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{kw.keyword}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1.5">
                      {LOCATION_CODES[kw.location] && (
                        <ReactCountryFlag
                          countryCode={LOCATION_CODES[kw.location]}
                          svg
                          style={{ width: "1.2em", height: "0.9em", borderRadius: "2px" }}
                          title={kw.location}
                        />
                      )}
                      <span>
                        {kw.location}
                        {kw.target_url ? ` · ${kw.target_url}` : ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="inline-flex items-center justify-center min-w-[2.5rem] px-2 py-1 rounded-lg bg-gray-100 font-semibold text-gray-900">
                      {kw.current == null ? "—" : `#${kw.current}`}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700">
                    {kw.best == null ? "—" : `#${kw.best}`}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <RankDelta current={kw.current} previous={kw.previous7} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <RankDelta current={kw.current} previous={kw.previous30} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center">
                      <RankSparkline history={kw.history} />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleKeyword(kw.id, !kw.active)}
                        className="text-xs px-2 py-1 rounded border border-gray-200 text-gray-600 hover:bg-gray-50"
                      >
                        {kw.active ? "Pause" : "Resume"}
                      </button>
                      <button
                        onClick={() => deleteKeyword(kw.id)}
                        className="text-xs px-2 py-1 rounded border border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Search Console
// ---------------------------------------------------------------------------
function ConsoleTab({
  stats,
  clicksDelta,
  imprDelta,
  posDelta,
}: {
  stats: SeoStats | null;
  clicksDelta: { text: string; up: boolean } | null;
  imprDelta: { text: string; up: boolean } | null;
  posDelta: { text: string; up: boolean } | null;
}) {
  const gsc = stats?.gsc;
  if (!gsc) return null;
  const maxQueryClicks = Math.max(1, ...gsc.topQueries.map((q) => q.clicks));
  const maxPageClicks = Math.max(1, ...gsc.topPages.map((p) => p.clicks));
  const maxDaily = Math.max(1, ...gsc.daily.map((d) => d.impressions));

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="Clicks" value={fmt(gsc.totals.clicks)} delta={clicksDelta} hint="vs previous period" />
        <StatCard label="Impressions" value={fmt(gsc.totals.impressions)} delta={imprDelta} hint="vs previous period" />
        <StatCard label="Avg CTR" value={pct(gsc.totals.ctr)} />
        <StatCard
          label="Avg Position"
          value={pos(gsc.totals.position)}
          delta={posDelta}
          hint="lower is better"
        />
      </div>

      {/* Daily impressions trend */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="font-semibold text-gray-900 mb-4">Daily Impressions</h2>
        {gsc.daily.length === 0 ? (
          <p className="text-gray-400 text-sm">No Search Console data for this range yet.</p>
        ) : (
          <div className="flex items-end gap-1 h-40">
            {gsc.daily.map((d) => (
              <div key={d.date} className="flex-1 flex flex-col justify-end group relative">
                <div
                  className="w-full rounded-t transition-all"
                  style={{
                    height: `${(d.impressions / maxDaily) * 100}%`,
                    backgroundColor: BRAND,
                    minHeight: d.impressions > 0 ? "2px" : "0",
                  }}
                />
                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-900 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-10">
                  {d.date}: {fmt(d.impressions)} impr · {fmt(d.clicks)} clicks
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Top queries + pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Top Queries</h2>
          {gsc.topQueries.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet.</p>
          ) : (
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {gsc.topQueries.map((q) => (
                <BarRow
                  key={q.query}
                  label={q.query || "(anonymized)"}
                  value={q.clicks}
                  max={maxQueryClicks}
                  sub={`· #${q.position.toFixed(0)}`}
                />
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-4">Top Pages</h2>
          {gsc.topPages.length === 0 ? (
            <p className="text-gray-400 text-sm">No data yet.</p>
          ) : (
            <div className="space-y-1 max-h-96 overflow-y-auto">
              {gsc.topPages.map((p) => (
                <BarRow
                  key={p.page}
                  label={p.page.replace(/^https?:\/\/[^/]+/, "") || "/"}
                  value={p.clicks}
                  max={maxPageClicks}
                  sub={`· ${fmt(p.impressions)} impr`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Tab: Monthly report
// ---------------------------------------------------------------------------
function MonthlyTab({
  onBackfill,
  syncing,
}: {
  onBackfill: () => void;
  syncing: boolean;
}) {
  const [emailing, setEmailing] = useState(false);
  const [emailMsg, setEmailMsg] = useState<string | null>(null);

  async function emailReport() {
    setEmailing(true);
    setEmailMsg(null);
    try {
      const res = await fetch("/api/admin/seo/report", { method: "POST" });
      const data = await res.json();
      setEmailMsg(
        res.ok
          ? `Report for ${data.reportMonth} emailed to ${data.recipients?.join(", ")}.`
          : data.error || "Failed to send report"
      );
    } catch {
      setEmailMsg("Failed to send report");
    } finally {
      setEmailing(false);
    }
  }

  return (
    <div className="space-y-6">
      {SHOW_TRACKING_TABS && (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={emailReport}
            disabled={emailing}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-60"
          >
            {emailing ? "Sending…" : "Email report now"}
          </button>
          <button
            onClick={onBackfill}
            disabled={syncing}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-60"
          >
            {syncing ? "Importing…" : "Backfill 90 days of history"}
          </button>
        </div>
      )}
      {emailMsg && (
        <div className="rounded-lg border border-[#8B7355]/30 bg-[#8B7355]/5 px-4 py-2.5 text-sm text-gray-700">
          {emailMsg}
        </div>
      )}
      <BrandMonthlyReports />
    </div>
  );
}
