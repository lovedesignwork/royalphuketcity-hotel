begin;

alter table public.twist_festive_bookings
  add column if not exists booking_reference text;
create unique index twist_festive_booking_reference_unique
  on public.twist_festive_bookings (booking_reference)
  where booking_reference is not null;

create table notification_private.twist_festive_reference_counters (
  event_id text primary key check (event_id in ('christmas26', 'nye2027')),
  last_number bigint not null check (last_number > 0)
);
alter table notification_private.twist_festive_reference_counters enable row level security;
revoke all on notification_private.twist_festive_reference_counters from public, anon, authenticated;
grant select, insert, update on notification_private.twist_festive_reference_counters to service_role;

create function notification_private.assign_twist_festive_reference()
returns trigger language plpgsql security invoker set search_path = '' as $$
declare
  running_number bigint;
begin
  insert into notification_private.twist_festive_reference_counters as counter (event_id, last_number)
  values (new.event_id, 1)
  on conflict (event_id) do update set last_number = counter.last_number + 1
  returning last_number into running_number;

  new.booking_reference := (case new.event_id when 'nye2027' then 'TWIST-NY' else 'TWIST-' end)
    || to_char(new.paid_at at time zone 'Asia/Bangkok', 'DD') || running_number::text;
  return new;
end;
$$;
revoke all on function notification_private.assign_twist_festive_reference() from public, anon, authenticated;

create trigger twist_festive_assign_reference
before update of status on public.twist_festive_bookings
for each row when (old.status = 'pending' and new.status = 'paid' and new.staff_source is null)
execute function notification_private.assign_twist_festive_reference();

-- The alert snapshot and emailed receipt read the same stored reference.
create or replace function notification_private.enqueue_twist_festive_paid_line(booking public.twist_festive_bookings)
returns void language sql security invoker set search_path = '' as $$
  insert into public.brand_line_outbox (brand, source_table, request_id, row_snapshot)
  select 'twist', 'twist_festive_bookings', booking.id::text, jsonb_build_object(
    'status', booking.status,
    'reference', coalesce(booking.booking_reference,
      (case booking.event_id when 'christmas26' then 'TWIST-XMAS-' else 'TWIST-NYE-' end)
        || upper(replace(left(booking.id::text, 12), '-', ''))),
    'event_name', case booking.event_id when 'christmas26' then 'Christmas Gala Dinner' else 'New Year’s Eve 2027' end,
    'event_date', booking.event_date,
    'event_time', case
      when booking.event_id = 'christmas26' or booking.package_id = 'buffet' then '18:30–22:30'
      when booking.package_id = 'buffet_after_party' then '18:30–00:30'
      when booking.package_id = 'after_party' then '22:30–00:30' end,
    'package_name', case
      when booking.event_id = 'christmas26' or booking.package_id = 'buffet' then 'International buffet dinner'
      when booking.package_id = 'buffet_after_party' then 'Buffet dinner + after-party'
      when booking.package_id = 'after_party' then 'After-party' end,
    'table_id', booking.table_id,
    'table_zone', case left(booking.table_id, 1) when 'O' then 'Open-air terrace'
      when 'A' then 'Window seating' else 'Indoor dining' end,
    'ticket_rate', booking.ticket_rate,
    'guests', booking.guests,
    'child_tickets', booking.child_tickets,
    'amount_cents', booking.amount_cents,
    'guest_name', booking.guest_name,
    'guest_email', booking.guest_email,
    'guest_phone', booking.guest_phone
  )
  where booking.status = 'paid' and booking.staff_source is null
    and booking.paid_at is not null and booking.provider_order_no is not null
    and booking.event_id in ('christmas26', 'nye2027')
  on conflict (source_table, request_id) do nothing;
$$;

commit;
