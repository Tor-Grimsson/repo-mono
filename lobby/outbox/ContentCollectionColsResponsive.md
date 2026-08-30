# ContentCollectionColsResponsive — `cols` per breakpoint

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ContentCollectionColsResponsive.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.89.0; remainder executed here 2026-08-27

## Why it went there

Three across the 1600/1800 container makes bigger cards than live's 1400;
user wants four at the top breakpoint. `cols` is a single number today.
Ask: `cols={{ md: 3, xl: 4 }}`.

## Remainder here once it ships

bump; `/stack` → `cols={{ md: 3, xl: 4 }}`

## ✅ RETURNED — 2026-08-27 · kol-component 0.89.0

cols takes a breakpoint map: cols={{ md: 3, xl: 4 }} → one column below md, three from md, four from xl (sm · md · lg · xl · 2xl, counts 1-6, literal classes per rung). Number form unchanged. Measured on the demo: 4 tracks at 1400, 3 at 1279 and 900, 1 at 390.

**Remainder here:** bump kol-component 0.89.0; /stack passes cols={{ md: 3, xl: 4 }}

✅ **Remainder executed 2026-08-27 same session:** component ^0.89.0 in both apps; `/stack` on `cols={{ md: 3, xl: 4 }}`. Same pass: the filter bar's LIST/GRID strip wired (`layoutOptions`, header placement) — it had been left off in the card swap.
