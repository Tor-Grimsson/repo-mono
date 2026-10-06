# Session Log: Reusable-component sweep → 53 lobby specs + coverage doc

**Date:** 2026-07-03
**Status:** Completed
**Agent:** Claude Opus 4.8 (1M context) — Grim

## Overview

Swept **kol-monorepo** (`apps/web` + `apps/brand`) for reusable UI components and staged
**53 briefs** into the `kol-design-system/lobby/` intake bay (spec-not-source, per the
`kol-lobby` skill). Every candidate was cross-checked against **both** DS packages
(`@kol/component` + `@kol/ui`) so nothing already shipped was re-staged. Then wrote a
**coverage audit** so missed folders are visible.

## Changes Made

### New (in kol-design-system, sibling repo)
- `lobby/*.md` — **53 component specs** + 53 rows appended to `lobby/INDEX.md` Queue.

### New (this repo)
- `docs/status/01-component-scan-coverage.md` — audit doc (kol-docs framework): what was swept, what was NOT, ranked gaps.

## What was staged (by set) — 80 total
- Web primitives (4) · effects (6, incl. TextPressure) · brand layout + EditorButton (4) · overlays (2) · type-specimen kit (4) · color-specimen kit (3, hand-authored — agent died twice) · **app shell/chrome (6)** · **foundry type-specimen (8)** · CMS work+stack (6) · loader (3) · **work-index chrome (5: WorkCard, WorkListItem, GalleryCarousel, WorkViewToggle, ParallaxShelf)** · **print store (5: PriceDisplay, SpecList, DiagonalMarqueeRiver GSAP grid, ScrollDriftGallery, ProductDetailLayout)** · **brand editor chrome (12: Canvas stage, SelectionOverlay, EditorShell+registry, TabsRow, SpectrumControls HSV picker, SwatchControls, ColorField, SwatchRow, ToolButton+ShapeDropdown, CurveOverlay, AlignmentGrid, Placeholder)** · **layout/section-organism taxonomy (10: FullBleedHero, StudioHero, OverlayGlassPanel, FeaturedCarousel→converge, FramedMediaBand, FeaturesCardSection, CardFeatureItem, CtaGlobal, NewsletterBand, ChapterNavigation)** — prints + editor + layouts swept after the initial 53, per user flags. Both apps now fully swept.

## Current State

### Working
- 53 specs on disk, INDEX queue complete. Highest-value: the shell set (no DS topnav/footer/drawer today), `PortableTextRenderer` (missing Sanity→React mapper), `GlyphMetricsGrid` (font-metrics engine).

### Known Issues / flags
- Two authoring agents hit a transient skill-router hiccup (0 tool-calls); color-specimen failed twice → authored by hand. All 53 verified present.
- **Coverage gaps (see the audit doc):** `web/routes/prints/` (6), `brand/src/editor/` (60 jsx, only EditorButton pulled), `web/routes/collections/` (5), Home marketing sections, Metrics — all UNSWEPT.
- **Delete-candidates found, not promoted:** stale local copies `prose/blocks/StickyNavCard`, two `SourcesList`, dup PortableText map (`portable-text/components.jsx`).

## Next Steps
1. **Both apps fully swept** (web + brand): prints, brand/editor (12), and the layout/section-organism taxonomy (10) all done. Remaining surfaces are low-payoff (Metrics welded dashboard, demo/test pages, brand/pages) or excluded (collections = outdated).
2. DS agent recreates from the 80-item lobby queue → move entries to `lobby/done/`.
3. Cleanup (separate from promotion): delete dead files (StackBlog/StackDetail, orphaned ArticleLayout/StudioHero/ChapterNavigation); dedupe 3 feature grids → FeaturesCardSection; CtaWork/CtaFoundry → CtaGlobal; StudioProcessCard → FeatureSplit.

## Note
- The `__TITLE__` meta bug fix was a separate earlier session today (`2026-07-03-0720-metadata-title-placeholder-homepage-fix.md`).
