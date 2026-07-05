---
title: Work Video System (Sanity URL → B2 MP4)
type: reference
status: active
updated: 2026-07-05
description: How work-project videos are stored on B2, referenced by URL (not file) in Sanity, and rendered as in-view-autoplay native <video> — the system that took video bandwidth off Sanity.
tags:
  - domain/cdn
  - provider/backblaze
  - provider/sanity
related:
  - "[[02-cdn-media-library|CDN media library]]"
  - "[[../04-pages/04-work|Work page]]"
---

# Work Video System (Sanity URL → B2 MP4)

The media system for **Work project videos** (hero + gallery on `/work/:slug`). Built 2026-07-05
to stop serving video bytes from Sanity, which had blown the bandwidth quota (one visit to a
video-heavy project autoplayed ~780 MB straight off Sanity's file CDN).

## The split (three layers)

```
B2 (Backblaze)     ← the bytes.   one compressed MP4 + a poster JPG per video
   └ Sanity CMS    ← a URL string. NOT the uploaded file — a `hostedVideo` pointer to B2
       └ frontend  ← native <video src>, poster, autoplay ONLY while in view
```

The rule: **Sanity pairs a video to its project and stores the B2 URL; the bytes live on B2.**
Video bandwidth never touches Sanity again.

## 1. Storage — B2

**Base:** `https://f005.backblazeb2.com/file/kolkrabbi/website/`
**Path:** `hls-library/video-library/work/<slug>/<name>/{video.mp4, poster.jpg}`

- **MP4, not HLS** — despite living under `hls-library/`, work videos are single progressive MP4s
  (`-movflags +faststart`), *not* the HLS `master.m3u8` used by the homepage/collections
  ([[02-cdn-media-library|media library]]). They're muted autoplay loops with no quality
  selector, so single-rung HLS gave zero adaptive benefit — just segment clutter + an hls.js
  dependency. One MP4 plays before full download and loops from the in-memory buffer.
- **`poster.jpg`** sits beside every `video.mp4` in the same folder. The frontend derives the
  poster URL by swapping the filename — it is NOT stored in Sanity.

## 2. Reference — Sanity

Schema lives in `packages/content/src/schemas/` (ARCHITECTURE §5 — schema only in `@kol/content`).

**`hostedVideo` object** (`types/modules.ts`) — the reusable pointer:

| Field | Purpose |
|---|---|
| `src` | B2 CDN URL (the `video.mp4`) — **required** |
| `aspectRatio` | `4:5` (portrait) or `5:3` (landscape) — drives the frame |
| `poster` | Sanity image (optional; **unused** — poster comes from B2, derived from `src`) |
| `alt`, `caption` | text |

**Where it's used on `project`** (`types/project.ts`):

| Field | Type | Role |
|---|---|---|
| `heroVideoSrc` | `hostedVideo` | The hero video |
| `media[]` → `galleryHostedVideo` | `hostedVideo` | Gallery videos (alongside `galleryImage`) |

The old uploaded-file fields (`heroVideo`, `galleryVideo`) were **removed** 2026-07-05 — do not
reintroduce a `type: 'file'` video field. New work videos go on B2 + a `hostedVideo` URL.

## 3. Render — frontend

**Query** (`apps/web/src/lib/queries.js`): emits `heroVideoUrl` / `heroVideoAspect` from
`heroVideoSrc`, and projects each `media[]` item's `url` (hosted `src` for `galleryHostedVideo`,
`asset->url` for images).

**`WorkDetail.jsx`:**
- **`GalleryVideo`** — a `<video>` with **no `autoPlay` attribute**; an `IntersectionObserver`
  calls `play()`/`pause()` on visibility. This is the bandwidth win: a gallery video scrolled
  past never fetches. `preload="metadata"`, `muted`, `playsInline`, `loop`.
- **Hero** — autoplays (above the fold), pauses when scrolled out (its own observer).
- **`b2Poster(url)`** — derives the poster by `video.mp4` → `poster.jpg`.
- **Hosted-twin dedup** — if a legacy `galleryVideo` and its hosted twin (`_key` `hv-<key>`) both
  exist mid-migration, the old one is filtered out. (Post-cutover there are no legacy items.)

**`ImageLightbox.jsx`** — fullscreen: native `<video>` + derived poster.

**Bandwidth model:** cost = first-fetch bytes per *unique in-view* video per visitor. Looping
replays from buffer (no re-download). Scrolled-past gallery videos cost nothing.

## 4. Migration + maintenance scripts

`scripts/` (run from repo root; the `.mjs` use Node global `fetch`, no `@sanity/client` dep):

| Script | Job |
|---|---|
| `migrate-work-videos-to-b2.py` | Phase 2 — download from Sanity → `ffmpeg` transcode (`+faststart`, bitrate ≤ source) + poster → `bucket up` → emits `_tmp/work-video-migration/asset-b2-map.json` |
| `migrate-work-videos-patch-sanity.mjs` | Phase 3 — patch each project: set `heroVideoSrc` / add `galleryHostedVideo` from the map. Dry-run default; `--commit` writes. Idempotent. |
| `migrate-work-videos-delete-sanity.mjs` | Phase 5 — unreference old file fields, then delete the migrated Sanity file assets. Skips any asset still referenced by a non-project doc (blog). Dry-run default; `--commit`. |

The `.mjs` scripts read the published dataset with no token; **writes need a Sanity Editor
token** (`SANITY_WRITE_TOKEN`). Project `to8h15ed`, dataset `projects`.

## 5. Adding a new work video

1. Transcode + upload to `hls-library/video-library/work/<slug>/<name>/` (`video.mp4` +
   `poster.jpg`) — see the transcode step in `migrate-work-videos-to-b2.py`, or `bucket up`.
2. In Sanity, set the project's **Hero Video (B2 CDN)** or add a **Video (B2 CDN)** gallery
   item, pasting the `video.mp4` URL as `src` + picking the aspect ratio.
3. Done — the frontend renders it natively; no rebuild needed (Sanity content is fetched at
   runtime).

## Scope / what still uses Sanity for video

- **Blog `videoBlock`** (`types/modules.ts`) still uses uploaded `file` video — **out of scope**,
  low volume. Two assets shared between a work project and a blog post were deliberately **kept**
  on Sanity during the Phase 5 cleanup (deleting them would break the blog). Migrate the blog
  `videoBlock` to `hostedVideo` if blog video grows.
- **Images** (thumbnails, hero images, gallery images) still come from Sanity's image CDN, but
  every URL is capped with `?w=…&auto=format&fit=max` (see `queries.js`) — that was the other
  half of the bandwidth fix (verified 4.3 MB → 39 KB on a sample).
