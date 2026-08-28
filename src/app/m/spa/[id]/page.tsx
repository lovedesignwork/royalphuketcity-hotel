import Image from "next/image";
import { notFound } from "next/navigation";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import MobileLink from "@/components/mobile/MobileLink";
import { mobileMetadata } from "@/lib/mobile";
import {
  SPA_PHONE,
  getSpaTreatment,
  spaTreatments,
} from "@/lib/spa-treatments";

type Params = { id: string };

export function generateStaticParams() {
  return spaTreatments.map((item) => ({ id: String(item.id) }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { id } = await params;
  const treatment = getSpaTreatment(Number(id));
  if (!treatment) return mobileMetadata("Spa", "/spa");
  return mobileMetadata(treatment.name, `/spa/${id}`, treatment.description);
}

const telHref = `tel:${SPA_PHONE.replace(/\s/g, "")}`;

export default async function MobileSpaTreatmentPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const treatment = getSpaTreatment(Number(id));
  if (!treatment) notFound();

  return (
    <div className="mobile-content pt-[calc(3.5rem+env(safe-area-inset-top,0px))]">
      <div className="relative h-56">
        <Image
          src={treatment.image}
          alt={treatment.name}
          fill
          sizes="430px"
          className="object-cover"
          priority
        />
      </div>

      <div className="px-4 pt-5">
        <p className="text-sm text-[var(--m-gold)]">{treatment.category}</p>
        <h1 className="mt-1 font-heading text-[1.75rem] leading-tight">{treatment.name}</h1>
        <p className="mt-2 text-sm text-[var(--m-muted)]">
          {treatment.duration}
          {treatment.priceNote ? ` · ${treatment.priceNote}` : ""}
        </p>
        <p className="mt-1 text-lg font-medium text-[var(--m-gold)]">{treatment.price}</p>
        <p className="mt-4 text-[15px] leading-relaxed">{treatment.description}</p>

        {treatment.highlights.length > 0 ? (
          <>
            <h2 className="mt-6 mb-3 font-heading text-xl">Includes</h2>
            <ul className="flex flex-wrap gap-2">
              {treatment.highlights.map((item) => (
                <li key={item} className="rounded-full bg-[var(--m-card)] px-3 py-2 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </>
        ) : null}

        <p className="mt-5 text-sm text-[var(--m-muted)]">
          Best time: {treatment.bestBookingTime}. Hotel guests get 10% off.
        </p>

        <div className="mt-6 grid grid-cols-2 gap-2">
          <MobileLink
            href={`/spa/book?treatment=${treatment.id}`}
            className="flex min-h-11 items-center justify-center rounded-full bg-[var(--m-gold)] px-4 text-sm font-medium text-white"
          >
            Book this
          </MobileLink>
          <a
            href={telHref}
            className="flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--m-gold)] px-4 text-sm font-medium text-[var(--m-gold)]"
          >
            <Phone size={18} weight="regular" aria-hidden="true" />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}
