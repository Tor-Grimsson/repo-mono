# FontPreviewClampAndBearings — line clamp back per rung; glyph side bearings not clipped

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/FontPreviewClampAndBearings.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-foundry 0.7.3; remainder executed here 2026-08-27 (bumped, no consumer change)

## Why it went there

`FontPreviewNoClamp` was filed on my misreading of *"the sample is cutting"*
— it meant the italic glyphs (`s`, `ð`, `f`) clipped at the box's left/right
edges, not the line clamp. 0.7.2 removed the clamp and now renders the whole
passage (30 lines at 96); production's 1/3/4/5-line ellipsis clamp was
correct. This ticket restores the clamp and asks for side room for the
overhangs (em-scaled inline padding with a negative margin; the wrapper clips
vertically only).

## What stays here

Nothing — the site passes nothing to the ladder. Until it returns, typeface
pages render the unclamped 0.7.2 version.

## Remainder here once it ships

bump `kol-foundry`; eyeball a typeface page's Font Preview at all four rungs
(ellipsis back, first-letter bearings intact)

## ✅ RETURNED — 2026-08-27 · kol-foundry 0.7.3

The ladder's clamp is back — 96/1 · 64/3 · 48/4 · 24/5 with the ellipsis (0.7.2 was my misread). Side bearings: the clamped element carries padding-inline 0.15em / margin-inline -0.15em (14.4px at 96, scaling down the rungs) and the wrapper no longer clips. Rendered: 1 / 3 / 4 / 5 lines, -webkit-line-clamp 1 / 3 / 4 / 5, wrapper overflow visible.

**Remainder here:** bump kol-foundry 0.7.3; no consumer change
