# Session: Dashboards + Chess standalone packages · shell Tailwind fix · DS pages started

**Date:** 2026-07-09
**Agent:** Claude (Grim)
**Summary:** Consumed two more extracted DS packages (`kol-dashboards`, `kol-chess`), fixed the shell layout collapse the `kol-workshop` repoint caused (Tailwind wasn't scanning the node_modules packages), started the DS/Components collapse (2 of ~4 pages), and diagnosed two shell regressions (theme toggle, logo) that are blocked on DS-repo publishes. Continues `2026-07-09-workshop-kol-workshop-repoint.md`.

## Changes Made

### Package consumptions (monorepo)
- **Dashboards → `@kolkrabbi/kol-dashboards@0.1.0`** — 4 sites swapped `@kolkrabbi/kol-component/dashboards` → `@kolkrabbi/kol-dashboards` (`Metrics`, `DashboardComponents`, `DashboardMetricsSetup`, `ChessMetrics`); 17 imported symbols verified; CSS unchanged (`kol-theme@0.7.1/kol-components-dashboards.css`); dep added. Pure specifier swap. Build green.
- **Chess → `@kolkrabbi/kol-chess@0.1.0`** — 2 component sites (`ChessComponents`, `ChessAnalysis`) → `@kolkrabbi/kol-chess`; 3 data sites (`+ChessMetrics`) → `@kolkrabbi/kol-chess/data` (16-fn interface identical to local `@kol/chess-data`); `@kol/chess-data` dep removed. Build green. **`packages/chess-data/` left orphaned on disk** — delete blocked (not user-authorized); logged in AGENT-CONTEXT pre-merge cleanup.

### Shell breakage fix
- **`apps/web/src/index.css`** — added 5 `@source` directives (`kol-workshop`/`kol-component`/`kol-framework`/`kol-dashboards`/`kol-chess` `/src`). Root cause: `kol-workshop`'s shell JSX moved to `node_modules`, which Tailwind v4 doesn't scan → its layout utilities (`grid-cols-[256px_minmax(0,1fr)]`, `max-h-[calc(100vh-8rem)]`, spacing, widths) never generated → grid collapsed to one column, sidebar counts flew right, content stacked. Verified: those utilities were **0** in built CSS before, present after. ⚠️ **HMR won't pick up new node_modules sources — dev-server restart required.**

### DS/Components pages (collapse — started)
- **NEW `routes/workshop/DesignSystemSource.jsx`** — apparat-card-style source page: 7 package cards (name · version · `pnpm add`), GitHub + `ui.kolkrabbi.io` links.
- **NEW `routes/workshop/DesignSystemEmbed.jsx`** — iframe of `ui.kolkrabbi.io` + open-external fallback.
- Wired both into `data/workshop/navigation.js` (DS children) + `App.jsx` routes. Build green (9858 modules).

### Docs / DS repo
- `status/deprecation-ledger.md` — 2 Removed rows (dashboards-subpath → standalone, chess-subpath+chess-data → standalone).
- `kol-ds/lobby/TailwindContentSource.md` + INDEX row — brief on the `@source` requirement; **decision recorded: each package should own its compiled CSS** (v4 utilities emit `var(--kol-*)` refs so shared `kol-theme` ancestry holds); `@source` is the interim bridge.
- `kol-ds/packages/theme/package.json` — 0.7.0 → 0.7.1 (published earlier this session; carries `kol-components-workshop.css`).

## Current State

### Working
- Full `turbo run build --force` **5/5 green** (web/brand/studio/chess-data/fontviewer). Zero references to any deleted module.
- 3 package consumptions live (workshop, dashboards, chess) — all render-verify pending (static-green only).

### Known Issues (diagnosed, NOT fixed — both DS-repo/publish gated)
- **Theme toggle "disabled"** — package `ThemeToggle` writes only `data-theme` (key `kol-theme`); monorepo boots a `.dark` class (key `theme`); KOL remap is `:is([data-theme="dark"], .dark)` → the leftover `.dark` class keeps dark mode on, so the toggle does nothing. Two theme systems (public site vs workshop shell). Fix = reconcile onto `data-theme`, carefully (public toggle uses `.dark`).
- **Logo dark/missing (navbar)** — navbar uses `brandLogoSrc` (B2 URL) → `<img>`, which can't inherit `currentColor`. Correct path: the **asset loader `<Asset>` from `@kolkrabbi/kol-brand/svg`** (Icon-loader pattern, injects inline → currentColor works). Both marks exist in kol-brand *source*: `kol-wordmark` + `wordmark-workshop`. **BLOCKED:** (1) `kol-brand` still `0.1.0` on npm (old `src/logos/` structure — no AssetLoader / `./svg` export / workshop mark; needs bump+publish); (2) `kol-workshop`'s `ShellLayout` only accepts `brandLogoSrc` (URL) — needs a `brand` **node** prop to accept `<Asset>`. Both are kol-ds changes → publish-gated; monorepo can't wire it until then.

## Next Steps
1. **DS-repo, then consume:** bump+publish `kol-brand` (AssetLoader + `wordmark-workshop`); add `brand` node prop to `kol-workshop` ShellLayout + publish; then monorepo passes `brand={<Asset name="wordmark-workshop"/>}`.
2. **Finish DS/Components collapse** — fold specimen showcases into DS Overview, Components → one live gallery, retire the ~10 detail pages (redirect routes), trim prose.
3. **Theme-toggle reconciliation** — unify on `data-theme` without breaking the public site's `.dark` toggle.
4. User-side: dev restart + render-verify (shell/metrics/chess) · commit · delete `packages/chess-data/` at merge.
