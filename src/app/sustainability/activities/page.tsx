import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Activities Near Royal Phuket City Hotel",
  description:
    "Discover exciting activities near Royal Phuket City Hotel including island hopping, water parks, and adventure sports.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/sustainability/activities`,
  },
};

const activities = [
  {
    name: "Island Hopping from Rassada Pier",
    description:
      "Embark on unforgettable island adventures departing from Rassada Pier, just a short drive from our hotel. Explore the stunning Phi Phi Islands, James Bond Island, or the pristine Similan Islands. Choose from speedboat tours, longtail boat excursions, or luxury yacht charters for a day of snorkeling, swimming, and discovering Thailand's most beautiful marine destinations.",
    distance: "4 km from hotel (12-minute drive)",
    images: [
      "/images/activities/rassada pier (Island hopping to Phi Phi Island) (1).jpg",
      "/images/activities/rassada pier (Island hopping to Phi Phi Island) (2).jpg",
      "/images/activities/rassada pier (Island hopping to Phi Phi Island) (3).webp",
    ],
  },
  {
    name: "Andamanda Water Park",
    description:
      "Experience Thailand's newest and most exciting water park, Andamanda Phuket. Spanning over 100,000 square meters, this Thai-themed water park features thrilling water slides, a wave pool, lazy river, and dedicated kids' zones. Perfect for families and thrill-seekers alike, it combines the excitement of a world-class water park with the beauty of Thai design and culture.",
    distance: "15 km from hotel (25-minute drive)",
    images: [
      "/images/activities/water Park (Andamanda) (1).jpg",
      "/images/activities/water Park (Andamanda) (2).jpg",
      "/images/activities/water Park (Andamanda) (3).webp",
    ],
  },
  {
    name: "Hanuman World Zipline Adventure",
    description:
      "Soar through the ancient rainforest canopy at Hanuman World, one of Phuket's most popular eco-adventure attractions. This world-class zipline course features 16 platforms, 30+ stations, and some of the longest ziplines in Asia. Experience the thrill of flying above the trees while learning about the rainforest ecosystem — a perfect blend of adventure and environmental education.",
    distance: "12 km from hotel (20-minute drive)",
    images: [
      "/images/activities/zipline Hanuman word.jpg",
      "/images/activities/zipline Hanuman word (1).jpg",
      "/images/activities/zipline Hanuman word (2).jpg",
    ],
  },
];

export default function ActivitiesPage() {
  return (
    <>
      <HeroSection
        title="Activities & Adventures"
        subtitle="Experience Phuket"
        description="Exciting activities and adventures within easy reach of Royal Phuket City Hotel"
        image="/images/activities/water Park (Andamanda) (1).jpg"
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-12 text-center">
              From island hopping to rainforest adventures, Phuket offers a wealth of 
              activities for every type of traveler. Our concierge team can help you 
              arrange tours and transportation to these popular attractions, ensuring 
              you make the most of your stay.
            </p>

            <div className="space-y-16">
              {activities.map((activity, index) => (
                <div
                  key={activity.name}
                  className="border border-gray-200 bg-white overflow-hidden"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    <div className={`relative aspect-[4/3] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <Image
                        src={activity.images[0]}
                        alt={activity.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium mb-2">
                        {activity.distance}
                      </p>
                      <h2 className="font-heading text-2xl md:text-3xl mb-4">
                        {activity.name}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {activity.description}
                      </p>
                    </div>
                  </div>

                  {activity.images.length > 1 && (
                    <div className="grid grid-cols-2 gap-1 p-1 bg-gray-100">
                      {activity.images.slice(1, 3).map((img, imgIndex) => (
                        <div key={imgIndex} className="relative aspect-[4/3]">
                          <Image
                            src={img}
                            alt={`${activity.name} ${imgIndex + 2}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, 400px"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-[#FAF8F5]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-heading text-2xl md:text-3xl mb-4">
            Need Help Planning?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our concierge team is available to help you book tours, arrange 
            transportation, and plan your perfect Phuket adventure.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block bg-[#8b7355] text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#705c42] transition-colors"
            >
              Contact Concierge
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
