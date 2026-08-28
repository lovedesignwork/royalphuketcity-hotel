import {
  CalendarBlank,
  CalendarCheck,
  CaretRight,
  EnvelopeSimple,
  FlowerLotus,
  Heart,
  InstagramLogo,
  MapPin,
  Phone,
  Sparkle,
  SwimmingPool,
} from "@phosphor-icons/react/dist/ssr";
import MobileLink from "@/components/mobile/MobileLink";
import { EXTERNAL_LINKS, HOTEL_INFO, SITE_CONFIG } from "@/lib/constants";
import { mobileMetadata } from "@/lib/mobile";

export const metadata = mobileMetadata(
  "More",
  "/more",
  "Facilities, promotions, Old Town, and hotel services at Royal Phuket City Hotel."
);

const telHref = `tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`;

const pages = [
  { href: "/spa", label: "Royal Wellness Spa", hint: "3rd floor, book a treatment", Icon: FlowerLotus },
  { href: "/facilities", label: "Facilities", hint: "Pool, spa, gym, shuttle", Icon: SwimmingPool },
  { href: "/promotions", label: "Promotions", hint: "Current stay offers", Icon: Sparkle },
  { href: "/contact", label: "Contact", hint: "Call, write, or send a note", Icon: EnvelopeSimple },
  { href: "/weddings", label: "Weddings", hint: "Venues and inquiry", Icon: Heart },
  { href: "/events", label: "Events", hint: "Meetings and celebrations", Icon: CalendarBlank },
] as const;

export default function MobileMorePage() {
  return (
    <div className="mobile-content px-4 pt-[calc(3.5rem+env(safe-area-inset-top,0px)+12px)]">
      <p className="mb-5 text-sm text-[var(--m-muted)]">
        Hotel services during your stay. Call the desk if you need a hand.
      </p>

      <a
        href={EXTERNAL_LINKS.booking}
        target="_blank"
        rel="noopener noreferrer"
        className="mb-3 flex min-h-14 items-center gap-3 rounded-[16px] bg-[var(--m-card)] px-4 py-3"
      >
        <CalendarCheck size={22} weight="regular" className="text-[var(--m-gold)]" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block font-medium">Extend your stay</span>
          <span className="block text-sm text-[var(--m-muted)]">Add nights in the booking engine</span>
        </span>
        <CaretRight size={18} className="text-[var(--m-muted)]" aria-hidden="true" />
      </a>

      <ul className="overflow-hidden rounded-[16px] bg-[var(--m-card)]">
        {pages.map(({ href, label, hint, Icon }, index) => (
          <li key={href} className={index > 0 ? "border-t border-[var(--m-border)]" : ""}>
            <MobileLink href={href} className="flex min-h-14 items-center gap-3 px-4 py-3">
              <Icon size={22} weight="regular" className="text-[var(--m-gold)]" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{label}</span>
                <span className="block text-sm text-[var(--m-muted)]">{hint}</span>
              </span>
              <CaretRight size={18} className="text-[var(--m-muted)]" aria-hidden="true" />
            </MobileLink>
          </li>
        ))}
      </ul>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <a
          href={telHref}
          className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-[16px] bg-[var(--m-card)] py-3"
        >
          <Phone size={22} className="text-[var(--m-gold)]" aria-hidden="true" />
          <span className="text-xs font-medium">Call</span>
        </a>
        <a
          href={EXTERNAL_LINKS.googleMaps}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-[16px] bg-[var(--m-card)] py-3"
        >
          <MapPin size={22} className="text-[var(--m-gold)]" aria-hidden="true" />
          <span className="text-xs font-medium">Maps</span>
        </a>
        <a
          href={EXTERNAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-[16px] bg-[var(--m-card)] py-3"
        >
          <InstagramLogo size={22} className="text-[var(--m-gold)]" aria-hidden="true" />
          <span className="text-xs font-medium">Instagram</span>
        </a>
      </div>

      <a
        href={SITE_CONFIG.url}
        className="mt-5 flex min-h-11 items-center justify-center rounded-full border border-[var(--m-border)] bg-[var(--m-card)] px-4 text-sm font-medium"
      >
        Open the full website
      </a>
    </div>
  );
}
