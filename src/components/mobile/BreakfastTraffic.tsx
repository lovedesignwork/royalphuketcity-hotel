"use client";

function breakfastLevel(now = new Date()): { label: string; className: string } {
  const minutes = now.getHours() * 60 + now.getMinutes();
  if (minutes < 6 * 60 + 30 || minutes >= 10 * 60 + 30) {
    return { label: "Closed", className: "bg-gray-200 text-gray-600" };
  }
  if (minutes < 8 * 60) {
    return { label: "Quiet", className: "bg-emerald-100 text-emerald-800" };
  }
  if (minutes < 9 * 60 + 30) {
    return { label: "Busy", className: "bg-amber-100 text-amber-800" };
  }
  return { label: "Easing", className: "bg-sky-100 text-sky-800" };
}

export default function BreakfastTraffic() {
  const level = breakfastLevel();
  return (
    <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${level.className}`}>
      {level.label}
    </span>
  );
}
