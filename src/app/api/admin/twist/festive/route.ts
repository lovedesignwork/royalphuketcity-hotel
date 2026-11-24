import { NextRequest, NextResponse } from "next/server";
import { isValidPhoneNumber } from "libphonenumber-js";
import { createClient, createServiceRoleClient } from "@/lib/supabase/server";
import { festiveEvents, isFestiveEvent, isStaffSource, twistOrigin, type FestiveFloorPlan } from "@/lib/twist-festive";

const bookingsTable = "twist_festive_bookings";
const tableCatalog = "twist_festive_table_catalog";
const bookingColumns = "id,table_id,status,guests,guest_name,guest_email,guest_phone,staff_source,staff_notes";

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: { "Cache-Control": "private, no-store" } });
}

async function authorize() {
  const client = await createClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user) return { denied: json({ error: "Please sign in to continue." }, 401) };
  const { data: admin, error: adminError } = await client.from("admin_users")
    .select("id").eq("id", user.id).maybeSingle();
  if (adminError || !admin) return { denied: json({ error: "Admin access is required." }, 403) };
  return { adminId: user.id };
}

function failed(error: { code?: string }, message: string) {
  console.error("TWIST festive admin request failed:", error.code);
  return json({ error: message }, 503);
}

function isSameOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  return origin === request.nextUrl.origin && request.headers.get("sec-fetch-site") !== "cross-site";
}

async function readFloorPlan(): Promise<FestiveFloorPlan | null> {
  try {
    const response = await fetch(twistOrigin + "/api/festive/floor-plan", {
      next: { revalidate: 3600 }, signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) return null;
    const plan = await response.json() as FestiveFloorPlan;
    if (!plan.image?.src?.startsWith("/festive/") || !plan.image.width || !plan.image.height ||
        !plan.coordinates?.width || !plan.coordinates.height || !Array.isArray(plan.tables)) return null;
    return plan;
  } catch {
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    const auth = await authorize();
    if (auth.denied) return auth.denied;
    const eventId = request.nextUrl.searchParams.get("event");
    if (!isFestiveEvent(eventId)) return json({ error: "Choose a listed event." }, 400);

    const db = createServiceRoleClient();
    const [tables, bookings, floorPlan] = await Promise.all([
      db.from(tableCatalog).select("table_id,zone,capacity").order("position"),
      db.from(bookingsTable).select(bookingColumns).eq("event_id", eventId)
        .in("status", ["pending", "paid", "staff_confirmed"]),
      readFloorPlan(),
    ]);
    const error = tables.error ?? bookings.error;
    if (error) return failed(error, "Could not load tables. Please retry.");
    return json({ tables: tables.data, bookings: bookings.data, floorPlan });
  } catch {
    return json({ error: "Could not load tables. Please retry." }, 503);
  }
}

export async function POST(request: NextRequest) {
  if (!isSameOrigin(request)) return json({ error: "Open the hotel dashboard to manage tables." }, 403);
  try {
    const auth = await authorize();
    if (auth.denied) return auth.denied;
    const body = await request.json().catch(() => null);
    const eventId: unknown = body?.event;
    const source: unknown = body?.source;
    const isHold = source === "house";
    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
    const notes = typeof body?.notes === "string" ? body.notes.trim() : "";
    const guests = isHold ? null : body?.guests;
    if (!isFestiveEvent(eventId) || !isStaffSource(source) ||
        typeof body.table !== "string" || !/^[OABCD][1-8]$/.test(body.table) ||
        notes.length > 1000 || (!isHold && (
          !Number.isInteger(guests) || guests < 1 || guests > 4 || name.length < 2 || name.length > 100 ||
          (phone !== "" && (!/^\+[1-9]\d{6,14}$/.test(phone) || !isValidPhoneNumber(phone)))
        ))) {
      return json({ error: isHold ? "Choose a valid event and table, and keep notes within 1,000 characters." :
        "Check the event, table, guest details and booking source." }, 400);
    }

    const event = festiveEvents[eventId];
    const db = createServiceRoleClient();
    const { data: table, error: tableError } = await db.from(tableCatalog)
      .select("capacity").eq("table_id", body.table).maybeSingle();
    if (tableError) return failed(tableError, "Could not check the table. Please retry.");
    if (!table || (!isHold && guests > table.capacity)) {
      return json({ error: isHold ? "Select a valid table." : "Choose a table that fits the party." }, 400);
    }

    const { data, error } = await db.from(bookingsTable).insert({
      event_id: eventId,
      event_date: event.date,
      table_id: body.table,
      guests,
      guest_name: isHold ? null : name,
      guest_phone: isHold ? null : phone || null,
      status: "staff_confirmed",
      staff_source: source,
      staff_created_by: auth.adminId,
      staff_notes: notes || null,
      checkout_key: crypto.randomUUID(),
    }).select(bookingColumns).single();
    if (error?.code === "23505") return json({ error: "That table is unavailable. Choose another table." }, 409);
    if (error) return failed(error, "Could not save the table booking. Please retry.");
    return json({ booking: data }, 201);
  } catch {
    return json({ error: "Could not save the table booking. Please retry." }, 503);
  }
}

export async function PATCH(request: NextRequest) {
  if (!isSameOrigin(request)) return json({ error: "Open the hotel dashboard to manage tables." }, 403);
  try {
    const auth = await authorize();
    if (auth.denied) return auth.denied;
    const body = await request.json().catch(() => null);
    if (!isFestiveEvent(body?.event) || typeof body.id !== "string" ||
        !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(body.id)) {
      return json({ error: "Choose a valid staff booking to release." }, 400);
    }

    const { data, error } = await createServiceRoleClient().from(bookingsTable)
      .update({ status: "released", staff_released_by: auth.adminId, staff_released_at: new Date().toISOString() })
      .eq("event_id", body.event).eq("id", body.id).eq("status", "staff_confirmed")
      .select("table_id").maybeSingle();
    if (error) return failed(error, "Could not release the table. Please retry.");
    if (!data) return json({ error: "That staff booking is no longer active." }, 409);
    return json({ table: data.table_id });
  } catch {
    return json({ error: "Could not release the table. Please retry." }, 503);
  }
}
