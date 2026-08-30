# SectionHeroFootGap — end-justified text sits too far above the foot

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionHeroFootGap.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.92.0; remainder executed here 2026-08-27

## Why it went there

0.86.0's clearance = ramp + overlap puts the text mid-hero. Tuned locally:
the right inset is overlap + ~50px. Ask: the DS pads that, not the ramp,
when a foot is present.

## What stays here

`translate-y-24 md:translate-y-44` on the Stack hero's `SectionText` panel.

## Remainder here once it ships

bump; drop the translate from `Stack.jsx`

## ✅ RETURNED — 2026-08-27 · kol-component 0.92.0

justify=end with a foot: the content's bottom inset is overlap + 32px (48 from md), not overlap + the padding ramp; without a foot the ramp applies as before. Measured on the demo at default overlap 250: text bottom 48px above the foot at 1280 and 900, 32 at 390; foot rises 250 at every width.

**Remainder here:** bump kol-component 0.92.0; Stack.jsx drops the translate-y-24 md:translate-y-44 on its SectionText panel

✅ **Remainder executed 2026-08-27 same session:** component ^0.92.0 in both apps; the translate dropped from Stack's panel. Builds green.
