"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface RoomCardProps {
  slug: string;
  name: string;
  category: string;
  size: string;
  maxGuests: number;
  bedType: string;
  views: readonly string[];
  shortDescription: string;
  image: string;
}

export default function RoomCard({
  slug,
  name,
  size,
  maxGuests,
  bedType,
  views,
  shortDescription,
  image,
}: RoomCardProps) {
  const hasSeaView = views.some((v) => v.toLowerCase().includes("sea"));

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <Link href={`/${slug}`} className="block">
        {/* Image — tall portrait ratio for luxury feel */}
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Permanent bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Sea View badge */}
          {hasSeaView && (
            <div className="absolute top-5 right-5 z-10">
              <span className="bg-[#8B7355] text-white px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-medium">
                Partial Sea View
              </span>
            </div>
          )}

          {/* Content overlaid on image */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-7">
            {/* Room details — always visible */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/60 tracking-[0.12em] uppercase mb-3">
              <span>{size}</span>
              <span className="text-[#8B7355]">·</span>
              <span>{maxGuests} Guests</span>
              <span className="text-[#8B7355]">·</span>
              <span>{bedType}</span>
            </div>

            {/* Gold line */}
            <div className="w-8 h-[1.5px] bg-[#8B7355] mb-3 transition-all duration-500 group-hover:w-14" />

            {/* Room name */}
            <h3 className="font-heading text-white text-2xl lg:text-3xl leading-tight mb-4">
              {name}
            </h3>

            {/* Description — always visible on mobile, slides up on hover on desktop */}
            <div className="overflow-hidden max-h-20 md:max-h-0 md:group-hover:max-h-20 transition-all duration-500 ease-out">
              <p className="text-white/70 text-sm leading-relaxed mb-4">
                {shortDescription}
              </p>
            </div>

            {/* CTA */}
            <div className="flex items-center justify-between border-t border-white/20 pt-4">
              <span className="inline-flex items-center gap-2 text-white/60 text-xs tracking-[0.15em] uppercase">
                {hasSeaView && (
                  <svg
                    className="w-4 h-4 text-[#8B7355]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 13c.6.6 1.5 1 2.5 1 2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2c1 0 1.9-.4 2.5-1M2 17c.6.6 1.5 1 2.5 1 2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2c1 0 1.9-.4 2.5-1M2 9c.6.6 1.5 1 2.5 1 2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2c1 0 1.9-.4 2.5-1"
                    />
                  </svg>
                )}
                {views[0]}
              </span>
              <span className="inline-flex items-center gap-2 text-[#8B7355] text-xs tracking-[0.15em] uppercase font-medium group-hover:gap-3 transition-all duration-300">
                Explore
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
