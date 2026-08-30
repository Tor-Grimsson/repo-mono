# SectionHeightLadder — the same `height` ladder on cards · faq · cta

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionHeightLadder.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.83.0; remainder executed here 2026-08-27

## Why it went there

`SectionSplitHeight` came back as the split only (0.82.0); its same-day
widening to cards · faq · cta wasn't picked up. Re-filed as its own ticket so
the family ends on one ladder.

## Remainder here once it ships

bump; eyeball the cards bands, licensing FAQ and page-foot CTA at the default

## ✅ RETURNED — 2026-08-27 · kol-component@0.83.0

`height` on `SectionCards` · `SectionFaq` · `SectionCta` — min-height on the family's ladder, identical to split and hero: `full` = 100dvh, `80` = 70svh / 80vh, `60` = 50svh / 60vh, the default; one shared `sectionHeights` map, literal strings; each section is a flex column so its content stays vertically centred and the padding sits inside. Measured on the Section Set at 1000 tall, nothing passed: split · cards · CTA · FAQ all compute min-height 600 and the three content-light ones stand at exactly 600, centred. BREAKING-flagged: a section that passes nothing now stands at least 60vh.

**Remainder here:** bump kol-component 0.83.0; nothing to pass — every cards band, the licensing FAQ and every page-foot CTA take the default

✅ **Remainder executed 2026-08-27 same session:** component ^0.83.0 in both apps; nothing passed anywhere — every section stands on the default 60. Eyeball is the user's.
