# Session: Root public statics (fonts + favicons) + elder @kol/theme quarantine

**Date:** 2026-07-15 (late-night arc; follows `2026-07-15-ledger-roundtrips-theme-collapse.md`)
**Agent:** Grim (Fable 5)
**Summary:** Started the one-source-of-truth statics consolidation — repo-root `public/` now owns fonts (244 files) and favicons (2 files) with per-app relative symlinks — and the dead elder `@kol/theme` package moved to `_tmp/` quarantine with its stale dep entries stripped.

## Changes Made

### Files Modified
- **`public/fonts/`** (new, root) — union of web (138) + brand (222) font trees: 114 shared files verified byte-identical before merge, `.DS_Store` junk excluded → 244 files. App dirs replaced with relative symlinks: `apps/web/public/fonts`, `apps/brand/public/fonts`, `apps/video/public/fonts` (video previously symlinked web's) → `../../../public/fonts`.
- **`public/favicons/`** (new, root) — web's 2 SVGs (brand's `favicon.svg` was byte-identical). Symlinks keep each app's local name: web `favicons`, brand `favicon` → reference paths untouched.
- **`packages/theme/` → `_tmp/packages-theme-elder/`** — quarantined (user chose quarantine over delete; `_tmp/` already gitignored). Zero code imports existed; 3 stale `"@kol/theme": "^0.0.1"` entries stripped from web/brand/ui package.json; lockfile settled.
- `AGENT-CONTEXT.md` — Operational gained the root-public rule (add shared statics at root only; Vite follows symlinks in dev, copies real files per dist).

### Features Added/Removed
- One source of truth for shared statics; ~117 duplicate font/favicon files gone from app publics.
- Elder theme package out of the workspace (recoverable from `_tmp/`).

## Current State

### Working
- Build 5/5 after each step. Both dists carry all 244 fonts + 2 favicons through the symlinks; dev serves 200 through symlinks with no restart (publicDir reads disk).

### Known Issues
- **Full public unification PARKED (user call)** — img/images (brand's 161M photos), svg, robots.txt, sitemap.xml stay app-local for now. The agreed target shape when resumed: root `public/` organized `shared/*` + `web/*` + `brand/*`, apps mount only their own subset via symlinks (prevents cross-dist bloat + robots/sitemap collisions).
- Carried from the evening arc: dev-server restart still pending for the 0.8.0 wave; ledger 2.0 open items 2.2/2.4/2.6/2.8/2.9/2.10.

## Next Steps
1. Resume public unification (photos decision) when user gives the go — target shape documented above.
2. Type-name migration arc (elder 67-class type system) — biggest remaining elder-CSS bite.
3. Step-4 surface order: workshop remainder (30) → foundry (22) → sections (9) → prints (3) → misc (1) → brand (39).
