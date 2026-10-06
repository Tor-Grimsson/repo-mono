---
name: build-green-is-not-verified
description: "Turbo/rollup build green does NOT prove the app works — @kolkrabbi raw-source packages break in dev only (esbuild pre-bundle can't transform import.meta.glob); playwright-verify consumer apps after DS wiring changes"
metadata: 
  node_type: memory
  type: feedback
  originSessionId: e0c0afe3-1c75-4765-84f2-e062fea1bb87
  modified: 2026-08-09T09:14:05.192Z
---

Shipped brand DS-adoption verified only by `turbo build` — in dev the page was blank/icon-less and the user lost time reviewing broken work (2026-07-29, "figure it out, playwright confirm at least a single fucking thing").

**Why:** the @kolkrabbi packages publish raw source using `import.meta.glob`. Rollup (build) transforms it anywhere; esbuild pre-bundling (dev) can't — so missing `optimizeDeps.exclude` entries fail ONLY in dev. Build green is a half-proof.

**How to apply:** after wiring a new @kolkrabbi package into a consumer app: (1) copy the `optimizeDeps.exclude` rule from `apps/web/vite.config.js` (+ `include` for CJS chains like react-syntax-highlighter); (2) start the app's dev server (task-scoped, kill after) and playwright-verify the affected surfaces — icons paint, component renders, console clean — BEFORE reporting done. Screenshots to scratchpad, never repo root. Related: [[publish-split-npm-mine-git-his]].

**Boundary (2026-08-09, "stop calling playwright every fucking time"):** that verify is for NEW package wiring — once per wiring milestone, not per iteration. Patch bumps, CSS tweaks, and UX iterations on already-wired surfaces: he validates live himself; just ship and report what changed.
