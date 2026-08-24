import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { LOCALE_COOKIE, SHOW_LANGUAGE_SWITCHER } from "@/lib/i18n/config";
import { shouldSkipLocale, stripLocalePrefix } from "@/lib/i18n/path";

function applyLocaleHeaders(
  request: NextRequest,
  locale: "en" | "th",
  innerPath: string
) {
  const headers = new Headers(request.headers);
  headers.set("x-locale", locale);
  headers.set("x-pathname", innerPath);
  return headers;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAdminPage = pathname.startsWith("/admin") || pathname.startsWith("/th/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginPage = pathname === "/admin/login";
  const isLogoutApi = pathname === "/api/admin/auth/logout";

  if (!isAdminPage && !isAdminApi && !shouldSkipLocale(pathname)) {
    const isThaiPath = pathname === "/th" || pathname.startsWith("/th/");
    const localeCookie = request.cookies.get(LOCALE_COOKIE)?.value;
    const innerPath = isThaiPath ? stripLocalePrefix(pathname) : pathname;

    if (SHOW_LANGUAGE_SWITCHER && !isThaiPath && localeCookie === "th") {
      const url = request.nextUrl.clone();
      url.pathname = innerPath === "/" ? "/th" : `/th${innerPath}`;
      return NextResponse.redirect(url);
    }

    if (isThaiPath) {
      const url = request.nextUrl.clone();
      url.pathname = innerPath;
      const response = NextResponse.rewrite(url, {
        request: { headers: applyLocaleHeaders(request, "th", innerPath) },
      });
      response.cookies.set(LOCALE_COOKIE, "th", {
        path: "/",
        maxAge: 60 * 60 * 24 * 365,
        sameSite: "lax",
      });
      return response;
    }

    const response = NextResponse.next({
      request: { headers: applyLocaleHeaders(request, "en", pathname) },
    });
    return response;
  }

  if (!isAdminPage && !isAdminApi) {
    return NextResponse.next();
  }

  const { response, supabase, user } = await updateSession(request);

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

  if (isLogoutApi) {
    return response;
  }

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

  const { data: adminRow, error } = await supabase
    .from("admin_users")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !adminRow) {
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
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
