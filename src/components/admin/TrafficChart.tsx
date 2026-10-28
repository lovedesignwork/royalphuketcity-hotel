"use client";

import { useEffect, useRef, useState } from "react";

// React adaptation of Taste's charts.js bars/ticks helpers: zero-based scale,
// round ticks and 62% bar bands, with React-owned DOM and observer cleanup.
function ticks(max: number) {
  const raw = Math.max(max, 1) / 4;
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = Math.max(1, [1, 2, 2.5, 5, 10].map((n) => n * magnitude).find((n) => n >= raw) ?? 10 * magnitude);
  let top = Math.ceil(max / step) * step;
  if (top <= max) top += step;
  return Array.from({ length: Math.round(top / step) + 1 }, (_, i) => i * step);
}
export default function TrafficChart({ data, label = "Daily hotel website page views over the last 14 days", compact = false }: { data: { date: string; views: number }[]; label?: string; compact?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(600);
  const [active, setActive] = useState<number | null>(null);
  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(220, entry.contentRect.width)));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const axis = ticks(Math.max(0, ...data.map((day) => day.views)));
  const max = axis[axis.length - 1];
  const left = 40, top = 10, baseline = compact ? 130 : 180, height = baseline + 30;
  const band = (width - left - 8) / Math.max(data.length, 1);
  const y = (value: number) => top + (baseline - top) * (1 - value / max);
  const labelStep = Math.max(1, Math.ceil(data.length / Math.max(2, Math.floor((width - left) / 65))));
  const dateLabel = (date: string) => new Date(`${date}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
  return <div ref={container} className="admin-traffic-chart">
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`${label}. Each bar includes its date and page-view count.`}>
      {axis.map((value) => <g key={value}><line x1={left} x2={width - 8} y1={y(value)} y2={y(value)} stroke="var(--admin-rule)" /><text x={left - 10} y={y(value) + 4} textAnchor="end" fill="var(--admin-muted)" fontSize="11">{value.toLocaleString()}</text></g>)}
      {data.map((day, i) => <g key={day.date} tabIndex={0} role="img" aria-label={`${dateLabel(day.date)}: ${day.views.toLocaleString()} page views`} onFocus={() => setActive(i)} onBlur={() => setActive(null)} onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}>
        <rect x={left + band * i} y={top} width={band} height={baseline - top} fill="transparent" />
        <rect className="admin-chart-bar" x={left + band * (i + .19)} y={y(day.views)} width={band * .62} height={Math.max(0, baseline - y(day.views))} rx="1" fill={active === i ? "var(--admin-ink)" : "var(--admin-accent)"} />
        <title>{dateLabel(day.date)}: {day.views.toLocaleString()} page views</title>
        {i % labelStep === 0 && <text x={left + band * (i + .5)} y={height - 9} textAnchor="middle" fill="var(--admin-muted)" fontSize="11">{dateLabel(day.date)}</text>}
      </g>)}
    </svg>
    <div className="admin-chart-caption" aria-live="polite">{active !== null && data[active] ? `${dateLabel(data[active].date)} · ${data[active].views.toLocaleString()} page views` : "Page views per day · hover or focus a bar for details"}</div>
  </div>;
}
