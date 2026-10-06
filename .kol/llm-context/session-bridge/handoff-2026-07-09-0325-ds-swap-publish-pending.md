# Handoff — 2026-07-09 03:25

## Goal of the current arc
Kill the local design-system forks: dashboards (and next chess) move from monorepo copies to
published `@kolkrabbi/*` packages. Dashboard swap is EXECUTED on the monorepo side and staged on
the kol-ds side — **everything now blocks on the user publishing 0.7.0**. Chess is briefed, not
started.

## ⛔ HARD RULE (user, enforced with fury, multiple times tonight)
**NEVER touch anything outside `/Users/biskup/dev/projects/kol-monorepo`. Not an edit, not a new
file, not a "helpful" brief. CWD is the boundary.** Cross-repo work happens by writing briefs
INSIDE this repo that the user hands over himself. (Also in memory: `feedback_stay_in_cwd_repo`.)

## Last actions taken (causal trail, newest first)
- Moved the chess packaging brief to **repo ROOT**: `MIGRATION-chess-package-brief.md` (user's
  explicit placement; it briefs a kol-ds agent to package chess into the same 0.7.0 release).
- Dashboard DS-swap, monorepo side DONE: 4 consumers repointed to
  `@kolkrabbi/kol-component/dashboards` (`routes/Metrics.jsx` = live kolkrabbi.io/metrics,
  DashboardComponents, ChessMetrics, DashboardMetricsSetup); `index.css` dashboard css →
  `@kolkrabbi/kol-theme/kol-components-dashboards.css layer(components)`; local fork DELETED
  (`packages/ui/src/dashboards/`, `packages/ui/css/dashboard.css`, both package.json exports).
- (Earlier, before the boundary rule landed: dashboard packaging was staged in kol-ds —
  `packages/component/src/dashboards` + `./dashboards` export + theme css + aggregate import,
  component+theme bumped 0.7.0, uncommitted. It EXISTS there; do not go there again — the brief
  documents it for the DS agent.)
- Parity diff proved the fork fear moot: copies byte-identical except css-import line + 9 lines
  font drift (DS canon wins; web `--kol-font-family-mono` now JetBrains anyway).
- Small fixes: sidenav mono RightGroteskMono→JetBrains (`packages/ui/theme.css:37`); chess
  Analysis table/board aligned (1232 clamp hoisted to `ChessAnalysisLayout`); deprecation ledger
  created (`status/deprecation-ledger.md`).
- Before all that: FULL workshop conform sweep (18 pages → canonical PageSection anatomy, 3
  parallel agents + inline), expansion machinery + DesPage + SectionToggle deleted repo-wide,
  build was 5/5 green pre-swap. See `session-log/2026-07-09-dashboard-conform-metrics-embed-setup-page.md`.

## Current state / open decision points
- **Web dev + build are INTENTIONALLY RED**: imports point at `@kolkrabbi/kol-component@0.7.0`
  `/dashboards` + `kol-theme@0.7.0` css — neither published yet. User approved the breakage.
- **Unblock = user publishes** component + theme 0.7.0 from kol-ds (his machine, his command).
- Chess: NOT migrated. Brief at repo root covers the kol-ds half (incl. severing the
  `@kol/chess-data` imports in 3 files → props; data package stays here). Monorepo half happens
  after chess lands in a published version.
- `@kolkrabbi/kol-icons` also updated to 0.5.0 this morning; framework 0.3.2 in use (PageSection
  everywhere).

## Next intended action
1. On "published": `pnpm update -r --latest "@kolkrabbi/*"` → `pnpm exec turbo run build --force`
   → verify `/metrics` (live, load-bearing, 5 endpoints) + `/workshop/dashboard/*` render.
2. Tick the ledger row + `plans/dashboard-ds-swap.md` to CLOSED.
3. When kol-ds chess is packaged+published: repoint chess imports, wire `@kol/chess-data` via
   the new props, delete local chess tree (`components/workshop/chess/`, `@kol/ui/chess`,
   `chess.css`), build, verify `/workshop/chess/*`.

## Working memory not yet in AGENT-CONTEXT
- The extra piece sets (user's ask #7) live in kol-ds `showcase/src/workshop/chess/assets/`
  (`chess-extra-set`, `chess-vector-set`) — they arrive in the monorepo WITH the chess package;
  the piece-set showcase backlog item becomes trivial after the swap.
- Backlog (plan doc, user batch): chess-metrics prose page ("2 flies"), piece-set showcase,
  apparat per-tool detail pages (reopens no-iframe lock deliberately), DS/Components broken-bits
  QA, visual QA of the conform sweep (Colors / ChessMetrics / Documentations).
- `.kol-prose` is contested (web blog-prose wins over canon) — use `kol-sans-body-02` +
  `kol-helper-12` atomics on framework pages; convergence slice pending.
- `DesSection` still alive inside 38 preview components (page-level role dead).
- User temper tonight: short fuse on (a) repo boundary, (b) re-asking for permission after a
  GO, (c) "partially" done states. Execute fully inside the lines, ask nothing twice.
