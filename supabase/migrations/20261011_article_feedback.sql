-- Article usefulness votes. Guest surveys and operational hotel data are separate.
create table if not exists public.article_feedback (
  article_id uuid not null references public.blog_posts(id) on delete cascade,
  voter_hash text not null check (length(voter_hash) = 64),
  vote smallint not null check (vote in (-1, 1)),
  updated_at timestamptz not null default now(),
  primary key (article_id, voter_hash)
);
alter table public.article_feedback enable row level security;
revoke all on public.article_feedback from anon, authenticated;
grant select, insert, update on public.article_feedback to service_role;
