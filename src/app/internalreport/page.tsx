import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import crawl from "./crawl-snapshot.json";
import snapshot from "./search-snapshot.json";
import { audit, keywordGroups } from "./strategy";
import s from "./report.module.css";

export const metadata: Metadata = {
  title: "Wedding Growth Report",
  description: "Wedding search visibility and enquiry audit for Royal Phuket City Hotel.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  alternates: null,
};

const sections = [
  ["strategy", "Keyword strategy"],
  ["rankings", "Google rankings"],
  ["visibility", "Maps & AI visibility"],
  ["audit", "Conversion audit"],
  ["sources", "Sources"],
];
const marketNames: Record<string, string> = { TH: "Thailand", UK: "United Kingdom", US: "United States" };
const modes = [
  ["top", "Top 10"],
  ["wedding", "Wedding terms"],
  ["ai", "AI citations"],
];
const aiLabels: Record<string, string> = {
  url: "URL cited",
  domain: "Domain cited",
  shown: "Overview observed",
  none: "No signal",
};
const uberUrl = "https://ubersuggest.com/en/research-topics/ai-keyword-overview?keyword=wedding+venue+phuket";
const chatgptReportUrl = "https://app.localfalcon.com/reports/view/38599ab55f7058d";
const geminiReportUrl = "https://app.localfalcon.com/reports/view/c8ec78bca790e6a";
const mapsReports = [
  ["wedding venue phuket", "https://app.localfalcon.com/reports/view/20325e391e84522"],
  ["wedding in phuket", "https://app.localfalcon.com/reports/view/6533713d2fb0f20"],
];
const number = new Intl.NumberFormat("en");
const thMetrics: Record<string, { volume: number }> = snapshot.metrics.TH;
const usMetrics: Record<string, { volume: number; difficulty: number | null }> = snapshot.metrics.US;
const uberVolumes: Record<string, number> = {
  "wedding venue phuket": 70,
  "wedding in phuket": 260,
  "wedding at phuket": 260,
  "wedding venues in phuket": 70,
  "wedding phuket packages": 40,
  "best wedding venue phuket": 10,
};
const weddingPattern = /wedding|marry|แต่ง\s*งาน|เว\s*ด\s*ดิ้\s*ง|หมั้น|น้ำชา|nikah/i;
const topCount = snapshot.markets.reduce((sum, market) => sum + market.rows.filter((row) => row.position <= 10).length, 0);
const thaiRows = snapshot.markets.find((market) => market.market === "TH")!.rows;
const thaiTopCount = thaiRows.filter((row) => row.position <= 10).length;
const thaiCitationCount = thaiRows.filter((row) => row.ai === "url" || row.ai === "domain").length;

