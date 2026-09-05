"use client";

import { useEffect, useState } from "react";

type Level = { label: string; className: string };

function bangkokMinutes(now = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Bangkok",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? 0);
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? 0);
  return hour * 60 + minute;
}

function breakfastLevel(now = new Date()): Level {
  const minutes = bangkokMinutes(now);
  if (minutes < 6 * 60 + 30 || minutes >= 10 * 60 + 30) {
    return { label: "Closed", className: "bg-gray-200 text-gray-600" };
  }
  if (minutes < 7 * 60 + 30) {
    return { label: "Quiet", className: "bg-emerald-100 text-emerald-800" };
  }
  if (minutes < 9 * 60) {
    return { label: "Moderate", className: "bg-amber-100 text-amber-800" };
  }
  return { label: "Peak", className: "bg-rose-100 text-rose-800" };
}

export default function BreakfastTraffic() {
  const [level, setLevel] = useState<Level | null>(null);

  useEffect(() => {
    const update = () => setLevel(breakfastLevel());
    update();
    const id = window.setInterval(update, 30_000);
    return () => window.clearInterval(id);
  }, []);

  if (!level) return null;

  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${level.className}`}>
      {level.label}
    </span>
  );
}
