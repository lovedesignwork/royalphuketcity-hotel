# Royal Phuket City Hotel: website and SEO audit

Audit date: 13 September 2026 (Asia/Bangkok). Repository baseline: `027229a`.
Production reference: https://royalphuketcity.com. Changes verified locally in a Next.js production build.

## Executive findings

The audit found and repaired an admin authentication bypass, public draft exposure,
misleading form success states, timezone and validation bugs, crawler restrictions,
metadata defects, inaccurate structured data, and mobile accessibility issues.
The original four uncommitted monthly SEO reporting files were preserved byte for byte.

At the completion of this audit, the changes were local and had not been pushed or
deployed. Release status should be checked against the subsequent GitHub commit and
hosting deployment. The authentication repair requires deployment to protect the
live installation. Review historical access
logs for unauthorized admin API requests; this audit does not establish whether the
previous vulnerability was exploited.

No defensible audit can establish a “top 1%” search ranking or prove the absence of
all bugs. This report distinguishes verified code behavior from rankings, field
performance, and external services that require follow-up.

## Coverage and evidence

- Initial crawl: 120 live sitemap URLs, including the unapproved Thai mirror.
- Corrected sitemap: 80 unique, indexable URLs: 74 content routes and six published articles.
- Every corrected sitemap URL was checked for HTTP status, canonical, indexability,
  unique document title, description, Open Graph image, and Twitter title.
- Desktop and mobile checks cover home, rooms, dining, facilities, weddings,
  meetings, promotions, guides, blog, downloads, and the guest app.
- Public form submissions use intercepted browser responses and mocked database/mail
  adapters. No test inquiry, spa appointment, payment, or customer email was submitted.
- Authentication tests use mocked users for all request methods; actual server
  verification uses unauthenticated GET requests and discards protected response bodies.
- Dependency audit, production build, TypeScript, lint, and regression suites were run.
- Browser screenshots and measurements accompany this report in the evidence directory.

## Findings and repairs

