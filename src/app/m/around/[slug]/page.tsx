import Image from "next/image";
import { notFound } from "next/navigation";
import { Phone } from "@phosphor-icons/react/dist/ssr";
import { AROUND_SECTIONS, getAroundSection } from "@/lib/around-phuket";
import { HOTEL_INFO } from "@/lib/constants";
import { mobileMetadata } from "@/lib/mobile";

type Params = { slug: string };

export function generateStaticParams() {
  return AROUND_SECTIONS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const section = getAroundSection(slug);
  if (!section) return mobileMetadata("Around Phuket", "/around");
  return mobileMetadata(section.title, `/around/${slug}`, section.intro);
}

const telHref = `tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`;

export default async function MobileAroundSectionPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const section = getAroundSection(slug);
  if (!section) notFound();

  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-5 text-sm text-[var(--m-muted)]">{section.intro}</p>

      <div className="space-y-4">
        {section.places.map((place) => (
          <article key={place.name} className="overflow-hidden rounded-[16px] bg-[var(--m-card)]">
            {place.images[0] ? (
              <div className="relative h-44">
                <Image
                  src={place.images[0]}
                  alt={place.name}
                  fill
                  sizes="400px"
                  className="object-cover"
                />
              </div>
            ) : null}
            {place.images.length > 1 ? (
              <div className="flex gap-1 overflow-x-auto p-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {place.images.slice(1).map((src) => (
                  <div key={src} className="relative h-16 w-24 shrink-0 overflow-hidden rounded-[10px]">
                    <Image src={src} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                ))}
              </div>
            ) : null}
            <div className="p-4">
              {place.meta ? (
                <p className="text-sm text-[var(--m-gold)]">{place.meta}</p>
              ) : null}
              <h2 className="font-heading text-xl leading-tight">{place.name}</h2>
              {place.distance ? (
                <p className="mt-1 text-sm text-[var(--m-muted)]">{place.distance}</p>
              ) : null}
              {place.address ? (
                <p className="mt-1 text-sm text-[var(--m-muted)]">{place.address}</p>
              ) : null}
              <p className="mt-2 text-[15px] leading-relaxed">{place.summary}</p>
              {place.details && place.details.length > 0 ? (
                <ul className="mt-3 space-y-1.5">
                  {place.details.map((item) => (
                    <li key={item} className="text-sm text-[var(--m-muted)]">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      <a
        href={telHref}
        className="mt-5 flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--m-gold)] px-4 text-sm font-medium text-white"
      >
        <Phone size={18} weight="regular" aria-hidden="true" />
        Ask the front desk
      </a>
    </div>
  );
}
