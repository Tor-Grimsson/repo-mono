# Session Log: Monitor Home Card Swap + Umami Tracking on monitor.kolkrabbi.io

**Date:** 2026-04-18
**Status:** Completed

## Overview

Swapped the homepage Monitor bento card video and poster to new `monitor.mp4` / `monitor.png` assets. Added the main-site Umami tracking script to the standalone `monitor.kolkrabbi.io` Vercel repo (same `website-id` as main site — visits merge into `/metrics` totals). Also surfaced an OG-image inconsistency between the Stack front page and the share endpoint that's worth addressing later.

## Key Accomplishments

### 1. Swapped Monitor home card video + poster
**File:** `apps/web/src/components/sections/home/HomeHighlights.jsx`

- `src`: `/img/home-highlight/12.mp4` → `/img/home-highlight/monitor.mp4`
- `poster`: `/img/home-highlight/hl-monitor-1200.png` → `/img/home-highlight/monitor.png`

Old `12.mp4` and `hl-monitor-1200.png` are safe to delete — only references are in an older session log (`2026-04-09-0536-monitor-blog-work-home.md`). User put the new asset files in place.

### 2. Umami tracking on monitor.kolkrabbi.io
**File (external repo):** `index.html` of the `kol-monitor` Vercel project

Added the main-site Umami tracking tag just above `</head>`:

```html
<script defer src="https://kol-umami.vercel.app/script.js" data-website-id="fcd04534-5dcd-44a3-b7b1-256cbdf49ab9"></script>
```

Chose **option 1** (same `website-id` as main site) — pageviews merge into `/metrics` totals, but each event still carries the hostname, so the data is separable later if we want a per-subdomain breakdown. No changes to Vercel config needed — static `index.html` is served as-is.

Testing blocked: `IGNORE_IP` env var on kol-umami Vercel project filters user's IP, and user has no cellular data or VPN available. Will confirm visits land organically once traffic hits the subdomain.

## Files Modified

### Modified Files (this repo)
- `apps/web/src/components/sections/home/HomeHighlights.jsx` — Monitor bento card `src` + `poster` swapped to `monitor.mp4` / `monitor.png`

### Modified Files (external — kol-monitor repo)
- `index.html` — added Umami tracking script tag before `</head>`

### New Files (public/)
- `apps/web/public/img/home-highlight/monitor.mp4` — new Monitor card video (user-added)
- `apps/web/public/img/home-highlight/monitor.png` — new Monitor card poster (user-added)

### Safe to Delete
- `apps/web/public/img/home-highlight/12.mp4` — old Conway Life card video, no live references
- `apps/web/public/img/home-highlight/hl-monitor-1200.png` — old card poster, no live references

## Discoveries / Flagged

### 1. Stack OG image source is inconsistent with front-page hero
- **Stack front page** (`apps/web/src/routes/Stack.jsx:20, 37`) — featured + grid cards use `coverImage` (Sanity field titled "Hero Image") with `thumbnail` fallback.
- **Share endpoint** (`apps/web/api/share/stack/[slug].js:54-57`) — OG/social previews use `thumbnail` first, then `coverImage`, then a site default.
- **Blog schema** (`packages/content/src/schemas/types/blog.ts:281-285`) — defines a `seo.ogImage` field that neither surface currently consumes.

Result: a given article can show one image on the Stack page and a different image on socials, and the dedicated OG field is dead. Candidate follow-up: align priority (probably `seo.ogImage` → `coverImage` → `thumbnail` → default for the share endpoint; decide whether the front page should also prefer `seo.ogImage`).

### 2. Sanity asset CDN does not transcode video
User asked about 4K handling. Sanity's asset CDN serves video as-is — no transcoding, no adaptive streaming, no multiple renditions. Standard path going forward:
- **Default**: pre-compress masters to 1080p (≈5–8 Mbps H.264) before upload
- **If video volume grows**: adopt `sanity-plugin-mux-input` for adaptive streaming

## Issues Encountered

None blocking. Umami verification deferred to organic traffic due to the IP-filter + no cellular/VPN constraint.

## Next Steps

- Wait for organic traffic to confirm Umami pageviews for `monitor.kolkrabbi.io` land in `/metrics`
- Delete `apps/web/public/img/home-highlight/12.mp4` and `hl-monitor-1200.png` once confirmed unused
- Decide on an OG-image priority across Stack surfaces and wire `seo.ogImage` into the share endpoint (and possibly the front page)
- Carried over: workshop search crash needs live repro, `seed-blog.js` placeholder-filename improvement, system projects need vault folders + seeding, `StudioHero.jsx` cleanup, swap any portrait blog images that don't read well in 5:3, pre-compress Monitor blog video to 1080p before any reseed
