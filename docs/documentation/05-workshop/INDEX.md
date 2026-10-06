---
title: Workshop Index
type: index
status: active
updated: 2026-10-05
created: 2025-12-02
description: Index for /workshop — since 2026-10-05 a hub with one page per app — and for the docs in this section, most of which describe what the hub retired.
tags:
  - project/kol-monorepo
  - domain/workshop
---

## Overview

`/workshop` is a hub: a home and one page per app or tool that lives on its own `kolkrabbi.io` subdomain. Each page says what the app is, its state and when it last changed, and links to the live app. The route tree is in [[../04-pages/11-site-tree|site tree]] section 2.

Until 2026-10-05 the workshop also published this `docs/` vault, an Apparat gallery, the Dashboard pages and framed sub-pages of the design system, brand and chess sites. Those left the live site, with redirects in `apps/web/src/App.jsx`. The files in `docs/` stay in the repo.

---

## Adding or changing a page

One markdown file per app in `apps/web/src/data/workshop/pages/`. The rail, the home card, the search item, the page title and the route all derive from it — nothing else is edited.

| Field | What it does |
|---|---|
| `title` · `description` | the card, the rail row, the search item |
| `status` · `updated` | the state line on the card and in the page's frontmatter block — keep them true |
| `url` · `repo` | the live app and the repository, linked from the right rail |
| `icon` · `image` · `order` | the glyph, the card cover, the position |
| `embed: true` | adds the open-in-place frame at `<id>/live` |

The page renders through `@kolkrabbi/kol-workshop`'s `DocumentationReader` (`apps/web/src/routes/workshop/WorkshopPage.jsx`); the shell is `apps/web/src/components/workshop/WorkshopChrome.jsx`.

---

## Docs in this section

| Doc | Status | Covers |
|---|---|---|
| [[05-chess\|Chess]] | active | the chess program — the app runs at `chess.kolkrabbi.io` |
| [[06-dashboard\|Dashboard]] | canonical | the dashboard system behind `metrics.kolkrabbi.io` |
| [[01-foundations\|Foundations]] | archived | the retired `/workshop/foundations` page |
| [[02-apparatus\|Apparatus]] | archived | the retired Apparat gallery |
| [[03-mirrors\|Mirrors]] | archived | Hall of Mirrors, superseded by `mirror.kolkrabbi.io` |
| [[04-components\|Components]] | archived | the retired `/workshop/components` page |
| [[07-documentation\|Documentation]] | archived | the docs viewer that published this vault on the site |
| [[08-search-indexer\|Search Indexer]] | archived | the in-repo search keyword map |
| [[09-right-sidebar\|Right Sidebar]] | archived | the in-repo right rail, now the package's |
| [[10-hooks\|Hooks]] | archived | workshop hooks |
