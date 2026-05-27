# Session: Monorepo merge — Phases 0 / 0.5 / 1 (brand app, pnpm, @kol/theme)

**Date:** 2026-05-27
**Agent:** Grim
**Summary:** Planned the `brand.kolkrabbi.io` integration into `kol-monorepo` and executed
Phases 0–1: brand app landed + deployed, monorepo migrated yarn→pnpm, `@kol/theme` extracted.
Web merge (Phase 2) deferred by decision.

Full detail + phased plan: `docs/monorepo-merge/migration-plan.md`. Most changes are in
`~/dev/projects/kol-monorepo` (the website monorepo), not this repo.

## Changes Made

### Planning (this repo)
- `docs/monorepo-merge/migration-plan.md` — NEW. 6-phase plan + execution record. Topology:
  kol-system = canonical scaffolding template; this repo = a faithful snapshot of it; monorepo
  = the "elder" (forked early, owns the live website). End state: one live-linked DS in
  `kol-monorepo/packages/*`, brand + web consume the same modules.

### Phase 0 — brand app (in kol-monorepo)
- `apps/brand/` — whole repo copied in (portal + 134-file editor), self-contained on its own
  `src/components` + `src/styles`. Workspace `package.json` (kept this repo's React 19.2 / Vite 8),
  `vercel.json` (SPA + `X-Robots-Tag: noindex`), `index.html` (+ robots noindex), `vite.config.js`
  gained `resolve.dedupe` (React fix). Root `package.json` got `dev:brand`.
- Deployed: **brand.kolkrabbi.io** (Vercel project `kol-brand`, Root Directory `apps/brand`).

### Phase 0.5 — yarn → pnpm (in kol-monorepo)
- Root `package.json`: `packageManager` → `pnpm@10.33.0`; removed `workspaces` field; added
  `pnpm.overrides` pinning `react`/`react-dom` to `19.2.6` (kills the dual-copy React crash).
- New `pnpm-workspace.yaml`; new `.npmrc` (`link-workspace-packages=true` +
  `public-hoist-pattern` for `*react*`/`*styled-components*`/`@emotion/*`; isolated linker).
- `apps/studio/package.json`: added `@kol/content` (real phantom dep yarn's flat tree hid).
- `packages/fontviewer/src/utils/FontLoader.js`: `import * as opentype` (ESM interop under pnpm).
- Deleted `yarn.lock`; `pnpm-lock.yaml` generated.
- Vercel: cleared studio project's hardcoded `yarn install` override.

### Phase 1 — @kol/theme (in kol-monorepo)
- `packages/theme/` (`@kol/theme`) — the 9 token/base CSS files moved verbatim out of
  `apps/brand/src/styles` (umbrella + kol-color/opacity/typography/typography-mono/utilities/
  components-{atoms,molecules,organisms}). `kol-site.css` stays in brand.
- `apps/brand/src/index.css` imports `@kol/theme/kol-theme.css`; added the workspace dep.

## Current State

### Working
- `brand.kolkrabbi.io` live (portal + editor), unlisted, on pnpm + shared `@kol/theme`.
- `web`, `studio`, `brand` all build + deploy green under pnpm. Single React workspace-wide.

### Known Issues / notes
- **opacity-hex:** leave as-is. Do NOT migrate to `fg` — opaque-flattened vs transparent, not
  interchangeable. Flag the user when Phase 2 work approaches it.
- pnpm is NOT strict-isolation (Sanity forced hoist patterns); the wins (pnpm + single React) hold.
- `apps/brand/src/data/components.js` has display-label strings still pointing at old
  `src/styles/` paths (cosmetic).
- `apps/brand/vite.config.js` `resolve.dedupe` is now redundant (overrides handle React) — kept
  as harmless insurance.

## Next Steps
1. **Phase 2 (web onto `@kol/theme`) — DEFERRED.** It's a real merge on the live site: two
   hand-written class layers + a dark-mode mechanism diff (`@kol/theme` `:root[data-theme]` vs
   `@kol/ui` `@theme` + `:is([data-theme],.dark)`). Both DSs share the same approach + class names
   + base token values, so it's doable — bounded path: `@kol/ui` consumes `@kol/theme` for the
   matching base layer only; leave web's richer tokens + opacity-hex + class layer; gate
   light+dark visual snapshots.
2. Phases 3–6 (per plan): `@kol/component`, loaders/framework/styleguide packages, move the editor
   onto shared packages, invert kol-system to a downstream template.
