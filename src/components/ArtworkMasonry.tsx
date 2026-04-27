"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Artwork {
  src: string;
  title: string;
}

interface ArtworkMasonryProps {
  works: Artwork[];
  artistName: string;
  showCaptions?: boolean;
}

export default function ArtworkMasonry({
  works,
  artistName,
  showCaptions = true,
}: ArtworkMasonryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const close = useCallback(() => setSelectedIndex(null), []);

  const prev = useCallback(
    () =>
      setSelectedIndex((i) =>
        i === null ? null : (i - 1 + works.length) % works.length,
      ),
    [works.length],
  );

  const next = useCallback(
    () =>
      setSelectedIndex((i) =>
        i === null ? null : (i + 1) % works.length,
      ),
    [works.length],
  );

  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [selectedIndex, close, prev, next]);

  const isSingle = works.length === 1;

  return (
    <>
      {isSingle ? (
        <div className="grid gap-4 md:gap-6 grid-cols-1 max-w-3xl mx-auto">
          {works.map((work, i) => (
            <WorkFigure
              key={work.src}
              work={work}
              artistName={artistName}
              onOpen={() => setSelectedIndex(i)}
              size="large"
              showCaption={showCaptions}
            />
          ))}
        </div>
      ) : (
        <div
          className={`gap-4 md:gap-6 ${
            works.length <= 3
              ? "columns-1 sm:columns-2 md:columns-3"
              : "columns-2 md:columns-3"
          }`}
        >
          {works.map((work, i) => (
            <WorkFigure
              key={work.src}
              work={work}
              artistName={artistName}
              onOpen={() => setSelectedIndex(i)}
              showCaption={showCaptions}
            />
          ))}
        </div>
      )}

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 md:top-8 md:right-8 text-white/80 hover:text-white transition-colors z-10 p-2"
              aria-label="Close"
            >
              <svg
                className="w-7 h-7 md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {works.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
                  aria-label="Previous artwork"
                >
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10 p-2"
                  aria-label="Next artwork"
                >
                  <svg
                    className="w-8 h-8 md:w-10 md:h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            <motion.div
              key={selectedIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="relative flex flex-col items-center justify-center max-w-[90vw] max-h-[88vh] gap-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex items-center justify-center max-w-full max-h-[78vh]">
                <Image
                  src={works[selectedIndex].src}
                  alt={`${works[selectedIndex].title} by ${artistName}`}
                  width={1920}
                  height={1920}
                  className="max-w-[90vw] max-h-[78vh] w-auto h-auto object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <div className="text-center text-white/90 px-4">
                {showCaptions && (
                  <p className="font-heading text-lg md:text-xl">
                    {works[selectedIndex].title}
                  </p>
                )}
                <p className="text-xs md:text-sm text-white/60 mt-1 tracking-[0.15em] uppercase">
                  {artistName}
                </p>
              </div>
            </motion.div>

            {works.length > 1 && (
              <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/60 text-xs md:text-sm tabular-nums">
                {selectedIndex + 1} / {works.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function WorkFigure({
  work,
  artistName,
  onOpen,
  size = "default",
  showCaption = true,
}: {
  work: Artwork;
  artistName: string;
  onOpen: () => void;
  size?: "default" | "large";
  showCaption?: boolean;
}) {
  const dims =
    size === "large" ? { w: 1600, h: 2000 } : { w: 800, h: 1000 };
  const sizes =
    size === "large"
      ? "(max-width: 768px) 100vw, 768px"
      : "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";

  return (
    <figure
      className={`group relative overflow-hidden bg-[--color-surface] ${
        size === "large" ? "" : "mb-4 md:mb-6 break-inside-avoid"
      }`}
    >
      <button
        type="button"
        onClick={onOpen}
        className="relative block w-full cursor-zoom-in focus:outline-none focus-visible:ring-2 focus-visible:ring-[--color-accent]"
        aria-label={`View ${work.title} larger`}
      >
        <Image
          src={work.src}
          alt={`${work.title} by ${artistName}`}
          width={dims.w}
          height={dims.h}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes={sizes}
        />
        <span className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        <span className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <svg
            className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
            />
          </svg>
        </span>
      </button>
      {showCaption && (
        <figcaption className="p-3 text-xs md:text-sm text-[--color-text-secondary] text-center">
          {work.title}
        </figcaption>
      )}
    </figure>
  );
}
