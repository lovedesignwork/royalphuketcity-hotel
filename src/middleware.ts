import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

// Protect everything under /admin (and its API routes) behind Supabase
// Auth + a row in public.admin_users.
//
// /admin/login is the only public sub-route — that's where users go to
// authenticate. Everything else 302s there if the caller isn't a known
// admin. API routes return 401 instead of redirecting, so the browser
// fetch() call gets a clean error.

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginPage = pathname === "/admin/login";
  const isLogoutApi = pathname === "/api/admin/auth/logout";

  // Only run auth on admin surfaces. Public pages and public APIs
  // (like /api/contact and /api/downloads) continue untouched.
  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const { response, supabase, user } = await updateSession(request);

  // Login page must be reachable even when logged out. If the user IS
  // already logged in and is an admin, send them to the dashboard so
  // they don't see the login form again.
  if (isLoginPage) {
    if (user) {
      const { data: adminRow } = await supabase
        .from("admin_users")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (adminRow) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
    }
    return response;
  }

  // Logout API must be reachable even when the session is mid-tear-down.
  if (isLogoutApi) {
    return response;
  }

  // Not signed in at all.
  if (!user) {
    if (isAdminApi) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: response.headers }
      );
    }
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("from", pathname);
    return NextResponse.redirect(url);
  }

  // Signed in, but is the user actually an admin?
  const { data: adminRow, error } = await supabase
    .from("admin_users")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !adminRow) {
    // Authenticated to Supabase but not whitelisted. Sign them out so
    // they can't sit on a stale session, then bounce to login.
    await supabase.auth.signOut();

    if (isAdminApi) {
      return NextResponse.json(
        { error: "Forbidden — not an admin" },
        { status: 403, headers: response.headers }
      );
    }
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("error", "not-admin");
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  // Skip Next.js internals and most static assets. We want middleware to
  // run on /admin pages AND /api/admin routes.
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
  ],
};
