# metrics.kolkrabbi.io — the mobile pass

**Date:** 2026-10-09 · scope only, nothing changed.
**Question (user):** "it could be better, taking aim from media and fxr — you could also check ds."
**Measured:** built app, `/api` → production, iPhone 13 emulation (dark), plus the user's home-screen screenshot.
**State:** SCOPED — waits for a go.

---

## 1. What is wrong at 390

| # | What | Where it comes from |
|---|---|---|
| 1 | **White status bar** in the home-screen app — reads as a bug (user). | `index.html` `apple-mobile-web-app-status-bar-style="default"` (set today because the page has no safe-area padding). Media: `black-translucent` + `env(safe-area-inset-*)` on the body (`apps/media/src/index.css:32`). |
| 2 | Tab bar (Site · Project · Infrastructure · Sessions) runs off the right edge — "Sessions" clipped. | kol-dashboards `MetricsDashboard` segmented control, one row, no wrap/scroll. |
| 3 | The range row's deploy timeline ("● 10-06 Metrics …") clipped. | same row as Today/7d/…; no room at 390. |
| 4 | Host filter: 7 hosts in one segmented row, 5 off screen, no scroll affordance. | `allHosts` → segmented control. |
| 5 | Hero cards ~460 px tall with the sparkline pinned to the bottom — half of each card is empty. | card height is the desktop row's; the chart doesn't grow, the card does. |
| 6 | Stat pairs (Visitors · Pageviews, Avg session · Bounce) ~240 px tall, the same dead band. | same. |
| 7 | No app frame: no title bar/sheet like media's PageShell, no tab bar like fxr's AppHub; the page is a long scroll of 4,351 px. | `App.jsx` renders `<main><MetricsDashboard/></main>` bare. |

Already fine: no horizontal page scroll (docW 390), charts render, donut and top-pages lists read well.

## 2. What media, fxr and the DS do

- **media** — `PageShell mode="fixed"` (kol-shell) as the tool frame, `black-translucent` + safe-area padding, settings in a drawer, phone views from the package.
- **fxr** — kol-shell `AppHub`: Home · Settings · an `S` sheet, a rail on desk / tab bar on phone.
- **DS** — no metrics reference app in kol-ds-ui `apps/`. kol-dashboards 0.4.3 is current; `MetricsDashboard.jsx` has **no responsive classes at all** (0 `sm:/md:/lg:`) — it is a desk layout that happens to stack. 2–6 are the package's.

## 3. The pass (proposal)

1. **Here, today-sized:** `black-translucent` + safe-area padding (media's three lines) — fixes #1. Put the dashboard in `PageShell` like media so the frame, gutters and bottom pad match the other tools.
2. **One kol-ds-ui ticket for the package** (#2–#6): tabs and host filter scroll horizontally (or the host filter becomes a Dropdown below md); the deploy timeline gets its own line on a phone; card heights follow content on a phone (chart a fixed ~96 px, no stretched card). Render every tab at 390 first and put all findings in the one ticket, no stopgap (`ds-tickets-one-complete-no-stopgap`).
3. Optional, the user's call: fxr's AppHub shape — the four tabs as a phone tab bar instead of a segmented row.
