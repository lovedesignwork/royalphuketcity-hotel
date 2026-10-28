-- TWIST forms and the hotel admin use server-only clients for this private inbox.
-- RLS stays enabled; no browser/public role can read or write guest records.
alter table public.twist_inquiries enable row level security;
revoke all on table public.twist_inquiries from anon, authenticated;
grant select, insert, update on table public.twist_inquiries to service_role;
grant usage, select on sequence public.twist_inquiries_id_seq to service_role;
