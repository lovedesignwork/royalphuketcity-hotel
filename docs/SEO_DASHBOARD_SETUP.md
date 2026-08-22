# SEO Rankings Dashboard — Setup

The **SEO Rankings** admin page (`/admin/seo`) shows:

- **Keyword Rankings** — live Google position per keyword (via SerpApi), best rank, 7-day / 30-day change, and a trend sparkline.
- **Search Console** — clicks, impressions, CTR, average position, top queries and pages, and a daily impressions chart (via the Google Search Console API).
- **Monthly Report** — month-over-month growth and a 6-month trend, plus an automated monthly email.

Everything works with graceful degradation: the page loads even before the integrations are configured, and simply shows a banner telling you what's missing.

---

## 1. Google Search Console API (clicks / impressions / position)

Your property is already verified in Search Console, so you only need a service account that can read it.

1. Go to the [Google Cloud Console](https://console.cloud.google.com/) and create (or pick) a project.
2. **APIs & Services -> Library** -> enable **Google Search Console API**.
3. **APIs & Services -> Credentials -> Create credentials -> Service account**. Name it e.g. `seo-bot`. No roles needed.
4. Open the new service account -> **Keys -> Add key -> Create new key -> JSON**. A JSON file downloads. It contains `client_email` and `private_key`.
5. In [Search Console](https://search.google.com/search-console) -> your property -> **Settings -> Users and permissions -> Add user**. Paste the service account's `client_email` and give it **Full** (or Restricted) access.
6. Set these environment variables (locally in `.env.local` and on Vercel):

   ```
   GOOGLE_SERVICE_ACCOUNT_EMAIL = <client_email from the JSON>
   GOOGLE_PRIVATE_KEY           = <private_key from the JSON, quoted, with \n kept literal>
   GSC_SITE_URL                 = https://royalphuketcity.com/     (or sc-domain:royalphuketcity.com)
   ```

   `GSC_SITE_URL` must match the property exactly as it appears in Search Console. Domain properties use the `sc-domain:` prefix.

> Note on `GOOGLE_PRIVATE_KEY`: the JSON key has real newlines. When storing in a single-line env var, replace them with the literal characters `\n` (backslash + n) and wrap the whole value in double quotes. The code converts `\n` back to newlines at runtime.

---

## 2. SerpApi (exact live Google rank per keyword)

1. Sign up at [serpapi.com](https://serpapi.com/) (free tier = 100 searches/month; paid plans start ~$75/mo for 5,000).
2. Copy your API key from the dashboard.
3. Set:

   ```
   SERPAPI_KEY = <your key>
   ```

Rank checks are localized to Thailand by default (`google.co.th`, `gl=th`). Each active keyword uses one search per daily sync, so ~20 keywords ≈ 600 searches/month.

To swap providers later (e.g. DataForSEO), edit only [`src/lib/seo/serp.ts`](../src/lib/seo/serp.ts) — nothing else touches the SERP provider.

---

## 3. Cron protection + monthly report recipients

```
CRON_SECRET     = <a long random string>
SEO_REPORT_EMAIL = marketing@royalphuketcity.com     (comma-separated for multiple)
```

- `CRON_SECRET` — Vercel Cron automatically sends this as a Bearer token, so the cron endpoints reject anyone else. If unset, the endpoints allow all callers (fine for local dev).
- `SEO_REPORT_EMAIL` — who receives the monthly report email. Falls back to `marketing@royalphuketcity.com`. Email sending reuses the existing `RESEND_API_KEY`.

---

## 4. Scheduled jobs (already configured in `vercel.json`)

| Job | Schedule (UTC) | Endpoint | What it does |
|-----|----------------|----------|--------------|
| Daily sync | `0 2 * * *` (2 AM) | `/api/cron/seo-sync` | Imports recent Search Console data + checks each keyword's live Google rank |
| Monthly report | `0 6 1 * *` (1st, 6 AM) | `/api/cron/seo-report` | Emails last month vs the previous month via Resend |

These deploy automatically with the project on Vercel. (Vercel Hobby allows daily crons; Pro is needed for more frequent schedules.)

---

## 5. First run

1. Deploy with the env vars above set.
2. Open `/admin/seo` and add your keywords (e.g. `hotel phuket old town`, `royal phuket city hotel`).
3. Press **Sync now** in the header to fetch the first live ranks.
4. In the **Monthly Report** tab, press **Backfill 90 days of history** once to import the last 90 days of Search Console data so the charts aren't empty.

You can trigger a sync manually any time with **Sync now**, or send yourself the monthly email with **Email report now** in the Monthly Report tab.

---

## Files

| Area | Path |
|------|------|
| Search Console client | `src/lib/seo/gsc.ts` |
| SERP rank checker | `src/lib/seo/serp.ts` |
| Sync routine (shared) | `src/lib/seo/sync.ts` |
| Stats aggregation | `src/lib/seo/stats.ts` |
| Monthly report builder | `src/lib/seo/report.ts` |
| Cron auth helper | `src/lib/seo/cron-auth.ts` |
| Daily cron | `src/app/api/cron/seo-sync/route.ts` |
| Monthly cron | `src/app/api/cron/seo-report/route.ts` |
| Keyword CRUD | `src/app/api/admin/seo/keywords/route.ts` |
| Manual sync | `src/app/api/admin/seo/sync/route.ts` |
| Dashboard stats | `src/app/api/admin/seo/stats/route.ts` |
| On-demand report | `src/app/api/admin/seo/report/route.ts` |
| Dashboard page | `src/app/admin/seo/page.tsx` |
| DB migration | `supabase/migrations/20260822_create_seo_tables.sql` |
