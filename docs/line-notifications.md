# LINE inquiry notifications

All four brands route to **RPC Notification**, through **RPC Info**, channel `2009136536` (`@279ledfe`). The integration runs in the shared Supabase project `crhzxvbubvyachauomlx`, independently of localhost and the websites' deployments.

## Coverage

| Brand | Source tables |
| --- | --- |
| Royal Phuket City Hotel | `contact_submissions` — all categories, including downloads, reservations, events, weddings, general and guest chat |
| Yan Long | `yanlong_contact_submissions`, `yanlong_reservations` |
| TWIST | `twist_inquiries` — contact, reservation and other submitted form types |
| Royal Wellness Spa | `spa_contact_submissions`, `spa_reservations` — spa website and hotel guest app |

An AFTER INSERT trigger records each newly saved submission in `brand_line_outbox`. There is no historical backfill. Staff edits and payment/status updates do not produce duplicate notifications. Existing email delivery is unchanged. Spa bookings are labeled as requests and show the payment status at submission time; they are not payment confirmations.

## Cards and delivery

The templates follow Seven Marine's header, guest details, tinted request details and guest note layout. Each brand has its own real PNG logo and brand colors. There are no buttons, action links or quick replies. Long notes continue in additional carousel cards. Staff-only notes and transaction identifiers are excluded.

The `rpc-brand-line-notifications` database cron runs every minute. It invokes the `brand-line-notifications` Edge Function using a dedicated secret stored in Vault. Jobs are claimed with a two-minute lease and `FOR UPDATE SKIP LOCKED`. The exact message and recipient are frozen before delivery. Each job UUID is also LINE's retry key, including the first attempt. HTTP 409 counts as accepted only with LINE's accepted-request receipt. Temporary errors back off; permanent errors and uncertain retries older than 20 hours require attention to avoid duplicate messages outside LINE's retry window. `sent` means accepted by LINE, not proof that a person read it.

The signed `rpc-line-webhook` discovers the explicitly named group. It checks LINE's HMAC and bot destination, then verifies the group name with LINE. It stores only group metadata, never messages or sender identities. The previous webhook at `m.royalphuketcity.click` no longer resolved; its URL is recorded in the ignored `.secrets/previous-line-webhook.json` file.

## Configuration

Edge Function secrets:

- `LINE_CHANNEL_ACCESS_TOKEN`, `LINE_CHANNEL_SECRET`: existing RPC Info credentials.
- `LINE_CHANNEL_ID`: `2009136536` (operator metadata).
- `LINE_EXPECTED_BOT_ID`, `LINE_EXPECTED_GROUP_NAME`: verified bot and `RPC Notification`.
- `LINE_RECIPIENT_ID`: the verified group's ID.
- `LINE_WORKER_SECRET`: dedicated random worker credential.
- Optional `LINE_ASSET_BASE_URL`: defaults to this project's public `line-brand-assets` bucket.

Supabase provides `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` inside the functions. Never add these credentials to browser code. The local connection file is `.secrets/line-worker.env`, which Git and Vercel ignore. The queue and group tables have RLS and no anon/authenticated grants; worker RPCs allow only the service role. Logos are the only public objects in the dedicated storage bucket.

Vault entries `rpc_line_worker_url` and `rpc_line_worker_secret` enable the schedule. Without both, the schedule does nothing. `scripts/prepare-line-schedule.cjs` writes their SQL into the ignored secrets folder. Do not rotate to a different LINE channel while deliveries are pending; resolve outstanding receipts first.

## Validation and operations

```powershell
node --test scripts/line-regression.cjs
npx supabase db query --linked --project-ref crhzxvbubvyachauomlx --file scripts/check-line-database.sql
node --env-file=.secrets/line-worker.env scripts/validate-line-messages.mjs
```

The SQL check rolls back every synthetic submission. LINE's validation endpoint sends nothing. To explicitly send four fictional connection cards to the agreed group, use `scripts/check-line-connection.cjs --send-test` with the same env-file; it does not add inquiries to the dashboard. Inspect `.secrets/line-test-jobs.json` before repeating a test after an uncertain result.

```sql
select brand,status,count(*) from public.brand_line_outbox group by brand,status;
select id,brand,attempts,last_error,created_at from public.brand_line_outbox
where status='needs_attention' order by created_at;
select status,return_message,start_time from cron.job_run_details
where jobid=(select jobid from cron.job where jobname='rpc-brand-line-notifications')
order by start_time desc limit 5;
```

Do not reset a `needs_attention` job or change its UUID until its LINE receipt is investigated. The card source and delivery code live in `supabase/functions/_shared/`. Deploy both functions with `--no-verify-jwt --use-api`: they authenticate using a dedicated worker secret and LINE HMAC respectively. `supabase/functions` is excluded from Next.js typechecking because it runs in Deno. The deployment bundle and live endpoint checks verify that runtime.

For a local fictional preview, run `node scripts/preview-line.mjs` and `node scripts/serve-line-preview.cjs`, then open `http://127.0.0.1:3002`. The preview uses the actual Flex payload, with a browser approximation of LINE's rendering.

References: [LINE retry semantics](https://developers.line.biz/en/docs/messaging-api/retrying-api-request/), [Supabase scheduled functions](https://supabase.com/docs/guides/functions/schedule-functions).
