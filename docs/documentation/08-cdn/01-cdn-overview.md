---
title: CDN Overview
type: reference
status: active
updated: 2025-12-23
description: Bucket configuration, URL patterns, and folder structure for the Kolkrabbi Backblaze B2 CDN.
aliases:
  - cdn-overview
audience: internal
tags:
  - project/kol-monorepo
  - domain/cdn
related:
  - "[[02-cdn-media-library|cdn media library]]"
  - "[[03-collection-data-schemas|collection data schemas]]"
  - "[[04-chess-data|chess data]]"
---

## Bucket Configuration

**Provider**: Backblaze B2
**Bucket Name**: kolkrabbi
**Base URL**: `https://f005.backblazeb2.com/file/kolkrabbi/`

---

## URL Patterns

### Full URL Format
```
https://f005.backblazeb2.com/file/kolkrabbi/website/{path}
```

### Common Base URLs

| Library | Base URL |
|---------|----------|
| Art Prints | `.../website/art-prints/` |
| HLS Videos | `.../website/hls-library/` |
| Asset Library | `.../website/asset-library/` |
| Data Library | `.../website/data-library/` |

---

## High-Level Structure

```
kolkrabbi/
└── website/
    ├── art-prints/           # Print store images (TIF masters + JPG web)
    │   └── print-{name}/
    ├── hls-library/          # HLS video streams
    │   ├── video-home/       # Homepage hero + highlights
    │   └── video-library/    # Motion graphics collection
    ├── asset-library/        # Static assets
    │   └── collections/      # Collection carousel images, SVGs
    └── data-library/         # Heavy data files
        └── chess-data/       # Chess game data (~112MB)
```

---

## Related Documentation

| Doc | Content |
|-----|---------|
| [CDN Media Library](02-cdn-media-library.md) | Art prints, HLS videos, collection assets |
| [Collection Data Schemas](03-collection-data-schemas.md) | Illustrations, grids, logomarks data |
| [Chess Data](04-chess-data.md) | Chess dataset API and CDN |

---

## Deprecated Folders

| Folder | Status | Replacement |
|--------|--------|-------------|
| `homepage-hero/` | DEPRECATED | `hls-library/video-home/hero-dark/` |
| `homepage-hero-v2/` | DEPRECATED | Do not use |
| `homepage-hero-v3/` | DEPRECATED | `hls-library/video-home/hero-light/` |

---

**Last Updated**: 2025-12-23
**Maintained By**: Operations
