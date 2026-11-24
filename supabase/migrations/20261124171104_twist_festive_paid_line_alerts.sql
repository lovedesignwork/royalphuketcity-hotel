begin;

-- Write the payment alert in the same transaction as the confirmed booking.
create function notification_private.enqueue_twist_festive_paid_line(booking public.twist_festive_bookings)
returns void language sql security invoker set search_path = '' as $$
  insert into public.brand_line_outbox (brand, source_table, request_id, row_snapshot)
  select 'twist', 'twist_festive_bookings', booking.id::text, jsonb_build_object(
    'status', booking.status,
    'reference', (case booking.event_id when 'christmas26' then 'TWIST-XMAS-' else 'TWIST-NYE-' end)
      || upper(replace(left(booking.id::text, 12), '-', '')),
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

revoke all on function notification_private.enqueue_twist_festive_paid_line(public.twist_festive_bookings)
  from public, anon, authenticated;
grant usage on schema notification_private to service_role;
grant execute on function notification_private.enqueue_twist_festive_paid_line(public.twist_festive_bookings)
  to service_role;

create function notification_private.queue_twist_festive_paid_line()
returns trigger language plpgsql security invoker set search_path = '' as $$
begin
  perform notification_private.enqueue_twist_festive_paid_line(new);
  return new;
end;
$$;

revoke all on function notification_private.queue_twist_festive_paid_line() from public, anon, authenticated;

create trigger twist_festive_paid_line_queue
after update of status on public.twist_festive_bookings
for each row when (old.status = 'pending' and new.status = 'paid')
execute function notification_private.queue_twist_festive_paid_line();

-- Include payments already confirmed before this trigger was installed.
select notification_private.enqueue_twist_festive_paid_line(booking)
from public.twist_festive_bookings as booking
where booking.status = 'paid';

create or replace function public.finish_brand_line(p_id uuid, p_lease uuid, p_provider_id text, p_error text)
returns void language plpgsql security invoker set search_path = '' as $$
begin
  -- A first-attempt 429 is a known rejection. Leave it retryable beyond the
  -- normal retry window. An earlier uncertain send keeps its original window.
  if p_provider_id is null and p_error = 'line-429' then
    update public.brand_line_outbox
    set status = 'pending', last_error = p_error, next_attempt_at = now() + interval '1 hour',
      attempts = 0, first_attempt_at = null, lease = null, lease_until = null
    where id = p_id and lease = p_lease and status = 'sending' and attempts = 1
      and source_table in ('twist_festive_bookings', 'twist_festive_line_test');
    if found then
      return;
    end if;
  end if;

  update public.brand_line_outbox set
    status = case
      when p_provider_id is not null then 'sent'
      when (p_error ~ '^line-4[0-9]{2}$' and p_error <> 'line-429')
        or p_error in ('line-recipient-changed','message-too-large') then 'needs_attention'
      else 'pending' end,
    provider_id = coalesce(p_provider_id, provider_id),
    last_error = p_error,
    sent_at = case when p_provider_id is not null then now() else sent_at end,
    next_attempt_at = now() + make_interval(secs => least(3600, 60 * power(2, least(attempts, 6)))::int),
    lease = null,
    lease_until = null
  where id = p_id and lease = p_lease and status = 'sending';
end;
$$;

commit;
