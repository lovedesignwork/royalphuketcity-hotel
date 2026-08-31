import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";
import { buildLiveMonthlyReport } from "@/lib/seo/monthly-live";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

export async function GET(request: NextRequest) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const month = request.nextUrl.searchParams.get("month") || undefined;

  try {
    const report = await buildLiveMonthlyReport(supabase, month);
    return NextResponse.json(report);
  } catch (error) {
    console.error("Live monthly SEO report failed:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load report" },
      { status: 500 }
    );
  }
}
