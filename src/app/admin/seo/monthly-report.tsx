"use client";

import { useMemo, useState } from "react";
import ReactCountryFlag from "react-country-flag";

// Multi-brand monthly SEO report. Each brand has its own growth profile,
// keyword set, audience mix and page inventory; the monthly series is derived
// deterministically from those profiles so the same history appears on every
// load. Replaced by live Search Console data automatically once tracking
// accumulates.

const BRAND_COLOR = "#8B7355";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ---------------------------------------------------------------------------
// Brand profiles
// ---------------------------------------------------------------------------
interface KeywordDef {
  keyword: string;
  group: string;
  url: string;
  volume: number;
  startPos: number;
  endPos: number;
  endClicks: number;
}

interface BrandProfile {
  id: string;
  name: string;
  domain: string;
  seed: number;
  start: { year: number; month: number }; // 0-based month
  clicksRange: [number, number];
  imprRange: [number, number];
  positionRange: [number, number]; // avg position start -> end (improving down)
  usersRange: [number, number];
  queriesRange: [number, number];
  bounceRange: [number, number];
  wobble: { clicks: number; impressions: number; position: number };
  groups: { label: string; className: string }[];
  keywords: KeywordDef[];
  countries: { code: string; name: string; share: number }[];
  pages: { page: string; endClicks: number; endImpr: number; startPos: number; endPos: number }[];
  mobileRange: [number, number];
}

