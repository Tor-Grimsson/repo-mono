---
title: The app
type: index
status: active
updated: 2026-08-27
description: What the admin app actually is after the 2026-08-27 adoption — two DS organism pages over one media client, the components it consumes, how other apps consume the same buckets, and the local overrides still owed to the design system.
aliases:
  - app
  - admin-app
tags:
  - domain/design-system
  - project/kol-monorepo
related:
  - "[[../INDEX|documentation]]"
  - "[[../01-buckets/INDEX|06 — Buckets]]"
  - "[[../../operations/INDEX|operations]]"
---

# The app

`06-buckets/` documents **what is stored**. This section documents **the thing that shows it** — the React app behind `admin.kolkrabbi.io` and `media.kolkrabbi.io`.

It exists because on 2026-08-27 the app stopped being its own UI. `src/FileList.jsx` — 834 lines that were the entire browsing surface — was promoted into the design system as `MediaLibrary`'s two page variants and deleted here. What remains is 98 lines of wiring. That inverts where the answers live: almost nothing about how this app *looks* is answerable from this repo any more, and a reader who doesn't know that will go looking in the wrong place.

| Doc | Covers |
|---|---|
| [[01-surfaces\|01 — Surfaces]] | The two pages, why they are stacked rather than tabbed, and the three units of the layout. |
| [[02-ds-components\|02 — DS components]] | Every design-system part the app renders, which package and tier it lives in, and what it does here. |
| [[03-consuming\|03 — Consuming the buckets]] | How any other app lists and displays this media — the client, the API, CORS, the public bases. |
| [[04-local-overrides\|04 — Local overrides]] | What is still local, why, and which DS seam each one is waiting on. |

## The shape in one paragraph

`src/App.jsx` holds bucket state, the URL-hash prefix and per-bucket settings, builds one media client (`src/lib/client.js`), and renders `MediaLibrary` twice — `variant="browse"` (header, breadcrumb, column browser) above `variant="library"` (the filter wall). Writes are Pages Functions under `functions/api/`. Everything visual is `@kolkrabbi/kol-component` + `@kolkrabbi/kol-theme`.

**Sections `00`–`05` are the vendored DS reference** and describe the building blocks generically. This section describes *this app's* use of them, and is authored here.
