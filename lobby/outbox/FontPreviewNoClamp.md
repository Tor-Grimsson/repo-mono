# FontPreviewNoClamp — the specimen passage renders whole, no line clamp

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/FontPreviewNoClamp.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-foundry 0.7.2; remainder executed here 2026-08-27 (bumped, no consumer change)

## Why it went there

On the typeface pages `FontPreviewSection` cuts the Icelandic sample with an
ellipsis at every rung of its size ladder (`-webkit-line-clamp` — 1 line at 96,
3 at 64, …). User (2026-08-27): *"the sample is cutting in typefaces."* The
section is kol-foundry's since 0.7.0.

## What stays here

Nothing — the site passes no clamp.

## Remainder here once it ships

bump `kol-foundry`; eyeball a typeface page's Font Preview

## ✅ RETURNED — 2026-08-27 · kol-foundry 0.7.2

The default SIZE_LADDER carries no lines, so no rung clamps; lineClamp stays an opt-in per rung. Rendered on the demo: the full passage at 96 / 64 / 48 / 24 — 30 / 20 / 14 / 7 lines, -webkit-line-clamp none, the text's bottom inside its box at every rung.

**Remainder here:** bump kol-foundry 0.7.2; no consumer change
