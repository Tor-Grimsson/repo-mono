# Session: Workshop docs system — parser/inventory/link fixes

**Date:** 2026-07-09
**Agent:** Grim (Opus 4.8)
**Summary:** `/workshop/docs` rendered 2 of 70 vault docs; fixed grouping, INDEX case-sensitivity, and cross-link resolution so the whole vault renders + navigates. Engine confirmed as a portable zero-dep extract.

## Context

`docs/documentation/*` was already wired into `/workshop/docs` (glob → inventory → local `workshop-system/` reader), but only **2 of 70** docs surfaced and cross-links rendered dead. Root causes were in the taxonomy/inventory layer, not the wiring. The workshop docs engine (`apps/web/src/workshop-system/engine/`) is already a clean, framework-agnostic, zero-dependency module — the goal was to prove that (it lifts into the user's separate markdown-parser collection) and close the defects breaking the render.

## Changes Made

### Files Modified
- `apps/web/src/workshop-system/engine/doc-helpers.js` — `groupDocsByMajor` now derives the category from the **folder number in `doc.file`** (was the id's leading number = the *file* number within its folder → mis-filed/dropped every renumbered `NN-slug` doc). Added pure `resolveDocId(url, knownIds, currentFolder)` — resolves a `.md` link target to a doc id (handles `INDEX.md → <folder>-index`, cross-folder files, `#anchors`).
- `apps/web/src/workshop-system/engine/parse-markdown.js` — inline tokenizer text-runs now stop at `{`/`#` so `{#rrggbb}` swatches aren't swallowed and mis-emitted as a fake `#rrggbb` hashtag; unordered-list regex accepts `+` markers (CommonMark).
- `apps/web/src/workshop-system/engine/build-inventory.js` — index-file id derivation made case-insensitive (`baseId.toLowerCase() === 'index'`); the vault authors `INDEX.md`, which previously collapsed every folder index to a colliding id `INDEX` instead of `<folder>-index`.
- `apps/web/src/workshop-system/engine/index.js` — export `resolveDocId`.
- `apps/web/src/workshop-system/docs/DocumentationReader.jsx` — `resolveDocLink` now delegates to engine `resolveDocId` + a memoized `currentFolder` (from the active doc's `file`); index-content module lookup made case-insensitive (matched lowercase `index.md`, files are `INDEX.md`).
- `apps/web/src/data/workshop/documentationInventory.js` — same case-insensitive index-id fix as `build-inventory.js` (this is the live app's injected inventory).

### Files Added
- `apps/web/src/workshop-system/engine/selfcheck.mjs` — standalone, zero-dep self-check (parser tokens/blocks, `+` bullets, `resolveDocId`, folder grouping). Runs under plain `node`; this is the portable/extractable proof.
- `apps/web/src/workshop-system/engine/verify-vault.mjs` — repo-specific sweep: reads all vault docs, resolves every `.md` link, reports unresolved targets.

## Current State

### Working
- `/workshop/docs` sidebar lists all folders — **70 docs** (was 2).
- Index docs get unique `<folder>-index` ids; they route, render, and their links resolve (`01-foundation-index` verified — previously "Document Not Found").
- `node selfcheck.mjs` — all asserts green (parser + resolver + taxonomy).
- `node verify-vault.mjs` — 70 docs, 0 parse failures, **154/160** links resolve.
- Verified live on `:5173`, 0 console errors (landing, `03-markdown-parser`, `01-foundation-index`).
- `workshop-system/engine/` remains zero-dep and framework-agnostic — copyable into an external parser collection as-is.

### Known Issues (editorial, NOT system)
- 6 unresolved links are stale content: old versioned filenames in doc *text* (`0.0.1-writing-guidelines.md`, `2.3.0-css-architecture.md`, `00-metadata/…`) + 2 pointing outside the vault to `docs/operations/`.
- Stale doc prose — e.g. `01-foundation/03-markdown-parser.md` still says "tables not supported" and cites old routes/filenames while the code has moved on. Not content-synced this session.
- The `+` bullets visible in rendered lists are a CSS marker (`prose.css:126 content:"+"`), not the source markers — the `+`-marker parser change only affects the 1 file that authors `+` bullets.

## Next Steps
1. **Editorial pass** on `docs/documentation/*`: fix the 6 stale link targets; refresh stale prose (parser doc first). User's lane — not touched here.
2. Extract `workshop-system/engine/` into the user's markdown-parser collection (user carries it over — CWD boundary).
3. Resume the follow-up talks that were gated on this being done.
