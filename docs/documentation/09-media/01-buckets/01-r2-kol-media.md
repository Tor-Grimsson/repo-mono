---
title: R2 — kol-media
type: reference
status: active
updated: 2026-10-14
description: The Cloudflare R2 store behind r2.kolkrabbi.io — identity, access surfaces, credentials, API contract, write paths and known failure modes.
aliases:
  - kol-media
  - r2
tags:
  - domain/cloud
  - project/kol-monorepo
  - provider/cloudflare
covers:
  - bucket identity and access surfaces
  - the API endpoints and their auth (R2 through D1 since 2026-10-13)
  - three write paths
  - edge-cache and CORS caveats (CORS on object reads since 2026-08-27)
sources:
  - apps/media/functions/api/
  - apps/media/wrangler.toml
  - apps/media/scripts/bulk-upload.sh
related:
  - "[[INDEX|buckets]]"
  - "[[02-b2-website|B2 — kolkrabbi/website]]"
  - "[[../02-app/03-consuming|consuming the buckets]]"
  - "[[../02-app/05-database|the database]]"
  - "[[../../../operations/02-infrastructure/05-media-r2-cors|R2 CORS]]"
---

# R2 — kol-media

The kol-system tool store. Media that kol-system apps upload and read; **not** the public website's media (that's [[02-b2-website|B2]]).

## Identity

| Field | Value |
|---|---|
| Provider | Cloudflare R2 |
| Bucket | `kol-media` |
| Public read | `https://r2.kolkrabbi.io/<key>` |
| Admin | `https://admin.kolkrabbi.io` — admin view + API base |
| Read-only | `https://media.kolkrabbi.io` — same Pages app without writes (since 2026-08-26) |
| Pages project | `kol-media-admin` (in `wrangler.toml` — **not** renamed with the repo) |
| Binding | `MEDIA_BUCKET` |
| Objects | 433 (snapshot 2026-07-04) |
| Lanes | `labs-render-examples/` (415) · `type/` · `video/` · 7 root `NN.jpg` |

**The binding name is a three-way seam.** `MEDIA_BUCKET` must agree across the Cloudflare Pages dashboard, every `functions/api/*.js`, and `wrangler.toml`. Renaming it means touching all three; the dashboard half is not in this repo.

## API

All under `media.kolkrabbi.io` (the one hostname since 2026-10-05; `admin.` only redirects), gated by `functions/api/_middleware.js` (HTTP Basic Auth, password from `ADMIN_PASSWORD`). **Since 2026-10-13 the R2 side lists from, and writes through, a D1 database** — the object key is permanent; see [[../02-app/05-database|the database]].

| Endpoint | Method | Auth | Notes |
|---|---|---|---|
| `/api/list` | GET | **public** — CORS `*`, OPTIONS preflight; `no-store` for R2, 30s cache for B2 | the cross-repo read surface; R2 from D1 (adopts objects written straight into the bucket), B2 from B2 |
| `/api/upload` | POST multipart | Basic | `key` is the PATH; bytes go to `f/<id>.<ext>`, the path becomes the row; same path overwrites in place |
| `/api/object` | DELETE | Basic | `key` is a path; a path ending in `/` deletes the folder's files |
| `/api/rename` | POST | Basic | `{ from, to }` paths — a ROW edit; the object and its URL never move; 409 on an existing destination |
| `/api/download` | GET | Basic | path → row → object; adds `Content-Disposition: attachment` with the row's name |
| `/api/decks` · `/api/notes` | GET · PUT (· DELETE) | Basic, CORS allowlist | brand's editors; see the database page |

**Response contract** — the only shape consumers depend on:

```json
{ "objects": [ { "key": "<path>", "storageKey": "<R2 key>", "contentType": "…", "size": 0 } ] }
```

No shared types layer guards it. Renaming or dropping any of the three original fields breaks both consumers silently. `storageKey` (2026-10-13) is what a URL is built on — `key` is the path the explorer shows and the write endpoints speak.

## Write paths

| Path | Credential | Use |
|---|---|---|
| Admin UI / `POST /api/upload` | `ADMIN_PASSWORD` | single files, drag-drop |
| `scripts/bulk-upload.sh` | wrangler OAuth session | whole local folders, `xargs -P` parallel |
| `bucket-r2` (`~/.local/bin`) | wrangler OAuth session | single-file ops without cloning the repo |

The two CLI paths bypass Basic Auth entirely — they talk to R2 directly under the already-authenticated wrangler token. Confirm with `pnpm exec wrangler whoami`.

## Consumers

| Repo | Reads | Writes |
|---|---|---|
| `kol-labs-single` | `fetch('…/api/list')` + `r2.kolkrabbi.io/<key>` | yes — server-side proxy, `ADMIN_PASSWORD` stays server-side |
| `kol-design-editor` | same, read-only + `proxied()` | no |

Neither vendored a client package originally; both hand-rolled `mediaLibrary.js`. That consolidation **shipped** — `@kolkrabbi/kol-media-client` is the client, and since 0.2.0 it carries a bucket table so one client reaches all three stores. See [[../02-app/03-consuming|consuming the buckets]].

## Caveats

- **Rename no longer moves the object (2026-10-13).** The edge-cache-on-rename caveat is gone with it: a rename edits the row, the key a consumer holds keeps serving.
- **CORS covers reads, not writes.** `/api/list` has always sent `*`, and since 2026-08-27 so do object reads on `r2.kolkrabbi.io` — a bucket policy allowing `GET`/`HEAD` with `Range`, so canvas consumers work. See [[../../../operations/02-infrastructure/05-media-r2-cors|R2 CORS]]. A second consumer wanting **writes** still needs a consumer-side proxy or the shared component.
- **No pagination UI.** The list endpoint returns up to 1000 with a cursor the client ignores. At 433 objects this is not yet load-bearing.
- **No thumbnail generation.** R2 serves originals; thumbnails are MIME-type detection client-side.
