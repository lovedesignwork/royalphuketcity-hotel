// Verify LINE's signature before reading group metadata. Never store chat messages.
export async function handleLineWebhook(request, env, db, fetcher = fetch) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  if (!env.LINE_CHANNEL_SECRET || !env.LINE_EXPECTED_BOT_ID || !env.LINE_EXPECTED_GROUP_NAME) return new Response('Not configured', { status: 503 });
  const raw = await request.text();
  if (new TextEncoder().encode(raw).length > 262144) return new Response('Payload too large', { status: 413 });
  let signature;
  try { signature = Uint8Array.from(atob(request.headers.get('x-line-signature') || ''), c => c.charCodeAt(0)); } catch { return new Response('Unauthorized', { status: 401 }); }
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(env.LINE_CHANNEL_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
  if (!await crypto.subtle.verify('HMAC', key, signature, new TextEncoder().encode(raw))) return new Response('Unauthorized', { status: 401 });
  let body;
  try { body = JSON.parse(raw); } catch { return new Response('Invalid JSON', { status: 400 }); }
  if (body.destination !== env.LINE_EXPECTED_BOT_ID || !Array.isArray(body.events)) return new Response('Invalid destination', { status: 400 });
  const groups = [...new Set(body.events.filter(event => ['join','message','memberJoined'].includes(event.type) && event.source?.type === 'group').map(event => event.source.groupId))].filter(id => /^C[a-f0-9]{32}$/i.test(id));
  for (const id of groups) {
    const response = await fetcher(`https://api.line.me/v2/bot/group/${id}/summary`, { headers: { Authorization: `Bearer ${env.LINE_CHANNEL_ACCESS_TOKEN}` }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return new Response('Group lookup failed', { status: 503 });
    const summary = await response.json();
    if (summary.groupId !== id || summary.groupName !== env.LINE_EXPECTED_GROUP_NAME) continue;
    const { error } = await db.from('brand_line_groups').upsert({ group_id: id, group_name: summary.groupName, bot_id: body.destination, last_seen_at: new Date().toISOString() }, { onConflict: 'group_id' });
    if (error) return new Response('Could not save connection', { status: 503 });
  }
  return Response.json({ ok: true });
}
