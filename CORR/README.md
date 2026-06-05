# Royal Phuket City — Website Correction Package

This folder contains everything needed to apply the requested corrections to **royalphuketcity.com**, organized so you can feed the Markdown files and photos straight into Cursor.

## How to use this with Cursor

1. Open this folder in Cursor alongside your `royalphuketcity.com` codebase.
2. Start with `corrections/00-overview.md` — it is the master list of every change, grouped by page.
3. Work through the individual files in `corrections/`. Each one tells Cursor: **which page**, **what is wrong**, **what to change**, and **which photos to use** (with exact paths into the `photos/` folder).
4. Copy the relevant images from `photos/<topic>/` into your project's image/asset directory and update the `<img>` / `next/image` references as instructed.
5. Use `reference-screenshots/` to see the "before" state of each page (these are the screenshots from the original review document, named by row + page).

## Folder structure

```
royalphuketcity-corrections/
├── README.md                      ← you are here
├── corrections/                   ← the MD instruction files
│   ├── 00-overview.md             ← master correction table (all 27 items)
│   ├── 01-hotel-landing-pages.md  ← rooms/hotel SEO pages (info & images mismatch)
│   ├── 02-old-town-pages.md       ← old town content pages
│   ├── 03-markets-pages.md        ← night market / walking street pages
│   ├── 04-promotions.md
│   ├── 05-facilities.md
│   ├── 06-sustainability.md       ← the largest task (logo, 404s, broken links, content)
│   └── 07-mobile-site.md
├── photos/                        ← replacement images, web-optimized
│   ├── old-town/            (15)
│   ├── markets-night-market/(20)
│   ├── spa/                 (13)
│   ├── logo/               (1)
│   ├── natural-attractions/ (9)
│   ├── activities/          (9)
│   └── cultural-historical/ (24)
└── reference-screenshots/         ← 27 "before" screenshots (row01…row27)
```

## About the photos (image optimization)

All images here have been **resized and optimized for fast web loading**:

- Maximum dimension capped at **2000 px** (well under your 3000 px limit — smaller = faster page loads).
- JPEGs re-encoded at quality 82, progressive.
- WebP files kept as WebP (quality 85).
- Original SEO-friendly filenames preserved so they stay good for image SEO. You can rename to match your conventions, but keep them descriptive.

The originals on OneDrive are full-resolution (8–22 MB each); these optimized versions are typically 150–600 KB and are what you should ship to the live site.

## ⚠️ Still to download manually (4 photo folders + 1 doc)

I downloaded 7 of the 11 photo folders (91 images). To save time, please grab these remaining ones yourself and drop them into matching subfolders under `photos/`:

| Put into `photos/...` | Used on | OneDrive link |
|---|---|---|
| `mall/` | Sustainability → Mall section (row 23) | https://1drv.ms/f/c/3bc4fde6b7e2246c/IgBmVZJ94pb_QIE1KtDYDIunAaE-7BXzfR9KYr_7SSEhHhQ?e=FZ20W8 |
| `michelin/` | Sustainability → Michelin section (row 24) | https://1drv.ms/f/c/3bc4fde6b7e2246c/IgAXQc8pPo2RQoKmg6haqbSmAaUGzbzmQIRoHgW0bFxWEXs?e=B6pKF6 |
| `transport/` | Sustainability → Transport section (row 25) | https://1drv.ms/f/c/3bc4fde6b7e2246c/IgAwcyZJrglqQoTVhB09ImcYAZcokSVqS8NVWkUeCNAZa8I?e=rO7BVT |
| `certificate/` | Sustainability → Certificate section (row 26) | https://1drv.ms/f/c/3bc4fde6b7e2246c/IgBH8lrqu4yeTZDSQbQI--A6ASx7hQeT-sFpscu4i36YeLk?e=kfHXrI |

**Also needed — text content for the Sustainability page** (`Sustainable_Website_Content.docx`):
https://1drv.ms/w/c/3bc4fde6b7e2246c/IQDvV6QgGsSFR52zM4OEBTZzAS2la7ENHoQDEa0ZkYW8sUA?e=3mHvIQ
This Word doc holds the written copy for the Natural Attractions / Activities / Cultural / Mall / Michelin / Transport sections. Paste its content where `06-sustainability.md` marks `[FROM Sustainable_Website_Content.docx]`.

**Minor:** one file in `cultural-historical/` (`Romanee Road.jpg`) failed on download (24 of 25 succeeded). Re-grab it from the Cultural folder if you need it.
The `spa/` folder also has an extra OneDrive subfolder "AI by P'pae" (12 AI-generated design mockups) that I did not pull — grab it only if you want those design options.

## Source

All content derived from your OneDrive review document `web edit.docx` (the correction table) and its linked photo folders.
