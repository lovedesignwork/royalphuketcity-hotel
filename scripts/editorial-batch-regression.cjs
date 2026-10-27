const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');
const crypto = require('node:crypto');
const root = path.resolve(__dirname,'..');
function load(file) {
 const module={exports:{}};
 const source=ts.transpileModule(fs.readFileSync(path.join(root,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 vm.runInNewContext(source,{module,exports:module.exports,URL,require:name=>name==='@/lib/article-content'?load('src/lib/article-content.ts'):name.includes('image-ownership.json')?require('../content/editorial/image-ownership.json'):require(name)});
 return module.exports;
}
const registry=require('../content/editorial/image-ownership.json');
const batch=require('../content/editorial/selected-topics.json');
const posts=batch.map(p=>require('../content/blog/'+p.slug+'.json'));
const {validateBlogPublication}=load('src/lib/blog-publication.ts');
const {countArticleWords,prepareArticleContent}=load('src/lib/article-content.ts');

test('all ten selected topics have substantial text, four owned images and usable metadata',()=>{
 assert.deepEqual(batch.map(p=>p.topic).sort((a,b)=>a-b),[1,2,3,16,17,19,21,22,23,25]);
 const sourceHashes=new Set();const outputHashes=new Set();
 for(const post of posts){
  const words=countArticleWords(post.content);
  assert(words>=800&&words<=1600,post.slug+' word count: '+words);
  assert.equal(validateBlogPublication(post,posts),null,post.slug);
  assert.equal((post.content.match(/<img\b/g)||[]).length,3);
  assert(!/\{\{image|<h1\b|<time\b|\d+\s+min read/i.test(post.content));
  assert(post.meta_description.length>=110&&post.meta_description.length<=170);
  const record=registry.articles.find(a=>a.slug===post.slug);
  assert.equal(record.images.length,4);
  for(const asset of record.images){
   assert(!sourceHashes.has(asset.sourceSha256),'Source repeated across articles: '+asset.url);sourceHashes.add(asset.sourceSha256);
   assert(!outputHashes.has(asset.sha256));outputHashes.add(asset.sha256);
   const bytes=fs.readFileSync(path.join(root,'public',asset.url));
   assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),asset.sha256);
   assert(Math.max(asset.width,asset.height)<=1600);
   assert(asset.bytes<=256000,asset.url);
   assert(asset.alt.length>12);
   for(const v of asset.variants)assert(fs.existsSync(path.join(root,'public',v.url)));
   if(asset.origin==='AI-generated editorial illustration'){
    assert.equal(asset.requestedModel,'nano_banana_pro');
    assert(post.content.includes(asset.url));
    assert(post.content.includes('AI-generated editorial illustration:'));
   }
  }
 }
});

test('publishing rejects short articles, missing dimensions, duplicate and cross-article photos',()=>{
 const post=posts[0];
 assert.match(validateBlogPublication({...post,content:'<p>Too short</p>'},[]),/800/);
 assert.match(validateBlogPublication({...post,featured_image_alt:''},[]),/alt text/);
 assert.match(validateBlogPublication({...post,content:post.content.replace(/ width="\d+"/g,'')},[]),/width and height/);
 assert.match(validateBlogPublication({...post,content:post.content.replace(/(<img\b[^>]*src=")[^"]+/, '$1'+post.featured_image)},[]),/different/);
 assert.match(validateBlogPublication(post,[{...posts[1],featured_image:post.featured_image}]),/already assigned/);
 const record=registry.articles.find(a=>a.slug===post.slug);
 assert.match(validateBlogPublication(post,[{slug:'another-post',featured_image:record.images[0].sourcePath.replace(/^public/,'')}]),/already assigned/);
});

test('contents links point to unique rendered headings',()=>{
 const {html,headings}=prepareArticleContent('<h2>One &amp; two</h2><p>Text</p><h2>One &amp; two</h2>');
 assert.equal(headings.length,2);assert.equal(headings[0].title,'One & two');
 assert.notEqual(headings[0].id,headings[1].id);
 for(const h of headings)assert(html.includes('id="'+h.id+'"'));
});