| Priority | Finding | Implemented repair and verification |
|---|---|---|
| Critical | Admin middleware returned an error while retaining `x-middleware-next`, allowing protected API handlers to continue. | Fresh 401/403 responses retain only session cookies. Anonymous direct admin API requests return 401; mocked non-admin sessions return 403. |
| Critical | `/th/api/…` rewrites bypassed the original admin classification. | Localized API aliases return 404 before rewrites. Localized admin pages redirect to their protected canonical route. |
| High | Public blog `preview=true` bypassed publication checks; public article pages requested previews automatically. | Public readers select published, non-future articles only. Saved previews now require an authenticated admin and are noindexed. |
| High | Dependency scan reported 10 vulnerable packages, including critical severity. | Upgraded Next.js and its ESLint config to 15.5.25 and compatible patches. Patched PostCSS override removes Next.js's vulnerable nested version. Final audit reports zero known vulnerabilities. |
| High | `robots.txt` blocked `/_next/`, preventing crawler access to rendering resources. | JavaScript, CSS, and optimized images are crawlable. APIs remain excluded; private pages expose noindex metadata/headers. |
| High | Sitemap submitted Thai previews and noindexed policies while omitting real landing pages, event pages, and articles. | Sitemap now derives real route keys and published article records, with no preview or policy entries. All 80 URLs pass the crawl checks. |
| High | All sitemap entries falsely claimed a fresh modification time on each generation. | Static lastmod omitted; articles use real valid modification/publication timestamps. Database failure fails regeneration rather than publishing an empty article sitemap. |
| High | Metadata streamed into the body; Lighthouse missed the homepage description. | Metadata now resolves into the initial HTML head for all readers, using Next.js's supported configuration. This can delay the first byte until metadata is ready; blog queries are memoized. |
| High | Contact endpoint could report success with no storage or accepted staff email; mail errors were ignored or caused retry after a successful save. | Success requires a saved inquiry or accepted staff notification. Confirmation email status is explicit; saved submissions remain accepted if notification fails. |
| High | Contact and spa notification HTML interpolated unescaped guest input. | Guest text is escaped at the email rendering boundary and covered by injection regressions. |
| High | Spa endpoint trusted submitted treatment names, prices, duration, and guest count. | Treatment/price/duration/party size derive from the server catalog. Invalid dates, past slots, malformed inputs, and unsupported choices are rejected. |
| High | Declining cookies did not stop persistent visitor tracking or Google Analytics. | Optional tracking starts only after acceptance, stops after revocation, remains disabled on admin routes, and tolerates unavailable browser storage. |
| Medium | Thai guest messages were counted as excessive special characters by spam protection. | Unicode letters, combining marks, and numbers are handled correctly. Thai message regression passes. |
| Medium | Date selection passed local dates through UTC and could shift the booking day; required country/date inputs were hidden controls. | Native date/select controls enforce browser validation. Phuket date helpers keep server/browser minimum dates and spa choices consistent. |
| Medium | Thai phone input retained an extra trunk zero and did not clear after successful submission. | Valid international normalization and controlled resets are verified through the real contact form. |
| Medium | Inquiry forms could claim an email confirmation that had not been sent. | Success messages use the actual response flag; submission details remain visible and the completed form is hidden. Spa requests explicitly await staff confirmation. |
| Medium | Download form overflowed on phones, crashed with blocked storage, unlocked on `success:false`, and retained contact details in localStorage. | Language links wrap, optional storage is guarded, positive success is required, and only a valid access timestamp is stored. Legacy entries are cleaned. |
| Medium | Several titles repeated the hotel brand; downloads inherited the homepage title; social metadata could inherit the homepage's content. | Unique title construction, download route metadata, and final-page social fallback repair all affected pages. |
| Medium | English and Thai canonical/hreflang signals conflicted while translations were still marked unapproved. | Existing translation launch flag is respected. Preview routes are noindexed; approved launch can enable reciprocal language alternatives. |
| Medium | Schema price parsing concatenated prices with nights or treated percentage discounts as cash prices. | Currency-aware parsing retains real prices and omits a price for percentage-only discounts. Unsupported stock claims removed. |
| Medium | Structured data used disconnected business identities, an unavailable search action, unsafe script serialization, and inaccurate image dimensions. | Shared hotel/publisher identity, escaped JSON-LD, corrected business data, removed unsupported search action, and truthful image metadata. |
| Medium | Restaurant pages lacked connected structured data; telephone extensions produced invalid dial links. | Restaurant markup uses the visible venue data and hotel relationship. RFC3966 phone links preserve extensions. Existing room and offer schemas are verified. |
| Medium | SEO landing pages contained hidden keyword blocks, unsupported review/rate claims, thin repetitive explanations, and a broken `/about` link. | All 15 pages now use visible content, practical planning detail, contextual links, matching FAQ/breadcrumb markup, accurate claims, and valid calls to action. |
| Medium | Promotion expiry differed between listing, detail, guest app, and schema. | Shared expiry logic keeps a date-only offer valid through 23:59:59.999 in Phuket. Exact midnight boundaries are tested. |
| Medium | Object prototype names such as `constructor` could crash dynamic SEO/room/guest dining routes. Guest loading boundaries also committed HTTP 200 before not-found results. | Own-property checks reject inherited keys. Guest catalogs restrict dynamic parameters, metadata rejects unknown records, and the shared early loading boundary is removed. Final production HTTP checks return 404 for unknown guest routes and 200 for valid catalog routes. |
| Medium | Local photos bypassed image optimization, and raw Thai image filenames failed the patched optimizer. | Responsive Next.js optimization restored; nine Unicode image references encoded correctly. AVIF with WebP fallback and appropriate hero sizing/compression reduce transfer size while keeping mobile cover images readable. Existing source photos are preserved. |
| Medium | The Michelin guide referenced a missing hero image. | Replaced with an existing hotel restaurant photo. |
| Medium | Keyboard navigation, nested main landmarks, small carousel controls, footer heading order, and accent contrast failed accessibility checks. | Menu focus/Escape behavior, one public main landmark, larger carousel targets, meaningful heading levels, and readable accent text. Hero content remains visible without JavaScript. |
| Low | Blog newsletter form had no service or submission handler; older articles had no pagination. | Replaced the dead signup with current offers. Added crawlable article pagination, direct server reads, and valid article modification dates. |
| Low | Site verification contained a fake token; facility details contradicted the visible pool location/fitness hours. | Optional real verification token only; facility metadata and fitness hours aligned with hotel content. |

