import Image from "next/image";
import MobileLink from "@/components/mobile/MobileLink";
import { FACILITIES } from "@/lib/constants";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Facilities",
  "/facilities",
  "Pool, spa, fitness, rooftop breakfast, and shuttle at Royal Phuket City Hotel."
);

export default function MobileFacilitiesPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-4 text-sm text-[var(--m-muted)]">
        A compact look at the hotel spaces guests use most.
      </p>
      <div className="space-y-4">
        {FACILITIES.map((item) => {
          const isSpa = item.name === "Spa & Massage";
          const body = (
            <>
              <div className="relative h-44">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="font-heading text-xl">{item.name}</h2>
                <p className="mt-1 text-sm leading-relaxed text-[var(--m-muted)]">
                  {item.description}
                </p>
                {isSpa ? (
                  <p className="mt-2 text-sm font-medium text-[var(--m-gold)]">
                    Book a treatment
                  </p>
                ) : null}
              </div>
            </>
          );
          return isSpa ? (
            <MobileLink
              key={item.name}
              href="/spa"
              className="block overflow-hidden rounded-[16px] bg-[var(--m-card)]"
            >
              {body}
            </MobileLink>
          ) : (
            <article key={item.name} className="overflow-hidden rounded-[16px] bg-[var(--m-card)]">
              {body}
            </article>
          );
        })}
      </div>
    </div>
  );
}
