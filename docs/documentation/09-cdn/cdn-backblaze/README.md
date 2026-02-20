---
title: CDN & Backblaze Media Server
date: 2026-02-17
category: server
tags: [server, cdn, backblaze, rclone, index, reference]
---

# CDN & Backblaze Media Server

**Owner:** Biskup Kolkrabbi
**CDN URL:** https://f005.backblazeb2.com/file/kolkrabbi/website/

## Overview

This folder contains documentation for managing the Kolkrabbi CDN hosted on Backblaze B2. The CDN serves:
- **Art prints** (high-resolution images in multiple sizes)
- **HLS video** (adaptive bitrate streaming)
- **Homepage hero videos**
- **Still images and posters**

## Quick Reference

### CDN Structure
```
website/
├── art-prints/       # Print library (master, print-ready, web)
├── hls-library/      # HLS video library (adaptive streaming)
├── homepage-hero/    # Homepage video versions
└── homepage-hero-v2/ # Alternate homepage videos
```

### Common Commands

**Mount the bucket locally:**
```bash
rclone mount kolkrabbi:kolkrabbi ~/KolkrabbiMount
```

**Upload to CDN:**
```bash
rclone copy ./local-folder kolkrabbi:kolkrabbi/website/path/
```

**View CDN structure:**
```bash
rclone lsf kolkrabbi:kolkrabbi -R --dirs-only
```

**Generate HLS from master video:**
```bash
./make_hls.sh hero_master.mov
```

## Documentation

- **[backblaze-setup.md](backblaze-setup.md)** - rclone setup, credentials, basic commands
- **[cdn-structure.md](cdn-structure.md)** - Current CDN structure, tree outputs, inventory
- **[hls-conversion.md](hls-conversion.md)** - FFmpeg workflows for HLS video conversion
- **[print-certificates.md](print-certificates.md)** - Certificate templates for art prints
- **[media-indexing.md](media-indexing.md)** - Automated media indexing scripts

## Getting Started

### For Documentation Reference

These files are **documentation only**. The `.env.example` here is a reference template.

### For Actual Project Setup

When setting up your actual project (Next.js app, Node.js scripts, etc.):

1. **Create `.env` at your project root** (not in this docs folder):
   ```bash
   cd /path/to/your/actual-project
   cp /path/to/this/cdn-backblaze/.env.example .env
   # Edit .env with your actual credentials
   ```

2. **Install rclone:**
   ```bash
   brew install rclone
   ```

3. **Configure rclone:**
   See [backblaze-setup.md](backblaze-setup.md) for detailed instructions

4. **Start uploading:**
   ```bash
   rclone copy ./my-content kolkrabbi:kolkrabbi/website/
   ```

## File Organization

### For Art Prints
```
art-prints/print-{name}/
├── master/          # Original TIFF masters
├── print/           # Print-ready files (A1-A4)
└── web/             # Web-optimized JPGs (400px-2000px)
```

### For HLS Videos
```
video-folder/
├── hls/
│   ├── master.m3u8   # Master playlist
│   ├── 360p/         # Low quality
│   ├── 480p/         # Medium quality
│   ├── 720p/         # HD quality
│   └── 1080p/        # Full HD quality
└── still-image.jpg   # Poster/fallback image
```

## Workflow Examples

### Upload a new print
```bash
# Organize locally first
mkdir -p print-new/master print-new/print print-new/web

# Upload to CDN
rclone copy print-new/ kolkrabbi:kolkrabbi/website/art-prints/print-new/
```

### Create and upload HLS video
```bash
# Generate HLS from master
./make_hls.sh video_master.mov

# Upload to CDN
rclone copy hls_output/ kolkrabbi:kolkrabbi/website/hls-library/my-video/hls/
```

## Security Notes

⚠️ **Important:**
- Never commit actual credentials to git
- Only commit `.env.example` with placeholder values
- Keep `.env` in `.gitignore`
- Use environment variables in scripts

## Resources

- [Backblaze B2 Documentation](https://www.backblaze.com/b2/docs/)
- [rclone Documentation](https://rclone.org/docs/)
- [FFmpeg HLS Guide](https://trac.ffmpeg.org/wiki/HLS)
