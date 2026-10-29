-- Transaction-only integration check. Creates no permanent inquiries and sends no messages.
begin;
do $$
declare test_id uuid:=gen_random_uuid(); count_jobs integer;
begin
 insert into public.contact_submissions(id,name,email,message,inquiry_type,notes)
 values(test_id,'LINE integration check','line-check@example.test','Test only','general','PRIVATE STAFF NOTE');
 insert into public.yanlong_contact_submissions(id,name,email,message)
 values(test_id,'LINE integration check','line-check@example.test','Test only');
 insert into public.yanlong_reservations(id,guest_name,email,phone,date,time,guests)
 values(test_id,'LINE integration check','line-check@example.test','+66800000000','2099-01-01','18:30',2);
 insert into public.spa_contact_submissions(id,name,email,message)
 values(test_id,'LINE integration check','line-check@example.test','Test only');
 insert into public.spa_reservations(id,guest_name,email,phone,date,time,guests,payment_status)
 values(test_id,'LINE integration check','line-check@example.test','+66800000000','2099-01-01','18:30',2,'pending');
 -- Explicit negative ID avoids advancing TWIST's real submission sequence.
 insert into public.twist_inquiries(id,form_type,name,email,message)
 values(-20261029021952,'contact','LINE integration check','line-check@example.test','Test only');
 select count(*) into count_jobs from public.brand_line_outbox
 where request_id in (test_id::text,'-20261029021952');
 if count_jobs <> 6 then raise exception 'Expected six queued notifications, got %',count_jobs; end if;
 if exists(select 1 from public.brand_line_outbox where request_id=test_id::text and row_snapshot ? 'notes') then raise exception 'Staff notes must never enter notification snapshots'; end if;
 update public.contact_submissions set status='read' where id=test_id;
 if (select count(*) from public.brand_line_outbox where request_id in (test_id::text,'-20261029021952'))<>6 then raise exception 'An update generated a duplicate notification'; end if;
 if has_table_privilege('anon','public.brand_line_outbox','select') or has_table_privilege('authenticated','public.brand_line_outbox','select') then raise exception 'Queue exposed'; end if;
 if has_function_privilege('anon','public.claim_brand_line(text[])','execute') or has_function_privilege('authenticated','public.claim_brand_line(text[])','execute') then raise exception 'Worker RPC exposed'; end if;
 raise notice 'PASS: six insert triggers, no update duplicates, private snapshots and service-only access';
end;
$$;
rollback;
