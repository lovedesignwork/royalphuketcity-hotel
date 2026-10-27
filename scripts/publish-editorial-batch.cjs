// Run with Node --env-file=.env.local. Credentials are read from the environment
// and never printed. Default is read-only; --stage and --publish are explicit.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { createClient } = require('@supabase/supabase-js');
const batch = require('../content/editorial/selected-topics.json');
const registry = require('../content/editorial/image-ownership.json');
const root = path.resolve(__dirname, '..');
const mode = process.argv.includes('--publish') ? 'publish' : process.argv.includes('--stage') ? 'stage' : 'check';
const expectedHost = 'crhzxvbubvyachauomlx.supabase.co';
const origin = 'https://royalphuketcity.com';
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url || new URL(url).hostname !== expectedHost) throw new Error('CMS project does not match the hotel publication target');
const db = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const digest = data => crypto.createHash('sha256').update(data).digest('hex');
(async () => {
  const { data: existing, error } = await db.from('blog_posts').select('id, slug, status, published_at');
  if (error) throw error;
  const now = Date.now();
  const rows = [];
  for (const [index, item] of batch.entries()) {
    const post = JSON.parse(fs.readFileSync(path.join(root, 'content/blog', item.slug + '.json')));
    const match = existing.find(row => row.slug === post.slug || row.id === post.id);
    if (match && (match.id !== post.id || match.slug !== post.slug)) throw new Error('Existing article identity conflict: ' + post.slug);
    if (mode === 'stage' && match?.status === 'published') throw new Error('Refusing to turn a published article into a draft: ' + post.slug);
    if (post.word_count < 800 || post.word_count > 1600) throw new Error('Word count out of range: ' + post.slug);
    const assets = registry.articles.find(a => a.slug === post.slug).images;
    if (assets.length < 3 || assets.length > 5) throw new Error('Invalid image count');
    for (const asset of assets) {
      if (digest(fs.readFileSync(path.join(root, 'public', asset.url))) !== asset.sha256) throw new Error('Asset hash mismatch');
      if (mode === 'publish') {
        for (const variant of asset.variants) {
          const response = await fetch(new URL(variant.url, origin));
          if (!response.ok) throw new Error('Deploy all assets before publishing: ' + variant.url);
          const received = Buffer.from(await response.arrayBuffer());
          if (digest(received) !== digest(fs.readFileSync(path.join(root, 'public', variant.url)))) throw new Error('Live asset differs from reviewed asset: ' + variant.url);
        }
      }
    }
    rows.push({ ...post, status: mode === 'publish' ? 'published' : 'draft',
      published_at: mode === 'publish' ? match?.published_at || new Date(now - (batch.length - index) * 1000).toISOString() : null,
      updated_at: new Date(now).toISOString() });
  }
  if (mode === 'check') { console.log('Verified ten article identities and reviewed local assets; no records changed.'); return; }
  const { data, error: writeError } = await db.from('blog_posts').upsert(rows, { onConflict: 'id' }).select('id, slug, status');
  if (writeError) throw writeError;
  if (data.length !== batch.length) throw new Error('Unexpected publication count');
  console.log(JSON.stringify({ mode, articles: data.map(({ slug, status }) => ({ slug, status })) }, null, 2));
})();
