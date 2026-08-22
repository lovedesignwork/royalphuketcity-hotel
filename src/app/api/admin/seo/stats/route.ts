import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { buildSeoStats } from "@/lib/seo/stats";
import { isGscConfigured } from "@/lib/seo/gsc";
import { isSerpConfigured } from "@/lib/seo/serp";

// Aggregated data powering the /admin/seo dashboard. Auth via middleware.

export const dynamic = "force-dynamic";

const EMPTY = (range: string) => ({
  configured: { gsc: isGscConfigured(), serp: isSerpConfigured() },
  generatedAt: new Date().toISOString(),
  keywords: [],
  gsc: {
    range,
    totals: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    previous: { clicks: 0, impressions: 0, ctr: 0, position: 0 },
    daily: [],
    topQueries: [],
    topPages: [],
  },
  monthlyTrend: [],
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get("range") || "30d";

  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json(EMPTY(range));
  }

  try {
    const stats = await buildSeoStats(supabase, range);
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Build SEO stats error:", error);
    return NextResponse.json(EMPTY(range));
  }
}
