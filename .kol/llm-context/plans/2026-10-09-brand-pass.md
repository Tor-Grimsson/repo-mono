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

## 2b. Slide deck — olina's is further (user, 2026-10-09)

kol-olina `apps/brand` has the deck as a working tool: routes `/slide-deck/:slug` (view) and
`/slide-deck/:slug/edit`, and 15 files under `components/loaders/decks/` (SlideStage, SlideRenderer,
SlideThumb, DeckFile, deckStore, useDeckHistory, layerOps, snap, slideExport, uploadToBucket,
webFonts…). This repo has the manager, the templates page and three deck files, with Layout / Set 1 /
Set 2 as placeholders. Diff the two before deciding: port olina's forward (copies, no upstream —
olina ARCHITECTURE §14), or lift it into a package if both keep it.

## 3. The pass (proposal)

1. Sweep every brand route at 1440 and 390 — links (status of every href), images (naturalWidth 0), AC strings, unresolved colour vars — into one list before any edit.
2. Decide per section: re-author for Kolkrabbi, or take off the live site (fashion-only: labels, bags, packaging, probably social).
3. Fix the rest: lockups art, colour ramps, stationery layout, links.
