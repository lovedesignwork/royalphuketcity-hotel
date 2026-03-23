import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ announcements: [] });
    }

    const { searchParams } = new URL(request.url);
    const activeOnly = searchParams.get("active") === "true";

    let query = supabase
      .from("announcements")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (activeOnly) {
      const now = new Date().toISOString();
      query = query
        .eq("is_active", true)
        .or(`start_date.is.null,start_date.lte.${now}`)
        .or(`end_date.is.null,end_date.gte.${now}`);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Error fetching announcements:", error);
      return NextResponse.json({ announcements: [] });
    }

    return NextResponse.json({ announcements: data || [] });
  } catch (error) {
    console.error("Error in announcements API:", error);
    return NextResponse.json({ announcements: [] });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await request.json();
    const {
      title,
      subtitle,
      description,
      image,
      image_alt,
      link_type = "none",
      internal_slug,
      external_url,
      button_text = "Learn More",
      is_active = false,
      display_order = 0,
      start_date,
      end_date,
    } = body;

    if (!title || !description) {
      return NextResponse.json({ error: "Title and description are required" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("announcements")
      .insert([{
        title,
        subtitle,
        description,
        image,
        image_alt,
        link_type,
        internal_slug: link_type === "internal" ? internal_slug : null,
        external_url: link_type === "external" ? external_url : null,
        button_text,
        is_active,
        display_order,
        start_date: start_date || null,
        end_date: end_date || null,
      }])
      .select()
      .single();

    if (error) {
      console.error("Error creating announcement:", error);
      return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
    }

    return NextResponse.json({ success: true, announcement: data });
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    updates.updated_at = new Date().toISOString();

    if (updates.link_type === "internal") {
      updates.external_url = null;
    } else if (updates.link_type === "external") {
      updates.internal_slug = null;
    } else if (updates.link_type === "none") {
      updates.internal_slug = null;
      updates.external_url = null;
    }

    const { data, error } = await supabase
      .from("announcements")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating announcement:", error);
      return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 });
    }

    return NextResponse.json({ success: true, announcement: data });
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting announcement:", error);
      return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
