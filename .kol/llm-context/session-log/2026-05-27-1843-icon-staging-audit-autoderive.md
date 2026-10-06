# Session Log: Icon staging — audit, manifest, auto-derive twins + knockout fix

**Date:** 2026-05-27
**Status:** Autonomous-safe icon work done. All changes in `apps/brand/src/_staging/icons/` (not wired to any app yet — staging only). No build impact.

## Context

`apps/brand/src/_staging/icons/` is the unfinished canonical icon system: parallel `stroke/` + `solid/` trees (21 categories) curated from a 1744-icon `_pool/`. Goal = mirror stroke/solid so a glyph can toggle styles; eventually supersede both shipped homes (`@kol/loader` 367, `@kol/component` 573). Full audit: `docs/plans/icon-system-audit.md`.

## Tools added (all repeatable, committed to staging)

- `build-manifest.mjs` → `_manifest.json` + `_manifest.md` — per-icon name/category/variant/size/color + summary (twin gaps, size outliers, color violations). The worklist.
- `derive-solid-twins.mjs` — auto-fills stroke-only icons that are pure closed silhouettes (≤3 closed paths) → solid via concatenated `fill-rule="evenodd"` path. Dry-run by default; `--write`.
- `fix-white-knockouts.mjs` — converts `fill="white"` knockouts → transparent evenodd cutouts (single-color currentColor). Skips `stroke="white"` (can't cut a stroke). Dry-run default; `--write`.

## Done

- **Size:** 2 outliers (`files/img-02`, `img-03`, 32px) scale-wrapped to 24-grid (stroke-width 1.5→2 compensated). Now **0 outliers**, uniform 24×24.
- **Twins:** auto-derived **67 solid twins** (auto-fill bucket). Mirrored **479 → 546**, gaps 383 → 316.
- **currentColor:** fixed **73 fill-white knockouts** → evenodd currentColor. Violations **136 → 65**.

## Remaining (all genuine hand-draw — can't be done blind to render without polluting the set)

- **Twins ~271:** 114 stroke-only (of which **45 line-native should STAY stroke-only by design** — wireframe icons like `cube` have no clean solid) + 202 solid-only (outlining a fill isn't mechanical).
- **currentColor 65:** all stroke-white detail lines (wifi-off slash, camera-off, etc.) — need stroke-outline or redraw.
- Approach agreed: triage → auto-derive safe → **hand-draw rest in reviewable category batches** (user is the visual gate; I have no render feedback). px decision = **A** (24 master + size prop; `xs/` tier only for pixel-hinted glyphs).

## Downstream (not started)

Wire staging as the canonical icon package (Icon + `variant: stroke|solid` prop), absorb web's ~400 unique `@kol/component` icons (or usage-scan + drop dead), repoint both apps, delete the two shipped sets.

## Next Steps

1. Hand-draw batches: start `shapes`/`files` solid twins + the 65 stroke-white redraws (review-gated).
2. Then staging→canonical package wiring.
3. Migration (separate track): Icon dual-home resolves *into* this; then Phase 5 formal close + Phase 6. See `docs/status/migration-status-board.md`.
