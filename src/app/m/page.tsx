import Image from "next/image";
import {
  Bed,
  Bus,
  ChatCircle,
  Clock,
  FlowerLotus,
  ForkKnife,
  Phone,
  SwimmingPool,
  WifiHigh,
} from "@phosphor-icons/react/dist/ssr";
import MobileAnnouncement from "@/components/mobile/MobileAnnouncement";
import MobileLink from "@/components/mobile/MobileLink";
import { HOTEL_INFO, PROMOTIONS, RESTAURANTS } from "@/lib/constants";
import { desktopCanonicalUrl, mobileRobots } from "@/lib/mobile";

export const dynamic = "force-static";

export const metadata = {
  title: "Your stay",
  description:
    "Guest guide for your stay at Royal Phuket City Hotel. Front desk, dining hours, pool, and hotel services.",
  robots: mobileRobots,
  alternates: { canonical: desktopCanonicalUrl("/") },
};

const telHref = `tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`;

function isPromotionActive(validUntil: string): boolean {
  return new Date(validUntil) >= new Date();
}

const activePromotions = PROMOTIONS.filter((promo) => isPromotionActive(promo.validUntil));

const today = [
  { label: "Breakfast", value: "6:30 AM - 10:30 AM", where: "TWIST, 19th floor" },
  { label: "Pool", value: "7:00 AM - 9:00 PM", where: "3rd floor" },
  { label: "Spa", value: "10:00 AM - 11:00 PM", where: "Royal Wellness, 3rd floor" },
  { label: "Checkout", value: HOTEL_INFO.checkOut, where: `In from ${HOTEL_INFO.checkIn}` },
];

