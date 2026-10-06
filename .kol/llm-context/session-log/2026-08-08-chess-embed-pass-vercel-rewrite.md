# Session: Chess embed pass — Vercel SPA rewrite + embed latch

**Date:** 2026-08-08
**Agent:** Grim (Fable 5)
**Summary:** The workshop's chess frames 404'd — root cause was kol-chess having no `vercel.json`, so every deep link died at the edge while the app's routes were real. Fixed in the chess repo, and the embed latch was ported there in the same pass; web's three chess srcs now carry `?embed=1`.

## Changes Made

### kol-chess (sibling repo)
- `vercel.json` **new** — the SPA fallback rewrite, exact copy of kol-ds-ui's shape (rewrites only; the project's build settings stay in the dashboard).
- `src/useEmbed.js` **new** — the latch, same contract as showcase/brand.
- `src/Shell.jsx` — embed branch: no nav bar, `--chess-stage-reserve` drops from 150 to 102 (the bar's 48 removed).

### kol-website
- `apps/web/src/routes/workshop/embedSections.js` — `?embed=1` appended to the three chess srcs (`/analysis` · `/stats` · `/database`).

## Current State

### Working
- Verified on a scratch chess dev server: `/stats?embed=1` renders bare (27,192-game stats, no nav), plain `/stats` keeps its chrome — the latch resets per document.
- Probed live: `chess.kolkrabbi.io` root 200, all deep links 404 — confirming the missing-rewrite diagnosis, not wrong URLs.

### Known Issues
- Both halves are deploy-gated: chess needs a push from its own repo (rewrite + latch), web's flag rides the next push here. Until chess deploys, the workshop chess pages keep 404ing.

## Next Steps
1. Deploy kol-chess (his push, own repo); web's half lands with any next deploy.
