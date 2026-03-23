# Royal Phuket City Hotel Website

A modern, elegant hotel website built with Next.js, featuring a luxury minimalistic design.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Language:** TypeScript (strict mode)
- **Animations:** Framer Motion
- **Database:** Supabase (optional, for contact form)
- **Email:** Resend (optional, for contact form)
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18.17 or later
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
| `/good-eatz-154` | Good Eatz 154 |
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
- JSON-LD structured data (Hotel, LocalBusiness)
- Auto-generated `sitemap.xml` and `robots.txt`
- Semantic HTML throughout

## Performance

- Lighthouse target: 90+ across all categories
- Server Components by default
- Optimized images with `next/image`
- Lazy loading for below-fold content
- Font optimization with `next/font`

## License

© 2025 Royal Phuket City Hotel. All Rights Reserved.
