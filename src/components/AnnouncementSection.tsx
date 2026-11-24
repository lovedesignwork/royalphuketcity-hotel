"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

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

export default function AnnouncementSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchAnnouncements() {
      try {
        const res = await fetch("/api/announcements", { signal: controller.signal, cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (!controller.signal.aborted) setAnnouncements(data.announcements ?? []);
        }
      } catch (error) {
        if (!controller.signal.aborted) console.error("Failed to fetch announcements:", error);
      }
    }

    void fetchAnnouncements();
    return () => controller.abort();
  }, []);

  if (!announcements.length) return null;

  return (
    <section id="announcements" aria-labelledby="homepage-announcements-heading" className="py-20 md:py-28 bg-white relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">
        {/* Special Announcement Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B7355]/10 border border-[#8B7355]/30 rounded-full">
            <span className="w-2 h-2 bg-[#8B7355] rounded-full animate-pulse" />
            <h2 id="homepage-announcements-heading" className="text-[#705a41] text-sm font-medium tracking-wider uppercase">
              {announcements.length === 1 ? "Special announcement" : "Special announcements"}
            </h2>
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid gap-8">
          {announcements.map((announcement) => <AnnouncementCard key={announcement.id} announcement={announcement} />)}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B7355]/30 to-transparent" />
    </section>
  );
}

function AnnouncementCard({ announcement }: { announcement: Announcement }) {
  const linkHref = announcement.link_type === "internal" && announcement.internal_slug
    ? `/promotions/${announcement.internal_slug}`
    : announcement.link_type === "external" ? announcement.external_url : null;
  const isExternal = announcement.link_type === "external";
  const imagePosition = announcement.image?.endsWith("/nye-fireworks-hero.webp") ? "lg:object-right" : "";

  return (
    <article className="relative bg-[#1a1a2e] border border-[#8B7355]/20 overflow-hidden shadow-2xl">

      <div className="grid lg:grid-cols-2 gap-0">
        {/* Image Side */}
        {announcement.image && (
          <div className="relative aspect-video lg:aspect-auto lg:min-h-[450px]">
            <Image
              src={announcement.image}
              alt={announcement.image_alt || announcement.title}
              fill
              sizes="(max-width: 1023px) 100vw, 1100px"
              className={`object-cover ${imagePosition}`}
            />

            {/* Decorative frame corners */}
            <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#8B7355]/60" />
            <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#8B7355]/60 lg:hidden" />
            <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#8B7355]/60" />
          </div>
        )}

        {/* Content Side */}
        <div className={`min-w-0 p-6 sm:p-8 lg:p-12 flex flex-col justify-center [overflow-wrap:anywhere] ${!announcement.image ? 'lg:col-span-2 text-center items-center' : ''}`}>
          {/* Subtitle/Date */}
          {announcement.subtitle && (
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-gradient-to-r from-[#8B7355] to-transparent" />
              <p className="text-[#d9bc92] text-sm font-medium tracking-[0.12em] uppercase">
                {announcement.subtitle}
              </p>
            </div>
          )}

          {/* Title */}
          <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
            {announcement.title}
          </h3>

          {/* Decorative divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#8B7355]" />
            <svg className="w-4 h-4 text-[#8B7355]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
            <div className="w-12 h-px bg-[#8B7355]" />
          </div>

          {/* Description */}
          <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
            {announcement.description}
          </p>

          {linkHref && (
            <Link href={linkHref} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noopener noreferrer" : undefined}
              aria-label={announcement.button_text + " · " + announcement.title}
              className="inline-flex min-h-11 items-center gap-3 rounded-lg bg-[#71583c] px-6 py-3 font-medium text-white hover:bg-[#87694c] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9bc92]">
              {announcement.button_text}<ArrowRight size={18} className="shrink-0" aria-hidden="true" />
            </Link>
          )}

          {/* Secondary info */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-x-6 gap-y-3 text-white/60 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Royal Phuket City Hotel</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative corner accents */}
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#8B7355]/40" />
    </article>
  );
}
