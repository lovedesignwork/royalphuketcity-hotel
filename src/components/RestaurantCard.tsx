"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import LocaleLink from "@/components/i18n/LocaleLink";
import { useLocale } from "@/components/i18n/LocaleProvider";

interface RestaurantCardProps {
  slug: string;
  name: string;
  cuisine: string;
  floor: string;
  hours: string;
  shortDescription: string;
  image: string;
}

export default function RestaurantCard({
  slug,
  name,
  cuisine,
  floor,
  hours,
  shortDescription,
  image,
}: RestaurantCardProps) {
  const { locale, t } = useLocale();
  const isThai = locale === "th";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group flex flex-col"
    >
      {/* Image */}
      <LocaleLink href={`/${slug}`} className="block relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1088px) 50vw, 496px"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-500" />
      </LocaleLink>

      {/* Content — center aligned */}
      <div className="flex flex-col items-center text-center pt-8 px-4 flex-1">

        {/* Cuisine label */}
        <span className="label-accent text-[--color-accent] text-[10px] tracking-[0.2em] mb-3">
          {cuisine}
        </span>

        {/* Gold accent line */}
        <div className="w-8 h-[2px] bg-[#8B7355] mb-4" />

        {/* Name */}
        <LocaleLink href={`/${slug}`}>
          <h3 className="font-heading text-2xl lg:text-[1.6rem] mb-4 group-hover:text-[--color-accent] transition-colors duration-300 leading-snug">
            {name}
          </h3>
        </LocaleLink>

        {/* Hours & Floor */}
        <div className={`flex items-center justify-center gap-3 text-[11px] text-[--color-text-secondary] mb-4 ${isThai ? "" : "tracking-wider uppercase"}`}>
          <span>{floor}</span>
          <span className="text-[#8B7355]">-</span>
          <span>{hours}</span>
        </div>

        {/* Description */}
        <p className="text-[--color-text-secondary] text-sm leading-relaxed mb-6 line-clamp-2 max-w-xs">
          {shortDescription}
        </p>

        {/* Spacer pushes link to bottom */}
        <div className="flex-1" />

        {/* Full width divider */}
        <div className="w-full h-px bg-[--color-border] mb-5 mt-auto" />

        {/* CTA link */}
        <LocaleLink
          href={`/${slug}`}
          className="inline-flex items-center gap-3 group/link pb-1"
        >
          <span className={`text-[#8B7355] text-[11px] font-medium relative ${isThai ? "" : "tracking-[0.2em] uppercase"}`}>
            {t.common.discoverMore}
            <span className="absolute left-0 -bottom-0.5 w-full h-px bg-[#8B7355]/30 group-hover/link:bg-[#8B7355] transition-colors duration-300" />
          </span>
          <svg
            className="w-4 h-4 text-[#8B7355] transition-transform duration-300 group-hover/link:translate-x-1.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </LocaleLink>

      </div>
    </motion.div>
  );
}
