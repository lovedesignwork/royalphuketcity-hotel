# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Royal Phuket City Mobile
**Generated:** 2026-08-28 20:24:31
**Category:** Hotel/Hospitality
**Design Dials:** Variance 6/10 (Balanced / Modern) | Motion 5/10 (Standard) | Density 6/10 (Standard)

**Brand lock:** UI UX Pro Max suggested navy + Playfair Display SC. Those were rejected. This app keeps the hotel identity: gold `#8B7355`, Marcellus headings, Inter body, existing photography. Glass is used only on app chrome (header + tab bar) as a web approximation, not official Apple Liquid Glass.

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Ink | `#1A1A1A` | `--m-ink` |
| Gold / Accent | `#8B7355` | `--m-gold` |
| Gold hover | `#634F35` | `--m-gold-hover` |
| On gold | `#FFFFFF` | `--m-on-gold` |
| Surface | `#F7F4EF` | `--m-surface` |
| Card | `#FFFFFF` | `--m-card` |
| Muted text | `#5C574E` | `--m-muted` |
| Border | `#E8E5E0` | `--m-border` |
| Glass | `rgba(255,255,255,0.72)` | `--m-glass` |
| Destructive | `#B42318` | `--m-destructive` |

One accent only. No navy, no AI purple, no cream+terracotta swap.

### Typography

- **Heading Font:** Marcellus (existing brand). Not Playfair Display SC, Fraunces, or Instrument Serif.
- **Body Font:** Inter (existing brand)
- **Thai:** Noto Sans Thai
- Load via `next/font` only.

### Spacing Variables

*Density: 6/10 — Standard app rhythm (8dp)*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` | Tight gaps |
| `--space-sm` | `8px` | Icon gaps |
| `--space-md` | `16px` | Standard padding |
| `--space-lg` | `24px` | Section padding |
| `--space-xl` | `32px` | Large gaps |
| `--space-2xl` | `48px` | Section margins |

### Shape

- Cards: 16px
- Buttons: pill (`999px`)
- Tab bar: 24px top radius
- One radius system. Do not mix sharp and soft.

### Icons

Phosphor only. Outline idle, fill active. 24px glyph, 44x44 hit area. No emoji icons.

---

## App chrome

Signature: full-bleed photo stack + frosted bottom bar with a raised Book pill.

- Header and tab bar use web glass (`backdrop-filter` + inner highlight). Provide solid fallback under `prefers-reduced-transparency`.
- Safe areas: `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`.
- Content inset above tab bar: `calc(72px + env(safe-area-inset-bottom))`.
- Never use `h-screen`. Use `min-h-[100dvh]`.
- On tablet/desktop: center a 430px app column over a dimmed hotel photo.

### Bottom nav (max 5)

Home · Rooms · Book (external MyXcaliber) · Dining · More

---

## Motion

Stagger list 300-450ms. Honor `prefers-reduced-motion`. Animate transform and opacity only. Tap feedback `scale(0.98)` without layout shift.

---

## Copy

Sentence case. No em-dash characters. Active voice. Empty and error states say what to do.

---

## Anti-Patterns (Do NOT Use)

- Navy-blue luxury palette
- Playfair Display SC / Fraunces / Instrument Serif
- Emoji as icons
- Desktop Header/Footer on the mobile host
- Duplicate-content indexing on `m.` (noindex + canonical to desktop)
- Complex in-app booking (Book opens MyXcaliber)
- `h-screen` heroes
- More than 5 tab items
