import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ImageGallery, ReserveButton, CTABanner } from "@/components";
import { ROOM_DETAILS } from "@/lib/room-data";
import { ROOMS } from "@/lib/constants";

interface RoomPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return Object.keys(ROOM_DETAILS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RoomPageProps): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOM_DETAILS[slug];
  
  if (!room) {
    return {
      title: "Room Not Found",
    };
  }

  return {
    title: room.name,
    description: room.description[0],
  };
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { slug } = await params;
  const room = ROOM_DETAILS[slug];

  if (!room) {
    notFound();
  }

  const otherRooms = ROOMS.filter((r) => r.slug !== slug);

  return (
    <>
      {/* Hero Image */}
      <section className="relative h-[70vh] min-h-[500px]">
        <Image
          src={room.images[0].src}
          alt={room.images[0].alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/20" />
      </section>

      {/* Room Info Header */}
      <section className="py-12 bg-white hairline-border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <span className="label-accent text-[--color-accent] block mb-2">
                {room.category}
              </span>
              <h1 className="font-heading text-4xl md:text-5xl mb-4">
                {room.name}
              </h1>
              <p className="text-[--color-text-secondary]">
                {room.views.join(" • ")}
              </p>
            </div>
            <ReserveButton size="large" />
          </div>
        </div>
      </section>

      {/* Room Details Strip */}
      <section className="bg-white border-b border-[--color-border]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-[--color-border]">
            {[
              {
                label: "Room Size",
                value: room.size,
                icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4",
              },
              {
                label: "Guests",
                value: `Up to ${room.maxGuests}`,
                icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
              },
              {
                label: "Bed Type",
                value: room.bedType,
                icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
              },
              {
                label: "View",
                value: room.views[0],
                icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
              },
            ].map((detail) => (
              <div key={detail.label} className="flex items-center gap-4 px-8 py-6">
                {/* Gold left accent bar */}
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

      {/* Description & Amenities */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Description */}
            <div>
              <h2 className="font-heading text-3xl mb-6">About This Room</h2>
              <div className="space-y-4 text-[--color-text-secondary]">
                {room.description.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Amenities */}
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
                    <span className="text-[--color-text-secondary]">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl text-center mb-12">Gallery</h2>
          <ImageGallery images={room.images} columns={4} />
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        title="Ready to Book Your Stay?"
        subtitle="Reserve Now"
        image="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Other Rooms */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <h2 className="font-heading text-3xl text-center mb-12">
            Explore Other Rooms
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {otherRooms.map((otherRoom) => (
              <Link
                key={otherRoom.slug}
                href={`/room/${otherRoom.slug}`}
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
