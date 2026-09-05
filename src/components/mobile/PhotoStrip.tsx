"use client";

import { useState } from "react";
import Image from "next/image";

type Photo = { src: string; alt: string };

export default function PhotoStrip({
  photos,
  heroClassName = "h-56 rounded-[16px]",
  padded = true,
  imageFit = "cover",
}: {
  photos: Photo[];
  heroClassName?: string;
  padded?: boolean;
  imageFit?: "cover" | "contain";
}) {
  const [active, setActive] = useState(0);

  if (photos.length === 0) return null;

  const current = photos[Math.min(active, photos.length - 1)];
  const fitClass = imageFit === "contain" ? "object-contain" : "object-cover";

  return (
    <div className={padded ? "px-4" : undefined}>
      <div className={`relative overflow-hidden bg-black/5 ${heroClassName}`}>
        <Image
          key={current.src}
          src={current.src}
          alt={current.alt}
          fill
          sizes="430px"
          priority={padded}
          className={fitClass}
        />
        {photos.length > 1 ? (
          <span className="absolute right-3 bottom-3 rounded-full bg-black/55 px-2.5 py-1 text-xs font-medium text-white">
            {active + 1} / {photos.length}
          </span>
        ) : null}
      </div>

      {photos.length > 1 ? (
        <div
          className={
            padded
              ? "mt-2 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              : "mt-px flex justify-center gap-px overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }
        >
          {photos.map((photo, index) => {
            const selected = index === active;
            return (
              <button
                key={`${photo.src}-${index}`}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show photo ${index + 1}`}
                aria-pressed={selected}
                className={
                  padded
                    ? `relative h-16 w-20 shrink-0 overflow-hidden rounded-[10px] transition-transform duration-150 active:scale-[0.98] ${
                        selected
                          ? "ring-2 ring-[var(--m-gold)] ring-offset-2 ring-offset-[var(--m-card)]"
                          : "opacity-70"
                      }`
                    : `relative h-16 w-20 shrink-0 overflow-hidden rounded-none ${
                        selected ? "outline outline-1 outline-[var(--m-gold)]" : "opacity-80"
                      }`
                }
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
