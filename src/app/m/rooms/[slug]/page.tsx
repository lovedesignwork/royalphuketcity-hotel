import { notFound } from "next/navigation";
import PhotoStrip from "@/components/mobile/PhotoStrip";
import StickyBookBar from "@/components/mobile/StickyBookBar";
import { ROOMS } from "@/lib/constants";
import { ROOM_DETAILS } from "@/lib/room-data";
import { mobileMetadata } from "@/lib/mobile";

type Params = { slug: string };

export function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const room = ROOM_DETAILS[slug];
  if (!room) return mobileMetadata("Room", "/rooms");
  return mobileMetadata(room.name, `/rooms/${slug}`, room.description[0]);
}

export default async function MobileRoomDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const room = ROOM_DETAILS[slug];
  if (!room) notFound();

  return (
    <div className="mobile-content has-book-bar pt-[calc(3.5rem+env(safe-area-inset-top,0px))]">
      <PhotoStrip photos={room.images.slice(0, 8)} />

      <div className="px-4 pt-5">
        <p className="text-sm text-[var(--m-gold)]">{room.category}</p>
        <h1 className="mt-1 font-heading text-[1.75rem] leading-tight">{room.name}</h1>
        <p className="mt-2 text-sm text-[var(--m-muted)]">
          {room.size} · {room.bedType} · {room.maxGuests} guests · {room.views.join(", ")}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-[var(--m-ink)]">
          {room.description[0]}
        </p>

        <h2 className="mt-6 mb-3 font-heading text-xl">In the room</h2>
        <ul className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 10).map((item) => (
            <li
              key={item}
              className="rounded-full bg-[var(--m-card)] px-3 py-2 text-sm text-[var(--m-ink)]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <StickyBookBar label="Add nights" />
    </div>
  );
}
