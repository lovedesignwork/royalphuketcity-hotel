"use client";

import { createBrowserClient } from "@supabase/ssr";

// Browser-side Supabase client. Use in Client Components (e.g. login form).
// Never put service role keys here — only the public anon key.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
