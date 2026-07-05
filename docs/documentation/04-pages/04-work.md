---
Title: Page - Work
version: 2.0.0
date: 2026-03-17
status: active
content-type: page-documentation
category: pages
cross-references:
  parent: 4.0.0
  related:
    - apps/web/src/routes/Work.jsx
    - apps/web/src/routes/WorkDetail.jsx
tags: [pages, page-documentation, work, portfolio, sanity]
modified: 2026-03-17
---

## Overview

The Work page is the portfolio hub. Two views (shelf and list) display all projects fetched from Sanity CMS, grouped by type. Clicking a project opens a cinematic detail overlay without leaving the page.

**Route:** `/work`
**Detail route:** `/work/:slug` (rendered as `<Outlet>` overlay)
**Components:** `apps/web/src/routes/Work.jsx`, `apps/web/src/routes/WorkDetail.jsx`

## Data

All project data comes from Sanity via `getAllProjects()` in `apps/web/src/lib/queries.js`.

**Fields used:** `_id`, `title`, `slug`, `type`, `description`, `about`, `client`, `year`, `tags`, `links[]`, `thumbnail`, `heroImage`, `heroVideo`, `media[]`

**Project types:** `client`, `collection`, `tool`, `system`

Projects are passed to WorkDetail via React Router `<Outlet context={{ projects }}>`. Direct URL access (`/work/aftra`) triggers a fallback fetch if the parent hasn't loaded yet.

## Work Listing (`/work`)

### View Modes

Controlled by `WorkViewContext` (shared with Navbar for the view toggle + search bar).

| Mode | Description |
|------|-------------|
| Shelf | 4 horizontal Embla carousel rows, one per project type |
| List | Vertical card list with thumbnails |

Animated transitions between views via framer-motion `AnimatePresence`.

### Shelf View

Each type renders a `ShelfRow` — a drag-free Embla carousel with 8 repeated project cards.

| Property | Value |
|----------|-------|
| Card sizes | `w-[280px] md:w-[400px]`, 3 alternating heights |
| Card component | `TiltCard` (grounded variant, disabled on touch via `pointer: coarse`) |
| Entry animation | CSS staggered hinge-up (rotateX + translateY, 70ms delay per card) |
| Row direction | Odd rows (`fromLeft`) align end, scroll opposite |
| Scroll parallax | Page scroll nudges carousel at 0.5x rate (disabled on mobile) |
| Perspective | `800` on desktop, removed on mobile |
| Background | `AsciiClouds` drift variant (unmounts in list view and when slug is open) |

Row labels appear below each carousel, left-aligned or right-aligned matching the row direction.

### List View

Flat list of `ProjectListItem` cards within `max-w-[1400px] mx-auto px-4 md:px-6`.

**ProjectListItem** (`apps/web/src/components/work/ProjectListItem.jsx`):
- 1:1 thumbnail on the left (`w-16 h-16 md:w-28 md:h-28`, `border-fg-08`)
- Header row: title + tags (left), type + year (right)
- Preview row: project description in TG Malromur italic (`text-xl md:text-5xl`)
- Hover: `bg-surface-secondary` with 24% border

Entry animation: CSS staggered drop-in (translateY, matching shelf timing).

### Search

`filterProjects()` filters by title, description, client, type, and tags. Query comes from `WorkViewContext.searchQuery`, controlled by the Navbar search bar.

### Responsive Spacing

| Element | Classes |
|---------|---------|
| Main container | `pt-20 md:pt-56 pb-16 md:pb-32` |
| Intro wrapper | `px-4 md:px-6 pt-16 md:pt-32`, `lg:pl-64` (shelf only) |
| Shelf column gap | `gap-12 md:gap-24` |
| ShelfRow section | `py-6 md:py-16` |
| Row labels | `pl-4 md:pl-64` / `pr-4 md:pr-64` |

---

## Work Detail (`/work/:slug`)

Rendered as an overlay panel via `<Outlet>`. The listing page remains mounted underneath.

### Panel

