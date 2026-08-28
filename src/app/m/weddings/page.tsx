import Image from "next/image";
import WeddingInquiryForm from "@/components/WeddingInquiryForm";
import { WEDDING_TYPES } from "@/lib/wedding-types-data";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Weddings",
  "/weddings",
  "Wedding venues and inquiry at Royal Phuket City Hotel."
);

export default function MobileWeddingsPage() {
  const types = Object.values(WEDDING_TYPES);

  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-4 text-sm text-[var(--m-muted)]">
        Six celebration styles in Phuket Old Town. Tell us the date and we will plan with you.
      </p>

      <div className="space-y-3">
        {types.map((item) => (
          <article key={item.slug} className="overflow-hidden rounded-[16px] bg-[var(--m-card)]">
            <div className="relative h-40">
              <Image
                src={item.heroImage}
                alt={item.title}
                fill
                sizes="400px"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-heading text-xl">{item.title}</h2>
              <p className="mt-1 text-sm text-[var(--m-muted)]">{item.subtitle}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-4 font-heading text-xl">Plan with us</h2>
        <WeddingInquiryForm compact />
      </div>
    </div>
  );
}
