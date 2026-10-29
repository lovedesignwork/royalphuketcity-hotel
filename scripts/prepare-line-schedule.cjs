// Run with --env-file=.secrets/line-worker.env after validating the recipient.
const fs = require('node:fs');
if (!/^[a-f0-9]{64}$/.test(process.env.LINE_WORKER_SECRET || '')) throw new Error('Missing worker secret');
if (!/^C[a-f0-9]{32}$/.test(process.env.LINE_RECIPIENT_ID || '')) throw new Error('Missing verified group');
const secret = process.env.LINE_WORKER_SECRET;
const url = 'https://crhzxvbubvyachauomlx.supabase.co/functions/v1/brand-line-notifications';
fs.writeFileSync('.secrets/line-worker-vault.sql', `begin;
do $$ declare secret_id uuid; begin
 select id into secret_id from vault.secrets where name='rpc_line_worker_secret';
 if secret_id is null then perform vault.create_secret('${secret}','rpc_line_worker_secret');
 else perform vault.update_secret(secret_id,'${secret}'); end if;
 select id into secret_id from vault.secrets where name='rpc_line_worker_url';
 if secret_id is null then perform vault.create_secret('${url}','rpc_line_worker_url');
 else perform vault.update_secret(secret_id,'${url}'); end if;
end; $$;
commit;`);
console.log('Private schedule configuration prepared. No credentials printed.');
