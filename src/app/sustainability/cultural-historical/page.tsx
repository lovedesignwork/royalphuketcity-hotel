import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Cultural & Historical Attractions Near Royal Phuket City Hotel",
  description:
    "Explore Phuket's rich cultural heritage including temples, historic streets, and traditional markets near Royal Phuket City Hotel.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/sustainability/cultural-historical`,
  },
};

const attractions = [
  {
    name: "Big Buddha Temple (Phra Phutthamingmongkol Akenakkhiri)",
    description:
      "Standing 45 meters tall atop Nakkerd Hill, the Big Buddha is one of Phuket's most iconic landmarks. This magnificent white marble statue can be seen from almost anywhere in the south of the island. The hilltop temple complex offers stunning 360-degree views of Phuket, and the journey up provides a peaceful escape from the bustle below. Respectful dress is required for entry.",
    distance: "12 km from hotel (25-minute drive)",
    images: [
      "/images/cultural-historical/Big Buddha Tample (1).jpg",
      "/images/cultural-historical/Big Buddha Tample (2).jpg",
      "/images/cultural-historical/Big Buddha Tample (3).jpg",
    ],
  },
  {
    name: "Wat Chalong (Chalong Temple)",
    description:
      "The most important and visited temple in Phuket, Wat Chalong is a stunning Buddhist complex featuring beautifully ornate buildings, a grand pagoda housing a bone fragment of Buddha, and peaceful grounds perfect for contemplation. The temple is particularly significant for locals and attracts devotees from across Thailand. The architecture showcases the finest of Thai Buddhist design.",
    distance: "10 km from hotel (20-minute drive)",
    images: [
      "/images/cultural-historical/Chalong Temple (Way Chalong) (1).jpg",
      "/images/cultural-historical/Chalong Temple (Way Chalong) (2).jpg",
      "/images/cultural-historical/Chalong Temple (Way Chalong) (3).webp",
    ],
  },
  {
    name: "Lard Yai Walking Street Market",
    description:
      "Every Sunday, Thalang Road in Phuket Old Town transforms into a vibrant walking street market. Local vendors sell traditional crafts, souvenirs, and authentic Phuket cuisine. The market showcases the Sino-Portuguese heritage buildings as a backdrop, creating a unique atmosphere that blends history with local culture. It's the perfect place to experience authentic Phuket.",
    distance: "Walking distance from hotel (5 minutes)",
    images: [
      "/images/cultural-historical/lard yai walking street market (1).webp",
      "/images/cultural-historical/lard yai walking street market (2).jpg",
      "/images/cultural-historical/lard yai walking street market (3).jpg",
      "/images/cultural-historical/lard yai walking street market (4).jpg",
    ],
  },
  {
    name: "Soi Romanee & Thalang Road",
    description:
      "Step back in time on the colorful streets of Phuket Old Town. Soi Romanee, with its pastel-painted Sino-Portuguese shophouses, is one of the most photogenic streets in Thailand. Thalang Road, the main heritage street, features beautifully preserved architecture, local cafes, and boutique shops. These historic lanes tell the story of Phuket's tin mining era and Chinese immigrant heritage.",
    distance: "Walking distance from hotel (5-8 minutes)",
    images: [
      "/images/cultural-historical/Romanee Road (2).jpg",
      "/images/cultural-historical/Romanee Road (3).jpg",
      "/images/cultural-historical/Romanee Road (4).jpg",
      "/images/cultural-historical/thalang road (1).jpg",
      "/images/cultural-historical/thalang road (2).jpg",
    ],
  },
  {
    name: "Queen Sirikit 72nd Anniversary Park (Dragon Park)",
    description:
      "This beautiful park, built to honor Her Majesty Queen Sirikit, features a stunning Chinese dragon sculpture as its centerpiece. The park offers a peaceful retreat with manicured gardens, walking paths, and cultural displays. It's a wonderful example of Phuket's commitment to preserving green spaces within the city.",
    distance: "3 km from hotel (10-minute drive)",
    images: [
      "/images/cultural-historical/queen sirikit 72nd anniversary Chaloem Phrakiat Park (Dragon Park) (1).jpg",
      "/images/cultural-historical/queen sirikit 72nd anniversary Chaloem Phrakiat Park (Dragon Park) (2).jpg",
    ],
  },
];

export default function CulturalHistoricalPage() {
  return (
    <>
      <HeroSection
        title="Cultural & Historical Attractions"
        subtitle="Discover Phuket's Heritage"
        description="Explore the rich cultural tapestry and historical treasures of Phuket"
        image="/images/cultural-historical/Big Buddha Tample (1).jpg"
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-12 text-center">
              Phuket&apos;s cultural heritage spans centuries, from ancient Buddhist temples 
              to the colorful Sino-Portuguese shophouses of Old Town. Royal Phuket City 
              Hotel is ideally located to explore both the spiritual and architectural 
              treasures of this remarkable island.
            </p>

            <div className="space-y-16">
              {attractions.map((attraction, index) => (
                <div
                  key={attraction.name}
                  className="border border-gray-200 bg-white overflow-hidden"
                >
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    <div className={`relative aspect-[4/3] ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                      <Image
                        src={attraction.images[0]}
                        alt={attraction.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className={`p-8 lg:p-12 flex flex-col justify-center ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                      <p className="text-[11px] tracking-[0.2em] uppercase text-[#8b7355] font-medium mb-2">
                        {attraction.distance}
                      </p>
                      <h2 className="font-heading text-2xl md:text-3xl mb-4">
                        {attraction.name}
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        {attraction.description}
                      </p>
                    </div>
                  </div>

                  {attraction.images.length > 1 && (
                    <div className="grid grid-cols-3 gap-1 p-1 bg-gray-100">
                      {attraction.images.slice(1, 4).map((img, imgIndex) => (
                        <div key={imgIndex} className="relative aspect-[4/3]">
                          <Image
                            src={img}
                            alt={`${attraction.name} ${imgIndex + 2}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 33vw, 300px"
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
            Explore Phuket Old Town
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Many of these cultural attractions are within walking distance of our hotel. 
            Ask our concierge for a heritage walking map and recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/things-to-do-phuket-old-town"
              className="inline-block bg-[#8b7355] text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#705c42] transition-colors"
            >
              Things to Do in Old Town
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
