import Image from "next/image";
import { Clock, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import MobileLink from "@/components/mobile/MobileLink";
import { mobileMetadata } from "@/lib/mobile";
import {
  SPA_FLOOR,
  SPA_HOURS,
  SPA_PHONE,
  categories,
  formatBaht,
  spaTreatments,
} from "@/lib/spa-treatments";

export const metadata = mobileMetadata(
  "Spa",
  "/spa",
  "Book Royal Wellness Spa treatments from your room. 3rd floor, hotel guests 10% off."
);

const telHref = `tel:${SPA_PHONE.replace(/\s/g, "")}`;
const menuCategories = categories.filter((item) => item !== "Top-Up / Add-On");

export default function MobileSpaPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="text-sm text-[var(--m-muted)]">
        Royal Wellness Spa is on the {SPA_FLOOR}. Hotel guests get 10% off.
      </p>

      <div className="mt-4 overflow-hidden rounded-[16px] bg-[var(--m-card)]">
        <ul>
          <li className="flex items-start gap-3 px-4 py-3">
            <MapPin size={20} className="mt-0.5 text-[var(--m-gold)]" aria-hidden="true" />
            <span>
              <span className="block font-medium">{SPA_FLOOR}</span>
              <span className="block text-sm text-[var(--m-muted)]">Same building as the pool</span>
            </span>
          </li>
          <li className="flex items-start gap-3 border-t border-[var(--m-border)] px-4 py-3">
            <Clock size={20} className="mt-0.5 text-[var(--m-gold)]" aria-hidden="true" />
            <span>
              <span className="block font-medium">Open daily</span>
              <span className="block text-sm text-[var(--m-muted)]">{SPA_HOURS}</span>
            </span>
          </li>
        </ul>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <a
          href={telHref}
          className="flex min-h-11 items-center justify-center gap-2 rounded-full bg-[var(--m-gold)] px-4 text-sm font-medium text-white"
        >
          <Phone size={18} weight="regular" aria-hidden="true" />
          Call spa
        </a>
        <MobileLink
          href="/spa/book"
          className="flex min-h-11 items-center justify-center rounded-full border border-[var(--m-gold)] bg-[var(--m-card)] px-4 text-sm font-medium text-[var(--m-gold)]"
        >
          Book a slot
        </MobileLink>
      </div>

      <div className="-mx-4 mt-6 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex w-max gap-2 pb-1">
          {menuCategories.map((category) => (
            <a
              key={category}
              href={`#spa-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="flex min-h-11 items-center rounded-full bg-[var(--m-card)] px-4 text-sm font-medium"
            >
              {category}
            </a>
          ))}
        </div>
      </div>

      {menuCategories.map((category) => {
        const items = spaTreatments.filter((item) => item.category === category);
        if (items.length === 0) return null;
        return (
          <section
            key={category}
            id={`spa-${category.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
            className="mt-6"
          >
            <h2 className="mb-3 font-heading text-xl">{category}</h2>
            <div className="space-y-2">
              {items.map((item) => (
                <MobileLink
                  key={item.id}
                  href={`/spa/${item.id}`}
                  className="flex min-w-0 gap-3 overflow-hidden rounded-[16px] bg-[var(--m-card)]"
                >
                  <div className="relative h-24 w-24 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 py-3 pr-3">
                    <p className="font-medium leading-tight">{item.name}</p>
                    <p className="mt-1 text-sm text-[var(--m-muted)]">
                      {item.duration}
                    </p>
                    <p className="mt-1 text-sm font-medium text-[var(--m-gold)]">
                      {item.price.startsWith("฿") ? item.price : formatBaht(item.priceValue)}
                      {item.priceNote ? ` · ${item.priceNote}` : ""}
                    </p>
                  </div>
                </MobileLink>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
