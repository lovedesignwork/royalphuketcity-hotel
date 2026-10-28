import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ANALYTICS_BRANDS, ANALYTICS_RANGES } from "@/lib/ga4-types";
import { analyticsFailure, getBrandAnalytics } from "@/lib/google-analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const json = (data: unknown, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });

export async function GET(request: NextRequest) {
  try {
    const client = await createClient();
    const { data: { user }, error } = await client.auth.getUser();
    if (error || !user) return json({ error: "Please sign in to continue." }, 401);
    const { data: admin, error: adminError } = await client.from("admin_users").select("id").eq("id", user.id).maybeSingle();
    if (adminError || !admin) return json({ error: "Admin access is required." }, 403);
    const brand = ANALYTICS_BRANDS.find((item) => item.id === (request.nextUrl.searchParams.get("brand") || "hotel"));
    const range = ANALYTICS_RANGES.find((item) => item.value === (request.nextUrl.searchParams.get("range") || "7d"));
    if (!brand || !range) return json({ error: "Choose a valid brand and date range." }, 400);
    return json(await getBrandAnalytics(brand.id, range.value));
  } catch (error) {
    const failure = analyticsFailure(error);
    // Never return provider error payloads, tokens or credential material.
    return json({ source: "Google Analytics 4", code: failure.code, error: failure.message }, failure.status);
  }
}
