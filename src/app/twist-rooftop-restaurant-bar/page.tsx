import { Metadata } from "next";
import RestaurantPageTemplate from "@/components/RestaurantPageTemplate";
import { SITE_CONFIG } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import {
  getLocalizedRestaurantDetail,
  getRestaurantMeta,
} from "@/lib/i18n/dining-copy";
import { localizeHref } from "@/lib/i18n/path";

const slug = "twist-rooftop-restaurant-bar";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const meta = getRestaurantMeta(slug, locale);
  const path = localizeHref(`/${slug}`, locale);
  return {
    title: meta.name,
    description: meta.metaDesc,
    alternates: {
      canonical: `${SITE_CONFIG.url}${path}`,
      languages: {
        en: `${SITE_CONFIG.url}/${slug}`,
        th: `${SITE_CONFIG.url}/th/${slug}`,
      },
    },
    openGraph: {
      title: `${meta.name} | ${locale === "th" ? "โรงแรมรอยัล ภูเก็ต ซิตี้" : "Royal Phuket City Hotel"}`,
      description: meta.ogDesc,
      url: `${SITE_CONFIG.url}${path}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: meta.image,
          width: 1200,
          height: 630,
          alt: meta.name,
        },
      ],
      locale: locale === "th" ? "th_TH" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.name} | ${locale === "th" ? "โรงแรมรอยัล ภูเก็ต ซิตี้" : "Royal Phuket City Hotel"}`,
      description: meta.ogDesc,
      images: [meta.image],
    },
  };
}

export default async function TwistRooftopPage() {
  const locale = await getLocale();
  const restaurant = getLocalizedRestaurantDetail(slug, locale);
  if (!restaurant) return null;
  return <RestaurantPageTemplate restaurant={restaurant} />;
}
