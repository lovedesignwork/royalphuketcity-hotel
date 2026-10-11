# Reviewed blog publication snapshots

The public website reads articles from the existing Supabase CMS. These files retain the reviewed content and unique image assets in Git; committing a snapshot alone does not publish it.

For each article, deploy its assets through the normal GitHub/Vercel release, verify the exact commit, then activate the matching content in the existing CMS. Preserve its UUID and category ID. The optional `blog_categories` object is a local rendering fixture, not a database column. `status: draft` and `published_at: null` describe the reviewed prepublication snapshot; the live CMS records the actual publication timestamp. Do not republish an old article merely to reorder it.

The HTML file is the readable source for the JSON content field. Content and image evidence, provider research, factual review and the twenty-item SEO checklist are retained in the matching Central SEO job. A local CMS fixture can render the snapshot with the actual website template without exposing a draft publicly. It does not establish production indexing or real feedback persistence. Production verification follows CMS activation.
