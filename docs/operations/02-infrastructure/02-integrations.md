---
title: External Integrations
type: reference
status: active
updated: 2026-10-06
description: External services integrated with kolkrabbi.io — analytics, database, storage
tags:
  - project/kol-monorepo
  - domain/infrastructure
  - integration/analytics
---

## Overview

External services integrated with kolkrabbi.io. All services use free tiers — total cost: $0/month.

---

## Umami (Web Analytics)

**Purpose**: Privacy-first, cookie-free site analytics
**Type**: Self-hosted on Vercel
**URL**: https://kol-umami.vercel.app
**Login**: admin (password in Vercel env vars)
**Website ID**: `fcd04534-5dcd-44a3-b7b1-256cbdf49ab9`
**Source repo**: https://github.com/Tor-Grimsson/kol-umami (fork of umami-software/umami)

### What it collects
- Pageviews (URL, title, referrer)
- Sessions (duration, bounce, entry/exit pages)
- Visitors (unique per day, new vs returning)
- Geo (country — derived from IP headers, no PII stored)
- Device (browser, OS, screen size)
- UTM params (source, medium, campaign)

### How it connects
- **Tracking script** in `apps/web/index.html` `<head>` sends events to Umami
- **`/api/metrics`** endpoint in `apps/metrics/api/metrics.js` authenticates via Umami login API and fetches stats
- Data displayed at `metrics.kolkrabbi.io` — its own app and Vercel project since 2026-10-06; `kolkrabbi.io/metrics` redirects there. See [[01-hosting-dns|hosting]].

### API authentication
Umami uses session-based auth. The `/api/metrics` endpoint calls `POST /api/auth/login` with `UMAMI_USER` + `UMAMI_PASS` env vars to get a bearer token, then uses it for all subsequent API calls.

### Env vars (on the `kol-metrics` Vercel project)
- `UMAMI_USER` · `UMAMI_PASS` — the Umami login
- `VERCEL_TOKEN` · `VERCEL_TEAM_ID` — the deployments feed
- `B2_APPLICATION_KEY_ID` · `B2_APPLICATION_KEY` — Backblaze bucket sizes and uploads
- None of these is in a local `.env` file; they live in Vercel only

### Free tier limits
- Vercel: 100GB bandwidth, serverless functions
- Neon (database): 0.5GB storage, 190 compute hours/month

---

## Neon (PostgreSQL Database)

**Purpose**: Database backend for Umami
**Type**: Managed PostgreSQL (serverless)
**Dashboard**: https://console.neon.tech
**Login**: GitHub (Tor-Grimsson)

### Configuration
- **Project**: umami
- **Region**: us-east-1
- **Connection**: pooled endpoint (`-pooler` suffix)
- `DATABASE_URL` set as env var on the kol-umami Vercel project

### Free tier limits
- 0.5GB storage
- 190 compute hours/month (auto-suspends on idle)
- 1 project, 10 branches

---

## Backblaze B2 (Object Storage)

**Purpose**: CDN asset storage (art prints, fonts, images)
**Type**: S3-compatible object storage
**Status**: Existing — no new setup needed

### API access
- `B2_APPLICATION_KEY_ID` — application key ID
- `B2_APPLICATION_KEY` — application key
- S3-compatible endpoint available

### Available metrics (Phase 3)
- Bucket size (total GB stored)
- Object count
- Bandwidth (daily/monthly)
- Upload/download counts

---

## Integration Architecture

```
Browser → Umami tracking script → kol-umami.vercel.app → Neon PostgreSQL
                                                              |
metrics.kolkrabbi.io → /api/metrics → Umami API ─────────────┘
                                   → B2 API (Phase 3) → Backblaze B2
```

### Caching
- `/api/metrics` caches responses for 5 minutes (in-memory, resets on cold start)
- Dashboard never calls third-party APIs directly

---

## Service Directory

| Service | Dashboard | Account | Cost |
|---------|-----------|---------|------|
| Umami | https://kol-umami.vercel.app | admin | $0 |
| Neon | https://console.neon.tech | GitHub | $0 |
| Backblaze B2 | https://secure.backblaze.com | existing | $0 |
| Vercel (hosting) | https://vercel.com/dashboard | existing | $0 |
| Cloudflare (DNS) | https://dash.cloudflare.com | existing | $0 |

---

**Last Updated**: 2026-03-05
**Maintained By**: Operations
