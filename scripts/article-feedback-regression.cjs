const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const vm = require('node:vm');
function harness() {
  const rows=new Map();
  const db={from:()=>({select(_f,options){const filters={};const q={eq(k,v){filters[k]=v;return q},then(resolve){const data=[...rows.values()].filter(r=>Object.entries(filters).every(([k,v])=>r[k]===v));return Promise.resolve({data,count:data.length,error:null}).then(resolve)},maybeSingle(){return Promise.resolve({data:[...rows.values()].find(r=>Object.entries(filters).every(([k,v])=>r[k]===v))||null,error:null})}};return q},upsert(row){rows.set(row.article_id+row.voter_hash,row);return Promise.resolve({error:null})}})};
  const module={exports:{}};
  const response={json(data,opts={}){return {data,status:opts.status||200,cookies:{set(name,value){this[name]=value}}}}};
  const source=ts.transpileModule(fs.readFileSync('src/app/api/blog/[slug]/feedback/route.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  vm.runInNewContext(source,{module,exports:module.exports,URL,Date,Map,require:name=> name==='next/server'?{NextResponse:response}:name==='@/lib/blog'?{getPublishedPost:async slug=>slug==='published'?{id:'test-article'}:null}:name==='@/lib/supabase'?{getSupabaseClient:()=>db}:require(name)});
  function request(vote,cookie,origin='https://royalphuketcity.com'){return {url:'https://royalphuketcity.com/api/blog/published/feedback',nextUrl:{protocol:'https:'},headers:{get:k=>k==='origin'?origin:k==='x-forwarded-for'?'test':null},cookies:{get:()=>cookie?{value:cookie}:undefined},json:async()=>({vote})}}
  return {route:module.exports,rows,request,params:{params:Promise.resolve({slug:'published'})}};
}
test('feedback persists, duplicate votes count once, and changed votes replace the old choice',async()=>{
 const h=harness();const first=await h.route.POST(h.request(1),h.params);assert.equal(first.status,200);const cookie=first.cookies.rpc_article_vote;
 await h.route.POST(h.request(1,cookie),h.params);assert.equal(h.rows.size,1);
 let result=await h.route.GET(h.request(null,cookie),h.params);assert.equal(result.data.likes,1);assert.equal(result.data.dislikes,0);assert.equal(result.data.vote,1);
 await h.route.POST(h.request(-1,cookie),h.params);result=await h.route.GET(h.request(null,cookie),h.params);assert.equal(result.data.likes,0);assert.equal(result.data.dislikes,1);assert.equal(result.data.vote,-1);
});
test('cross-origin, invalid votes and unpublished articles cannot create feedback',async()=>{const h=harness();assert.equal((await h.route.POST(h.request(1,null,'https://elsewhere.example'),h.params)).status,403);assert.equal((await h.route.POST(h.request(4),h.params)).status,400);assert.equal((await h.route.POST(h.request(1),{params:Promise.resolve({slug:'draft'})})).status,404);assert.equal(h.rows.size,0)});
