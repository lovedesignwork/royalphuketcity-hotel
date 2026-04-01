import { Metadata } from "next";
import { HeroSection, SectionHeading, RestaurantCard } from "@/components";
import { RESTAURANTS, SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Discover five distinctive dining venues at Royal Phuket City Hotel. From authentic Cantonese at Yan Long to rooftop cocktails at TWIST with panoramic views.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/dining`,
  },
  openGraph: {
    title: "Dining | Royal Phuket City Hotel",
    description:
      "Five distinctive dining venues from authentic Cantonese cuisine to rooftop cocktails with panoramic views.",
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
      "Five distinctive dining venues from authentic Cantonese cuisine to rooftop cocktails.",
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
        description="Five distinctive venues, endless culinary discoveries"
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
              panoramic views, our five dining venues offer diverse culinary
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {RESTAURANTS.map((restaurant) => (
              <RestaurantCard key={restaurant.slug} {...restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* In-Room Dining */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                label="24-Hour Service"
                title="In-Room Dining"
                align="left"
              />
              <div className="space-y-4 text-[--color-text-secondary]">
                <p>
                  Enjoy the comfort of dining in your room with our
                  in-room dining service. Our menu features a selection
                  of dishes from our restaurants, ensuring you can savor
                  your favorites during dining hours.
                </p>
                <p>
                  Whether it&apos;s a late-night snack, breakfast in bed, or a
                  private dinner for a special occasion, our culinary team is
                  ready to deliver exceptional cuisine directly to your door.
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[--color-accent]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Serves: Brunch, Lunch, Dinner, Snacks</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-[--color-accent]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Hours: 11 AM – 10 PM</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] img-hover">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('/images/HOTEL WEBSITE/Restaurant/154.jpg')",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
