# OverlaySearchFieldZoomsIOS — the 16px coarse floor misses the search overlay's field

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/OverlaySearchFieldZoomsIOS.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01

## Why it went there

Measured on production `/workshop` under real iPhone 13 emulation with `pointer: coarse` matching true: the field computes 14px and its shell is NEITHER `.kol-control` nor `.kol-expand`, so the theme's floor cannot reach it. `ShellSearchOverlay` renders its own `<input>` inside a `<label class="… kol-mono-14">`. Both the field and the floor are the DS's.

## What stays here

Nothing.

## Remainder here once it ships

bump; re-check `/workshop` on a real iPhone — tap the search field, confirm the page does not zoom.

## ✅ RETURNED — 2026-09-01 · kol-theme@0.117.0

Both routes at once: kol-theme 0.117.0 adds .kol-control--bare to the coarse-pointer 16px floor's selector, and kol-component 0.150.0 stamps that marker (zero chrome of its own) on SearchInput's bare body plan — so every future bare field is covered structurally, not per-site. Sweep of text-entry inputs outside both shells found one more: QuadrantSync's two number inputs (desktop inspector) — left as is, noted in the changelog.

**Remainder here:** bump kol-theme@0.117.0 + kol-component@0.150.1; re-check /workshop on a real iPhone — tap the search field, page must not zoom

✅ **Remainder executed 2026-09-01 same session:** theme 0.117.0 + component ^0.150.1 (0.150.0 deprecated — broken publish, per the DS's correction); measured under iPhone 13 emulation (`pointer: coarse` true): the overlay field computes 16px. The real-iPhone tap check is the user's.
