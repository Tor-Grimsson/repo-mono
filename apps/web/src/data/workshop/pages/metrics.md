---
title: Metrics
description: Live production metrics for kolkrabbi.io
status: active
updated: 2026-10-06
url: https://metrics.kolkrabbi.io
icon: stat-chart-a
image: https://b2.kolkrabbi.io/website/asset-library/workshop/workshop-overview/analytics.png
order: 8
---
# Metrics

The production dashboard at [metrics.kolkrabbi.io](https://metrics.kolkrabbi.io) renders site analytics, project stats, infrastructure, and CMS data from five API endpoints.

## What is there

- Site — site analytics
- Projects — project stats
- Infrastructure — deploys, CDN, CMS
- Sessions — session analytics

## Tracking

Site analytics come from a self-hosted Umami instance — first-party, cookieless, no third-party tracker.

Umami runs as its own deployment (kol-umami.vercel.app) and records pageviews, visitors, sessions, referrers, countries, and devices across kolkrabbi.io and its subdomains. Every tracked host reports into a single website ID, which is why the Site tab can filter per host — main site, client subdomains, tool deploys — from one dataset.

The dashboard never talks to Umami directly. A serverless proxy (`/api/metrics`) logs in server-side, holds the bearer token, and caches each range + host combination for five minutes — credentials stay out of the browser, and warm instances skip repeat auth round-trips.

## The five endpoints

Each tab is fed by small serverless functions — one per source, each with its own cache window.

- **/api/metrics** — the Umami proxy. Traffic, top pages, countries, devices, visit breakdown. Cached 5 minutes per range + host.
- **/api/metrics-repo** — repo stats (components, routes, lines of code, commits, session logs). A static snapshot: serverless has no repo access, so the numbers are measured locally and hardcoded periodically.
- **/api/metrics-sanity** — CMS document counts, type distribution, and recent edits, queried live from the Sanity dataset. Cached 10 minutes.
- **/api/metrics-deploys** — deployment history from the Vercel API: state, duration, source, branch. Cached 5 seconds so the deploy strip stays fresh.
- **/api/metrics-b2** — Backblaze B2 storage: bucket sizes, object counts, recent uploads. Cached 15 minutes.

## From fetch to card

One hook orchestrates everything; the dashboard components just render what they are handed. `useMetricsData` fires all five fetches, normalizes the responses, and exposes them with the range and host-filter state. Changing the timeline range or picking a host refetches only the Umami proxy; the other sources are independent of both.

Rendering is the dashboard component library — DashMetricCard, DashChartCard, DashListCard, DashTableCard and the chart primitives — laid out on the container-query grid.

## Built with

React · `@kolkrabbi/kol-dashboards` · Umami · Vercel functions
