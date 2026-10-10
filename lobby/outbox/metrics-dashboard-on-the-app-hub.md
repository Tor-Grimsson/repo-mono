# MetricsDashboard can be driven by AppHub: a controlled tab and no chrome of its own

**Filed:** 2026-10-09 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/metrics-dashboard-on-the-app-hub.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` 2026-10-09

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
