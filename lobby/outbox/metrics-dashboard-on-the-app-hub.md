# MetricsDashboard can be driven by AppHub: a controlled tab and no chrome of its own

**Filed:** 2026-10-09 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/metrics-dashboard-on-the-app-hub.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** ⚪ `parked` in kol-ds-ui 2026-10-09 · synced 2026-10-13 — kol-dashboards stays the DS's

## Why it went there

The user: metrics must look like media / fxr / kolkrabbi.io / ui.kolkrabbi.io on a phone — the app
frame, not only a fixed layout. That is kol-shell `AppHub` (apps/media-hub's wiring), and the dashboard
must be drivable by it.

## Stopgap here

None.

## What stays here

On return: add kol-shell to metrics (dependency, `@source`, `optimizeDeps` — the three wirings), wire
`App.jsx` as media-hub does (AppHub · hash routing · the four tabs as items · PageShell · ModalProvider),
render at 390 and 1440 beside media, push. **Remainder here:** the wiring + measure.

## ⚪ PARKED — squared 2026-10-13

kol-ds-ui parked it 2026-10-09 (its ledger: "kol-website audits the metrics header + nav first; kol-dashboards stays here; nothing built"). The header was then built locally on 2026-10-10 — `apps/metrics/src/MetricsDashboard.jsx` owns the title, tabs and gear drawer, so there is nothing left for AppHub to drive. Not actionable here.

**Remainder here:** none.
