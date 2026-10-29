import { inquiryLineMessage } from '../supabase/functions/_shared/line-message.mjs';
// LINE's validation endpoint checks payloads without sending messages.
for (const brand of ['hotel','yanlong','twist','spa']) {
 const message=inquiryLineMessage({brand,source_table:brand==='hotel'?'contact_submissions':`${brand}_reservations`,request_id:'PREVIEW',row_snapshot:{name:'Example Guest',email:'guest@example.test',phone:'+66800000000',message:'Connection preview. No real guest data.',date:'2026-11-12',time:'18:30',guests:2}},'https://crhzxvbubvyachauomlx.supabase.co/storage/v1/object/public/line-brand-assets');
 const response=await fetch('https://api.line.me/v2/bot/message/validate/push',{method:'POST',headers:{Authorization:`Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,'Content-Type':'application/json'},body:JSON.stringify({messages:[message]})});
 if(!response.ok)throw new Error(`${brand}: ${response.status} ${await response.text()}`);
 console.log(`${brand}: LINE validated (no message sent)`);
}
