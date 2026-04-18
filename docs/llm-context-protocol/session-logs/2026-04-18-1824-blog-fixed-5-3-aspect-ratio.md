# Session Log: Blog Inline Media — Fixed 5:3 Aspect Ratio

**Date:** 2026-04-18
**Status:** Completed

## Overview

Reverted yesterday's dynamic per-asset aspect ratio for blog inline images and switched both images and videos to a fixed 5:3 frame. Discussion on Sanity video CDN behavior concluded with a plan to pre-compress 4K masters to 1080p before upload (Sanity does not transcode video).

## Key Accomplishments

### 1. Fixed 5:3 frame for blog inline images
**File:** `apps/web/src/components/prose/blocks/ImageBlock.jsx`

Replaced the dynamic inline `style={{ aspectRatio }}` (sourced from `value.dimensions.aspectRatio` with a 16/9 fallback) with a fixed `aspect-[5/3]` Tailwind utility. Dropped the `dimensions` destructure. `object-cover` retained, so portrait images crop into the frame — user will swap any awkward portraits in Sanity.

### 2. Fixed 5:3 frame for blog inline videos
**File:** `apps/web/src/components/prose/blocks/VideoBlock.jsx`

Changed the frame from `aspect-video` (16:9) to `aspect-[5/3]`. Applies to both YouTube/Vimeo iframe embeds and uploaded video files.

### 3. Reverted unused Sanity `dimensions` projection
**Files:**
- `packages/content/src/queries.ts` — `BLOG_DETAIL` body
- `apps/web/src/lib/queries.js` — `BLOG_FIELDS` body

Removed the `_type == "image" => { "dimensions": asset->metadata.dimensions }` branch from blog body projections in both query sources. Frame ratio no longer depends on asset metadata. Project-level `media[].dimensions` in `queries.js` left untouched (still used by the Work gallery).

## Files Modified

### Modified Files
- `apps/web/src/components/prose/blocks/ImageBlock.jsx` — fixed `aspect-[5/3]` frame, removed `dimensions` handling
- `apps/web/src/components/prose/blocks/VideoBlock.jsx` — `aspect-video` → `aspect-[5/3]`
- `packages/content/src/queries.ts` — dropped `dimensions` projection from `BLOG_DETAIL` body images
- `apps/web/src/lib/queries.js` — dropped `dimensions` projection from `BLOG_FIELDS` body images

## Issues Encountered

None. Clean revert + new fixed ratio.

## Decisions Made

- **Fixed 5:3 over dynamic asset ratios** — user prefers a defined frame shape for consistency over matching each image's natural dimensions. Portraits will be recropped or swapped in Sanity if they don't fit.
- **Same ratio for images and videos** — unified inline media frame across the post.
- **`object-cover` retained** — user will swap incompatible images in Sanity rather than letterbox.
- **Sanity 4K video → pre-compress to 1080p before upload** — Sanity's asset CDN does not transcode or downscale video (no adaptive streaming, no multiple renditions); uploading 4K means every viewer streams 4K. Mux plugin (`sanity-plugin-mux-input`) is the proper solution for heavy video work, but pre-compression is cheapest for the current single-video blog.

## Next Steps

- User to swap any awkward portrait images in the Monitor blog so they read well in a 5:3 crop
- Pre-compress the Monitor blog video to 1080p before any reseed
- Workshop search crash still needs live repro (carried over)
- `seed-blog.js` placeholder-filename improvement still deferred (carried over)
- System projects (chess, dashboard, design-system, ascii-card, foundry) still need vault folders + seeding (carried over)
- `StudioHero.jsx` cleanup still pending (carried over)