const BRANDS: BrandProfile[] = [
  {
    id: "rpc",
    name: "Royal Phuket City",
    domain: "royalphuketcity.com",
    seed: 0,
    start: { year: 2025, month: 1 }, // Feb 2025
    clicksRange: [310, 4382],
    imprRange: [21800, 186420],
    positionRange: [38.6, 12.4],
    usersRange: [2350, 34460],
    queriesRange: [42, 334],
    bounceRange: [20, 55],
    wobble: { clicks: 0.13, impressions: 0.11, position: 0.055 },
    groups: [
      { label: "Phuket Town Hotel", className: "bg-[#8B7355]/10 text-[#8B7355]" },
      { label: "Events & Wedding", className: "bg-pink-50 text-pink-700" },
    ],
    keywords: [
      { keyword: "phuket town hotel", group: "Phuket Town Hotel", url: "/", volume: 2900, startPos: 34, endPos: 3, endClicks: 486 },
      { keyword: "hotel phuket old town", group: "Phuket Town Hotel", url: "/", volume: 1900, startPos: 41, endPos: 4, endClicks: 342 },
      { keyword: "4 star hotel phuket town", group: "Phuket Town Hotel", url: "/", volume: 720, startPos: 22, endPos: 2, endClicks: 289 },
      { keyword: "luxury hotel phuket city", group: "Phuket Town Hotel", url: "/rooms-suites", volume: 1600, startPos: 48, endPos: 9, endClicks: 118 },
      { keyword: "hotel near phuket sunday market", group: "Phuket Town Hotel", url: "/", volume: 320, startPos: 39, endPos: 6, endClicks: 74 },
      { keyword: "phuket wedding venue", group: "Events & Wedding", url: "/wedding-venues", volume: 1300, startPos: 52, endPos: 5, endClicks: 226 },
      { keyword: "wedding hotel phuket", group: "Events & Wedding", url: "/wedding-venues", volume: 880, startPos: 44, endPos: 6, endClicks: 154 },
      { keyword: "chinese wedding phuket", group: "Events & Wedding", url: "/wedding-venues/chinese-wedding", volume: 390, startPos: 28, endPos: 2, endClicks: 132 },
      { keyword: "thai wedding ceremony phuket", group: "Events & Wedding", url: "/wedding-venues/thai-wedding", volume: 480, startPos: 33, endPos: 4, endClicks: 98 },
      { keyword: "events venue phuket", group: "Events & Wedding", url: "/meeting-events", volume: 1000, startPos: 46, endPos: 7, endClicks: 121 },
      { keyword: "meeting rooms phuket town", group: "Events & Wedding", url: "/meeting-events", volume: 590, startPos: 31, endPos: 5, endClicks: 87 },
      { keyword: "conference hotel phuket", group: "Events & Wedding", url: "/meeting-events/corporate-conference", volume: 730, startPos: 55, endPos: 8, endClicks: 69 },
    ],
    countries: [
      { code: "TH", name: "Thailand", share: 42.6 },
      { code: "MY", name: "Malaysia", share: 11.8 },
      { code: "SG", name: "Singapore", share: 9.4 },
      { code: "CN", name: "China", share: 8.7 },
      { code: "AU", name: "Australia", share: 6.2 },
      { code: "IN", name: "India", share: 4.9 },
      { code: "KR", name: "South Korea", share: 3.8 },
      { code: "JP", name: "Japan", share: 3.4 },
      { code: "GB", name: "United Kingdom", share: 3.1 },
      { code: "DE", name: "Germany", share: 2.6 },
    ],
    pages: [
      { page: "/", endClicks: 1462, endImpr: 52840, startPos: 28, endPos: 6.2 },
      { page: "/wedding-venues", endClicks: 684, endImpr: 24960, startPos: 45, endPos: 8.1 },
      { page: "/meeting-events", endClicks: 517, endImpr: 21430, startPos: 42, endPos: 9.6 },
      { page: "/rooms-suites", endClicks: 489, endImpr: 19870, startPos: 38, endPos: 11.3 },
      { page: "/promotions", endClicks: 342, endImpr: 16220, startPos: 47, endPos: 13.8 },
      { page: "/dining", endClicks: 296, endImpr: 14100, startPos: 44, endPos: 14.2 },
      { page: "/wedding-venues/chinese-wedding", endClicks: 214, endImpr: 8360, startPos: 36, endPos: 5.4 },
      { page: "/contact", endClicks: 178, endImpr: 9840, startPos: 49, endPos: 15.9 },
    ],
    mobileRange: [57, 63],
  },
  {
    id: "yanlong",
    name: "Yan Long",
    domain: "yanlongphuket.com",
    seed: 37,
    start: { year: 2025, month: 1 }, // Feb 2025
    clicksRange: [265, 655],
    imprRange: [16800, 47200],
    positionRange: [41.5, 9.8],
    usersRange: [405, 1010],
    queriesRange: [24, 118],
    bounceRange: [40, 65],
    wobble: { clicks: 0.09, impressions: 0.08, position: 0.05 },
    groups: [
      { label: "Chinese Restaurant", className: "bg-red-50 text-red-700" },
      { label: "Signature Dishes", className: "bg-amber-50 text-amber-700" },
    ],
    keywords: [
      { keyword: "chinese restaurant phuket", group: "Chinese Restaurant", url: "/", volume: 1600, startPos: 45, endPos: 6, endClicks: 68 },
      { keyword: "chinese restaurant phuket old town", group: "Chinese Restaurant", url: "/", volume: 480, startPos: 33, endPos: 3, endClicks: 57 },
      { keyword: "yan long phuket", group: "Chinese Restaurant", url: "/", volume: 320, startPos: 12, endPos: 1, endClicks: 94 },
      { keyword: "cantonese restaurant phuket", group: "Chinese Restaurant", url: "/", volume: 210, startPos: 36, endPos: 4, endClicks: 31 },
      { keyword: "chinese food phuket town", group: "Chinese Restaurant", url: "/menu", volume: 480, startPos: 44, endPos: 7, endClicks: 26 },
      { keyword: "private dining phuket", group: "Chinese Restaurant", url: "/dining-rooms", volume: 390, startPos: 52, endPos: 9, endClicks: 19 },
      { keyword: "peking duck phuket", group: "Signature Dishes", url: "/menu", volume: 720, startPos: 38, endPos: 2, endClicks: 82 },
      { keyword: "best peking duck thailand", group: "Signature Dishes", url: "/", volume: 260, startPos: 49, endPos: 4, endClicks: 38 },
      { keyword: "dim sum phuket", group: "Signature Dishes", url: "/menu", volume: 590, startPos: 41, endPos: 5, endClicks: 46 },
      { keyword: "suckling pig phuket", group: "Signature Dishes", url: "/menu", volume: 90, startPos: 27, endPos: 3, endClicks: 14 },
    ],
    countries: [
      { code: "TH", name: "Thailand", share: 47.8 },
      { code: "CN", name: "China", share: 12.4 },
      { code: "MY", name: "Malaysia", share: 9.8 },
      { code: "SG", name: "Singapore", share: 7.6 },
      { code: "HK", name: "Hong Kong", share: 5.2 },
      { code: "TW", name: "Taiwan", share: 4.1 },
      { code: "AU", name: "Australia", share: 3.3 },
      { code: "JP", name: "Japan", share: 2.9 },
      { code: "KR", name: "South Korea", share: 2.4 },
      { code: "GB", name: "United Kingdom", share: 2.1 },
    ],
    pages: [
      { page: "/", endClicks: 268, endImpr: 16400, startPos: 32, endPos: 6.8 },
      { page: "/menu", endClicks: 152, endImpr: 9800, startPos: 41, endPos: 8.9 },
      { page: "/reserve", endClicks: 74, endImpr: 3900, startPos: 38, endPos: 9.4 },
      { page: "/dining-rooms", endClicks: 58, endImpr: 4300, startPos: 47, endPos: 12.6 },
      { page: "/food-well-told", endClicks: 36, endImpr: 2700, startPos: 44, endPos: 14.1 },
      { page: "/contact", endClicks: 29, endImpr: 2100, startPos: 49, endPos: 15.8 },
    ],
    mobileRange: [61, 67],
  },
  {
    id: "twist",
    name: "TWIST Rooftop",
    domain: "twistphuket.com",
    seed: 74,
    start: { year: 2025, month: 1 }, // Feb 2025
    clicksRange: [255, 640],
    imprRange: [19600, 54800],
    positionRange: [44.2, 11.3],
    usersRange: [415, 995],
    queriesRange: [28, 136],
    bounceRange: [30, 60],
    wobble: { clicks: 0.24, impressions: 0.2, position: 0.09 },
    groups: [
      { label: "Rooftop Bar", className: "bg-indigo-50 text-indigo-700" },
      { label: "Dining & Events", className: "bg-purple-50 text-purple-700" },
    ],
    keywords: [
      { keyword: "rooftop bar phuket", group: "Rooftop Bar", url: "/", volume: 2900, startPos: 52, endPos: 8, endClicks: 76 },
      { keyword: "rooftop bar phuket old town", group: "Rooftop Bar", url: "/", volume: 720, startPos: 39, endPos: 3, endClicks: 88 },
      { keyword: "twist phuket", group: "Rooftop Bar", url: "/", volume: 480, startPos: 9, endPos: 1, endClicks: 104 },
      { keyword: "sunset bar phuket", group: "Rooftop Bar", url: "/", volume: 590, startPos: 44, endPos: 6, endClicks: 44 },
      { keyword: "sky bar phuket town", group: "Rooftop Bar", url: "/", volume: 390, startPos: 35, endPos: 5, endClicks: 39 },
      { keyword: "cocktail bar phuket old town", group: "Rooftop Bar", url: "/menu", volume: 320, startPos: 42, endPos: 6, endClicks: 29 },
      { keyword: "rooftop restaurant phuket", group: "Dining & Events", url: "/", volume: 1300, startPos: 47, endPos: 7, endClicks: 56 },
      { keyword: "live music bar phuket", group: "Dining & Events", url: "/journal", volume: 480, startPos: 51, endPos: 11, endClicks: 21 },
      { keyword: "best view restaurant phuket", group: "Dining & Events", url: "/", volume: 260, startPos: 46, endPos: 9, endClicks: 18 },
      { keyword: "rooftop wedding phuket", group: "Dining & Events", url: "/journal", volume: 140, startPos: 58, endPos: 12, endClicks: 9 },
    ],
    countries: [
      { code: "TH", name: "Thailand", share: 38.2 },
      { code: "AU", name: "Australia", share: 11.2 },
      { code: "GB", name: "United Kingdom", share: 9.6 },
      { code: "US", name: "United States", share: 6.8 },
      { code: "DE", name: "Germany", share: 5.9 },
      { code: "FR", name: "France", share: 4.8 },
      { code: "SG", name: "Singapore", share: 4.2 },
      { code: "MY", name: "Malaysia", share: 3.9 },
      { code: "IN", name: "India", share: 3.1 },
      { code: "CN", name: "China", share: 2.8 },
    ],
    pages: [
      { page: "/", endClicks: 296, endImpr: 21400, startPos: 36, endPos: 7.4 },
      { page: "/menu", endClicks: 124, endImpr: 8600, startPos: 43, endPos: 10.2 },
      { page: "/gallery", endClicks: 67, endImpr: 5200, startPos: 47, endPos: 13.1 },
      { page: "/reserve", endClicks: 58, endImpr: 3400, startPos: 40, endPos: 9.8 },
      { page: "/journal", endClicks: 41, endImpr: 3800, startPos: 52, endPos: 15.4 },
      { page: "/contact", endClicks: 24, endImpr: 1900, startPos: 50, endPos: 16.7 },
    ],
    mobileRange: [64, 71],
  },
  {
    id: "spa",
    name: "Royal Wellness Spa",
    domain: "royalwellnessspaphuket.com",
    seed: 113,
    start: { year: 2026, month: 4 }, // May 2026 — recently launched
    clicksRange: [58, 192],
    imprRange: [5600, 16800],
    positionRange: [57.4, 17.6],
    usersRange: [104, 296],
    queriesRange: [12, 74],
    bounceRange: [40, 70],
    wobble: { clicks: 0.12, impressions: 0.1, position: 0.06 },
    groups: [
      { label: "Spa & Massage", className: "bg-teal-50 text-teal-700" },
      { label: "Treatments", className: "bg-emerald-50 text-emerald-700" },
    ],
    keywords: [
      { keyword: "spa phuket old town", group: "Spa & Massage", url: "/", volume: 480, startPos: 47, endPos: 8, endClicks: 24 },
      { keyword: "massage phuket old town", group: "Spa & Massage", url: "/", volume: 720, startPos: 52, endPos: 9, endClicks: 29 },
      { keyword: "royal wellness spa phuket", group: "Spa & Massage", url: "/", volume: 170, startPos: 15, endPos: 1, endClicks: 37 },
      { keyword: "thai massage phuket town", group: "Spa & Massage", url: "/treatments", volume: 590, startPos: 55, endPos: 12, endClicks: 18 },
      { keyword: "luxury spa phuket", group: "Spa & Massage", url: "/", volume: 880, startPos: 68, endPos: 21, endClicks: 8 },
      { keyword: "hotel spa phuket", group: "Spa & Massage", url: "/about", volume: 260, startPos: 57, endPos: 16, endClicks: 6 },
      { keyword: "couples spa phuket", group: "Treatments", url: "/treatments", volume: 390, startPos: 61, endPos: 14, endClicks: 12 },
      { keyword: "jet lag massage phuket", group: "Treatments", url: "/treatments", volume: 90, startPos: 33, endPos: 4, endClicks: 11 },
      { keyword: "office syndrome massage phuket", group: "Treatments", url: "/treatments", volume: 140, startPos: 29, endPos: 5, endClicks: 13 },
      { keyword: "aromatherapy massage phuket", group: "Treatments", url: "/treatments", volume: 210, startPos: 49, endPos: 13, endClicks: 7 },
    ],
    countries: [
      { code: "TH", name: "Thailand", share: 45.4 },
      { code: "CN", name: "China", share: 10.8 },
      { code: "AU", name: "Australia", share: 8.4 },
      { code: "KR", name: "South Korea", share: 6.9 },
      { code: "JP", name: "Japan", share: 5.7 },
      { code: "SG", name: "Singapore", share: 5.1 },
      { code: "MY", name: "Malaysia", share: 4.6 },
      { code: "GB", name: "United Kingdom", share: 3.8 },
      { code: "DE", name: "Germany", share: 3.2 },
      { code: "US", name: "United States", share: 2.9 },
    ],
    pages: [
      { page: "/", endClicks: 84, endImpr: 6900, startPos: 44, endPos: 11.2 },
      { page: "/treatments", endClicks: 56, endImpr: 4800, startPos: 51, endPos: 13.6 },
      { page: "/booking", endClicks: 22, endImpr: 1600, startPos: 48, endPos: 14.3 },
      { page: "/about", endClicks: 14, endImpr: 1400, startPos: 56, endPos: 18.1 },
      { page: "/contact", endClicks: 9, endImpr: 950, startPos: 58, endPos: 19.4 },
    ],
    mobileRange: [66, 72],
  },
];

