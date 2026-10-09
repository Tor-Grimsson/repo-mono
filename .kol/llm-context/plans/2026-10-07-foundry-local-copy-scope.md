# Disconnect kol-foundry from the design system, keep it local — scope

**Date:** 2026-10-07 · re-scoped 2026-10-09 · read-only, nothing changed.
**Question (user):** the foundry has a lot of bugs; instead of ticketing each to kol-ds-ui, take `@kolkrabbi/kol-foundry` local and own it here.
**Verdict:** smaller than the 10-07 scope said. The site reaches **17 of the package's 35 files (2,258 of 4,979 lines)**; the other half (fontviewer engine, IntroLoader, TextPressure, TypeSample/SpecCard/SpecimenLive, TypefaceHero, the severed specimen page) is never imported here and stays behind. One CSS rule of the theme's 303-line foundry sheet touches the copied code. No new workspace package: web is the only consumer, so the copy lives in `apps/web` and needs none of the three DS wirings.
**State:** PARKED by the user 10-07 ("not now, another session"); re-scoped 10-09 on request. Not started.

---

## 1. What the site uses (traced from the import sites, 2026-10-09)

| | |
|---|---|
| Version here | `@kolkrabbi/kol-foundry` ^0.12.0 |
| Import sites | `components/sections/foundry/TypefacePage.jsx` (7 sections) · `components/sections/foundry/FoundryOtherTypefaces.jsx` + `routes/foundry/FoundryTypefaces.jsx` (`TypefaceLibraryGridWithVariables`) |
| Reached files (17) | `TypefaceStyleSection · FontPreviewSection · VariableFontSection · GlyphMetricsSection · GlyphMetricsGrid · FoundryOpentypeFeatures · FoundryTypefaceDetails · FoundryTypefacePairing · PairingCard · SpecimenSectionHeader · TypefaceLibraryGridWithVariables · TypefaceVariablePreview · TypefaceAlphabet · glyphData.js · engine/FontLoader.js · engine/FontInfo.js · engine/Types.js` |
| Its imports | `kol-component` (22) · `kol-icons` (1) · `framer-motion` + `opentype.js` — both already web dependencies |
| Its CSS | only `.kol-pairing-card` (12 lines, `kol-theme/kol-components-foundry.css:291`); the rest of that sheet styles code that stays behind |
| Lobby traffic | 12 receipts are foundry round-trips — that traffic ends |

## 2. The copy

1. Copy the 17 files, paths kept, to `apps/web/src/components/foundry/` with an `index.js` that exports only the eight the site imports.
2. `PairingCard`: replace `kol-pairing-card` with Tailwind on the element (8% frame, hover 1% wash + 24% frame) — out of the `kol-*` namespace, so a theme bump can no longer move it.
3. Point the three import sites at the local folder.
4. Out of web: the `package.json` dependency, `@source` line (`index.css:19`), `optimizeDeps` entry (`vite.config.js:22`). `components/` is already a Tailwind source. Then `pnpm why @kolkrabbi/kol-component` → one version.
5. Build; render `/foundry`, `/foundry/licensing` and the five typeface pages at 1440 and 390 against a baseline captured before step 1 — identical before any bug is touched.
6. Then the user's bug list, fixed here. **It does not exist yet** — the user names the bugs.

## 3. What it costs

- No upstream: foundry fixes in kol-ds-ui stop arriving; fixes here never reach ui.kolkrabbi.io. The showcase and this site diverge from the first edit.
- kol-ds-ui confirmed 2026-10-09: 0.12.0 is byte-identical to its source, nothing in flight, no gate depends on this import. Only effect there: `scripts/extract-usage.mjs` stops mining foundry usage examples from this site (cosmetic).
- The theme keeps shipping its 303-line foundry sheet (imported by `kol-theme.css:48`), now styling nothing here — inert, not ours to remove.
- `ARCHITECTURE` §6 and `docs/INDEX.md` ("a consumer is never the source") need a written exception for the foundry, or the next agent files it back. One new § in ARCHITECTURE: *kol-foundry is local by ruling; no tickets for it.*
