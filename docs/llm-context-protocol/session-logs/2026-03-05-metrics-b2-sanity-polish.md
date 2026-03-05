# Session Log: 2026-03-05 — Metrics B2 + Sanity + Polish

**Agent**: Claude Opus 4.6
**Status**: Complete
**Continues**: `2026-03-05-metrics-live-data.md`

---

## Changes Made

### 1. B2 Storage Endpoint (`apps/web/api/metrics-b2.js`) — NEW
- Authenticates with B2 native API (`b2_authorize_account` with Basic auth)
- Lists all buckets via `b2_list_buckets`
- Paginates through all files per bucket via `b2_list_file_names` (10k per page)
- Builds 2-level folder tree: top folders + subfolders with file counts and byte totals
- Tracks 10 most recent uploads per bucket (by upload timestamp)
- Returns: `totalBytes`, `totalFiles`, `totalFormatted`, `bucketCount`, per-bucket `tree[]` and `recentFiles[]`
- 15-minute cache

### 2. Sanity CMS Endpoint Fix (`apps/web/api/metrics-sanity.js`)
- GROQ query now filters out `sanity.imageAsset` and `sanity.fileAsset` types
- Previously raw image asset IDs like `sanity.image-b530a657...` were showing in recent edits
- Now only shows content documents (blog, project, page, category, author, tag)

### 3. Infrastructure Tab — Live B2 Data
- Replaced hardcoded B2 storage/bandwidth cards with live data
- B2 storage card shows real total bytes formatted
- B2 buckets card shows bucket count
- New "Bucket tree" card (col-span-2): hierarchical folder view per bucket, subfolders nested, file counts + sizes
- New "Recent uploads" card (col-span-2): last 12 uploaded files across all buckets with filename, size, date
- Removed hardcoded `b2DailyBandwidth` array and unused `DashStackedBarCard` import

### 4. Project Tab — CMS Edits Card Fix
- Color-coded type dots per document type (blog=green, project=blue, page=purple, etc.)
- Fixed-width type label (`w-14`) prevents column bleed
- `overflow-hidden` on each row
- Proper `truncate` on title column

### 5. Card Overflow Fix (Global)
- `packages/ui/css/dashboard.css`: added `overflow: hidden` + `min-height: 0` to `.dash-card` base class
- `DashChartCard.jsx`: content area gets `min-h-0 overflow-hidden`
- `DashSlotCard.jsx`: removed `min-h-[180px]` (forced minimum too tall for viewport grids), replaced with `min-h-0`
- Fixes "Visit duration" and "Devices" card titles/content bleeding outside card boundaries

### 6. Deploy Polling Speed
- Reduced `metrics-deploys.js` cache from 60s to 5s to match client polling interval

### 7. Documentation Updates
- `docs/metrics-data-plan.md`: Updated data sources (Neon not Turso, added Sanity + Vercel Deploys sections), updated API layer to 5-endpoint table, marked Phase 4/4b complete, added Phases 8-9
- `docs/metrics-setup-guide.md`: All external deliverables checked off, only GitHub token remains optional
- Added future ideas to plan: node network graph, CMS composition ring, B2 file shelf with CDN URLs, confetti on deploy

---

## Files Changed

| File | Action |
|------|--------|
| `apps/web/api/metrics-b2.js` | Created |
| `apps/web/api/metrics-sanity.js` | Modified (GROQ filter) |
| `apps/web/api/metrics-deploys.js` | Modified (cache 60s -> 5s) |
| `apps/web/src/routes/Metrics.jsx` | Modified (B2 state/fetch, InfraTab tree/uploads, ProjectTab CMS fix, formatB2Size helper, TYPE_COLORS, removed hardcoded B2 data) |
| `packages/ui/css/dashboard.css` | Modified (overflow + min-height on .dash-card) |
| `packages/ui/src/dashboards/cards/DashChartCard.jsx` | Modified (min-h-0 overflow-hidden) |
| `packages/ui/src/dashboards/cards/DashSlotCard.jsx` | Modified (min-h-0 replaces min-h-[180px]) |
| `docs/metrics-data-plan.md` | Updated |
| `docs/metrics-setup-guide.md` | Updated |

### 8. Footer Proposals + Narrative Landing Page

Created two footer concept proposals and an awards-style landing page to showcase them.

**Landing page** (`apps/web/src/routes/FooterTest.jsx`):
- Route: `/footer-test` (unlisted, no layout/navbar)
- Full-screen hero with gradient orbs, project tagline
- 10 narrative cards telling the project story (foundation, colors, foundry, specimens, components, apparatus, mirrors, docs, infrastructure, footer)
- Intersection observer fade-in, alternating left/right layout
- Abstract decorative blocks with animated lines per card
- 3-color palette: deep ink (#0a0f1a), warm amber (#c4956a), cool sage (#7a9e8e)
- A/B pill toggle to switch footer proposals in real-time
- Sticky reveal effect: page content slides away to reveal footer underneath

**Proposal A — "Reveal"**:
- Minimal mode: 64px bar with wordmark, socials, copyright, back-to-top
- Mega mode: 80vh site tree grid (all routes grouped by section)
- Toggle: three dots near copyright that stretch on hover

**Proposal B — "Trapdoor"**:
- Each section independently expandable (click label to reveal links)
- Three-dot "secret" expands/collapses all sections at once
- Tree-style left-border on expanded links
- Dynamic height: 140px collapsed, 80vh when any section open

**Concept proposals** also saved in `docs/a-torg/FooterProposalA.jsx` and `docs/a-torg/FooterProposalB.jsx` (wrapper-style components with `{children}` for SiteLayout integration).

---

## Files Changed

| File | Action |
|------|--------|
| `apps/web/api/metrics-b2.js` | Created |
| `apps/web/api/metrics-sanity.js` | Modified (GROQ filter) |
| `apps/web/api/metrics-deploys.js` | Modified (cache 60s -> 5s) |
| `apps/web/src/routes/Metrics.jsx` | Modified (B2 state/fetch, InfraTab tree/uploads, ProjectTab CMS fix, formatB2Size helper, TYPE_COLORS, removed hardcoded B2 data) |
| `packages/ui/css/dashboard.css` | Modified (overflow + min-height on .dash-card) |
| `packages/ui/src/dashboards/cards/DashChartCard.jsx` | Modified (min-h-0 overflow-hidden) |
| `packages/ui/src/dashboards/cards/DashSlotCard.jsx` | Modified (min-h-0 replaces min-h-[180px]) |
| `docs/metrics-data-plan.md` | Updated |
| `docs/metrics-setup-guide.md` | Updated |
| `apps/web/src/routes/FooterTest.jsx` | Created (narrative landing + both footer proposals) |
| `apps/web/src/App.jsx` | Modified (added `/footer-test` route) |
| `docs/a-torg/FooterProposalA.jsx` | Created (wrapper concept) |
| `docs/a-torg/FooterProposalB.jsx` | Created (wrapper concept) |

---

## Ideas Logged (Not Implemented)
- B2 file shelf: click tree nodes to copy CDN URLs
- Node network / graph view (Obsidian-style) for data connections
- CMS composition ring instead of flat metric cards
- Confetti on successful deploy
- Richer tab variety: sparklines, segmented charts, less repetitive DashMetricCards
