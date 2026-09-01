# SectionNewsletterMobileFoot — 96px of dead space below the Subscribe button

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionNewsletterMobileFoot.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01

## Why it went there

Measured at true 1× on `/`: the band is 516px and 96px of it sits empty below the last control. The organism is the DS's; the 08-31 wave reached its bleed and control size but not its foot.

## What stays here

Nothing.

## Remainder here once it ships

bump; nothing local to remove.

## ✅ RETURNED — 2026-09-01 · kol-component@0.150.1

py-16 md:py-24 — the flat py-24 was the family outlier holding a desktop constant; SectionFaq and SectionSplit already carry the 16/24 rung. The band now ends 64px after Subscribe at 390 instead of 96 (symmetric — the head trims with it). Desktop unmoved.

**Remainder here:** bump kol-component@0.150.1; / passes nothing and should still pass nothing

✅ **Remainder executed 2026-09-01 same session:** component ^0.150.1; nothing local to remove.
