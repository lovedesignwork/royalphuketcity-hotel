// Regression tests for public article visibility, discovery, and pagination.
// Database adapters are mocked; these tests never access production data.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const tests = [];
const test = (name, fn) => tests.push({name, fn});

function harness(rows = [], failure = false) {
  const queries = [];
  const db = { from(table) {
    const q = {table, filters: [], orders: []}; queries.push(q);
    const result = () => {
      let data = rows.filter(row => q.filters.every(([key, value]) => row[key] === value));
      if (q.excludeYanLong) data = data.filter(row => row.category_id !== '1a2aa552-ac78-4563-a5b1-6a895e6eeb74');
      if (q.published) data = data.filter(row => !row.published_at || new Date(row.published_at) <= new Date());
      const count = data.length;
      if (q.range) data = data.slice(q.range[0], q.range[1] + 1);
      return {data, count, error: failure ? {message:'DB unavailable'} : null};
    };
    const chain = {
      select(fields) {q.fields = fields; return chain;},
      eq(key, value) {q.filters.push([key,value]); return chain;},
      or(value) {if(value.startsWith("category_id"))q.excludeYanLong=true;else q.published = value; return chain;},
      order(key) {q.orders.push(key); return chain;},
      async range(from, to) {q.range = [from,to]; return result();},
      async maybeSingle() {const r=result();return {...r,data:r.data[0] || null};},
    };
    return chain;
  }};
  const cache = new Map();
  function load(file) {
    if (cache.has(file)) return cache.get(file);
    const module = {exports:{}};
    const source = ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
    const requireMock = name => {
      if(name==='react') return {cache:fn=>fn};
      if(name==='@/lib/supabase') return {getSupabaseClient:()=>db};
      if(name==='next/server') return {NextResponse:{json:(data,opts)=>({data,status:opts?.status||200})}};
      if(name==='@/lib/article-content') return load('src/lib/article-content.ts');
      if(name==='@/lib/blog') return load('src/lib/blog.ts');
      throw new Error(`Unmocked import ${name}`);
    };
    vm.runInNewContext(source,{require:requireMock,module,exports:module.exports,Date,console:{error(){}}});
    cache.set(file,module.exports);
    return module.exports;
  }
  return {load, queries};
}
const article = {id:'1',slug:'published-guide',title:'Published guide',status:'published',published_at:'2026-01-01T00:00:00Z',updated_at:'2026-06-01T00:00:00Z'};
test('public article API cannot reveal a draft through preview=true',async()=>{
  const h=harness([{...article,status:'draft'}]);
  const r=await h.load('src/app/api/blog/[slug]/route.ts').GET({nextUrl:new URL('https://example.test/api/blog/published-guide?preview=true')},{params:Promise.resolve({slug:article.slug})});
  assert.equal(r.status,404); assert.equal(r.data.post,undefined);
});
test('public article JSON excludes all internal timestamps',async()=>{
  const h=harness([article]);
  const r=await h.load('src/app/api/blog/[slug]/route.ts').GET({}, {params:Promise.resolve({slug:article.slug})});
  assert.equal(r.status,200);
  for(const key of ['published_at','updated_at','created_at','scheduled_at']) assert.equal(key in r.data.post,false);
});
test('published article stays readable',async()=>{
  const h=harness([article]);
  const post=await h.load('src/lib/blog.ts').getPublishedPost(article.slug);
  assert.equal(post.slug,article.slug);
});
test('future-dated articles remain unavailable in pages, listings and sitemap',async()=>{
  const h=harness([{...article,published_at:'2099-01-01T00:00:00Z'}]);
  const blog=h.load('src/lib/blog.ts');
  assert.equal(await blog.getPublishedPost(article.slug),null);
  assert.equal((await blog.getPublishedPosts()).posts.length,0);
  assert.equal((await blog.getPublishedPostSitemapEntries()).length,0);
});
test('Yan Long articles are excluded from hotel listings, details and sitemap',async()=>{
  const row={...article,category_id:'1a2aa552-ac78-4563-a5b1-6a895e6eeb74'};
  const blog=harness([row]).load('src/lib/blog.ts');
  assert.equal(await blog.getPublishedPost(row.slug),null);
  assert.equal((await blog.getPublishedPosts()).posts.length,0);
  assert.equal((await blog.getPublishedPostSitemapEntries()).length,0);
});
test('invalid or excessive pagination never sends invalid database ranges',async()=>{
  const h=harness([article]); const blog=h.load('src/lib/blog.ts');
  for (const value of [null,'0','-1','abc','1.5','Infinity']) assert.equal(blog.parseBlogPage(value),1);
  await blog.getPublishedPosts(-5,1000000);
  assert.equal(h.queries[0].range[0],0);assert.equal(h.queries[0].range[1],99);
});
test('page two reaches older articles and preserves total count',async()=>{
  const h=harness(Array.from({length:25},(_,i)=>({...article,id:String(i),slug:`post-${i}`})));
  const r=await h.load('src/lib/blog.ts').getPublishedPosts(2,12);
  assert.equal(r.posts.length,12);assert.equal(r.posts[0].slug,'post-12');assert.equal(r.total,25);
});
test('sitemap paginates beyond the database 1000-row cap',async()=>{
  const h=harness(Array.from({length:1001},(_,i)=>({...article,slug:`post-${i}`})));
  const entries=await h.load('src/lib/blog.ts').getPublishedPostSitemapEntries();
  assert.equal(entries.length,1001);assert.equal(h.queries.length,2);
});
test('sitemap preserves a database failure instead of publishing an empty replacement',async()=>{
  await assert.rejects(harness([],true).load('src/lib/blog.ts').getPublishedPostSitemapEntries(),/Unable to load/);
});
test('category filtering requests an inner join to exclude unrelated posts',async()=>{
  const h=harness([]); await h.load('src/lib/blog.ts').getPublishedPosts(1,12,'travel');
  assert.match(h.queries[0].fields,/blog_categories!inner/);
});
(async()=>{let failures=0;for(const {name,fn} of tests){try{await fn();console.log(`PASS ${name}`);}catch(error){failures++;console.error(`FAIL ${name}`,error);}}console.log(`${tests.length-failures}/${tests.length} passed`);process.exitCode=failures?1:0;})();
