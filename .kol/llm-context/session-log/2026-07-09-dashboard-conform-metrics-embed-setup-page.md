# Session: Dashboard section conform — Metrics embed + Setup page

**Date:** 2026-07-09
**Agent:** Claude (Grim)
**Summary:** Second arc of the day (after the PageSection pilot): finished the Dashboard section — Overview + Metrics on framework anatomy, `dashboard/chess` dupe removed, workshop Metrics page now embeds the REAL `/metrics` dashboard (4 tabs), new prose "Setup" page, `.kol-prose` collision found + dodged. The Metrics treatment is now codified as the canonical anatomy every workshop page must conform to — see `plans/workshop-content-flow.md`.

## Changes Made

### Files Modified
- `apps/web/src/routes/workshop/DashboardOverview.jsx` — rewrite: intro + Explore + In-production PageSections; dead `analysis`/`performance` cards removed, `metrics` card added, `/metrics` use-case card links out.
- `apps/web/src/routes/Metrics.jsx` — +1 export line: `TABS`, `TimelineBar`, `DeployBar`, `SiteTab`, `ProjectTab`, `InfraTab`, `SessionsTab` now reusable.
- `apps/web/src/routes/workshop/DashboardMetrics.jsx` — rewrite ×2: first to PageSection chapters, then (user: "not connected blocks") to **embedding the real `/metrics`** — 4 tabs, timeline, deploy strip, host filter, via the new exports. ~280 lines of duplicated grids/transformers deleted.
- `apps/web/src/routes/workshop/DashboardMetricsSetup.jsx` — NEW prose page at `dashboard/setup` ("Setup"): Umami tracking, the 5 endpoints + cache windows, repo-snapshot caveat, `useMetricsData` flow; cross-links to Components/Metrics/live site; figure with live `DashMetricCard` + caption.
- `apps/web/src/data/workshop/navigation.js` — `dashboard/chess` child removed; order now Overview → Setup → Metrics → Components.
- `apps/web/src/App.jsx` — `dashboard/chess` → redirect to `/workshop/chess/metrics`; `dashboard/setup` route + lazy import added.
- `apps/web/src/components/shell/ShellLayout.jsx` — right-rail experiment (wider/304px-push/absolute) reverted to normal in-grid sticky; final change: TOC track 160→**224px**.

### Features Added/Removed
- Workshop `dashboard/metrics` = the production dashboard embedded (one source of truth, no fork).
- New Setup prose page; Setup **polish parked by user** — later remodel after a blog article, don't touch now.
- Chess concept fully out of Dashboard (redirect keeps bookmarks).

## Current State

### Working
- Whole Dashboard section conforms to the canonical anatomy; syntax-verified throughout; user render-verified through iterations.
- **Canonical page anatomy codified** in `plans/workshop-content-flow.md` ("the Metrics treatment", 8 rules) + full conform-sweep inventory for every remaining workshop page.

### Known Issues
- **`.kol-prose` contested:** web `prose.css` blog-prose always beats canon kol-typography cascade (unlayered wins). Framework pages must use canon atomics (`kol-sans-body-02`, `kol-helper-12`) — rule 7 of the anatomy. Real fix = rename one system (convergence slice).
- Legacy `RightGrotesk` double-declaration @500 still open (see previous log).
- Setup page prose wording is mine — user to re-read when remodeling it blog-style.

## Next Steps
1. **Conform sweep** per `plans/workshop-content-flow.md` Slice 3: overviews → Design System → Components → Chess → docs/gallery special cases.
2. Retire expansion machinery + `DesPage`/`DesSection` once consumer-free.
3. Later: remodel Setup after a blog article (user call).
