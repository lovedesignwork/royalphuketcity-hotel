import { NextRequest, NextResponse } from "next/server";
import {
  createClient,
  createServiceRoleClient,
} from "@/lib/supabase/server";

// /api/admin/users
//
// All routes in here are already gated by src/middleware.ts (caller must be
// in public.admin_users), but every handler also re-verifies the caller
// before doing privileged work — defence in depth.
//
// IMPORTANT: superadmin protection is enforced in THREE places:
//   1. UI hides the delete button on the superadmin row
//   2. This API rejects DELETE/role-change requests targeting a superadmin
//   3. The DB trigger admin_users_protect_superadmin() rejects them too,
//      so even a SQL-injection / compromised service key can't drop the
//      founder.

async function getCallingAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: adminRow } = await supabase
    .from("admin_users")
    .select("id, email, role")
    .eq("id", user.id)
    .maybeSingle();

  return adminRow ?? null;
}

// GET — list every admin user.
export async function GET() {
  const caller = await getCallingAdmin();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createServiceRoleClient();
  const { data, error } = await admin
    .from("admin_users")
    .select("id, email, role, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("admin_users list error:", error);
    return NextResponse.json(
      { error: "Failed to load users" },
      { status: 500 }
    );
  }

  return NextResponse.json({ users: data, currentUserId: caller.id });
}

// POST — invite a new admin. Body: { email, password }.
// New users always get role = 'admin' (never superadmin). Only DB seeding
// can create a superadmin.
export async function POST(request: NextRequest) {
  const caller = await getCallingAdmin();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { email?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required." },
      { status: 400 }
    );
  }
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 }
    );
  }

  const admin = createServiceRoleClient();

  // 1. Create the auth user (auto-confirm so they can log in immediately).
  const { data: created, error: createErr } = await admin.auth.admin.createUser(
    {
      email,
      password,
      email_confirm: true,
    }
  );

  if (createErr || !created?.user) {
    console.error("createUser error:", createErr);
    return NextResponse.json(
      { error: createErr?.message || "Could not create user." },
      { status: 400 }
    );
  }

  // 2. Insert the admin_users row.
  const { error: insertErr } = await admin.from("admin_users").insert({
    id: created.user.id,
    email,
    role: "admin",
    created_by: caller.id,
  });

  if (insertErr) {
    // Roll back the auth user so we don't leave an orphan that can log in
    // but isn't on the whitelist.
    await admin.auth.admin.deleteUser(created.user.id);
    console.error("admin_users insert error:", insertErr);
    return NextResponse.json(
      { error: insertErr.message || "Could not register admin." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true, id: created.user.id, email });
}

// DELETE — remove an admin. Query: ?id=<uuid>.
// Hard blocks if target is a superadmin. Hard blocks self-delete.
export async function DELETE(request: NextRequest) {
  const caller = await getCallingAdmin();
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  if (id === caller.id) {
    return NextResponse.json(
      { error: "You cannot remove your own account." },
      { status: 400 }
    );
  }

  const admin = createServiceRoleClient();

  const { data: target, error: lookupErr } = await admin
    .from("admin_users")
    .select("id, role")
    .eq("id", id)
    .maybeSingle();

  if (lookupErr) {
    console.error("admin_users lookup error:", lookupErr);
    return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
  }
  if (!target) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  if (target.role === "superadmin") {
    return NextResponse.json(
      { error: "Superadmin access is permanent and cannot be removed." },
      { status: 403 }
    );
  }

  // Cascading FK on admin_users.id -> auth.users.id (ON DELETE CASCADE)
  // means dropping the auth user also drops the admin_users row.
  const { error: deleteErr } = await admin.auth.admin.deleteUser(id);
  if (deleteErr) {
    console.error("auth deleteUser error:", deleteErr);
    return NextResponse.json(
      { error: deleteErr.message || "Could not remove user." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
