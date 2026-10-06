# ColumnBrowserStackMode — the column view has no phone form

**Filed:** 2026-09-03 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ColumnBrowserStackMode.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-09-03
**Wireframe:** https://claude.ai/code/artifact/085f1e65-756d-492e-9a74-73be6dbd41a7
**Reference set:** `_tmp/ref/IMG_2553–2560.PNG` (iOS Files · Dropbox, 390pt) · draft at `_tmp/2026-09-03-mobile-browser-scope/`

## Why it went there

`ColumnBrowser` puts hierarchy on the x-axis, which is bought with width a phone has none of.
`ColumnBrowser.jsx` carries **zero** breakpoint utilities and the theme has **no** `@media` rule for
any `.kol-column-browser-*` class — there is no responsive fallback because none was written.

Measured at 390 × 844 on **`media.olina-productions.com`**, not here: a different repo running the
same organisms. The layout reproduced across repos as intended and took the missing mobile story
with it, which is what makes this a DS gap rather than one site's bug.

## What went

Seven items. Three failures measured (clipped second column · an 800px void from a desktop drag
value · the crumb row wrapping then clipping `COLUMN`), and the mobile form both references
independently arrived at: one level at a time, hierarchy carried by a back control that names the
parent.

**The user ruled the fork: inline expand, capped at three levels, falling through to push below.**
His reasoning is the ticket's spine — the organism exists because he wanted Finder's behaviour, a
parent that stays put while you look at its child; push-and-back throws that away and leaves a file
list any component could render.

Also recorded there, because it would otherwise be re-litigated: `folderView: 'rows'` is **not** the
cheap answer. It renders folders only, no files, so a phone would get a folder list and a separate
wall for the same directory.

## Left open, deliberately

Whether the library wall stays stacked under the browser on mobile. kol-r2b2 stacks `browse` +
`library` under the 2026-08-26 one-view ruling; both references show one list per screen. The ticket
names it as the user's call and tells the DS not to decide it inside the work.

## What stays here

Nothing to hold — no stopgap was written for this and none should be. The organism is unusable at
this width until the mode ships; the admin is a desktop surface in the meantime, which is what it
has always been in practice.

**No fold was offered.** Stated in the ticket rather than left as an omission: the height, the column
rendering, the crumb row and the toggle row are all internal, and `columnHeight` is a controlled
value whose *unit* is the problem, not its plumbing. This repo can contribute measurements, the
reference set and the wireframe, and did.

## ↩ MEASURED — 2026-09-03 · component 0.195.0 → measured on 0.197.0

kol-ds-ui built it the same day it was filed and said plainly it could not verify at 390 (no device
harness there, and this ticket's DoD rules out a narrowed desktop). Measured on a real iPhone against
the deployed `media.kolkrabbi.io`, and the measurement is appended to their entry.

**Three items hold:** one full-width list, no x-scroll (1) · the viewport is the height, the 800px
void is gone (4) · a file tap opens the full-screen inspector (6). Item 7 holds — the toggle cluster
is hidden. Items 2 and 3 were not exercisable: the measured path sat inside the indent cap, so no
back control and no elision to see.

**Two defects reported back:**

- **D1 — inline expand is not implemented.** `ColumnBrowser.jsx:487` is a flat loop, one pass per level: every folder, then every file, then descend. A loop that appends cannot insert, so an open folder's children always land after **all** its siblings — visible with `R2 · kol-media` open and its children below `B2 · vault`. Their comment at `:485` says "spliced in directly under it"; `:494` says "nothing recursive here". The second is why the first isn't true.
- **D2 — the date is raw.** `metaOf` at `:502` formats the size and passes `o.uploaded` through untouched, so a row reads `2026-06-19T02:00:14.629Z`.

**And one that is this ticket's fault, not theirs.** Item 5 said "rows carry a meta line (size ·
date)" — folders have neither, which is why they render bare. The references put `date · N items` on
a folder. A spec defect; carried into the follow-up rather than patched here.

**This ticket now closes on D1 + D2.** Everything else moved to `ColumnBrowserMobileViews` — the four
views this one never described, the row anatomy, and the tab-pill ruling that answers the
library-wall question it left open.

## ✅ RETURNED — 2026-09-04 · @kolkrabbi/kol-component@0.211.0

D1 and D2 both fixed. D1 was ORDER: a flat loop over the open path appended each level after the whole level above it, so an open folder's children landed after its last sibling and, in the reported tree, after an unrelated ROOT FILE — every row present at the right depth, which is why it read as an indent bug. The walk is recursive and the subtree is contiguous under its parent. D2 is a new `formatDate` seam beside `formatSize`, ISO date-only by default. The walk is lifted to `stackRows()` so ORDER is checkable — a structural assertion passes on the broken version, an adjacency one does not. Inline expand re-measured on the deployed build at 390 by kol-r2b2: the chevron splices a folder's children directly under it, which is the IMG_2557 behaviour the whole arc was for.

**Remainder here:** none — verified on the deployed build
