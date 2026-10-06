# 🏁 Milestone: Workshop adoption — kol-workshop package, 0.30 wave, docs conformance

**Date:** 2026-08-08
**Agent:** Grim (Fable 5)
**Arc:** Converge kolkrabbi.io's workshop onto the same system kol-ds-ui runs — the published `@kolkrabbi/kol-workshop` engine — and bring the docs vault up to the contract it renders.
**Delivered:** Merged to main, Vercel green. Web's workshop runs the packaged shell (working ⌘K search, full 83-doc tree across both categories, scroll-spy rail with Related, namespace tags + graph); the in-repo `workshop-system/` fork is retired; the 0.30 wave is published and consumed by both apps; the docs vault conforms with zero offenders; `index.css` is imports-only in both apps.

## What closed

- **Web index.css dispersal** → done. 593 lines → imports-only; live rules in `styles/{tokens,fonts,animations,ui}.css`; truncation-damaged prose block replaced by DS `.kol-prose` adoption; dead rules + originals in `_tmp/2026-08-08-web-indexcss-dispersal/`.
- **Prose figure chrome** → done, user-ruled. Container border off (`kol-type-roles.css:193` collides with the Figure atom — documented in the ui.css override), atom's media frame kept, frame takes the media's own ratio, 2rem breather restored.
- **Wave published from kol-ds-ui** (`pnpm publish`) → done. theme **0.30.1** · component **0.24.0** · framework **0.13.0** · icons **0.10.0** · workshop **0.18.1**; shipped-packages ledger updated. The feared `.text-body` deletion never shipped — 0.30.1 carries it (`kol-opacity.css:399`).
- **Workshop adoption** → done. `TagModeProvider` + `WorkshopChrome` (app adapter mirroring the showcase's `ShellChrome`), `data/workshop/vault.js` on the package engine, ~12 import sites swapped, vite alias to the local copy removed, `workshop-system/` → `_tmp/2026-08-08-workshop-system-elder/`. Sidebar order user-ruled: Workshop · Documentation · Operations.
- **The @source footgun** → resolved + memorized. kol-theme's `kol-sources.css` manifest resolves siblings relative to its own pnpm virtual dir and reaches nothing — explicit app-side `@source` lines for all ten raw-JSX packages now in `index.css`, same pattern as the showcase. DS-side manifest fix is kol-ds-ui's to make.
- **Docs vault conformance** → done. 9 legacy-schema docs + 5 one-tag INDEXes fixed; 0 offenders, 83 unique ids, 0 collisions. `00-docs` rebuilt: About + Writing guidelines (moved from Foundation, dotfiles voice-tooling paths updated) + new Conventions page; fossil concept-index quarantined. `ds-adoption` moved to `operations/04-ds-adoption/` (it's process, not subject).
- **Card grids** → done. Four workshop overview grids off viewport breakpoints onto `repeat(auto-fill,minmax(17.5rem,1fr))` — snap 3→2→1 instead of compressing inside the railed shell.
- **Embed bypasses** → done this side. Showcase iframes carry `?embed=1` (inert until ui.kolkrabbi.io redeploys — kol-ds-ui's next deploy picks it up, nothing owed here); brand gained the `useEmbed` latch (ported, latch semantics verified both ways) and web's three brand srcs repointed off dead routes — live with this deploy.
- **StickyNavCard mono** → done. `kol-helper-16` → `kol-mono-14` (wrapping text belongs on the line-height-bearing ramp).
- **Verification** → done. Turbo build 3/3 --force, dev-walked both apps + full workshop with 0 console errors, prod bundle assets probed 200, Vercel green after merge.

## The arc (brief)

- Started as "is brand fully on the DS / can we merge" — the audit found web's `index.css` carrying a 593-line vendor block with a truncation bug that had silently killed article prose.
- The dispersal exposed the next altitude: the workshop was an in-repo fork of what kol-ds-ui had already packaged, solved, and proven (search, tags, tree grammar).
- Adoption meant publishing the DS's unpublished wave first — done cross-repo in the same session, then consuming it, then conforming the vault the engine renders.
- Session logs: `2026-08-08-web-indexcss-dispersal-imports-only.md` → this capstone. Prior context: the 07-30 brand-adoption milestone and the 08-01 nav rebuild.
