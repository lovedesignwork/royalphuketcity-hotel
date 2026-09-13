# Royal Phuket City Hotel Website

A modern, elegant hotel website built with Next.js, featuring a luxury minimalistic design.

## Tech Stack

- **Framework:** Next.js 15.5 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript (strict mode)
- **Animations:** Framer Motion
- **Database:** Supabase (optional, for contact form)
- **Email:** Resend (optional, for contact form)
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 22 or later (audit validation used Node.js 24)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required for contact form functionality:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `RESEND_API_KEY` - Resend API key for email delivery

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── rooms-suites/      # Rooms listing
│   ├── room/[slug]/       # Individual room pages
│   ├── dining/            # Dining page
│   ├── facilities/        # Facilities page
│   ├── wedding-venues/    # Wedding venues
│   ├── meeting-events/    # MICE facilities
│   ├── about/             # About page
│   ├── contact/           # Contact page with form
│   └── api/               # API routes
├── components/            # React components
│   ├── Header.tsx         # Site header
│   ├── Footer.tsx         # Site footer
│   ├── HeroSection.tsx    # Hero banner
│   └── ...
└── lib/                   # Utilities and constants
    ├── constants.ts       # Site configuration
    ├── fonts.ts           # Font configuration
    └── ...
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page |
| `/rooms-suites` | Rooms & Suites listing |
| `/room/[slug]` | Individual room pages |
| `/dining` | Dining overview |
| `/yan-long-chinese-restaurant` | Yan Long restaurant |
| `/twist-rooftop-restaurant-bar` | TWIST rooftop |
| `/facilities` | Hotel facilities |
| `/wedding-venues` | Wedding venues |
| `/meeting-events` | Meeting & Events |
| `/about` | About the hotel |
| `/royal-green` | Sustainability initiatives |
| `/our-clients` | Corporate partners |
| `/artist-story` | Art collection |
| `/contact` | Contact information & form |
| `/sustainability` | Green initiatives |
| `/hotel-policy` | Hotel policies |
| `/privacy-policy` | Privacy policy |
| `/cookie-policy` | Cookie policy |

## Design System

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#FFFFFF` | Primary background |
| `--color-surface` | `#FAFAFA` | Alternate sections |
| `--color-border` | `#E8E5E0` | Hairline dividers |
| `--color-text-primary` | `#1A1A1A` | Headlines, body |
| `--color-text-secondary` | `#6B6B6B` | Subtitles, captions |
| `--color-accent` | `#8B7355` | Gold/bronze accent |
| `--color-accent-hover` | `#705C42` | Hover state |

### Typography

- **Headlines:** Cormorant Garamond (serif)
- **Body:** Inter (sans-serif)
- **Labels:** Letter-spaced uppercase

## Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## SEO

- Unique `<title>` and `<meta description>` per page
- Open Graph tags for social sharing
- JSON-LD structured data for the hotel, rooms, restaurants, offers, articles, and breadcrumbs
- Auto-generated `sitemap.xml` and `robots.txt`
- Semantic HTML throughout

Public metadata is included in the initial HTML head. The sitemap includes published
articles and real content routes; it excludes private pages, noindexed policies, and
Thai previews. Thai indexing and reciprocal language alternatives follow
`SHOW_LANGUAGE_SWITCHER` in `src/lib/i18n/config.ts`, which stays off until the
translations are approved. Set `GOOGLE_SITE_VERIFICATION` only to a real Search
Console HTML verification token, if that verification method is used.

Blog pages read published articles directly from the server database. Saved draft
previews require an authenticated admin at `/admin/blog/[id]/preview`. Public
`?preview=true` URLs do not grant access to drafts.

## Validation

```bash
npm run lint
npm test
npm run typecheck
npm run build
```

The regression suites mock database and email services. They cover admin route
authorization, article visibility and pagination, sitemap metadata, structured
data, guest submission failures, and Phuket date boundaries. They never send live
inquiries, payments, or email. Browser audit results and remaining deployment checks
are recorded in `docs/audits/2026-09-13/FULL-AUDIT-REPORT.md`.

Next.js is kept on the patched 15.5 maintenance line. The PostCSS override uses the
patched project version for Next.js as well; verify `npm audit` before removing it.

## Performance

- Lighthouse target: 90+ across all categories
- Server Components by default
- Optimized images with `next/image`
- Lazy loading for below-fold content
- Font optimization with `next/font`

## License

© 2025 Royal Phuket City Hotel. All Rights Reserved.
