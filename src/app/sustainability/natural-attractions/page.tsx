import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Natural Attractions Near Royal Phuket City Hotel",
  description:
    "Discover beautiful natural attractions near Royal Phuket City Hotel including Khao Rang Viewpoint and Saphan Hin Park.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/sustainability/natural-attractions`,
  },
};

const attractions = [
  {
    name: "Khao Rang Viewpoint",
    description:
      "Perched atop Rang Hill in the heart of Phuket Town, Khao Rang Viewpoint offers breathtaking panoramic views of the city and surrounding sea. This popular lookout point features a peaceful park setting with walking trails, fitness stations, and several cafes where you can enjoy refreshments while taking in the scenery. The viewpoint is especially magical at sunset when the sky transforms into a canvas of golden and pink hues.",
    distance: "3 km from hotel (10-minute drive)",
    images: [
      "/images/natural-attractions/khao rang viewpoint (1).jpg",
      "/images/natural-attractions/khao rang viewpoint (2).jpg",
      "/images/natural-attractions/khao rang viewpoint (3).jpg",
    ],
  },
  {
    name: "Saphan Hin Park",
    description:
      "Saphan Hin is Phuket Town's largest public park and recreational area, stretching along the eastern coast. This expansive green space is a favorite among locals for jogging, cycling, and evening strolls. The park features sports facilities, a playground, and waterfront promenades with views across Phuket Bay. It's an excellent place to experience local life and enjoy nature within the city.",
    distance: "2.5 km from hotel (8-minute drive)",
    images: [
      "/images/natural-attractions/saphan hin park (1).jpg",
      "/images/natural-attractions/saphan hin park (2).webp",
      "/images/natural-attractions/saphan hin park (4).webp",
      "/images/natural-attractions/saphan hin park (5).webp",
      "/images/natural-attractions/saphan hin park (6).webp",
    ],
  },
];

export default function NaturalAttractionsPage() {
  return (
    <>
      <HeroSection
        title="Natural Attractions"
        subtitle="Explore Nature Near Our Hotel"
        description="Discover the beautiful natural attractions within easy reach of Royal Phuket City Hotel"
        image="/images/natural-attractions/khao rang viewpoint (1).jpg"
        height="medium"
      />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed mb-12 text-center">
              Phuket Town offers more than just cultural heritage — it&apos;s also home to 
              beautiful natural spaces perfect for outdoor activities and peaceful escapes. 
              As a sustainably-minded hotel, we encourage our guests to explore these 
              eco-friendly attractions that showcase the natural beauty of our island.
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
            Explore More of Phuket
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Return to our sustainability page to discover more eco-friendly activities 
            and attractions around Royal Phuket City Hotel.
          </p>
          <Link
            href="/sustainability"
            className="inline-block bg-[#8b7355] text-white px-8 py-3 text-sm tracking-wider uppercase hover:bg-[#705c42] transition-colors"
          >
            Back to Sustainability
          </Link>
        </div>
      </section>
    </>
  );
}
