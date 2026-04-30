/**
 * Promote an existing Supabase Auth user to superadmin in the admin_users table.
 *
 * Usage:
 *   node scripts/promote-to-superadmin.mjs <uuid>
 *
 * Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local
const envPath = resolve(process.cwd(), ".env.local");
try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    process.env[key] = value;
  }
} catch {
  console.warn("Could not read .env.local, relying on environment variables.");
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
  process.exit(1);
}

const userId = process.argv[2];
if (!userId) {
  console.error("Usage: node scripts/promote-to-superadmin.mjs <uuid>");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function main() {
  console.log(`Looking up user ${userId} in auth.users...`);

  // Get user from auth.users via admin API
  const { data: authUser, error: authError } = await supabase.auth.admin.getUserById(userId);

  if (authError || !authUser?.user) {
    console.error("Could not find user in auth.users:", authError?.message || "User not found");
    process.exit(1);
  }

  const email = authUser.user.email;
  console.log(`Found user: ${email}`);

  // Check if already in admin_users
  const { data: existing } = await supabase
    .from("admin_users")
    .select("id, role")
    .eq("id", userId)
    .single();

  if (existing) {
    if (existing.role === "superadmin") {
      console.log("User is already a superadmin. Nothing to do.");
      return;
    }
    // Update to superadmin
    const { error: updateError } = await supabase
      .from("admin_users")
      .update({ role: "superadmin" })
      .eq("id", userId);

    if (updateError) {
      console.error("Failed to update role:", updateError.message);
      process.exit(1);
    }
    console.log(`Promoted existing admin to superadmin: ${email}`);
  } else {
    // Insert as superadmin
    const { error: insertError } = await supabase.from("admin_users").insert({
      id: userId,
      email: email,
      role: "superadmin",
    });

    if (insertError) {
      console.error("Failed to insert into admin_users:", insertError.message);
      process.exit(1);
    }
    console.log(`Created superadmin: ${email}`);
  }

  console.log("Done. User can now access /admin.");
}

main().catch((err) => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
