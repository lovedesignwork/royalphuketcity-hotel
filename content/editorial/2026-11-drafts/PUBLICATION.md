# November articles published

Published on 15 November 2026 at approximately 14:40 Asia/Bangkok, following the owner's explicit approval of all four articles and their selected images.

## Live articles

- [Getting Around Phuket Town Without Renting a Car](https://royalphuketcity.com/getting-around-phuket-town-without-car)
- [Breakfast in Phuket Town: What to Check Before Booking Your Stay](https://royalphuketcity.com/breakfast-phuket-town-before-booking)
- [Planning a Hybrid Meeting in Phuket: An AV and Connectivity Checklist](https://royalphuketcity.com/hybrid-meeting-phuket-av-checklist)
- [Choosing a Phuket Wedding Menu: Dietary Needs and Questions for the Caterer](https://royalphuketcity.com/phuket-wedding-menu-dietary-questions)

## Release method

Used the existing hotel's Supabase `blog_posts` table and `blog-images` bucket. The project-local release script invoked the existing upload route handler with the configured hotel service credentials, retained the approved UUIDs when staging, and invoked the existing blog PUT handler to publish. Publication validation ran against the existing CMS articles. No schema, application logic, permissions, schedules or deployment changed.

All 16 approved image originals were verified against the review manifest. The existing uploader applied its standard maximum 1600-pixel WebP conversion. Image aspect ratios were preserved. URLs and image dimensions were mapped into the staged HTML; all article prose, headings, captions, alt text and metadata remained approved. Uploaded image bytes were fetched and hashed before publication.

The original review HTML/JSON and `manifest.json` remain approval snapshots. Their `draft` labels and proposed image paths describe the reviewed state, not the current CMS status. `cms-release.json` captures the mapped payload staged for release. `publication-receipt.json` records actual IDs, publication times, live assets and final status. Do not rerun `build-review.cjs` to infer live state.

Image ownership was appended to the local existing `content/editorial/image-ownership.json`. No application deployment was needed because uploaded images are already served by the existing storage system and the live blog reads the CMS. The local source-to-upload ownership mapping is available for the next normal repository deployment; current live duplicate checking also recognises the upload content hashes.

## Verified results

- All four canonical pages return HTTP 200 and permit indexing.
- All four rendered article bodies match the approved text, with exactly four loaded article images each.
- Titles, descriptions, canonical URLs, Open Graph covers, H1s and Article structured data match the release.
- All four appear in the blog archive, public blog API and XML sitemap.
- The homepage displays the newest three articles using its existing ordering.
- Legacy `/blog/{slug}` URLs return 308 redirects to the correct canonical pages.
- Desktop (1440px) and mobile (375px) browser checks passed for all four pages, with no horizontal page or article-text overflow. Screenshots were inspected.
- The public hotel blog count increased from 31 to 35. All 40 pre-existing CMS records, including other categories and drafts, were verified unchanged.
- All 84 regression tests, type checking and production build passed. Lint completed with zero errors and nine existing warnings in unchanged application files.

Detailed machine-readable results: `live-verification.json`. Screenshot files are named `live-{slug}-{width}.png`.

No new paid SEO research requests were made. Google indexing and ranking changes have not been measured by this publication check.
