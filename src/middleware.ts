import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { LOCALE_COOKIE, SHOW_LANGUAGE_SWITCHER } from "@/lib/i18n/config";
import { shouldSkipLocale, stripLocalePrefix } from "@/lib/i18n/path";
import {
  isMobileAppAlias,
  isMobileAppPath,
  isMobileHost,
  shouldSkipMobileRewrite,
} from "@/lib/mobile";

function applyHeaders(
  request: NextRequest,
  extras: Record<string, string>
) {
  const headers = new Headers(request.headers);
  for (const [key, value] of Object.entries(extras)) {
    headers.set(key, value);
  }
  return headers;
}

function applyLocaleHeaders(
  request: NextRequest,
  locale: "en" | "th",
  innerPath: string
) {
  return applyHeaders(request, {
    "x-locale": locale,
    "x-pathname": innerPath,
  });
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get("host") || "";
  const mobileHost = isMobileHost(host);

  const isAdminPage = pathname.startsWith("/admin") || pathname.startsWith("/th/admin");
  const isAdminApi = pathname.startsWith("/api/admin");
  const isLoginPage = pathname === "/admin/login";
  const isLogoutApi = pathname === "/api/admin/auth/logout";

  if (mobileHost && (isAdminPage || isAdminApi)) {
    const dest = new URL(
      `${pathname}${request.nextUrl.search}`,
      "https://royalphuketcity.com"
    );
    return NextResponse.redirect(dest);
  }

  if (mobileHost && !shouldSkipMobileRewrite(pathname)) {
    let inner = pathname;
    if (inner === "/th" || inner.startsWith("/th/")) {
      inner = stripLocalePrefix(inner);
    }

    const destPath = isMobileAppPath(inner)
      ? inner
      : inner === "/"
        ? "/m"
        : `/m${inner}`;

    const mobileHeaders = applyHeaders(request, {
      "x-locale": "en",
      "x-pathname": destPath,
      "x-mobile-app": "1",
      "x-mobile-host": "1",
    });

    if (destPath === pathname) {
      return NextResponse.next({
        request: { headers: mobileHeaders },
      });
    }

    const url = request.nextUrl.clone();
    url.pathname = destPath;
    return NextResponse.rewrite(url, {
      request: { headers: mobileHeaders },
    });
  }

  if (!mobileHost && isMobileAppAlias(pathname)) {
    const destPath = `/m${pathname}`;
    const url = request.nextUrl.clone();
    url.pathname = destPath;
    return NextResponse.rewrite(url, {
      request: {
        headers: applyHeaders(request, {
          "x-locale": "en",
          "x-pathname": destPath,
          "x-mobile-app": "1",
        }),
      },
    });
  }

  if (isMobileAppPath(pathname)) {
    return NextResponse.next({
      request: {
        headers: applyHeaders(request, {
          "x-locale": "en",
          "x-pathname": pathname,
          "x-mobile-app": "1",
        }),
      },
    });
  }

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

    return NextResponse.next({
      request: { headers: applyLocaleHeaders(request, "en", pathname) },
    });
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
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
