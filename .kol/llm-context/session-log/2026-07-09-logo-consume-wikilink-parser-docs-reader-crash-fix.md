# Session: Navbar logo consume · wikilink parser · docs-reader crash fixed

**Date:** 2026-07-09
**Agent:** Claude (Grim)
**Summary:** Consumed the navbar-logo fix (kol-workshop 0.1.2 + kol-brand 0.1.2), taught the kol-workshop markdown parser wikilink support, root-caused + fixed the `/workshop/docs/:id` crash (`useTagMode must be used within TagModeProvider` — a Vite-dev dual-context bug) with a `globalThis` singleton, and shipped it all in `kol-workshop@0.1.4` — published + consumed + build green. Prod was never broken.

## Changes Made

### Files Modified — monorepo (`apps/web`)
- `package.json` — `@kolkrabbi/kol-workshop` `^0.1.0` → `^0.1.4`.
- `src/App.jsx:189` — dropped `brandLogoSrc`/`brandLogoAlt` so ShellLayout renders the inline `<Asset>` wordmark (currentColor-aware) instead of the B2 `<img>` — fixes the dark/missing logo.
- `vite.config.js` — added the 4 missing raw-JSX `@kolkrabbi/*` pkgs (`kol-workshop`,`kol-dashboards`,`kol-chess`,`kol-brand`) to `optimizeDeps.exclude` (hygiene; not the crash fix — see below).

### Files Modified — DS repo (`kol-apparat/kol-design-system`)
- `packages/workshop/src/engine/parse-markdown.js` — new `[[target|display|#anchor]]` wikilink rule → emits a `.md` link token routed through the existing `resolveDocLink`. No render-layer change. Verified 4/4 cases.
- `packages/workshop/src/tags/TagModeContext.jsx` — `const TagModeContext = (globalThis.__KOL_TAGMODE_CONTEXT__ ||= createContext(null))` — the crash fix.
- `packages/workshop/package.json` — `0.1.2` → `0.1.3` (wikilink) → `0.1.4` (context fix).

### The docs-reader crash (root cause)
`/workshop/docs/:id` threw `useTagMode must be used within TagModeProvider`. **Not staleness, not the code — Vite-dev only.** Vite serves the raw-JSX package's `TagModeContext.jsx` under two URLs (barrel `?v=` vs direct import) → two React context objects → provider on one, consumer on the other. Every optimizeDeps permutation (exclude/include/dedupe/alias) only moved which consumer landed on the wrong instance. **Production renders the page fine** (single Rollup bundle = one context) — the deployed site was never affected. Fix: `globalThis` singleton so all module instances share one context. Verified rendering on a fresh dev server AND the prod build.

### Published (user's npm token)
- `@kolkrabbi/kol-brand@0.1.2` — `wordmark-workshop.svg` `fill="white"` → `currentColor`.
- `@kolkrabbi/kol-theme@0.7.2` — required by workshop 0.1.4 (was bumped locally, unpublished → blocked the consume until published).
- `@kolkrabbi/kol-workshop@0.1.3` (wikilink) then `@0.1.4` (wikilink + globalThis fix).

## Current State

### Working (verified)
- `kol-workshop@0.1.4` consumed (web resolves it), `kol-theme@0.7.2` pulled. Full `turbo run build --force` **5/5 green**.
- Docs-reader crash **fixed + verified** — doc pages render, 0 console errors, on fresh dev + prod build.
- Navbar logo on inline Asset wordmark (currentColor, both halves).
- Wikilink parser live in the package (renders `[[...]]` → doc routes).

### Known Issues / Open
- **User must restart their `pnpm dev`** to pick up 0.1.4 (harness blocks killing a process it didn't start).
- Theme-toggle regression still open (`.dark` class vs package `data-theme`).
- `packages/chess-data/` delete still pending (pre-merge cleanup).
- Publish-chain gaps keep biting (brand, then theme) — publishing one DS pkg needs its bumped deps published too; consider publishing bumped pkgs as a set.

## Next Steps
1. **Docs wikilink conversion** — convert `docs/documentation/*` links to `[[wikilinks]]` (parser now supports them) and wire the **11 orphans** (foundry INDEX is old-format + 6 scattered docs). Audit done this session.
2. Theme-toggle reconciliation onto `data-theme` without breaking the public site's `.dark` toggle.
3. Restart dev + live-verify the shell/docs/tag-graph render.
