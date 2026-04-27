// One-off seed script to create the superadmin account.
// Run: node scripts/seed-superadmin.mjs
//
// Reads credentials from CLI args or env:
//   SUPERADMIN_EMAIL, SUPERADMIN_PASSWORD
// Falls back to the values requested by the project owner.

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { createClient } from "@supabase/supabase-js";

function loadEnvLocal() {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const envPath = path.resolve(here, "..", ".env.local");
  let raw;
  try {
    raw = readFileSync(envPath, "utf8");
  } catch {
    return;
  }
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvLocal();

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const EMAIL = process.env.SUPERADMIN_EMAIL;
const PASSWORD = process.env.SUPERADMIN_PASSWORD;

if (!EMAIL || !PASSWORD) {
  console.error(
    "Missing SUPERADMIN_EMAIL or SUPERADMIN_PASSWORD environment variables.\n" +
      "Set them in .env.local or pass them inline, e.g.:\n" +
      '  SUPERADMIN_EMAIL="you@example.com" SUPERADMIN_PASSWORD="..." node scripts/seed-superadmin.mjs',
  );
  process.exit(1);
}

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function findExistingAuthUser(email) {
  let page = 1;
  const perPage = 200;
  // Hard cap so we don't loop forever on huge tenants.
  for (let i = 0; i < 25; i++) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const match = data.users.find(
      (u) => (u.email || "").toLowerCase() === email.toLowerCase(),
    );
    if (match) return match;
    if (data.users.length < perPage) return null;
    page += 1;
  }
  return null;
}

async function main() {
  console.log(`→ Seeding superadmin: ${EMAIL}`);

  let userId;

  const existing = await findExistingAuthUser(EMAIL);
  if (existing) {
    userId = existing.id;
    console.log(`  Auth user already exists (id=${userId}). Updating password…`);
    const { error: updateErr } = await admin.auth.admin.updateUserById(userId, {
      password: PASSWORD,
      email_confirm: true,
    });
    if (updateErr) {
      console.error("  Failed to update existing auth user:", updateErr.message);
      process.exit(1);
    }
  } else {
    const { data, error } = await admin.auth.admin.createUser({
      email: EMAIL,
      password: PASSWORD,
      email_confirm: true,
    });
    if (error) {
      console.error("  Failed to create auth user:", error.message);
      process.exit(1);
    }
    userId = data.user.id;
    console.log(`  Created auth user (id=${userId}).`);
  }

  // Upsert admin_users row with role=superadmin.
  const { data: existingRow, error: rowErr } = await admin
    .from("admin_users")
    .select("id, role")
    .eq("id", userId)
    .maybeSingle();
  if (rowErr) {
    console.error("  Failed to read admin_users:", rowErr.message);
    process.exit(1);
  }

  if (!existingRow) {
    const { error: insertErr } = await admin.from("admin_users").insert({
      id: userId,
      email: EMAIL,
      role: "superadmin",
    });
    if (insertErr) {
      console.error("  Failed to insert admin_users row:", insertErr.message);
      process.exit(1);
    }
    console.log("  Inserted admin_users row with role=superadmin.");
  } else if (existingRow.role !== "superadmin") {
    // The DB trigger blocks demotion of superadmin, but promotion to superadmin
    // is allowed. Use update + email refresh.
    const { error: updErr } = await admin
      .from("admin_users")
      .update({ role: "superadmin", email: EMAIL })
      .eq("id", userId);
    if (updErr) {
      console.error("  Failed to promote admin_users row:", updErr.message);
      process.exit(1);
    }
    console.log("  Promoted existing admin_users row to superadmin.");
  } else {
    console.log("  admin_users row already exists with role=superadmin.");
  }

  console.log("\n✓ Superadmin ready.");
  console.log(`  Email:    ${EMAIL}`);
  console.log(`  Password: ${PASSWORD}`);
  console.log(`  Login:    /admin/login`);
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
