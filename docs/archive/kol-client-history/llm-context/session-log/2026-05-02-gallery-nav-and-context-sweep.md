# Session: Gallery sidebar wiring, photo-manifest path fixes, AGENT-CONTEXT body sweep

**Date:** 2026-05-02
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Post-refactor cleanup. Surfaced + fixed three latent path bugs (photos manifest, vite middleware, Landing hero image), wired `/gallery` into the sidebar with `BrandLayout` so it has navbar chrome, fixed sidebar toggle z-index clipping, then swept the AGENT-CONTEXT body for stale labels left over from earlier phases.

## Changes Made

### Files Modified

**Path / route fixes**
- `scripts/build-photos-manifest.js` — `IMAGES_DIR` repointed from `public/brand/images` → `public/images` (matches where photos live after the AC strip). URL prefix in output also flipped from `/brand/images/...` → `/images/...`. Also kept the soft-fail behavior added earlier (writes empty manifest if dir missing instead of `process.exit(1)`).
- `vite.config.js` — `photoIndexPlugin({ photosDir: 'public/brand/images' })` → `photoIndexPlugin({ photosDir: 'public/images' })`. The dev middleware was the actual source of `/__photos.json` in dev (the static manifest only matters in prod) so it had to move too.
- `src/components/tools/Gallery.jsx` — empty-state message now says "Drop folders into `public/images/<group>/`" (was `public/brand/images/`).
- `src/pages/Landing.jsx` — `HERO_IMAGE` repointed from `/brand/images/kol-photoshoot/thg-01.jpg` → `/images/kol-photoshoot/thg-01.jpg`.

**Gallery sidebar wiring**
- `src/App.jsx` — `/gallery` route moved out of the no-chrome top-level slot and into the `BrandLayout` nest (between `/styleguide` and `/reference`). Gallery now renders with the standard sidenav.
- `src/components/framework/sidebars.config.js` — top-level `Gallery` entry added between `Styleguide` and `Reference` (`{ id: 'gallery', label: 'Gallery', to: '/gallery', icon: 'image' }`).
- `src/components/framework/SideNav.jsx` — sidebar `<aside>` z-index bumped `z-10` → `z-20` to keep its `right-[-12px]` collapse/expand toggle handle on top of content. Gallery's sticky internal header has `zIndex: 10` and was covering the toggle's overhanging 12px since they were tied at `z-10` and Gallery rendered later in DOM order.

**AGENT-CONTEXT body sweep**
- `docs/llm-context/AGENT-CONTEXT.md` — refreshed every body section to match current reality:
  - **Surviving surfaces:** dropped `/demo` (renamed to `/components` 2026-05-01), dropped `/demo/runway-v1`–`v4` (no longer in `App.jsx`), dropped "dev" from `/gallery`, added `/components` + `/slide-deck`, noted Gallery's new `BrandLayout` wrap.
  - **Asset layer:** `AcLogo` → `KolLogo`, paths updated to `src/brand/logos/svg/kol-*.svg` (Phase 5e + today's relocate), photo lib path `public/brand/images/` → `public/images/`, signature-icon line dropped (folder no longer exists).
  - **Marketing site:** data deps now at `src/brand/data/`, `ac-images.js` → `kol-images.js`.
  - **Live-CSS pattern:** `/demo` ref → `/components`.
  - **Data-driven pattern:** `src/data/system/typography.js` → `src/data/typography.js` (flattened today). Mentions `color.js` + `components.js` already shipped under same pattern.
  - **What's pending:** dropped 3 closed items (brand identity rename, code rename, guides strip) into a new "Closed since last context refresh" subsection. Added `kol-site.css` deletion + `kol-framework` package setup as new pending items. Reframed the AC-residue stale path issue (it's now `/brand/images/ac-*` paths in `src/brand/data/*-data.js` files — TWO compounding issues: photos moved + ac-named subfolders don't exist).
  - **Key files and their roles:** rebuilt the table to reflect the four-layer split. Added `src/brand/*` rows, `src/components/framework/*` row, `src/components/styleguide/*` row, the 3-file components CSS split, the flattened DS data files. Pointed at `docs/repo-setup/src-layout.md` for the full map.
  - **Critical consistency seams:** `src/brand.config.js` → `src/brand/config.js`, `src/components/navigation/sidebars.config.js` → `src/components/framework/sidebars.config.js`, added a third seam covering the upstream-package sync.
  - **Known gotchas:** dropped two stale items (`package.json` rename was completed in Phase 7; AC-prefixed SVG filenames were renamed in Phase 5e). Added three real current ones: `kol-typography-fonts-full.css` is generator-specific not DS, `kol-site.css` still imported despite no `/site/*` routes, `kol-loader` icon registry's rack bucket lists chevrons that moved to `00-kol/`.

### Features Added/Removed

- **Added:** `/gallery` accessible from the sidebar with full `BrandLayout` chrome (still has its dark dev-tool aesthetic internally — that wasn't touched).
- **Removed:** none.
- **Fixed:** photos no longer 404 in dev (`/__photos.json` middleware reads correct dir), Gallery dev tool now finds the 4 groups / 19 files, Landing hero image renders, sidebar toggle handle no longer clipped on Gallery (or any other content with `z-10` chrome).

## Current State

### Working

- `/gallery` reachable from the sidebar, lists Gallery alongside Styleguide / Reference / Compose / Generators / Components.
- Photos resolve at `/images/...` URLs in both dev (via `photoIndexPlugin` middleware) and prod (via static `public/__photos.json`, regenerated).
- Sidebar collapse/expand toggle visible above Gallery's sticky header.
- AGENT-CONTEXT.md body matches today's actual repo state — no more "/gallery — dev photo-lookup tool" / `AcLogo` / `src/brand.config.js` / `src/data/brand-info.js` / `public/brand/images/` drift.

### Known Issues

- `src/brand/data/{blog,shop,collections,kol-images}-data.js` still hard-code `/brand/images/ac-*` URLs. Two compounding issues — photos moved (`public/brand/images/` → `public/images/`) AND the AC-named subfolders never existed in the new layout. Acyr article previews 404 until the data files are rewritten or removed.
- `src/index.css` still imports `kol-site.css` (legacy marketing-site chrome) even though `/site/*` routes are gone.
- Dead `Enter site` link in `src/pages/Landing.jsx` line 36 → 404.
- `kol-loader/src/icons/index.js` registry's `rack` bucket still lists chevrons that physically live under `00-kol/`. Cosmetic — Icon.jsx resolves by filename via glob, runtime works.

### Verification

- Vite HMR validated all moves end-to-end across the prior session and this one. Manifest regenerated successfully (4 groups / 19 files). Sidebar toggle visible on `/gallery` after the z-20 bump.

## Next Steps

1. Rewrite or delete `src/brand/data/{blog,shop,collections,kol-images}-data.js`. They're the last AC-residue blocker on `/reference/acyr` previews.
2. Delete `src/index.css` import of `kol-site.css` + remove the file. `/site/*` is gone.
3. Fix `Enter site` link in `Landing.jsx` (or remove the button).
4. String sweep "Another Creation" → "Kolkrabbi" across Styleguide prose / slide-layouts comments / Runway decks.
5. Optional: realign `kol-loader/src/icons/index.js` registry buckets with the actual SVG folders.
