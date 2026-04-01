"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  {
    src: "/images/HOTEL WEBSITE/MTG_NM_W08_ballroom_highangle_wide.jpg",
    alt: "Grand Ballroom High Angle",
  },
  {
    src: "/images/HOTEL WEBSITE/MTG_NM_W04_ballroom_classroom_wide.jpg",
    alt: "Ballroom Classroom Setup",
  },
  {
    src: "/images/HOTEL WEBSITE/MTG_NM_W06_stage_POV_wide.jpg",
    alt: "Stage POV View",
  },
  {
    src: "/images/HOTEL WEBSITE/EVT_GA_L01_gala_room_wide.jpg",
    alt: "Gala Room",
  },
  {
    src: "/images/HOTEL WEBSITE/MTG_NM_W05_cocktail_setup_wide.jpg",
    alt: "Cocktail Setup",
  },
  {
    src: "/images/HOTEL WEBSITE/MTG_NM_W03_stage_LED_wide.jpg",
    alt: "Stage LED Setup",
  },
  {
    src: "/images/HOTEL WEBSITE/F45_PL_L01_launch_wide.jpg",
    alt: "Product Launch Event",
  },
  {
    src: "/images/HOTEL WEBSITE/EVT_TS_L01_panel_stage_wide.jpg",
    alt: "Panel Stage Event",
  },
  {
    src: "/images/HOTEL WEBSITE/EVT_SW_L01_workshop_room_wide.jpg",
    alt: "Workshop Room",
  },
  {
    src: "/images/HOTEL WEBSITE/MTG_MW_16_cocktail_group_laugh_medium.jpg",
    alt: "Cocktail Group",
  },
  {
    src: "/images/HOTEL WEBSITE/F45_GA_L04_gala_table_medium.jpg",
    alt: "Gala Table Setup",
  },
  {
    src: "/images/HOTEL WEBSITE/EVT_GA_L01_gala_room_wide.jpg",
    alt: "Grand Event",
  },
  {
    src: "/images/HOTEL WEBSITE/EVT_CN_L01_concert_stage_crowd_wide.jpg",
    alt: "Concert Stage",
  },
];

export default function MICEPhotoSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const total = photos.length;

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  };

  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  const getIndex = (offset: number) => (current + offset) % total;

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full">
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={current}
            custom={direction}
            initial={{ x: direction > 0 ? "33.333%" : "-33.333%", opacity: 0.6 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: direction > 0 ? "-33.333%" : "33.333%", opacity: 0.6 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="grid grid-cols-3 w-full"
          >
            {[0, 1, 2].map((offset) => (
              <div key={offset} className="relative aspect-[4/3]">
                <Image
                  src={photos[getIndex(offset)].src}
                  alt={photos[getIndex(offset)].alt}
                  fill
                  className="object-cover"
                  sizes="33vw"
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Previous photo"
      >
        <svg className="w-5 h-5 text-[--color-text-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={next}
        className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Next photo"
      >
        <svg className="w-5 h-5 text-[--color-text-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {photos.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setDirection(i > current ? 1 : -1);
              setCurrent(i);
            }}
            className={`transition-all duration-300 rounded-full ${
              i === current
                ? "w-5 h-1.5 bg-white"
                : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to photo ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
