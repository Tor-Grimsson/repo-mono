---
title: B2 — kol-vault-media
type: reference
status: active
updated: 2026-08-14
description: The Backblaze B2 store holding the Obsidian kol-vault's media offload — identity, lanes, who reads it, and its place in the custom-domain work.
aliases:
  - kol-vault-media
  - vault-bucket
tags:
  - domain/cloud
  - project/kol-monorepo
  - provider/backblaze
covers:
  - bucket identity and the four lanes
  - why video dominates the size
  - the vault.kolkrabbi.io mapping
sources:
  - B2 console, 2026-08-14
  - live read via functions/api/_b2.js
related:
  - "[[INDEX|buckets]]"
  - "[[02-b2-website|B2 — kolkrabbi/website]]"
  - "[[05-cdn-proxy|kol-cdn-proxy]]"
---

# B2 — kol-vault-media

The Obsidian **kol-vault**'s media offload. Captures and attachments land here and the vault embeds them by CDN URL, so binaries never enter the vault's git history.

## Identity

| Field | Value |
|---|---|
| Provider | Backblaze B2 |
| Bucket | `kol-vault-media` |
| Bucket ID | `c7e396785cc2aba79ce20016` |
| Created | 2026-06-09 |
| Type | Public · **Keep only the last version** |
| Endpoint | `s3.us-east-005.backblazeb2.com` · downloads via `f005.backblazeb2.com` |
| Public read | `https://f005.backblazeb2.com/file/kol-vault-media/<path>` |
| rclone remote | `kolkrabbi:kol-vault-media` |
| Objects | **4095** · 25.7 GB — console and live read agree exactly |
| CLI | `BUCKET_REMOTE=kolkrabbi:kol-vault-media bucket ls …` |
| Credential | the same rclone `[kolkrabbi]` key |

Its file count matches the console exactly because it keeps only the last version — the contrast that makes [[02-b2-website|`kolkrabbi`]]'s 3443-vs-9212 gap legible as version bloat.

## Lanes

| Lane | Objects | Size | Note |
|---|---|---|---|
| `img/` | 3933 | 3.2 GB | the bulk of the file count |
| `sound/` | 115 | 2.1 GB | |
| `video/` | 46 | **20.4 GB** | 1% of the objects, 80% of the bytes |
| `lobby/` | 1 | ~0 | `tg-inbox` capture landing zone |

Paths sit at the bucket root — there is no `website/`-style wrapper prefix, unlike its sibling.

## Domain

Maps to **`vault.kolkrabbi.io`** through [[05-cdn-proxy|`kol-cdn-proxy`]], paths untouched:

```
now:  https://f005.backblazeb2.com/file/kol-vault-media/img/x.png
then: https://vault.kolkrabbi.io/img/x.png
```

## Consumers

Obsidian **kol-vault** only — 4908 embeds across its notes. Markdown, not code: no build, no release, no downstream package. See [[03-cutover-inventory|the cutover inventory]].

## Caveats

- **Not a website store.** Nothing public-facing reads it. Giving it a domain is about not welding the vault's 4908 embeds to a provider hostname, not about page performance.
- **Video is the cost.** 46 files carry 20.4 GB. Any storage-cost conversation about this bucket is a conversation about `video/`.
- **Read-only in the admin.** Writes stay on the `bucket` CLI, same as its sibling.
