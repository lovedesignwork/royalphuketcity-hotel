import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { revalidateTag } from "next/cache";
import { ANALYTICS_CONFIG_TAG, getAnalyticsMeasurementId } from "@/lib/analytics-config";
import { normalizeAnalyticsId } from "@/lib/analytics-id";

export async function GET() {
  return NextResponse.json(
    { googleAnalyticsId: await getAnalyticsMeasurementId() },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { googleAnalyticsId } = await request.json();
    if (typeof googleAnalyticsId !== "string" ||
      (googleAnalyticsId.trim() !== "" && !normalizeAnalyticsId(googleAnalyticsId))) {
      return NextResponse.json({ error: "Enter a valid GA4 measurement ID (G-...)" }, { status: 400 });
    }

    const { error } = await supabase.from("site_settings").upsert(
      {
        key: "google_analytics_id",
        value: normalizeAnalyticsId(googleAnalyticsId),
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "key",
      }
    );

    if (error) {
      throw error;
    }

    revalidateTag(ANALYTICS_CONFIG_TAG);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
