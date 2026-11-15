"use client";

import { useState, type ReactNode } from "react";
import { CaretDown } from "@phosphor-icons/react";

export default function PreFooterCategory({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const panelId = `pre-footer-${id}`;

  return (
    <div className="min-w-0 border-b border-border md:border-0">
      <h3 className="font-heading text-xl leading-snug md:mb-3">
        <span className="hidden md:block">{title}</span>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex min-h-14 w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:text-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:hidden"
        >
          <span className="min-w-0">{title}</span>
          <CaretDown
            size={18}
            aria-hidden="true"
            className={`shrink-0 text-accent transition-transform duration-200 motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
          />
        </button>
      </h3>
      <div id={panelId} className={`${open ? "block" : "hidden"} pb-4 md:block md:pb-0`}>
        {children}
      </div>
    </div>
  );
}
