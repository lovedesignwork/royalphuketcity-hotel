// Verifies the DB-level superadmin lock by attempting (and expecting failure)
// to delete or demote the superadmin row through the service-role client.
//
// Run: node scripts/verify-superadmin-lock.mjs

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
    if (!(key in process.env)) process.env[key] = value;
  }
}

loadEnvLocal();

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const EMAIL =
  process.env.SUPERADMIN_EMAIL || "john.c@royalphuketcity.com";

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  const { data: row, error } = await admin
    .from("admin_users")
    .select("id, email, role")
    .eq("email", EMAIL)
    .maybeSingle();

  if (error || !row) {
    console.error("Could not read superadmin row:", error?.message);
    process.exit(1);
  }

  console.log(`→ Found superadmin row: ${row.email} (role=${row.role})`);

  // Attempt 1: demote.
  const { error: demoteErr } = await admin
    .from("admin_users")
    .update({ role: "admin" })
    .eq("id", row.id);
  if (demoteErr) {
    console.log(`  ✓ Demotion blocked by DB: ${demoteErr.message}`);
  } else {
    console.error("  ✗ Demotion succeeded — trigger is NOT active!");
    process.exit(2);
  }

  // Attempt 2: delete.
  const { error: deleteErr } = await admin
    .from("admin_users")
    .delete()
    .eq("id", row.id);
  if (deleteErr) {
    console.log(`  ✓ Deletion blocked by DB: ${deleteErr.message}`);
  } else {
    console.error("  ✗ Deletion succeeded — trigger is NOT active!");
    process.exit(2);
  }

  console.log("\n✓ Superadmin is locked at the database level.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
