import VisualCard from "@/components/mobile/VisualCard";
import { ROOMS } from "@/lib/constants";
import { mobileMetadata } from "@/lib/mobile";

export const dynamic = "force-static";

export const metadata = mobileMetadata(
  "Rooms",
  "/rooms",
  "Room types and amenities at Royal Phuket City Hotel."
);

export default function MobileRoomsPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-4 text-sm text-[var(--m-muted)]">
        See what is in each room type, or add a night with the front desk.
      </p>
      <div className="space-y-3">
        {ROOMS.map((room, index) => (
          <div key={room.slug} className="relative h-56">
            <VisualCard
              href={`/rooms/${room.slug}`}
              image={room.image}
              alt={room.name}
              title={room.name}
              subtitle={`${room.size} · ${room.bedType} · ${room.maxGuests} guests`}
              meta={room.views[0]}
              className="h-full w-full"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
