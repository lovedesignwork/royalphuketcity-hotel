import VisualCard from "@/components/mobile/VisualCard";
import { PROMOTIONS } from "@/lib/constants";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Promotions",
  "/promotions",
  "Current stay offers at Royal Phuket City Hotel."
);

export default function MobilePromotionsPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-4 text-sm text-[var(--m-muted)]">
        Book direct with the code on each offer.
      </p>
      <div className="space-y-3">
        {PROMOTIONS.map((promo, index) => (
          <div key={promo.slug} className="relative h-52">
            <VisualCard
              href={`/promotions/${promo.slug}`}
              image={promo.image}
              alt={promo.title}
              title={promo.title}
              subtitle={promo.price}
              meta={promo.tagline}
              className="h-full w-full"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
