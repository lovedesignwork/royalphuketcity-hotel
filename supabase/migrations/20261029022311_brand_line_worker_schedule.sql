begin;
create extension if not exists pg_cron;
create extension if not exists pg_net with schema extensions;

-- The schedule remains inert until an operator saves both dedicated Vault values.
-- No guest data is sent in the wake-up request; the authenticated worker claims it.
create function notification_private.wake_brand_line() returns void
language plpgsql security invoker set search_path='' as $$
declare worker_url text; worker_secret text;
begin
 select decrypted_secret into worker_url from vault.decrypted_secrets where name='rpc_line_worker_url';
 select decrypted_secret into worker_secret from vault.decrypted_secrets where name='rpc_line_worker_secret';
 if worker_url is null or worker_secret is null then return; end if;
 perform net.http_post(url:=worker_url,
  headers:=jsonb_build_object('Content-Type','application/json','Authorization','Bearer '||worker_secret),
  body:='{}'::jsonb,timeout_milliseconds:=55000);
end;
$$;
revoke all on function notification_private.wake_brand_line() from public,anon,authenticated,service_role;
select cron.schedule('rpc-brand-line-notifications','* * * * *','select notification_private.wake_brand_line()');
commit;
