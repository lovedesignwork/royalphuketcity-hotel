"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, SHOW_LANGUAGE_SWITCHER } from "@/lib/i18n/config";
import { switchLocaleHref } from "@/lib/i18n/path";
import { useLocale } from "@/components/i18n/LocaleProvider";

function persistLocale(next: "en" | "th") {
  document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
}

export default function LanguageSwitcher({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { locale, t } = useLocale();
  const pathname = usePathname() || "/";
  if (!SHOW_LANGUAGE_SWITCHER) return null;
  const enHref = switchLocaleHref(pathname, "en");
  const thHref = switchLocaleHref(pathname, "th");

  const itemClass = compact
    ? "min-h-11 min-w-11 inline-flex items-center justify-center text-[13px] font-medium transition-colors"
    : "min-h-9 px-1.5 inline-flex items-center justify-center text-[11px] font-medium transition-colors";

  return (
    <nav
      aria-label={t.header.language}
      className={`flex items-center ${compact ? "gap-1" : "gap-0.5"}`}
    >
      <Link
        href={enHref}
        hrefLang="en"
        onClick={() => persistLocale("en")}
        aria-label={t.header.switchToEnglish}
        aria-current={locale === "en" ? "true" : undefined}
        className={`${itemClass} ${
          locale === "en"
            ? "text-[#8b7355]"
            : "text-gray-400 hover:text-[#8b7355]"
        }`}
      >
        {t.header.english}
      </Link>
      <span className="text-gray-300 text-[10px] px-0.5" aria-hidden="true">
        |
      </span>
      <Link
        href={thHref}
        hrefLang="th"
        onClick={() => persistLocale("th")}
        aria-label={t.header.switchToThai}
        aria-current={locale === "th" ? "true" : undefined}
        lang="th"
        className={`${itemClass} ${
          locale === "th"
            ? "text-[#8b7355]"
            : "text-gray-400 hover:text-[#8b7355]"
        }`}
      >
        {t.header.thai}
      </Link>
    </nav>
  );
}
