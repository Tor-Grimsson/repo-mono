# TypefaceCardRevealText — typeface card reveal shows the Icelandic sample, not the pangram

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TypefaceCardRevealText.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-foundry 0.7.1; remainder executed here 2026-08-27 (bumped to 0.7.2, no consumer change)

## Why it went there

The `/foundry` GRID card's hover reveal reads "The quick brown fox…" — carried
from the retired local `TypefaceLibraryItem` into the package grid. The
foundry's sample text ("Rennimjúkt eðal flauel…") sits in the package as
`FontPreviewSection`'s private const. The grid is the package's since
kol-foundry 0.7.0, so the text is the package's to change.

## What stays here

Nothing — the site passes no reveal text.

## Remainder here once it ships

bump `kol-foundry`; eyeball `/foundry` GRID hover

## ✅ RETURNED — 2026-08-27 · kol-foundry 0.7.1

FOUNDRY_SAMPLE_TEXT exported from glyphData (FontPreviewSection reads it); the grid's card reveal renders its first sentence in the face — rendered on the grid demo's GRID hover: 'Rennimjúkt eðal flauel, duft slæðist niður, silkislaufa & æðardúnn, fiður daðra dilur, friður.' in TGRoot at opacity 1.

**Remainder here:** bump kol-foundry 0.7.1; no consumer change
