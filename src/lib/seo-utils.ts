import type { Metadata } from "next";
import { SITE_CONFIG } from "./constants";
import { SHOW_LANGUAGE_SWITCHER, type Locale } from "./i18n/config";
import { localizeHref, stripLocalePrefix } from "./i18n/path";

interface PageSEOOptions {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  locale?: Locale;
  noIndex?: boolean;
}

function normalizePagePath(path: string): string {
  const pathname = path.split(/[?#]/)[0];
  const normalized = `/${pathname}`.replace(/\/{2,}/g, "/");
  return stripLocalePrefix(normalized).replace(/\/$/, "") || "/";
}

export function getPageAlternates(path: string, locale: Locale = "en"): Metadata["alternates"] {
  const pathname = normalizePagePath(path);
  const enUrl = new URL(pathname, SITE_CONFIG.url).toString();
  const thUrl = new URL(localizeHref(pathname, "th"), SITE_CONFIG.url).toString();

  return {
    canonical: locale === "th" ? thUrl : enUrl,
    // Thai URLs are previews until the existing translation launch flag is enabled.
    ...(SHOW_LANGUAGE_SWITCHER ? {
      languages: { en: enUrl, th: thUrl, "x-default": enUrl },
    } : {}),
  };
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = "/images/og-image.jpg",
  locale = "en",
  noIndex = false,
}: PageSEOOptions): Metadata {
  const alternates = getPageAlternates(path, locale);
  const url = alternates?.canonical as string;
  const brandedTitle = title.includes(SITE_CONFIG.name)
    ? title
    : `${title} | ${SITE_CONFIG.name}`;
  const imageUrl = new URL(ogImage, SITE_CONFIG.url).toString();

  const metadata: Metadata = {
    // An absolute title avoids appending the hotel name twice in parent layouts.
    title: { absolute: brandedTitle },
    description,
    alternates,
    openGraph: {
      title: brandedTitle,
      description,
      url,
      siteName: SITE_CONFIG.name,
      images: [{ url: imageUrl, alt: `${title} - ${SITE_CONFIG.name}` }],
      locale: locale === "th" ? "th_TH" : "en_US",
      ...(SHOW_LANGUAGE_SWITCHER ? {
        alternateLocale: locale === "th" ? ["en_US"] : ["th_TH"],
      } : {}),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: brandedTitle,
      description,
      images: [imageUrl],
    },
  };

  if (noIndex || (locale === "th" && !SHOW_LANGUAGE_SWITCHER)) {
    metadata.robots = {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    };
  }

  return metadata;
}

export function generateRoomMetadata(
  room: {
    name: string;
    slug: string;
    description: string[];
    category: string;
  },
  locale: Locale = "en"
): Metadata {
  const description = `${room.name} at Royal Phuket City Hotel. ${room.description[0] || "Explore room facilities and book your stay in Phuket Town."}`;

  return generatePageMetadata({
    title: `${room.name}${room.category !== room.name ? ` - ${room.category}` : ""}`,
    description: description.length > 160 ? `${description.slice(0, 157).trimEnd()}...` : description,
    path: `/rooms-suites/${room.slug}`,
    locale,
  });
}
