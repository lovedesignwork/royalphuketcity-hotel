import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

/**
 * Yan Long admin API — thin wrapper around contact_submissions filtered by
 * source='yanlong'. Supports optional kind=reservation|inquiries to split
 * the reservation queue from general contact messages.
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ submissions: [], total: 0 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const kind = searchParams.get("kind"); // 'reservation' | 'inquiries' | null
    const search = searchParams.get("search");

    let query = supabase
      .from("contact_submissions")
      .select("*", { count: "exact" })
      .eq("source", "yanlong")
      .order("created_at", { ascending: false });

    if (kind === "reservation") {
      query = query.eq("inquiry_type", "reservation");
    } else if (kind === "inquiries") {
      query = query.neq("inquiry_type", "reservation");
    }

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.or(
        `name.ilike.%${search}%,email.ilike.%${search}%,subject.ilike.%${search}%,message.ilike.%${search}%`,
      );
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("Error fetching yanlong submissions:", error);
      return NextResponse.json({ submissions: [], total: 0 });
    }

    return NextResponse.json({
      submissions: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error("Error in yanlong API:", error);
    return NextResponse.json({ submissions: [], total: 0 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 });
    }

    const body = await request.json();
    const { id, status, notes } = body;
    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updateData: Record<string, string> = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    updateData.updated_at = new Date().toISOString();

    const { error } = await supabase
      .from("contact_submissions")
      .update(updateData)
      .eq("id", id)
      .eq("source", "yanlong");

    if (error) {
      console.error("Error updating yanlong submission:", error);
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating yanlong submission:", error);
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
      .from("contact_submissions")
      .delete()
      .eq("id", id)
      .eq("source", "yanlong");

    if (error) {
      console.error("Error deleting yanlong submission:", error);
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting yanlong submission:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
