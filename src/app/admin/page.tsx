"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ArrowClockwise, EnvelopeSimple } from "@phosphor-icons/react";
import TrafficChart from "@/components/admin/TrafficChart";

interface VisitorStats {
  todayPageViews: number;
  todayUniqueVisitors: number;
  weeklyPageViews: number;
  monthlyPageViews: number;
  topPages: { path: string; views: number }[];
  recentVisitors: { id: string; path: string; timestamp: string; country?: string; device?: string }[];
  dailyStats: { date: string; views: number; visitors: number }[];
}
interface Inquiry { id: string; name: string; email: string; subject?: string; status?: string; created_at: string; }
interface DashboardData {
  stats: VisitorStats; inquiries: Inquiry[]; totalInquiries: number; newInquiries: number; updatedAt: Date;
}
const desks = [
  { name: "Yan Long", description: "Chinese dining", path: "yanlong" },
  { name: "TWIST", description: "Dining & events", path: "twist" },
  { name: "Royal Wellness Spa", description: "Spa & wellness", path: "spa" },
];
const format = (value: number | undefined) => value === undefined ? "—" : value.toLocaleString();
const date = (value: string) => new Date(value).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "Asia/Bangkok" });

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [refreshing, setRefreshing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controller = useRef<AbortController | null>(null);
  const fetchStats = useCallback(async () => {
    if (controller.current) return;
    const request = new AbortController();
    controller.current = request;
    setRefreshing(true);
    try {
      const responses = await Promise.all([
        "/api/admin/stats", "/api/admin/inquiries?limit=5", "/api/admin/inquiries?status=new&limit=1",
      ].map((url) => fetch(url, { signal: request.signal, cache: "no-store" })));
      if (responses.some((response) => !response.ok)) throw new Error("Dashboard request failed");
      const [stats, inquiries, newInquiries] = await Promise.all(responses.map((response) => response.json()));
      if (request.signal.aborted) return;
      setData({ stats, inquiries: inquiries.inquiries, totalInquiries: inquiries.total, newInquiries: newInquiries.total, updatedAt: new Date() });
      setError(null);
    } catch {
      if (!request.signal.aborted) setError("The overview couldn’t refresh. Please try again.");
    } finally {
      if (controller.current === request) {
        controller.current = null;
        if (!request.signal.aborted) setRefreshing(false);
      }
    }
  }, []);
  useEffect(() => {
    void fetchStats();
    const interval = setInterval(() => { if (!document.hidden) void fetchStats(); }, 30000);
    return () => { clearInterval(interval); controller.current?.abort(); controller.current = null; };
  }, [fetchStats]);
  const stats = data?.stats;
  return <div className="admin-overview">
    <div className="admin-page-heading">
      <div><h1>Overview</h1><p>A clear view of your hotel, dining and wellness inquiries.</p></div>
      <div className="admin-refresh-group"><span>{data ? `Updated ${data.updatedAt.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Bangkok" })}` : refreshing ? "Loading overview…" : "Not yet updated"}</span><button className="admin-icon-button" aria-label="Refresh overview" title="Refresh overview" onClick={fetchStats} disabled={refreshing}><ArrowClockwise size={18} className={refreshing ? "admin-refreshing" : ""} /></button></div>
    </div>
    {error && <div className="admin-error" role="alert"><span>{error} {data && "Showing the last successful update."}</span><button onClick={fetchStats} disabled={refreshing}>Retry</button></div>}
    <section className="admin-desks" aria-label="Restaurant and spa guest desks">
      <div className="admin-desks-intro"><span>Guest desks</span><p>Reservations & inquiries</p></div>
      {desks.map((desk) => <div className="admin-desk" key={desk.path}><div><h2>{desk.name}</h2><span>{desk.description}</span></div><div className="admin-desk-links"><Link href={`/admin/${desk.path}/reservations`} aria-label={`${desk.name} reservations`}>Reservations<ArrowUpRight size={13} aria-hidden="true" /></Link><Link href={`/admin/${desk.path}/inquiries`} aria-label={`${desk.name} inquiries`}>Inquiries<ArrowUpRight size={13} aria-hidden="true" /></Link></div></div>)}
    </section>
    <div className="admin-overview-grid">
      <div className="admin-overview-primary">
        <section aria-labelledby="traffic-heading">
          <div className="admin-section-heading"><h2 id="traffic-heading">Website performance</h2><Link href="/admin/analytics">Analytics<ArrowUpRight size={15} aria-hidden="true" /></Link></div>
          <div className="admin-metric-strip" aria-busy={!data && refreshing}>
            {[
              { label: "Page views", value: stats?.todayPageViews, period: "Today" },
              { label: "Unique visitors", value: stats?.todayUniqueVisitors, period: "Today" },
              { label: "Page views", value: stats?.weeklyPageViews, period: "Last 7 days" },
              { label: "Page views", value: stats?.monthlyPageViews, period: "Last 30 days" },
            ].map((metric, i) => <div className="admin-metric" key={i}><span>{metric.label}</span><strong>{format(metric.value)}</strong><small>{metric.period}</small></div>)}
          </div>
          <div className="admin-chart-panel"><div className="admin-chart-heading"><h3>Daily page views</h3><span>Last 14 days · UTC</span></div>{stats ? stats.dailyStats.length ? <TrafficChart data={stats.dailyStats} /> : <p className="admin-empty">No traffic recorded in this period.</p> : <div className="admin-chart-placeholder">{refreshing ? "Loading website activity…" : "Website activity is unavailable."}</div>}</div>
        </section>
        <section className="admin-visitors" aria-labelledby="visitors-heading">
          <div className="admin-section-heading"><h2 id="visitors-heading">Latest visits</h2><Link href="/admin/analytics">View activity<ArrowRight size={15} aria-hidden="true" /></Link></div>
          <div className="admin-table-wrap"><table className="admin-activity-table"><thead><tr><th>Page</th><th>Device</th><th>Time (ICT)</th></tr></thead><tbody>
            {stats?.recentVisitors.slice(0, 5).map((visitor) => <tr key={visitor.id}><td><span title={visitor.path}>{visitor.path === "/" ? "Homepage" : visitor.path}</span></td><td>{visitor.device || "Unknown"}<small>{visitor.country || "Unknown location"}</small></td><td>{date(visitor.timestamp)}<small>{new Date(visitor.timestamp).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Bangkok" })}</small></td></tr>)}
          </tbody></table></div>
          {!stats?.recentVisitors.length && <p className="admin-empty">{data ? "No recent visits recorded." : "Recent visits will appear here."}</p>}
        </section>
      </div>
      <div className="admin-overview-rail">
        <section className="admin-inquiries" aria-labelledby="inquiries-heading">
          <div className="admin-section-heading"><h2 id="inquiries-heading">Hotel inquiries</h2><span className="admin-total">{format(data?.totalInquiries)} total</span></div>
          <div className="admin-inquiry-callout"><EnvelopeSimple size={22} aria-hidden="true" /><div><strong>{data ? data.newInquiries ? `${format(data.newInquiries)} new ${data.newInquiries === 1 ? "inquiry" : "inquiries"}` : "No new inquiries" : "Checking your inbox…"}</strong><p>{data?.newInquiries ? "Ready for your team to review." : "Your latest guest messages, in one place."}</p></div></div>
          <Link className="admin-primary-link" href="/admin/inquiries">Open hotel inbox<ArrowRight size={16} aria-hidden="true" /></Link>
          <h3 className="admin-list-label">Latest messages</h3>
          <ul className="admin-inquiry-list">
            {data?.inquiries.slice(0, 4).map((inquiry) => <li key={inquiry.id}><div><strong>{inquiry.name}</strong><span className={`admin-status ${!inquiry.status || inquiry.status === "new" ? "admin-status-new" : ""}`}>{(inquiry.status || "new").replaceAll("_", " ")}</span></div><p title={inquiry.subject || "General inquiry"}>{inquiry.subject || "General inquiry"}</p><time dateTime={inquiry.created_at}>{date(inquiry.created_at)}</time></li>)}
          </ul>
          {!data?.inquiries.length && <p className="admin-empty">{data ? "No hotel inquiries yet." : "Messages will appear when the overview loads."}</p>}
        </section>
        <section className="admin-top-pages" aria-labelledby="pages-heading"><div className="admin-section-heading"><h2 id="pages-heading">Most visited pages</h2><span className="admin-total">Last 30 days</span></div><ol>{stats?.topPages.slice(0, 5).map((page, i) => <li key={page.path}><span className="admin-page-rank">{i + 1}</span><span title={page.path}>{page.path === "/" ? "Homepage" : page.path}</span><strong>{format(page.views)}</strong></li>)}</ol>{!stats?.topPages.length && <p className="admin-empty">{data ? "No page views recorded." : "Page rankings will appear here."}</p>}</section>
      </div>
    </div>
    <footer className="admin-overview-footer"><span>Royal Phuket City · Hotel workspace</span><span>Refreshes every 30 seconds while this tab is active</span></footer>
  </div>;
}
