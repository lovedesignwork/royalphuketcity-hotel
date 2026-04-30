-- Yan Long integration: extend contact_submissions to support multiple properties
-- Both Royal Phuket City Hotel (rpch) and Yan Long (yanlong) share this table.

-- 1. Source column: which property the submission came from
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'rpch';

-- 2. Metadata column: stores property-specific fields (reservation date, time,
--    guests, occasion, etc.). Kept as JSONB so each property can evolve
--    independently without schema changes.
ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS metadata JSONB;

-- 3. Index on source for the admin filter
CREATE INDEX IF NOT EXISTS idx_contact_submissions_source
  ON contact_submissions(source);

-- 4. Composite index for the Yan Long admin pages (source + type + created_at)
CREATE INDEX IF NOT EXISTS idx_contact_submissions_source_type_created
  ON contact_submissions(source, inquiry_type, created_at DESC);

-- 5. Make sure existing rows are tagged 'rpch'
UPDATE contact_submissions
SET source = 'rpch'
WHERE source IS NULL OR source = '';

-- 6. Allow public (anon) inserts so the Yan Long public site can submit
--    forms without an admin session. RLS is enabled but the insert policy
--    below is permissive for inserts only.
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert contact submissions" ON contact_submissions;
CREATE POLICY "Public can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins (service role) bypass RLS automatically.
-- Authenticated admins reading via the admin dashboard use the service role
-- client server-side, so no SELECT policy is needed for them. If you later
-- move admin reads to the anon client, add a SELECT policy here.