export default function MobileHomePage() {
  return (
    <div className="mobile-content">
      <section className="relative h-[320px] overflow-hidden">
        <Image
          src="/images/HOTEL WEBSITE/RPC-Main-Image.jpg"
          alt="Royal Phuket City Hotel"
          fill
          priority
          sizes="(max-width: 430px) 100vw, 430px"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/30 to-black/20" />
        <div className="relative flex h-full flex-col justify-end px-5 pb-6 pt-16">
          <p className="text-sm text-white/80">Welcome to</p>
          <h1 className="mt-1 font-heading text-[2rem] leading-[1.15] text-white">
            Royal Phuket City
          </h1>
        </div>
      </section>

      <section className="px-4 pt-5">
        <div className="mb-3 flex items-end justify-between">
          <h2 className="font-heading text-2xl">Dining tonight</h2>
          <MobileLink href="/dining" className="text-sm font-medium text-[var(--m-gold)]">
            Hours
          </MobileLink>
        </div>
        <div className="space-y-3">
          {RESTAURANTS.map((venue) => (
            <MobileLink
              key={venue.slug}
              href={`/dining/${venue.slug}`}
              className="flex gap-3 overflow-hidden rounded-[16px] bg-[var(--m-card)]"
            >
              <div className="relative h-24 w-24 shrink-0">
                <Image
                  src={venue.image}
                  alt={venue.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col justify-center py-3 pr-3">
                <p className="font-medium leading-tight">{venue.name}</p>
                <p className="mt-1 text-sm text-[var(--m-muted)]">
                  {venue.hours}
                </p>
                <p className="text-sm text-[var(--m-muted)]">{venue.floor}</p>
              </div>
            </MobileLink>
          ))}
        </div>
      </section>

      <section className="px-4 pt-5">
        <MobileLink href="/spa" className="relative mb-3 block h-40 overflow-hidden rounded-[16px]">
          <Image
            src="/images/HOTEL WEBSITE/Royal-Wellness-Spa-7.jpg"
            alt="Royal Wellness Spa"
            fill
            sizes="400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <p className="font-heading text-xl">Royal Wellness Spa</p>
            <p className="text-sm text-white/85">3rd floor · hotel guests 10% off</p>
          </div>
        </MobileLink>
        <MobileLink href="/facilities" className="relative mb-3 block h-40 overflow-hidden rounded-[16px]">
          <Image
            src="/images/HOTEL WEBSITE/RPC Pool 01.jpeg"
            alt="Hotel swimming pool"
            fill
            sizes="400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <p className="font-heading text-xl">Pool and gym</p>
            <p className="text-sm text-white/85">Open hours and where to go</p>
          </div>
        </MobileLink>
        <MobileLink href="/around" className="relative block h-40 overflow-hidden rounded-[16px]">
          <Image
            src="/images/old-town/tourist-woman-phuket-old-town-with-building-sino-portuguese-architecture-phuket-old-town.jpg"
            alt="Phuket Old Town"
            fill
            sizes="400px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4 text-white">
            <p className="font-heading text-xl">Around Phuket</p>
            <p className="text-sm text-white/85">Old Town, nature, temples, and the EV bus</p>
          </div>
        </MobileLink>
      </section>

      {activePromotions.length > 0 ? (
        <section className="px-4 pt-5">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-heading text-2xl">Promotions</h2>
            <MobileLink href="/promotions" className="text-sm font-medium text-[var(--m-gold)]">
              All
            </MobileLink>
          </div>
          <div className="space-y-3">
            {activePromotions.map((promo) => (
              <MobileLink
                key={promo.slug}
                href={`/promotions/${promo.slug}`}
                className="flex gap-3 overflow-hidden rounded-[16px] bg-[var(--m-card)]"
              >
                <div className="relative h-24 w-24 shrink-0">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
                <div className="flex min-w-0 flex-col justify-center py-3 pr-3">
                  <p className="font-medium leading-tight">{promo.title}</p>
                  <p className="mt-1 text-sm text-[var(--m-muted)]">{promo.subtitle}</p>
                  <p className="text-sm text-[var(--m-gold)]">{promo.tagline}</p>
                </div>
              </MobileLink>
            ))}
          </div>
        </section>
      ) : null}

      <section className="px-4 pt-6">
        <h2 className="mb-3 font-heading text-2xl">Today</h2>
        <ul className="overflow-hidden rounded-[16px] bg-[var(--m-card)]">
          {today.map((row, index) => (
            <li
              key={row.label}
              className={`flex items-start gap-3 px-4 py-3 ${
                index > 0 ? "border-t border-[var(--m-border)]" : ""
              }`}
            >
              <Clock size={20} className="mt-0.5 text-[var(--m-gold)]" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block font-medium">{row.label}</span>
                <span className="block text-sm text-[var(--m-muted)]">
                  {row.value} · {row.where}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-4 pt-6">
        <h2 className="mb-3 font-heading text-2xl">Need something</h2>
        <div className="grid grid-cols-3 gap-2">
          <a
            href={telHref}
            className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-[16px] bg-[var(--m-card)] px-2 py-3 text-center"
          >
            <Phone size={22} weight="regular" className="text-[var(--m-gold)]" aria-hidden="true" />
            <span className="text-xs font-medium">Desk</span>
          </a>
          <MobileLink
            href="/dining"
            className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-[16px] bg-[var(--m-card)] px-2 py-3 text-center"
          >
            <ForkKnife size={22} weight="regular" className="text-[var(--m-gold)]" aria-hidden="true" />
            <span className="text-xs font-medium">Eat</span>
          </MobileLink>
          <MobileLink
            href="/spa"
            className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-[16px] bg-[var(--m-card)] px-2 py-3 text-center"
          >
            <FlowerLotus size={22} weight="regular" className="text-[var(--m-gold)]" aria-hidden="true" />
            <span className="text-xs font-medium">Spa</span>
          </MobileLink>
          <MobileLink
            href="/facilities"
            className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-[16px] bg-[var(--m-card)] px-2 py-3 text-center"
          >
            <SwimmingPool size={22} weight="regular" className="text-[var(--m-gold)]" aria-hidden="true" />
            <span className="text-xs font-medium">Pool</span>
          </MobileLink>
          <a
            href={telHref}
            className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-[16px] bg-[var(--m-card)] px-2 py-3 text-center"
          >
            <WifiHigh size={22} weight="regular" className="text-[var(--m-gold)]" aria-hidden="true" />
            <span className="text-xs font-medium">WiFi</span>
          </a>
          <MobileLink
            href="/facilities"
            className="flex min-h-11 flex-col items-center justify-center gap-1 rounded-[16px] bg-[var(--m-card)] px-2 py-3 text-center"
          >
            <Bus size={22} weight="regular" className="text-[var(--m-gold)]" aria-hidden="true" />
            <span className="text-xs font-medium">Shuttle</span>
          </MobileLink>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-[var(--m-muted)]">
          WiFi is in every room. Ask the front desk for today&apos;s login.
        </p>
      </section>

      <section className="px-4 pt-5">
        <MobileAnnouncement />
      </section>

      <section className="space-y-3 px-4 pt-8">
        <MobileLink
          href="/rooms"
          className="flex min-h-14 items-center justify-between rounded-[16px] bg-[var(--m-card)] px-4"
        >
          <span className="flex items-center gap-3">
            <Bed size={22} className="text-[var(--m-gold)]" aria-hidden="true" />
            <span>
              <span className="block font-medium">Room types</span>
              <span className="block text-sm text-[var(--m-muted)]">
                Amenities, or add a night
              </span>
            </span>
          </span>
        </MobileLink>
        <MobileLink
          href="/feedback"
          className="flex min-h-14 items-center justify-between rounded-[16px] bg-[var(--m-card)] px-4"
        >
          <span className="flex items-center gap-3">
            <ChatCircle size={22} className="text-[var(--m-gold)]" aria-hidden="true" />
            <span>
              <span className="block font-medium">Feedback</span>
              <span className="block text-sm text-[var(--m-muted)]">
                Rate your stay and leave a note
              </span>
            </span>
          </span>
        </MobileLink>
      </section>
    </div>
  );
}
