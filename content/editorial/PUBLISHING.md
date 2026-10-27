# Publishing hotel articles

The blog uses the existing Supabase `blog_posts` and `blog_categories` tables. The ten reviewed articles in `selected-topics.json` retain stable UUIDs and editable HTML/JSON snapshots under `content/blog`. Their snapshot status remains `draft`; the CMS is the source of live publication status.

## Admin workflow

1. Sign in at `/admin/login`, then choose **Blog articles**. Existing session and admin checks protect the editor and its APIs.
2. Choose **New post** and **Write or paste an article manually**, or edit an existing record. Use one headline and H2/H3 body sections. Add an excerpt, descriptive slug, focus keyword, category and unique meta description.
3. Upload a new featured photograph and enter its image description. Use **Add a supporting image** for body images; give each accurate alt text and a useful caption. Move the inserted figure beside the relevant section in the HTML editor. Uploads are oriented, resized to a maximum 1600-pixel edge and compressed to WebP.
4. Save a draft and inspect the authenticated preview. Confirm 800–1,600 words of article prose and 3–5 genuinely different photographs in total. The feature must not repeat in the body. Label generated images as AI-generated editorial illustrations and do not present conceptual scenes as real facilities or services.
5. Publish. The API checks length, image count, dimensions, alt text, repeated images and known ownership conflicts. Publication ordering stays private and is preserved when an existing post is edited. The homepage reads the newest three published posts automatically; the paginated archive retains the rest and the dynamic sitemap reads published records.

## Photo ownership

`image-ownership.json` records article ownership, original source paths and SHA-256 hashes, output hashes, responsive variants, dimensions, and Higgsfield generation IDs. Existing article image URLs were inventoried before this batch. Each of the ten new articles has two distinct brand-library photographs and two distinct generated illustrations. No asset is shared between those articles.

The requested Higgsfield catalog model was `nano_banana_pro` at 2k. Higgsfield job status reports the backend label `nano_banana_2`; both values are retained so the provider's naming is not misrepresented.

A resize, edit, crop or renamed copy retains the original article's ownership. Check the registry and original source before selecting an image. Known URL aliases and upload content hashes are checked automatically; a visually transformed or cropped upload still needs editorial review. Register each future source and its article in this file as part of the editorial process.

## Reviewed batch release

Run local content regressions, lint, typecheck and the production build. Deploy assets and templates through the existing GitHub main-branch/Vercel workflow. Verify the production deployment belongs to `royalphuketcity-hotel`, the intended team and the exact commit, and wait for READY before CMS activation.

With the existing hotel credentials loaded locally (never committed or logged):

- `node --env-file=.env.local scripts/publish-editorial-batch.cjs` checks identities and assets without changing records.
- Add `--stage` to save the ten reviewed records as drafts. The script refuses to downgrade a published record.
- Add `--publish` only after asset deployment is READY. Every live asset variant is fetched and compared with its reviewed hash before all ten records are activated in one upsert. Existing publication timestamps are preserved on repeat runs.

Verify each live canonical article, the latest-three homepage section, all archive pages, sitemap inclusion, public date removal and draft exclusion after activation. Test booking links and public forms without sending test inquiries or reservations.

## Editorial source review

Local travel background: Tourism Authority of Thailand's Old Town and historic-streets pages. Transport: Airport Bus Phuket's official timetable and FAQ; the timetable and older FAQ can differ, so the article directs readers to confirm live operating details and deliberately avoids fixed fares or guaranteed journey times. Hotel facilities, dining, meeting and ceremony facts use the hotel's own current pages. Cultural ceremony details are described as family-dependent choices. No other hotel is recommended or named.
