# metrics.kolkrabbi.io — navigation audit (header, desk + phone)

**Date:** 2026-10-09 · audit only.
**The ask (user, corrected):** the navigation is the problem, desk and phone — "the header and all that…
on mobile could fold into dropdowns, show logo, use some pattern we already have established and know
work." Not the cards, not a package takeover (kol-dashboards is shared with chess).
**Done earlier today, separate:** status bar + safe area (here); card heights / scrolling rows
(kol-dashboards 0.5.0). Ticket `metrics-dashboard-on-the-app-hub` withdrawn.

---

## 1. What the header is today (`MetricsDashboard.jsx:534–564`, kol-dashboards 0.5.0)

Four stacked control rows before any content, at every width:

1. **Title** — `kolkrabbi.io / metrics` + `live`, in `dash-title` mono. No logo, no app voice.
2. **Section tabs** — Site · Project · Infrastructure · Sessions, a `SegmentedToggle` (scrolls on a phone since 0.5.0).
3. **TimelineBar** — range Today…1y + a milestone ticker.
4. **DeployBar** — status · age · duration · ref · deploy dots.
5. (+ Site tab) **Host filter** — All + 7 hosts, a segmented row in the body.

Phone: ~230 pt of controls before the first number; every row is a desk control squeezed.
Desk: a mono title line and two full-width control rows — nothing reads as the app's name.

## 2. The established pattern to copy — media's header

media.kolkrabbi.io (kol-component `MediaLibrary variant="explorer"`) is one tool on one page, like
metrics, and it already works on both:

| media | metrics, proposed |
|---|---|
| **Display title** `KOL-R2B2` (Right Grotesk Tall, the app voice) | logomark + **METRICS** in the same display masthead |
| **Bucket `Dropdown`** right of the title — the one choice that changes everything | **Section `Dropdown`** (Site · Project · Infrastructure · Sessions) on a phone; the `SegmentedToggle` stays at desk |
| **Gear `IconFrame`** → settings drawer | gear → drawer holding **Range** (Today…1y) and **Host**, plus the theme chip |
| thin **crumb / count line** under it | one thin **status line**: Live · 4m ago · ref · deploy dots; the milestone ticker joins it at desk, hides on a phone |

Phone result: one header row (logo · METRICS · section dropdown · gear) + one meta line, instead of
four rows. Desk: title row with the tabs and gear, the meta line, content.

(fxr's `AppHub` bottom bar was the other candidate; four sections is a dropdown's job, and media is
the closer twin — one page, one tool.)

## 3. Who changes what

The header lives inside `MetricsDashboard` with no seam (no title / tabs / range / host props), so the
rows themselves change in kol-dashboards — one ask, with this table as the spec, after the user signs
off the shape. kol-website: logomark asset + nothing else.
