# m.royalphuketcity.com — remove the old mobile site

> Before screenshot: `../reference-screenshots/row27_mobile-site-remove.png`

- **Problem (row 27):** An old, separate mobile website is still live at `https://m.royalphuketcity.com/`. The main site is responsive, so the separate `m.` subdomain is obsolete and can cause duplicate-content / SEO and UX issues.
- **Fix (do this at the hosting/DNS level, not in the page code):**
  - Take the `m.royalphuketcity.com` site offline, **and**
  - Set up a 301 redirect from `m.royalphuketcity.com/*` to the matching pages on `https://royalphuketcity.com/` (or at minimum to the homepage) so existing links and search results don't break.
- **Note:** This is an infrastructure change (DNS / web server / host config). It can't be done from the main site's source code, so it likely needs to be handled in your hosting panel or with whoever manages the domain. Cursor can't perform this step — flag it for manual action.
