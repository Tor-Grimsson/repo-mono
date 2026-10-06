# Session Log: Kol Monitor Apparat Page & Subdomain Setup

**Date:** 2026-04-08
**Status:** Completed

## Overview

Added Kol Monitor to the workshop apparat section (route, nav entry, iframe page). Assisted with Vercel custom subdomain setup via Cloudflare DNS.

## Key Accomplishments

### 1. Vercel Subdomain Setup for Kol Monitor
Guided setup of `monitor.kolkrabbi.io` pointing to `kol-monitor-six.vercel.app`:
- Cloudflare CNAME: `monitor` → `cname.vercel-dns.com` (DNS only, not proxied — proxy breaks Vercel SSL)
- Then added `monitor.kolkrabbi.io` as custom domain in Vercel project settings

### 2. Kol Monitor Apparat Page
**File:** `apps/web/src/routes/workshop/KolMonitor.jsx`

Created iframe embed page following the established apparat pattern (same as KolDistress, KolMirror, etc.):
- Iframe src: `https://monitor.kolkrabbi.io/`
- Full-height layout via `ShellFullHeightContext`
- Collapsed TOC sidebar via `ShellTocCollapsedContext`
- Standalone fullscreen toggle button

### 3. Route & Navigation Registration
- Added import + route in `App.jsx` at `apparat/kol-monitor`
- Added nav entry in `navigation.js` under apparat children with `stat-chart-a` icon, live/repo links

### 4. Workshop Search Bug Noted
User reported workshop search overlay crashes with React ErrorBoundary "Something went wrong" page. Saved as tech debt for investigation in a future session (needs dev server + console to reproduce).

## Files Modified

### New Files
- `apps/web/src/routes/workshop/KolMonitor.jsx` — Iframe embed page for Kol Monitor

### Modified Files
- `apps/web/src/App.jsx` — Added KolMonitor import and route
- `apps/web/src/data/workshop/navigation.js` — Added kol-monitor entry to apparat children

## Next Steps

- Investigate workshop search crash (React ErrorBoundary) — needs dev server running
- System projects still need vault folders + Sanity seeding (chess, dashboard, design-system, ascii-card, foundry)
- Unused `StudioHero.jsx` cleanup (carried over)
- Remaining tool subdomains: editor, noter, distress, modulator, mirror (CNAME setup)
