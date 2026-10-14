# brand.kolkrabbi.io — the pass

**Date:** 2026-10-09 · scope only, nothing changed.
**Trigger (user, walking the live site):** "this still shows another creation in brand, what else is brand behind on?"
**Fact:** the live site IS current `main` (Vercel `kol-brand`, production built 2026-10-09 22:28 from `ws-1005`). Nothing here is a stale deploy — every item below is in the code.
**State:** OPEN — its own session.

---

## 1. Flagged by the user (2026-10-09, screenshots)

| # | Where | What |
|---|---|---|
| 1 | `/brand#logos-types` (Lockups) | Logomark, wordmark and both lockups render **Another Creation** — signature + "ANOTHER CREATION". `LogoCard` → `KolLogo` imports `@kolkrabbi/kol-brand/svg/kol-*.svg`, which ARE Kolkrabbi (checked) — so the AC art reaches the page another way (ClearspaceDiagram? a variant map?). Trace before fixing. |
| 2 | `/brand#color` | Swatches not connected: every Yellow / Red ramp stop shows `#FAFAFA`. `data/color.js` names `brand-yellow-*` / `brand-red-*`; no CSS var by that name is defined anywhere in the app or kol-theme. |
| 3 | brand (Combo lab, e.g.) | Broken links. |
| 4 | `/assets` Stationery | Broken assets: envelope clipped/overflowing, the letterhead wordmark over the body text. |
| 5 | `/assets` Stationery · Letterhead A4 [B] | Broken format — and its copy is AC's (Linen Coat, edition 14/24, horn buttons, "AC neck label"). |
| 6 | `/assets` Labels & tags | Fashion labels (style/size/price, care label, edition card) — irrelevant to Kolkrabbi. |
| 7 | `/assets` Garment bags | Same — dress bag, dust bag. |
| 8 | `/assets` Social · post sizes | Wrong brand: AC model photo + AC lockup on all three sizes. |
| 9 | `/assets` Social · Profile | Wrong colours: avatars on AC's cream and burgundy (copy says "round-cropped on burgundy, signature centered" — AC's). |

Packaging (`/assets` Packaging) is very likely the same as 6–7 — not yet looked at.

## 2. Already known

- `/library` still on `MediaLibrary variant="library"` / `"browse"` — the DS and media moved to `explorer` (10-09 log; the user's call).
- AGENT-CONTEXT *Awaiting rulings* #7: `brand/data/blog-data.js` · `shop-data.js` · `collections-data.js` — AC content, zero importers.
- `StationeryMocks.jsx:431, :568` hard-code `ANOTHER CREATION`.

## 2b. Editors — deck + notes, from olina (user 2026-10-09, re-raised 2026-10-13)

Not forgotten, not parked: written here on 10-09 as "diff before deciding", and the brand pass has not
started. The user's ask, 10-13: **brand.kolkrabbi.io gets a notes editor and a slide-deck editor**, the
way kol-olina `apps/brand` has them. Decision taken: **port olina's forward** (copies, no upstream —
olina ARCHITECTURE §14); a package only if a third app ever wants them.

What olina has and we do not (`~/dev/projects/kol-olina/apps/brand/src`):

| | olina | here |
|---|---|---|
| Deck | `/slide-deck/:slug` view · `/slide-deck/:slug/edit` (`SlideDeckEdit.jsx` 421 lines) · 17 files under `loaders/decks/` | manager with disabled Rename/Export/Delete, templates page, 3 deck files, Layout / Set 1 / Set 2 placeholders |
| Notes | `/notes` · `/notes/new` · `/notes/:slug` (`Notes.jsx` 230 · `NoteEdit.jsx` 197) | nothing |
| Storage | both save through olina's media API — `functions/api/decks.js` · `notes.js` (+ `_id.js`, `_files.js`) — into **D1**; localStorage holds the draft/autosave | our media API has no D1 and no `decks` / `notes` endpoints |

**The storage is the gate.** The editors are copies; what they write to does not exist here yet. The
D1 database in `2026-10-13-r2-permanent-ids.md` is the same database — `decks` and `notes` tables
ride on it. Order:

1. D1 created and bound (`2026-10-13-r2-permanent-ids.md` §1) — the user's account step.
2. `apps/media/functions/api/decks.js` + `notes.js` ported from olina, with their tables in the schema.
3. Deck editor: copy olina's `loaders/decks/` (17 files) over our 3, `SlideDeckEdit` + `SlideDeckView`
   pages, the manager's three actions wired (Rename / Export / Delete), routes `/slide-deck/:slug` and
   `/slide-deck/:slug/edit`. Layout / Set 1 / Set 2 placeholders go.
4. Notes editor: `Notes` + `NoteEdit` pages, routes `/notes`, `/notes/new`, `/notes/:slug`, a NOTES
   category in the sidebar.
5. Both editors write with the media admin's login (olina's `authHeader(getPassword())` pattern);
   reading stays open.

Not decided: whether the deck's exported slides and note attachments go to R2 under the permanent
scheme (they should — same plan) and where NOTES sits in the sidebar order.

## 3. The pass (proposal)

1. Sweep every brand route at 1440 and 390 — links (status of every href), images (naturalWidth 0), AC strings, unresolved colour vars — into one list before any edit.
2. Decide per section: re-author for Kolkrabbi, or take off the live site (fashion-only: labels, bags, packaging, probably social).
3. Fix the rest: lockups art, colour ramps, stationery layout, links.
