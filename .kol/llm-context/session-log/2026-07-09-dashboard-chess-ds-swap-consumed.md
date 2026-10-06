# Session: Dashboard + Chess DS-swap — published packages consumed

**Date:** 2026-07-09
**Agent:** Claude (Grim)
**Summary:** Unblocked both DS-swaps once kol-ds published 0.7.0 — pulled the packages, dashboard build went green, then executed the chess consumption monorepo-side (repoint + `chessData` adapter + delete local forks). Both plans CLOSED. Open: an unidentified "workshop nav set" the user mentioned.

## Changes Made

### Files Modified
- `apps/web/src/index.css` — added `@import "@kolkrabbi/kol-theme/kol-components-chess.css" layer(components)` (mirrors the dashboards line); chess CSS now global, not per-page.
- `apps/web/src/routes/workshop/ChessAnalysis.jsx` — `ChessAnalysisLayout` import → `@kolkrabbi/kol-component/chess`; dropped `@kol/ui/css/chess.css`; added `import * as chessData from '@kol/chess-data'`; `<ChessAnalysisLayout chessData={chessData} />`.
- `apps/web/src/routes/workshop/ChessComponents.jsx` — five local chess imports → one `@kolkrabbi/kol-component/chess` block + `chessData`; wired `chessData` into 3× `ChessControlsProvider`, `ChessAnalysisLayout`, and `GameArchiveTable`.
- `apps/web/src/routes/workshop/ChessMetrics.jsx` — dropped the per-page `@kol/ui/css/chess.css` import (now in `index.css`); `@kol/chess-data` data imports untouched.
- `packages/ui/package.json` — removed dead `./chess` + `./css/chess.css` exports.
- `packages/ui/src/index.js` — removed dead `export * from './chess/index.js'`.
- `.kol/llm-context/status/deprecation-ledger.md` — dashboards + chess forks moved to the Removed table.
- `.kol/llm-context/plans/dashboard-ds-swap.md`, `plans/chess-ds-swap.md` — both marked ✅ CLOSED.

### Files Deleted
- `apps/web/src/components/workshop/chess/` (whole local apparatus tree).
- `packages/ui/src/chess/` (dead `@kol/ui/chess` tree — zero importers).
- `packages/ui/css/chess.css` (forked CSS; superseded by `kol-theme/kol-components-chess.css`, byte-parity 1225 lines).

### Dependencies
- `pnpm update -r --latest "@kolkrabbi/*"` — `kol-component` + `kol-theme` `^0.6.0 → ^0.7.0`; `kol-framework` 0.3.2, `kol-icons` 0.5.0 unchanged.

## Current State

### Working
- `turbo run build --force` **5/5 green** (dashboard swap + chess swap both compile against 0.7.0).
- Dashboard section already consumed `kol-component@0.7.0/dashboards` (prior handoff); chess now consumes `/chess` with `@kol/chess-data` passed as the `chessData` adapter prop (props-based, no bundled dataset upstream).
- `@kol/chess-data` stays local as the single data source; adapter = the module namespace (`getSampleGames`/`getManifest`/`getMonthlySummary`/`getRandomMonth`/`loadMonthGames`/`getGamePgnByIdAsync` all present).

### Known Issues
- **"Workshop nav set" unresolved** — user named it as the 3rd finalize item, but no new npm version landed (pushes were git-only), no nav export changed, `kol-icons`/`kol-framework` unbumped, shell look is locked (no AppShell adoption). Needs a pointer (package/export/file) before anything is wired.
- Live render-verify of `/metrics`, `/workshop/dashboard/*`, `/workshop/chess/{analysis,components,metrics}` is user-side (not driven this session).
- npm publish is push-triggered on kol-ds (version bumps only on a version change) — later feature pushes without a bump don't re-version; 0.7.0 (2026-07-09 03:54 UTC) already carried dashboards + chess.

## Next Steps
1. Get the "workshop nav set" pointer from the user, then wire it.
2. User: live-verify the three route groups above.
3. Remaining fork cleanup per ledger: `DesSection` (38 preview components), legacy type system in `packages/ui/theme.css`, `.kol-prose` name collision — all convergence-slice work.
