# SectionHeightForty — add `40` to the section height ladder

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionHeightForty.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.84.0; remainder executed here 2026-08-27

## Why it went there

A CTA or cards band at a 60vh minimum is too much air. User: add `40`
(35svh / 40vh) to the shared ladder, every section, default stays `60`,
nothing else changes.

## Remainder here once it ships

bump; pass `height="40"` on the page-foot CTA and the cards bands if wanted

## ✅ RETURNED — 2026-08-27 · kol-component@0.84.0

`40` = 35svh / 40vh on the shared `sectionHeights` map and on `SectionHero`'s own two maps, so every section with `height` — hero (media + split), split, cards, FAQ, CTA — takes it. Default stays `60` everywhere; nothing else moves. Measured on the Section Set at 1000 tall: the 40 classes compute min-height 400 on the CTA and on the split hero.

**Remainder here:** bump kol-component 0.84.0; pass `height="40"` on the page-foot CTA and the cards bands that want less air

✅ **Remainder executed 2026-08-27 same session:** component ^0.84.0 in both apps; Studio process split on `height="40"` (user). Nothing else passed.
