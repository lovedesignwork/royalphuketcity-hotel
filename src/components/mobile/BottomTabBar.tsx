"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bed,
  FlowerLotus,
  ForkKnife,
  House,
  MapPin,
  SquaresFour,
} from "@phosphor-icons/react";
import { mobileHref, stripMobilePrefix } from "@/lib/mobile";
import { useMobilePrefix } from "./MobileAppProvider";
import MobileLink from "./MobileLink";

const tabClass =
  "flex min-h-11 min-w-11 flex-col items-center justify-center gap-0.5 py-1 text-center";

const TABS = [
  { href: "/", label: "Home", Icon: House, match: (path: string) => path === "/" },
  {
    href: "/rooms",
    label: "Rooms",
    Icon: Bed,
    match: (path: string) => path === "/rooms" || path.startsWith("/rooms/"),
  },
  {
    href: "/spa",
    label: "Spa",
    Icon: FlowerLotus,
    match: (path: string) => path === "/spa" || path.startsWith("/spa/"),
  },
  {
    href: "/dining",
    label: "Dining",
    Icon: ForkKnife,
    match: (path: string) => path === "/dining" || path.startsWith("/dining/"),
  },
  {
    href: "/around",
    label: "Around",
    Icon: MapPin,
    match: (path: string) => path === "/around" || path.startsWith("/around/"),
  },
  {
    href: "/more",
    label: "More",
    Icon: SquaresFour,
    match: (path: string) =>
      path === "/more" ||
      ["/facilities", "/promotions", "/contact", "/weddings", "/events", "/feedback"].some(
        (item) => path === item || path.startsWith(`${item}/`)
      ),
  },
] as const;

export default function BottomTabBar() {
  const pathname = usePathname();
  const router = useRouter();
  const prefix = useMobilePrefix();
  const current = stripMobilePrefix(pathname);
  const [pending, setPending] = useState<string | null>(null);

  useEffect(() => {
    setPending(null);
  }, [pathname]);

  useEffect(() => {
    for (const tab of TABS) {
      router.prefetch(mobileHref(tab.href, prefix));
    }
  }, [prefix, router]);

  const shown = pending ?? current;

  return (
    <nav className="mobile-tabbar mobile-glass rounded-t-3xl border-t" aria-label="Hotel app">
      <ul className="grid grid-cols-6 items-end px-0.5 pt-1 pb-1">
        {TABS.map((tab) => (
          <li key={tab.href}>
            <TabLink
              href={tab.href}
              dest={mobileHref(tab.href, prefix)}
              label={tab.label}
              active={tab.match(shown)}
              Icon={tab.Icon}
              onCommit={() => setPending(tab.href)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function TabLink({
  href,
  dest,
  label,
  active,
  Icon,
  onCommit,
}: {
  href: string;
  dest: string;
  label: string;
  active: boolean;
  Icon: typeof House;
  onCommit: () => void;
}) {
  const router = useRouter();

  return (
    <MobileLink
      href={href}
      prefetch
      aria-current={active ? "page" : undefined}
      className={`${tabClass} active:opacity-70`}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        onCommit();
        router.push(dest);
      }}
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onCommit();
        router.push(dest);
      }}
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
