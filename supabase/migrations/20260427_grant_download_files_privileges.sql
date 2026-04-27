-- Grant base table privileges for download_files.
-- RLS policies alone aren't sufficient — Postgres requires GRANT to the role
-- before RLS even runs. Without this, both /api/admin/downloads and
-- /api/downloads return 500 with code 42501 ("permission denied for table
-- download_files"). Applied retroactively to the production project on
-- 2026-04-27 via Supabase MCP. Keep this file so any fresh environment
-- (preview branch, local stack reset, or new project clone) gets the same
-- grants applied automatically.
GRANT SELECT ON public.download_files TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.download_files TO authenticated;
GRANT ALL ON public.download_files TO service_role;
