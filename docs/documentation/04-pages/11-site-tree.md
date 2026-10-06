---
title: Site Tree & Navigation UI
type: reference
status: active
updated: 2026-10-06
created: 2025-11-16
description: Canonical route tree for the marketing site, Foundry, Collections, and Workshop, plus how navbar/footer/sidebar navigation UI maps to it.
aliases:
  - site-tree
tags:
  - project/kol-monorepo
  - domain/pages
  - domain/site-tree
---

# Site Tree & Navigation UI

> Canonical tree for the marketing site + workshop along with the UI components that expose the routes.

## Overview
- **Scope:** Public marketing pages (`apps/web/src/routes/*`), Foundry/specimens detail pages, Collections, Workshop, and Styleguide/workshop sandbox routes.
- **Outputs:** (1) Tree representation of every routable surface we expose today, (2) summary of how navigation UI maps to that tree on desktop/tablet/mobile.
- **Sources:** `0.0.2-metadata-index.md`, `1.5.0-navigation-system.md`, `1.5.1-navbar-footer.md`, `5.0.2-workshop-sidebar.md`, and the `apps/web/src/routes` + `apps/web/src/data/workshop/pages/` trees.

Use this file when you need to answer “Where does this page live?” or “Which UI surfaces link to it?” without scanning multiple docs.

---

## 1. Marketing & Foundry Site Tree

### Legend
- `()` = component file (from `apps/web/src/routes`)
- `[]` = notable nested route parameters
- `→` = key internal references (docs or data files)

### Tree

```
/
├─ Home (Home.jsx) → 4.0.1-home.md
├─ Studio (Studio.jsx, `/#story` anchor)
├─ Work
│  ├─ Index (Work.jsx)
│  └─ Detail (WorkDetail.jsx) [/:slug]
├─ Stack
│  ├─ Overview (Stack.jsx)
│  ├─ Article (StackArticle.jsx) [/:slug]
│  └─ Case Study (StackDetail.jsx) [/:slug]
├─ Foundry
│  ├─ Overview (foundry/FoundryOverview.jsx)
│  ├─ Typefaces (foundry/FoundryTypefaces.jsx)
│  │  └─ Individual family pages
│  │     ├─ /foundry/typefaces/malromur (FoundryMalromur.jsx)
│  │     ├─ /foundry/typefaces/dylgjur (FoundryDylgjur.jsx)
│  │     ├─ /foundry/typefaces/ordspor (FoundryOrdspor.jsx)
│  │     ├─ /foundry/typefaces/gullhamrar (FoundryGullhamrar.jsx)
│  │     ├─ /foundry/typefaces/rot (FoundryRoot.jsx)
│  │     ├─ /foundry/typefaces/silfurbarki (FoundrySilfurbarki.jsx)
│  │     └─ /foundry/typefaces/trollatunga (FoundryTrollatunga.jsx)
│  ├─ Specimens (foundry/FoundrySpecimens.jsx)
│  └─ Licensing (foundry/FoundryLicensing.jsx)
├─ Collections — retired 2026-07-15: pages migrated into CMS entries (type "collection" projects on /work); route files deleted
├─ Specimens (marketing detail routes)
│  ├─ /specimen/malromur (specimens/malromur/…)
│  ├─ /specimen/dylgjur (specimens/dylgjur/…)
│  ├─ /specimen/ordspor (specimens/ordspor/…)
│  ├─ /specimen/gullhamrar (specimens/gullhamrar/…)
│  ├─ /specimen/rot (specimens/rot/…)
│  ├─ /specimen/silfurbarki (specimens/silfurbarki/…)
│  └─ /specimen/trollatunga (specimens/trollatunga/…)
├─ Demo (Demo.jsx)
├─ Workshop landing (Workshop.jsx) – redirects into `/workshop`
└─ NotFound (NotFound.jsx)
```

### Notes
- **Collections/Foundry routes** mirror the numbering in `4.4.x` and `4.5.x` docs for one-to-one traceability.
- **Specimen detail pages** live outside `/foundry` to preserve historic marketing URLs; they’re still linked from the Foundry dropdown and the `/foundry/specimens` index.
- **Studio** currently resolves to `/studio` and the `/#story` anchor from the navbar for backwards compatibility with the One Page story block.
- **Workshop** is exposed from the marketing nav but renders the sandbox app (see section 2).

---

## 2. Workshop Tree

Source of truth: the markdown files in `apps/web/src/data/workshop/pages/` — one per app, read by `apps/web/src/data/workshop/pages.js`. The rail, the home cards, the search items, the page titles and the routes all derive from that folder. Every path is relative to `/workshop`.

