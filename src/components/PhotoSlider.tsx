"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const photos = [
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    alt: "Royal Phuket City Hotel",
  },
  {
    src: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
    alt: "Grand Ballroom",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop",
    alt: "Wedding Ceremony",
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
    alt: "Rooftop Swimming Pool",
  },
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop",
    alt: "Fine Dining Restaurant",
  },
  {
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974&auto=format&fit=crop",
    alt: "Luxury Guest Room",
  },
  {
    src: "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?q=80&w=2070&auto=format&fit=crop",
    alt: "TWIST Rooftop Bar",
  },
  {
    src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop",
    alt: "Spa & Wellness",
  },
  {
    src: "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2025&auto=format&fit=crop",
    alt: "Executive Suite",
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
                  sizes="33vw"
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
