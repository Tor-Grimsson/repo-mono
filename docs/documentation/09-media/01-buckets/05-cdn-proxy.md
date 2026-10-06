---
title: kol-cdn-proxy
type: reference
status: active
updated: 2026-08-14
description: The Cloudflare Worker that fronts both public B2 buckets with Kolkrabbi-owned hostnames — why a Worker rather than a Backblaze feature, what it does per request, and how it deploys.
aliases:
  - cdn-proxy
tags:
  - domain/cloud
  - project/kol-monorepo
  - provider/cloudflare
  - provider/backblaze
covers:
  - why the Worker exists rather than B2 Custom Domains
  - the host to bucket map
  - per-request behaviour (cache, CORS, range, header stripping)
  - deploy and verification
sources:
  - apps/media/workers/cdn-proxy/src/index.js
  - apps/media/workers/cdn-proxy/wrangler.toml
related:
  - "[[02-b2-website|B2 — kolkrabbi/website]]"
  - "[[04-b2-vault-media|B2 — kol-vault-media]]"
  - "[[03-cutover-inventory|cutover inventory]]"
---

# kol-cdn-proxy

One Cloudflare Worker giving both public B2 buckets a Kolkrabbi-owned hostname. Lives at `workers/cdn-proxy/`.

## Why a Worker

**Backblaze's native "Custom Domains" feature is not available in this account.** Verified in the B2 console on 2026-08-14: it appears in neither the sidebar (Buckets · Browse Files · Snapshots · Application Keys · Reports · Caps & Alerts · Fireball · Cloud Replication) nor either bucket's action list. The Worker is therefore the route, not a fallback, and this doc is the record so nobody goes looking for the setting again.

Both buckets are **public**, so the Worker is a pure proxy — no signing, no credentials, no secrets to rotate. Egress B2 → Cloudflare is free under the Bandwidth Alliance.

## Host → bucket

| Hostname | B2 bucket | Example |
|---|---|---|
| `cdn.kolkrabbi.io` | `kolkrabbi` | `/website/art-prints/x.jpg` → `/file/kolkrabbi/website/art-prints/x.jpg` |
| `vault.kolkrabbi.io` | `kol-vault-media` | `/img/x.png` → `/file/kol-vault-media/img/x.png` |

**Paths pass through untouched.** That is the load-bearing choice: it makes every consumer migration a hostname replace rather than a path rewrite, and it keeps `website/` addressable alongside whatever else lives in the `kolkrabbi` bucket.

## Per request

| Behaviour | Why |
|---|---|
| `GET` / `HEAD` / `OPTIONS` only; everything else 405 | the proxy is a read surface; writes stay on the `bucket` CLI |
| Unknown hostname → 404 | the map is the allowlist |
| `Cache-Control: public, max-age=86400, s-maxage=2592000, immutable` set on the way out | **B2 sends no `Cache-Control` at all** — without this the edge falls back to Cloudflare defaults rather than a decision |
| `cf: { cacheEverything: true, cacheTtl: 86400 }` on the subrequest | cache objects that have no cache headers of their own |
| `Range`, `If-None-Match`, `If-Modified-Since`, `Accept-Encoding` forwarded | HLS seeking is range requests; without this, video breaks |
| `x-bz-*` response headers stripped | don't leak B2 file ids and upload metadata to browsers |
| `Access-Control-Allow-Origin: *` | the site fetches HLS and JSON cross-origin |

## Deploy

```sh
cd workers/cdn-proxy
pnpm exec wrangler deploy
```

`wrangler.toml` declares both routes with `custom_domain = true`, so wrangler creates the proxied DNS records and certificates on deploy — no manual dashboard step. Uses the existing authenticated wrangler session.

## Verify

```sh
node workers/cdn-proxy/test.mjs
```

Runs the handler directly against real B2 — no wrangler, no port. Covers the host→bucket mapping, the 404/405 guards, the CORS preflight, two live fetches (content-type, `Cache-Control` present, no `x-bz-*` leak, non-empty body) and a range request asserting `206` with exactly 100 bytes.

After deploying, the same object over both hosts should be byte-identical:

```sh
curl -sI https://cdn.kolkrabbi.io/website/art-prints/manifest.yaml
curl -sI https://f005.backblazeb2.com/file/kolkrabbi/website/art-prints/manifest.yaml
```

## What deploying does not do

**The raw B2 hostname keeps working.** Both resolve to the same objects, so consumers migrate on their own schedule and a half-migrated ecosystem is a valid state. There is no flag day and no rollback step — see [[03-cutover-inventory|the cutover inventory]].
