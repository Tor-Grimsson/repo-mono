---
title: B2 — kolkrabbi/website
type: reference
status: active
updated: 2026-08-14
description: The Backblaze B2 store serving the public site's media — identity, lanes, the raw-hostname exposure, the custom-domain path, and what an admin surface would need.
aliases:
  - website-bucket
  - b2
tags:
  - domain/cloud
  - project/kol-monorepo
  - provider/backblaze
covers:
  - bucket identity and the four lanes
  - the raw-hostname exposure and the domain fix
  - what an admin adapter needs
  - the cache caveat that arrives with the domain
sources:
  - ~/.dotfiles/docs/operations/systems/cdn/01-b2.md
  - ~/.config/rclone/rclone.conf
related:
  - "[[INDEX|buckets]]"
  - "[[01-r2-kol-media|R2 — kol-media]]"
---

# B2 — kolkrabbi/website

The public site's media store. Bigger, more public, and less equipped than [[01-r2-kol-media|R2]] — 3432 objects serving `kol-monorepo` with no domain of its own and no admin surface.

## Identity

| Field | Value |
|---|---|
| Provider | Backblaze B2 |
| Bucket | `kolkrabbi` |
| Bucket ID | `47b3f6285c82cb879ca20016` |
| Created | 2025-11-28 |
| Type | Public · **Keep all versions** |
| Endpoint | `s3.us-east-005.backblazeb2.com` · downloads via `f005.backblazeb2.com` |
| Prefix | `website/` — 3440 of 3443 current objects |
| Public read | `https://f005.backblazeb2.com/file/kolkrabbi/website/<path>` |
| rclone remote | `kolkrabbi:kolkrabbi/website` |
| Current objects | **3443** · 5.4 GB (live read 2026-08-14) |
| All versions | **9212** · 17.8 GB (B2 console) |
| CLI | `bucket` (`~/.local/bin/bucket`, thin rclone wrapper) |
| Credential | rclone `[kolkrabbi]` key in `~/.config/rclone/rclone.conf` |

**Version bloat is real here.** The bucket keeps every version and has no lifecycle rule, so 3443 current objects (5.4 GB) sit inside 9212 stored files (17.8 GB) — roughly **12 GB of superseded versions** being paid for. `kol-vault-media` keeps only the last version and its two numbers match exactly. A lifecycle rule is a console action; nothing in this repo can set it.

## Lanes

| Lane | Holds |
|---|---|
| `art-prints/` | the print library — per-print `artwork/`, `print/`, certificate, `data.yaml`, plus a top-level `manifest.yaml` |
| `asset-library/` | collections, homepage, foundry, studio assets |
| `hls-library/` | HLS + MP4 video, e.g. `video-library/work/` for kol-monorepo work pages |
| `data-library/` | chess JSON / PGN |

## The exposure

The raw Backblaze datacentre hostname is in the public site's HTML. Every `f005.backblazeb2.com/file/kolkrabbi/website/…` URL published to a page welds the site to a provider-specific host that Kolkrabbi does not control the name of.

**The fix:** `cdn.kolkrabbi.io` fronting the bucket, keeping the path identical —

```
now:  https://f005.backblazeb2.com/file/kolkrabbi/website/<path>
then: https://cdn.kolkrabbi.io/website/<path>
```

**Keep the `website/` segment.** Stripping it reads tidier and buys nothing: it forecloses serving any other prefix from the bucket, and it turns the site migration from a one-token hostname replace into a path rewrite across every reference.

**How:** a Cloudflare Worker — [[05-cdn-proxy|`kol-cdn-proxy`]].

**Backblaze's own "Custom Domains" feature is not available in this account** (checked 2026-08-14 — absent from the B2 console sidebar and from both buckets' panels, which offer only Bucket Settings, Lifecycle, CORS, Object Lock, Snapshot, Unfinished Large Files, Access Logs and Event Notifications). It is not a setting to hunt for; the Worker is the route, not a fallback.

`kolkrabbi.io` is already on Cloudflare, which the Worker route requires, and B2→Cloudflare egress is free under the Bandwidth Alliance.

## What an admin surface needs

The UI half is already built and provider-agnostic — `FileList` renders whatever `/api/list` returns: grid/list, thumbnails, sort, search, drill-down, batch select. The new work is one adapter:

| Concern | R2 today | B2 |
|---|---|---|
| Access | Pages Functions binding `env.MEDIA_BUCKET` | no binding exists — signed S3-compatible requests |
| Credential | wrangler OAuth | the rclone `[kolkrabbi]` key already exists; no new secret to mint |
| Response | `{ key, contentType, size }` | **must return the same shape** — that keeps it a parameter, not a fork |

## Caveats

- **The cache caveat arrives with the domain.** Behind Cloudflare, a renamed or overwritten key keeps serving the old object from the edge. R2 already has this failure mode; B2 gets it the day the domain lands, and it bites harder here — 3432 objects, with an art-print library that gets re-exported.
- **No thumbnails without a UI.** `bucket tree` lists names and sizes. An art print cannot be recognised from a filename, which is the gap a visual surface closes and the CLI structurally cannot.
- **Trees are not documented here.** Auto-refreshed snapshot: `~/.dotfiles/docs/operations/systems/cdn/02-b2-tree.md`, regenerated on every `bucket` write.
