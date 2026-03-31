"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  {
    src: "/images/HOTEL WEBSITE/RPC LS ROOM 1.jpg",
    alt: "Royal Phuket City Hotel",
  },
  {
    src: "/images/HOTEL WEBSITE/RPC Lobby 2.jpg",
    alt: "Hotel Lobby",
  },
  {
    src: "/images/HOTEL WEBSITE/RPC Lobby 3.jpg",
    alt: "Hotel Lobby",
  },
  {
    src: "/images/HOTEL WEBSITE/RPC LS ROOM 41.jpg",
    alt: "Luxury Suite",
  },
  {
    src: "/images/HOTEL WEBSITE/RPC Lobby 6.jpg",
    alt: "Hotel Lobby Lounge",
  },
  {
    src: "/images/HOTEL WEBSITE/RPC LS ROOM 33.jpg",
    alt: "Luxury Guest Room",
  },
  {
    src: "/images/HOTEL WEBSITE/RPC LS ROOM 38.jpg",
    alt: "Premium Room",
  },
  {
    src: "/images/HOTEL WEBSITE/RPC LS ROOM 40.jpg",
    alt: "Deluxe Room",
  },
  {
    src: "/images/HOTEL WEBSITE/RPC LS ROOM 14.jpg",
    alt: "Executive Suite",
  },
  {
    src: "/images/HOTEL WEBSITE/Smart-Bus.jpeg",
    alt: "Smart Bus",
  },
  {
    src: "/images/HOTEL WEBSITE/MTT1996.jpg",
    alt: "MTT 1996",
  },
  {
    src: "/images/HOTEL WEBSITE/Fitness.jpg",
    alt: "Fitness Center",
  },
  {
    src: "/images/HOTEL WEBSITE/Ballroom.jpg",
    alt: "Grand Ballroom",
  },
  {
    src: "/images/HOTEL WEBSITE/Bgz.jpg",
    alt: "Hotel Facility",
  },
];

export default function PhotoSlider() {
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

  // Auto-advance every 3 seconds
  useEffect(() => {
    const timer = setInterval(next, 3000);
    return () => clearInterval(timer);
  }, [next]);

  // Get indices of the 3 visible photos
  const getIndex = (offset: number) => (current + offset) % total;

  return (
    <section className="relative w-full overflow-hidden">
      {/* 3-column photo strip — moves 1 at a time */}
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
                  sizes="(max-width: 768px) 100vw, 700px"
                  quality={100}
                  unoptimized={!photos[getIndex(offset)].src.startsWith("http")}
                />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Arrow - Circle */}
      <button
        onClick={prev}
        className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
        aria-label="Previous photo"
      >
        <svg className="w-5 h-5 text-[--color-text-primary]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow - Circle */}
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
