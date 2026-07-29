---
title: CDN - Index
type: index
status: active
updated: 2026-02-17
description: Navigation hub for CDN documentation — art prints, HLS/work video, collection assets, and chess data hosted on Backblaze B2.
tags:
  - project/kol-monorepo
  - domain/cdn
related:
  - "[[02-cdn-media-library|CDN Media Library]]"
  - "[[03-collection-data-schemas|Collection Data Schemas]]"
  - "[[04-chess-data|Chess Data CDN]]"
  - "[[07-work-video-system|Work Video System]]"
---

## Overview

Content Delivery Network (CDN) documentation for kolkrabbi.io assets hosted on Backblaze B2.

**CDN Base URL**: `https://f005.backblazeb2.com/file/kolkrabbi/website/`

### Chapter Index

| Title | Focus |
|-------|-------|
| CDN Index (this doc) | Overview and navigation |
| CDN Overview | Bucket config, URL patterns |
| CDN Media Library | Art prints, HLS videos, collection assets |
| Work Video System | Work hero/gallery video: Sanity-URL → B2 MP4, in-view render |
| Collection Data Schemas | Illustrations, grids, logomarks data |
| Chess Data CDN | Chess dataset API and structure |
| Prints | Pricing, editions, materials |
| CDN Tree Structure | Full directory tree |

### Supporting Files
- `cdn-manifest.json` - CDN file manifest
- `prints.JSON` - Print pricing data

### Live tree + bucket setup

Not documented here — this repo is a **consumer**, not the source. Live, auto-refreshed:
`~/.dotfiles/docs/18-cdn-r2b2/` (bucket layout, setup, tree snapshots). Orientation only, no
commands: `kol-cdn-overview` skill. Commands (browse/upload/sync): `kol-bucket-b2` skill.

---

## CDN Libraries

### Art Prints
High-resolution print images (TIF masters + JPG web versions)
→ See [CDN Media Library](02-cdn-media-library.md)

### HLS Videos
Adaptive streaming video (homepage hero, motion graphics)
→ See [CDN Media Library](02-cdn-media-library.md)

### Work Videos
Per-project hero + gallery MP4s on B2, referenced by URL in Sanity (not uploaded files)
→ See [Work Video System](07-work-video-system.md)

### Collection Assets
SVG and raster assets for collections pages
→ See [Collection Data Schemas](03-collection-data-schemas.md)

### Chess Data
27,200 chess games dataset (~112MB)
→ See [Chess Data CDN](04-chess-data.md)

---

**Last Updated**: 2026-02-17
**Maintained By**: Operations
