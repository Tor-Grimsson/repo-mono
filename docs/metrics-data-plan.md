# Metrics Dashboard — Data Plan

**Route:** `/metrics` (unlisted)
**Cost:** $0 — all free tiers
**Purpose:** Live production metrics for kolkrabbi.io, dogfooding the dashboard component system with real data.

---

## Data Sources

### 1. Umami (self-hosted analytics)

Open-source web analytics. Self-hosted on Vercel free tier + Turso free tier (SQLite edge DB).

**Collects automatically:**
- Pageviews (URL, title, referrer)
- Sessions (duration, bounce, entry/exit pages)
- Visitors (unique per day, returning vs new)
- Geo (country, city — derived from IP headers, no PII stored)
- Device (browser, OS, screen size)
- UTM params (source, medium, campaign)

**API:** `GET /api/websites/{id}/stats`, `/metrics`, `/pageviews`, etc.
**Docs:** https://umami.is/docs/api

**Free tier limits (Vercel + Turso):**
- Vercel: 100GB bandwidth, serverless functions
- Turso: 9GB storage, 500M row reads/month

### 2. Backblaze B2 API (bucket metrics)

Free API calls to existing B2 bucket. No additional cost.

**Available data:**
- Bucket size (total bytes stored)
- Object count (files in bucket)
- Bandwidth used (daily/monthly)
- Upload/download counts

**API:** `b2_list_buckets`, `b2_get_bucket_notification_rules`, S3-compatible endpoint
**Auth:** Application key (already have)

### 3. Internal / build metrics (optional, phase 2)

Pulled from Git, CI, or local tooling — no external service needed.

- Deploy frequency (git log / GitHub API — free)
- Build times (CI logs)
- Session log count (count files in `.claude/` memory dir)
- Repo stats (commits, contributors, lines of code)

---

## Dashboard Layout

### Row 1 — Key metrics (4x DashMetricCard)

| Card | Source | Label | Value | Delta |
|------|--------|-------|-------|-------|
| Visitors today | Umami | Visitors today | `1,247` | `+12% vs yesterday` |
| Pageviews today | Umami | Pageviews | `3,891` | `2.4 pages/visit` |
| Avg session | Umami | Avg session | `2m 34s` | `+18s vs last week` |
| Bounce rate | Umami | Bounce rate | `38.2%` | `-4.1% vs last month` |

### Row 2 — Traffic over time (DashStackedBarCard + DashChartCard)

| Card | Span | Source | Type |
|------|------|--------|------|
| Daily visits (30d) | 3x2 | Umami `/pageviews` | DashStackedBarCard — stacked by new/returning visitors |
| Visit duration distribution | 1x2 | Umami `/metrics` | DashChartCard + Histogram — bucketed by duration |

### Row 3 — Pages & geo (DashListCard variants)

| Card | Span | Source | Variant |
|------|------|--------|---------|
| Top pages | 2x2 | Umami `/metrics?type=url` | meter — page URL, view count, % of total |
| Top countries | 2x2 | Umami `/metrics?type=country` | ratings — country name, visits, color dot |

### Row 4 — Blog & referrers

| Card | Span | Source | Type |
|------|------|--------|------|
| Blog posts | 2x2 | Umami (filter `/blog/*`) | DashListCard text — post title, views |
| Top referrers | 2x2 | Umami `/metrics?type=referrer` | DashListCard meter — source, visits, % |

### Row 5 — Infrastructure

| Card | Span | Source | Type |
|------|------|--------|------|
| B2 storage | 1x1 | B2 API | DashMetricCard — total GB stored |
| B2 objects | 1x1 | B2 API | DashMetricCard — file count |
| B2 bandwidth (30d) | 2x1 | B2 API | DashStackedBarCard compact — daily bandwidth |

### Row 6 — Alerts & trends

| Card | Span | Source | Type |
|------|------|--------|------|
| Traffic trends | 2x2 | Umami | DashAlertCard — week-over-week change, notable spikes |
| Device breakdown | 2x2 | Umami `/metrics?type=device` | DashSlotCard — pie/histogram + device list |

---

## API Aggregation Layer

A single edge function (Cloudflare Worker or Vercel API route) that:

1. Fetches from Umami API + B2 API
2. Transforms responses into the shape dashboard cards expect
3. Caches for 5 minutes (avoid hammering free tier limits)
4. Returns a single JSON blob consumed by the `/metrics` route

```
GET /api/metrics → {
  visitors: { today, yesterday, delta },
  pageviews: { today, perVisit },
  session: { avg, delta },
  bounce: { rate, delta },
  dailyVisits: [{ win: new, draw: returning, loss: bounce, total }],  // reuse stacked bar shape
  topPages: [{ label, value, percent }],
  topCountries: [{ label, value, detail, color }],
  blogPosts: [{ label, value }],
  referrers: [{ label, value, percent }],
  b2: { storageMB, objects, bandwidthMB, dailyBandwidth: [] },
  alerts: [{ title, description }],
  devices: [{ label, value }]
}
```

---

## Implementation Phases

### Phase 1 — Static mockup ✅ COMPLETE
- Created `/metrics` route with hardcoded sample data
- Layout all cards using DashboardGrid
- Validated card types and visual balance

### Phase 2 — Umami setup ✅ COMPLETE (2026-03-05)
- Deployed Umami on Vercel + Neon PostgreSQL (not Turso — Prisma needs Postgres)
- Added tracking script to `apps/web/index.html`
- Built `/api/metrics` aggregation endpoint at `apps/web/api/metrics.js`
- Wired dashboard to live Umami data (11 parallel API calls, 5min cache)
- Integration docs: `docs/documentation/08-operations/8.5.0-integrations.md`

### Phase 3 — B2 + repo metrics (NEXT)
- Add B2 API calls to aggregation layer
- Add repo/project metric cards (components, routes, lines, commits, deploys)
- Tabbed dashboard views: Site | Project | Infrastructure | Sessions

### Phase 4 — Interactivity
- Full-width fluid grid (remove 1800px cap, responsive auto-fit)
- Click-to-expand cards (full-width focus mode)
- Hover tooltips on charts
- Sidebar tools (date range picker, refresh, filters)

---

## Notes

- No PII stored — Umami is GDPR-compliant by default, no cookies
- Unlisted route only — no nav entry, no public link
- All data flows through our own API route — dashboard never calls third-party APIs directly
- Reuses existing dashboard components with zero modifications
