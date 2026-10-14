# Session: The D1 arc — permanent media URLs, decks + notes API, brand deck and notes editors

**Date:** 2026-10-14 (the work ran the evening of 2026-10-13)
**Agent:** Grim (Fable 5.1)
**Summary:** One Cloudflare D1 database unlocked three things in one evening: the media app's R2 files got permanent URLs (rename edits a row, the object never moves), `/api/decks` + `/api/notes` landed behind the admin login, and brand gained olina's deck editor and notes editor. Two DS tickets filed and consumed same day.

## Changes Made

### Files Modified
- `apps/media/wrangler.toml` — `[[d1_databases]]` binding `DB` → `kol-media` (`5bf8981d-…`, WEUR, created by the agent after the user re-ran `wrangler login` for the D1 scope).
- `apps/media/schema.sql` — NEW: `files` (key · folder · name · size · type · uploaded · thumb; `(folder,name)` unique) · `decks` · `notes` · `events`. Applied `--local` and `--remote`.
- `apps/media/functions/api/` — `_id.js` · `_files.js` · `_cors.js` (allowlist: kolkrabbi.io, brand., media., localhost 5173–5177/5199) · `_middleware.js` (preflight bypasses auth, CORS on write responses) · `upload.js` (stores at `f/<id>.<ext>` + row; same path overwrites in place) · `list.js` (R2 listed from D1: `key` = path, `storageKey` = R2 key; **adopts** objects the dotfiles `bucket-r2` CLI puts straight in R2 and **prunes** legacy rows whose object is gone; B2 untouched) · `rename.js` (row edit only; folder move = one UPDATE) · `object.js` · `download.js` (path → row → key) · `decks.js` · `notes.js` (olina, verbatim).
- `apps/media/src/App.jsx` · `KindOverview.jsx` — thumbnails / previews on `storageKey` (the row to `mediaUrl`).
- `apps/brand/src/components/loaders/decks/` — 14 editor files from olina (DeckFile · DeckSettings · deckStore · layerOps · slideDoc · slideExport · SlideInspector · SlideRenderer · SlideStage · SlideThumb · snap · uploadToBucket · useDeckHistory · webFonts). **Ours kept:** `SlideDeck.jsx` · `DeckShell.jsx` · `deckStyles.js` (the Right Grotesk deck).
- `apps/brand/src/pages/` — `SlideDeckEdit` · `SlideDeckView` (NEW) · `SlideDeckManager` · `SlideDeckTemplates` (olina's on `CatalogPage`; ours → `_tmp/2026-10-13-brand-decks-elder/`) · `Notes` · `NoteEdit` (NEW).
- `apps/brand/src/lib/` — `adminAuth.js` (sessionStorage `kol.admin`, one prompt per tab) · `notesStore.js` (NEW) · `mediaClient.js` exports `ADMIN_BASE` (`VITE_ADMIN_BASE` override).
- `apps/brand/src/data/templates.js` — NEW, the 14 layout DOCUMENTS only (no section components). `data/decks.js` — `detail` on Right Grotesk.
- `apps/brand/src/App.jsx` · `components/framework/sidebars.config.js` — routes `/slide-deck/:slug`, `/slide-deck/:slug/edit`, `/notes`, `/notes/new`, `/notes/:slug`; Slide deck = Library · Template (Layout / Set 1 / Set 2 placeholders gone); NOTES category after LIBRARY = Library · Write. `styles/decks.css` — one rule.
- `apps/brand/package.json` — `pdf-lib@1.17.1` (the deck's PDF export). `apps/*/package.json` — kol-component ^0.257.0 (all four), kol-media-client ^0.6.0 (brand + media).
- Identity in the ported docs: 'Olina Productions' → 'Kolkrabbi', cover 'Olina / Productions' → 'Kolkrabbi / Vinnustofa', 'O' → 'K', 'New York · 2026' → 'Reykjavík · 2026', olina-productions.com → kolkrabbi.io, info@ → hello@kolkrabbi.io, @olinaprojects → @kolkrabbi_; fonts Bricolage → Right Grotesk (static cuts in the exporter); keys `kol.deck` / `kol.note` / `kol.admin`.
- `lobby/` — `MediaLibraryUrlOnStorageKey` filed and returned 🟢 (component 0.257.0 + media-client 0.6.0: the DS wrappers map path → `storageKey`). `BackgroundVideoStartsAtLowestRendition` 🟢 (component 0.255.0; hero on DS `BackgroundVideo`, local `HlsVideo` → `_tmp/2026-10-13-local-hlsvideo/`).
- Plans: `plans/2026-10-13-d1-arc.md` (master) · `2026-10-13-r2-permanent-ids.md` · brand pass §2b. Playbook `playbook/2026-10-13-home-fix-round.md` carries the whole evening.

### Features Added
- Permanent media URLs on R2 with no migration — every existing object kept its key (434 adopted on the first live list, `storageKey == key` for all).
- Decks and notes persistence (D1) behind the one admin password, callable cross-origin from brand.
- Brand: deck editor (stage · inspector · filmstrip · settings · file import/export/PDF · explicit save to D1), deck viewer, notes library + editor with bucket attachments.

## Current State

### Working
- Media deployed (`1b5c7ce4.kol-media-admin.pages.dev`): local harness verified upload → rename → folder move (storageKey unchanged) → download by new path → delete; decks and notes PUT/GET/DELETE; preflight 204; 401 without auth; CLI put adopted, CLI delete pruned. Live list, decks 401, B2 list unchanged.
- Brand builds; walked on `vite preview` + playwright: `/slide-deck`, `/slide-deck/template` (14 layouts render with KOL identity), `/slide-deck/right-grotesk/edit` (14 tiles, 228 layers, draft seeded), `/slide-deck/right-grotesk`, `/notes` (prompt → dismissed → "Cancelled.") — 0 console errors.

### Known Issues
- Not exercised: a deck SAVE or note SAVE from brand against the live API (needs the admin password in a real browser).
- The Right Grotesk deck card shows a MISSING cover plate — no `cover` in the registry.
- Olina's chapter names and city list remain as placeholder copy inside the 14 layout documents; the editor is where they change.
- Everything is in the working tree; brand goes live with the user's deploy.
- ARCHITECTURE §8 does not yet name D1 as the fourth piece of the media app (three stores + one database).

## Next Steps
1. Open brand, save a deck and a note with the admin password; rename a file on media.kolkrabbi.io and open it from the explorer.
2. ARCHITECTURE §8: one line for D1 (binding `DB`, schema in `apps/media/schema.sql`).
3. Metrics queue (`plans/2026-10-09-metrics-mobile.md` §4) · Monitor tile → HLS on B2 · brand pass §1–3.
