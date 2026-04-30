import { NextRequest, NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

/**
 * Yan Long reservations — CRUD for the yanlong_reservations table.
 * The admin layout auth ensures only signed-in admins can reach this route.
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      return NextResponse.json({ reservations: [], total: 0 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    let query = supabase
      .from("yanlong_reservations")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false });

    if (status && status !== "all") {
      query = query.eq("status", status);
    }

    if (search) {
      query = query.or(
        `guest_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,special_requests.ilike.%${search}%`,
      );
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    const { data, error, count } = await query.range(from, to);

    if (error) {
      console.error("yanlong_reservations GET:", error);
      return NextResponse.json({ reservations: [], total: 0 });
    }

    return NextResponse.json({
      reservations: data || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
    });
  } catch (error) {
    console.error("yanlong_reservations GET:", error);
    return NextResponse.json({ reservations: [], total: 0 });
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

    const { error } = await supabase
      .from("yanlong_reservations")
      .update(updateData)
      .eq("id", id);

    if (error) {
      console.error("yanlong_reservations PATCH:", error);
      return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("yanlong_reservations PATCH:", error);
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
      .from("yanlong_reservations")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("yanlong_reservations DELETE:", error);
      return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("yanlong_reservations DELETE:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
