# Clearspace graphics carry Another Creation's signature

**Filed:** 2026-10-14 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/done/ClearspaceGraphicsAreAnotherCreations.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` 2026-10-14 — kol-component 0.260.0

## Why it went there

The `x` layer of kol-component's `clearspace-*` graphics is a client's signature; brand's
`ClearspaceDiagram` paints it over every Kolkrabbi lockup.

## Stopgap here

`clearspace={false}` on the four cards in `pages/brand/Lockups.jsx` — the page is Kolkrabbi again,
without the clearspace diagram.

## What stays here

On return: bump kol-component, turn `clearspace` back on, eyeball `/brand#logos-types`.
**Remainder here:** bump + flip the prop.

## ✅ RETURNED — 2026-10-14 · kol-component@0.260.0

The twelve `structure/diagram-*` layers are Kolkrabbi's: `logo` is the kol-brand mark verbatim inside its clearspace, `x` is the unit — the logomark, ghosted, filling each corner square (clearspace = logomark height on all sides), `grid` is the frame, the margin lines and the four unit squares, stroked `currentColor`. Names unchanged, one viewBox per variant, so `ClearspaceDiagram` needs no change. Note: kol-brand's `kol-lockup-vert.svg` is a wide KOL · mark · KRABBI lockup, not a vertical one — taken verbatim, so that card's diagram is wide.

**Remainder here:** bump kol-component ^0.260.0; turn `clearspace` back on in `pages/brand/Lockups.jsx`; eyeball `/brand#logos-types`.

## 🟢 RETURNED — 2026-10-14 (same day)

kol-component 0.260.0: the `clearspace-*` graphics carry the KOL marks and the clearspace measure. **Not on the registry when the return landed** (latest 0.259.0) — the `^0.260.0` range was tried, did not resolve, and was put back to `^0.257.0`; `clearspace` stays off.

**Remainder here:** bump kol-component ≥0.260.0 once it is on the registry, drop the four `clearspace={false}` props in `pages/brand/Lockups.jsx`, eyeball `/brand#logos-types`.

✅ **Remainder executed — 2026-10-14, minutes later.** 0.260.0 reached the registry; component ^0.260.0 in all four apps (one copy); the four `clearspace={false}` props dropped in `pages/brand/Lockups.jsx`; brand rebuilt and measured: every lockup card draws grid (0.2) · the logomark as the clearspace measure (0.3) · the mark — the signature path is gone from all four, 0 console errors.

**Remainder here:** none.
