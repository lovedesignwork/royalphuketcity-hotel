import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { slug } = await params;

    const { data, error } = await supabase
      .from("announcements")
      .select("*")
      .eq("internal_slug", slug)
      .eq("link_type", "internal")
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "Promotion not found" }, { status: 404 });
    }

    return NextResponse.json({ announcement: data });
  } catch (error) {
    console.error("Error fetching announcement:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
