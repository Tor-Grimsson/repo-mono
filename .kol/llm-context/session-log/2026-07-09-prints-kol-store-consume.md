# Session: Prints → `@kolkrabbi/kol-store` consume

**Date:** 2026-07-09
**Agent:** Claude (Grim)
**Summary:** Swapped `apps/web` `/prints` off its local `@kol/ui` store forks onto the published `@kolkrabbi/kol-store` package; unblocked an incomplete `0.1.0` publish with a temp `pnpm patch`, then converged onto the complete `0.1.1`. Build 5/5 green, verified live (identical render).

## Changes Made

### Files Modified — `apps/web`
- `package.json` — added `@kolkrabbi/kol-store` `^0.1.1`.
- `src/index.css` — `@source "../node_modules/@kolkrabbi/kol-store/src";` (Tailwind v4 doesn't scan node_modules).
- `vite.config.js` — added `@kolkrabbi/kol-store` to `optimizeDeps.exclude` (raw-JSX package).
- `src/routes/prints/PrintsGrid.jsx` — `PrintGridCard` from `@kolkrabbi/kol-store` (kept `FoundryCTA`/`ContentFilters` on `@kol/ui`).
- `src/routes/prints/PrintsGridGsap.jsx` — `PrintGridCard` + `PrintGridCardGsap` from `@kolkrabbi/kol-store` (killed a deep `../../../../../packages/ui` relative import). **Note: this file is dead code — nothing routes to it.**
- `src/routes/prints/PrintDetail.jsx` + `PrintDetailOverlay.jsx` — `PrintBuyButton` from `@kolkrabbi/kol-store`.

### Files Deleted — `packages/ui` (local forks, now sourced from the package)
- `src/molecules/PrintGridCard.jsx`, `src/molecules/PrintGridCardGsap.jsx`, `src/atoms/PrintBuyButton.jsx`
- Removed their exports in `molecules/index.js` + `atoms/index.js`.

### Publish-gap workaround (resolved)
- `@kolkrabbi/kol-store@0.1.0` shipped **incomplete** — only 3 of 7 components (`ProductDetailLayout`/`DiagonalMarqueeRiver`/`PriceDisplay`); the 4 `Print*` files were added to the DS working copy after the 0.1.0 cut and never republished.
- Unblocked with `pnpm patch @kolkrabbi/kol-store@0.1.0` (backfilled the 4 files + complete `index.js` from the DS working copy) → build green.
- User bumped DS `packages/store` → `0.1.1` and pushed; npm published complete. **Patch removed** (`pnpm-workspace.yaml` `patchedDependencies` entry + `.patch` file deleted), dep bumped `^0.1.0`→`^0.1.1`, `pnpm install`. `pnpm-workspace.yaml` net-unchanged.

## Current State

### Working (verified)
- All 3 store components import from `@kolkrabbi/kol-store@0.1.1`; no local forks; no patch.
- `turbo run build --force` **5/5 green**.
- Live-verified on `/prints` + `/prints/:slug` overlay — identical render (confirms the store components need no dedicated `kol-components-store.css`; they're type-classes + semantic-token Tailwind).

### Known Issues
- `PrintsGridGsap.jsx` is **dead code** (unrouted) — candidate for deletion.
- `PrintBuyButton` is **conditional** (`hasPurchaseOption`) — only renders on prints carrying `buyUrl`/`printOnDemandUrl`; else the local PayPal/Inquire fallback shows (e.g. `skinnalón`).
- Mid-session churn: misread an "unimport" instruction and briefly recreated 2 local files, then deleted them — **net zero**, current state is clean.

## Next Steps
1. Delete dead `PrintsGridGsap.jsx` if the gsap experiment is abandoned (data confirms it's unrouted).
2. Prints DS-adoption swap is **DONE** — no follow-up owed.
