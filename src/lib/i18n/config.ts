export const locales = ["en", "th"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "rpc_locale";

export const TH_PREFIX = "/th";

// Flip to true when Thai copy is approved and the header switcher should go live.
export const SHOW_LANGUAGE_SWITCHER = false;

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "en" || value === "th";
}
