import { notFound } from "next/navigation";
import Image from "next/image";
import StickyBookBar from "@/components/mobile/StickyBookBar";
import { PROMOTIONS } from "@/lib/constants";
import { mobileMetadata } from "@/lib/mobile";

type Params = { slug: string };

export function generateStaticParams() {
  return PROMOTIONS.map((promo) => ({ slug: promo.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const promo = PROMOTIONS.find((item) => item.slug === slug);
  if (!promo) return mobileMetadata("Offer", "/promotions");
  return mobileMetadata(promo.title, `/promotions/${slug}`, promo.shortDescription);
}

export default async function MobilePromotionDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const promo = PROMOTIONS.find((item) => item.slug === slug);
  if (!promo) notFound();

  return (
    <div className="mobile-content has-book-bar pt-[calc(3.5rem+env(safe-area-inset-top,0px))]">
      <div className="relative h-56">
        <Image
          src={promo.image}
          alt={promo.title}
          fill
          priority
          sizes="430px"
          className="object-cover"
        />
      </div>

      <div className="px-4 pt-5">
        <p className="text-sm text-[var(--m-gold)]">{promo.tagline}</p>
        <h1 className="mt-1 font-heading text-[1.75rem] leading-tight">{promo.title}</h1>
        <p className="mt-1 text-sm text-[var(--m-muted)]">{promo.subtitle}</p>
        <p className="mt-3 font-medium">{promo.price}</p>
        <p className="mt-4 text-[15px] leading-relaxed">{promo.shortDescription}</p>

        <h2 className="mt-6 mb-3 font-heading text-xl">Included</h2>
        <ul className="space-y-2 text-sm leading-relaxed">
          {promo.highlights.map((item) => (
            <li key={item} className="rounded-[12px] bg-[var(--m-card)] px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <StickyBookBar
        label="Book this offer"
        code={promo.bookingCode || undefined}
      />
    </div>
  );
}
