import VisualCard from "@/components/mobile/VisualCard";
import { PROMOTIONS } from "@/lib/constants";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Promotions",
  "/promotions",
  "Current stay offers at Royal Phuket City Hotel."
);

const HIDDEN_ON_MOBILE = new Set([
  "family-getaway",
  "songkran-package",
  "april-residence-deal",
  "blissful-3-night",
  "weekly-stay-7",
]);

export default function MobilePromotionsPage() {
  const offers = PROMOTIONS.filter((promo) => !HIDDEN_ON_MOBILE.has(promo.slug));
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-4 text-sm text-[var(--m-muted)]">
        Book direct with the code on each offer.
      </p>
      <div className="space-y-3">
        {offers.map((promo, index) => (
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
