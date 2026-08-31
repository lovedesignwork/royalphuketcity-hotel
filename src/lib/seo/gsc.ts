import { google } from "googleapis";

// Google Search Console client.
//
// Auth uses a Google Cloud service account (email + private key) that has been
// added as a user on the verified GSC property. All values come from env:
//
//   GOOGLE_SERVICE_ACCOUNT_EMAIL  service account email
//   GOOGLE_PRIVATE_KEY            service account private key (PEM). When set
//                                 in a single-line env var, literal "\n"
//                                 sequences are converted back to newlines.
//   GSC_SITE_URL                  the property URL exactly as registered in
//                                 Search Console, e.g. "https://royalphuketcity.com/"
//                                 or a domain property "sc-domain:royalphuketcity.com"
//
// The whole module degrades gracefully: if env is missing, isGscConfigured()
// returns false and callers skip GSC work instead of throwing.

const GSC_SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

export interface GscRow {
  date: string; // YYYY-MM-DD
  query: string;
  page: string;
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export function isGscConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY &&
      process.env.GSC_SITE_URL
  );
}

export function getGscSiteUrl(): string | null {
  return process.env.GSC_SITE_URL || null;
}

function getPrivateKey(): string {
  // Vercel / .env single-line keys keep "\n" as literal characters.
  return (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
}

function getSearchConsole() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: getPrivateKey(),
    scopes: [GSC_SCOPE],
  });
  return google.searchconsole({ version: "v1", auth });
}

/**
 * Query Search Console performance data grouped by date + query + page.
 * Returns one flat row per (date, query, page) combination.
 *
 * GSC has a ~2-3 day reporting lag, so callers should request dates that end
 * a few days before "today".
 */
export async function fetchGscRows(
  startDate: string,
  endDate: string
): Promise<GscRow[]> {
  if (!isGscConfigured()) return [];

  const siteUrl = getGscSiteUrl()!;
  const searchconsole = getSearchConsole();

  const rows: GscRow[] = [];
  const rowLimit = 25000;
  let startRow = 0;

  // Paginate through all rows for the range.
  for (;;) {
    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions: ["date", "query", "page"],
        rowLimit,
        startRow,
        type: "web",
      },
    });

    const batch = res.data.rows || [];
    for (const r of batch) {
      const keys = r.keys || [];
      rows.push({
        date: keys[0] || "",
        query: keys[1] || "",
        page: keys[2] || "",
        clicks: r.clicks || 0,
        impressions: r.impressions || 0,
        ctr: r.ctr || 0,
        position: r.position || 0,
      });
    }

    if (batch.length < rowLimit) break;
    startRow += rowLimit;
  }

  return rows;
}

export interface GscDimRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

/** Lightweight Search Console rollup (country, device, query, or page). */
export async function fetchGscByDimensions(
  startDate: string,
  endDate: string,
  dimensions: string[]
): Promise<GscDimRow[]> {
  if (!isGscConfigured()) return [];

  const siteUrl = getGscSiteUrl()!;
  const searchconsole = getSearchConsole();
  const rows: GscDimRow[] = [];
  const rowLimit = 25000;
  let startRow = 0;

  for (;;) {
    const res = await searchconsole.searchanalytics.query({
      siteUrl,
      requestBody: {
        startDate,
        endDate,
        dimensions,
        rowLimit,
        startRow,
        type: "web",
      },
    });

    const batch = res.data.rows || [];
    for (const r of batch) {
      rows.push({
        keys: r.keys || [],
        clicks: r.clicks || 0,
        impressions: r.impressions || 0,
        ctr: r.ctr || 0,
        position: r.position || 0,
      });
    }

    if (batch.length < rowLimit) break;
    startRow += rowLimit;
  }

  return rows;
}
