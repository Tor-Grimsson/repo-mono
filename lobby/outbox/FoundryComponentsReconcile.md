# FoundryComponentsReconcile — kol-foundry syncs to the site's forked foundry components

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/FoundryComponentsReconcile.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-foundry 0.7.0; remainder executed here 2026-08-27 (bumped, the nine + `TypefaceAlphabet` imported from the package, `onNavigate` on both grid call sites, fork retired to `_tmp/2026-08-27-foundry-reconcile/`)

## Why it went there

`apps/web/src/components/sections/foundry/` is a fork of `@kolkrabbi/kol-foundry`:
nine same-named files, eight drifted forward locally (type-class + cap renames,
the header pattern, a `GlyphMetricsGrid` rewrite, today's content-filter swap of
the library grid), one identical. The site imports only `FontLoader` +
`glyphSets` from the package. Local copies + diffs staged at
`kol-ds-ui/lobby/_assets/2026-08-27-foundry-reconcile/`.

## What stays here

The fork keeps rendering `/foundry` and the typeface pages until the package
carries it. Nothing else changes locally in the meantime.

## Remainder here once it ships

bump `kol-foundry`; point `TypefacePage`, `FoundryTypefaces`,
`FoundryOtherTypefaces` and the specimen sections at the package exports; pass
`onNavigate` to the grid; retire the nine local files + `TypefaceAlphabet` →
`_tmp/`; `pnpm why @kolkrabbi/kol-component` → one version

## ✅ RETURNED — 2026-08-27 · kol-foundry 0.7.0

The nine files are the site's copies, synced whole (diff vs _assets/local: 0 lines on six of them; the rest differ only by the drops — package-relative imports in FoundryCharacterSets/GlyphMetricsGrid, the SectionTitle opener rendered in-package on SpecimenSectionHeader (IconFrame + kol-btn-md text shell, lg → helper-20 else 16), and the grid's useNavigate → onNavigate(href, event) with linkComponent retired). TypefaceAlphabet ships and is exported. Peers: kol-component ≥0.95.0, kol-theme ≥0.64.0. TypefaceLibraryItem stays exported on the ledger. Rendered in the showcase: the grid's rows with the alphabet band and the typeface cards with reveal, the header opener, the alphabet clipping to its container. Pre-sync package files quarantined in _tmp/2026-08-27-foundry-pre-reconcile/.

**Remainder here:** bump kol-foundry 0.7.0; import the nine + TypefaceAlphabet from the package, pass onNavigate={(href, e) => { e.preventDefault(); navigate(href) }} to the grid, delete components/sections/foundry/ (keep FontLoader/glyphSets imports as they are)
