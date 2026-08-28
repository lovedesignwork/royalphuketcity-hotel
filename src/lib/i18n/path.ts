import { TH_PREFIX, type Locale } from "./config";

const SKIP_PREFIX = [
  /^\/admin(?:\/|$)/,
  /^\/api(?:\/|$)/,
  /^\/_next(?:\/|$)/,
  /^\/m(?:\/|$)/,
];

export function stripLocalePrefix(pathname: string): string {
  if (pathname === TH_PREFIX || pathname === `${TH_PREFIX}/`) return "/";
  if (pathname.startsWith(`${TH_PREFIX}/`)) {
    const stripped = pathname.slice(TH_PREFIX.length);
    return stripped.length > 0 ? stripped : "/";
  }
  return pathname;
}

export function localizeHref(href: string, locale: Locale): string {
  if (!href.startsWith("/")) return href;
  if (SKIP_PREFIX.some((pattern) => pattern.test(href))) return href;
  if (href === TH_PREFIX || href.startsWith(`${TH_PREFIX}/`)) {
    return locale === "th" ? href : stripLocalePrefix(href);
  }
  if (locale !== "th") return href;
  return href === "/" ? TH_PREFIX : `${TH_PREFIX}${href}`;
}

export function switchLocaleHref(pathname: string, nextLocale: Locale): string {
  const inner = stripLocalePrefix(pathname);
  return localizeHref(inner, nextLocale);
}

export function shouldSkipLocale(pathname: string): boolean {
  if (SKIP_PREFIX.some((pattern) => pattern.test(pathname))) return true;
  if (pathname.startsWith("/images/")) return true;
  if (/\.(?:avif|css|gif|ico|jpe?g|js|json|map|png|svg|txt|webp|woff2?|xml)$/i.test(pathname)) {
    return true;
  }
  return false;
}
