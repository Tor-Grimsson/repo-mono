# Handoff — 2026-07-09 22:11

## Goal of the current arc
Finish **#3: connect the workshop documentation to the markdown parser.** The docs viewer is broken — user reports only ~2 demo texts, no real docs, and one link 404s. The workshop *assembly* was brought local this session precisely so docs/layout can be fixed without a package republish.

## Last actions taken (causal trail, newest first)
- Diagnosed the app-wide blank on a fresh dev server = **the user's in-progress kol-store work**, not the docs: `PrintsGrid.jsx`/`PrintsGridGsap.jsx` import `PrintGridCard` from `@kolkrabbi/kol-store`, and the resolved `kol-store@0.1.0` doesn't export it (0.1.1 does; stale in the graph/`.vite`). An ESM missing-export blanks the whole app. **Do not rabbit-hole on this — it's the user's, not mine.**
- Reverted a fragile force-light-on-workshop-mount hack (theme is one global switch; per-page light fights it).
- Made the workshop light-default + working theme toggle (`ThemeToggle` now drives `.dark` + `data-theme`, key `theme`; `index.html` boot default dark→light). Verified live.
- Fixed the navbar wordmark (KOLKRABBI h-6 left in the 256px slot, WORKSHOP h-6 over the content column, no slash) + removed the header `max-w-[1800px]` (full-bleed). Verified.
- Brought the workshop assembly local: copied `kol-workshop/src` + `kol-framework`'s `ShellHeader`/`ThemeToggle` into `apps/web/src/workshop-system/`; aliased `@kolkrabbi/kol-workshop` → that dir in `vite.config.js`; added `@kolkrabbi/kol-brand` as a direct dep. Build green; docs-reader crash structurally gone (first-party source).

## Current state / open decision points
- **#3 NOT done.** The reader (`workshop-system/docs/DocumentationReader.jsx`) + inventory (`data/workshop/documentationInventory.js`) **code looks correct** (globs all ~69 docs, matches `docId`→module by basename). Break is likely in the docs **listing/navigation** (sidebar "Documentation" section) or the `/workshop/docs` index — **not verified live** because the app is blanked by the kol-store crash.
- **Blocker to testing:** app blanks on a fresh server → clear `apps/web/node_modules/.vite` and confirm `kol-store@0.1.1` resolves, THEN reproduce the docs break. (User's kol-store — touch minimally.)
- DS bumps `kol-workshop@0.1.5` / `kol-framework@0.3.3` are now **moot for the monorepo** (local copy owns the assembly) — publish only for the package/showcase.

## Next intended action
- Clean boot (clear `.vite`), open `/workshop/docs` + expand the sidebar **Documentation** section, and trace why only ~2 demo texts list + one 404s. Prime suspect below.

## Working memory not yet in AGENT-CONTEXT
- **Strong lead for the 404/dead-links:** `Documentations.jsx` (the `/workshop/docs` index) renders `docs/documentation/INDEX.md` through the parser. That INDEX.md links sections as wikilinks like `[[00-docs/INDEX|Docs]]`. The local parser now emits `.md` link tokens for wikilinks, and `resolveDocLink` matches by **basename** → `INDEX` — but index-file IDs in the inventory are `\`${parentFolder}-index\`` (e.g. `00-docs-index`), so `INDEX` is **not** a known id → those links render **dead / 404**. Likely why the "docs" the user clicks go nowhere.
- The local `workshop-system` is **aliased, not import-rewritten** — files still say `from '@kolkrabbi/kol-workshop'` but resolve local. Reversible (drop the alias).
- Individual docs DO render at `/workshop/docs/:docId` (verified `03-markdown-parser` earlier). So the reader works; the *navigation into* it is the broken part.
- **Do not touch** `kol-store` / `routes/prints/*` — user's in-progress work; it only *blocks* by crashing the app, it isn't the docs bug.
