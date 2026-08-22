// SERP rank checker.
//
// This module is the ONLY place that talks to the SERP provider, so swapping
// providers (SerpApi -> DataForSEO -> etc.) is a single-file change. Callers
// only ever see checkKeywordRank() and the RankResult shape.
//
// Current provider: SerpApi (https://serpapi.com). Requires SERPAPI_KEY.
// Results are localized to Thailand (gl=th, hl=en, google_domain=google.co.th)
// but the location is configurable per keyword.

export interface RankResult {
  // 1-based Google position of the target domain, or null if not found in the
  // scanned results (top 100).
  position: number | null;
  // The exact URL Google ranked for our domain, if found.
  foundUrl: string | null;
}

export function isSerpConfigured(): boolean {
  return Boolean(process.env.SERPAPI_KEY);
}

// Google location presets. Extend as more markets are tracked.
const LOCATION_PRESETS: Record<
  string,
  { gl: string; hl: string; google_domain: string; location?: string }
> = {
  Thailand: {
    gl: "th",
    hl: "en",
    google_domain: "google.co.th",
    location: "Thailand",
  },
  "United States": {
    gl: "us",
    hl: "en",
    google_domain: "google.com",
    location: "United States",
  },
};

function normalizeDomain(url: string): string {
  try {
    const host = new URL(url.includes("://") ? url : `https://${url}`).hostname;
    return host.replace(/^www\./, "").toLowerCase();
  } catch {
    return url.replace(/^www\./, "").toLowerCase();
  }
}

/**
 * Look up where `targetDomain` ranks on Google for `keyword`.
 *
 * @param keyword      the search query, e.g. "hotel phuket old town"
 * @param targetDomain the site we care about, e.g. "royalphuketcity.com"
 *                     (a full target URL also works; only the host is used)
 * @param location     a key from LOCATION_PRESETS (defaults to Thailand)
 */
export async function checkKeywordRank(
  keyword: string,
  targetDomain: string,
  location = "Thailand"
): Promise<RankResult> {
  if (!isSerpConfigured()) {
    return { position: null, foundUrl: null };
  }

  const preset = LOCATION_PRESETS[location] || LOCATION_PRESETS.Thailand;
  const wantHost = normalizeDomain(targetDomain);

  const params = new URLSearchParams({
    engine: "google",
    q: keyword,
    api_key: process.env.SERPAPI_KEY!,
    num: "100",
    gl: preset.gl,
    hl: preset.hl,
    google_domain: preset.google_domain,
  });
  if (preset.location) params.set("location", preset.location);

  const res = await fetch(`https://serpapi.com/search.json?${params.toString()}`, {
    // SERP lookups are slow-ish; give them room but don't hang forever.
    signal: AbortSignal.timeout(30000),
  });

  if (!res.ok) {
    throw new Error(`SerpApi request failed: ${res.status} ${res.statusText}`);
  }

  const data = (await res.json()) as {
    organic_results?: { position?: number; link?: string }[];
  };

  const results = data.organic_results || [];
  for (const r of results) {
    if (!r.link) continue;
    if (normalizeDomain(r.link) === wantHost) {
      return {
        position: typeof r.position === "number" ? r.position : null,
        foundUrl: r.link,
      };
    }
  }

  return { position: null, foundUrl: null };
}
