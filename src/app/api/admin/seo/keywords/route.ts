import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

// Keyword CRUD for the SEO dashboard. Auth is handled by src/middleware.ts
// (every /api/admin/* route requires a logged-in admin), so these handlers
// just use the service-role client.

export async function GET() {
  const supabase = getSupabaseClient();
  if (!supabase) return NextResponse.json({ keywords: [] });

  const { data, error } = await supabase
    .from("seo_keywords")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Load keywords error:", error);
    return NextResponse.json({ keywords: [] });
  }

  return NextResponse.json({ keywords: data || [] });
}

export async function POST(request: NextRequest) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const keyword = (body.keyword || "").trim();
    const targetUrl = (body.target_url || "").trim() || null;
    const location = (body.location || "Thailand").trim() || "Thailand";

    if (!keyword) {
      return NextResponse.json({ error: "Keyword is required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("seo_keywords")
      .insert({ keyword, target_url: targetUrl, location })
      .select("*")
      .single();

    if (error) {
      // Unique violation -> keyword already tracked for this location.
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "That keyword is already tracked for this location." },
          { status: 409 }
        );
      }
      console.error("Create keyword error:", error);
      return NextResponse.json({ error: "Failed to add keyword" }, { status: 500 });
    }

    return NextResponse.json({ keyword: data });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function PATCH(request: NextRequest) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { id, ...rest } = body;
    if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

    const update: Record<string, unknown> = {};
    if (typeof rest.active === "boolean") update.active = rest.active;
    if (typeof rest.keyword === "string") update.keyword = rest.keyword.trim();
    if (typeof rest.target_url === "string")
      update.target_url = rest.target_url.trim() || null;
    if (typeof rest.location === "string")
      update.location = rest.location.trim() || "Thailand";

    const { data, error } = await supabase
      .from("seo_keywords")
      .update(update)
      .eq("id", id)
      .select("*")
      .single();

    if (error) {
      console.error("Update keyword error:", error);
      return NextResponse.json({ error: "Failed to update keyword" }, { status: 500 });
    }

    return NextResponse.json({ keyword: data });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return NextResponse.json({ error: "Database not configured" }, { status: 503 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });

  const { error } = await supabase.from("seo_keywords").delete().eq("id", id);
  if (error) {
    console.error("Delete keyword error:", error);
    return NextResponse.json({ error: "Failed to delete keyword" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
