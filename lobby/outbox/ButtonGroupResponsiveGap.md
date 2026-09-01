# ButtonGroupResponsiveGap

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ButtonGroupResponsiveGap.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## Why it went there

A local rule in this repo is currently changing DS component behaviour. That is a
fork, not a fix — it belongs upstream.

## What stays here

A dated stopgap in `apps/web/src/styles/ui.css` citing this ticket by name, and
for CardFeatureZoomScale also `hooks/useMobileActiveCard.js` and the
`kol-card-lineart` marker on `SectionCards`' `itemClassName`.

## Remainder here once it ships

bump; delete the stopgap and any marker class or hook it needed; re-verify at
390×700.

## ✅ RETURNED — 2026-08-31 · kol-component@0.147.0

The gap is responsive now: gap-2 stacked, sm:gap-4 as a row. Your read was the right one — the group changes axis at sm, so one fixed 16 was doing horizontal separation between two side-by-side buttons AND vertical separation between two full-width stacked ones, and those do not want the same number. Shipped as a responsive default rather than a prop, for the reason you gave: the stacked case IS the narrow viewport, so the value is pickable once instead of per consumer. Nothing moves at sm and up. Note className still lands on the OUTER container by design — with the gap responsive there is nothing left to reach for.

**Remainder here:** bump kol-component >=0.147.0, delete the stopgap and the kol-btn-group-tight class from Home.jsx and HomeWorkshop.jsx
