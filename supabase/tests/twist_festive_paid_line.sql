-- Transaction-only verification. The scheduled worker cannot see these jobs.
begin;
set local role service_role;

do $$
declare
  event text;
  booking_id uuid;
  payment_reference text;
  order_reference text;
  amount integer;
  queued public.brand_line_outbox;
  lease_id uuid := gen_random_uuid();
  first_attempt timestamptz := now() - interval '3 hours';
begin
  foreach event in array array['christmas26', 'nye2027'] loop
    payment_reference := (100000000000 + floor(random() * 900000000000)::bigint)::text;
    order_reference := 'line-rollback-' || gen_random_uuid()::text;
    amount := case event when 'christmas26' then 510000 else 660000 end;
    insert into public.twist_festive_bookings (
      event_id, event_date, table_id, guests, guest_name, guest_email, guest_phone,
      amount_cents, checkout_key, payment_ref, child_tickets, ticket_rate, package_id
    ) values (
      event, case event when 'christmas26' then date '2026-12-24' else date '2026-12-31' end,
      'O9', 2, 'Rollback Fixture', 'line-check@example.test', '+66800000000',
      amount, gen_random_uuid(), payment_reference, 0, 'standard',
      case event when 'nye2027' then 'buffet_after_party' end
    ) returning id into booking_id;

    perform public.twist_festive_confirm_payment(payment_reference, order_reference, amount - 1);
    if exists (select 1 from public.brand_line_outbox where request_id = booking_id::text) then
      raise exception '% queued a LINE alert before payment was confirmed', event;
    end if;

    perform public.twist_festive_confirm_payment(payment_reference, order_reference, amount);
    perform public.twist_festive_confirm_payment(payment_reference, order_reference, amount);
    select * into strict queued from public.brand_line_outbox
      where source_table = 'twist_festive_bookings' and request_id = booking_id::text;
    if queued.brand <> 'twist' or queued.status <> 'pending'
      or queued.row_snapshot ->> 'status' is distinct from 'paid'
      or queued.row_snapshot ->> 'event_time' is distinct from
        (case event when 'christmas26' then '18:30–22:30' else '18:30–00:30' end)
      or queued.row_snapshot ->> 'amount_cents' is distinct from amount::text
      or queued.row_snapshot ?| array['provider_order_no','payment_ref','checkout_url','staff_notes'] then
      raise exception '% produced an incorrect paid LINE alert', event;
    end if;
    if (select count(*) from public.twist_festive_notifications as emails where emails.booking_id = queued.request_id::uuid) <> 2 then
      raise exception '% stopped queueing both receipts', event;
    end if;

    update public.brand_line_outbox
      set status = 'sending', attempts = 1, first_attempt_at = first_attempt, lease = lease_id
      where id = queued.id;
    perform public.finish_brand_line(queued.id, lease_id, null, 'line-429');
    if not exists (
      select 1 from public.brand_line_outbox where id = queued.id and status = 'pending'
      and first_attempt_at is null and attempts = 0 and next_attempt_at >= now() + interval '1 hour'
    ) then
      raise exception 'Quota rejection did not defer a first-attempt festive alert';
    end if;

    update public.brand_line_outbox
      set status = 'sending', attempts = 2, first_attempt_at = first_attempt, lease = lease_id
      where id = queued.id;
    perform public.finish_brand_line(queued.id, lease_id, null, 'line-429');
    if not exists (
      select 1 from public.brand_line_outbox where id = queued.id and status = 'pending'
      and first_attempt_at = first_attempt and attempts = 2
    ) then
      raise exception 'A possible prior send lost its original retry window';
    end if;
  end loop;

  if has_function_privilege('anon',
    'notification_private.enqueue_twist_festive_paid_line(public.twist_festive_bookings)', 'execute') then
    raise exception 'Anonymous access could enqueue paid alerts';
  end if;
  raise notice 'Both events queue one paid LINE alert and keep both email receipts. Quota retries are safe.';
end;
$$;

rollback;
