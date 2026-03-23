import { Metadata } from "next";
import { HeroSection, SectionHeading, RestaurantCard } from "@/components";
import { RESTAURANTS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dining",
  description:
    "Discover five distinctive dining venues at Royal Phuket City Hotel, from authentic Cantonese cuisine at Yan Long to rooftop cocktails at TWIST.",
};

export default function DiningPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Dining"
        subtitle="Culinary Experiences"
        description="Five distinctive venues, endless culinary discoveries"
        image="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop"
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
                  comprehensive 24-hour in-room dining service. Our menu
                  features a selection of dishes from all our restaurants,
                  ensuring you can savor your favorites any time of day.
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
                  <span>Available 24 hours</span>
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
                  <span>Full restaurant menu selection</span>
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
                  <span>Dietary accommodations available</span>
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
                  <span>Special occasion setups</span>
                </div>
              </div>
            </div>
            <div className="relative aspect-[4/3] img-hover">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2070&auto=format&fit=crop')",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
