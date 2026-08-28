"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/announcements");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.announcements?.[0]) {
          setAnnouncement(data.announcements[0]);
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

  if (!announcement) return null;

  const innerHref =
    announcement.link_type === "internal" && announcement.internal_slug
      ? `/promotions/${announcement.internal_slug}`
      : null;
  const externalHref =
    announcement.link_type === "external" ? announcement.external_url : null;

  const body = (
    <div className="relative overflow-hidden rounded-[16px] bg-[var(--m-card)]">
      {announcement.image ? (
        <div className="relative h-36">
          <Image
            src={announcement.image}
            alt={announcement.image_alt || announcement.title}
            fill
            sizes="400px"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className="p-4">
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
