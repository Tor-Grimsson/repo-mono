# Documentation Improvements — Living Progress Document

> Canonical reference for the docs build-out. Updated as phases complete.

---

## Breakpoints (locked)

| Breakpoint | Tailwind | px | Docs behavior |
|---|---|---|---|
| Mobile | — | < 768px | No sidebar; hamburger in header; drawer slides in |
| Tablet | `md` | 768px | No sidebar; hamburger still visible; drawer still used |
| Desktop | `lg` | 1024px | Sidebar appears; hamburger hidden; drawer disabled |
| Wide | `xl` | 1280px | TOC column also appears (right side) |

**Rules:**
- Hamburger / menu trigger: visible at `< lg` → `lg:hidden`
- Left nav sidebar: `hidden lg:block`
- Right TOC column: `hidden xl:block`
- Mobile pill-button row → replaced by hamburger in `DocsPageHeader`
- Drawer z-index: sits above all content

---

## Phase Checklist

| Phase | Description | Status |
|---|---|---|
| 0 | Create this living progress document | ✅ done |
| 1 | Route cleanup: `/docs` top-level routes + redirects | ✅ done |
| 2 | Mobile hamburger menu in `DocsPageHeader` | ✅ done |
| 3 | Component showcase PoC (`/docs/components`) | ✅ done |
| 4 | Mobile drawer fix — React portal escape from stacking context | ✅ done |

---

## Key Decisions

### Routes (Phase 1)
- New top-level routes: `/docs` and `/docs/:docId`
- Old URLs redirect: `workshop/design-system/documentation` → `/docs`
- `RedirectDocId` is an inline component using `useParams` to forward `:docId`
- Dead `workshop/docs` alias removed
- `navigation.js` documentation entry updated to `/docs` (absolute path)
- `DocumentationReader.jsx` internal links updated from old path to `/docs/...`

### Mobile Nav (Phase 2)
- Hamburger added to `DocsPageHeader` left side, `lg:hidden`
- TOC icon added to `DocsPageHeader` right side (before theme toggle), `lg:hidden`
- `DocsShell` passes `onMenuOpen` / `onTocOpen` callbacks to header
- Pill-button div below header removed
- `DocsRailDrawer` existing behavior unchanged

### Component Showcase (Phase 3)
- New route: `/docs/components` → `DocsComponents.jsx`
- "Components" tab added to `DocsPageHeader` tab row
- Cards use `DesCard` + `SurfacePreviewGrid.Surface` from existing molecules
- PoC scope: Button, Tag, Toggle, Input — static previews, no prop controls
- No detail pages yet (future phase)

### Mobile Drawer Fix — Portal (Phase 4)
**Root cause:** Two compounding bugs were present:
1. `DocsShell.jsx` uses `fixed inset-0` which creates a stacking context. `DocsRailDrawer` rendered as a child, so its `fixed` children (`z-[80]`/`z-[90]`) were trapped within that context and clipped by `overflow-hidden` wrappers.
2. Tailwind v4 breaking change: `max-w-md` no longer resolves to `28rem` — it uses the spacing scale and computed to `16px`, collapsing the panel to ~41px wide.

**Fix:**
- `DocsRailDrawer` now uses `createPortal(…, document.body)` — drawer markup renders directly on `<body>`, escaping all stacking contexts
- `max-w-md` replaced with explicit `max-w-[28rem]` (448px) for Tailwind v4 compatibility
- `useEffect` scroll-lock: sets `document.body.style.overflow = 'hidden'` while open, restores on close
- Backdrop `z-[100]`, panel `z-[200]` — matches `WorkshopSidebar` overlay convention
- Verified with Playwright: full-width backdrop, full-width panel, nav content visible, close button works, scroll lock works, hamburger hidden on desktop

---

## Running Notes

- `DocsShell` uses `fixed inset-0` layout — all scroll happens in inner container
- `DocsPageHeader` is `sticky top-0 z-50`
- Tab system is data-driven via `buildDocHighlightTabs()` utility
- `documentationInventory` drives nav sidebar content
