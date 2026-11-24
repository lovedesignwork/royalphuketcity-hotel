import type { ReactNode } from "react";

export const festiveAnnouncementActionClass =
  "inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-md bg-[#71583c] px-2.5 text-white min-[420px]:px-3";

export default function FestiveAnnouncementDetails({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  const date = subtitle?.split(" · ", 1)[0];

  return (
    <div className="flex min-w-0 flex-1 items-center justify-between gap-3 bg-[#1a1a2e] px-3.5 py-3 sm:px-5 sm:py-4">
      <div className="min-w-0 [overflow-wrap:anywhere]">
        {date && <p className="mb-1 text-xs leading-4 font-medium text-[#d9bc92]">{date}</p>}
        <h3 className="font-heading text-lg leading-tight text-white sm:text-2xl">{title}</h3>
      </div>
      {action}
    </div>
  );
}
