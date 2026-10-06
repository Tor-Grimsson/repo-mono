# StackModeChromeAndAncestors — measured on the live page, not guessed

**Filed:** 2026-09-04 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/StackModeChromeAndAncestors.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-09-04

## Why it went there

Three chrome defects at 390 × 844, measured with Playwright against the deployed site on component
0.209.0 — `getComputedStyle` and `getBoundingClientRect`, not a screenshot read.

1. **The ancestor chain renders as rows.** 14 rows at the bucket root, and the first two are
   `KOL-R2B2` and `R2 · kol-media`, both `is-selected` so both painted. 120px of an 844px viewport
   restating the breadcrumb directly above them.
2. **The stack root keeps the desktop frame** — `1px solid` + `radius 4px`. The references have no
   frame; the divider is the only line.
3. **The folder glyph is 12px inside a correct 44px box**, where a file's thumbnail fills its 44.
   Ragged icon rail. Grid is already right.

## What I owned in the ticket

**Defect 1 is my spec's fault, and the entry says so before it says anything else.**
`ColumnBrowserStackMode` shipped a table containing both *"ancestors are reached by back"* and
*"inline expand, capped at three levels of indent"*. Those contradict: back means the ancestors are
off-screen, an indent cap implies they are on it. Rendering the chain is a defensible reading of
that. My own wireframe drew it correctly and I never checked the build against my own drawing.

The corrected ruling is one sentence: **the list renders the current level's contents only**, an
expanded folder splices its children under it, and nothing above the current level is ever a row.

## Verified right, and named so it does not get touched

Row height 60 · zones `14 / 44 / 174 / 20` · divider at 74 · indent 16/36/56 · grid 3 × 102.7 with
tiles 103 × 137 and thumbs filling the box · folder and file meta both correct · no horizontal
scroll. The four-zone row and the grid are good.

## What stays here

Nothing. **`stackView` is now wired** — it shipped in 0.204.0 forwarded by the page and this app
never passed it, so there was no grid at all until today; that was mine, not theirs. It rides a
`md:hidden` LIST | GRID control in `headerActions`, because item 7 of the first ticket hid the
desktop cluster and put nothing in its place.

**The process changed with this ticket.** The user authorised Playwright against the deployed site
after three rounds in which every single defect was found by him sending a screenshot. Measurement
before filing is the arrangement now, and the DoD says so.

## ✅ RETURNED + MEASURED — 2026-09-04 · kol-component 0.211.0

All four shipped and verified on the deployed site at 390 × 844. Measured, not looked at:

```
ancestor rows      gone — first row is `labs-render-examples`, 10 rows (was 14)   ✓
indent             padding-left 16px at the base level (was 56)                   ✓
fills              0 rows painted (was 2 at fg-04)                                ✓
frame              border 0px · radius 0px below md                               ✓
zone-2 glyph       44px in a 44px box, same rail as a thumbnail                    ✓
wordmark           81 × 36, ONE line (was 48 × 72, breaking mid-token)             ✓
horizontal scroll  none                                                            ✓
```

**The split gesture works.** Chevron on `video` splices its 10 children directly under it at
`padding-left: 36`, the hash does not change, no ancestor appears, and the back control still reads
`‹ KOL-R2B2`. That is IMG_2557's behaviour.

**Their correction to my §3 is right and worth recording:** the 12px I measured was the disclosure
chevron, which is 12 by spec — on a folder row the chevron is the first `<svg>`, on a file row
`thumbnailFor` supplies an `<img>`, so my selector was comparing different elements. The zone-2 glyph
was 20 in a 44 box. The ragged rail was real; my number was wrong.

**The root cause of §1 was structural, not cosmetic:** navigating and expanding were both `onPrefix`,
so the walk began at the true root and every ancestor became a row. They are separate now — the row
navigates, the chevron expands locally. The two rules in my spec only fought because one piece of
state was doing both jobs.

## ✅ RETURNED — 2026-09-04 · @kolkrabbi/kol-component@0.211.0

All four. The ancestor chain was structural, not a spec contradiction: NAVIGATING and EXPANDING were both `onPrefix`, so the walk began at the true root and every ancestor became a row. They come apart — the ROW re-bases the list, the CHEVRON expands from local state that clears on level change, which is what item 11 always said the two tap targets were for. Depth restarts at the current level, so rows sit at 16. Border and radius dropped below md. Glyph and box now share one ZONE_BOX constant. The header's fixed w-48 dropdown was the real cost of the title wrap — it is md: now and the title truncates; `headerActions` documents that it holds about one consumer icon at 390, naming the swap-below-md pattern. Correction recorded: the 12px glyph reported was the disclosure chevron, 12 by spec — the zone-2 glyph was 20 in a 44 box, so the ragged rail was real and the number was not. Re-measured at 390 by kol-r2b2 on the deployed build: ancestor rows gone, 10 rows, indent 16, 0 fills, border 0, glyph 44, wordmark one line, no horizontal scroll.

**Remainder here:** none — re-measured on the deployed build
