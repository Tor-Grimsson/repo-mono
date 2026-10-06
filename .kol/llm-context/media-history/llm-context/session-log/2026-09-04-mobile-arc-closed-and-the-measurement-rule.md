# Session: The mobile arc closed, and the rule that measuring comes before filing

**Date:** 2026-09-04
**Agent:** Claude (Grim)
**Summary:** Took the mobile browser from unusable at 390 to the reference shape across six DS releases (0.209 → 0.215), wired the three seams and the tab bar, and changed how this repo verifies — Playwright on the deployed build instead of shipping and asking the user to QA it.

## Changes Made

### Files Modified
- `package.json` — component 0.197.0 → **0.215.0** across six bumps; theme 0.145.0, icons 0.27.0.
- `src/App.jsx` — the three seams (`folderMeta`, `thumbnailFor`, `formatDate`), then `TABS` = Browse · Files · Kinds wired through `useMediaQuery('(max-width: 767px)')`, one surface at a time below `md` and both pages stacked above it. `unroot()` strips the virtual root both seams are handed. The Files tab gets `layout: 'list'` below `md`. The LIST | GRID header workaround was added, then **deleted** once the DS's `···` carried List/Icons.
- `scripts/folder-tree.mjs` — bakes a **recursive per-folder tally** (`counts`) in the pass it was already making, so `folderMeta` is a lookup rather than an O(n)-per-folder scan against 3443 keys. `src/data/folder-tree.json` 127 KB.
- `src/lib/settings.js` — `stackView: 'list'`, the mobile half of `folderView`.
- `index.html`, `public/manifest.webmanifest`, `public/touch-icons/` — Add to Home Screen (earlier in the arc).
- `_media/` — 387 identity assets deduped from 608, `build-sheet.py` → `sheet.html`, gitignored.
- `lobby/` — three tickets filed, measured and closed 🟢; both ledgers squared.

### Features Added/Removed
- **Browse · Files · Kinds as a bottom tab pill below `md`** — the answer to the library-wall question, user-ruled from the wireframe. Kinds opens the overview; dismissing it returns to Browse, because a tab with nothing behind it is a dead end.
- Folder counts, image thumbnails, short dates, a reachable grid, and sort — which had been unreachable on a phone since item 7 hid the desktop cluster.

## Current State

### Working
Verified at 390 × 844 on the deployed build, measured not eyeballed: ancestor rows gone (10 rows, base indent 16) · zero painted rows · frame 0/0 · glyph 44-in-44 · wordmark one line · inline expand splices children under the row with the hash unchanged · tab bar fixed at 56 with the last row clearing it · both tabs reading `19.6.2026` · no horizontal scroll.

### Known Issues
- **`_media/` is a paused review.** `kol/logo/` holds 18 files whose `-2`/`-3`/`-4` suffixes are filename collisions needing a ruling on which wordmark is current; the 20 `kol-vector` forms carry no fill and render as nothing; `favicon.svg` is byte-identical to `logo.svg` in several repos.
- **R2 still has zero SVGs.** Nothing uploaded.

## Next Steps
1. **`_media/sheet.html` review**, then normalise, then decide the home — the argument landed on `@kolkrabbi/kol-marks` as the source with an R2 `svg/` mirror for browsing, because a bucket cannot end the copying while boot icons must sit in `public/`.
2. The marks scope is at `_tmp/2026-09-03-vector-folder.html`, unfiled.

---

## What this session was actually about

Three rounds went by in which **every defect was found by the user sending a screenshot** — the container frame, the fills on expanded ancestors, the ancestor chain rendered as rows, the missing grid. All of it visible in one look at the deployed page. Reference images, two wireframes I drew myself, and Playwright were all available. His words: *"you have 1 REFERENCE IMAGES 2 WIREFRAMES 3 PLAYWRIGHT — HOW ARE YOU STILL FUCKING UP"*, and earlier *"did you even look at the refs?"*

The 08-28 log already said it: *"Shipping and asking is what made today take 30 rounds; measuring is what closed it in one."* I wrote that and then did the opposite for three days.

**Two failures were mine, and both are the same failure.**

- **A spec that described behaviour and not substance.** `ColumnBrowserStackMode` pulled ONE navigation rule out of eight reference screenshots. The DS built exactly that rule, correctly, and it shipped thin. The refs are five views plus a constant chrome. A spec gets back what it describes.
- **A spec that contradicted itself.** The same ticket said both *"ancestors are reached by back"* and *"inline expand, capped at three levels"*. Those fight, and the DS resolved them by rendering the ancestor chain. Their root cause was better than my read: navigating and expanding were both `onPrefix`, so one piece of state was doing two jobs.

**After Playwright, the shape changed.** The last three tickets each landed with the correct things named as correct — row height 60, zones 14/44/174/20, divider at 74 — which is what let the DS touch only what was wrong. Two defects (the tab-bar spacer, the `formatDate` gap) were found by measuring and would not have surfaced otherwise.

**One finding worth carrying beyond this repo:** the Files tab rendered a filter bar above nothing because `layout: 'off'` is forced in `loadSettings` — a 2026-08-27 ruling that was *right* when the wall sat under the browser and stopped being right the moment it got its own tab. **A ruling expiring when its reason expires is the thing nothing checks.**

**And a systemic one, filed as such:** four times a prop was documented in one place and not forwarded to its sibling — `settingsFooter`, `thumbnailFor`/`folderMeta`, then `formatDate`. Filed the fourth as an ask to widen the rule rather than patch again; kol-ds-ui widened it and diffed the two page signatures rather than trusting the single report.
