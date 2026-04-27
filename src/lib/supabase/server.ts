import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Server-side Supabase client tied to the current request's cookies.
// Use in Server Components, Route Handlers, and Server Actions when you
// need the session of the *user making the request* (so RLS applies as
// that user). For privileged operations that need to bypass RLS, use
// createServiceRoleClient() below.
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll() can throw inside Server Components (cookies are
            // read-only there). That's fine — middleware refreshes the
            // session, so we just swallow it.
          }
        },
      },
    }
  );
}

import { createClient as createPlainClient } from "@supabase/supabase-js";

// Service role client. Bypasses RLS. Only use in API routes after you've
// already verified the caller is an admin via createClient().auth.getUser()
// + a lookup against public.admin_users.
export function createServiceRoleClient() {
  return createPlainClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
