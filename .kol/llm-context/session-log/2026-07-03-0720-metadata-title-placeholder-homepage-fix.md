# Session Log: kolkrabbi.io `__TITLE__` meta placeholder leak on `/`

**Date:** 2026-07-03
**Status:** Completed (fix applied, awaiting deploy verify)
**Agent:** Claude Opus 4.8 (1M context) — Grim

## Overview

`apps/web` injects social/SEO meta at request time: `index.html` ships `__TITLE__` / `__DESCRIPTION__` / `__URL__` / `__IMAGE__` placeholders, and `api/metadata-proxy.js` swaps them per route (Sanity → local prints → static-meta → default), wired via `apps/web/vercel.json` (`/(.*) → /api/metadata-proxy`). **This is by design, not a bug.**

The bug: the **homepage `/`** shipped literal `__TITLE__`. Root cause — on Vercel a static file beats a rewrite, so `dist/index.html` was served straight off the filesystem for `/` and the proxy never ran. Deep routes (no matching static file) fell through to the proxy and were fine. Verified live: `kolkrabbi.io/` leaked, `kolkrabbi.io/type` was correct.

## Changes Made

### Files Modified
- `apps/web/package.json` — build script `vite build` → `vite build && mv dist/index.html dist/app.html` (no static `index.html` left to shadow `/`).
- `apps/web/api/metadata-proxy.js:8` — `DIST_INDEX` now reads `dist/app.html`.

## Current State

### Working
- With no `dist/index.html`, `/` falls through to the `/(.*)` rewrite → `metadata-proxy` like every other route. Proxy's Tier-3 `STATIC_META['/']` already exists, so the homepage gets correct meta.

### Known Issues
- **Caveat:** breaks `vite preview`'s root serve locally (no `index.html`). Irrelevant — Vercel is the deploy path.
- **Latent landmine (not touched):** root `/vercel.json` has a *different* rewrite (`/(.*) → /`, no proxy) than `apps/web/vercel.json`. Live deploy uses the apps/web one (Vercel root dir = `apps/web`). If that root-dir setting ever flips, meta injection dies site-wide silently. Worth reconciling.

## Next Steps
1. Deploy + verify: `curl -s kolkrabbi.io/ | grep '<title>'` should show the real title, not `__TITLE__`.
2. (Optional) Reconcile the two `vercel.json` files so they don't disagree on the core rewrite.
3. All uncommitted — user manages git.
