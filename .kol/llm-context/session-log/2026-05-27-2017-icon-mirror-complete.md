# Session Log: Icon stroke/solid mirror — COMPLETE + styleguide wired + visual QA

**Date:** 2026-05-27
**Status:** Completed (drawing/cleanup). Packaging into a shared pkg = paused on user decision.

## Overview

Finished the `apps/brand/src/_staging/icons` stroke/solid mirrored set: every mirrorable icon now has both variants, all currentColor, uniform 24×24. Repointed the brand styleguide icon pages to the live staging trees, visually QA'd the riskiest blind-authored twins (screenshot via Playwright) and fixed 3 mismatches. Attempted the package-wiring migration; paused it (blocked on an unanswered architectural decision + irreversible deletion).

## Key Accomplishments

### 1. Closed all twin gaps (383 → 0 mirrorable)
- Auto-derive (all-closed silhouettes → solid, evenodd): 76.
- Mixed-fill (closed subpaths of mixed icons → solid): 27.
- Hand/scripted twins across every category: files, navigation, communication, user, typography, shapes, layout, system, editing, misc (~250 icons).
- End state: **862 names, 830 mirrored, 32 line-native single-variant by design** (wireframes like `cube`, math-sets — no clean solid).

### 2. currentColor: 136 → 0 violations
- 73 fill-white knockouts → `fill-rule="evenodd"` transparent cutouts.
- 65 stroke-white knockouts → `<mask>` (unique id `ko-{cat}-{name}`; base in `<g fill=currentColor>` masked by white-rect-minus-black-knockout). True single-color, themeable, works for stroke knockouts.
- Manifest color-scan updated to ignore `<mask>`/`<defs>` internals.

### 3. Size: 2 outliers → 0 (uniform 24×24)
- `files/img-02`, `img-03` (32px) scale-wrapped to 24-grid (stroke-width compensated).

### 4. Styleguide pages repointed to live staging set
- `Icons.jsx` + `IconsVariants.jsx` now `import.meta.glob` the `_staging/{stroke,solid}` trees (was `@kol/loader` + `_pool.json`). Variants page got a **Mirror filter** (both / stroke-only / solid-only); shows the generated twins + knockout fixes.

### 5. Visual QA (closed the blind-authoring gap)
- Launched brand vite (5179), injected a grid of 61 riskiest twins, screenshot via Playwright. ~90% clean. Fixed 3 mismatches: `misc/football` (→ soccer), `misc/joystick` (→ gamepad), `shapes/circle-1` (→ segmented ring). Re-verified. Cleaned all QA artifacts + stopped server.

## Files Modified

### New (in `apps/brand/src/_staging/icons/`)
- `build-manifest.mjs`, `derive-solid-twins.mjs`, `fix-white-knockouts.mjs` — repeatable tools.
- `_manifest.json` / `_manifest.md` — per-icon name/category/variant/size/color + gap lists.
- ~250 new `stroke/**` and `solid/**` SVGs (the drawn twins) + 76+27 auto-derived solids.

### Modified
- `apps/brand/src/pages/Icons.jsx`, `apps/brand/src/pages/IconsVariants.jsx` — source from `_staging` trees.
- ~140 solid SVGs (knockout fixes), 2 stroke SVGs (size normalize), 3 stroke SVGs (QA fixes).
- `docs/plans/icon-system-audit.md` (audit, created earlier this cycle).

## Issues Encountered

### 1. Stroke→solid is a redraw, not a transform
- **Problem:** ~250 twins couldn't be mechanically generated; authored blind (no agent-side render).
- **Resolution:** Scripted/standard forms + a Playwright screenshot QA pass to catch mismatches. **Caveat: the ~190 not individually screenshotted are visually approximate — review on `/icons/variants`.**

### 2. Packaging migration paused (blocked)
- **Problem:** Tried to fold the set into `@kol/loader` + delete `_staging` sources. Auto-mode classifier denied the `rm -rf` — correctly: the package-home choice was an open audit decision the user never answered, and web has ~400 orphan icons (only 169/573 overlap) that a swap would break.
- **Resolution:** Reverted (removed the additive stray copy in the package). `_staging` untouched. Awaiting user decision.

## Next Steps (packaging — needs user decision)

1. **Package home:** fold into `@kol/loader`, or new `@kol/icons`?
2. **Web orphans:** usage-scan web → port live orphans into canonical set → then retire `@kol/component/icons` (573). Or keep it as a fallback layer.
3. Then: variant-aware `Icon` (`variant: stroke|solid`), repoint both apps (web's 33 sites via `@kol/ui`, brand's 7), build-gate, delete old homes.
4. **Visual review** of the remaining ~190 blind-authored twins on `/icons/variants`.

## Addendum — devex (same session)

- **`/icons` STYLE toggle** — added a Stroke/Fill `SegGroup` on `Icons.jsx` next to SIZE; globs both staging trees, merges by name, toggle picks the variant (line-native falls back to stroke in FILL mode).
- **Root `pnpm dev`** — new `"dev": "turbo run dev --filter=web --filter=studio --filter=brand"` (runs all three concurrently).
- **Pinned dev ports** (predictable + `strictPort`): web **5173** (`apps/web/vite.config.js`), brand **5174** (`apps/brand/vite.config.js`), studio **3333** (`apps/studio/sanity.cli.ts` `server.port`).
