# WorkshopShellMobile — workshop header tabs clip; dashboard two-up cards overflow

**Filed:** 2026-08-25 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/WorkshopShellMobile.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — kol-framework 0.23.0; consumer half executed here 2026-08-26

## Why it went there

`nav.flex.flex-1.gap-6` is 613px on every `/workshop/*` page at 393 — tabs after Brand unreachable; `/workshop/dashboard/components` card rows overflow ~20px. kol-workshop + kol-dashboards chrome. Source: `.kol/llm-context/plans/2026-08-25-mobile-audit-web-brand.md`.

## Remainder here once it ships

bump kol-workshop + kol-dashboards

## ✅ RETURNED — 2026-08-26 · kol-framework@0.23.0

Half DS, half consumer. The tab strip already scrolls — `.kol-shell-header-tabs { overflow-x: auto }`, measured on production at 393: 345 wide, 613 of content, `scrollLeft` moves — but its scrollbar is hidden and the ACTIVE tab sat off-screen (`Dashboard` at x=347–445 in a strip ending at 369): the page you were on was the one tab you could not see. ShellHeader now scrolls the active tab to the strip start edge, before paint, only when it is out of view; the strip snaps to tab starts on a flick (`scroll-snap-type: x proximity` — not mandatory, which would refuse the last tabs). Verified in the showcase at a width where two tabs overflow: fresh load on the second tab → scrollLeft 44, tab fully in the strip; fresh load on the first → 0, untouched; route change → 44. No edge fade: the 2026-07-28 ruling against scroll-edge paint stands. The two-up cards are NOT DS chrome: `div.flex-1.space-y-4` and `div.flex-1.dash-card` are kol-website own `flex flex-row gap-6 items-start` rows in `apps/web/src/routes/workshop/DashboardComponents.jsx` (lines 182, 202, 220, 555, 579); `.dash-grid` in kol-dashboards already stacks by container query and is not used there. That half returns as the consumer remainder; kol-dashboards and kol-workshop have nothing to bump. 20 gates clean.

**Remainder here:** bump kol-framework >=0.23.0 (kol-workshop + kol-dashboards unchanged); stack the `flex flex-row gap-6` rows in `DashboardComponents.jsx` below `md`, or put them on `.dash-grid`

✅ **Remainder executed 2026-08-26 same session:** kol-framework ^0.23.0; the two-up rows in `DashboardComponents.jsx` → `flex flex-col md:flex-row gap-6 items-start` — SIX of them (182 · 202 · 220 · 362 · 555 · 579; the DS counted five, line 362 is the Meter variant). Verified 393 → `column`, 1280 → `row`, page 393 wide, zero console errors. The active-tab scroll did NOT fire on the bump alone: `ShellLayout` in kol-workshop 0.22.0 imports `ShellHeader` from its own nested kol-framework **0.20.1** (a `dependencies` range `^0.20.0`, which for 0.x never reaches 0.23). With a root `pnpm.overrides` forcing one copy, a fresh load at 393 lands the Dashboard tab at 79–177 inside the 24–369 strip (scrollLeft 268). Filed back as `NestedDsDependencies`.
