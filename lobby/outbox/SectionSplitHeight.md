# SectionSplitHeight — one `height` ladder on every section (split · cards · faq · cta)

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionSplitHeight.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.82.0 (split only; cards · faq · cta re-filed as `SectionHeightLadder`); remainder executed here 2026-08-27

## Why it went there

Only the hero sizes; split, cards, FAQ and CTA are content + padding. User:
not consistent. Ask: `height` as min-height on all four with the family's
three names (`full` · `80` · `60`), default `60`, literal classes.

## Remainder here once it ships

bump; eyeball every section at the default — Studio, Home, foundry, licensing, page foot

## ✅ RETURNED — 2026-08-27 · kol-component@0.82.0

`SectionSplit height` — min-height on the family's ladder, the same three names as `SectionHero`: `full` = 100dvh, `80` = 70svh / 80vh, `60` = 50svh / 60vh, the default. Literal class strings, no runtime rewrite; the section is a flex column so the two columns stay vertically centred inside the min-height and the padding sits inside it. Measured on the Section Set at 1000 tall: computed min-height 600 / 800 / 1000 for 60 / 80 / full; the inner grid centred. BREAKING-flagged: every split that passes nothing now stands at least 60vh.

**Remainder here:** bump kol-component 0.82.0; Studio process split and Home foundry split take the default — pass `height="80"` where a page wants more

✅ **Remainder executed 2026-08-27 same session:** component ^0.82.0 in both apps; Studio process split + Home foundry split on the default 60, nothing passed. The widened half (cards · faq · cta) was not in the return → `SectionHeightLadder` filed. Eyeball is the user's.
