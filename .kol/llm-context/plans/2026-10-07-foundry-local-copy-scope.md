# Disconnect kol-foundry from the design system, keep it local — scope

**Date:** 2026-10-07 · read-only scope, nothing changed.
**Question (user):** the foundry has a lot of bugs; instead of ticketing each to kol-ds-ui, take `@kolkrabbi/kol-foundry` local and own it here.
**Verdict:** small to do, real to give up. 36 files / 4,979 lines, no dependencies of its own, this site is its only consumer. A morning to copy; after it, no foundry fixes flow either way between here and ui.kolkrabbi.io.
**State:** PARKED by the user — "not now, another session". Not started.

---

## 1. What the package is today

| | |
|---|---|
| Version here | `@kolkrabbi/kol-foundry` ^0.12.0 |
| Source | 36 files, 4,979 lines — `engine/` (FontLoader, GlyphAnimator, MetricsOverlay, VariationAxes …) and the specimen sections |
| Its own deps | none; peers `kol-component` (22 imports) · `kol-theme` · `kol-icons` · react · framer-motion · opentype.js |
| Its styles | **not in the package** — kol-theme's `kol-components-foundry.css` (303 lines, 5 `.kol-*` classes), imported by `kol-theme.css` |
| Consumers | this site only (`routes/foundry/*`, `sections/foundry/*`: `TypefaceLibraryGridWithVariables` + `TypefaceStyleSection · FontPreviewSection · VariableFontSection · GlyphMetricsSection · FoundryOpentypeFeatures · FoundryTypefaceDetails · FoundryTypefacePairing`). Nothing else on the machine imports it; the DS showcase renders its own copy |
| Lobby traffic | 12 of this repo's receipts are foundry round-trips (`FoundrySpecimenSections`, `FoundryComponentsReconcile`, the `FontPreview*`, `TypefaceCard*` and `TypefaceRow*` family) |

## 2. The copy

1. `node_modules/@kolkrabbi/kol-foundry/src` → `packages/foundry` as `@kol/foundry` — the shape `ARCHITECTURE` §1 and §6 already name; `packages/content` is the live precedent. Its `kol-component` / `kol-icons` imports stay as they are: only the foundry layer comes local.
2. The styles: bring `kol-components-foundry.css` into the package (the full disconnect) — leaving it in the theme means a theme bump can still move the foundry's look.
3. Rewire web: the two import sites; the dependency, the `@source` line (`index.css:19`) and the `optimizeDeps` entry (`vite.config.js:22`) out; the local package's `src` in as a Tailwind source.
4. Build; render `/foundry`, the five typeface pages and `/foundry/licensing` against today's build at 1440 and 390 before any bug is touched.
5. Then the user's bug list, fixed here.

## 3. What it costs

- No upstream: foundry fixes made in kol-ds-ui stop arriving, and fixes made here never reach ui.kolkrabbi.io. Olina's ARCHITECTURE §14 already states this rule for its copies ("copies, not shared code — no upstream sync").
- The showcase and this site diverge from the first edit.
- `ARCHITECTURE` §6 ("shared behaviour is extracted to a package and imported, not copy-pasted") and `docs/INDEX.md` ("a consumer is never the source") both need a written exception for the foundry, or the next agent will file it back.

## 4. Not settled read-only

Whether the pre-flush local `packages/fontviewer` still exists on the iMac in `_tmp/packages-elder-flush/`. Not on the MBP. Even if it does, the copy should start from 0.12.0, not from it.
