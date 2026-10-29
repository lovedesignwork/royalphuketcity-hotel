begin;
create schema if not exists notification_private;
revoke all on schema notification_private from public, anon, authenticated;

create table public.brand_line_outbox (
 id uuid primary key default gen_random_uuid(),
 brand text not null check (brand in ('hotel','yanlong','twist','spa')),
 source_table text not null,
 request_id text not null,
 row_snapshot jsonb not null,
 payload jsonb,
 recipient text,
 status text not null default 'pending' check(status in ('pending','sending','sent','needs_attention')),
 created_at timestamptz not null default now(),
 attempts integer not null default 0,
 first_attempt_at timestamptz,
 next_attempt_at timestamptz not null default now(),
 lease uuid,
 lease_until timestamptz,
 provider_id text,
 last_error text,
 sent_at timestamptz,
 unique(source_table,request_id)
);
create index brand_line_due_idx on public.brand_line_outbox(status,next_attempt_at);
alter table public.brand_line_outbox enable row level security;
revoke all on public.brand_line_outbox from public,anon,authenticated;
grant select,insert,update,delete on public.brand_line_outbox to service_role;

-- This private trigger runs only after a source table's own insert permissions/RLS pass.
-- It needs definer privileges because public forms cannot access the private queue.
create function notification_private.queue_brand_line() returns trigger
language plpgsql security definer set search_path='' as $$
declare snapshot jsonb;
begin
 select coalesce(jsonb_object_agg(key,value),'{}'::jsonb) into snapshot
 from jsonb_each(to_jsonb(new)) where key = any(array[
  'name','guest_name','first_name','last_name','email','phone','subject','message',
  'inquiry_type','inquiry_type_label','form_type','date','time','reservation_date',
  'reservation_time','event_date','event_type','guests','party_size','guest_count',
  'service','occasion','seating_preference','country','special_requests','reference',
  'payment_status','amount','created_at'
 ]);
 insert into public.brand_line_outbox(brand,source_table,request_id,row_snapshot)
 values(tg_argv[0],tg_table_name,new.id::text,snapshot)
 on conflict(source_table,request_id) do nothing;
 return new;
end;
$$;
revoke all on function notification_private.queue_brand_line() from public,anon,authenticated;
create trigger hotel_line_queue after insert on public.contact_submissions for each row execute function notification_private.queue_brand_line('hotel');
create trigger yanlong_contact_line_queue after insert on public.yanlong_contact_submissions for each row execute function notification_private.queue_brand_line('yanlong');
create trigger yanlong_reservation_line_queue after insert on public.yanlong_reservations for each row execute function notification_private.queue_brand_line('yanlong');
create trigger twist_line_queue after insert on public.twist_inquiries for each row execute function notification_private.queue_brand_line('twist');
create trigger spa_contact_line_queue after insert on public.spa_contact_submissions for each row execute function notification_private.queue_brand_line('spa');
create trigger spa_reservation_line_queue after insert on public.spa_reservations for each row execute function notification_private.queue_brand_line('spa');

-- Worker RPCs use the service role's existing privileges, not SECURITY DEFINER.
create function public.claim_brand_line(p_brands text[]) returns setof public.brand_line_outbox
language plpgsql security invoker set search_path='' as $$
declare v_id uuid;
begin
 update public.brand_line_outbox set status='needs_attention',last_error='retry-window-expired'
 where status in ('pending','sending') and first_attempt_at < now()-interval '20 hours'
 and (lease_until is null or lease_until<now());
 select id into v_id from public.brand_line_outbox
 where brand=any(p_brands) and ((status='pending' and next_attempt_at<=now()) or (status='sending' and lease_until<now()))
 order by created_at for update skip locked limit 1;
 if v_id is null then return; end if;
 return query update public.brand_line_outbox set status='sending',attempts=attempts+1,
 first_attempt_at=coalesce(first_attempt_at,now()),lease=gen_random_uuid(),lease_until=now()+interval '2 minutes'
 where id=v_id returning *;
end;
$$;
revoke all on function public.claim_brand_line(text[]) from public,anon,authenticated;
grant execute on function public.claim_brand_line(text[]) to service_role;

create function public.prepare_brand_line(p_id uuid,p_lease uuid,p_payload jsonb,p_recipient text)
returns setof public.brand_line_outbox language sql security invoker set search_path='' as $$
 update public.brand_line_outbox set payload=coalesce(payload,p_payload),recipient=coalesce(recipient,p_recipient)
 where id=p_id and lease=p_lease and status='sending' and lease_until>now() returning *;
$$;
revoke all on function public.prepare_brand_line(uuid,uuid,jsonb,text) from public,anon,authenticated;
grant execute on function public.prepare_brand_line(uuid,uuid,jsonb,text) to service_role;

create function public.finish_brand_line(p_id uuid,p_lease uuid,p_provider_id text,p_error text)
returns void language plpgsql security invoker set search_path='' as $$
begin
 update public.brand_line_outbox set
 status=case when p_provider_id is not null then 'sent'
 when (p_error ~ '^line-4[0-9]{2}$' and p_error <> 'line-429') or p_error in ('line-recipient-changed','message-too-large') then 'needs_attention'
 else 'pending' end,
 provider_id=coalesce(p_provider_id,provider_id),last_error=p_error,
 sent_at=case when p_provider_id is not null then now() else sent_at end,
 next_attempt_at=now()+make_interval(secs=>least(3600,60*power(2,least(attempts,6)))::int),
 lease=null,lease_until=null
 where id=p_id and lease=p_lease and status='sending';
end;
$$;
revoke all on function public.finish_brand_line(uuid,uuid,text,text) from public,anon,authenticated;
grant execute on function public.finish_brand_line(uuid,uuid,text,text) to service_role;
notify pgrst,'reload schema';
commit;
