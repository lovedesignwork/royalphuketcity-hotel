import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ImageGallery,
  ReserveButton,
  Breadcrumbs,
  RoomPhotoSlider,
} from "@/components";
import { HotelRoomJsonLd } from "@/components/JsonLd";
import { ROOM_DETAILS } from "@/lib/room-data";
import { ROOMS, SITE_CONFIG } from "@/lib/constants";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(ROOM_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOM_DETAILS[slug];

  if (!room) {
    return {
      title: "Room Not Found | Royal Phuket City Hotel",
    };
  }

  return {
    title: room.name,
    description: `${room.name} room at Royal Phuket City Hotel. ${room.size} of elegant comfort with ${room.views.join(", ")}. Perfect for up to ${room.maxGuests} guests.`,
    alternates: {
      canonical: `${SITE_CONFIG.url}/rooms-suites/${slug}`,
    },
    openGraph: {
      title: `${room.name} | ${SITE_CONFIG.name}`,
      description: room.description[0],
      url: `${SITE_CONFIG.url}/rooms-suites/${slug}`,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: room.images[0].src,
          width: 1200,
          height: 630,
          alt: room.images[0].alt,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${room.name} | ${SITE_CONFIG.name}`,
      description: room.description[0],
      images: [room.images[0].src],
    },
  };
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = ROOM_DETAILS[slug];

  if (!room) {
    notFound();
  }

  const otherRooms = ROOMS.filter((r) => r.slug !== slug);

  return (
    <>
      <HotelRoomJsonLd
        name={room.name}
        description={room.description[0]}
        image={room.images[0].src}
        url={`/rooms-suites/${slug}`}
        bedType={room.bedType}
        occupancy={room.maxGuests}
        floorSize={room.size}
        amenities={room.amenities}
      />

      <RoomPhotoSlider photos={room.images} />

      <section className="py-12 bg-white hairline-border-b">
        <div className="container mx-auto px-6">
          <Breadcrumbs
            items={[
              { label: "Rooms & Suites", href: "/rooms-suites" },
              { label: room.name, href: `/rooms-suites/${slug}` },
            ]}
          />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl">{room.name}</h1>
            </div>
            <ReserveButton size="large" />
          </div>
        </div>
      </section>

      <section className="bg-white border-b border-[#8B7355]/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[#8B7355]/50">
            {[
              { label: "Room Size", value: room.size },
              { label: "Guests", value: `Up to ${room.maxGuests}` },
              { label: "Bed Type", value: room.bedType },
              { label: "View", value: room.views[0] },
            ].map((detail) => (
              <div
                key={detail.label}
                className="flex items-center gap-4 px-8 py-6"
              >
                <div className="w-0.5 h-10 bg-[#8B7355] flex-shrink-0" />
                <div>
                  <p className="text-[10px] tracking-[0.18em] uppercase text-[--color-text-secondary] mb-1">
                    {detail.label}
                  </p>
                  <p className="font-heading text-lg text-[--color-text-primary] leading-tight">
                    {detail.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <h2 className="font-heading text-3xl mb-6">About This Room</h2>
              <div className="space-y-4 text-[--color-text-secondary]">
                {room.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-heading text-3xl mb-6">Room Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-[--color-accent] flex-shrink-0"
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
                    <span className="text-[--color-text-secondary]">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-[--color-surface] lg:hidden">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl text-center mb-12">Gallery</h2>
          <ImageGallery images={room.images} columns={4} />
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl text-center mb-12">
            Explore Other Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherRooms.slice(0, 4).map((otherRoom) => (
              <Link
                key={otherRoom.slug}
                href={`/rooms-suites/${otherRoom.slug}`}
                className="group relative aspect-[16/9] img-hover"
              >
                <Image
                  src={otherRoom.image}
                  alt={otherRoom.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <span className="label-accent text-white/80 block mb-2">
                      {otherRoom.category}
                    </span>
                    <h3 className="font-heading text-2xl md:text-3xl">
                      {otherRoom.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
