import { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Michelin Restaurants Near Royal Phuket City Hotel",
  description:
    "Discover award-winning Michelin Guide restaurants near Royal Phuket City Hotel in Phuket Old Town.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/sustainability/michelin-restaurants`,
  },
};

const restaurants = [
  {
    name: "Suay Restaurant",
    distinction: "Michelin Plate",
    cuisine: "Modern Thai",
    description:
      "A stylish restaurant in a beautifully restored Sino-Portuguese building, Suay offers creative Thai cuisine with a contemporary twist. The menu celebrates local Phuket ingredients with innovative presentations.",
    address: "50/2 Takuapa Road, Phuket Old Town",
    distance: "8 minutes walk",
  },
  {
    name: "Tu Kab Khao",
    distinction: "Michelin Plate",
    cuisine: "Southern Thai",
    description:
      "Authentic Southern Thai flavors in a charming Old Town setting. Known for bold, spicy dishes and traditional recipes passed down through generations.",
    address: "8 Phang Nga Road, Phuket Old Town",
    distance: "5 minutes walk",
  },
  {
    name: "One Chun",
    distinction: "Michelin Guide Recommended",
    cuisine: "Phuketian-Chinese",
    description:
      "A local institution serving authentic Phuketian-Chinese dishes in a nostalgic setting. Famous for its moo hong (braised pork belly) and other traditional specialties.",
    address: "48/1 Thepkrasattri Road, Phuket Town",
    distance: "10 minutes drive",
  },
  {
    name: "Raya Restaurant",
    distinction: "Michelin Guide Recommended",
    cuisine: "Southern Thai & Phuketian",
    description:
      "Set in a gorgeous century-old Sino-Portuguese mansion, Raya serves classic Phuket dishes in an atmosphere that transports you back in time. A must-visit for authentic local cuisine.",
    address: "48 Dibuk Road, Phuket Old Town",
    distance: "7 minutes walk",
  },
];

export default function MichelinRestaurantsPage() {
  return (
    <>
      <HeroSection
        title="Michelin Guide Restaurants"
        subtitle="Culinary Excellence in Phuket"
        description="Experience award-winning dining near Royal Phuket City Hotel"
        image="/images/HOTEL WEBSITE/YL Food 002.jpg"
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium">
                Gastronomic Excellence
              </span>
              <h2 className="font-heading text-3xl md:text-4xl mt-3 mb-6">
                Dining Beyond Our Doors
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Phuket Old Town has emerged as one of Thailand&apos;s most exciting culinary 
                destinations. Several restaurants within walking distance or a short drive 
                from Royal Phuket City Hotel have received recognition from the prestigious 
                Michelin Guide.
              </p>
            </div>

            <div className="space-y-6">
              {restaurants.map((restaurant) => (
                <div
                  key={restaurant.name}
                  className="bg-white border border-gray-200 p-6 md:p-8 hover:border-[#8b7355] transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-heading text-xl md:text-2xl">
                          {restaurant.name}
                        </h3>
                        <span className="inline-block bg-[#8b7355] text-white text-[10px] tracking-wider uppercase px-2 py-1">
                          {restaurant.distinction}
                        </span>
                      </div>
                      <p className="text-sm text-[#8b7355] mb-3">{restaurant.cuisine}</p>
                      <p className="text-gray-600 leading-relaxed mb-3">
                        {restaurant.description}
                      </p>
                      <p className="text-sm text-gray-500">{restaurant.address}</p>
                    </div>
                    <div className="md:text-right md:min-w-[140px]">
                      <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                        <svg className="w-4 h-4 text-[#8b7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {restaurant.distance}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-6 bg-[#FAF8F5] border border-gray-200">
              <p className="text-center text-gray-600 text-sm">
                <strong>Note:</strong> Reservations are recommended for all Michelin-recognized restaurants, 
                especially during peak season. Our concierge team is happy to assist with booking arrangements.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl mb-4">
            Dining at Royal Phuket City
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Don&apos;t miss our own award-winning restaurants, including Yan Long Chinese 
            Restaurant and the TWIST Rooftop with Phuket&apos;s most stunning views.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/dining"
              className="inline-block bg-[#8b7355] text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#705c42] transition-colors"
            >
              Our Restaurants
            </Link>
            <Link
              href="/sustainability"
              className="inline-block border border-[#8b7355] text-[#8b7355] px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#8b7355] hover:text-white transition-colors"
            >
              Back to Sustainability
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
