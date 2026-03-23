"use client";

import { useEffect, useState } from "react";
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
  const [announcement, setAnnouncement] = useState<Announcement | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnnouncement() {
      try {
        const res = await fetch("/api/announcements");
        if (res.ok) {
          const data = await res.json();
          if (data.announcements && data.announcements.length > 0) {
            setAnnouncement(data.announcements[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch announcement:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncement();
  }, []);

  if (loading || !announcement) {
    return null;
  }

  const linkHref =
    announcement.link_type === "internal"
      ? `/promotions/${announcement.internal_slug}`
      : announcement.link_type === "external"
      ? announcement.external_url
      : null;

  const isExternal = announcement.link_type === "external";

  return (
    <section className="py-20 md:py-28 bg-white relative overflow-hidden">

      <div className="container mx-auto px-6 relative z-10">
        {/* Special Announcement Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B7355]/10 border border-[#8B7355]/30 rounded-full">
            <span className="w-2 h-2 bg-[#8B7355] rounded-full animate-pulse" />
            <span className="text-[#8B7355] text-sm font-medium tracking-wider uppercase">
              Special Announcement
            </span>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Main Card */}
          <div className="relative bg-[#1a1a2e] border border-[#8B7355]/20 overflow-hidden shadow-2xl">

            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Side */}
              {announcement.image && (
                <div className="relative h-72 lg:h-auto lg:min-h-[450px]">
                  <Image
                    src={announcement.image}
                    alt={announcement.image_alt || announcement.title}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Decorative frame corners */}
                  <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#8B7355]/60" />
                  <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#8B7355]/60 lg:hidden" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#8B7355]/60" />
                </div>
              )}

              {/* Content Side */}
              <div className={`p-8 lg:p-12 flex flex-col justify-center ${!announcement.image ? 'lg:col-span-2 text-center items-center' : ''}`}>
                {/* Subtitle/Date */}
                {announcement.subtitle && (
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-8 h-px bg-gradient-to-r from-[#8B7355] to-transparent" />
                    <p className="text-[#8B7355] text-sm font-medium tracking-[0.2em] uppercase">
                      {announcement.subtitle}
                    </p>
                  </div>
                )}

                {/* Title */}
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-6 leading-tight">
                  {announcement.title}
                </h2>

                {/* Decorative divider */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-px bg-[#8B7355]" />
                  <svg className="w-4 h-4 text-[#8B7355]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                  </svg>
                  <div className="w-12 h-px bg-[#8B7355]" />
                </div>

                {/* Description */}
                <p className="text-white/70 text-lg leading-relaxed mb-8 max-w-xl">
                  {announcement.description}
                </p>

                {/* CTA Button */}
                {linkHref && (
                  <>
                    {isExternal ? (
                      <a
                        href={linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-[#8B7355] text-white font-medium rounded-lg hover:bg-[#a08462] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,115,85,0.4)] hover:scale-105"
                      >
                        {announcement.button_text}
                        <svg
                          className="w-5 h-5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </a>
                    ) : (
                      <Link
                        href={linkHref}
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-[#8B7355] text-white font-medium rounded-lg hover:bg-[#a08462] transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,115,85,0.4)] hover:scale-105"
                      >
                        {announcement.button_text}
                        <svg
                          className="w-5 h-5 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </Link>
                    )}
                  </>
                )}

                {/* Secondary info */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-6 text-white/50 text-sm">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>Royal Phuket City Hotel</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span>Exclusive Offer</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative corner accents */}
            <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#8B7355]/40" />
          </div>
        </div>
      </div>

      {/* Bottom gold separator */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#8B7355]/30 to-transparent" />
    </section>
  );
}
