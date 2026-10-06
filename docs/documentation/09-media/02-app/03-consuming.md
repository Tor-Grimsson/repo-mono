---
title: Consuming the buckets
type: guide
status: active
updated: 2026-08-27
audience: internal
description: How any other kol-system app lists, links and displays media from the three Kolkrabbi stores — the media client, the list API, the public bases, CORS, and the read-only rules.
aliases:
  - consuming
  - media-client
tags:
  - domain/cloud
  - project/kol-monorepo
  - pattern/handoff-kit
covers:
  - createMediaClient and its bucket table
  - GET /api/list and its bucket parameter
  - the three public bases and which host serves bytes
  - CORS on R2 and B2, and the canvas-tainting rule
  - dropping MediaLibrary into another app
related:
  - "[[01-surfaces|surfaces]]"
  - "[[../01-buckets/INDEX|06 — Buckets]]"
  - "[[../../../operations/02-infrastructure/05-media-r2-cors|R2 CORS]]"
---

# Consuming the buckets

You do **not** need this repo to use its media. The API is public for reads, the bytes are on public hostnames, and the listing layer ships as a package. This guide is for the app on the other side.

ARCHITECTURE §2 is the rule underneath: the API is the real surface and this admin app is just one consumer. Don't embed the admin, don't iframe it — take the client, or call the endpoint.

## The short version

```js
import { createMediaClient } from '@kolkrabbi/kol-media-client';

const client = createMediaClient({
  buckets: {
    r2:      { label: 'R2 · kol-media', publicBase: 'https://r2.kolkrabbi.io',  writable: true  },
    b2:      { label: 'B2 · website',   publicBase: 'https://b2.kolkrabbi.io',  writable: false },
    b2vault: { label: 'B2 · vault',     publicBase: 'https://b2v.kolkrabbi.io', writable: false },
  },
});

const objects = await client.listMedia('img/', { bucket: 'b2vault' });
const url     = client.mediaUrl(objects[0].key, 'b2vault');
```

Omit `buckets` entirely and you get the single-bucket client every older consumer already uses — R2, `r2.kolkrabbi.io`, unchanged.

## The client (kol-media-client ≥ 0.2.0)

| Member | Signature | Notes |
|---|---|---|
| `listMedia` | `(prefix = '', { bucket, signal }) => Promise<object[]>` | Sends `bucket=<id>`; throws on a non-OK response so you can show an error. Takes an `AbortSignal`. |
| `mediaUrl` | `(key, bucket) => string` | Builds on **that bucket's** `publicBase`. Never assume one host — see below. |
| `buckets` | `() => object[]` | The table as a list. `[]` without one. Feeds a bucket dropdown. |
| `proxied` | `(url) => string` | Rewrites a public CDN URL onto a same-origin proxy path, for consumers that need to dodge CORS entirely. |

`adminBase` defaults to `https://admin.kolkrabbi.io`, which is where `/api` lives. `media.kolkrabbi.io` serves **no API** — it is the admin app in read-only clothes, and every path there returns the SPA's HTML.

### Write seams are opt-in

The client is read-only unless you attach them. This app does, in `src/lib/client.js`:

```js
export const mediaClient = {
  ...base,
  downloadUrl,                                    // pure — the pages call it during render
  deleteObject: (key, bucket) => { … },
  renameObject: (from, to, bucket) => { … },
};
```

`downloadUrl` **must not have side effects**: `MediaLibrary` calls it while rendering every card. An earlier version routed it through the module-level `setBucket()` and mutated state mid-render — a latent bug that lint and the build both passed.

## The API directly

If you don't want the package:

```
GET https://admin.kolkrabbi.io/api/list?bucket=<r2|b2|b2vault>&prefix=<path>&cursor=<opaque>
```

| Fact | Value |
|---|---|
| Auth | **None.** `/api/list` is public; only writes sit behind Basic auth. |
| Default bucket | `r2` — an unaware caller is unaffected. |
| CORS | `access-control-allow-origin: *` |
| Cache | `cache-control: public, max-age=30` |
| Shape | `{ objects: [{ key, size, uploaded, contentType, etag }], truncated, cursor }` |

**The response shape is frozen.** `kol-labs-single` and `kol-design-editor` read `objects[].{key,contentType,size}` with nothing guarding them. Adding fields is safe; renaming or removing is not.

Both providers answer in that one shape — `functions/api/list.js` routes `b2`/`b2vault` through the B2 adapter and everything else to the R2 binding, so `bucket=` is a parameter, not a fork.

## Where the bytes are

| Store | Public base | Writable through the API |
|---|---|---|
| R2 `kol-media` | `https://r2.kolkrabbi.io` | Yes, from `admin.` with Basic auth |
| B2 `kolkrabbi` (website) | `https://b2.kolkrabbi.io` | No — use the `bucket` CLI |
| B2 `kol-vault-media` | `https://b2v.kolkrabbi.io` | No — use the `bucket` CLI |

Three different hosts. Map bucket id → base (or let `mediaUrl` do it); do not build URLs off one host. The first-generation `cdn.` and `vault.` names still serve and are not on a deadline. `media.` is **not** a byte host and has not been since 2026-08-26.

## CORS and canvas

As of **2026-08-27 all three stores send `access-control-allow-origin: *`** on object reads:

- The B2 hosts get it from the `workers/cdn-proxy/` Worker, which also sets `Cache-Control` and forwards `Range`.
- R2 got a bucket CORS policy the same day — see [[../../../operations/02-infrastructure/05-media-r2-cors|R2 CORS]]. Origins `*`, methods `GET, HEAD`, `Range` allowed, and `Content-Length · Content-Type · Content-Range · Accept-Ranges · ETag` exposed.

If you draw media into a `<canvas>` and read it back (`getImageData`), you must also set `crossorigin="anonymous"` on the element. Without it the browser can reuse a cached non-CORS response and the canvas is still tainted — the symptom is a `SecurityError` on a URL that demonstrably sends the header. Hard-reload once after adding the attribute.

`Range` is in the policy on purpose: video seeking preflights it, and audio cover-art reads (`utilities/id3`) fetch a single byte range.

## Dropping the whole UI into another app

The browsing surface is a design-system organism, so a consumer gets it in one line:

```jsx
import MediaLibrary from '@kolkrabbi/kol-component/organisms/MediaLibrary';

<MediaLibrary variant="library" client={client} />   // the filter wall
<MediaLibrary variant="browse"  client={client} />   // Finder columns
<MediaLibrary variant="modal" open={open} client={client} onSelect={onPick} onClose={close} />
```

It renders read-only unless the client carries the write seams, so a read client is safe by construction. `settings` / `onSettingsChange` are optional — leave them off and the organism keeps its own state, seeded from `defaults`. See [[01-surfaces|01 — Surfaces]] for the full prop table as this app uses it.
