# AI search crawler access

Reviewed 27 September 2026. Scope: public-page discovery and technical access for
ChatGPT, Claude, Perplexity, Google Search, and Bing. This is not a measurement of
rankings, citations, or recommendation frequency; no numerical visibility score
has been assigned.

## Findings and changes

The live site's existing wildcard robots policy already allowed public content.
Named policies now explicitly allow OAI-SearchBot, ChatGPT-User,
Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Googlebot,
Googlebot-Image, and bingbot. Every group excludes the API namespace while
permitting rendering assets and pages whose noindex metadata must be read.
Authentication is unchanged. Training crawler policy remains unchanged under
the wildcard rule; training access is separate from search discovery.

The existing llms.txt contained unsupported or conflicting summary claims,
including a 500-person event capacity and a fixed airport travel time. It now
provides 30 links to official pages, with dedicated Wedding and Meetings & Events
sections. It avoids fixed capacity, price, and travel-time claims. This file is
an optional navigation aid, not an indexing requirement or ranking signal.

Public pages already serve titles, descriptions, canonicals, body text, and
Hotel/Organization and other structured data in HTML. No special AI-only markup
or different content for bots was added. The sitemap includes 80 public pages.
Admin/guest pages and unapproved Thai previews retain their noindex settings.

Vercel firewall inspection returned no active or draft custom firewall
configuration, no system bypasses, and attack mode disabled. No firewall bypass
or security relaxation was needed. This snapshot does not establish that every
request from every provider IP range will always pass platform mitigations.

## Validation

- Production build passed, including TypeScript validation.
- Existing regression suite passed, including all named robots groups retaining
  API exclusions and rendering-resource access.
- Lint passed with 12 existing warnings and no errors.
- Local production HTTP audit: 147 successful checks, no failures. Nine agent
  names were tested across eight key URLs, with OAI-SearchBot checks covering
  every sitemap page. All 30 guide links are represented in the sitemap or point
  to robots.txt/sitemap.xml.
- The audit verifies HTTP 200, no restrictive index/snippet headers or metadata,
  initial HTML titles and canonicals, server-rendered headings/text, and parseable
  JSON-LD. Requests are read-only and use three concurrent workers.

Run the same audit against production after deployment:

```sh
node scripts/check-crawler-access.mjs https://royalphuketcity.com evidence.json
```

These requests use crawler user-agent names from the tester's network. They are
not real provider-origin crawler visits. Actual indexing needs Search Console,
Bing Webmaster Tools, or provider crawl-log evidence. Indexing and recommendations
are never guaranteed by permission alone.

## Content and visibility follow-up

No brand-mention, backlink, or numeric passage-citability scoring was performed.
For future content work, prioritize consistent verified venue capacities by
seating layout, current packages, clearly dated case studies, and useful answers
to wedding and conference planning questions. Public pages still have differing
capacity statements; the hotel should verify these before a site-wide factual
rewrite. Existing structured data should continue to match visible content.
Do not publish duplicate doorway pages or fabricate ratings/certifications to
seek AI citations.

## Provider references

- [OpenAI crawler documentation](https://developers.openai.com/api/docs/bots):
  OAI-SearchBot is for search; GPTBot is for model training. OpenAI recommends
  allowing its published search-crawler IP ranges where firewall rules exist.
- [Anthropic crawler documentation](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler):
  Claude-SearchBot and Claude-User have different roles from ClaudeBot.
- [Perplexity crawler documentation](https://docs.perplexity.ai/docs/resources/perplexity-crawlers):
  PerplexityBot powers search discovery; Perplexity-User retrieves on user request.
- [Google AI search guidance](https://developers.google.com/search/docs/appearance/ai-features):
  Googlebot access, indexing, and snippet eligibility apply to AI search features;
  no special AI text file or schema is required.
- [Bing content controls](https://blogs.bing.com/webmaster/2023/9/Announcing-new-options-for-webmasters-to-control-usage-of-their-content-in-Bing-Chat/):
  robots and content-preview controls affect content use in Bing AI experiences.
