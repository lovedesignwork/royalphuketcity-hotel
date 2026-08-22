import { getSupabaseClient } from "@/lib/supabase";
import { fetchGscRows, getGscSiteUrl, isGscConfigured } from "@/lib/seo/gsc";
import { checkKeywordRank, isSerpConfigured } from "@/lib/seo/serp";

// Shared SEO sync routine used by both the nightly cron
// (/api/cron/seo-sync) and the dashboard "Sync now" button
// (/api/admin/seo/sync). Keeping the logic here means both entry points
// behave identically.

export interface SeoSyncOptions {
  // How many days of Google Search Console history to (re)import. Default 3
  // (GSC's reporting lag means the last 1-2 days are usually empty). Pass 90
  // for the initial backfill so charts aren't empty on day one.
  gscDays?: number;
  // Skip the live SERP rank checks (e.g. to only refresh GSC data).
  skipRanks?: boolean;
}

export interface SeoSyncResult {
  gscConfigured: boolean;
  serpConfigured: boolean;
  gscRowsUpserted: number;
  gscDaysRequested: number;
  keywordsChecked: number;
  ranksRecorded: number;
  errors: string[];
}

function toDateString(d: Date): string {
  return d.toISOString().split("T")[0];
}

// Derive the domain we rank-check against when a keyword has no explicit
// target_url. Prefers NEXT_PUBLIC_SITE_URL, then the GSC property URL.
function getDefaultTargetDomain(): string {
  const site = process.env.NEXT_PUBLIC_SITE_URL || "";
  if (site) return site;
  const gsc = getGscSiteUrl() || "";
  // Domain properties look like "sc-domain:example.com".
  return gsc.replace(/^sc-domain:/, "");
}

export async function runSeoSync(
  options: SeoSyncOptions = {}
): Promise<SeoSyncResult> {
  const { gscDays = 3, skipRanks = false } = options;

  const result: SeoSyncResult = {
    gscConfigured: isGscConfigured(),
    serpConfigured: isSerpConfigured(),
    gscRowsUpserted: 0,
    gscDaysRequested: gscDays,
    keywordsChecked: 0,
    ranksRecorded: 0,
    errors: [],
  };

  const supabase = getSupabaseClient();
  if (!supabase) {
    result.errors.push("Supabase not configured");
    return result;
  }

  // -------------------------------------------------------------------------
  // 1. Google Search Console — import recent performance data.
  // -------------------------------------------------------------------------
  if (result.gscConfigured) {
    try {
      const end = new Date();
      // GSC data lags ~2-3 days; end the window 2 days ago.
      end.setDate(end.getDate() - 2);
      const start = new Date(end);
      start.setDate(start.getDate() - Math.max(0, gscDays - 1));

      const rows = await fetchGscRows(toDateString(start), toDateString(end));

      if (rows.length > 0) {
        const payload = rows.map((r) => ({
          date: r.date,
          query: r.query,
          page: r.page,
          clicks: r.clicks,
          impressions: r.impressions,
          ctr: r.ctr,
          position: r.position,
        }));

        // Upsert in chunks to stay under payload limits.
        const chunkSize = 1000;
        for (let i = 0; i < payload.length; i += chunkSize) {
          const chunk = payload.slice(i, i + chunkSize);
          const { error } = await supabase
            .from("seo_gsc_daily")
            .upsert(chunk, { onConflict: "date,query,page" });
          if (error) {
            result.errors.push(`GSC upsert: ${error.message}`);
          } else {
            result.gscRowsUpserted += chunk.length;
          }
        }
      }
    } catch (err) {
      result.errors.push(
        `GSC fetch: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  // -------------------------------------------------------------------------
  // 2. Live SERP rank checks for each active keyword.
  // -------------------------------------------------------------------------
  if (!skipRanks && result.serpConfigured) {
    const { data: keywords, error: kwError } = await supabase
      .from("seo_keywords")
      .select("id, keyword, target_url, location, active")
      .eq("active", true);

    if (kwError) {
      result.errors.push(`Load keywords: ${kwError.message}`);
    } else if (keywords) {
      const today = toDateString(new Date());
      const fallbackDomain = getDefaultTargetDomain();

      for (const kw of keywords) {
        result.keywordsChecked += 1;
        try {
          const target = kw.target_url || fallbackDomain;
          const { position, foundUrl } = await checkKeywordRank(
            kw.keyword,
            target,
            kw.location || "Thailand"
          );

          const { error } = await supabase.from("seo_rank_history").upsert(
            {
              keyword_id: kw.id,
              checked_date: today,
              position,
              found_url: foundUrl,
            },
            { onConflict: "keyword_id,checked_date" }
          );

          if (error) {
            result.errors.push(`Rank upsert (${kw.keyword}): ${error.message}`);
          } else {
            result.ranksRecorded += 1;
          }
        } catch (err) {
          result.errors.push(
            `Rank check (${kw.keyword}): ${
              err instanceof Error ? err.message : String(err)
            }`
          );
        }
      }
    }
  }

  return result;
}
