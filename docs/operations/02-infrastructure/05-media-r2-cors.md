---
title: R2 CORS
type: reference
status: canonical
updated: 2026-08-27
verified: 2026-08-27
description: The CORS policy on the kol-media R2 bucket — what it allows, why each field is there, how to read and change it, and the cached-response trap that makes canvas reads fail after it lands.
aliases:
  - cors
  - r2-cors
tags:
  - domain/cloud
  - project/kol-monorepo
  - provider/cloudflare
covers:
  - the applied policy and every field in it
  - the commands to read, set and remove it
  - how B2 gets the same headers by a different route
  - the crossorigin attribute trap
sources:
  - apps/media/config/r2-cors.json
related:
  - "[[INDEX|operations]]"
  - "[[../../documentation/09-media/01-buckets/01-r2-kol-media|R2 — kol-media]]"
  - "[[../../documentation/09-media/02-app/03-consuming|consuming the buckets]]"
---

# R2 CORS

Applied **2026-08-27**. Before that date the `kol-media` bucket had no CORS configuration at all, so `r2.kolkrabbi.io` served bytes with no `Access-Control-Allow-Origin` and any consumer that drew an object into a `<canvas>` and read it back got a tainted canvas.

## The policy

Committed at `config/r2-cors.json`:

```json
{
  "rules": [
    {
      "allowed": {
        "origins": ["*"],
        "methods": ["GET", "HEAD"],
        "headers": ["Range"]
      },
      "exposeHeaders": ["Content-Length", "Content-Type", "Content-Range", "Accept-Ranges", "ETag"],
      "maxAgeSeconds": 86400
    }
  ]
}
```

| Field | Why |
|---|---|
| `origins: ["*"]` | The bucket is already public to anyone with a URL. The header grants a reader nothing it could not already fetch, and it matches what `/api/list` and the B2 Worker have always sent. |
| `methods: GET, HEAD` | Reads only. Writes go through `/api/upload` behind Basic auth, or the `bucket-r2` CLI under an OAuth token — neither is a browser CORS path. |
| `headers: ["Range"]` | **Load-bearing.** A `Range` request is preflighted cross-origin. Video seeking sends one, and `utilities/id3` fetches a single byte range to read embedded cover art. Without this both fail while a plain image succeeds. |
| `exposeHeaders` | Without exposure a cross-origin reader can see the body but not `Content-Length`, `Content-Range` or `ETag` — enough to break progress UI, range handling and cache validation. |
| `maxAgeSeconds: 86400` | Preflights cached a day. Range-heavy consumers otherwise preflight constantly. |

The shape matters: wrangler wants a top-level **`rules` array**, not the bare S3-style array. The bare form is rejected with *"must contain a 'rules' array as expected by the R2 API"*.

## Commands

```sh
pnpm exec wrangler r2 bucket cors list kol-media
pnpm exec wrangler r2 bucket cors set  kol-media --file config/r2-cors.json --force
pnpm exec wrangler r2 bucket cors delete kol-media
```

`list` on a bucket with no policy errors with *"The CORS configuration does not exist" [code: 10059]* — that is "unset", not a failure.

## Verify

```sh
curl -s -D- -o /dev/null -H "Origin: https://example.test" https://r2.kolkrabbi.io/01.jpg \
  | grep -i 'access-control\|content-type'
```

Expect `access-control-allow-origin: *` and the `access-control-expose-headers` list. The policy applies bucket-wide and takes effect immediately.

## The trap: a cached response has no header

A consumer that loaded these images **before** the policy landed will still get a tainted canvas afterwards, because the browser reuses the cached non-CORS response. The fix is on the consumer:

```html
<img crossorigin="anonymous" src="https://r2.kolkrabbi.io/…">
```

`crossorigin` puts the request in a different cache partition, so it refetches. Add it to every element you intend to read back, then hard-reload once. Symptom without it: a `SecurityError` from `getImageData` on a URL that demonstrably sends the header.

## The other two stores

Both B2 buckets have had these headers all along, by a different route: `workers/cdn-proxy/` sets `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET, HEAD, OPTIONS` and `Access-Control-Max-Age: 86400` on every response, along with a real `Cache-Control` (B2 sends none) and `Range` forwarding.

| Host | CORS from |
|---|---|
| `r2.kolkrabbi.io` | The bucket policy in this doc |
| `b2.kolkrabbi.io` · `b2v.kolkrabbi.io` | The `cdn-proxy` Worker |

So all three stores are canvas-safe, but they are configured in two different places. Changing one does not change the other.

## Not a byte host

`media.kolkrabbi.io` sends `access-control-allow-origin: *` too, and it is **irrelevant** — that host serves the admin SPA's HTML for every path, not objects. It was detached from the bucket on 2026-08-26. Any consumer still resolving media through it is broken regardless of CORS.
