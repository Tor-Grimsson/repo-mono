# Session Log - 2025-11-27 16:30 UTC

## Agent Info
- **LLM Used**: GPT-4.1
- **Session Started**: 2025-11-27 15:30 UTC
- **Session Ended**: 2025-11-27 16:30 UTC
- **Message Count**: ~120

## What Was Accomplished
- Reworked `FeaturedItemsCarousel` to support a hero layout variant (background image, directional media, overlay text, and simple two-column mode) with per-item overrides.
- Updated Collections Overview to use the hero layout: Flík uses the provided background and simple layout, motion slides fill the card with video overlays, and logomark/illustration/grid entries alternate positions.
- Disabled auto-rotation on the Collections carousel and restored required highlight videos/datasets that had been archived earlier.
- Removed legacy UI components/assets (LanguageSwitcher, RoundedCorners, ClippedImage, RichTextStack, StackedBarChart, MobileControls, ProseContent, SimpleCodeBlocks, VideoPreview) after flagging them in the audit list.
- Archived Pixi implementations in `docs/a-torg/hall-of-mirrors/` before unplugging them from Hall of Mirrors/Copies, then deleted the local Pixi components and removed `pixi.js` from `apps/web` dependencies.

## Files Changed
- `packages/ui/src/organisms/FeaturedItemsCarousel.jsx` – added hero/simple layout variants, overlay support, and layout overrides.
- `apps/web/src/routes/collections/CollectionsOverview.jsx` – wired hero carousel, configured item layouts, restored highlight videos, and disabled auto-rotate.
- `apps/web/src/components/workshop/layout/WorkshopLayout.jsx` & `WorkshopSidebar.jsx` – tweaked height/sticky behavior (sidebar now sticky with 100dvh).
- `apps/web/src/components/workshop/molecules/*` & `effects/PixiImageFilterCanvas.jsx` – removed Pixi variant components (archived copies in docs).
- `apps/web/src/data/workshop/navigation.js`, `ApparatusHallOfMirrors.jsx`, `HallOfCopies.jsx` – replaced Pixi cards with offline placeholders.
- `apps/web/package.json` & `yarn.lock` – removed `pixi.js` dependency.
- `apps/web/src/components/ui/LanguageSwitcher.jsx` etc. – deleted unused components per audit.
- `docs/a-torg/unused-workshop-components.md` – logged audit findings and carousel updates.

## Current State
**What's Working:**
- Collections hero carousel renders hero cards with per-item backgrounds (Flík matches reference layout).
- Hall of Mirrors/Copies show offline cards instead of broken Pixi canvases.
- Highlight videos and hero video load correctly from `apps/web/public/videos`.

**What's In Progress:**
- Sidebar sticky behavior still needs further tuning (user requested revisit later).
- Additional unused-component scans pending for other directories.

**What's Broken/Blocked:**
- Pixi-based functionality intentionally offline until external projects replace them.

## Next Steps
1. Finalize sidebar behavior so it stays fixed without layout bounce on long Workshop pages.
2. Continue auditing other component directories and log/remove unused files cautiously.
3. Reintroduce external Pixi experiences (Hall of Copies/Mirrors) once standalone repos are ready.

## Open Questions/Blockers
- Need confirmation on final sticky-spec for Workshop sidebar (100dvh vs. natural height).
- Await decision on whether remaining flagged components should be archived or refactored.

## Notes
- Restored required videos/datasets after unintended removal earlier; double-check before archiving shared assets.
- Pixi components archived under `docs/a-torg/hall-of-mirrors/` for future reuse.
