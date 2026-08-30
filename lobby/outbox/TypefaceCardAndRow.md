# TypefaceCardAndRow — typeface row ink ladder · card title = row title · card hover reveal

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TypefaceCardAndRow.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — theme 0.64.0 · component 0.95.0; remainder executed here 2026-08-27 (bumped, `*Class` seams + group-hover wiring dropped, `reveal` adopted, library swapped onto the DS pair, `TypefaceLibraryItem.jsx` → `_tmp/2026-08-27-typeface-library-ds-swap/`)

## Why it went there

Tuned locally on `/foundry`'s typeface library as a TEMP first item beside the
local `TypefaceLibraryItem`, approved on screen: the row's name and
classification are full ink with the year at 64 (type untouched); the card's
title is the row's `kol-mono-14 uppercase`; the card's hover fades the plate
and glyph out and a pangram in over the inverse surface.

## What stays here

The TEMP block in `TypefaceLibraryGridWithVariables.jsx` (L132–181) carrying
the values as `titleClass` / `detailClass` / `dateClass` / `bodyClass` seams
and a two-layer `media` node on `group-hover`. `TypefaceAlphabet.jsx` (the
measured specimen band) is consumer content and stays regardless.
`TypefaceLibraryItem.jsx` still renders the rest of the list.

## Remainder here once it ships

bump; drop the `*Class` overrides on both; move the pangram into `reveal` and
the glyph back to a plain `media`; swap the remaining local cards for the DS
pair (`ContentCollection cols={{ md: 2, lg: 4 }}`), retire
`TypefaceLibraryItem.jsx` → `_tmp/`, remove the TEMP block

## ✅ RETURNED — 2026-08-27 · kol-theme 0.64.0 · kol-component 0.95.0

(1) Row ink ladder as ruled: title kol-mono-14 uppercase text-emphasis, detail kol-mono-14 text-emphasis, date kol-mono-12 text-fg-64, body unchanged — measured on the comparison row: emphasis / 48 / emphasis / 64. (2) Card title = the row's string, kol-mono-14 uppercase text-emphasis — measured. (3) reveal on ContentCard (typeface / canvas): .kol-card.has-reveal — plate + media fade to 0, the reveal node to 1, 300ms house curve, hover:hover only, reduced-motion opt-out; measured plate 1→0, media 1→0, reveal 0→1. Without reveal nothing changes.

**Remainder here:** bump kol-theme 0.64.0 + kol-component 0.95.0; the library drops its group-hover titleClass/bodyClass wiring and the two-layer media node — media is the glyph, reveal={<p className="text-auto-inverse …" style={{ fontFamily }}>The quick brown fox…</p>}
