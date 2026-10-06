---
title: Media
type: index
status: active
updated: 2026-10-05
description: The media admin app (apps/media) and the three object stores it fronts — R2 kol-media, B2 website, B2 vault — moved in from the kol-r2b2 repo on 2026-10-05.
tags:
  - project/kol-monorepo
  - domain/cloud
---

# Media

`apps/media` is the admin and the API for the estate's object stores, live at `admin.kolkrabbi.io` (admin) and `media.kolkrabbi.io` (the same app, read-only). It moved into this repo from `kol-r2b2` on 2026-10-05; its rules are `ARCHITECTURE.md` §8 and its history is in `.kol/llm-context/media-history/`.

| # | Chapter | Covers |
|---|---|---|
| 01 | [[01-buckets/INDEX\|Buckets]] | R2 `kol-media`, B2 `website`, B2 `kol-vault-media`, the CDN worker, the cutover inventory |
| 02 | [[02-app/INDEX\|App]] | the admin's surfaces, the design-system components it is built from, consuming the API, local overrides |

Operations: [[../../operations/02-infrastructure/04-media-deploy|deploy]] · [[../../operations/02-infrastructure/05-media-r2-cors|R2 CORS]] · [[../../operations/02-infrastructure/06-media-setup-summary|setup summary]] · [[../../operations/02-infrastructure/07-media-bitwarden-setup|Bitwarden]].
