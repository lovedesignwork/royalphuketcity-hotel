import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ROOMS, SITE_CONFIG, EXTERNAL_LINKS } from "@/lib/constants";
import { HeroSection } from "@/components";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return ROOMS.map((room) => ({
    slug: room.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);

  if (!room) {
    return {
      title: "Room Not Found | Royal Phuket City Hotel",
    };
  }

  return {
    title: `${room.name} | Rooms & Suites | Royal Phuket City Hotel`,
    description: room.shortDescription,
    openGraph: {
      title: `${room.name} | Royal Phuket City Hotel`,
      description: room.shortDescription,
      images: [room.image],
      url: `${SITE_CONFIG.url}/rooms-suites/${room.slug}`,
    },
  };
}

const ROOM_AMENITIES = [
  { name: "Free High-Speed WiFi", icon: "wifi" },
  { name: "Smart TV", icon: "tv" },
  { name: "Air Conditioning", icon: "ac" },
  { name: "Mini Bar", icon: "minibar" },
  { name: "In-Room Safe", icon: "safe" },
  { name: "Coffee & Tea", icon: "coffee" },
  { name: "Bathrobes & Slippers", icon: "bathrobe" },
  { name: "Rain Shower", icon: "shower" },
  { name: "Premium Toiletries", icon: "toiletries" },
  { name: "Hair Dryer", icon: "hairdryer" },
  { name: "Daily Housekeeping", icon: "housekeeping" },
  { name: "24-Hour Room Service", icon: "roomservice" },
];

function AmenityIcon({ type }: { type: string }) {
  const icons: Record<string, JSX.Element> = {
    wifi: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
      </svg>
    ),
    tv: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    ac: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
    ),
    minibar: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" />
      </svg>
    ),
    safe: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    coffee: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
      </svg>
    ),
    bathrobe: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    shower: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 0c-2.796 0-5.25 2.25-5.25 5.25v.75h10.5v-.75c0-3-2.454-5.25-5.25-5.25zM6.75 11.25v9.75m10.5-9.75v9.75M3.75 11.25h16.5" />
      </svg>
    ),
    toiletries: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21a48.309 48.309 0 01-8.135-.687c-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    hairdryer: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    housekeeping: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    roomservice: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  return icons[type] || icons.wifi;
}

export default async function RoomDetailPage({ params }: Props) {
  const { slug } = await params;
  const room = ROOMS.find((r) => r.slug === slug);

  if (!room) {
    notFound();
  }

  const hasSeaView = room.views.some((v) => v.toLowerCase().includes("sea"));
  const otherRooms = ROOMS.filter((r) => r.slug !== slug).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <HeroSection
        title={room.name}
        subtitle={room.category}
        description={room.shortDescription}
        backgroundImage={room.image}
        height="h-[70vh]"
      />

      {/* Room Details */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left - Image Gallery */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={room.image}
                  alt={room.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
                {hasSeaView && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#8B7355] text-white px-4 py-2 text-xs tracking-[0.2em] uppercase font-medium">
                      Partial Sea View
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Right - Room Info */}
            <div>
              <p className="label-accent text-[--color-accent] mb-3">{room.category} Room</p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-[--color-text-primary] mb-6">
                {room.name}
              </h2>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-[--color-surface]">
                  <p className="text-2xl font-heading text-[#8B7355]">{room.size}</p>
                  <p className="text-sm text-[--color-text-secondary]">Room Size</p>
                </div>
                <div className="text-center p-4 bg-[--color-surface]">
                  <p className="text-2xl font-heading text-[#8B7355]">{room.maxGuests}</p>
                  <p className="text-sm text-[--color-text-secondary]">Max Guests</p>
                </div>
                <div className="text-center p-4 bg-[--color-surface]">
                  <p className="text-2xl font-heading text-[#8B7355]">{room.views.length}</p>
                  <p className="text-sm text-[--color-text-secondary]">View Options</p>
                </div>
              </div>

              <p className="text-[--color-text-secondary] leading-relaxed mb-6">
                {room.shortDescription}
              </p>

              {/* Room Features */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                  <span className="text-[--color-text-primary]"><strong>Bed Type:</strong> {room.bedType}</span>
                </div>
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-[#8B7355]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-[--color-text-primary]"><strong>Views:</strong> {room.views.join(", ")}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={EXTERNAL_LINKS.booking}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#8B7355] text-white font-medium tracking-wide uppercase text-sm hover:bg-[#7a6548] transition-colors"
                >
                  Book Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-[#8B7355] text-[#8B7355] font-medium tracking-wide uppercase text-sm hover:bg-[#8B7355] hover:text-white transition-colors"
                >
                  Inquire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 md:py-28 bg-[--color-surface]">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="label-accent text-[--color-accent] mb-3">In Every Room</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary]">
              Room Amenities
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {ROOM_AMENITIES.map((amenity) => (
              <div
                key={amenity.name}
                className="flex flex-col items-center text-center p-6 bg-white border border-gray-100 hover:border-[--color-accent]/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="text-[--color-accent] mb-3">
                  <AmenityIcon type={amenity.icon} />
                </div>
                <span className="text-sm font-medium text-gray-700">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Other Rooms */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <p className="label-accent text-[--color-accent] mb-3">Explore More</p>
            <h2 className="font-heading text-3xl md:text-4xl text-[--color-text-primary]">
              Other Rooms & Suites
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {otherRooms.map((otherRoom) => (
              <Link
                key={otherRoom.slug}
                href={`/rooms-suites/${otherRoom.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden mb-4">
                  <Image
                    src={otherRoom.image}
                    alt={otherRoom.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="font-heading text-xl text-[--color-text-primary] group-hover:text-[#8B7355] transition-colors">
                  {otherRoom.name}
                </h3>
                <p className="text-sm text-[--color-text-secondary] mt-1">
                  {otherRoom.size} · {otherRoom.maxGuests} Guests
                </p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/rooms-suites" className="btn-outline">
              View All Rooms
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