| Property | Value |
|----------|-------|
| Width | `w-full md:w-[78vw]` |
| Position | `fixed top-0 right-0 bottom-0 z-[80]` |
| Entry | Slides up from bottom (`y: 100%` → `y: 0`, 200ms) |
| Backdrop | `fixed inset-0 z-[70]`, `blur(4px)`, click navigates to `/work` |
| Close | Escape key or close button (top-right, `w-9 h-9 rounded-full bg-fg-04`) |
| Body | `overflow: hidden` while open |

### Sticky Header

Pinned at top of panel, shows `/ {project.type}` and close button. Background transitions from `bg-fg-inverse-80` to `bg-fg-inverse-48` with backdrop blur once scrolled past hero.

### Hero Section

| Property | Value |
|----------|-------|
| Height | `h-[120svh] md:h-[150vh]` |
| Media | Video (priority) or image, fills first 100vh |
| Title | Sticky at `top-20`, shows client/title (mono xs) + description (heading lg), `mix-blend-difference` |
| Down arrow | Centered at bottom of video area, fades out when gallery enters view |
| Video pause | Auto-pauses when hero section scrolls fully off-screen |

### Gallery Carousel

Embla carousel (`dragFree`, `align: start`) showing project `media[]` items. Each item sized by its real aspect ratio from Sanity metadata.

| Property | Value |
|----------|-------|
| Wide items (ar >= 1) | `min(80%, 700px)` |
| Narrow items (ar < 1) | `min(50%, 400px)` |
| Click | Opens `ImageLightbox` (guarded by drag detection) |

### ImageLightbox

**Component:** `apps/web/src/components/work/ImageLightbox.jsx`

Fullscreen media viewer at `z-[90]`.

| Feature | Implementation |
|---------|---------------|
| Close | X button, Escape key, backdrop click |
| Navigate | Left/right arrows (desktop), swipe (mobile, 50px threshold), arrow keys |
| Escape isolation | Registers with `capture: true` + `stopImmediatePropagation` to prevent WorkDetail's Escape handler |
| Body | `overflow: hidden` while open |

### Metadata Grid

3-column grid (`grid-cols-1 md:grid-cols-3`) below the gallery.

| Column | Content |
|--------|---------|
| 1 | Tags, About |
| 2 | Year, Type, Client |
| 3 (client/collection) | Live URL, Repository URL, Workshop URL |
| 3 (tool/system) | "Sources & References" heading + `SourcesItem` cards from `@kol/ui` using project `links[]` |

### More Work Shelf

Embla carousel of other projects using `TiltCard` (grounded variant). Cards: `w-[200px] md:w-[260px]`, 3 alternating heights. Title overlay on hover.

### Responsive Padding

All content zones follow `px-4 md:px-8 lg:px-12`.

---

## Z-Index Stack

| Layer | Z-Index |
|-------|---------|
| Backdrop (blur) | `z-[70]` |
| Detail panel | `z-[80]` |
| ImageLightbox | `z-[90]` |

## Components

| Component | Location | Purpose |
|-----------|----------|---------|
| `Work` | `apps/web/src/routes/Work.jsx` | Listing page with shelf/list views |
| `WorkDetail` | `apps/web/src/routes/WorkDetail.jsx` | Detail overlay panel |
| `ProjectListItem` | `apps/web/src/components/work/ProjectListItem.jsx` | List view card |
| `ImageLightbox` | `apps/web/src/components/work/ImageLightbox.jsx` | Fullscreen media viewer |
| `TiltCard` | `apps/web/src/components/animation/TiltCard.jsx` | 3D tilt card (disabled on touch) |
| `WorkViewContext` | `apps/web/src/context/WorkViewContext.jsx` | Shared view mode + search state |

## Mobile Optimizations

- Detail panel: full-width on mobile (`w-full md:w-[78vw]`)
- Hero height: `120svh` mobile vs `150vh` desktop
- TiltCard: renders plain `<div>` on `(pointer: coarse)` devices
- Scroll parallax: disabled on mobile (`max-width: 767px`)
- Entry perspective: removed on mobile
- AsciiClouds: unmounts when slug is open or in list view

---

**Last Updated:** 2026-03-17
**Cross-References:** 2.3.0
**Category:** Pages
**Status:** Active
