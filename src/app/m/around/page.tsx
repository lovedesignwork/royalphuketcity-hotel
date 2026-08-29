import {
  Bicycle,
  Bus,
  CaretRight,
  ForkKnife,
  MapPin,
  Sparkle,
  Tree,
} from "@phosphor-icons/react/dist/ssr";
import MobileLink from "@/components/mobile/MobileLink";
import { AROUND_SECTIONS } from "@/lib/around-phuket";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "Around Phuket",
  "/around",
  "Old Town, nature, culture, Michelin rooms, activities, and how to get around from Royal Phuket City Hotel."
);

const icons = {
  "old-town": MapPin,
  nature: Tree,
  culture: Sparkle,
  michelin: ForkKnife,
  activities: Bicycle,
  transport: Bus,
} as const;

export default function MobileAroundPage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-5 text-sm text-[var(--m-muted)]">
        Walkable Old Town first. Parks, temples, boats, and the free EV bus from the door.
      </p>
      <ul className="overflow-hidden rounded-[16px] bg-[var(--m-card)]">
        {AROUND_SECTIONS.map((section, index) => {
          const Icon = icons[section.slug as keyof typeof icons];
          return (
            <li key={section.slug} className={index > 0 ? "border-t border-[var(--m-border)]" : ""}>
              <MobileLink
                href={`/around/${section.slug}`}
                className="flex min-h-14 items-center gap-3 px-4 py-3"
              >
                <Icon size={22} weight="regular" className="text-[var(--m-gold)]" aria-hidden="true" />
                <span className="min-w-0 flex-1">
                  <span className="block font-medium">{section.title}</span>
                  <span className="block text-sm text-[var(--m-muted)]">{section.hint}</span>
                </span>
                <CaretRight size={18} className="text-[var(--m-muted)]" aria-hidden="true" />
              </MobileLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
