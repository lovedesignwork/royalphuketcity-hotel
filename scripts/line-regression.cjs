const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const load = (file) => import(pathToFileURL(path.resolve(__dirname, '../supabase/functions/_shared', file)));
const base = 'https://hotel.example/assets';
const job = (brand = 'hotel', source = 'contact_submissions', row = {}) => ({ id: 'cd0796ca-7c11-443c-9ce0-b853bf4bde9e', lease: 'lease', brand, source_table: source, request_id: '12345678-9abc', row_snapshot: { name: 'Example Guest', email: 'guest@example.test', phone: '+66 800000000', message: 'Please contact me.', created_at: '2026-10-29T03:00:00Z', ...row } });
function walk(value, check) { if (value && typeof value === 'object') { check(value); Object.values(value).forEach((child) => walk(child, check)); } }
test('phone flags resolve international and shared codes without guessing local numbers', async () => {
  const { phoneCountry, inquiryLineMessage } = await load('line-message.mjs');
  for (const [phone, country] of [['+66 80 000 0000','TH'],['0066 80 000 0000','TH'],['+1 416 555 1234','CA'],['+1 202 555 0123','US'],['+44 20 7946 0018','GB'],['+91 98765 43210','IN'],['0800000000',null],['+80012345678',null],['+1',null],['invalid',null],['',null]]) {
    assert.equal(phoneCountry(phone), country, phone);
    const message = inquiryLineMessage(job('hotel', 'contact_submissions', {phone}), base);
    const flags=[]; walk(message, v=>{if(v.type==='image' && v.url.includes('flagcdn.com'))flags.push(v.url);});
    assert.deepEqual(flags, country ? [`https://flagcdn.com/w40/${country.toLowerCase()}.png`] : []);
    assert.ok(JSON.stringify(message).includes(phone || 'Phone not provided'));
  }
});
test('all six sources have branded, button-free cards and no internal/payment identifiers', async () => {
  const { inquiryLineMessage } = await load('line-message.mjs');
  for (const [brand, source] of [['hotel','contact_submissions'],['yanlong','yanlong_contact_submissions'],['yanlong','yanlong_reservations'],['twist','twist_inquiries'],['spa','spa_reservations'],['spa','spa_contact_submissions']]) {
    const message = inquiryLineMessage(job(brand, source, { notes: 'INTERNAL_SECRET', transaction_id: 'PAYMENT_SECRET' }), base);
    const serialized = JSON.stringify(message);
    assert.ok(serialized.includes(`${base}/${brand}.png`));
    assert.ok(!serialized.includes('INTERNAL_SECRET') && !serialized.includes('PAYMENT_SECRET'));
    walk(message, (value) => { assert.notEqual(value.type, 'button'); assert.equal(value.action, undefined); });
    if (source.endsWith('_reservations')) assert.ok(serialized.includes('Reservation request'));
  }
});
test('TWIST names, booking fields, unpaid spa status and Bangkok dates map correctly', async () => {
  const { inquiryDetails } = await load('line-message.mjs');
  const d = inquiryDetails(job('twist','twist_inquiries',{name:null, first_name:'First',last_name:'Last',form_type:'reservation',reservation_date:'2026-11-10',reservation_time:'18:30',party_size:4}));
  assert.equal(d.name, 'First Last'); assert.equal(d.reservation,true);
  assert.ok(d.details.some(([k,v])=>k==='Guests' && v==='4'));
  assert.ok(d.received.includes('10:00'));
  const spa = inquiryDetails(job('spa','spa_reservations',{payment_status:'pending',amount:1200,service:'Thai Massage'}));
  assert.ok(spa.details.some(([k,v])=>k==='Payment' && v==='Pending'));
});
test('long multilingual guest notes survive in continuation cards with valid limits', async () => {
  const { inquiryLineMessage } = await load('line-message.mjs');
  const note = 'สวัสดี 🌺\n'.repeat(950);
  const message = inquiryLineMessage(job('hotel','contact_submissions',{message:note}), base);
  assert.equal(message.contents.type,'carousel');
  assert.ok(message.contents.contents.length <= 12);
  let chunks=[]; walk(message, v=>{if(v.type==='text' && /ส|ว|ั|ด|ี|🌺/.test(v.text))chunks.push(v.text);});
  assert.equal(chunks.join(''),note);
  assert.ok(Buffer.byteLength(JSON.stringify(message.contents))<50000);
});
test('LINE uses the same retry key and accepts only a confirmed duplicate receipt', async () => {
  const { pushLine } = await load('line-delivery.mjs');
  const j={...job(),recipient:'C'+'a'.repeat(32),payload:[{type:'flex'}]};
  let calls=[];
  const fetcher=async (url,options)=>{calls.push({url,...options});return new Response('{}',{status:409,headers:{'x-line-accepted-request-id':'receipt'}});};
  assert.equal(await pushLine(j,'token',fetcher),'receipt');
  assert.equal(calls[0].headers['X-Line-Retry-Key'],j.id);
  assert.equal(JSON.parse(calls[0].body).to,j.recipient);
  await assert.rejects(pushLine(j,'token',async()=>new Response('{}',{status:409})),/line-409/);
  await assert.rejects(pushLine(j,'token',async()=>new Response('{}',{status:429})),/line-429/);
});
test('unconfigured brands never claim or send jobs', async () => {
  const { deliverLine,brandConnection } = await load('line-delivery.mjs');
  assert.equal(brandConnection({LINE_CHANNEL_ACCESS_TOKEN:'t',LINE_RECIPIENT_ID:'bad'},'hotel'),null);
  const r=await deliverLine({rpc(){throw new Error('must not claim');}},{});
  assert.equal(r.configured,false);
});
test('worker freezes recipient/payload before sending and records failures for retry', async () => {
  const { deliverLine } = await load('line-delivery.mjs');
  const calls=[];let claimed=false;const j=job();
  const db={rpc:async(name,args)=>{calls.push([name,args]);if(name==='claim_brand_line'){if(claimed)return {data:[]};claimed=true;return {data:[j]};}if(name==='prepare_brand_line')return {data:[{...j,recipient:args.p_recipient,payload:args.p_payload}]};return {error:null};}};
  const result=await deliverLine(db,{LINE_CHANNEL_ACCESS_TOKEN:'t',LINE_RECIPIENT_ID:'C'+'a'.repeat(32),LINE_ASSET_BASE_URL:base},async()=>new Response('{}',{status:503}));
  assert.equal(result.failed,1);assert.equal(result.sent,0);
  assert.equal(calls[1][0],'prepare_brand_line');
  assert.equal(calls[2][1].p_error,'line-503');
});
test('webhook requires a valid signature and the expected bot', async () => {
  const { handleLineWebhook } = await load('line-webhook.mjs');
  const { createHmac } = require('node:crypto');
  const env={LINE_CHANNEL_SECRET:'secret',LINE_EXPECTED_BOT_ID:'bot',LINE_EXPECTED_GROUP_NAME:'RPC Notification'};
  const db={from(){throw new Error('must not access database');}};
  const body=JSON.stringify({destination:'bot',events:[]});
  assert.equal((await handleLineWebhook(new Request('https://test',{method:'POST',body}),env,db)).status,401);
  const request=(raw)=>new Request('https://test',{method:'POST',body:raw,headers:{'x-line-signature':createHmac('sha256','secret').update(raw).digest('base64')}});
  assert.equal((await handleLineWebhook(request(body),env,db)).status,200);
  assert.equal((await handleLineWebhook(request(JSON.stringify({destination:'another bot',events:[]})),env,db)).status,400);
});
test('webhook records only the approved group metadata, never chat text or sender identity', async () => {
  const { handleLineWebhook } = await load('line-webhook.mjs');
  const { createHmac } = require('node:crypto');
  const groupId='C'+'a'.repeat(32),saved=[];
  const raw=JSON.stringify({destination:'bot',events:[{type:'message',source:{type:'group',groupId,userId:'PRIVATE USER ID'},message:{type:'text',text:'PRIVATE CHAT'}}]});
  const env={LINE_CHANNEL_SECRET:'secret',LINE_EXPECTED_BOT_ID:'bot',LINE_EXPECTED_GROUP_NAME:'RPC Notification',LINE_CHANNEL_ACCESS_TOKEN:'token'};
  const request=()=>new Request('https://test',{method:'POST',body:raw,headers:{'x-line-signature':createHmac('sha256','secret').update(raw).digest('base64')}});
  const db={from:()=>({upsert:async(value)=>{saved.push(value);return {error:null};}})};
  const fetcher=(name)=>async()=>Response.json({groupId,groupName:name});
  assert.equal((await handleLineWebhook(request(),env,db,fetcher('Other group'))).status,200);
  assert.equal(saved.length,0);
  assert.equal((await handleLineWebhook(request(),env,db,fetcher('RPC Notification'))).status,200);
  assert.equal(saved[0].group_id,groupId);
  assert.ok(!JSON.stringify(saved).includes('PRIVATE'));
});
