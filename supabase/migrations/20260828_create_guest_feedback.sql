create table if not exists public.guest_feedback (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  guest_name text,
  email text,
  room_number text,
  overall integer not null check (overall >= 1 and overall <= 5),
  room integer check (room >= 1 and room <= 5),
  cleanliness integer check (cleanliness >= 1 and cleanliness <= 5),
  staff integer check (staff >= 1 and staff <= 5),
  dining integer check (dining >= 1 and dining <= 5),
  stay_again text check (stay_again in ('yes', 'maybe', 'no')),
  comments text,
  source text not null default 'guest_app',
  status text not null default 'new'
);

alter table public.guest_feedback enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'guest_feedback'
      and policyname = 'guest_feedback_service_all'
  ) then
    create policy guest_feedback_service_all
      on public.guest_feedback
      for all
      to service_role
      using (true)
      with check (true);
  end if;

  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'guest_feedback'
      and policyname = 'guest_feedback_insert'
  ) then
    create policy guest_feedback_insert
      on public.guest_feedback
      for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;
