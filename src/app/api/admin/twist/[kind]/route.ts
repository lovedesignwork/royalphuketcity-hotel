import { NextRequest, NextResponse } from "next/server";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { TWIST_STATUSES } from "@/lib/twist-inbox";

type Context = { params: Promise<{ kind: string }> };
const columns = "id,form_type,name,first_name,last_name,email,phone,subject,message,reservation_date,reservation_time,party_size,special_requests,event_type,event_date,guest_count,country,status,notes,created_at";
const json = (data: unknown, status = 200) => NextResponse.json(data, {
  status, headers: { "Cache-Control": "private, no-store" },
});

async function authorize() {
  const client = await createClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user) return json({ error: "Please sign in to continue." }, 401);
  const { data: admin, error: adminError } = await client.from("admin_users")
    .select("id").eq("id", user.id).maybeSingle();
  if (adminError || !admin) return json({ error: "Admin access is required." }, 403);
  return null;
}

function validKind(kind: string) {
  return kind === "reservations" || kind === "inquiries";
}

export async function GET(request: NextRequest, context: Context) {
  try {
    const denied = await authorize();
    if (denied) return denied;
    const { kind } = await context.params;
    if (!validKind(kind)) return json({ error: "Inbox not found." }, 404);
    const params = request.nextUrl.searchParams;
    const page = Number(params.get("page") || 1);
    const status = params.get("status") || "all";
    if (!Number.isSafeInteger(page) || page < 1 || page > 100000 ||
        (status !== "all" && !TWIST_STATUSES.some((value) => value === status))) {
      return json({ error: "Invalid page or status filter." }, 400);
    }
    // Strip PostgREST filter syntax and wildcard characters from user search.
    const search = (params.get("search") || "").slice(0, 100).replace(/[^\p{L}\p{N}\s@.+-]/gu, " ").trim();
    let query = createServiceRoleClient().from("twist_inquiries")
      .select(columns, { count: "exact" });
    query = kind === "reservations" ? query.eq("form_type", "reservation") : query.neq("form_type", "reservation");
    if (status !== "all") query = query.eq("status", status);
    if (search) query = query.or(["name", "first_name", "last_name", "email", "phone", "subject", "message"]
      .map((field) => `${field}.ilike.%${search}%`).join(","));
    const limit = 20;
    const { data, error, count } = await query.order("created_at", { ascending: false })
      .order("id", { ascending: false }).range((page - 1) * limit, page * limit - 1);
    if (error) {
      console.error("TWIST inbox read failed:", error.code);
      return json({ error: "Could not load TWIST requests. Please retry." }, 500);
    }
    return json({ items: (data || []).map((row) => ({ ...row, id: String(row.id) })),
      total: count || 0, page, totalPages: Math.max(1, Math.ceil((count || 0) / limit)) });
  } catch {
    return json({ error: "TWIST inbox is unavailable. Please retry." }, 503);
  }
}

export async function PATCH(request: NextRequest, context: Context) {
  try {
    const denied = await authorize();
    if (denied) return denied;
    const { kind } = await context.params;
    if (!validKind(kind)) return json({ error: "Inbox not found." }, 404);
    const body = await request.json().catch(() => null);
    if (!body || typeof body.id !== "string" || !/^[1-9]\d{0,18}$/.test(body.id) ||
        !TWIST_STATUSES.includes(body.status) || typeof body.notes !== "string" || body.notes.length > 5000) {
      return json({ error: "Choose a valid status and keep notes within 5,000 characters." }, 400);
    }
    let query = createServiceRoleClient().from("twist_inquiries")
      .update({ status: body.status, notes: body.notes }).eq("id", body.id);
    query = kind === "reservations" ? query.eq("form_type", "reservation") : query.neq("form_type", "reservation");
    const { data, error } = await query.select(columns).maybeSingle();
    if (error) return json({ error: "Changes could not be saved. Please retry." }, 500);
    if (!data) return json({ error: "This request no longer exists in this inbox." }, 404);
    return json({ item: { ...data, id: String(data.id) } });
  } catch {
    return json({ error: "Changes could not be saved. Please retry." }, 503);
  }
}