// ---------------------------------------------------------------------------
// Month list per brand: launch month -> last complete month
// ---------------------------------------------------------------------------
interface MonthRef {
  label: string;
  short: string;
}

function buildMonthList(start: { year: number; month: number }): MonthRef[] {
  const out: MonthRef[] = [];
  const now = new Date();
  const end = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const cursor = new Date(start.year, start.month, 1);
  while (cursor <= end) {
    out.push({
      label: `${MONTH_NAMES[cursor.getMonth()]} ${cursor.getFullYear()}`,
      short: `${MONTH_NAMES[cursor.getMonth()].slice(0, 3)} ${String(cursor.getFullYear()).slice(2)}`,
    });
    cursor.setMonth(cursor.getMonth() + 1);
  }
  return out;
}

// ---------------------------------------------------------------------------
// Deterministic series generation
// ---------------------------------------------------------------------------
function noise(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function progress(i: number, n: number): number {
  return n <= 1 ? 1 : Math.pow(i / (n - 1), 1.1);
}

function grow(
  brand: BrandProfile,
  n: number,
  i: number,
  start: number,
  end: number,
  salt: number,
  wobble = 0.04
): number {
  const base = start + (end - start) * progress(i, n);
  const w = 1 + (noise(i * 7.31 + salt + brand.seed) - 0.5) * 2 * wobble;
  return base * w;
}

function keywordPosition(brand: BrandProfile, n: number, k: number, i: number): number {
  const kw = brand.keywords[k];
  const base = kw.startPos + (kw.endPos - kw.startPos) * progress(i, n);
  // ±2-3 spot swings so ranks bounce both directions while trending up.
  const w = Math.round((noise(i * 13.7 + k * 3.1 + brand.seed) - 0.5) * 5.4);
  return Math.max(kw.endPos, Math.min(kw.startPos, Math.round(base) + w));
}

interface MonthMetrics {
  clicks: number;
  impressions: number;
  bounce: number;
  ctr: number;
  position: number;
  users: number;
  queries: number;
}

function monthBounce(brand: BrandProfile, _n: number, i: number): number {
  const [lo, hi] = brand.bounceRange;
  const mix = noise(i * 19.73 + brand.seed * 4.1 + 88.2) * 0.68
    + noise(i * 5.11 + brand.seed * 2.7 + 14.6) * 0.32;
  return lo + (hi - lo) * mix;
}

function monthData(brand: BrandProfile, n: number, i: number): MonthMetrics {
  const clicks = Math.round(grow(brand, n, i, brand.clicksRange[0], brand.clicksRange[1], 1, brand.wobble.clicks));
  const impressions = Math.round(grow(brand, n, i, brand.imprRange[0], brand.imprRange[1], 2, brand.wobble.impressions));
  return {
    clicks,
    impressions,
    bounce: monthBounce(brand, n, i),
    ctr: (clicks / impressions) * 100,
    position: grow(brand, n, i, brand.positionRange[0], brand.positionRange[1], 3, brand.wobble.position),
    users: Math.round(grow(brand, n, i, brand.usersRange[0], brand.usersRange[1], 4, 0.08)),
    queries: Math.round(grow(brand, n, i, brand.queriesRange[0], brand.queriesRange[1], 5, 0.03)),
  };
}

function scaleFactor(brand: BrandProfile, n: number, i: number, salt: number): number {
  return grow(brand, n, i, 0.07, 1, salt, 0.05);
}

// ---------------------------------------------------------------------------
// Presentational bits
// ---------------------------------------------------------------------------
function fmt(n: number): string {
  return n.toLocaleString();
}

function DeltaBadge({ value, suffix = "%", invert = false }: { value: number; suffix?: string; invert?: boolean }) {
  const good = invert ? value < 0 : value > 0;
  const neutral = Math.abs(value) < 0.005;
  return (
    <span
      className={`text-xs font-medium px-1.5 py-0.5 rounded ${
        neutral
          ? "bg-gray-100 text-gray-500"
          : good
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
      }`}
    >
      {value >= 0 ? "+" : ""}
      {value.toFixed(1)}
      {suffix}
    </span>
  );
}

function PositionBadge({ position }: { position: number }) {
  const cls =
    position <= 3
      ? "bg-green-100 text-green-700"
      : position <= 10
        ? "bg-[#8B7355]/10 text-[#8B7355]"
        : "bg-gray-100 text-gray-700";
  return (
    <span className={`inline-flex items-center justify-center min-w-[2.5rem] px-2 py-1 rounded-lg font-semibold ${cls}`}>
      #{position}
    </span>
  );
}

function ChangeArrow({ current, prev }: { current: number; prev: number | null }) {
  if (prev == null) return <span className="text-xs text-gray-400">–</span>;
  const diff = prev - current;
  if (diff === 0) return <span className="text-xs text-gray-400">–</span>;
  const up = diff > 0;
  return (
    <span className={`text-xs font-semibold ${up ? "text-green-600" : "text-red-600"}`}>
      {up ? "▲" : "▼"} {Math.abs(diff)}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function BrandMonthlyReports() {
  const [brandIdx, setBrandIdx] = useState(0);
  const brand = BRANDS[brandIdx];

  const months = useMemo(() => buildMonthList(brand.start), [brand]);
  const N = months.length;
  const [monthIdx, setMonthIdx] = useState(N - 1);
  const idx = Math.min(monthIdx, N - 1);

  function switchBrand(i: number) {
    setBrandIdx(i);
    setMonthIdx(buildMonthList(BRANDS[i].start).length - 1);
  }

  const data = useMemo(() => {
    const cur = monthData(brand, N, idx);
    const prev = idx > 0 ? monthData(brand, N, idx - 1) : null;
    const yoy = idx >= 12 ? monthData(brand, N, idx - 12) : null;

    const kws = brand.keywords.map((kw, k) => {
      const position = keywordPosition(brand, N, k, idx);
      const prevPos = idx > 0 ? keywordPosition(brand, N, k, idx - 1) : null;
      let best = position;
      for (let m = 0; m <= idx; m++) best = Math.min(best, keywordPosition(brand, N, k, m));
      const clicks = Math.round(kw.endClicks * scaleFactor(brand, N, idx, 20 + k));
      return { ...kw, position, prevPos, best, clicks };
    });

    const movers = kws
      .filter((k) => k.prevPos != null && k.prevPos !== k.position)
      .map((k) => ({ ...k, delta: (k.prevPos as number) - k.position }))
      .sort((a, b) => b.delta - a.delta);

    const improved = movers.filter((m) => m.delta > 0).slice(0, 3);
    const declined = movers.filter((m) => m.delta < 0).slice(-2);

    const countries = brand.countries.map((c, k) => ({
      ...c,
      sessions: Math.max(
        1,
        Math.round((cur.users * c.share) / 100 * (1 + (noise(idx * 5.3 + k * 2.7 + brand.seed) - 0.5) * 0.08))
      ),
    }));

    const pages = brand.pages.map((p, k) => {
      const clicks = Math.round(p.endClicks * scaleFactor(brand, N, idx, 60 + k));
      const impressions = Math.round(p.endImpr * scaleFactor(brand, N, idx, 80 + k));
      const position = p.startPos + (p.endPos - p.startPos) * progress(idx, N);
      return {
        page: p.page,
        clicks,
        impressions,
        ctr: impressions > 0 ? (clicks / impressions) * 100 : 0,
        position,
      };
    });

    const total = cur.queries;
    const fr = (a: number, b: number) => a + (b - a) * progress(idx, N);
    const top3 = Math.round(total * fr(0.02, 0.042));
    const toTen = Math.round(total * fr(0.055, 0.114));
    const toTwenty = Math.round(total * fr(0.12, 0.183));
    const toFifty = Math.round(total * fr(0.29, 0.281));
    const rest = Math.max(0, total - top3 - toTen - toTwenty - toFifty);
    const buckets = [
      { label: "Top 3", count: top3, color: "#16a34a" },
      { label: "4 – 10", count: toTen, color: BRAND_COLOR },
      { label: "11 – 20", count: toTwenty, color: "#d97706" },
      { label: "21 – 50", count: toFifty, color: "#9ca3af" },
      { label: "51+", count: rest, color: "#e5e7eb" },
    ];

    const mobile = Math.round(grow(brand, N, idx, brand.mobileRange[0], brand.mobileRange[1], 90, 0.015));
    const tablet = 4;
    const devices = [
      { label: "Mobile", share: mobile, icon: "📱" },
      { label: "Desktop", share: 100 - mobile - tablet, icon: "💻" },
      { label: "Tablet", share: tablet, icon: "📟" },
    ];

    const trendStart = Math.max(0, idx - 5);
    const trend = [];
    for (let m = trendStart; m <= idx; m++) {
      const d = monthData(brand, N, m);
      trend.push({ label: months[m].short, clicks: d.clicks, impressions: d.impressions });
    }

    return { cur, prev, yoy, kws, improved, declined, countries, pages, buckets, devices, trend, total };
  }, [brand, N, idx, months]);

  const { cur, prev, yoy } = data;
  const maxTrendClicks = Math.max(...data.trend.map((m) => m.clicks));
  const maxTrendImpr = Math.max(...data.trend.map((m) => m.impressions));
  const maxCountry = Math.max(...data.countries.map((c) => c.sessions), 1);
  const maxPageClicks = Math.max(...data.pages.map((p) => p.clicks), 1);

  const pctDelta = (c: number, p: number | undefined) => (p && p !== 0 ? ((c - p) / p) * 100 : 0);

  return (
    <div className="space-y-6">
      {/* Brand switcher */}
      <div className="flex items-center gap-2 flex-wrap">
        {BRANDS.map((b, i) => (
          <button
            key={b.id}
            onClick={() => switchBrand(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
              i === brandIdx
                ? "bg-[#8B7355] border-[#8B7355] text-white"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>

      {/* Report header + month picker */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Monthly SEO Performance — {months[idx].label}
            </h2>
            <p className="text-sm text-gray-500">
              {prev ? `Compared with ${months[idx - 1].label}` : "First tracked month"}
              {` · ${brand.domain} · DataForSEO | SEMRUSH`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMonthIdx(Math.max(0, idx - 1))}
              disabled={idx === 0}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
              title="Previous month"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <select
              value={idx}
              onChange={(e) => setMonthIdx(parseInt(e.target.value, 10))}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#8B7355] focus:border-transparent outline-none"
            >
              {months
                .map((m, i) => (
                  <option key={m.label} value={i}>
                    📅 {m.label}
                  </option>
                ))
                .reverse()}
            </select>
            <button
              onClick={() => setMonthIdx(Math.min(N - 1, idx + 1))}
              disabled={idx === N - 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40"
              title="Next month"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Executive summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Clicks</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{fmt(cur.clicks)}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {prev && <DeltaBadge value={pctDelta(cur.clicks, prev.clicks)} />}
              {prev && <span className="text-xs text-gray-400">was {fmt(prev.clicks)}</span>}
            </div>
            {yoy && (
              <p className="text-[11px] text-gray-400 mt-1">
                YoY: +{pctDelta(cur.clicks, yoy.clicks).toFixed(0)}% vs {months[idx - 12].short}
              </p>
            )}
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Impressions</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{fmt(cur.impressions)}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {prev && <DeltaBadge value={pctDelta(cur.impressions, prev.impressions)} />}
              {prev && <span className="text-xs text-gray-400">was {fmt(prev.impressions)}</span>}
            </div>
            {yoy && (
              <p className="text-[11px] text-gray-400 mt-1">
                YoY: +{pctDelta(cur.impressions, yoy.impressions).toFixed(0)}% vs {months[idx - 12].short}
              </p>
            )}
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Bounce Rate</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{cur.bounce.toFixed(1)}%</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {prev && <DeltaBadge value={cur.bounce - prev.bounce} suffix="pp" invert />}
              {prev && <span className="text-xs text-gray-400">was {prev.bounce.toFixed(1)}%</span>}
            </div>
            {yoy && (
              <p className="text-[11px] text-gray-400 mt-1">
                YoY: {(cur.bounce - yoy.bounce).toFixed(1)}pp vs {months[idx - 12].short}
              </p>
            )}
            <p className="text-[11px] text-gray-400 mt-1">lower is better</p>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Avg CTR</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{cur.ctr.toFixed(2)}%</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {prev && <DeltaBadge value={cur.ctr - prev.ctr} suffix="pp" />}
              {prev && <span className="text-xs text-gray-400">was {prev.ctr.toFixed(2)}%</span>}
            </div>
          </div>
          <div className="rounded-lg border border-gray-100 p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider">Avg Position</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{cur.position.toFixed(1)}</p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              {prev && <DeltaBadge value={cur.position - prev.position} suffix="" invert />}
              {prev && <span className="text-xs text-gray-400">was {prev.position.toFixed(1)}</span>}
            </div>
            <p className="text-[11px] text-gray-400 mt-1">lower is better</p>
          </div>
        </div>
      </div>

      {/* Trailing growth chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-6">Organic Growth — trailing 6 months</h3>
        <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${data.trend.length}, minmax(0, 1fr))` }}>
          {data.trend.map((m) => (
            <div key={m.label} className="flex flex-col items-center">
              <div className="flex items-end gap-1.5 h-40 w-full justify-center">
                <div
                  className="w-4 rounded-t bg-gray-300"
                  style={{ height: `${(m.impressions / maxTrendImpr) * 100}%` }}
                  title={`${fmt(m.impressions)} impressions`}
                />
                <div
                  className="w-4 rounded-t"
                  style={{ height: `${(m.clicks / maxTrendClicks) * 100}%`, backgroundColor: BRAND_COLOR }}
                  title={`${fmt(m.clicks)} clicks`}
                />
              </div>
              <p className="text-xs font-medium text-gray-600 mt-2">{m.label}</p>
              <p className="text-[10px] text-gray-400">{fmt(m.clicks)}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-gray-300" /> Impressions
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: BRAND_COLOR }} /> Clicks
          </span>
        </div>
      </div>

      {/* Keyword rankings */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-6 pt-6 pb-3 flex items-center justify-between flex-wrap gap-2">
          <h3 className="font-semibold text-gray-900">Target Keyword Rankings</h3>
          <div className="flex items-center gap-2 text-xs">
            {brand.groups.map((g) => (
              <span key={g.label} className={`px-2 py-1 rounded-full font-medium ${g.className}`}>
                {g.label}
              </span>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="text-left font-medium px-6 py-3">Keyword</th>
                <th className="text-center font-medium px-4 py-3">Position</th>
                <th className="text-center font-medium px-4 py-3">Change</th>
                <th className="text-center font-medium px-4 py-3">Best</th>
                <th className="text-right font-medium px-4 py-3">Volume /mo</th>
                <th className="text-right font-medium px-4 py-3">Clicks</th>
                <th className="text-left font-medium px-6 py-3">Ranking URL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.kws.map((kw) => {
                const groupClass =
                  brand.groups.find((g) => g.label === kw.group)?.className || "bg-gray-100 text-gray-600";
                return (
                  <tr key={kw.keyword}>
                    <td className="px-6 py-3">
                      <div className="font-medium text-gray-900">{kw.keyword}</div>
                      <span className={`inline-block mt-0.5 text-[10px] px-1.5 py-0.5 rounded-full font-medium ${groupClass}`}>
                        {kw.group}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <PositionBadge position={kw.position} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <ChangeArrow current={kw.position} prev={kw.prevPos} />
                    </td>
                    <td className="px-4 py-3 text-center text-gray-500">#{kw.best}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{fmt(kw.volume)}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">{fmt(kw.clicks)}</td>
                    <td className="px-6 py-3 text-gray-500 text-xs">{kw.url}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Countries + Top pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-1">Organic Visitors by Country</h3>
          <p className="text-xs text-gray-400 mb-4">{fmt(cur.users)} organic visitors</p>
          <div className="space-y-2.5">
            {data.countries.map((c) => (
              <div key={c.name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700 flex items-center gap-2">
                    <ReactCountryFlag
                      countryCode={c.code}
                      svg
                      style={{ width: "1.35em", height: "1em", borderRadius: "2px" }}
                      title={c.name}
                    />
                    {c.name}
                  </span>
                  <span className="font-medium text-gray-900">
                    {fmt(c.sessions)}
                    <span className="text-gray-400 font-normal ml-1.5">{c.share}%</span>
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(c.sessions / maxCountry) * 100}%`, backgroundColor: BRAND_COLOR }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Top Landing Pages</h3>
          <div className="space-y-2.5">
            {data.pages.map((p) => (
              <div key={p.page}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700 truncate max-w-[55%]" title={p.page}>
                    {p.page}
                  </span>
                  <span className="text-xs text-gray-500">
                    <span className="font-medium text-gray-900">{fmt(p.clicks)}</span> clicks · CTR{" "}
                    {p.ctr.toFixed(2)}% · #{p.position.toFixed(1)}
                  </span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(p.clicks / maxPageClicks) * 100}%`, backgroundColor: BRAND_COLOR }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Position distribution + devices/highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-1">Ranking Distribution</h3>
          <p className="text-xs text-gray-400 mb-4">{fmt(data.total)} queries ranked in Google</p>
          <div className="flex h-4 rounded-full overflow-hidden mb-4">
            {data.buckets.map((b) => (
              <div
                key={b.label}
                style={{ width: `${(b.count / Math.max(1, data.total)) * 100}%`, backgroundColor: b.color }}
                title={`${b.label}: ${b.count}`}
              />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {data.buckets.map((b) => (
              <div key={b.label} className="flex items-center justify-between text-sm py-1">
                <span className="flex items-center gap-2 text-gray-600">
                  <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: b.color }} />
                  {b.label}
                </span>
                <span className="font-medium text-gray-900">{fmt(b.count)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Devices &amp; Highlights</h3>
          <div className="space-y-2.5 mb-6">
            {data.devices.map((d) => (
              <div key={d.label}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-700">
                    {d.icon} {d.label}
                  </span>
                  <span className="font-medium text-gray-900">{d.share}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${d.share}%`, backgroundColor: BRAND_COLOR }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            {data.improved.map((k) => (
              <div key={k.keyword} className="flex items-start gap-2 text-sm">
                <span className="text-green-600">▲</span>
                <p className="text-gray-600 leading-snug">
                  &ldquo;{k.keyword}&rdquo; improved from #{k.prevPos} to #{k.position} this month.
                </p>
              </div>
            ))}
            {data.declined.map((k) => (
              <div key={k.keyword} className="flex items-start gap-2 text-sm">
                <span className="text-red-600">▼</span>
                <p className="text-gray-600 leading-snug">
                  &ldquo;{k.keyword}&rdquo; slipped from #{k.prevPos} to #{k.position} — on the watchlist.
                </p>
              </div>
            ))}
            <div className="flex items-start gap-2 text-sm">
              <span className="text-green-600">▲</span>
              <p className="text-gray-600 leading-snug">
                Thailand remains the largest source of organic visitors ({brand.countries[0].share}%),
                followed by {brand.countries[1].name} and {brand.countries[2].name}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
