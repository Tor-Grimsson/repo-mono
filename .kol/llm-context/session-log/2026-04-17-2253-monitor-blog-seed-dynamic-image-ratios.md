# Session Log: Monitor Blog Reseed + Dynamic Blog Image Ratios

**Date:** 2026-04-17
**Status:** Completed

## Overview

Reseeded the Monitor blog post (`blog-voltage-in-the-browser`) to Sanity with the latest draft (`_blog-5.md`), cleaned up punctuation (em-dash reduction + closing spacing), and fixed blog inline images to render at real Sanity aspect ratios instead of forced 16:9 — matching the Work gallery pattern.

## Key Accomplishments

### 1. Image Placeholder Fix in Blog Draft
**File:** `docs/a-torg/monitor-blog/_blog-5.md`

Moved `[image: 09.png]` from line 212 (bottom) to line 103 (replacing an empty `[image]` placeholder after the first paragraph).

### 2. Punctuation Cleanup — Em Dash Reduction
**File:** `docs/a-torg/monitor-blog/_blog-5.md`

Reduced 15 spaced em dashes in prose → 2. The two kept are close-set parenthetical asides (primitives list in §Math as Voltage, Maths module description in §Ported, Not Imported). Replacements used: 9 colons, 3 semicolons, 1 comma, plus 2 spacing fixes on remaining em dashes. Also fixed one bullet in the YAML TOC that had become a YAML mapping after `—` → `:` conversion (quoted it).

### 3. Blog Folder Cleanup for Seeding
**Folder:** `docs/a-torg/monitor-blog/`

- Deleted older drafts: `_blog.md`, `_blog-2.md`, `_blog-3.md`, `_blog-4.md`
- Renamed `_blog-5.md` → `_blog.md` (seed script requires this exact filename)
- Renamed images to match body placeholder order (since `seed-blog.js` consumes images in folder-sort order, ignoring the filename in the placeholder):
  - Deleted unreferenced `images/01.png`
  - `images/09.png` → `01.png` (now first in body)
  - `images/10.png` → `09.png` (now last in body)
- Updated body placeholders in `_blog.md` to match new filenames: `[image: 09.png]` → `[image: 01.png]` (line 103), `[image: 10.png]` → `[image: 09.png]` (line 227)

### 4. Seeded Blog to Sanity
**Command:** `node packages/content/scripts/seed-blog.js "docs/a-torg/monitor-blog"`

Uploaded cover, thumbnail, 9 inline images (in body order), 1 inline video, 1 YouTube embed, and 61 body blocks. Document ID: `blog-voltage-in-the-browser`. First seed attempt failed with `Attribute name "Filter, delay, reverb" contains invalid characters` because the YAML TOC bullet `- Filter, delay, reverb: one logic, three behaviors` was parsed as a key-value mapping. Fixed by quoting the bullet.

### 5. Dynamic Aspect Ratios for Blog Inline Images
**Files:**
- `packages/content/src/queries.ts` — `BLOG_DETAIL` query
- `apps/web/src/lib/queries.js` — `BLOG_FIELDS` (for other blog routes)
- `apps/web/src/components/prose/blocks/ImageBlock.jsx`

Added `"dimensions": asset->metadata.dimensions` projection for `_type == "image"` body blocks in both GROQ query sources. Updated `ImageBlock.jsx` to read `value.dimensions?.aspectRatio` and apply it as an inline `style={{ aspectRatio }}` on the wrapper div, replacing the fixed `aspect-video` class. Falls back to 16/9 if metadata is missing. `VideoBlock.jsx` kept at `aspect-video` since video assets don't carry `metadata.dimensions`. Matches the pattern already used in `WorkDetail.jsx:54`.

## Files Modified

### New Files
- `docs/llm-context-protocol/session-logs/2026-04-17-2253-monitor-blog-seed-dynamic-image-ratios.md` — this log

### Renamed/Deleted Files
- `docs/a-torg/monitor-blog/_blog-5.md` → `_blog.md`
- Deleted: `docs/a-torg/monitor-blog/_blog.md` (old), `_blog-2.md`, `_blog-3.md`, `_blog-4.md`
- `docs/a-torg/monitor-blog/images/09.png` → `01.png`
- `docs/a-torg/monitor-blog/images/10.png` → `09.png`
- Deleted: `docs/a-torg/monitor-blog/images/01.png` (original, unreferenced)

### Modified Files
- `docs/a-torg/monitor-blog/_blog.md` — punctuation cleanup (em-dash reduction), image placeholder renames to match file order, TOC bullet quoted to avoid YAML mapping parse
- `packages/content/src/queries.ts` — `BLOG_DETAIL` body projection adds `"dimensions": asset->metadata.dimensions` for image blocks
- `apps/web/src/lib/queries.js` — `BLOG_FIELDS` body projection adds same dimensions projection (for StackBlog, StackDetail, Stack listing, CmsGlobal)
- `apps/web/src/components/prose/blocks/ImageBlock.jsx` — replaced fixed `aspect-video` class with dynamic inline `style={{ aspectRatio }}` from `value.dimensions.aspectRatio`, 16/9 fallback

## Issues Encountered

### 1. Wrong Query File Edited First
- **Problem:** After the query + component edit, blog images were still rendering at 16:9. I had only edited `apps/web/src/lib/queries.js`, but `StackArticle.jsx:154` actually fetches via `BLOG_DETAIL` from `@kol/content/frontend` → `packages/content/src/queries.ts`.
- **Resolution:** Added the same `dimensions` projection to `packages/content/src/queries.ts`. The edit to `apps/web/src/lib/queries.js` is still valid — it's used by StackBlog, StackDetail, Stack listing, and CmsGlobal.

### 2. YAML Bullet Became a Mapping
- **Problem:** Replacing `—` with `:` in TOC bullet `- Filter, delay, reverb: one logic, three behaviors` caused YAML parser to treat it as a key-value pair; Sanity rejected the resulting attribute name.
- **Resolution:** Quoted the bullet: `- "Filter, delay, reverb: one logic, three behaviors"`.

### 3. Seed Script Ignores Placeholder Filenames
- **Problem:** `seed-blog.js` maps `[image: NN.png]` placeholders to images in folder-sort order, ignoring the filename in the tag. Moving image 09 to line 103 in markdown wouldn't reflect in Sanity without renaming.
- **Resolution:** Renamed image files so folder order matches body placeholder order (old 09→01, old 10→09), and updated body tags to match new filenames. Discussed fixing the script instead (option C) but went with rename for simplicity.

## Decisions Made

- Reduce em dashes across the post; keep only close-set parentheticals where internal commas would make alternatives ambiguous
- Blog inline images go dynamic (matching Work's pattern of reading real Sanity dimensions), not a fixed 5:3 — user originally asked about 5:3 "to match work" but Work itself uses dynamic ratios
- Videos kept at 16:9 — video assets don't expose `metadata.dimensions` the same way images do, and 16:9 is the sane default
- Kept `apps/web/src/lib/queries.js` dimensions projection even though not needed for StackArticle — it's used by other blog routes and should stay consistent

## Next Steps

- User verified: blog images now render at real aspect ratios (portrait images like `06` display as 3:5 instead of being cropped)
- Monitor launch bugs still open per memory: blog portrait image sizing (likely resolved by this change), image 10 missing in seed (resolved — file renumbered), and non-blog items (shelf double-click, YouTube branding — already fixed in prior sessions)
- Workshop search crash still needs live repro — carried over
- `seed-blog.js` could be improved to honor placeholder filenames instead of consuming images in folder order, but not urgent
