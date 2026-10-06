# Session: Ledger round-trips (1.0→2.0), stack surface zero-elder, theme collapse round 1

**Date:** 2026-07-15 (evening/night arc; follows `2026-07-15-workshop-fixes-theme-migration.md`)
**Agent:** Grim (Fable 5)
**Summary:** Article/stack surface swapped to `@kolkrabbi/*` (zero-elder after same-day CodeBlock publish), the DS-CHANGES ledger went through two full deliver→publish→score→consume round-trips (1.0 sealed, 2.0 cut; 2.1/2.3/2.5/2.7 resolved), a blue-link regression was pinned away and later resolved by cascade contract, the Inter fallback was root-caused twice (spaced token names + the @theme-layer cascade law), and the elder CSS got its first census-driven collapse (−1,439 lines, accept-DS).

## Changes Made

### Files Modified
- `routes/Stack.jsx`, `routes/StackArticle.jsx`, `prose/layouts/ArticleHeader.jsx`, `prose/blocks/TableBlock.jsx` — elder `@kol/ui` imports → kol-component/kol-icons/kol-content (`SourcesReferences` w/ `meta`→`note` remap); `prose/blocks/StickyNavCard.jsx` — elder version moved app-local over the stale twin, elder source + `@kol/ui` export deleted.
- `prose/core/PortableTextBlog.jsx`, `portable-text/components.jsx` — CodeBlock → kol-component after #12 shipped (0.10.1). **Stack surface: 0 elder imports.**
- `routes/WorkDetail.jsx` — `metaClassName="kol-mono-xs uppercase"` (#8); `routes/Work.jsx` — `titleClassName="kol-mono-sm uppercase"` (2.1).
- `apps/web/src/index.css` — toggle shim deleted (#11a); `@source` lines → kol-theme's `kol-sources.css` manifest (#9; briefly reverted during the 0.7.4 pin, re-adopted at 0.8.0).
- `packages/ui/theme.css` (423→355) — dead tokens purged; **2.8 Inter shim as plain `:root` block** (a `@theme` version silently never worked — see cascade law below).
- `packages/ui/css/components.css` (3,084→2,389), `utilities.css` (645→339), `prose.css` (788→418) — census-driven collapse: unused + DS-duplicated rules deleted (kol-table/codeblock/label families, kol-prose base, ~50 dual utilities incl. `bg-surface-inverse` context-remap). Remaining = elder type system (67 live classes) + btn-* + sources-* (workshop preview consumer).
- Packages: two waves consumed — patch wave (kol-component 0.10.1 · kol-content 0.3.1 · kol-icons 0.6.1 · kol-framework 0.4.2 · kol-theme 0.7.6 · kol-chess 0.2.1), then minor wave (0.11.0 / 0.4.0 / 0.7.0 / 0.5.0 / **kol-theme 0.8.0** / chess 0.3.0 / workshop 0.1.6). kol-theme was pinned 0.7.4 exact mid-session (blue-link regression) — pin lifted at 0.8.0.
- Docs: `docs/DS-CHANGES.md` sealed as delivered 1.0 scorecard (7/12 shipped); **`docs/DS-CHANGES-2.0.md`** = the open round (2.1/2.3/2.5/2.7 struck-resolved; 2.2/2.4/2.6/2.8/2.9/2.10 open). Board census table + collapse entry; `04-package-registry.md` — kol-specimen marked deprecated-by-ruling.

### Load-bearing findings
- **Cascade law:** consumer `@theme` tokens land in `@layer theme` (lowest) and LOSE to kol-theme's `@layer components` token blocks — site overrides of DS tokens must be plain `:root`. The 2.8 shim was "verified" wrong once (presence ≠ cascade); refit + verified via computed style + `document.fonts.check`.
- **2.7 blue links:** kol-theme 0.7.5 introduced a bare `a { color: var(--kol-link) }` — chrome anchors went `#2563EB`. 0.8.0 keeps the rule but chrome self-colors (`.kol-shell-header-tab` → `fg-64`). Watch-item: future chrome anchors without a color class go blue by contract.
- **Dev-server staleness bit twice:** Vite pins the resolved package graph at startup (served kol-content@0.2.0 / kol-framework@0.4.2 after installs). Every post-install live check needs a dev restart; gate statically on dist when he hasn't.
- **kol-specimen is deprecated by ruling** (kol-foundry canonical) despite no npm `deprecated` flag — read package status from version activity + user rulings, not registry metadata alone.

## Current State

### Working
- Build 5/5 green. Stack surface + /work seams bundle-verified; workshop tabs black, toggle 36/20 (2.3), title/meta seams in bundle. Elder census 71→65 files; elder CSS −1,439 lines.

### Known Issues
- **Dev server must be restarted** to render the 0.8.0 wave (stale module graph).
- Ledger 2.0 open: 2.2 (tags separator), 2.4 (auto-dark ruling), 2.6 (sidebar rhythm), 2.8 (spaced faces — `:root` shim covers), 2.9 (v1 icon vocabulary), 2.10 (changelog per wave).
- **PARKED (user cancelled the run): `packages/theme/` deletion** — dead elder (~2,900 lines, 0 imports) + 3 stale `"@kol/theme"` package.json entries.
- Site debt: `data/workshop/navigation.js` icon names legacy-resolved (await 2.9); /prints pre-existing `uppercase` prop-leak warning (kol-store).

## Next Steps
1. Delete `packages/theme/` + stale dep entries on explicit go.
2. Type-name migration arc (elder 67-class type system → DS type names) — kills most of the remaining elder CSS.
3. Continue Step-4 surface order: workshop remainder (30) → foundry (22) → sections (9) → prints (3) → misc (1) → brand (39).
