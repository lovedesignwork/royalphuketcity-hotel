"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, ChatCircle, Phone } from "@phosphor-icons/react";
import Image from "next/image";
import { HOTEL_INFO } from "@/lib/constants";
import { mobileHref, stripMobilePrefix } from "@/lib/mobile";
import { useMobilePrefix } from "./MobileAppProvider";
import MobileLink from "./MobileLink";

function headerFor(path: string): { title: string | null; backTo: string | null; home: boolean } {
  if (path === "/") return { title: null, backTo: null, home: true };
  if (path === "/rooms") return { title: "Rooms", backTo: null, home: false };
  if (path === "/dining") return { title: "Dining", backTo: null, home: false };
  if (path === "/spa") return { title: "Spa", backTo: null, home: false };
  if (path === "/more") return { title: "More", backTo: null, home: false };
  if (path.startsWith("/rooms/")) return { title: "Room", backTo: "/rooms", home: false };
  if (path.startsWith("/dining/")) return { title: "Dining", backTo: "/dining", home: false };
  if (path === "/spa/book") return { title: "Book spa", backTo: "/spa", home: false };
  if (path.startsWith("/spa/")) return { title: "Treatment", backTo: "/spa", home: false };
  if (path === "/facilities") return { title: "Facilities", backTo: "/more", home: false };
  if (path === "/promotions") return { title: "Promotions", backTo: "/more", home: false };
  if (path.startsWith("/promotions/")) return { title: "Offer", backTo: "/promotions", home: false };
  if (path === "/contact") return { title: "Contact", backTo: "/more", home: false };
  if (path === "/feedback") return { title: "Feedback", backTo: "/", home: false };
  if (path === "/weddings") return { title: "Weddings", backTo: "/more", home: false };
  if (path === "/events") return { title: "Events", backTo: "/more", home: false };
  if (path === "/around") return { title: "Around Phuket", backTo: null, home: false };
  if (path === "/chat") return { title: "Live chat", backTo: "/", home: false };
  if (path === "/around/old-town") return { title: "Local Experiences", backTo: "/around", home: false };
  if (path === "/around/nature") return { title: "Nature", backTo: "/around", home: false };
  if (path === "/around/culture") return { title: "Culture", backTo: "/around", home: false };
  if (path === "/around/michelin") return { title: "Michelin", backTo: "/around", home: false };
  if (path === "/around/activities") return { title: "Activities", backTo: "/around", home: false };
  if (path === "/around/transport") return { title: "Getting around", backTo: "/around", home: false };
  return { title: "Hotel", backTo: "/", home: false };
}

const telHref = `tel:${HOTEL_INFO.phone.replace(/\s/g, "")}`;

export default function MobileHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const prefix = useMobilePrefix();
  const current = stripMobilePrefix(pathname);
  const { title, backTo, home } = headerFor(current);

  return (
    <header className={`mobile-header ${home ? "bg-transparent" : "mobile-glass border-b"}`}>
      <div className="flex h-14 items-center justify-between gap-3 px-4">
        <div className="flex min-w-11 items-center">
          {backTo ? (
            <button
              type="button"
              onClick={() => router.push(mobileHref(backTo, prefix))}
              className="flex h-11 w-11 items-center justify-center rounded-full text-[var(--m-ink)] transition-transform duration-150 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--m-gold)]"
              aria-label="Go back"
            >
              <ArrowLeft size={22} weight="regular" aria-hidden="true" />
            </button>
          ) : home ? (
            <MobileLink href="/" className="flex h-11 items-center" aria-label="Home">
              <Image
                src="/images/logo.svg"
                alt="Royal Phuket City Hotel"
                width={132}
                height={28}
                className="h-7 w-auto brightness-0 invert"
                priority
              />
            </MobileLink>
          ) : (
            <span className="w-11" />
          )}
        </div>

        {!home && title ? (
          <h1 className="min-w-0 flex-1 truncate text-center font-heading text-lg text-[var(--m-ink)]">
            {title}
          </h1>
        ) : (
          <span className="flex-1" />
        )}

        <div className="flex items-center">
          {home ? (
            <MobileLink
              href="/chat"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/18 text-white transition-transform duration-150 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--m-gold)]"
              aria-label="Live chat with the front desk"
            >
              <ChatCircle size={22} weight="fill" aria-hidden="true" />
            </MobileLink>
          ) : null}
          <a
            href={telHref}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-150 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--m-gold)] ${
              home ? "bg-white/18 text-white" : "text-[var(--m-gold)]"
            }`}
            aria-label={`Call ${HOTEL_INFO.name}`}
          >
            <Phone size={22} weight={home ? "fill" : "regular"} aria-hidden="true" />
          </a>
        </div>
      </div>
    </header>
  );
}
