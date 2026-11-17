# Royal Phuket City Hotel: target keyword audit

Reviewed 17 November 2026 (Asia/Bangkok). Website: https://royalphuketcity.com/.
This records a live crawl, existing Local Falcon scans, Serpstat research and local source changes. Changes have not been published. Rankings have not improved merely because these changes are prepared.

## Keyword ownership

| Target | Primary page | Purpose |
| --- | --- | --- |
| Hotel in Phuket Town | `/phuket-old-town-hotel` | Main accommodation landing page |
| Phuket Town Hotel | `/phuket-old-town-hotel` | Same intent; strengthen the existing page |
| Best Hotel in Phuket Town | `/best-hotel-phuket-town` | Help guests compare location, room sizes, facilities and booking terms |
| Wedding in Phuket | `/wedding-venues` | Wedding planning and ceremony options |
| Wedding Venue Phuket | `/wedding-venues` | Venue enquiry and accommodation |
| Phuket Meeting Venue | `/meeting-events` | Meeting spaces, layouts, capacities and enquiries |

The supplied phrase “Phuket Meeting Vernue” is treated as a spelling error. Use the correct word in public copy. Keep the homepage focused on the hotel brand and link to the accommodation page. Do not create six overlapping keyword pages or move existing URLs without Search Console evidence.

## Findings and evidence

### Local Falcon: Maps visibility is weak

Accessed the owner's existing signed-in Chrome session. No new scans, credit purchases, campaigns or profile changes were made. These are historical scans, not measurements taken after the source changes.

| Query | Scan date shown by Local Falcon | Grid | ARP | ATRP | SoLV |
| --- | --- | --- | --- | --- | --- |
| hotel in phuket town | 16 Nov 2026, 7:54 AM | 5×5, 2 km radius | 20.00 | 20.96 | 0% |
| hotel phuket town | 15 Nov 2026, 2:21 AM | 5×5, 2 km radius | 10.00 | 19.68 | 4% |
| meeting room phuket | 15 Nov 2026, 2:22 AM | 5×5, 2 km radius | 10.82 | 12.04 | 4% |

The scan timezone was not independently confirmed. The hotel scan centre is 7.8829425, 98.3949019, with 1 km between map pins. For “hotel in phuket town”, Royal Phuket City appears at just 1 of 25 points, at rank 20. ARP 20 therefore does not mean rank 20 everywhere. The report shows 4.3 stars and 2,712 reviews. Mai Morn Resort has 84% SoLV and Ratri Hotel Phuket Old Town 80% in that same scan. Review count alone is not explaining visibility.

