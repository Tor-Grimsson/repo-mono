# Session Log: `--kol-oq-*` opaque grey scale + grey-system cleanup

**Date:** 2026-05-27
**Status:** Core shipped + build green (5/5, forced). Brand rename + deep-doc/styleguide remain.

## Summary

Introduced a canonical **opaque neutral scale `--kol-oq-*`** — the solid mirror of the transparent `--kol-fg-*` scale — and tore out the three redundant/legacy solid-grey systems from web (`opacity-hex`, `--kol-color-neutral-*`, `--kol-container-*`, `--kol-color-median-*`). `fg` = transparent (alpha), `oq` = opaque (solid): same 14 stops, same source ink, `transparent` → surface is the only difference.

## Decisions (locked across the session)
- **Name `--kol-oq-*`** (from opa**q**ue; 2-char twin of `fg`). Rejected opacity-hex (mouthful, "opacity" misreads as transparent), `fg-opaq` (couples to fg/foreground role), `opa`/`que`/`opaque`.
- **Stops mirror `fg`'s 14:** `01 02 04 08 12 16 24 32 40 48 64 80 88 96`.
- **Def:** `color-mix(in srgb, var(--kol-surface-on-primary) NN%, var(--kol-surface-primary))` + inverse tier onto `--kol-surface-inverse`. Auto-themes (no hardcoded light/dark). Absolute tier deferred (no real consumer; the one `opacity-hex-fixed-88` ref was undefined/dead).
- `fg` is **transparent**, not grey — different primitive from solid `oq`. (Repeated user correction; saved to memory.)

## Changed
- **NEW `packages/theme/kol-opaque.css`** — full `oq` scale (28 tokens + bg/text/border × standard/inverse + bg hover). Imported into `@kol/theme/kol-theme.css` umbrella → brand has it; imported into `apps/web/src/index.css` → web has it.
- **`packages/ui/theme.css`** — deleted `--kol-opacity-hex-*` (light+dark, +inverse, 48 decls), `--kol-color-neutral-50…900`, `--kol-container-*` (light+dark+hover/active), `--kol-color-median-*`.
- **`packages/ui/css/utilities.css`** — deleted all `opacity-hex` classes (84), the `.bg-container-*` family, container dark-remap, container hover/active classes.
- **Consumers repointed:** opacity-hex → `oq` (same stop number) across 9 files incl. AlternativeControlsMock (chess apparatus, CardFeatures, GameSelector, NotationPanel, PlaybackControls, VariationTree, WorkshopFeatures, CollectionCard, FeaturedItemsCarousel). `--kol-color-neutral-200/700` → `oq-08/16` (blog + prose ArticleCard). `bg-container-primary` → `bg-surface-secondary`, `secondary`/`elevated` → `bg-surface-tertiary` across ~13 files (incl shared @kol/ui: CarouselNavigation, ViewToggle, LinkCard, ContentFilters, FeaturedItemsCarousel, FeaturedCarousel). `--kol-container-primary` (WavyCircleControls) → `bg-surface-secondary`.
- **`docs/documentation/02-design-system/2.1.1-colors-cheat-sheet.md`** — removed Containers + both Opacity-Hex sections, added the `oq` section, fixed State-Utilities + Quick-Reference.

## Verified
- `pnpm exec turbo run build --force` → **5/5 green** (web, studio, brand, chess-data, fontviewer).
- 0 `opacity-hex` / deleted-token refs remain outside `Colors.jsx` styleguide.

## Not done / decided-against
- **Brand `--grey-*` → oq alias: SKIPPED by design.** It's used in ~100 places in `deckStyles.js` as a FIXED scale (light text on dark slides); aliasing to theme-flipping `oq` would invert decks in dark mode. Brand `--grey` stays static — the legitimate fixed-grey case (drift §13).
- **Status promotion: already done.** Canonical status lives in `@kol/theme/kol-color.css` as `--ui-error/warning/info/success` (+ `--color-ui-*` Tailwind). Brand consumes it via the umbrella — not broken. Web has a separate `--kol-status-danger` (danger-only); naming drift folds into the deferred web→canonical migration.

## Next Steps — all SHIPPED this session (build green 5/5 each gate)
1. ✅ **Brand token rename** — `--brand-*` → `--kol-color-*` (hues) + `--kol-accent-*` (identity); cream → `--kol-color-cream-*`; grey stays fixed (deck scale). `@theme` exposures renamed (`bg-kol-*`); 60 consumer refs repointed across kol-framework.css / kol-site.css / AssetTable.jsx / TypeFrame.jsx; `color.js` styleguide data generator + alias rows fixed. "brand" now exists only as the app name.
2. ✅ **`Colors.jsx` styleguide** — removed container entries + container/neutral/opacity-hex tables + container state rows + `containerRows`; repointed `PairVariant` + support-surface median refs (→ absolute / surface-support-split); replaced neutral/opacity-hex cards with an `oq` card.
3. ✅ **`2.1.0-colors.md`** — container token block + Surfaces/Containers section rewritten (container removed); Opacity-Hex section header redirected to `oq` (legacy hex tables kept + labeled "migration reference only"); overview count fixed.

## Still open (minor / separate)
- Web's own `--kol-color-brand-*` accent primitives (`packages/ui/theme.css`) are also a "brand" misnomer — optional web-side rename (separate from the apps/brand rename, which is done).
- `oq` **absolute tier** (`oq-absolute-*`) deferred — no real consumer (the one `opacity-hex-fixed-88` ref was already dead).
- `2.1.0-colors.md` still contains scattered legacy hex tables, intentionally retained + labeled as migration reference.
