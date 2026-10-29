"use client";

import { useEffect, useState } from "react";
import { ArrowClockwise, ArrowUpRight, ChartBar, Cursor, MagnifyingGlass, LinkSimple, UsersThree, Robot, GlobeHemisphereWest, Question, EnvelopeSimple, ShoppingBag, PlayCircle, Megaphone, SquaresFour, ChatText, Bell, Handshake, type Icon } from "@phosphor-icons/react";
import { Desktop, DeviceMobile, DeviceTablet, Television, Eye, SignIn, Heartbeat, MouseSimple, CalendarCheck, DownloadSimple, NotePencil, UserPlus, UserCheck, Lightning } from "@phosphor-icons/react";
import ReactCountryFlag from "react-country-flag";
import { StyledSelect } from "@/components/ui/StyledSelect";
import TrafficChart from "@/components/admin/TrafficChart";
import { ANALYTICS_BRANDS, ANALYTICS_RANGES, type AnalyticsBrand, type AnalyticsRange, type BrandAnalyticsReport, type Ga4Breakdown } from "@/lib/ga4-types";

const duration = (seconds: number) => {
  if (!Number.isFinite(seconds)) return "—";
  const rounded = Math.max(0, Math.round(seconds));
  return `${Math.floor(rounded / 60)}m ${String(rounded % 60).padStart(2, "0")}s`;
};
const count = (value: number) => value.toLocaleString();
const readableDate = (value: string) => new Date(`${value}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });
const channelIcons: Record<string, Icon> = {
  Direct: Cursor, "Organic Search": MagnifyingGlass, "Paid Search": MagnifyingGlass,
  Referral: LinkSimple, "Organic Social": UsersThree, "Paid Social": UsersThree,
  "AI Assistant": Robot, Email: EnvelopeSimple, Affiliates: Handshake,
  "Organic Shopping": ShoppingBag, "Paid Shopping": ShoppingBag,
  "Organic Video": PlayCircle, "Paid Video": PlayCircle, Audio: PlayCircle,
  Display: Megaphone, "Paid Other": Megaphone, "Cross-network": SquaresFour,
  SMS: ChatText, "Mobile Push Notifications": Bell, Unassigned: Question,
};
const deviceIcons: Record<string, Icon> = {
  desktop: Desktop, mobile: DeviceMobile, tablet: DeviceTablet, "smart tv": Television,
};
const eventIcons: Record<string, Icon> = {
  page_view: Eye, session_start: SignIn, user_engagement: Heartbeat,
  first_visit: UserPlus, click: Cursor, scroll: MouseSimple,
  reservation_click: CalendarCheck, file_download: DownloadSimple,
  form_start: NotePencil, form_submit: UserCheck, generate_lead: UserCheck,
};
type BreakdownIconKind = "country" | "channel" | "device" | "event";
function BreakdownIcon({ row, kind }: { row: Ga4Breakdown; kind: BreakdownIconKind }) {
  const [failed, setFailed] = useState(false);
  if (kind === "country") return <span className="ga-row-icon ga-country-flag" aria-hidden="true">
    {!failed && /^[A-Z]{2}$/.test(row.countryCode || "") && row.countryCode !== "ZZ"
      ? <ReactCountryFlag countryCode={row.countryCode!} svg alt="" style={{ width: 20, height: 15 }} onError={() => setFailed(true)} />
      : <GlobeHemisphereWest size={18} />}
  </span>;
  const RowIcon = kind === "device" ? deviceIcons[row.name.toLowerCase()] || Question
    : kind === "event" ? eventIcons[row.name] || Lightning
    : channelIcons[row.name] || Question;
  return <span className="ga-row-icon" aria-hidden="true"><RowIcon size={17} /></span>;
}
function Breakdown({ title, unit, rows, iconKind }: { title: string; unit: string; rows: Ga4Breakdown[]; iconKind?: BreakdownIconKind }) {
  return <section className="ga-report-panel"><div className="admin-section-heading"><h2>{title}</h2><span className="admin-total">{unit}</span></div>
    {rows.length ? <ol className="ga-breakdown">{rows.map((row) => <li key={row.name}><span className="ga-breakdown-label">{iconKind && <BreakdownIcon key={row.countryCode || row.name} row={row} kind={iconKind} />}<span>{row.name}</span></span><strong>{count(row.value)}</strong></li>)}</ol> : <p className="admin-empty">No data for this period.</p>}
  </section>;
}

export default function AnalyticsPage() {
  const [brand, setBrand] = useState<AnalyticsBrand>("hotel");
  const [range, setRange] = useState<AnalyticsRange>("7d");
  const [report, setReport] = useState<BrandAnalyticsReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [failure, setFailure] = useState<{ code: string; message: string } | null>(null);
  const [refresh, setRefresh] = useState(0);
  const name = ANALYTICS_BRANDS.find((item) => item.id === brand)!.name;

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setFailure(null);
    (async () => {
      try {
        const response = await fetch(`/api/admin/analytics?brand=${brand}&range=${range}`, { signal: controller.signal, cache: "no-store" });
        const body = await response.json();
        if (controller.signal.aborted) return;
        if (!response.ok) {
          setFailure({ code: body.code || "request_failed", message: body.error || "Google Analytics could not load. Please try again." });
          return;
        }
        setReport(body);
      } catch {
        if (!controller.signal.aborted) setFailure({ code: "network_error", message: "The reporting request couldn’t complete. Check your connection and try again." });
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [brand, range, refresh]);
  // Never display another brand's previous report while a new request is pending.
  const current = report?.brand === brand && report.range === range ? report : null;
  const setupRequired = failure && ["property_missing", "credentials_missing", "access_denied", "property_not_found"].includes(failure.code);

  return <div className="admin-overview ga-page">
    <div className="admin-page-heading"><div><h1>Analytics</h1><p>Google Analytics reports for your hotel, dining and wellness brands.</p></div><span className="ga-source"><ChartBar size={16} aria-hidden="true" />Google Analytics 4</span></div>
    <div className="ga-toolbar">
      <nav className="ga-brand-tabs" aria-label="Analytics brand">{ANALYTICS_BRANDS.map((item) => <button key={item.id} aria-pressed={brand === item.id} onClick={() => setBrand(item.id)}>{item.name}</button>)}</nav>
      <div className="ga-period"><StyledSelect label="Reporting period" value={range} onChange={(value) => setRange(value as AnalyticsRange)} options={ANALYTICS_RANGES.map(({ value, label }) => ({ value, label }))} /><button className="admin-icon-button" aria-label="Refresh Google Analytics" title="Refresh Google Analytics" disabled={loading} onClick={() => setRefresh((value) => value + 1)}><ArrowClockwise size={19} className={loading ? "admin-refreshing" : ""} /></button></div>
    </div>
    {failure && <div className="ga-connection-state" role="alert"><h2>{setupRequired ? `${name} needs a Google Analytics connection` : "The report couldn’t refresh"}</h2><p>{failure.message}</p>{current && <p>Showing the last successful report below.</p>}<button className="ga-secondary-button" disabled={loading} onClick={() => setRefresh((value) => value + 1)}>{loading ? "Checking…" : "Check again"}</button><p className="ga-source-note">This page only displays data returned by Google Analytics. An unavailable connection is never shown as zero traffic.</p></div>}
    {loading && !current && <div className="ga-loading" role="status"><ChartBar size={28} aria-hidden="true" /><p>Loading {name} from Google Analytics…</p></div>}
    {current && <>
      <div className="ga-report-context"><div><h2>{name}</h2><p>{readableDate(current.startDate)} – {readableDate(current.endDate)} · {current.timeZone}</p></div><a href={`https://analytics.google.com/analytics/web/#/p${current.propertyId}/reports/intelligenthome`} target="_blank" rel="noopener noreferrer">Open in Google Analytics<ArrowUpRight size={15} aria-hidden="true" /></a></div>
      {current.warnings.length > 0 && <div className="ga-data-notes">{current.warnings.map((warning) => <p key={warning}>{warning}</p>)}</div>}
      <div className="admin-metric-strip ga-metrics" aria-busy={loading}>
        {[{ label: "Page views", value: count(current.totals.views), description: "Views recorded by GA4" }, { label: "Total users", value: count(current.totals.users), description: "Users across this period" }, { label: "Sessions", value: count(current.totals.sessions), description: "Visits recorded by GA4" }, { label: "Avg. time on site", value: current.totals.sessions ? duration(current.totals.averageSessionDuration) : "—", description: "Average session duration" }, { label: "Bounce rate", value: `${(current.totals.bounceRate * 100).toFixed(1)}%`, description: "Sessions without engagement" }, { label: "Engagement rate", value: `${(current.totals.engagementRate * 100).toFixed(1)}%`, description: "Engaged sessions / sessions" }].map((metric) => <div className="admin-metric" key={metric.label}><span>{metric.label}</span><strong>{metric.value}</strong><small>{metric.description}</small></div>)}
      </div>
      {current.totals.views === 0 && current.totals.users === 0 && <p className="ga-data-notes">Google Analytics returned no visitors or page views for this property in the selected period.</p>}
      <section className="ga-traffic"><div className="admin-section-heading"><h2>Daily page views</h2><span className="admin-total">Complete days · {current.timeZone}</span></div><TrafficChart compact data={current.daily} label={`Daily page views for ${name} from ${current.startDate} to ${current.endDate}`} /></section>
      <div className="ga-report-grid">
        <section className="ga-report-panel"><div className="admin-section-heading"><h2>Most visited pages</h2><span className="admin-total">Top 10</span></div><div className="admin-table-wrap"><table className="ga-pages-table"><thead><tr><th>Page</th><th>Views</th><th>Users</th></tr></thead><tbody>{current.pages.map((page) => <tr key={page.path}><td title={page.path}>{page.path === "/" ? "Homepage" : page.path}</td><td>{count(page.views)}</td><td>{count(page.users)}</td></tr>)}</tbody></table></div>{!current.pages.length && <p className="admin-empty">No page views for this period.</p>}</section>
        <Breakdown title="Visitor countries" unit="Total users · top 10" rows={current.countries} iconKind="country" />
        <Breakdown title="Traffic sources" unit="Sessions" rows={current.channels} iconKind="channel" />
        <Breakdown title="Devices" unit="Total users" rows={current.devices} iconKind="device" />
        <Breakdown title="Events" unit="Event count · top 10" rows={current.events} iconKind="event" />
        <section className="ga-report-panel"><div className="admin-section-heading"><h2>Key events</h2></div><p className="ga-key-events">{count(current.totals.keyEvents)}</p><p className="ga-explanation">Events marked as key events in this Google Analytics property. This is not a count of saved inquiries or confirmed reservations.</p>{current.downloads && <div className="ga-downloads"><h3>Fact sheets & downloads page</h3><p><strong>{count(current.downloads.views)}</strong> page views · <strong>{count(current.downloads.users)}</strong> users</p><small>Visits to /download-fact-sheets. Actual file downloads appear separately as events when tracked.</small></div>}</section>
      </div>
      <footer className="ga-footer"><span>Property {current.propertyId} · Retrieved {new Date(current.fetchedAt).toLocaleString("en-GB", { timeZone: "Asia/Bangkok", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })} Bangkok</span><p>Reports end yesterday in the property’s time zone and may be cached for up to 60 seconds. Google’s processing and privacy controls can affect totals.</p></footer>
    </>}
  </div>;
}
