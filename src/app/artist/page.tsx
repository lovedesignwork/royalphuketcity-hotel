import { Metadata } from "next";
import Image from "next/image";
import { HeroSection, SectionHeading } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Artist | Royal Phuket City Hotel",
  description:
    "Meet the artists whose works grace Royal Phuket City Hotel. Discover paintings and sketches of Phuket Old Town's Sino-Portuguese heritage by Ch'ng Kiah Kiean, Pitirat Yosawat, and Dr. Thiwawat.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/artist`,
  },
  openGraph: {
    title: "Artist | Royal Phuket City Hotel",
    description:
      "The artists behind the art at Royal Phuket City Hotel — celebrating Phuket's heritage through local and regional talent.",
    url: `${SITE_CONFIG.url}/artist`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Artist - Royal Phuket City Hotel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artist | Royal Phuket City Hotel",
    description:
      "Meet the artists whose works bring Phuket's heritage to life at Royal Phuket City Hotel.",
    images: ["/images/og-image.jpg"],
  },
};

type Artist = {
  name: string;
  nameTh?: string;
  specialty: string;
  bio: string;
  portrait: string;
  works: { src: string; title: string }[];
};

const artists: Artist[] = [
  {
    name: "Ch'ng Kiah Kiean",
    specialty: "Ink & Watercolour Sketch",
    bio: "A celebrated urban sketch artist from Penang whose pen-and-ink and watercolour works capture the fading beauty of Southeast Asian heritage streets. His Phuket series — sketched on location between 2014 and 2017 — records the timeworn shophouses, fishing villages, and colonial landmarks of Phuket Old Town with an unmistakable gestural line.",
    portrait: "/images/Artist/chng-kiah-kiean/portrait.jpg",
    works: [
      { src: "/images/Artist/chng-kiah-kiean/work-1.jpg", title: "Yaowarad Road, Phuket (2014)" },
      { src: "/images/Artist/chng-kiah-kiean/work-2.jpg", title: "Ban Zan, Phuket (2014)" },
      { src: "/images/Artist/chng-kiah-kiean/work-3.jpg", title: "Fishing Village, Sirea Island, Phuket (2014)" },
      { src: "/images/Artist/chng-kiah-kiean/work-4.jpg", title: "The Big Lobster, Phang Nga Road, Phuket (2017)" },
      { src: "/images/Artist/chng-kiah-kiean/work-5.jpg", title: "The Chartered Bank, Phuket Road (2017)" },
    ],
  },
  {
    name: "Pitirat Yosawat",
    nameTh: "คุณปิติรัตน์ ยศวัฒน์",
    specialty: "Contemporary Painting",
    bio: "A Thai painter whose canvases blend memory, place, and personal narrative. Pitirat's body of work — presented here as a curated selection — moves fluidly between impressionistic landscapes and quiet portrait studies, a visual diary of the artist's journey through colour, form, and the Thai south.",
    portrait: "/images/Artist/pitirat-yosawat/portrait.jpg",
    works: Array.from({ length: 15 }, (_, i) => ({
      src: `/images/Artist/pitirat-yosawat/work-${i + 1}.jpg`,
      title: `Selected Work ${i + 1}`,
    })),
  },
  {
    name: "Dr. Thiwawat",
    nameTh: "หมอทิววัฒน์",
    specialty: "Phuket Heritage Illustration",
    bio: "A physician-artist whose detailed illustration of Phuket Old Town is a love letter to the city's Sino-Portuguese soul. Created in 2024, the piece assembles landmark after landmark — shophouses, temples, cafés, and street corners — into a single, joyful map of a place the artist calls home.",
    portrait: "/images/Artist/mor-thiwawat/portrait.jpg",
    works: [
      { src: "/images/Artist/mor-thiwawat/work-1.jpg", title: "Phuket Old Town Illustrated (2024)" },
    ],
  },
];

export default function ArtistPage() {
  return (
    <main>
      {/* Hero */}
      <HeroSection
        title="Artist"
        subtitle="Art & Heritage"
        description="The artists whose works bring Phuket's story to life inside our hotel."
        image="/images/HOTEL WEBSITE/RPC-Main-Image.jpg"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label="Our Collection"
              title="Meet the Artists"
            />
            <p className="text-[--color-text-secondary] text-lg leading-relaxed">
              Royal Phuket City Hotel is proud to host the work of artists whose
              craft celebrates Phuket&apos;s heritage, culture, and sense of place.
              Each of the three featured artists brings a distinct voice — from
              sketched streetscapes of the Old Town to contemporary canvases and
              heritage illustration — together forming a quiet gallery that
              greets our guests throughout the property.
            </p>
          </div>
        </div>
      </section>

      {/* Artists */}
      <section className="pb-20 md:pb-28 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            {artists.map((artist, index) => (
              <article key={artist.name} className="py-16 md:py-20">
                {/* Artist header: portrait + bio */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start mb-12 md:mb-16">
                  <div className="lg:col-span-2">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[--color-surface]">
                      <Image
                        src={artist.portrait}
                        alt={`Portrait of ${artist.name}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  <div className="lg:col-span-3">
                    <span className="label-accent text-[--color-accent] block mb-3 tracking-[0.2em]">
                      Artist
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl mb-2">
                      {artist.name}
                    </h2>
                    {artist.nameTh && (
                      <p className="text-[--color-text-secondary] text-lg mb-4">
                        {artist.nameTh}
                      </p>
                    )}
                    <p className="text-sm uppercase tracking-[0.15em] text-[--color-accent] mb-5">
                      {artist.specialty}
                    </p>
                    <p className="text-[--color-text-secondary] text-base md:text-lg leading-relaxed">
                      {artist.bio}
                    </p>
                  </div>
                </div>

                {/* Works */}
                <div>
                  <h3 className="font-heading text-xl md:text-2xl mb-6 text-center">
                    Selected Works
                  </h3>
                  <div
                    className={`grid gap-4 md:gap-6 ${
                      artist.works.length === 1
                        ? "grid-cols-1 max-w-3xl mx-auto"
                        : artist.works.length <= 3
                          ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                          : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    }`}
                  >
                    {artist.works.map((work) => (
                      <figure
                        key={work.src}
                        className="group relative overflow-hidden bg-[--color-surface]"
                      >
                        <div className="relative aspect-[4/5]">
                          <Image
                            src={work.src}
                            alt={`${work.title} by ${artist.name}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          />
                        </div>
                        <figcaption className="p-3 text-xs md:text-sm text-[--color-text-secondary] text-center">
                          {work.title}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>

                {/* Divider between artists (not after the last one) */}
                {index < artists.length - 1 && (
                  <div className="mt-16 md:mt-20 flex items-center justify-center">
                    <div className="h-px bg-[#8B7355]/30 flex-1 max-w-[160px]" />
                    <span className="mx-6 text-[#8B7355]/60 text-xs tracking-[0.3em] uppercase">
                      ◆
                    </span>
                    <div className="h-px bg-[#8B7355]/30 flex-1 max-w-[160px]" />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
