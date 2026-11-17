import { inquiryLineMessage } from '../supabase/functions/_shared/line-message.mjs';
// LINE's validation endpoint checks payloads without sending messages.
for (const [brand, source_table, form_type, inquiry_type] of [
 ['hotel','contact_submissions','contact','general'],
 ['yanlong','yanlong_reservations','reservation','dining'],
 ['twist','twist_inquiries','contact','general'],
 ['twist','twist_inquiries','reservation','reservation'],
 ['hotel','contact_submissions','contact','twist'],
 ['spa','spa_reservations','reservation','spa'],
]) {
 const message=inquiryLineMessage({brand,source_table,request_id:'PREVIEW',row_snapshot:{form_type,inquiry_type,name:'Example Guest',email:'guest@example.test',phone:'+66800000000',message:'Connection preview. No real guest data.',date:'2026-11-12',time:'18:30',guests:2}},'https://crhzxvbubvyachauomlx.supabase.co/storage/v1/object/public/line-brand-assets');
 const response=await fetch('https://api.line.me/v2/bot/message/validate/push',{method:'POST',headers:{Authorization:`Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({messages:[message]})});
 if(!response.ok)throw new Error(`${brand}: ${response.status} ${await response.text()}`);
 console.log(`${brand}/${inquiry_type}/${form_type}: LINE validated (no message sent)`);
}
