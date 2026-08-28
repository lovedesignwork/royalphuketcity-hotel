"use client";

import { usePathname } from "next/navigation";
import {
  Bed,
  FlowerLotus,
  ForkKnife,
  House,
  MapPin,
  SquaresFour,
} from "@phosphor-icons/react";
import { stripMobilePrefix } from "@/lib/mobile";
import MobileLink from "./MobileLink";

const tabClass =
  "flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 py-1 text-center";

export default function BottomTabBar() {
  const pathname = usePathname();
  const current = stripMobilePrefix(pathname);
  const spaActive = current === "/spa" || current.startsWith("/spa/");
  const homeActive = current === "/";
  const roomsActive = current === "/rooms" || current.startsWith("/rooms/");
  const diningActive = current === "/dining" || current.startsWith("/dining/");
  const aroundActive = current === "/around" || current.startsWith("/around/");
  const moreActive =
    current === "/more" ||
    ["/facilities", "/promotions", "/contact", "/weddings", "/events"].some(
      (item) => current === item || current.startsWith(`${item}/`)
    );

  return (
    <nav className="mobile-tabbar mobile-glass rounded-t-3xl border-t" aria-label="Hotel app">
      <ul className="grid grid-cols-6 items-end px-0.5 pt-1 pb-1">
        <li>
          <TabLink href="/" label="Home" active={homeActive} Icon={House} />
        </li>
        <li>
          <TabLink href="/rooms" label="Rooms" active={roomsActive} Icon={Bed} />
        </li>
        <li>
          <TabLink href="/spa" label="Spa" active={spaActive} Icon={FlowerLotus} />
        </li>
        <li>
          <TabLink href="/dining" label="Dining" active={diningActive} Icon={ForkKnife} />
        </li>
        <li>
          <TabLink href="/around" label="Around" active={aroundActive} Icon={MapPin} />
        </li>
        <li>
          <TabLink href="/more" label="More" active={moreActive} Icon={SquaresFour} />
        </li>
      </ul>
    </nav>
  );
}

function TabLink({
  href,
  label,
  active,
  Icon,
}: {
  href: string;
  label: string;
  active: boolean;
  Icon: typeof House;
}) {
  return (
    <MobileLink
      href={href}
      aria-current={active ? "page" : undefined}
      className={tabClass}
    >
      <Icon
        size={24}
        weight={active ? "fill" : "regular"}
        aria-hidden="true"
        className={active ? "text-[var(--m-gold)]" : "text-[var(--m-muted)]"}
      />
      <span
        className={`text-[11px] leading-none ${
          active ? "font-medium text-[var(--m-ink)]" : "text-[var(--m-muted)]"
        }`}
      >
        {label}
      </span>
    </MobileLink>
  );
}
