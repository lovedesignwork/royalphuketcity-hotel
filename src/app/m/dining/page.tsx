import VisualCard from "@/components/mobile/VisualCard";
import { RESTAURANTS } from "@/lib/constants";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Dining",
  "/dining",
  "Yan Long Cantonese dining and TWIST rooftop at Royal Phuket City Hotel."
);

export default function MobileDiningPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-4 text-sm text-[var(--m-muted)]">
        Hours and floors for tonight. Call the desk to reserve a table.
      </p>
      <div className="space-y-3">
        {RESTAURANTS.map((venue) => (
          <div key={venue.slug} className="relative h-64">
            <VisualCard
              href={`/dining/${venue.slug}`}
              image={venue.image}
              alt={venue.name}
              title={venue.name}
              subtitle={`${venue.hours} · ${venue.floor}`}
              meta={venue.cuisine}
              className="h-full w-full"
              priority
            />
          </div>
        ))}
      </div>
    </div>
  );
}
