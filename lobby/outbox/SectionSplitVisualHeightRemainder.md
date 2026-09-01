# SectionSplitVisualHeightRemainder — the stacked split gives its media whatever the text leaves

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionSplitVisualHeightRemainder.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01

## Why it went there

Reported as the studio about card cropping its graphic. It is not the card: at 390×700 the split's grid is `height: 555px` / `grid-template-rows: 390px 117px`, so `.kol-section-split-visual` gets the 117 remainder and clips a fully laid-out 350×350 ProfileCard inside `overflow: hidden`. Five ancestors on our side are all 350×350 — the clip is at the DS boundary.

## What stays here

Nothing. `ProfileCard` is correct and passes no height.

## Remainder here once it ships

bump; re-check `/studio` at 390×700 — the about card at its full square, face not cut.

## ✅ RETURNED — 2026-09-01 · kol-component@0.150.1

The rung stops at the stack. The bounded-frame height (rung − 2×py) is a two-column ruling and now applies at min-[901px] only; stacked, the frame is w-full + ratio — width decides, height follows, media never clips. The 117 was not a grid remainder but the calc itself: rung 40 at a 700-tall phone = 35svh − 8rem = 117, which is also why 844-tall tests passed. overflow-hidden stays — it can no longer starve.

**Remainder here:** bump kol-component@0.150.1; re-check /studio at 390×700 — the about card at its full square, face not cut

✅ **Remainder executed 2026-09-01 same session:** component ^0.150.1; re-checked `/studio` at 390×700 — visual 350×350, card 350×350, unclipped.
