# Session: DS returns consumed — nine tickets closed, one successor filed and closed same day

**Date:** 2026-09-01
**Agent:** Grim
**Summary:** kol-ds-ui returned all eight of the morning's tickets; bumped, re-checked under device emulation, found the scrim fix incomplete, filed the successor, consumed that too.

## Changes Made

### Files Modified
- `apps/web/package.json` · `apps/brand/package.json` — kol-component `^0.149.0` → `^0.150.1`, kol-theme `0.116.0` → `0.117.0`; web also kol-workshop `^0.25.0` → `^0.26.0` (brand does not carry workshop)
- `pnpm-lock.yaml` — install
- `lobby/outbox/` — 8 receipts closed + `WorkshopSearchCloseUndoneBySetText.md` filed then closed
- `lobby/INDEX.md` — 8 rows to 🟢, 1 new row filed→closed
- `~/dev/projects/kol-ds-ui/lobby/` — `WorkshopSearchCloseUndoneBySetText` entry + queue row

### Filed to kol-ds-ui — one, closed same day
`WorkshopSearchCloseUndoneBySetText` — successor to `OverlayScrimTapDismiss`

## Current State

### Working
- **Shipped and verified under iPhone 13 emulation:** search-overlay field 16px (was 14, iOS-zooming) · scrim `backdrop-filter: none` · `/studio` split visual 350×350 with the card unclipped at 390×700 · scrim tap closes the search overlay 3/3, bare and with a typed query
- **Shipped, consumed, not eyeballable locally:** tags-as-chips on `/`, ContentFilters mobile gaps, `/work` showcase row rung, newsletter foot — the Sanity-backed routes render empty on dev port 5180 (not in the CORS allowlist)
- One version of every DS package beneath the app; `kol-link --off` run before any of it, `node_modules/.vite` cleared on each bump
- Dev servers killed, 5180 released; 5173 is kol-fxr's and was left alone

### Known Issues
- **Nothing is pushed.** Third session of working tree
- **kol-theme 0.118.0 / 0.119.0 exist** (kol-chess shell-gutter token, heading font var) — deliberately NOT taken; this repo stays on the exact 0.117.0 pin until a wave needs them
- **User report not yet reproduced:** the home stack card "starts in the middle of the screen". Neither audit round logged it and emulation showed the section at the normal gutter. Needs a screenshot or a live look before it can be measured
- The `/prints` "year facet" item I listed as open was WRONG — it was the first-column width, closed at the DS 2026-08-27 (component 0.111.0) and installed here, unseen only because nothing is deployed
- Board artifact `f9d44f07` still shows the 08-31 state; never updated

## Two laws this session bought

- **A shipped fix that fires is not a fix that works.** The 0.150.1 scrim button received `touchstart`/`touchend`/`click` — correct at the DS boundary — and the overlay still would not close, because the consumer-side wiring undid it in the same React batch (`setSearchQuery('')` → `setText` → `isOpen: true`). Instrumenting the event path is what separated "the DS's fix failed" from "the DS's fix works and the layer above cancels it". Escape passing was the tell: same handler, different write order.
- **A peer's version number is a claim, not a fact — but a peer's correction is worth more than the original.** kol-ds-ui sent 0.150.0, then corrected to 0.150.1 mid-flight (0.150.0 deprecated, broken barrel publish). Taking the correction cost one re-install; not taking it would have shipped a build-breaking version into two apps.

## Next Steps
1. **Push.** Three sessions of working tree; every remaining verification is on the deployed site
2. After deploy: home tag chips, `/work` row heights, the filter row's first column, and the search-field tap on a real iPhone
3. Screenshot for the stack-card position report, then measure it
