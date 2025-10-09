# Website Structure

This document describes how the `apps/web` project is organized and how the pieces fit together. The app integrates with Sanity CMS for dynamic content while maintaining a clean component architecture.

## Directory Overview

```
apps/web/
├─ package.json
├─ vite.config.js
├─ WEBSITE_STRUCTURE.md            # ← this file
├─ public/
├─ src/
│  ├─ App.jsx                      # Routes definition
│  ├─ index.css                    # Tailwind + @kol/ui theme import
│  ├─ main.jsx                     # React entry point
│  ├─ assets/                      # Static assets
│  ├─ components/
│  │  ├─ layout/                   # Navbar, Footer, SiteLayout shell
│  │  ├─ overlay/                  # CursorOverlay (visual layer)
│  │  └─ sections/                 # Page sections grouped by domain
│  │     ├─ home/
│  │     ├─ work/
│  │     ├─ fonts/
│  │     ├─ foundry/
│  │     └─ internal/
│  ├─ context/
│  │  └─ CursorContext.jsx         # Shared cursor state
│  ├─ data/
│  │  ├─ fallbackProjects.js       # Static fallback project data
│  │  ├─ projectBridge.js          # Sanity fetch functions
│  │  └─ queries.js                # GROQ queries
│  ├─ lib/
│  │  └─ sanityClient.js           # Sanity client configuration
│  └─ routes/
│     ├─ Home.jsx
│     ├─ WorkIndex.jsx
│     ├─ WorkDetail.jsx
│     ├─ Fonts.jsx
│     └─ Foundry.jsx
```

## Routing Layer
- `src/App.jsx` registers the router with `BrowserRouter` and maps paths to route components.
- `src/routes/` contains page-level components. Each one assembles semantic sections to form a full page.
- Hash navigation (e.g. `/#studio`) is handled by `SiteLayout`, which listens to `location.hash` and smooth-scrolls to matching elements.

## Layout Shell
- `src/components/layout/SiteLayout.jsx` wraps every page in `CursorProvider`, renders the shared `Navbar`/`Footer`, and includes the `CursorOverlay`.
- It resets scroll on route changes and manages smooth scrolling for hash anchors.

## Sections & Shared Components
- `src/components/sections/` groups UI blocks by context (home, work, fonts, foundry, internal). These are composable slices used by route components.
- All UI primitives (Container, Button, SectionTitle, Tag, etc.) are imported from `@kol/ui` package - single source of truth for design system.

## Shared State (Cursor)
- `src/context/CursorContext.jsx` tracks cursor position and visibility. Components opt in via `useCursor()` to show or hide the custom cursor.
- `src/components/overlay/CursorOverlay.jsx` consumes that context and renders the animated circle overlay.
- Interactive elements call `setVisible(true/false)` to toggle the overlay.

## Data Layer
- **Sanity CMS Integration**: `src/lib/sanityClient.js` configures the Sanity client with project/dataset from environment variables.
- **GROQ Queries**: `src/data/queries.js` contains structured queries for fetching content.
- **Fetch Functions**: `src/data/projectBridge.js` provides async functions to fetch projects with fallback support.
- **Fallback Data**: `src/data/fallbackProjects.js` provides static content when Sanity is unavailable or during development.
- Routes use async data fetching with fallback pattern for resilient content delivery.

## Styling & Build Configuration
- Tailwind v4 is loaded via `@import "tailwindcss";` in `index.css`.
- Design system tokens imported from `@kol/ui/theme.css` - shared across all apps in monorepo.
- `vite.config.js` enables the React plugin. Dev server defaults to port 5173.

## Page Composition Flow
1. `main.jsx` mounts `<App />` inside `StrictMode`.
2. `App.jsx` defines routes that share `SiteLayout` as the shell.
3. `SiteLayout` provides global state, renders navbar/footer/cursor overlay, and delegates main content to `<Outlet />`.
4. Route components under `src/routes/` import relevant `sections/` modules to build complete pages.
5. Section components import primitives from `@kol/ui` for consistent typography, spacing, and interactions.
6. Work-related routes fetch data from Sanity with automatic fallback to static content.

## Design System Integration
- **@kol/ui**: Shared component library and design tokens
- **@kol/content**: Sanity schemas and TypeScript types
- **@kol/fontviewer**: Font specimen viewer components

This structure keeps responsibilities clean: layout and state at the shell, navigation in routes, reusable slices in `sections`, and shared design system in `@kol/ui`. Adding new features means creating new sections and routes while reusing the established component library.
