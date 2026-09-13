# Audit evidence

All modified application behavior was tested against a local Next.js production
server at `http://localhost:3100`. The Lighthouse baseline was measured against
the public site. No customer inquiry, email, booking or payment was submitted.

- [Validation summary](../validation-summary.json)
- [80 sitemap pages and metadata](sitemap-pages.json)
- [47 desktop/mobile checks](browser-flows.json)
- [12 final release checks](release-smoke.json)
- [HTTP status checks](status-smoke.json)
- [Dependency audit](dependency-audit.json)
- [Image integrity](image-integrity.json) and [asset/link checks](asset-link-check.json)
- [Regression output](regressions.log), [build](production-build.log), [TypeScript](typecheck.log), and [lint](lint.log)
- [Live Lighthouse baseline](lighthouse-baseline.json) and [local production Lighthouse](lighthouse-final.json), importable into the Lighthouse report viewer

Visual checks:

- [Desktop homepage](final-desktop-hero.png)
- [Mobile homepage](final-mobile-hero.png)
- [Mobile download access](downloads-mobile.png)
- [Mobile spa request](final-mobile-spa.png)

The main crawl and 47-flow suite were followed by targeted checks for subsequent
hero, carousel, image format and guest-route changes. The final release checks
passed with no browser page errors. Lighthouse scores are homepage lab results,
not a ranking assessment or a site-wide accessibility certification.
