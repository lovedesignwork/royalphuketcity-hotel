"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ExpandableMap({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-3 block w-full overflow-hidden rounded-[12px]"
        aria-label="Enlarge route map"
      >
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={700}
          className="h-auto w-full"
        />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt}
        >
          <button
            type="button"
            className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white"
            onClick={() => setOpen(false)}
            aria-label="Close map"
          >
            ×
          </button>
          <Image
            src={src}
            alt={alt}
            width={1800}
            height={1050}
            className="max-h-[92dvh] w-auto max-w-full object-contain"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      ) : null}
    </>
  );
}