## Validation results

Final measurements are recorded in [validation-summary.json](validation-summary.json).

| Check | Result |
|---|---|
| Corrected sitemap crawl | 80/80 HTTP 200, unique titles, descriptions, canonical URLs, indexable pages, one main heading |
| Desktop/mobile browser checks | 47/47 passed; zero page errors |
| Final release checks | 12/12 passed, including guest HTTP status, carousel targets, optimized image formats and admin protection |
| Additional consent/download scenarios | 3 consent and 4 download access scenarios passed |
| Regression runner | 30/30 passed; two entries also execute 8 blog and 17 guest validation checks internally |
| Production build / TypeScript | Passed |
| Lint | Zero errors; 12 existing warnings |
| Dependency audit | Zero known vulnerabilities, reduced from 10 |
| Local image integrity | 901 files checked; zero malformed images |
| Existing local work | All four pre-existing dirty files preserved byte for byte |

Regression entry point: `npm test`. Additional commands: `npm run lint`,
`npm run typecheck`, `npm run build`, and `npm audit`. The
[evidence index](evidence/README.md) links the measurements, logs and screenshots.

The lint command exits successfully with 12 pre-existing warnings, primarily
authenticated admin fetch-effect dependencies and unused variables. They are not
suppressed. Authenticated admin CRUD workflows were not exercised because no admin
session was used for this audit.

The homepage Lighthouse mobile measurements below use different delivery
environments. They must not be interpreted as proven live Core Web Vitals or a
guaranteed ranking increase. Lighthouse SEO is an automated technical checklist;
it does not measure content authority, business reputation or search position.

| Mobile Lighthouse | Initial live site | Local production build |
|---|---:|---:|
| Performance | 76 | 82 |
| Accessibility | 91 | 100 |
| Best practices | 100 | 100 |
| SEO | 83 | 100 |
| Largest contentful paint | 5.5 s | 3.9 s |
| Cumulative layout shift | 0 | 0.026 |
| Total blocking time | 190 ms | 290 ms |

Performance remains below the project's 90+ target. The local run still reports
main-thread work and a small amount of unused JavaScript; it is not a complete
performance pass. The optimized hero transfers approximately 128 KB as AVIF.
The last change concerned guest-route status handling only; its production
behavior was verified separately after the homepage measurement.

## Remaining work outside local validation

1. Deploy the reviewed changes, then repeat the unauthenticated API checks and live crawl.
2. Review access logs for the repaired authentication bypass. This requires deployment/log access and incident context.
3. Recheck live mobile PageSpeed and Search Console Core Web Vitals after deployment and image-cache warmup.
4. Search Console and GA4 service-account credentials were unavailable locally. Verify indexing, submitted sitemap status, queries, conversions, and 28-day field metrics in the real accounts. A missing local HTML verification token does not establish that the property is unverified.
5. Approve the Thai translations before enabling their existing launch flag; then run reciprocal hreflang and localized-content checks.
6. Verify actual hotel inquiry email delivery, spa fulfillment, and the external booking/payment provider using authorized business test procedures. This audit used mocks and did not make bookings or send messages.
7. Review the Google Business Profile, citations, reviews, and backlinks in the owned accounts. No local-pack position or backlink authority score was invented.
8. Maintain a content schedule grounded in real hotel expertise, current event/offer dates, room availability, transport information, and first-hand Phuket guidance. Verify the provenance and permission for the existing guest quotations with the hotel. Avoid reintroducing unsupported ratings, fixed room prices, or hidden keyword text.

## Reference guidance

- [Google: sitemap generation and honest modification dates](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: robots.txt and rendering resources](https://developers.google.com/search/docs/crawling-indexing/robots/intro)
- [Google: localized versions and hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: structured-data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Google: breadcrumb markup](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Google: sitelinks search-box retirement](https://developers.google.com/search/blog/2024/10/sitelinks-search-box)
- [Next.js: initial-head versus streaming metadata](https://nextjs.org/docs/app/api-reference/config/next-config-js/htmlLimitedBots)
- [Hotel contact information](https://royalphuketcity.com/contact) and [facilities](https://royalphuketcity.com/facilities)
