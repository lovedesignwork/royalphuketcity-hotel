import { notFound } from "next/navigation";
import { MapPin } from "@phosphor-icons/react/dist/ssr";
import ExpandableMap from "@/components/mobile/ExpandableMap";
import PhotoStrip from "@/components/mobile/PhotoStrip";
import { AROUND_SECTIONS, getAroundSection } from "@/lib/around-phuket";
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
            {place.images.length > 0 ? (
              <PhotoStrip
                photos={place.images.map((src) => ({ src, alt: place.name }))}
                heroClassName="h-[13.2rem]"
                padded={false}
                imageFit={place.imageFit ?? "cover"}
              />
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
              {place.routeImage ? (
                <ExpandableMap src={place.routeImage} alt={`${place.name} route map`} />
              ) : null}
              {place.mapUrl ? (
                <a
                  href={place.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded-full border border-[var(--m-gold)] px-4 text-sm font-medium text-[var(--m-gold)]"
                >
                  <MapPin size={18} weight="regular" aria-hidden="true" />
                  See on Google Maps
                </a>
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
    </div>
  );
}
