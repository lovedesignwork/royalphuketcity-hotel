"use client";

import Image from "next/image";

type Photo = { src: string; alt: string };

export default function PhotoStrip({ photos }: { photos: Photo[] }) {
  if (photos.length === 0) return null;

  return (
    <div className="mobile-snap px-4">
      {photos.map((photo) => (
        <div
          key={photo.src}
          className="relative h-56 w-[78vw] max-w-[320px] overflow-hidden rounded-[16px]"
        >
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="320px"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
