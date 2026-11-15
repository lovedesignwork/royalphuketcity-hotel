# November 2026 draft review

**Current status:** All four articles were approved and published on 15 November 2026. See [publication results](PUBLICATION.md). The review information below is retained as the original approval record.

Four approved topics have full local drafts. Each article contains exactly four distinct supplied images: one cover and three body photographs. Nothing has been uploaded to public storage, written to the CMS, scheduled, published or deployed.

Open `index.html` for the articles and `image-review.html` for the full image selection sheet. Each article preview embeds its photographs so it can be opened independently. Review labels, word counts and this handoff information are private review material, not article copy.

## Articles

| Article | Words | Intent | Business purpose |
| --- | ---: | --- | --- |
| Getting Around Phuket Town Without Renting a Car | 929 | Practical trip planning | Support town-based stays and room enquiries |
| Breakfast in Phuket Town: What to Check Before Booking Your Stay | 922 | Accommodation comparison | Help guests choose a suitable room rate and contact reservations |
| Planning a Hybrid Meeting in Phuket: An AV and Connectivity Checklist | 891 | Event planning and venue research | Generate better-qualified meeting enquiries |
| Choosing a Phuket Wedding Menu: Dietary Needs and Questions for the Caterer | 907 | Wedding catering research | Support wedding proposals with clear menu requirements |

## Image provenance

Source: the approved [Royal Phuket City November Drive folder](https://drive.google.com/drive/folders/1FuYmxAIRW2BiTnjSOaSJFN3cj5JDOhRR), including its old-town, HOTEL WEBSITE, breakfast, Western Wdding and YL subfolders.

All 16 originals were downloaded directly through the Drive connector. `manifest.json` records each original's Drive ID, filename, parent folder, SHA-256, dimensions, role, alt text and caption. Images were visually inspected. The selected originals have no exact SHA-256 conflicts in the existing hotel or Yan Long ownership registries and no duplicates within this batch. This is an exact source/registry check, not a claim that every historic publication has been reverse-image searched.

The original photographs are unchanged in `images/`. Contact sheets only assemble review thumbnails. No new photographs or illustrations were generated. No visitor-facing production-method labels were added.

## Sources checked on 15 November 2026

- [Hotel rooms and suites](https://royalphuketcity.com/rooms-suites): verified the accommodation destination and hotel address; no rates or availability invented.
- [Hotel dining](https://royalphuketcity.com/dining): verified dining destination; this page does not establish breakfast hours, inclusions or daily dishes. Draft requests confirmation of those details.
- [Hotel meeting and events](https://royalphuketcity.com/meeting-events): verified the enquiry destination. Draft avoids unconfirmed capacities, bandwidth, equipment inclusions and compatibility guarantees.
- [Hotel weddings](https://royalphuketcity.com/wedding-venues): verified the wedding enquiry destination. Dietary handling, tasting availability, certification and charges remain specific questions for the team.
- [Existing airport transport article](https://royalphuketcity.com/phuket-airport-to-phuket-town): linked to keep the new transport article focused on journeys during the stay.
- [Phuket Smart Bus](https://phuketsmartbus.com/): verified current timetable and live tracking links. No fixed fare, operating time, direct route or hotel stop is asserted.
- [Microsoft Teams: joining from a second device](https://support.microsoft.com/en-us/teams/meetings/join-a-microsoft-teams-meeting-on-a-second-device): source for the limited audio/echo explanation, linked in the meeting article. This does not imply the hotel supplies Teams Rooms equipment.
- [Food Standards Scotland: eating out with allergies](https://www.foodstandards.gov.scot/consumer-advice/food-safety/food-allergies/eating-out-with-allergies): practical ingredient and preparation questions, linked in the breakfast and wedding articles. UK legal requirements are not applied to Thailand.

## Verification

- All four drafts pass the existing `validateBlogPublication` function against local article snapshots: 800–1,600 words, metadata, headings, image counts, distinct URLs, alt text and image dimensions.
- All nine unique article links returned HTTP 200 during the final direct check.
- Local preview markup uses the existing `BlogArticle.tsx`, with fixture data, no live mutations, and private review CSS. It is not a production deployment or a full-site visual regression test.
- All six review pages passed browser checks at 1440, 375 and 320 pixels: images loaded, one H1, no horizontal page or text overflow. Desktop and mobile screenshots were inspected.
- `preview-checks.json` records the 18 browser checks. `preview-1440.png` and `preview-375.png` show the breakfast preview.
- Existing application code, routes, database schema, publication logic and public image assets are unchanged. No application build was necessary for these content-only drafts.
- No Serpstat or Local Falcon requests were made for this drafting task; no additional research credits were consumed in those services.

## Approval and existing CMS handoff

The editable HTML and JSON snapshots are in `content/blog`, following the existing project pattern. Each record has a stable UUID, `status: draft`, `published_at: null` and `scheduled_at: null`. The CMS remains the live source of truth; these local snapshots are not yet CMS records.

The JSON image URLs are proposed publication paths. Their files currently reside only in this private review folder. They must be mapped to the real URLs from the existing admin image-upload workflow before a CMS preview or release. Do not publish these snapshots with unresolved image paths.

After the owner approves the exact article text and four images per article:

1. Use the existing admin draft workflow and image uploader, preserving the current storage/publishing system. Its usual WebP conversion is separate from these original-image previews.
2. Map uploaded URLs into cover/body fields, preserve alt text and captions, and register original image ownership plus derivative hashes in the existing ownership registry.
3. Check the authenticated CMS preview and confirm the image treatment still matches the approval. Any material copy/image change needs another review.
4. Publish only with the owner's approval of the final articles and images. Do not create a schedule without instruction.

`manifest.json` captures the reviewed HTML/JSON hashes and image originals. The local `build-review.cjs` regenerates these review files without making network requests, uploads or CMS changes.