function SectionHeading({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className={s.sectionHeading}><h2>{title}</h2><p>{children}</p></div>;
}

function Demand({ term }: { term: string }) {
  const evidence = [
    thMetrics[term] && `TH ${number.format(thMetrics[term].volume)}`,
    uberVolumes[term] != null && `TH ${number.format(uberVolumes[term])} · Ubersuggest`,
    usMetrics[term] && `US ${number.format(usMetrics[term].volume)}${usMetrics[term].difficulty == null ? "" : ` (KD ${usMetrics[term].difficulty})`}`,
  ].filter(Boolean);
  return evidence.length ? <small>{evidence.join(" / ")}</small> : <small>No data returned</small>;
}

function RankingTable({ marketCode, mode }: { marketCode: string; mode: string }) {
  const market = snapshot.markets.find((entry) => entry.market === marketCode) ?? snapshot.markets[0];
  const rows = market.rows.filter((row) => {
    if (mode === "wedding") return weddingPattern.test(row.query) || row.url.includes("/wedding");
    if (mode === "ai") return row.ai === "url" || row.ai === "domain";
    return row.position <= 10;
  });

  return <>
    <nav className={s.controls} aria-label="Ranking market">
      {snapshot.markets.map(({ market: code }) => (
        <a key={code} href={`?market=${code}&view=${mode}#rankings`} aria-current={market.market === code ? "true" : undefined}>{marketNames[code]}</a>
      ))}
    </nav>
    <nav className={s.controls} aria-label="Ranking view">
      {modes.map(([value, label]) => (
        <a key={value} href={`?market=${market.market}&view=${value}#rankings`} aria-current={mode === value ? "true" : undefined}>{label}</a>
      ))}
    </nav>
    <p className={s.tableNote}>
      {rows.length} result {rows.length === 1 ? "row" : "rows"} · {marketNames[market.market]} · Serpstat snapshot retrieved 20 Nov 2026.
      {" "}Repeat queries can have multiple ranking URLs. Traffic and volumes can overlap across variants.
    </p>
    {rows.length ? (
      <table className={s.rankTable} role="table" aria-label={`${marketNames[market.market]} search rankings`}>
        <thead role="rowgroup"><tr role="row"><th role="columnheader" scope="col">Google</th><th role="columnheader" scope="col">Query and ranking URL</th><th role="columnheader" scope="col">Est. searches/mo</th><th role="columnheader" scope="col">Google AI Overview</th></tr></thead>
        <tbody role="rowgroup">
          {rows.map((row) => (
            <tr key={`${row.query}-${row.url}-${row.position}`} role="row">
              <td role="cell" className={s.position}><span className={s.mobileLabel} aria-hidden="true">Google </span>#{row.position}</td>
              <th scope="row" role="rowheader">
                <span dir="auto">{row.query}</span>
                <a href={row.url}>{row.url.replace("https://", "")}</a>
              </th>
              <td role="cell" className={s.volume}>{number.format(row.volume)}<span className={s.mobileLabel} aria-hidden="true"> est. searches/mo</span></td>
              <td role="cell" className={s.citation}><span className={s.mobileLabel} aria-hidden="true">AI Overview · </span>{aiLabels[row.ai]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : <p className={s.empty}>Serpstat returned no rows for this view in {marketNames[market.market]}.</p>}
    <p className={s.tableNote}>UK coverage is limited to top-10 rows. The Thailand and US views also include wedding and citation signals from the full returned top-100 datasets. Older www URLs can reflect earlier crawl or ranking states.</p>
  </>;
}

export default async function InternalReport({ searchParams }: { searchParams: Promise<{ market?: string; view?: string }> }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login?from=%2Finternalreport");

  const { data: admin, error } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle();
  if (error || !admin) redirect("/admin/login?error=not-admin");

  const params = await searchParams;
  const mode = modes.some(([value]) => value === params.view) ? params.view! : "top";

  return (
    <div className={s.report} lang="en">
      <a className={s.skip} href="#report-main">Skip to report</a>
      <header className={s.topbar}>
        <div className={s.container}>
          <span>Royal Phuket City Hotel</span>
          <Link href="/admin" prefetch={false}>Staff dashboard</Link>
        </div>
      </header>

      <main id="report-main">
        <div className={s.container}>
          <div className={s.intro}>
            <div className={s.introCopy}>
              <h1>Wedding growth report</h1>
              <p>Where couples find us, what they search for, and what will help them request a wedding proposal.</p>
              <time dateTime="2026-11-20">20 November 2026</time>
            </div>
            <div className={s.photo}>
              <Image src="/images/HOTEL WEBSITE/RPC wedding 545.jpg" alt="Grand Ballroom set for a wedding banquet at Royal Phuket City Hotel" fill sizes="(max-width: 720px) 92vw, (max-width: 1300px) 44vw, 530px" priority />
            </div>
          </div>
          <nav className={s.jump} aria-label="Report sections">
            {sections.map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
          <div className={s.summary}>
            <h2>Start with the proposal journey</h2>
            <p>Give the wedding hub a clear 2027 offer, surface the ballroom’s seated banquet capacities, and make the first enquiry easier to complete. Thailand has {thaiTopCount} tracked top-10 organic rows overall and zero wedding rows in that tier. The strongest wedding row is <strong>#15</strong> for “wedding banquet venues.” The two historical wedding Maps scans each show <strong>0% top-three coverage</strong>.</p>
          </div>
        </div>

        <section className={`${s.container} ${s.section}`} id="strategy">
          <SectionHeading title="Wedding keyword strategy">Use the wedding hub for venue and package searches. Give each ceremony page its own planning questions, and connect rooftop and after-party searches to an Events enquiry.</SectionHeading>
          <p className={s.tableNote}>Volumes are estimated monthly searches. Country codes identify the database. Volumes come from Serpstat unless marked Ubersuggest. KD is Serpstat SEO difficulty. Missing data leaves demand unconfirmed.</p>
          {keywordGroups.map((group) => (
            <div className={s.cluster} key={group.title}>
              <div className={s.clusterHeading}><h3>{group.title}</h3><p>{group.note}</p></div>
              {group.items.map((item) => (
                <article className={s.keywordRow} key={item.target}>
                  <div>
                    <h4>{item.target}</h4>
                    <a href={item.path}>{item.path}</a>
                  </div>
                  <ul className={s.terms}>
                    {item.terms.map((term) => <li key={term}><span dir="auto">{term}</span><Demand term={term} /></li>)}
                  </ul>
                  <p>{item.action}</p>
                </article>
              ))}
            </div>
          ))}
          <p className={s.tableNote}>Ubersuggest also surfaced “wedding at phuket” (260), “wedding venues in phuket” (70), “wedding phuket packages” (40) and “best wedding venue phuket” (10) as Thai-market variants. Use natural phrasing on the hub and package guide.</p>
        </section>

        <section className={`${s.container} ${s.section}`} id="rankings">
          <SectionHeading title="Google organic rankings">Review all {topCount} position 1–10 rows returned across Thailand, the UK and the US. Use Wedding terms to see the current wedding opportunities, including positions outside the top 10.</SectionHeading>
          <RankingTable marketCode={params.market ?? "TH"} mode={mode} />
        </section>

        <section className={`${s.container} ${s.section}`} id="visibility">
          <SectionHeading title="Maps and AI visibility">Google Maps uses local grid positions. AI answers use mentions, citations and positions within a particular sampled response.</SectionHeading>
          <div className={s.split}>
            <div>
              <h3>Google Maps · Local Falcon</h3>
              <p>17 Nov 2026 · 5×5 grid, 2 km radius, centered on the hotel in Phuket Town.</p>
              <ul className={s.mapList}>
                {mapsReports.map(([query, url]) => <li key={query}><a href={url}>{query}</a><span>ARP 20+ · ATRP 20+ · SoLV 0%</span></li>)}
              </ul>
              <p className={s.tableNote}>ARP averages positions where the hotel appears. ATRP includes the full grid. SoLV is the share of points in the top three.</p>
            </div>
            <div>
              <h3>Google AI Overviews · Serpstat</h3>
              <p>{thaiCitationCount} Thailand keyword/URL rows carry a hotel-domain or exact-URL citation signal. The returned Thailand wedding rows carry zero citation signals.</p>
              <p>Open <a href="?market=TH&view=ai#rankings">Thailand AI citations</a> or <a href="?market=US&view=ai#rankings">US AI citations</a> to see the query, organic Google position, and AI citation type. Serpstat’s citation flags carry no numeric citation order.</p>
              <p className={s.tableNote}><a href="https://developers.google.com/search/docs/appearance/ai-features">Google’s AI features documentation</a> explains how sources vary by query and answer.</p>
            </div>
          </div>
          <div className={s.aiSample}>
            <h3>Ballroom prompt · Local Falcon</h3>
            <p>“Which hotels in Phuket Town have a grand ballroom for a wedding reception?” Both scans used a 3×3 grid with a 2 km radius. Run on 20 Nov in Bangkok time, shown as 19 Nov in Local Falcon’s interface.</p>
            <ul className={s.mapList}>
              <li><a href={chatgptReportUrl}>ChatGPT scan</a><span><strong>Average position 1.44</strong> · Mentioned at 9 of 9 points · Wedding hub cited at 9 of 9</span></li>
              <li><a href={geminiReportUrl}>Google Gemini scan</a><span><strong>Average position 1.00</strong> · Mentioned at 9 of 9 points · Wedding hub cited at 3 of 9</span></li>
            </ul>
            <p className={s.tableNote}>Local Falcon recorded 100% Share of AI Voice on both scans. The source tables show where the <Link href="/wedding-venues" prefetch={false}>wedding venue page</Link> was cited.</p>
            <p>Local Falcon’s summary surfaced the 2,300-person figure in a wedding reception context. Link to the <Link href="/meeting-events#room-capacities" prefetch={false}>published room capacities</Link> and repeat the relevant banquet and theatre figures on the wedding hub once Events confirms them.</p>
            <p className={s.tableNote}>These positions apply to one prompt and location grid. Repeat venue, package, ceremony and rooftop prompts with the same settings to compare mentions and citations over time.</p>
          </div>
        </section>

        <section className={`${s.container} ${s.section}`} id="audit">
          <SectionHeading title="Conversion audit">Prioritize the offer and enquiry form, then connect ceremony and venue pages to a measurable sales follow-up.</SectionHeading>
          <div className={s.auditList}>
            {audit.map((item) => <article className={s.auditRow} key={item.title}>
              <div><span className={s.priority} data-priority={item.priority}>{item.priority}</span><p>{item.owner}</p></div>
              <div>
                <h3>{item.title}</h3>
                <p>{item.evidence}</p>
                <p><strong>Action</strong> {item.action}</p>
                <p><strong>Verify</strong> {item.check}</p>
                <a href={item.path}>Review affected page</a>
              </div>
            </article>)}
          </div>
          <div className={s.reviewWindow}><h3>Review after release</h3><p>In the first 28 days, check nonbrand clicks, proposal clicks and enquiry completion by landing page and device. In 60–90 days, review qualified enquiries, venue tours and bookings. Compare with a like-for-like pre-release period and note the release date.</p></div>
        </section>

        <section className={`${s.container} ${s.section}`} id="sources">
          <SectionHeading title="Sources and crawl coverage">Measurements are dated snapshots. Google rank, Maps grid visibility, AI citations and lead conversion describe different outcomes.</SectionHeading>
          <ul className={s.sources}>
            <li><strong>Serpstat</strong> · 20 Nov. Thailand 95 and US 32 domain-ranking rows through position 100, plus 21 UK top-10 rows. Keyword volumes were checked against the Thailand and US databases. <a href="https://serpstat.com/">Serpstat</a></li>
            <li><strong>Ubersuggest</strong> · 20 Nov. The available Thailand/Thai keyword overview showed 70 searches/month, SEO difficulty 23 and ฿39.74 CPC for “wedding venue phuket.” Logged-out access limited the additional data. <a href={uberUrl}>Keyword overview</a></li>
            <li><strong>Screaming Frog</strong> · 20 Nov. Focused 11-URL crawl plus live content and source review. All 11 returned HTTP 200 and were indexable and self-canonical. <Link href="/wedding-venues" prefetch={false}>Live wedding hub</Link></li>
            <li><strong>Local Falcon</strong> · 17 Nov Maps baselines and 20 Nov ChatGPT and Gemini prompt samples. <a href="https://app.localfalcon.com/reports">Scan history</a></li>
          </ul>
          <details className={s.crawl}>
            <summary>View all {crawl.length} crawled pages</summary>
            <ul>{crawl.map((row) => <li key={row.path}><div><a href={row.path}>{row.path}</a><small>{row.title}</small></div><span>{row.status} · {row.indexable}</span></li>)}</ul>
          </details>
          <p className={s.tableNote}>Audit scope covers public pages and the enquiry interface. Search Console query metrics, completed live enquiries and sales outcomes were outside this snapshot.</p>
        </section>
      </main>

      <footer className={s.footer}><div className={s.container}><span>Royal Phuket City Hotel</span><a href="#report-main">Back to top</a></div></footer>
    </div>
  );
}
