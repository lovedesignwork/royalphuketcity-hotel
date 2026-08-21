import { Metadata } from "next";
import { HeroSection, SectionHeading, RestaurantCard } from "@/components";
import { RESTAURANTS, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Discover the dining venues at Royal Phuket City Hotel. From authentic Cantonese at Yan Long to rooftop cocktails at TWIST with panoramic views.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dining`,
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
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dining | Royal Phuket City Hotel",
    description:
      "Distinctive dining venues from authentic Cantonese cuisine to rooftop cocktails.",
    images: ["/images/og-image.jpg"],
  },
};

export default function DiningPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Dining"
        subtitle="Culinary Experiences"
        description="Distinctive venues, endless culinary discoveries"
        image="/images/HOTEL WEBSITE/Restaurant/TWIST_001-_resize.jpg"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label="A Culinary Journey"
              title="Taste the World at Royal Phuket City"
            />
            <p className="text-[--color-text-secondary] text-lg">
              From authentic Cantonese dim sum to sunset cocktails with
              panoramic views, our dining venues offer diverse culinary
              experiences to satisfy every palate. Each restaurant is helmed by
              passionate chefs dedicated to crafting memorable dishes using the
              finest local and imported ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* Restaurants */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
            {RESTAURANTS.map((restaurant) => (
              <RestaurantCard key={restaurant.slug} {...restaurant} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
