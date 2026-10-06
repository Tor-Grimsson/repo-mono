# Session: KOL bumps + home/shell DS swap + primitive-token root cause

**Date:** 2026-07-15
**Agent:** Grim (Fable 5)
**Summary:** Bumped the 4 stale @kolkrabbi packages, swapped home + shell off `@kol/ui` onto the published DS, and root-caused the square-button regression to primitive tokens that only exist in the aggregate `kol-theme.css` — web now consumes the aggregate.

## Changes Made

### Files Modified
- `apps/web/package.json` / `apps/brand/package.json` — bumps: `kol-component` 0.7.0→**0.8.0**, `kol-framework` 0.3.2→**0.3.4**, `kol-theme` 0.7.1→**0.7.3** (web+brand), `kol-workshop` 0.1.4→**0.1.5**. Installed, `pnpm outdated` clean.
- `apps/web/src/components/sections/home/HomeSignup.jsx` — `Button`, `Input` → `@kolkrabbi/kol-component` (prop-compatible, pure specifier swap).
- `apps/web/src/components/sections/home/WorkshopFeatures.jsx` — `ButtonGroup` → `@kolkrabbi/kol-component`. **API shift:** elder took a `buttons[]` array; upstream composes children — actions array inlined as two `<Button>` children, strings verbatim.
- `apps/web/src/components/layout/Navbar.jsx` — `Icon` → `@kolkrabbi/kol-icons`; **3×** `KolWordmark` → `<Asset name="kol-wordmark">` from `@kolkrabbi/kol-brand/svg` (currentColor, sized `[&>svg]:h-6` per DS ShellLayout pattern). One render was missed on the first pass (indent variance beat `replace_all`) → user-reported runtime crash `Wordmark is not defined`, fixed same session. `useTheme` stays on `@kol/ui` (gap, below).
- `apps/web/src/components/layout/Footer.jsx` — same `Icon` + `Asset` swap (`[&>svg]:h-full`).
- `apps/web/src/index.css` — **the load-bearing fix:** replaced the 8 à-la-carte `@kolkrabbi/kol-theme/*.css` imports with the ONE aggregate `kol-theme.css` import. Root cause: the primitive tokens (`--kol-radius-*`, `--kol-transition-*`, shadows, z-index, opacity) live **only in the aggregate's body** — no sub-file defines them — so cherry-picking left `.kol-btn { border-radius: var(--kol-radius-sm) }` undefined → **0 radius** (the user's screenshot). Latent since the à-la-carte imports; surfaced when DS buttons landed on home. Sub-imports arrive identically `layer(components)`-wrapped; `kol-framework.css` kept as a separate import (not part of the aggregate).

### Features Added/Removed
- Wordmark theme-adaptivity fixed under **auto-dark**: the old `wordmarkBrand` filter keyed on `.dark`, which the OS-follow media block never sets → black-on-dark; `Asset` uses currentColor → follows fg tokens.
- The bump's **foundry gap closed as a side effect**: kol-theme 0.7.3 moved type-specimen rules to `kol-components-foundry.css`, which the aggregate imports — specimen rules back in web's cascade.

## Current State

### Working
- Build 5/5 green (`turbo run build --force`). Dist-CSS proofs: `kol-radius-sm:4px` ships, brand `#f5d245` survives (unlayered `@kol/ui/theme.css` beats layered DS tokens), `kol-type-sample` rules present.
- Home + shell on DS: buttons/input from `kol-component`, icons from `kol-icons`, wordmark from `kol-brand`.

### Known Issues
- **useTheme upstream gap:** `kol-framework@0.3.4` exports no `useTheme` — stays on `@kol/ui` ×3 (Navbar, HomeHero, HomeFoundry). Lobby-brief candidate.
- **Lag reported, not diagnosed:** suspected Vite optimizer churn from mid-session `pnpm install` under a running dev server. Restart dev first; if it persists, profile (DevTools Performance) — no speculative fixes.
- **Cascade delta accepted:** `kol-opaque` now layered (was unlayered) + new entrants via aggregate (`kol-color`, `kol-opacity`, `kol-utilities`, organisms). Unlayered brand/app CSS still wins; watch on render-check.
- `kol-segment-title` (PortableTextBlog.jsx:60) still undefined — needs a design ruling, carried from the seeding arc.
- User render-check pending: home buttons/signup/wordmark both modes, post-restart.

## Next Steps
1. User verdict on render-check + lag after dev restart.
2. Batch 2 rulings from the seeding playbook (`kol-segment-title` target class, 28/32px chrome add-or-accept).
3. Remaining elder consumers (`/work` + portfolio surfaces, then `@kol/ui` collapse — sprint steps 3–5).
