import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET() {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({
        googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
      });
    }

    const { data } = await supabase
      .from("site_settings")
      .select("*")
      .eq("key", "google_analytics_id")
      .single();

    return NextResponse.json({
      googleAnalyticsId: data?.value || "",
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json({
      googleAnalyticsId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "",
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { googleAnalyticsId } = await request.json();

    const { error } = await supabase.from("site_settings").upsert(
      {
        key: "google_analytics_id",
        value: googleAnalyticsId,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "key",
      }
    );

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving settings:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
