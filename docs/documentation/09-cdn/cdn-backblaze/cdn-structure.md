---
title: CDN Structure & Inventory
date: 2026-02-17
category: server
tags: [server, cdn, backblaze, index, reference]
---

# CDN Structure & Current Inventory

This document shows the current structure of the Kolkrabbi CDN and inventory of uploaded content.

## CDN Base URL

```
https://f005.backblazeb2.com/file/kolkrabbi/website/
```

## Folder Naming Conventions

### Art Prints

Each print has three folders:
```
art-prints/print-{name}/
├── master/          # Original TIFF masters for archival
├── print/           # Print-ready TIFFs (A1, A2, A3, A4)
└── web/             # Web-optimized JPGs (400px, 800px, 1200px, 2000px)
```

### HLS Video Library

Each video has an HLS folder with adaptive streaming:
```
hls-library/video-{name}/
├── hls/
│   ├── master.m3u8   # Master playlist (ABR)
│   ├── 360p/         # index.m3u8 + segments
│   ├── 480p/         # index.m3u8 + segments
│   ├── 720p/         # index.m3u8 + segments
│   └── 1080p/        # index.m3u8 + segments
└── still-image.jpg   # Poster/fallback image
```

### Homepage Hero Videos

Simple HLS structure for homepage backgrounds:
```
homepage-hero-v{N}/
└── hls/
    ├── master.m3u8
    ├── 360p/
    ├── 480p/
    ├── 720p/
    └── 1080p/
```

## Current Print Inventory

| ID | Name | Folder | Category | Edition | Status |
|----|------|--------|----------|---------|--------|
| `print-eth` | ETH Master | `print-eth` | Digital | limited-50 | Active |
| `print-midday` | Midday | `print-midday` | Abstract | open | Active |
| `print-midnight` | Midnight | `print-midnight` | Abstract | open | Active |
| `print-001` | Gul Blokk | `print-gblokk` | Architectural | limited-50 | Active |
| `print-002` | Biskup Skovia | `print-skovia` | Illustration | open | Active |

### Print URL Pattern

Prints are accessed at:
```
/prints/{slug}
```

Example images:
```
${cdnBase}/print-{folder}/web/{name}-400.jpg
${cdnBase}/print-{folder}/web/{name}-800.jpg
${cdnBase}/print-{folder}/web/{name}-1200.jpg
${cdnBase}/print-{folder}/web/{name}-2000.jpg
```

## Current CDN Structure (Tree View)

### Full Structure (Print + Video Libraries)

*Last updated: 2025-12-12*

