"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isTwistFestivePoster } from "@/lib/twist-festive";
import MobileLink from "./MobileLink";

interface Announcement {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  image_alt?: string;
  link_type: "none" | "internal" | "external";
  internal_slug?: string;
  external_url?: string;
  button_text: string;
}

export default function MobileAnnouncement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/announcements", { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled) {
          setAnnouncements(data.announcements ?? []);
        }
      } catch {
        /* keep home usable without the banner */
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!announcements.length) return null;

  return (
    <section aria-label="Special announcements" className="grid gap-4">
      {announcements.map((announcement) => <MobileAnnouncementCard key={announcement.id} announcement={announcement} />)}
    </section>
  );
}

function MobileAnnouncementCard({ announcement }: { announcement: Announcement }) {
  const innerHref =
    announcement.link_type === "internal" && announcement.internal_slug
      ? `/promotions/${announcement.internal_slug}`
      : null;
  const externalHref =
    announcement.link_type === "external" ? announcement.external_url : null;
  const isPoster = isTwistFestivePoster(announcement.image);

  const body = (
    <div className="relative overflow-hidden rounded-[16px] bg-[var(--m-card)]">
      {announcement.image ? (
        <div className={`relative ${isPoster ? "aspect-[70/99]" : "h-36"}`}>
          <Image
            src={announcement.image}
            alt={announcement.image_alt || announcement.title}
            fill
            sizes="(max-width: 480px) calc(100vw - 2rem), 420px"
            className={isPoster ? "object-contain" : "object-cover"}
          />
        </div>
      ) : null}
      <div className="min-w-0 p-4 [overflow-wrap:anywhere]">
        <p className="font-heading text-lg leading-tight">{announcement.title}</p>
        {announcement.subtitle ? (
          <p className="mt-1 text-sm text-[var(--m-muted)]">{announcement.subtitle}</p>
        ) : null}
        {announcement.button_text ? (
          <p className="mt-3 text-sm font-medium text-[var(--m-gold)]">
            {announcement.button_text}
          </p>
        ) : null}
      </div>
    </div>
  );

  if (innerHref) {
    return <MobileLink href={innerHref}>{body}</MobileLink>;
  }
  if (externalHref) {
    return (
      <a href={externalHref} target="_blank" rel="noopener noreferrer">
        {body}
      </a>
    );
  }
  return body;
}
