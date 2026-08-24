import { Metadata } from "next";
import { HeroSection, SectionHeading, RestaurantCard } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/messages";
import { getLocalizedRestaurants } from "@/lib/i18n/localized-data";
import { localizeHref } from "@/lib/i18n/path";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const path = localizeHref("/dining", locale);
  return {
  title: t.diningPage.metaTitle,
  description: t.diningPage.metaDesc,
  alternates: {
    canonical: `${SITE_CONFIG.url}${path}`,
    languages: {
      en: `${SITE_CONFIG.url}/dining`,
      th: `${SITE_CONFIG.url}/th/dining`,
    },
  },
  openGraph: {
    title: "Dining | Royal Phuket City Hotel",
    description:
      "Distinctive dining venues from authentic Cantonese cuisine to rooftop cocktails with panoramic views.",
    url: `${SITE_CONFIG.url}/dining`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Dining at Royal Phuket City Hotel",
      },
    ],
    locale: locale === "th" ? "th_TH" : "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: t.diningPage.metaTitle,
    description: t.diningPage.metaDesc,
    images: ["/images/og-image.jpg"],
  },
  };
}

export default async function DiningPage() {
  const locale = await getLocale();
  const t = getDictionary(locale);
  const restaurants = getLocalizedRestaurants(locale);
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title={t.diningPage.heroTitle}
        subtitle={t.diningPage.heroSubtitle}
        description={t.diningPage.heroDesc}
        image="/images/HOTEL WEBSITE/Restaurant/TWIST_001-_resize.jpg"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label={t.diningPage.label}
              title={t.diningPage.title}
            />
            <p className="text-[--color-text-secondary] text-lg">
              {t.diningPage.body}
            </p>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.slug} {...restaurant} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
