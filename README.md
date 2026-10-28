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

Required for admin sign-in and Supabase-backed functionality:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Public anon key for admin sign-in and session middleware
- `SUPABASE_SERVICE_ROLE_KEY` - Server-only Supabase service role key; never prefix it with `NEXT_PUBLIC_`

Optional for contact email delivery:
- `RESEND_API_KEY` - Resend API key

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

### Brand Google Analytics reports

`/admin/analytics` reads GA4 through the authenticated `/api/admin/analytics`
endpoint. Each request checks the user's `admin_users` membership. Reports use
server-configured property IDs and the Analytics Data API's read-only scope;
credentials never reach the browser. The Overview page still uses the hotel's
existing first-party visitor tracking and can differ from GA4.

Set `GA4_HOTEL_PROPERTY_ID`, `GA4_YANLONG_PROPERTY_ID`, `GA4_TWIST_PROPERTY_ID`
and `GA4_SPA_PROPERTY_ID` to the numeric IDs in Google Analytics Admin.
`GA4_PROPERTY_ID` remains a fallback for the hotel and is used by SEO reports.
The measurement ID (`G-…`) is only for website tracking, not report access.
Enable the Google Analytics Data API in the credential's Google Cloud project
and grant the reporting service account **Viewer** access on each property.
See [Google's Data API setup guide](https://developers.google.com/analytics/devguides/reporting/data/v1/quickstart).

For local development, put the downloaded service-account JSON in `.secrets/`
(Git-ignored) and set `GOOGLE_APPLICATION_CREDENTIALS` to its absolute path in
`.env.local`. For hosting, set `GA4_SERVICE_ACCOUNT_EMAIL` and `GA4_PRIVATE_KEY`
as server-only secrets. Literal `\n` in the private key is supported. The existing
`GOOGLE_SERVICE_ACCOUNT_EMAIL` / `GOOGLE_PRIVATE_KEY` pair is a fallback when no
dedicated pair is set. Never commit or expose credentials with `NEXT_PUBLIC_`.

The page reports the last 7, 30 or 90 complete days in each property's time zone.
Successful reports are cached for 60 seconds, separately by brand, property and
period. Connection failures are explicit and never replaced with local visitor
counts or fake zeros. Key events reflect GA configuration, not confirmed bookings;
fact-sheet page views are distinct from download events. GA privacy, sampling and
processing rules may affect totals. A property without existing tracking cannot
provide historical data merely by connecting this dashboard.

Verified brand properties (29 October 2026):

| Brand | GA4 property ID |
| --- | --- |
| Royal Phuket City | 491565977 |
| Yan Long | 480341437 |
| TWIST | 480338245 |
| Royal Wellness Spa | 561121561 |

Royal Wellness Spa tracking was first installed on 29 October 2026 using web
stream `G-0D0P2PE6KK`. Earlier periods will legitimately be empty. The website
records consented public page views; reporting credentials stay in this hotel's
server environment.

### TWIST shared inbox

The admin sidebar includes `/admin/twist/reservations` and `/admin/twist/inquiries`.
Both read `public.twist_inquiries` in the hotel Supabase project. Reservations use
`form_type = 'reservation'`; other form types appear under Inquiries. Admins can
search, filter, paginate, and update status or internal notes. Status changes do
not send email. The API verifies the authenticated user's `admin_users` membership
before using server credentials and returns failures explicitly.

The TWIST website must deploy its shared-inbox form integration for new requests
to appear. Configure its server-only `INBOX_SUPABASE_URL` and
`INBOX_SUPABASE_SERVICE_ROLE_KEY` for project `crhzxvbubvyachauomlx` (or its matching
blog CMS credentials). No credentials are needed in the browser. Existing
email-only contact messages are not automatically backfilled.

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
