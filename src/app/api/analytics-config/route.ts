import { NextResponse } from "next/server";
import { getAnalyticsMeasurementId } from "@/lib/analytics-config";

export async function GET() {
  // Only the public measurement ID leaves this endpoint. The database lookup
  // is cached separately and never blocks page rendering or root metadata.
  return NextResponse.json(
    { measurementId: await getAnalyticsMeasurementId() },
    { headers: { "Cache-Control": "no-store" } },
  );
}
