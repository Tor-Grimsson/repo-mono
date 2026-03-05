# Metrics Dashboard — Data Plan

**Route:** `/metrics` (unlisted)
**Cost:** $0 — all free tiers
**Purpose:** Live production metrics for kolkrabbi.io, dogfooding the dashboard component system with real data.

---

## Data Sources

### 1. Umami (self-hosted analytics)

Open-source web analytics. Self-hosted on Vercel free tier + Neon PostgreSQL (Prisma needs Postgres, not SQLite).

**Collects automatically:**
- Pageviews (URL, title, referrer)
- Sessions (duration, bounce, entry/exit pages)
- Visitors (unique per day, returning vs new)
- Geo (country, city — derived from IP headers, no PII stored)
- Device (browser, OS, screen size)
- UTM params (source, medium, campaign)

**API:** `GET /api/websites/{id}/stats`, `/metrics`, `/pageviews`, etc.
**Docs:** https://umami.is/docs/api

**Free tier limits (Vercel + Neon):**
- Vercel: 100GB bandwidth, serverless functions
- Neon: 0.5GB storage, 190 compute hours/month (auto-suspend on idle)

### 2. Backblaze B2 API (bucket metrics)

Free API calls to existing B2 bucket. No additional cost.

**Available data:**
- Bucket size (total bytes stored, computed from file listing)
- Object count (files in bucket)
- Folder tree (2-level deep, grouped by path prefix)
- Recent uploads (last 10 per bucket with timestamps)

**API:** `b2_authorize_account`, `b2_list_buckets`, `b2_list_file_names` (paginated)
**Auth:** Application key (deployed as Vercel env vars)

### 3. Sanity CMS (public GROQ queries)

Public read API to existing Sanity dataset. No auth needed.

**Available data:**
- Document counts per type (blog, project, page, category, author, tag)
- Total document count
- Recent edits (last 10 content documents, excludes image/file assets)

**API:** `https://{projectId}.api.sanity.io/v{version}/data/query/{dataset}?query={groq}`
**Auth:** None (public dataset reads)
**Project:** `to8h15ed`, dataset `projects`

### 4. Vercel Deployments API

Live deploy status from Vercel. Polled every 5 seconds on the dashboard.

**Available data:**
- Last 10 deployments (state, created time, build duration, commit message, branch)
- Deploy states: READY, ERROR, BUILDING, QUEUED, CANCELED

**API:** `GET /v6/deployments`
**Auth:** `VERCEL_TOKEN` (personal access token, deployed as Vercel env var)

### 5. Internal / build metrics (static snapshot)

Vercel serverless can't access git, so repo stats are a static snapshot updated manually.

- Component count, route count, lines of code, commits
- Atom/molecule counts, session logs, docs files, fonts
- Endpoint: `/api/metrics-repo`

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

Five Vercel serverless API routes, each with independent caching:

| Endpoint | Source | Cache | Purpose |
|----------|--------|-------|---------|
| `/api/metrics` | Umami | 5 min | Site analytics (visitors, pageviews, sessions, geo, devices) |
| `/api/metrics-repo` | Static | none | Repo stats snapshot (components, routes, lines, commits) |
| `/api/metrics-sanity` | Sanity GROQ | 10 min | CMS document counts + recent edits |
| `/api/metrics-deploys` | Vercel API | 5 sec | Last 10 deployments with state/duration |
| `/api/metrics-b2` | B2 API | 15 min | Bucket storage, file counts, folder tree, recent uploads |

Dashboard fetches all 5 on mount. Deploys endpoint polled every 5s for live status.

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

### Phase 3 — Viewport-fit layout + tabs ✅ COMPLETE (2026-03-05)
- Full viewport-height grid (h-screen, no scroll)
- 4 tabs: Site | Project | Infrastructure | Sessions
- Repo stats endpoint (`/api/metrics-repo`) with real counts
- Removed DashboardGrid dependency — direct CSS grid with `1fr` rows

### Phase 4 — Timeline bar + deploy status ✅ COMPLETE (2026-03-05)
- Persistent timeline bar pinned below tabs with date range selector (Today/7d/30d/90d/1y)
- Milestone ticker scrolling recent project events
- All Site tab cards respond to selected time range
- Deploy status bar with live state, commit message, 8-dot history
- 5-second polling for deploy state changes

### Phase 4b — B2 + Sanity integration ✅ COMPLETE (2026-03-05)
- `/api/metrics-sanity` — public GROQ queries, document counts per type, recent edits (filtered: no image/file assets)
- `/api/metrics-b2` — B2 auth + `list_file_names` pagination, folder tree (2-level), recent uploads, per-bucket totals
- Sanity data in Project tab: CMS document counts, color-coded recent edits list
- B2 data in Infrastructure tab: storage totals, bucket tree, recent uploads
- Card overflow fix: `dash-card` base class now has `overflow: hidden` + `min-height: 0`

### Phase 5 — Visual timeline component (NEXT)
- Horizontal time-axis track (not a toolbar — a real visual component with height)
- Events plotted along the axis: deploys, outages, traffic spikes, milestones
- Data sources: Vercel deploys API (live), milestones (static/session logs), Umami spikes (computed)
- Zoomable: day / week / month / year view
- Click an event to see details in a tooltip or spotlight panel

### Phase 6 — Draggable grid
- Separate "Custom" tab or page with drag-and-drop card arrangement
- Cards can be repositioned freely within the grid
- Layout saved to localStorage for persistence
- Any metric card can be placed anywhere

### Phase 7 — Slot viewer / spotlight
- Click a card to open it in a full-width detail panel
- Expanded view with more chart detail, tooltips, scrollable lists
- Date range controls per-card in expanded view
- Overlay or top-pinned panel
- B2 file shelf: click bucket tree nodes to get CDN URLs

### Phase 8 — Richer visualizations
- Node network / graph view for data connections (Obsidian-style)
- Replace repetitive DashMetricCard rows with charts, sparklines, segmented rings
- CMS composition ring (blog vs project vs page proportions)
- Hover tooltips on chart bars/items (exact values, dates)
- GitHub API for live repo stats (replace static snapshot)

### Phase 9 — Polish
- Confetti on successful deploy
- Sidebar tools (refresh, filters)
- Card content density improvements per tab

---

## Notes

- No PII stored — Umami is GDPR-compliant by default, no cookies
- Unlisted route only — no nav entry, no public link
- All data flows through our own API routes — dashboard never calls third-party APIs directly
- Reuses existing dashboard components (dash-card overflow fix was only structural change needed)
