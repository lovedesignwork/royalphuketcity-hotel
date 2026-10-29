import { createClient } from 'npm:@supabase/supabase-js@2.49.0';
import { deliverLine } from '../_shared/line-delivery.mjs';

// JWT verification is disabled at the gateway; this dedicated secret authenticates every call.
Deno.serve(async (request: Request) => {
  const env = Deno.env.toObject();
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  const supplied = request.headers.get('authorization') || '';
  const expected = `Bearer ${env.LINE_WORKER_SECRET || ''}`;
  const hash = async (value: string) => new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value)));
  const [a, b] = await Promise.all([hash(supplied), hash(expected)]);
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a[i] ^ b[i];
  if (!env.LINE_WORKER_SECRET || mismatch !== 0) return new Response('Unauthorized', { status: 401 });
  try {
    const db = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false, autoRefreshToken: false } });
    return Response.json(await deliverLine(db, env));
  } catch {
    return Response.json({ error: 'Notification worker unavailable' }, { status: 503 });
  }
});