```
.
├── kolkrabbi
├── test.txt
└── website
    ├── art-prints
    │   ├── print-gblokk
    │   │   ├── master
    │   │   │   └── gul-blokk_print-master.tif
    │   │   ├── print
    │   │   │   ├── gul-blokk_print-A1.tif
    │   │   │   ├── gul-blokk_print-A2.tif
    │   │   │   ├── gul-blokk_print-A3.tif
    │   │   │   └── gul-blokk_print-A4.tif
    │   │   └── web
    │   │       ├── gul-blokk-1200.jpg
    │   │       ├── gul-blokk-2000.jpg
    │   │       ├── gul-blokk-400.jpg
    │   │       └── gul-blokk-800.jpg
    │   ├── print-midday
    │   │   ├── master
    │   │   │   └── print-midday_print-master.tif
    │   │   ├── print
    │   │   │   ├── print-midday_print-A1.tif
    │   │   │   ├── print-midday_print-A2.tif
    │   │   │   ├── print-midday_print-A3.tif
    │   │   │   └── print-midday_print-A4.tif
    │   │   └── web
    │   │       ├── print-midday-1200.jpg
    │   │       ├── print-midday-2000.jpg
    │   │       ├── print-midday-400.jpg
    │   │       └── print-midday-800.jpg
    │   ├── print-midnight
    │   │   ├── master
    │   │   │   └── midnight_print-master.tif
    │   │   ├── print
    │   │   │   ├── midnight_print-A1.tif
    │   │   │   ├── midnight_print-A2.tif
    │   │   │   ├── midnight_print-A3.tif
    │   │   │   └── midnight_print-A4.tif
    │   │   └── web
    │   │       ├── midnight-1200.jpg
    │   │       ├── midnight-2000.jpg
    │   │       ├── midnight-400.jpg
    │   │       └── midnight-800.jpg
    │   ├── print-placeholders
    │   │   ├── print-one-01.png
    │   │   ├── print-one-02.png
    │   │   ├── print-one-04.jpg
    │   │   └── print-one-04.png
    │   └── print-skovia
    │       ├── master
    │       │   └── print-skovia_print-master.tif
    │       ├── print
    │       │   ├── print-skovia_print-A1.tif
    │       │   ├── print-skovia_print-A2.tif
    │       │   ├── print-skovia_print-A3.tif
    │       │   └── print-skovia_print-A4.tif
    │       └── web
    │           ├── print-skovia-1200.jpg
    │           ├── print-skovia-2000.jpg
    │           ├── print-skovia-400.jpg
    │           └── print-skovia-800.jpg
    ├── hls-library
    │   └── video-home
    │       ├── hero-dark
    │       │   ├── hls
    │       │   │   ├── 1080p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 360p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 480p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 720p
    │       │   │   │   └── index.m3u8
    │       │   │   └── master.m3u8
    │       │   └── still-hero-4k-dark.jpg
    │       ├── hero-light
    │       │   ├── hls
    │       │   │   ├── 1080p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 360p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 480p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 720p
    │       │   │   │   └── index.m3u8
    │       │   │   └── master.m3u8
    │       │   └── still-hero-4k-light.jpg
    │       ├── hl-malmromur
    │       │   ├── hl-malromur-still.jpg
    │       │   └── hls
    │       │       ├── 1080p
    │       │       │   └── index.m3u8
    │       │       ├── 360p
    │       │       │   └── index.m3u8
    │       │       ├── 480p
    │       │       │   └── index.m3u8
    │       │       ├── 720p
    │       │       │   └── index.m3u8
    │       │       └── master.m3u8
    │       ├── hl-radial
    │       │   ├── hls
    │       │   │   ├── 1080p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 360p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 480p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 720p
    │       │   │   │   └── index.m3u8
    │       │   │   └── master.m3u8
    │       │   └── radial-dial-still.png
    │       ├── hl-sanid
    │       │   ├── hls
    │       │   │   ├── 1080p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 360p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 480p
    │       │   │   │   └── index.m3u8
    │       │   │   ├── 720p
    │       │   │   │   └── index.m3u8
    │       │   │   └── master.m3u8
    │       │   └── sanid-still.png
    │       └── hl-trollatunga
    │           ├── hls
    │           │   ├── 1080p
    │           │   │   └── index.m3u8
    │           │   ├── 360p
    │           │   │   └── index.m3u8
    │           │   ├── 480p
    │           │   │   └── index.m3u8
    │           │   ├── 720p
    │           │   │   └── index.m3u8
    │           │   └── master.m3u8
    │           ├── trollatunga-still-narrow.jpg
    │           └── trollatunga-still-wide.jpg
    ├── homepage-hero
    │   └── hls
    │       ├── 1080p
    │       │   └── index.m3u8
    │       ├── 360p
    │       │   └── index.m3u8
    │       ├── 480p
    │       │   └── index.m3u8
    │       ├── 720p
    │       │   └── index.m3u8
    │       └── master.m3u8
    ├── homepage-hero-v2
    │   └── hls
    │       ├── 1080p
    │       │   └── index.m3u8
    │       ├── 360p
    │       │   └── index.m3u8
    │       ├── 480p
    │       │   └── index.m3u8
    │       ├── 720p
    │       │   └── index.m3u8
    │       └── master.m3u8
    └── homepage-hero-v3
        └── hls
            ├── 1080p
            │   └── index.m3u8
            ├── 360p
            │   └── index.m3u8
            ├── 480p
            │   └── index.m3u8
            ├── 720p
            │   └── index.m3u8
            └── master.m3u8

77 directories, 93 files
```

## Commands to Update This Document

To regenerate the tree view (excluding segment files):

```bash
# Mount the bucket
mkdir -p ~/KolkrabbiMount
rclone mount kolkrabbi:kolkrabbi ~/KolkrabbiMount &

# Generate tree (excluding .ts segments)
tree ~/KolkrabbiMount -I "segment_*.ts"
```

Or without mounting:

```bash
rclone lsf kolkrabbi:kolkrabbi -R --format=p | grep -v "segment_"
```

## Adding New Content

### New Print

1. Create local structure:
   ```bash
   mkdir -p print-{name}/{master,print,web}
   ```

2. Add files to appropriate folders:
   - `master/` - Original TIFF
   - `print/` - Print-ready TIFFs (A1-A4)
   - `web/` - Web JPGs (400, 800, 1200, 2000)

3. Upload:
   ```bash
   rclone copy print-{name}/ kolkrabbi:kolkrabbi/website/art-prints/print-{name}/
   ```

4. Update inventory table in this document

### New HLS Video

1. Generate HLS (see [hls-conversion.md](hls-conversion.md))

2. Upload:
   ```bash
   rclone copy hls_output/ kolkrabbi:kolkrabbi/website/hls-library/video-{name}/hls/
   ```

3. Add still image:
   ```bash
   rclone copy poster.jpg kolkrabbi:kolkrabbi/website/hls-library/video-{name}/
   ```

## Storage Statistics

To check bucket size and file count:

```bash
rclone size kolkrabbi:kolkrabbi
```

To get detailed folder statistics:

```bash
rclone size kolkrabbi:kolkrabbi/website/art-prints
rclone size kolkrabbi:kolkrabbi/website/hls-library
```
