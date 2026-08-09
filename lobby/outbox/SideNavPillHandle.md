# SideNavPillHandle — the grab edge becomes the single sidenav control

**Filed:** 2026-08-09 → **kol-ds-ui** (live, via cross-session build order — the DS session was in-flight)
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `shipped` · 2026-08-09 same day — `@kolkrabbi/kol-framework@0.17.0`, built to spec with the proto's hook logic lifted wholesale (pill as `.kol-sidenav-grab::before`, grab-w 8px, click-toggle w/ 3px slop, `--kol-sidenav-snap-default` token, dblclick reset gone, chip Button deleted in both states). ✅ **Remainder executed:** both apps bumped to ^0.17.0 the same hour. Proto in `_tmp/2026-08-09-sidenav-pill-proto/` is history — job done

## The spec, in one breath

Rest-visible pill on the grab edge (dim → bright on hover/focus, RecordManager
rest-visible-grip direction) · hit area 4→8px · click toggles collapse (3px
slop) · snap-to-default band on release (own token; step=16px felt right) ·
double-click reset removed (conflicts with click — Home/Enter/Space carry the
keyboard) · everything else 0.16.0 stands.

Reference implementation (hook verified working before the 0.28.0 outage
killed the demo): `_tmp/2026-08-09-sidenav-pill-proto/useDragResizeProto.js`.

## What stays here

- **On ship: bump kol-framework in both apps.** No local fork this time — the
  2026-08-09 proto froze a moving markup contract and burned; that lesson is
  agreed on both sides ("returns as a brief, not a fork").
