import "server-only";
import { unstable_cache } from "next/cache";
import { getSupabaseClient } from "@/lib/supabase";
import { normalizeAnalyticsId } from "@/lib/analytics-id";

export const ANALYTICS_CONFIG_TAG = "analytics-config";

const getSavedAnalyticsId = unstable_cache(async () => {
  const supabase = getSupabaseClient();
  if (!supabase) return "";

  const { data, error } = await supabase
    .from("site_settings")
    .select("value")
    .eq("key", "google_analytics_id")
    .maybeSingle();
  if (error) throw new Error("Analytics settings unavailable");
  return normalizeAnalyticsId(data?.value);
}, [ANALYTICS_CONFIG_TAG], { revalidate: 3600, tags: [ANALYTICS_CONFIG_TAG] });

export async function getAnalyticsMeasurementId(): Promise<string> {
  const fallback = normalizeAnalyticsId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
  try {
    // An empty legacy setting means unconfigured; preserve deployment tracking.
    return (await getSavedAnalyticsId()) || fallback;
  } catch {
    // A database outage must not disable an otherwise configured Google tag.
    return fallback;
  }
}
