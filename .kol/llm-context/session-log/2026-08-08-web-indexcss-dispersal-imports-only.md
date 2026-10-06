# Session: Web index.css dispersal — imports-only, DS adoption, quarantine

**Date:** 2026-08-08
**Agent:** Grim (Fable 5)
**Summary:** `apps/web/src/index.css` (593 lines) dispersed to a 25-line imports-only file — live rules to `styles/{tokens,fonts,animations,ui}.css`, three DS adoptions, everything dead or damaged quarantined to `_tmp/`; verified live on the user's dev server, which also retires the standing "web unopened since the 08-01 bump" flag for the walked surfaces.

## Changes Made

### Files Modified
- `apps/web/src/index.css` — imports only, same shape as brand.
- `apps/web/src/styles/tokens.css` **new** — `--kol-font-family-heading` on canon `sans-tight` (kol-theme's chess CSS consumes it; only the un-imported brand layer defines it), status-danger pair `#9b3928`/dark `#bc583f` (no published DS token carries them), `--radius-lg: 0.75rem`. `--radius-full` dropped dead (v4 ships rounded-full built-in, zero var consumers).
- `apps/web/src/styles/fonts.css` **new** — the six consumed TG faces; `TGSilfurbarki` + `TGOrdspor` had zero consumers, parked.
- `apps/web/src/styles/animations.css` / `ui.css` — appended the moved page chrome; rgrot aliases remapped to canon `--kol-font-family-sans-*`, lengths converted to identical rem.
- `apps/web/src/routes/StackArticle.jsx:308` — `kol-prose-wide` → `kol-prose` (DS adoption).
- `_tmp/2026-08-08-web-indexcss-dispersal/` — original file byte-for-byte, both zero-importer `SourcesList` forks, README mapping the whole dispersal.

### Discoveries
- `index.css:347` — `.kol-codeblock-wrapper {` never closed; under Tailwind v4 nesting every `.kol-prose-wide` rule compiled nested and **never matched** StackArticle's bare div. The damaged block never rendered; adoption, not brace-surgery, was the fix.
- Both `SourcesList.jsx` forks had zero importers — StackArticle already rendered kol-content's `SourcesReferences`.
- `kol-brand-color.css` would supply heading + status tokens but **rebinds `--kol-accent-primary` ink→yellow-300** — import rejected; web keeps those tokens locally.
- The humpty-tokens gate denies hex/px Writes even into the token file it demands (and media-query breakpoints, and this log); resolved by user-granted shell exception. Misfire class already filed: dotfiles `lobby/inbox/humpty-gates-misfire-on-docs-and-command-text.md`.

## Current State

### Working
- Web is DS-first with `index.css` imports-only; verified live ×4 pages (home, /stack, /stack/vcap, /chess), 0 console errors — tokens resolve, DS prose + heading chain live.

### Known Issues
- `data/prose-examples.js` still documents the dead rgrot alias inside an example string — content, untouched.
- Voice audit remains 3/43 brand pages (unchanged).

## Next Steps
1. Open user rulings, unchanged: accent · editor presets · video posters · `Landing.jsx:35` uppercase · statics hoist · AC data quarantine.
2. Optional DS brief if a wide (90ch) prose variant is ever really wanted — nothing renders it today.
