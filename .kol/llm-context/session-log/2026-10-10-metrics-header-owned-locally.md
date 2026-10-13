# Session: Metrics header owned locally, phone layout consumed

**Date:** 2026-10-10
**Agent:** Grim (Opus 5.5)
**Summary:** Metrics now has media's header pattern (display title · section dropdown on a phone / borderless tabs at desk · gear drawer for range + host), owned in a local copy of the dashboard composition; kol-dashboards 0.5.0 + kol-theme 0.172.0 fixed the card heights; dev proxy, status bar and page ground fixed.

## Changes Made

### Files Modified
- `apps/metrics/src/MetricsDashboard.jsx` — NEW: local copy of kol-dashboards 0.5.0's composition (cards/charts/constants still imported from the package — chess shares it). Header: `METRICS` in `kol-sans-display-03 text-auto`; `SegmentedToggle tone="sunken"` (borderless) at desk, `Dropdown` below md; gear → `SettingsPanel` drawer with Range + Host. Meta line `host · range · hosts`. DeployBar + milestone ticker share one row as two halves, each its own underline; the left underline stops at its content; the ticker runs off the right edge (`-mr-6`), desk only. TimelineBar, HostFilterPills removed.
- `apps/metrics/src/App.jsx` — imports the local composition.
- `apps/metrics/src/index.css` — body ground (`--kol-surface-primary`) + safe-area padding.
- `apps/metrics/index.html` — `black-translucent` + `viewport-fit=cover`.
- `apps/metrics/vite.config.js` — dev `/api` proxy → metrics.kolkrabbi.io (kolkrabbi.io's functions retired 10-06; dev showed "error").
- `apps/*/package.json` · lockfile — kol-theme 0.172.0 (exact, all four), kol-dashboards ^0.5.0 (metrics).
- `apps/web/index.html` · `public/manifest.webmanifest` — home-screen app named "Kolkrabbi"; icon URL `?v=2` (iOS cache).
- `lobby/outbox/` — `metrics-dashboard-on-a-phone` 🟢 consumed; `metrics-dashboard-on-the-app-hub` withdrawn (DS told; kol-dashboards stays the DS's).
- `plans/2026-10-09-metrics-mobile.md` — rewritten as the navigation audit.

## Current State

### Working
- Metrics built and rendered at 390 and 1440, no errors, no horizontal scroll; the user reviewed it on 5176.
- Studio + metrics Vercel `git_info_fail` (GitHub 403) redeployed READY via the API.

### Known Issues
- All of the above is in the working tree — live on the user's push.
- `MetricsDashboard.jsx` is now a fork of the package composition: kol-dashboards updates to the TABS reach it only through its imports.

## Next Steps
1. Brand pass — `plans/2026-10-09-brand-pass.md`.
2. Foundry review · DMARC · R2 structure (AGENT-CONTEXT queue).
