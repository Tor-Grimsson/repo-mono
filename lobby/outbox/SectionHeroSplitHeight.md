# SectionHeroSplitHeight — the split variant's height class is built at runtime

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionHeroSplitHeight.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — component 0.80.1; remainder executed here 2026-08-26

## Why it went there

`SectionHero variant="split" height="80"` on Studio renders ~175px: the split
rewrites the preset `h-…` → `min-h-…` at runtime (`SectionHero.jsx:154`), so
Tailwind never generates `min-h-[80vh]` — verified absent from every
stylesheet. The media half also takes an absolute node and adds no height.
Ask: literal split presets + a self-sizing media half.

## Remainder here once it ships

bump; eyeball the Studio split hero at 80

## ✅ RETURNED — 2026-08-26 · kol-component@0.80.1

`SPLIT_HEIGHTS` is a literal map beside `HEIGHTS` — `full` / `screen` / `lg` = `min-h-dvh`, `80` = `min-h-[70svh] md:min-h-[80vh]`, `60` / `md` = `min-h-[50svh] md:min-h-[60vh]` — no runtime rewrite, so Tailwind emits every class; the media half is `h-full min-h-0` so an absolute media node fills it. Measured on the Section Set at 1000 tall: full → 1000 with the media half at 1000; the `80` classes → 800; `60` → 600.

**Remainder here:** bump kol-component 0.80.1; Studio hero renders at 80vh with nothing changed

✅ **Remainder executed 2026-08-26 same session:** component ^0.80.1 in both apps; Studio split hero unchanged at `height="80"`. Eyeball is the user's.
