import { notFound } from "next/navigation";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import PhotoStrip from "@/components/mobile/PhotoStrip";
import MobileLink from "@/components/mobile/MobileLink";
import { HOTEL_INFO, RESTAURANTS } from "@/lib/constants";
import { RESTAURANT_DETAILS } from "@/lib/restaurant-data";
import { mobileMetadata } from "@/lib/mobile";

type Params = { slug: string };

export function generateStaticParams() {
  return RESTAURANTS.map((venue) => ({ slug: venue.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const venue = RESTAURANT_DETAILS[slug];
  if (!venue) return mobileMetadata("Dining", "/dining");
  return mobileMetadata(venue.name, `/dining/${slug}`, venue.description[0]);
}

const telHref = `tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`;

export default async function MobileDiningDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const venue = RESTAURANT_DETAILS[slug];
  if (!venue) notFound();

  return (
    <div className="mobile-content pt-[calc(3.5rem+env(safe-area-inset-top,0px))]">
      <PhotoStrip photos={venue.images.slice(0, 8)} />

      <div className="px-4 pt-5">
        <p className="text-sm text-[var(--m-gold)]">{venue.cuisine}</p>
        <h1 className="mt-1 font-heading text-[1.75rem] leading-tight">{venue.name}</h1>
        <p className="mt-2 text-sm text-[var(--m-muted)]">
          {venue.floor} · {venue.hours}
        </p>
        <p className="mt-4 text-[15px] leading-relaxed">{venue.description[0]}</p>

        <h2 className="mt-6 mb-3 font-heading text-xl">Highlights</h2>
        <ul className="flex flex-wrap gap-2">
          {venue.highlights.map((item) => (
            <li
              key={item}
              className="rounded-full bg-[var(--m-card)] px-3 py-2 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <a
            href={telHref}
            className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--m-gold)] px-4 text-sm font-medium text-white"
          >
            <Phone size={18} weight="regular" aria-hidden="true" />
            Call
          </a>
          <MobileLink
            href="/contact"
            className="flex min-h-11 items-center justify-center rounded-full border border-[var(--m-gold)] px-4 text-sm font-medium text-[var(--m-gold)]"
          >
            Inquire
          </MobileLink>
        </div>
      </div>
    </div>
  );
}
