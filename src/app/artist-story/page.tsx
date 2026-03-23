import { Metadata } from "next";
import Image from "next/image";
import { HeroSection, SectionHeading, ImageGallery, CTABanner } from "@/components";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Artist Story",
  description:
    "Explore the art collection at Royal Phuket City Hotel. Local Thai artists' works celebrating Phuket's rich Sino-Portuguese heritage and cultural traditions.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/artist-story`,
  },
  openGraph: {
    title: "Artist Story | Royal Phuket City Hotel",
    description:
      "Discover local Thai artists and their works celebrating Phuket's rich cultural heritage.",
    url: `${SITE_CONFIG.url}/artist-story`,
    siteName: SITE_CONFIG.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Artist Story - Royal Phuket City Hotel",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artist Story | Royal Phuket City Hotel",
    description:
      "Discover local Thai artists and their works celebrating Phuket's heritage.",
    images: ["/images/og-image.jpg"],
  },
};

const featuredArtists = [
  {
    name: "Somchai Wongkham",
    specialty: "Traditional Thai Painting",
    bio: "A master of traditional Thai art, Somchai's works in our lobby depict scenes from Phuket's rich maritime history and the Sino-Portuguese era. His use of gold leaf and natural pigments creates timeless pieces that honor centuries of artistic tradition.",
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2045&auto=format&fit=crop",
    location: "Main Lobby & Grand Ballroom",
  },
  {
    name: "Nipa Thalerngsri",
    specialty: "Contemporary Sculpture",
    bio: "Nipa's bronze sculptures blend traditional Thai motifs with contemporary forms. Her pieces in our garden and pool area explore themes of nature, spirituality, and the connection between land and sea.",
    image:
      "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2009&auto=format&fit=crop",
    location: "Garden & Pool Area",
  },
  {
    name: "Prasit Channarong",
    specialty: "Mixed Media",
    bio: "Known for his innovative use of reclaimed materials, Prasit creates works that comment on sustainability and progress. His installation in our TWIST rooftop incorporates recycled glass and metal, creating stunning reflections at sunset.",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
    location: "TWIST Rooftop",
  },
];

const artCollection = [
  {
    src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2045&auto=format&fit=crop",
    alt: "Traditional Thai painting in lobby",
  },
  {
    src: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?q=80&w=2009&auto=format&fit=crop",
    alt: "Contemporary sculpture",
  },
  {
    src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop",
    alt: "Mixed media installation",
  },
  {
    src: "https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?q=80&w=2070&auto=format&fit=crop",
    alt: "Wall mural",
  },
  {
    src: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2044&auto=format&fit=crop",
    alt: "Abstract artwork",
  },
  {
    src: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=2065&auto=format&fit=crop",
    alt: "Gallery space",
  },
];

export default function ArtistStoryPage() {
  return (
    <>
      {/* Hero Section */}
      <HeroSection
        title="Artist Story"
        subtitle="Art & Culture"
        description="Celebrating Thai artistry throughout our spaces"
        image="https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop"
        height="medium"
      />

      {/* Introduction */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              label="Our Collection"
              title="Art That Tells a Story"
            />
            <p className="text-[--color-text-secondary] text-lg">
              Royal Phuket City Hotel is more than a place to stay—it&apos;s a
              canvas for Thai artistry. Throughout our property, carefully
              curated works by local and national artists create an immersive
              cultural experience, celebrating Phuket&apos;s heritage and the
              vibrancy of contemporary Thai art.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="pb-20 md:pb-28">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Featured Artists"
            title="The Creators Behind Our Collection"
          />
          <div className="space-y-20 md:space-y-28">
            {featuredArtists.map((artist, index) => (
              <div
                key={artist.name}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] img-hover">
                    <Image
                      src={artist.image}
                      alt={`Artwork by ${artist.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <span className="label-accent text-[--color-accent] block mb-3">
                    {artist.specialty}
                  </span>
                  <h2 className="font-heading text-3xl md:text-4xl mb-4">
                    {artist.name}
                  </h2>
                  <p className="text-[--color-text-secondary] mb-6">
                    {artist.bio}
                  </p>
                  <div className="flex items-center gap-2 text-sm">
                    <svg
                      className="w-5 h-5 text-[--color-accent]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="text-[--color-text-secondary]">
                      On display: {artist.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Art Gallery */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <SectionHeading
            label="Gallery"
            title="Art Throughout Our Hotel"
            subtitle="Discover the beauty that awaits around every corner."
          />
          <ImageGallery images={artCollection} columns={3} />
        </div>
      </section>

      {/* Art Philosophy */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <SectionHeading
                label="Our Philosophy"
                title="Supporting Local Artists"
                align="left"
              />
              <div className="space-y-4 text-[--color-text-secondary]">
                <p>
                  At Royal Phuket City, we believe that art enriches the travel
                  experience. Our commitment to showcasing local artists not only
                  beautifies our spaces but also supports the creative community
                  of Phuket and Thailand.
                </p>
                <p>
                  Each piece in our collection was carefully selected to tell a
                  story—of Phuket&apos;s history, its natural beauty, its people, and
                  its place in the broader tapestry of Thai culture.
                </p>
                <p>
                  We regularly rotate exhibitions and host art events, providing a
                  platform for emerging artists and offering our guests fresh
                  perspectives on Thai creativity.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] img-hover">
              <Image
                src="https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=2065&auto=format&fit=crop"
                alt="Hotel gallery space"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Art Events */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6 text-center">
          <SectionHeading
            label="Events"
            title="Art & Cultural Programs"
            subtitle="Join us for regular art events and exhibitions."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 hairline-border">
              <h3 className="font-heading text-xl mb-2">Monthly Exhibitions</h3>
              <p className="text-sm text-[--color-text-secondary]">
                Rotating exhibitions featuring new works by Thai artists in our
                lobby gallery space.
              </p>
            </div>
            <div className="bg-white p-6 hairline-border">
              <h3 className="font-heading text-xl mb-2">Artist Meet & Greets</h3>
              <p className="text-sm text-[--color-text-secondary]">
                Quarterly events where guests can meet the artists and learn
                about their creative process.
              </p>
            </div>
            <div className="bg-white p-6 hairline-border">
              <h3 className="font-heading text-xl mb-2">Art Workshops</h3>
              <p className="text-sm text-[--color-text-secondary]">
                Hands-on workshops in traditional Thai arts, from silk painting
                to fruit carving.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Experience Art & Luxury"
        subtitle="Book Your Stay"
        image="https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?q=80&w=2044&auto=format&fit=crop"
      />
    </>
  );
}
