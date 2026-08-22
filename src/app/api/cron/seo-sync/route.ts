import { NextRequest, NextResponse } from "next/server";
import { runSeoSync } from "@/lib/seo/sync";
import { isAuthorizedCron } from "@/lib/seo/cron-auth";

// Nightly SEO sync. Scheduled from vercel.json. Pulls recent Google Search
// Console data and runs live SERP rank checks for every active keyword.
//
// Query params (optional):
//   ?gscDays=N   how many days of GSC history to import (default 3, use 90
//                for a one-off backfill)
//   ?skipRanks=1 only refresh GSC data, skip the paid SERP checks

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function GET(request: NextRequest) {
  if (!isAuthorizedCron(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const gscDaysParam = searchParams.get("gscDays");
  const skipRanks = searchParams.get("skipRanks") === "1";
  const gscDays = gscDaysParam ? Math.max(1, parseInt(gscDaysParam, 10)) : 3;

  try {
    const result = await runSeoSync({ gscDays, skipRanks });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("SEO sync failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Sync failed",
      },
      { status: 500 }
    );
  }
}