Reports: [hotel in phuket town](https://app.localfalcon.com/reports/view/ee37a6b4baa1524), [hotel phuket town](https://app.localfalcon.com/reports/view/9adb70ceece77c9), [meeting room phuket](https://app.localfalcon.com/reports/view/7cc876d4cdfbff4).

Local Falcon's AI analysis flags a missing Business Profile description and no active posts. Those are tool-generated leads, not independently verified Business Profile facts. Its claims about AI Overviews replacing the local pack and competitors being easy to overtake are not accepted as conclusions. Hotel searches can show different result formats; a Maps grid does not measure all hotel-search or organic visibility.

### Screaming Frog: improve relevance, preserve technical foundations

Completed crawl ID `2cb1a6a8-8c11-4daf-a7cb-3f84aff8f217`: 199 URLs, with crawl and post-crawl analysis finished. Used standard HTML crawling, robots respected, sitemap discovery, maximum three requests/second and a 650-URL cap that was not reached. Images, CSS, JavaScript and external-link crawling were disabled. This is not a Core Web Vitals, rendered mobile, image or backlink audit.

The full response export contains 198 HTTP 200 responses and one HTTP 301, with no 4xx, 5xx or no-response records. The HTML export contains 118 URLs, 112 indexable. No indexable HTML page was missing a title, description, H1 or canonical, and there were no duplicate titles among those pages. All four primary target URLs return 200, are indexable and self-canonical. The original Screaming Frog configuration was restored after exporting results.

| Page | Live issue | Local change |
| --- | --- | --- |
| `/phuket-old-town-hotel` | Already titled “Hotel in Phuket Town”; 117 unique inlinks | Preserve URL and intent; add contextual link to comparison guide |
| `/best-hotel-phuket-town` | Only 3 unique inlinks; 397 crawler-counted words | Clear search-aligned title/H1, useful room/location comparison sections, contextual and site-wide links |
| `/wedding-venues` | Title “Wedding Venues”; generic H1 without Phuket | Location-specific title/H1/intro and planning-focused description |
| `/meeting-events` | Title “Meeting & Events”; generic H1 without Phuket | Phuket meeting venue title/H1/intro; preserve room and capacity information |

The production accommodation H1 differs from the local source snapshot. Do not claim source changes are live. Crawl exports are in `evidence/screaming-frog-*.ndjson`; summary is `evidence/crawl-summary.json`.

### Serpstat: separate databases and estimates

The Thailand domain query returned 93 ranking records in its dataset; the 40-record sample is dominated by brand terms. “meeting room phuket” is recorded at position 19 for `/meeting-events`. “royal phuket city” is recorded at position 2. Some results still reference older www URLs, so this is not a live or exhaustive ranking test.

Thailand exact-target metrics and the exact-target domain query returned “Data not found”. This does not establish zero demand or prove the hotel is outside the top 100. US database estimates below are supplemental international-demand signals, not Thai search volumes:

| Query | US estimated monthly searches | SEO difficulty |
| --- | --- | --- |
| hotel in phuket town | 210 | 28 |
| phuket town hotel | 210 | 24 |
| best hotel in phuket town | 10 | 19 |
| wedding in phuket | 210 | 16 |
| wedding venue phuket | 170 | 15 |
| phuket meeting venue | Not returned | Unknown |

Do not sum close variants as distinct audiences. In the sampled US SERP, hotel queries face booking/comparison platforms; “wedding in phuket” includes wedding planners, destination guides and resort wedding pages. Organic competitors differ from the Maps competitors. Research responses are retained in `evidence/serpstat.json`. Two concurrent SERP requests were rate-limited; no competitor findings are inferred from those failures.

### Search Console access needs repair

The local environment contains the expected variable names, but the saved private key is not a usable PEM key. The read-only API query failed during key decoding. Screaming Frog also has no stored Search Console credentials. No Search Console query data, indexing confirmation, click baseline or improvement claim is available from this run. No credentials were changed or logged.

## Next work, in priority order

1. Review and release the prepared page changes through the normal GitHub/Vercel workflow. Match the resulting production deployment to the exact commit and wait for its terminal status. Then verify live titles, H1s, canonicals, enquiry links and sitemap eligibility. No deployment was triggered in this audit.
2. In the actual Google Business Profile, verify the description, primary category, existing additional categories, website URL, phone, map pin and hotel amenities. Keep the real business name. Add wedding/conference categories only if they accurately describe eligible on-site services. Check hotel-specific feature availability before using generic Business Profile advice.
3. If the description is actually missing, use a factual description such as the draft below. Review before publishing. Do not expect a description or posts alone to deliver a ranking increase.
4. Restore Search Console access using a valid existing service-account key or an authorised browser session. Check the actual property, indexing and selected canonicals for the four target pages. Compare consecutive 28-day windows, ending at least three days before retrieval; inspect query/page pairs and country/device splits before changing page ownership.
5. Establish the missing exact-keyword Local Falcon baselines using the six correctly spelled targets in `keyword-map.csv`. Keep the same business, platform, centre, radius, grid and language settings for comparisons. Preserve the existing near-variant scans separately. Start with Phuket Town; use a distinct wider grid if island-wide venue reach is needed. Do not mix those results into one trend. No recurring scans or automation were created.
6. Add verified commercial proof to existing venue pages: dated package details, inclusions/exclusions, actual layout capacities, venue photographs, permitted real-event case studies and a clear proposal process. Existing generic guides already cover many topics; strengthen them before commissioning more articles. Obtain owner approval for exact new article revisions and photos under the established editorial policy.
7. Check consistency of existing hotel listings and pursue relevant mentions from real event partners and local organisations. Request honest reviews from guests consistently, without incentives, review gating or asking for keyword-filled reviews. Do not buy links or fabricate reviews.

## Measurement and review

Review Maps SoLV, found-in-grid coverage and ATRP together. The first practical milestone is moving the existing 0% exact hotel-query SoLV above baseline and sustaining coverage across repeated equivalent scans, not a promise of a particular position. For organic search, measure nonbrand impressions, clicks, query/page alignment and qualified wedding/meeting enquiries or direct booking actions. Separate branded from nonbrand results and annotate the actual release date.

Use the first 28 days after release to check indexing, query alignment and early movement; use 60–90 days to assess direction and refine the plan. These are review intervals, not ranking guarantees. A technical fix or sitemap entry proves neither indexing nor ranking.

## Business Profile description draft

Royal Phuket City Hotel is located on Phang-Nga Road in Phuket Town, near the Old Town heritage streets. The hotel offers 251 rooms and suites, an outdoor swimming pool, a fitness centre and dining options including Yan Long and TWIST Rooftop Restaurant & Bar. Plan a city stay, wedding celebration, meeting or conference with accommodation and catering at one hotel. Contact the hotel team for room availability, venue layouts and event proposals.

## Guidance used

- [Google: local ranking](https://support.google.com/business/answer/7091): relevance, distance and prominence; no payment or request guarantees better placement.
- [Google: helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content): descriptive headings, useful original information and support for factual claims.
- [Google: spam policies](https://developers.google.com/search/docs/essentials/spam-policies): avoid substantially similar doorway pages and manipulative link practices.

## Validation

Typecheck and the nine existing technical SEO regressions passed. Lint completed with zero errors and nine existing warnings in unchanged files. The initial production build compiled but its worker exhausted the default Node heap. The retry passed with `NODE_OPTIONS=--max-old-space-size=4096 npm run build`. Results are recorded in `evidence/validation.json`. Existing unrelated changes in `content/editorial/PUBLISHING.md` were preserved.