```
/workshop                 home (WorkshopIntroduction.jsx) — one card per page
├─ design-system          ui.kolkrabbi.io
├─ brand                  brand.kolkrabbi.io
├─ fxr                    fxr.kolkrabbi.io        + /live
├─ monitor                monitor.kolkrabbi.io    + /live
├─ mirror                 mirror.kolkrabbi.io     + /live
├─ vcap                   vcap.kolkrabbi.io       + /live
├─ chess                  chess.kolkrabbi.io
└─ metrics                metrics.kolkrabbi.io
```

### Notes
- A page is its markdown file rendered through `@kolkrabbi/kol-workshop`'s `DocumentationReader` (`routes/workshop/WorkshopPage.jsx`). Its frontmatter carries `title · description · status · updated` and the page's own `url · repo · icon · image · order · embed`.
- `/live` is the open-in-place frame (`EmbedFrame.jsx`) and exists only for a page with `embed: true`. A site with its own navigation opens on its subdomain.
- Retired 2026-10-05, with redirects in `App.jsx`: the Docs section (`/workshop/docs/*`, `/docs/*`), the Apparat layer, the Dashboard pages, and every framed sub-page of Design System, Brand and Chess. The files are in `_tmp/2026-10-05-workshop-hub/`; `docs/` itself stays in the repo and is no longer published on the site.

---

## 3. Navigation UI Surfaces

### 3.1 Data + Routing
- **Data Source:** `apps/web/src/data/workshop/pages/` for the workshop; public nav links are in `Navbar.jsx` to keep marketing copy close to UI.
- **Router Layer:** `apps/web/src/App.jsx` defines the public routes listed above; nested workshop routes live in `apps/web/src/routes/workshop`.
- **Site Layout:** `SiteLayout.jsx` (from `1.5.0-navigation-system.md`) wraps every public page, hiding chrome automatically on `/styleguide`/`/workshop` when needed.

### 3.2 Global Navbar (Desktop/Mobile)
- **Component:** `apps/web/src/components/layout/Navbar.jsx` (documented in `1.5.1-navbar-footer.md`).
- **Primary links:** Studio, Work, Foundry (dropdown: Overview, Typefaces, Specimens, Malrómur specimen, Licensing), Stack, Collections (dropdown: Overview, Illustrations, Grids, Logomarks, Motion Graphics), Workshop.
- **Desktop behavior:** Horizontal layout, token-driven colors, dropdowns with animated chevrons, click-outside handling, auto-hide on downward scroll beyond mid-viewport, theme toggle + language switcher.
- **Mobile behavior:** Hamburger toggles a full-screen overlay with large typography; selecting a link collapses the drawer. Dropdown groups render as collapsible sections sharing the same `NAV_ITEMS` data.

### 3.3 Footer & Secondary Links
- **Component:** `apps/web/src/components/layout/Footer.jsx`.
- **Structure:** Wordmark + two-column navigation (“Menu” reuses the primary routes, “Follow” lists socials) plus a back-to-top control.
- **Behavior:** Smooth-scroll back-to-top button, context-aware surfaces (`--surface-tertiary`), and persistent layout so every marketing page exposes the same exit routes.

### 3.4 Workshop Navigation (Shell)
- **Component:** `apps/web/src/components/workshop/WorkshopChrome.jsx`, this app's adapter onto `@kolkrabbi/kol-workshop`'s `ShellLayout`.
- **Left rail:** the pages, flat. **Right rail:** the page's outline, plus its live and repository links on an app page.
- **Search:** the shell's modal over the pages and their headings.

### 3.5 Contextual Navigation Helpers
- **LoaderOverlay:** Surfaces only on first `/` visit to stage the initial experience (see `1.5.4-loader-overlay.md`), then hands off to the navbar.
- **In-page anchors:** Hero CTAs use deep links (`/#story`, `/foundry/specimens#library`) so the site tree stays shallow while still offering sectional jumps.
- **Workshop entry points:** Marketing buttons (e.g., “Open Workshop”) simply link to `/workshop`; once inside, sidebar + drawers take over.

---

## How to Extend
1. **Add a new public route:** create the React route file → register it in `App.jsx` → expose it through `NAV_ITEMS` (desktop + mobile pick it up automatically) → document it under the appropriate `4.x` page doc and update this tree.
2. **Add a workshop page:** add one markdown file to `apps/web/src/data/workshop/pages/` with the frontmatter in section 2. Nothing else — the rail, the home card, the search item and the route follow.
3. **UI updates:** keep `1.5.0`/`1.5.1` in sync if you change layout behavior (scroll logic, theme toggles, etc.) so this site tree continues to describe reality.

This document should be updated whenever a new top-level navigation item ships or when navigation UI patterns change materially.
