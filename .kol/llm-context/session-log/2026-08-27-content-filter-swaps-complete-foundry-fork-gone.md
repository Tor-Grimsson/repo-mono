# Session: Content-filter swaps complete (typefaces · /work) + the foundry fork gone

**Date:** 2026-08-27
**Agent:** Grim
**Summary:** Every content-filter surface in `apps/web` is on the DS family — `/stack`, `/prints`, the typeface library (both call sites) and `/work` (LIST · GRID · shelf) render `ContentFilters` → `ContentCollection` → `ContentCard`/`ContentRow`, with zero local cards. The foundry's local component fork (nine same-named files + three specimen sections + four `ui/` cards + `ui.css` rules) moved up into `kol-foundry` and the site imports the package. Nine tickets filed to kol-ds-ui, every one returned and executed the same day. Packages: theme 0.61.0 → **0.70.0**, component 0.93.1 → **0.102.3**, foundry 0.6.2 → **0.8.1**, content 0.10.2 → **0.11.0**, framework **0.28.0**, icons **0.20.0**, brand **0.1.3**. `/dev/demo` retired.

## Changes Made

### Files Modified
- `apps/web/package.json` · `apps/brand/package.json` — the bumps above; one `kol-component` in each tree throughout
- `routes/foundry/FoundryTypefaces.jsx` — hero on the studio's `SectionHero variant="split" theme="inverse"` (Málrómur still, focus `0% 50%`, overlay 80, panel 40, `heading-01`, headline `Kolkrabbi Foundry<br />Typeface Library`); carousel + `renderTypefaceTitle` gone; grid imported from `@kolkrabbi/kol-foundry` with `onNavigate`; licence `SectionCta` under In Development (licensing page's own line)
- `components/sections/foundry/InDevelopmentSection.jsx` — cards carry an `AssetPlaceholder` visual (family layout + hover), no header icon, no `opacity-60`, default header gap
- `components/sections/foundry/TypefacePage.jsx` — the seven specimen sections import from `@kolkrabbi/kol-foundry`; image-wrapper borders off ×4
- `components/sections/foundry/FoundryOtherTypefaces.jsx` · `GlyphInspector.jsx` (retired later) · `routes/Demo.jsx` (retired) — package imports
- `routes/Work.jsx` — header on `SectionText` (eyebrow + `heading-01` h1, `--kol-content-panel` cap); bar gets LIST/GRID; LIST = `ContentCollection` of `ContentRow work` (content + `work-display-preview` face, `text-2xl md:text-6xl`, `Tag variant="tertiary"`); GRID = `ContentCollection cols={{md:3,xl:4}}` of `ContentCard work`; shelf = `ParallaxShelf renderCard` → the same card on the three-height ladder, caption class `work-shelf`; one local `WorkContentCard` wrapper (ContentCard + content + `WORK_TITLE_FACE` one-line); Tools + Systems ONE shelf; Typefaces shelf shows all five faces (placeholders for the three without projects); a 5th placeholder card on Tools & Systems (fromLeft → head of array); `pb-[100vh]` under the last shelf; `WorkListItem` + the stagger + `EASE` gone
- `styles/ui.css` — foundry rules (`.foundry-title` `.pairing-card` `.feature-card`) + the two row rules deleted; every `/work` rule deleted on its return except **`.work-shelf p.kol-helper-12`** (eyebrow caption — kept until the running server is on kol-content 0.11.0)
- `App.jsx` — `dev/demo` route + lazy import removed
- Lobby: 9 receipts filed + squared (`TypefaceCardAndRow` · `FoundryComponentsReconcile` · `TypefaceCardRevealText` · `FontPreviewNoClamp` · `FontPreviewClampAndBearings` · `FoundrySpecimenSections` · `WorkListingRowsAndFilters` · `CollectionItemMinWidth` · `TagTertiary` · `WorkCardAndShelf`), `ContentRowsAndPrintCard` executed; `lobby/INDEX.md` rows + history; kol-ds-ui ledger rows/history + `_assets/` for three of them

### Features Added/Removed
- **Added (DS, via this repo's tickets):** typeface row/card ink ladder + `reveal` slot · `FOUNDRY_SAMPLE_TEXT` in the card reveal · Font Preview clamp restored + side bearings · text-only `SectionCardItem` · kol-foundry `PairingCard` · one dropdown on roman-only faces · `fg-08` glyph cells · missing glyphs dimmed · borderless variable plate · `ContentFilters` title gap 16 · `ContentRow work` ruled values (168 / 16 / fill thumb / no hairline / hover fg-08) · `container-type` on collection + filters panel · fluid-group right room + `className`/`wrapClassName` · ≤6-value groups stack by default · `.kol-tag--*` carry type · `thumb="fill"` · `SectionText` headlines balance · collection `<li>` `min-w-0` + `minmax(0,1fr)` · `Tag variant="tertiary"` · `ContentCard work` one-line title + uppercase helper meta at inverse 80 · `ParallaxShelf` renders `ContentCard work` + eyebrow caption
- **Removed here:** `TypefaceLibraryItem` · the nine forked foundry files + `TypefaceAlphabet` · `FoundryOpentypeFeatures/TypefaceDetails/TypefacePairing` · `ui/FeatureCard` `FeatureGrid` `PairingCard` `PairingsList` · `routes/Demo.jsx` + `GlyphInspector` `GlyphInspectorGrid` `Extraction` `PanableExtraction` `FontPreviewCard` · `WorkListItem` import · all `.work-*` chrome rules — all in `_tmp/2026-08-27-*/`

## Current State

### Working
- Content-filter surfaces in web: 5/5 on the family (see the table in `lobby/INDEX.md` history). Brand has three NOT on it: `/library` (DS `MediaLibrary` — swap is kol-component-internal, `ContentSetRetirement`), `/icons/:set` (hand grid), `/slide-deck` (`MediaRow`)
- `components/sections/foundry/` = `TypefacePage` · `FoundryOtherTypefaces` · `InDevelopmentSection` only
- Every receipt 🟢; nothing open from this repo in the DS queue

### Known Issues
- **The user's dev server did not pick up several bumps** — three "it's broken again" rounds were a stale module graph (`kol-collection-item` without `min-w-0`, the shelf's old `WorkCard`). Verified each time by reading the live DOM. Restart after every bump before judging
- `/work` shelf still passes `renderCard` (the same card) and `className="work-shelf"` + the local caption rule — both redundant once kol-content 0.11.0 is the running package; drop then. `WORK_TITLE_FACE` carries `truncate`, which the card now does itself — harmless
- Playwright screenshots landed in `_tmp/2026-08-27-work-shots/`
- Working-order rulings from the user today: read the words, not the intent; a ruled value never moves without being named; when a message reads two ways ask the one question; "cement" = it's done, move on — not a memory write

## Next Steps
1. User eyeballs `/work` (LIST · GRID · shelf) after a server restart; then drop `renderCard`, `className="work-shelf"` and the `.work-shelf` rule
2. Brand content-filter surfaces: `/icons/:set` and `/slide-deck` local-first onto the family (bar + collection + a DS comparison item first); `/library` via the DS's own `MediaLibrary` swap
3. `PrintsGridGsap.jsx` still imports `PrintGridCard` — dead file, unrouted; retire on the next sweep
