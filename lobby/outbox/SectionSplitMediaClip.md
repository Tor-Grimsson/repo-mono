# SectionSplitMediaClip — the split's media frame clips a 3D-tilted node

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionSplitMediaClip.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — component 0.76.3; remainder executed here 2026-08-26

## Why it went there

Home foundry split: `TiltCard` (3D spring tilt) back in the media slot, and
the frame's `overflow-hidden` (`SectionSplit.jsx:96`) cuts the card's corners
as it rotates — the "jagged edges". The slot promises an interactive node;
the frame doesn't let one move. Ask: `mediaClip={false}` seam.

## What stays here

`TiltCard` carries `rounded-[var(--kol-radius-sm)]` so its corners match the
frame. Clip remains until the seam ships.

## Remainder here once it ships

bump; `HomeFoundry` → `mediaClip={false}`; eyeball the tilt on Home

## ✅ RETURNED — 2026-08-26 · kol-component@0.76.3

`SectionSplit mediaClip` (default `true`): `false` drops the frame's `overflow-hidden` — the frame keeps its ratio and radius, the node owns its own clipping, so a 3D-tilting node keeps its lifted corners. `mediaHover` and a self-animating node are noted as mutually exclusive in the JSDoc and the reference page.

**Remainder here:** bump kol-component 0.76.3; HomeFoundry passes `mediaClip={false}` with its TiltCard

✅ **Remainder executed 2026-08-26 same session:** component ^0.76.3 in both apps; `HomeFoundry` moved from the `FeatureSplit` alias to `SectionSplit` (`align="left"` · `label` · `headline` · `actions` · `ratio`) with `mediaClip={false}` around `TiltCard`. Build green; the tilt eyeball is the user's.
