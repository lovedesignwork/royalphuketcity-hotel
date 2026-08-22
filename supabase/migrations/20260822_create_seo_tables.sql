-- SEO rank tracking + Google Search Console history for the /admin/seo dashboard.
--
-- Three tables:
--   seo_keywords      Keywords the marketing team wants to rank-track. Each row
--                     is a query + the URL we hope ranks for it.
--   seo_rank_history  One row per keyword per day, storing the live Google
--                     position found by the SERP provider (SerpApi). position
--                     is NULL when the site was not found in the top 100.
--   seo_gsc_daily     A daily snapshot of Google Search Console performance
--                     (clicks / impressions / ctr / position) broken down by
--                     query + page. Stored locally so history survives GSC's
--                     ~16-month window and monthly reports are fast.
--
-- Everything is written by our service-role API routes / cron jobs, so RLS
-- only needs to grant the service_role. No public/authenticated access.

-- ---------------------------------------------------------------------------
-- seo_keywords
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.seo_keywords (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword     TEXT NOT NULL,
    target_url  TEXT,
    location    TEXT NOT NULL DEFAULT 'Thailand',
    active      BOOLEAN NOT NULL DEFAULT TRUE,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- A keyword is unique per location (same phrase can be tracked for TH + US).
CREATE UNIQUE INDEX IF NOT EXISTS idx_seo_keywords_keyword_location
    ON public.seo_keywords (LOWER(keyword), location);
CREATE INDEX IF NOT EXISTS idx_seo_keywords_active
    ON public.seo_keywords (active);

CREATE OR REPLACE FUNCTION public.seo_keywords_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_seo_keywords_set_updated_at ON public.seo_keywords;
CREATE TRIGGER trg_seo_keywords_set_updated_at
    BEFORE UPDATE ON public.seo_keywords
    FOR EACH ROW EXECUTE FUNCTION public.seo_keywords_set_updated_at();

-- ---------------------------------------------------------------------------
-- seo_rank_history
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.seo_rank_history (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    keyword_id    UUID NOT NULL REFERENCES public.seo_keywords(id) ON DELETE CASCADE,
    checked_date  DATE NOT NULL DEFAULT CURRENT_DATE,
    position      INTEGER,          -- NULL = not found in top 100
    found_url     TEXT,             -- the URL Google actually ranked, if found
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- One measurement per keyword per day; re-running the sync upserts.
CREATE UNIQUE INDEX IF NOT EXISTS idx_seo_rank_history_keyword_date
    ON public.seo_rank_history (keyword_id, checked_date);
CREATE INDEX IF NOT EXISTS idx_seo_rank_history_date
    ON public.seo_rank_history (checked_date);

-- ---------------------------------------------------------------------------
-- seo_gsc_daily
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.seo_gsc_daily (
    id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    date         DATE NOT NULL,
    query        TEXT NOT NULL DEFAULT '',
    page         TEXT NOT NULL DEFAULT '',
    clicks       INTEGER NOT NULL DEFAULT 0,
    impressions  INTEGER NOT NULL DEFAULT 0,
    ctr          NUMERIC NOT NULL DEFAULT 0,
    position     NUMERIC NOT NULL DEFAULT 0,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- One row per (date, query, page) so re-syncing a day is idempotent.
CREATE UNIQUE INDEX IF NOT EXISTS idx_seo_gsc_daily_date_query_page
    ON public.seo_gsc_daily (date, query, page);
CREATE INDEX IF NOT EXISTS idx_seo_gsc_daily_date
    ON public.seo_gsc_daily (date);
CREATE INDEX IF NOT EXISTS idx_seo_gsc_daily_query
    ON public.seo_gsc_daily (query);

-- ---------------------------------------------------------------------------
-- Row Level Security — service_role only (all access is via our API routes).
-- ---------------------------------------------------------------------------
ALTER TABLE public.seo_keywords     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_rank_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_gsc_daily    ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service role full access on seo_keywords" ON public.seo_keywords;
CREATE POLICY "Service role full access on seo_keywords"
    ON public.seo_keywords FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access on seo_rank_history" ON public.seo_rank_history;
CREATE POLICY "Service role full access on seo_rank_history"
    ON public.seo_rank_history FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Service role full access on seo_gsc_daily" ON public.seo_gsc_daily;
CREATE POLICY "Service role full access on seo_gsc_daily"
    ON public.seo_gsc_daily FOR ALL TO service_role USING (true) WITH CHECK (true);

GRANT ALL ON public.seo_keywords     TO service_role;
GRANT ALL ON public.seo_rank_history TO service_role;
GRANT ALL ON public.seo_gsc_daily    TO service_role;

COMMENT ON TABLE public.seo_keywords     IS 'Keywords tracked for Google rank on the /admin/seo dashboard.';
COMMENT ON TABLE public.seo_rank_history IS 'Daily live Google position per keyword (from SerpApi). position NULL = not in top 100.';
COMMENT ON TABLE public.seo_gsc_daily    IS 'Daily Google Search Console snapshot (clicks/impressions/ctr/position) by query + page.';
