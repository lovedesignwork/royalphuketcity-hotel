import { brands, inquiryLineMessage } from './line-message.mjs';

export function brandConnection(env, brand) {
  const prefix = `LINE_${brand.toUpperCase()}`;
  const token = env[`${prefix}_CHANNEL_ACCESS_TOKEN`] || env.LINE_CHANNEL_ACCESS_TOKEN;
  const recipient = env[`${prefix}_RECIPIENT_ID`] || env.LINE_RECIPIENT_ID;
  return token && /^[UCR][a-f0-9]{32}$/i.test(recipient || '') ? { token, recipient } : null;
}

export async function pushLine(job, token, fetcher = fetch) {
  const response = await fetcher('https://api.line.me/v2/bot/message/push', {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', 'X-Line-Retry-Key': job.id },
    body: JSON.stringify({ to: job.recipient, messages: job.payload }), signal: AbortSignal.timeout(12000),
  });
  const receipt = response.status === 409 ? response.headers.get('x-line-accepted-request-id') : response.ok ? response.headers.get('x-line-request-id') : null;
  if (!receipt) throw new Error(`line-${response.status}`);
  return receipt;
}

export async function deliverLine(db, env, fetcher = fetch) {
  const configured = Object.keys(brands).filter((brand) => brandConnection(env, brand));
  if (!configured.length) return { configured: false, sent: 0, failed: 0 };
  let sent = 0, failed = 0;
  const deadline = Date.now() + 42000;
  for (let i = 0; i < 12 && Date.now() < deadline; i++) {
    const { data, error } = await db.rpc('claim_brand_line', { p_brands: configured });
    if (error) throw new Error('line-queue-unavailable');
    let job = data?.[0];
    if (!job) break;
    try {
      const connection = brandConnection(env, job.brand);
      if (!connection) throw new Error('line-not-configured');
      if (!job.payload) {
        const { data: prepared, error: prepareError } = await db.rpc('prepare_brand_line', {
          p_id: job.id, p_lease: job.lease,
          p_payload: [inquiryLineMessage(job, env.LINE_ASSET_BASE_URL || `${env.SUPABASE_URL}/storage/v1/object/public/line-brand-assets`)],
          p_recipient: connection.recipient,
        });
        if (prepareError || !prepared?.[0]) throw new Error('line-prepare-failed');
        job = prepared[0];
      }
      // A configured destination change must never redirect a retry containing guest data.
      if (job.recipient !== connection.recipient) throw new Error('line-recipient-changed');
      const receipt = await pushLine(job, connection.token, fetcher);
      const { error: finishError } = await db.rpc('finish_brand_line', { p_id: job.id, p_lease: job.lease, p_provider_id: receipt, p_error: null });
      if (finishError) throw new Error('line-receipt-save-failed');
      sent++;
    } catch (error) {
      failed++;
      const code = /^(line-\d{3}|line-not-configured|line-prepare-failed|line-receipt-save-failed|line-recipient-changed|message-too-large)$/.test(error.message) ? error.message : 'delivery-uncertain';
      const { error: finishError } = await db.rpc('finish_brand_line', { p_id: job.id, p_lease: job.lease, p_provider_id: null, p_error: code });
      // No guest details, tokens, or provider response bodies in logs.
      console.error('LINE notification deferred', { id: job.id, code, receiptSaved: !finishError });
      if (finishError) break;
    }
  }
  return { configured: true, sent, failed };
}
