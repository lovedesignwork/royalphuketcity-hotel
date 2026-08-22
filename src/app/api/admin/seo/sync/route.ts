import { NextRequest, NextResponse } from "next/server";
import { runSeoSync } from "@/lib/seo/sync";

// Manual "Sync now" trigger from the dashboard. Auth handled by middleware.
//
// Body (optional): { backfill?: boolean, skipRanks?: boolean }
//   backfill=true imports 90 days of Search Console history (use once, after
//   first configuring GSC, so charts aren't empty).

export const dynamic = "force-dynamic";
export const maxDuration = 300;

export async function POST(request: NextRequest) {
  let backfill = false;
  let skipRanks = false;
  try {
    const body = await request.json();
    backfill = Boolean(body?.backfill);
    skipRanks = Boolean(body?.skipRanks);
  } catch {
    // No body is fine — defaults apply.
  }

  try {
    const result = await runSeoSync({
      gscDays: backfill ? 90 : 3,
      skipRanks,
    });
    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    console.error("Manual SEO sync failed:", error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "Sync failed" },
      { status: 500 }
    );
  }
}
