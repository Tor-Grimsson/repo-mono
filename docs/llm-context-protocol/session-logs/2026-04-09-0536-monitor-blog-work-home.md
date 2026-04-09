# Session Log: Monitor — Blog Post, Work Project & Home Card

**Date:** 2026-04-09
**Status:** Completed

## Overview

Full Monitor launch session: seeded work project and blog post to Sanity CMS, added home page bento card, created social share copy. Built `seed-blog.js` script with markdown-to-Portable Text parser. Added YouTube/Vimeo embed support to `videoBlock` schema and frontend renderer.

## Key Accomplishments

### 1. Blog Seed Folder Structure
Created `monitor-blog/` at repo root mirroring the work project CMS vault pattern: `_blog.md` (frontmatter + markdown body), `cover/`, `thumbnail/`, `images/` (10 inline), `videos/` (1 inline mp4). Images reused from work project gallery — no re-export needed. Added hardware rack photos (`_assets/04-front`, `_assets/03-detail`) resized to match gallery formats (2000x1200 and 1200x1500).

### 2. Blog Content — Personal Opening
Rewrote "The Premise" section opening. Replaced generic rhetorical question with personal narrative: Konsulat (band/modular synth project) → eurorack hardware → Mirror project as catalyst → Monitor as the result. First person voice for the intro, then shifts to technical voice. Konsulat YouTube link inline, Spotify in sources. Mirror link inline.

### 3. seed-blog.js Script
**File:** `packages/content/scripts/seed-blog.js`

New blog seed script following same pattern as `seed.js`. Reads `_blog.md`, parses YAML frontmatter for metadata, converts markdown body to Portable Text blocks. Handles: headings (h2/h3/h4), paragraphs with inline marks (bold/italic/code/links), code blocks with language detection, blockquotes, numbered and bullet lists, `[image: ##.png]` placeholders mapped to uploaded assets, `[video: ##.mp4]` placeholders, and `[youtube: url]` placeholders for embed blocks.

### 4. videoBlock Schema — Embed URL Support
**File:** `packages/content/src/schemas/types/modules.ts`

Added optional `embedUrl` field (type: url) to `videoBlock`. Fields are mutually exclusive — `file` hidden when `embedUrl` is set and vice versa. Validation requires either file or embedUrl. Preview shows embed URL in subtitle.

### 5. VideoBlock Frontend — iframe Rendering
**File:** `apps/web/src/components/prose/blocks/VideoBlock.jsx`

Added `getEmbedUrl()` helper that extracts YouTube and Vimeo embed URLs from regular watch/share URLs. Component renders `<iframe>` when embedUrl is present, falls back to `<video>` tag for uploaded files.

### 6. Sanity Seeding — Both Documents
Seeded work project (`project-monitor`): thumbnail, hero video (mp4), 11 gallery images + 1 gallery video (Conway Life). Links populated with monitor.kolkrabbi.io and GitHub repo.

Seeded blog post (`blog-voltage-in-the-browser`): 67 body blocks, 10 inline images, 1 inline video, YouTube embed, 11 sources, 6 TOC entries, related project reference.

### 7. Home Page Bento Card
**File:** `apps/web/src/components/sections/home/HomeHighlights.jsx`

Added Monitor as new Row 0 above Malromur. Uses Conway Life video (`12.mp4`) from `public/img/home-highlight/` with wireframe still as poster. Title: "Monitor", subtitle: "Modular Video Synthesizer", description: "Video Modulo rack engine runs 50 modules at 60fps on Canvas2D." Links to `/work/monitor`.

### 8. Work Project Links
**File (vault):** `cms-type/tool/monitor/_project.md`

Filled empty link URLs: Live → monitor.kolkrabbi.io, Repo → github.com/Tor-Grimsson/kol-monitor

### 9. Social Share Copy
**File:** `monitor-blog/social-share.md`

Two versions: A (personal voice matching blog opening) and B (technical, design system voice). Short version for Twitter/Threads. Tags. TikTok/Reels reminder for 9:16 vertical.

### 10. Gitignore
**File:** `.gitignore`

Added `.vscode/` and `docs/.obsidian/`.

## Files Modified

### New Files
- `packages/content/scripts/seed-blog.js` — blog post seed script
- `apps/web/public/img/home-highlight/hl-monitor-1200.png` — card poster image
- `apps/web/public/img/home-highlight/hl-monitor.mp4` — hero video (unused, kept as option)
- `apps/web/public/img/home-highlight/12.mp4` — Conway Life video for bento card
- `monitor-blog/` — entire blog seed folder (user will move out of repo)
- `docs/plans/monitor-graphics.md` — graphics deliverables checklist

### Modified Files
- `.gitignore` — added `.vscode/`, `docs/.obsidian/`
- `packages/content/src/schemas/types/modules.ts` — videoBlock embedUrl field
- `apps/web/src/components/prose/blocks/VideoBlock.jsx` — iframe embed rendering
- `apps/web/src/components/sections/home/HomeHighlights.jsx` — Monitor bento card

## Issues Encountered

### 1. Blog Inline Image Sizing
- **Problem:** Blog body layout expects ~16:9 landscape images. Portrait images (4:5, 1200x1500) render full content width and look oversized.
- **Status:** Not fixed. Noted for debug session. Consider switching to 5:3 as standard inline format.

### 2. Blog Image 10 Not Loading
- **Problem:** Last inline image in "Bridging Signal Domains" doesn't render.
- **Likely cause:** `seed-blog.js` image index counter gets offset after `[video:]` and `[youtube:]` placeholders — those don't consume from the image array but the counter logic may be wrong.
- **Status:** Not fixed. Debug in seed script.

### 3. /work/monitor Direct URL 404
- **Problem:** Navigating directly to `/work/monitor` redirects to `/work`. Project exists in Sanity.
- **Likely cause:** CDN cache not propagated yet, or WorkDetail fetch timing.
- **Status:** Not fixed. Check after deploy.

### 4. Work Shelf First Card Double-Click
- **Problem:** First card in every shelf row on `/work` requires double click. Not Monitor-specific.
- **Likely cause:** Embla carousel drag detection on first visible item.
- **Status:** Not fixed. Pre-existing bug.

### 5. Work Detail Lightbox
- **Problem:** Image selection for expanded/lightbox view in work detail broken.
- **Status:** Not fixed. Pre-existing bug.

## Decisions Made

- Blog uses personal first-person voice for intro (Konsulat/origin story), then shifts to technical third-person for the rest
- YouTube embed goes in "Ported, Not Imported" section alongside hardware rack photos, not in the opening
- Home card uses Conway Life video (3.8MB, 60fps) — more visually distinctive than the rack video
- Blog inline images reuse work gallery assets directly — no separate export needed
- ModularGrid rack diagrams referenced via sources links, not included as inline images
- Social share links to blog post as primary URL

## Next Steps

- Debug `seed-blog.js` image index offset (image 10)
- Debug blog inline image sizing for portrait aspect ratios
- Debug work shelf first-card click issue
- Debug work detail lightbox
- Verify `/work/monitor` after CDN propagation or deploy
- Find Konsulat video file for potential YouTube embed replacement
- Upload final hero video to Backblaze CDN when decided
- Move `monitor-blog/` folder out of repo before commit
