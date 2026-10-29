import { createClient } from 'npm:@supabase/supabase-js@2.49.0';
import { handleLineWebhook } from '../_shared/line-webhook.mjs';
Deno.serve(async (request: Request) => {
  const env = Deno.env.toObject();
  const db = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
  try { return await handleLineWebhook(request, env, db); }
  catch { return new Response('Webhook temporarily unavailable', { status: 503 }); }
});
