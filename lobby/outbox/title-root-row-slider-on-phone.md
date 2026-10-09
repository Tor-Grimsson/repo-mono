# The title-root count line draws the row-size slider on a phone, where it does nothing

**Filed:** 2026-10-09 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/title-root-row-slider-on-phone.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` 2026-10-09

## Why it went there

User's iPhone at media.kolkrabbi.io, `KOL-R2B2 · all`: a bare slider under the bucket rows that does
nothing. The package renders the row slider unconditionally in the title-root branch, and `rowSize`
only reaches desktop rows. No prop here can hide it.

## Stopgap here

None, on purpose.

## What stays here

On return: bump kol-component in all four apps (one copy), redeploy media, check the title root on a
phone. **Remainder here:** bump + redeploy media.

## Answered — 2026-10-09

kol-ds-ui closed it as **@kolkrabbi/kol-component@0.250.0**. Resolution: `~/dev/projects/kol-ds-ui/lobby/done/title-root-row-slider-on-phone.md`.

**Remainder here:** bump kol-component to ^0.250.0, redeploy media, check the title root on a phone

✅ **Executed 2026-10-09:** kol-component ^0.250.0 in all four apps (one copy); media rebuilt and deployed. Measured on iPhone 13 emulation at the title root (`KOL-R2B2 · all`): three bucket rows, no slider.

**Remainder here:** none
