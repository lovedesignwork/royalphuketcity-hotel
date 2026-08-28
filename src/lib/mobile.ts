import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants";

export const MOBILE_SITE_URL = "https://m.royalphuketcity.com";
export const MOBILE_FRAME_MAX = 430;

export function isMobileHost(host: string): boolean {
  const hostname = host.split(":")[0].toLowerCase();
  return hostname === "m.royalphuketcity.com" || hostname === "m.localhost";
}

export function isMobileAppPath(pathname: string): boolean {
  return pathname === "/m" || pathname.startsWith("/m/");
}

/** Paths the guest app uses that are not real desktop pages (would hit SEO [slug]). */
export const MOBILE_APP_ALIASES = [
  "/more",
  "/rooms",
  "/weddings",
  "/events",
  "/spa",
  "/around",
  "/feedback",
] as const;

export function isMobileAppAlias(pathname: string): boolean {
  return MOBILE_APP_ALIASES.some(
    (alias) => pathname === alias || pathname.startsWith(`${alias}/`)
  );
}

export function shouldSkipMobileRewrite(pathname: string): boolean {
  if (pathname.startsWith("/api")) return true;
  if (pathname.startsWith("/_next")) return true;
  if (pathname.startsWith("/admin")) return true;
  if (pathname.startsWith("/th/admin")) return true;
  if (pathname.startsWith("/images/")) return true;
  if (/\.[a-z0-9]+$/i.test(pathname)) return true;
  return false;
}

export function mobileHref(path: string, prefix: "" | "/m"): string {
  if (!path || path.startsWith("http") || path.startsWith("tel:") || path.startsWith("mailto:")) {
    return path;
  }
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (prefix === "") {
    if (clean === "/m") return "/";
    if (clean.startsWith("/m/")) return clean.slice(2);
    return clean;
  }
  if (clean === "/") return "/m";
  if (clean.startsWith("/m")) return clean;
  return `/m${clean}`;
}

export function stripMobilePrefix(pathname: string): string {
  if (pathname === "/m" || pathname === "/m/") return "/";
  if (pathname.startsWith("/m/")) return pathname.slice(2);
  return pathname;
}

const DESKTOP_CANONICAL: Record<string, string> = {
  "/": "/",
  "/rooms": "/rooms-suites",
  "/dining": "/dining",
  "/more": "/",
  "/facilities": "/facilities",
  "/promotions": "/promotions",
  "/contact": "/contact",
  "/weddings": "/wedding-venues",
  "/events": "/meeting-events",
  "/spa": "/facilities",
  "/around": "/things-to-do-phuket-old-town",
  "/around/old-town": "/things-to-do-phuket-old-town",
  "/around/nature": "/sustainability/natural-attractions",
  "/around/culture": "/sustainability/cultural-historical",
  "/around/michelin": "/sustainability/michelin-restaurants",
  "/around/activities": "/sustainability/activities",
  "/around/transport": "/sustainability/transportation",
  "/feedback": "/contact",
};

export function desktopCanonicalPath(mobilePath: string): string {
  const inner = stripMobilePrefix(mobilePath);
  if (DESKTOP_CANONICAL[inner]) return DESKTOP_CANONICAL[inner];
  if (inner.startsWith("/rooms/")) {
    return `/rooms-suites/${inner.slice("/rooms/".length)}`;
  }
  if (inner.startsWith("/dining/")) {
    return `/${inner.slice("/dining/".length)}`;
  }
  if (inner.startsWith("/promotions/")) {
    return inner;
  }
  return "/";
}

export function desktopCanonicalUrl(mobilePath: string): string {
  return `${SITE_CONFIG.url}${desktopCanonicalPath(mobilePath)}`;
}

export const mobileRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
} as const;

export function mobileMetadata(
  title: string,
  mobilePath: string,
  description?: string
): Metadata {
  return {
    title,
    description,
    robots: mobileRobots,
    alternates: {
      canonical: desktopCanonicalUrl(mobilePath),
    },
  };
}
