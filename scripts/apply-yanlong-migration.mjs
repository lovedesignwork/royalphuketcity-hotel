// Apply the Yan Long migration directly via Supabase's postgrest pg-meta
// if exposed. If not, print the SQL for manual application.
//
// As a fallback, after the migration is (manually) applied, this script
// verifies by attempting a minimal insert + immediate delete so the user
// knows the integration is working end-to-end.

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function loadEnv() {
  const envPath = join(__dirname, "..", ".env.local");
  try {
    const txt = await readFile(envPath, "utf8");
    for (const line of txt.split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2];
    }
  } catch {}
}

async function main() {
  await loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing Supabase env vars in .env.local");
    process.exit(1);
  }

  // Step 1: verify by checking if the 'source' column exists via a query.
  console.log("Checking if migration is already applied...");
  const probe = await fetch(
    `${url}/rest/v1/contact_submissions?select=source&limit=1`,
    {
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    },
  );

  if (probe.ok) {
    console.log("✅ 'source' column is present — migration is already applied.\n");

    // Insert a test row to prove the full pipeline works.
    console.log("Inserting test Yan Long submission...");
    const testRow = {
      name: "Migration Test (will be deleted)",
      email: "migration-test@example.com",
      message: "Automated test — this row is deleted immediately.",
      inquiry_type: "reservation",
      source: "yanlong",
      status: "new",
      metadata: { restaurant: "yanlong", test: true },
    };

    const insertRes = await fetch(`${url}/rest/v1/contact_submissions`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify(testRow),
    });

    if (!insertRes.ok) {
      const err = await insertRes.text();
      console.error("❌ Test insert failed:", err);
      process.exit(1);
    }

    const [inserted] = await insertRes.json();
    console.log("✅ Test row inserted (id:", inserted.id, ")");

    const deleteRes = await fetch(
      `${url}/rest/v1/contact_submissions?id=eq.${inserted.id}`,
      {
        method: "DELETE",
        headers: { apikey: key, Authorization: `Bearer ${key}` },
      },
    );
    if (deleteRes.ok) {
      console.log("✅ Test row cleaned up. Integration is working end-to-end.");
    }
    return;
  }

  // Migration not yet applied — print instructions.
  const probeErr = await probe.text();
  if (probeErr.includes("column") && probeErr.includes("source")) {
    console.log("Migration not applied yet.");
  } else {
    console.log("Probe response:", probe.status, probeErr);
  }

  const sqlPath = join(
    __dirname,
    "..",
    "supabase",
    "migrations",
    "20260430_yanlong_integration.sql",
  );
  const sql = await readFile(sqlPath, "utf8");
  console.log("\n=== RUN THIS SQL IN SUPABASE SQL EDITOR ===");
  console.log(
    "https://supabase.com/dashboard/project/crhzxvbubvyachauomlx/sql/new",
  );
  console.log("============================================\n");
  console.log(sql);
  console.log("\n============================================");
  console.log("After running, re-run this script to verify.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
