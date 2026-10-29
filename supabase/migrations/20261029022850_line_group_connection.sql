begin;
create table public.brand_line_groups (
 group_id text primary key check(group_id ~ '^C[0-9a-f]{32}$'),
 group_name text not null,
 bot_id text not null,
 last_seen_at timestamptz not null default now()
);
alter table public.brand_line_groups enable row level security;
revoke all on public.brand_line_groups from public,anon,authenticated;
grant select,insert,update,delete on public.brand_line_groups to service_role;
notify pgrst,'reload schema';
commit;
