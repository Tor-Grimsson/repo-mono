---
Title: Workshop - Right Sidebar
Version: 1.0.0
Date: 2026-03-05
Status: Active
Content-Type: page-documentation
tags: [workshop, sidebar, toc, navigation, shell-layout]
---

## Overview

The right sidebar (TOC rail) provides contextual navigation for workshop pages. It appears at `xl` breakpoints (1280px+) as a 160px sticky column. Three content patterns serve different page types: scrollspy TOC for section-based pages, doc links for content pages, and sibling navigation as a fallback default.

## Architecture

### Content Injection

Pages inject right sidebar content via `ShellTocContext`, a React context exposing a `setTocContent` setter from `ShellLayout`. The pattern:

```jsx
const setTocContent = useContext(ShellTocContext)
useLayoutEffect(() => {
  setTocContent(<WorkshopSidebarContent sections={sections} links={DOC_LINKS} />)
  return () => setTocContent(null)
}, [setTocContent])
```

The cleanup `return () => setTocContent(null)` removes the sidebar when navigating away.

### Default Fallback

`ShellLayout` accepts a `defaultTocContent` prop. When no page sets `tocContent`, the layout renders `defaultTocContent` instead. This is wired in `App.jsx`:

```jsx
<ShellLayout
  defaultTocContent={<WorkshopDefaultSidebar />}
  ...
/>
```

`WorkshopDefaultSidebar` derives sibling pages from `WORKSHOP_ROUTES` using the current pathname, giving Apparat tools a list of sibling tools, Hall of Mirrors pages a list of halls, etc.

### Effective Content Resolution

```
effectiveTocContent = tocContent ?? defaultTocContent
```

- Page sets TOC explicitly → page content wins
- Page sets `null` on unmount → falls back to default
- No default provided → no sidebar column rendered

## Components

### WorkshopSidebarContent

**File:** `apps/web/src/components/workshop/molecules/WorkshopSidebarContent.jsx`

Unified sidebar accepting `{ sections, links }`. Renders up to three collapsible sections:

| Section | Condition | Content |
|---------|-----------|---------|
| On this page | `sections.length > 0` | `DocsToc` with IntersectionObserver scrollspy |
| Documentation | `links.length > 0` | Links to related `/workshop/docs/<id>` pages |
| Quick actions | always | All documentation, Workshop home, Copy path |

Each section uses a `SidebarSection` toggle with the `shell-sidebar-toggle shell-sidebar-label` class pattern.

### WorkshopDefaultSidebar

**File:** `apps/web/src/components/workshop/WorkshopDefaultSidebar.jsx`

Fallback for pages with no explicit TOC. Reads `useLocation()` and matches against `WORKSHOP_ROUTES` to render:

- **Section label** — parent route name (e.g. "Apparat", "Hall of Mirrors")
- **Sibling links** — all children of the parent route with active state
- **Quick actions** — Workshop home, Copy path

### DocsToc (reused)

**File:** `apps/web/src/components/workshop/docs/DocsToc.jsx`

IntersectionObserver-based TOC that highlights the active section as the user scrolls. Receives `toc` as `Array<{ id, label }>` and queries `document.getElementById(id)` for each entry. Used by both docs pages (markdown headings) and workshop pages (section divs).

**Requirement:** The element with the matching `id` must be persistent in the DOM — it cannot be inside a conditionally rendered block that unmounts when collapsed.

## Section ID Pattern

Workshop pages with `SectionToggle` sections must place `id` on the persistent wrapper div:

```jsx
// Correct — id persists when content is collapsed
<div id="icon-sizes" className="space-y-4">
  <SectionToggle ... />
  {expanded && <div>...</div>}
</div>
```

For map-based pages: `<div key={section.id} id={section.id} className="space-y-4">`

## Page Coverage

| Pattern | Pages | Right sidebar content |
|---------|-------|----------------------|
| Sections + doc links | Icons, Logo, Typography, Animations, Spacing, Atoms, Molecules, Organisms | Scrollspy TOC + doc links + quick actions |
| Sections only | ChessComponents | Scrollspy TOC + quick actions |
| Doc links only | Colors, Prose, Dashboard (all 4) | Doc links + quick actions |
| Doc reader | DocumentationReader | DocsToc + tags + quick actions |
| Default fallback | Overview pages, Apparat tools, Hall of Mirrors, Chess | Sibling nav + quick actions |

## Files

| File | Role |
|------|------|
| `packages/ui/src/layout/ShellLayout.jsx` | `defaultTocContent` prop, `effectiveTocContent` resolution |
| `apps/web/src/components/workshop/molecules/WorkshopSidebarContent.jsx` | Unified sidebar (TOC + links + actions) |
| `apps/web/src/components/workshop/WorkshopDefaultSidebar.jsx` | Fallback sibling navigation |
| `apps/web/src/components/workshop/docs/DocsToc.jsx` | Reusable scrollspy TOC |
| `apps/web/src/App.jsx` | Wires `defaultTocContent` into ShellLayout |

## Adding a Right Sidebar to a New Page

1. Define a `sections` array: `[{ id: 'my-section', label: 'My Section' }]`
2. Add `id` attributes to the persistent wrapper divs for each section
3. Define a `DOC_LINKS` array (optional): `[{ id: 'doc-id', label: 'Doc Title' }]`
4. Call `setTocContent(<WorkshopSidebarContent sections={sections} links={DOC_LINKS} />)` in a `useLayoutEffect`

If no explicit sidebar is needed, the page automatically gets the default sibling navigation.

## CSS Classes

All classes are defined in `packages/ui/css/components.css`:

| Class | Usage |
|-------|-------|
| `shell-sidebar-toggle` | Collapsible section header button |
| `shell-sidebar-label` | 11px mono uppercase label |
| `shell-sidebar-link` | TOC/nav anchor (64% opacity, `.active` = 100%) |
| `shell-sidebar-action` | Action button with icon |
