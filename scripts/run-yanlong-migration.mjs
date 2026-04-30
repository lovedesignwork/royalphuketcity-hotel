// One-shot script to apply the Yan Long integration migration to Supabase.
// Usage: node scripts/run-yanlong-migration.mjs
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
  } catch {
    // .env.local optional
  }
}

async function runMigration() {
  await loadEnv();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
    process.exit(1);
  }

  const sqlPath = join(
    __dirname,
    "..",
    "supabase",
    "migrations",
    "20260430_yanlong_integration.sql",
  );
  const sql = await readFile(sqlPath, "utf8");

  // Supabase exposes a private RPC for running raw SQL called `exec_sql`
  // on some projects, but by default it doesn't exist. The reliable
  // cross-project way is to use the Supabase Management API, which
  // requires a personal access token. We don't have that, so instead we
  // split the file into statements and send each via the REST PostgREST
  // layer is not possible for DDL.
  //
  // Fallback: print the SQL and instruct the user to paste into the
  // Supabase SQL editor. This is the most robust path for one-time DDL.
  console.log("================================================================");
  console.log("Copy the SQL below into Supabase SQL Editor and press 'Run':");
  console.log("Dashboard: https://supabase.com/dashboard/project/crhzxvbubvyachauomlx/sql/new");
  console.log("================================================================\n");
  console.log(sql);
  console.log("\n================================================================");
  console.log("After running, this line in Yan Long will start inserting rows.");
  console.log("================================================================");
}

runMigration().catch((e) => {
  console.error(e);
  process.exit(1);
});
