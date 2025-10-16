# apps/web Site Structure

## Quick Route Map

```
apps/web/src/App.jsx
└── SiteLayout (Navbar · Footer · CursorOverlay)
    ├── /            → routes/Home.jsx
    ├── /work        → routes/Work.jsx
    ├── /work/:slug  → routes/WorkDetail.jsx
    ├── /stack       → routes/Stack.jsx
    ├── /stack/:slug → routes/StackDetail.jsx
    ├── /foundry     → routes/Foundry.jsx
    ├── /styleguide/*→ routes/styleguide/*
    └── /demo        → routes/Demo.jsx
```

> `App.jsx` wraps everything in `BrowserRouter` and manages the landing loader overlay via session storage. All public routes render inside `SiteLayout`, which hides the Navbar/Footer when visiting the internal styleguide.

## Entry & Layout
- **Loader overlay**: `LoaderOverlay` plays once per session (`sessionStorage.hasSeenLoader`), only on `/`.
- **SiteLayout**: Injects `Navbar`, `Footer`, and `CursorOverlay` while providing pointer context via `CursorProvider`.
- **Theming**: Navigation and footer consume shared `@kol/ui` atoms; page-level surfaces rely on `.bg-auto`/`.text-auto` pairings so light/dark mode switches seamlessly.

## Primary Routes
- **Home (`/`)**
  - Sections: `HeroSection`, `About`, `Features`, `Story`, `WorkCard`, `CtaHome`, `CmsCard`.
  - Hero runs video intro via the `onVideoStart` callback set by `App`.
  - First fold enforces white background for brand storytelling.
- **Work (`/work`)**
  - Fetches project list with `getAllProjects()`.
  - Layout: `WorkHeroSection` (pagePadding), `ProjectsGrid`, `ProjectsList`, `CtaWork`.
  - Uses inline style tokens (`var(--surface-primary)`) for quick theming until utilities land.
- **WorkDetail (`/work/:slug`)**
  - Fetches project detail + full project index concurrently (`getProjectBySlug`, `getAllProjects`).
  - Renders `DetailHero`, optional `FeatureImage`, rich text (`ProjectText` + `PortableRichText`), gallery, related projects, and CTA.
  - Redirects to `/work` when slug not found; scrolls to top on slug change.
- **Stack (`/stack`)**
  - Showcases latest blog posts via `getLatestBlogPosts(limit=20)`.
  - Layout: `StackHero`, divider, hero article card, search + tag filtering, grid of ArticleCard variants, `CtaHome`.
  - Maintains local filter state (search input + `TagFilterDropdown`).
- **StackDetail (`/stack/:slug`)**
  - (See `routes/StackDetail.jsx`) Renders individual blog article using `PortableRichText` and related content modules.
- **Foundry (`/foundry`)**
  - Focused on TG Málrómur specimen: sections for hero, imagery, style panels, variable font controls, glyph grid, download/license, carousel, pairings.
  - Maintains local state for variable font weight + preview sizes; relies heavily on shared `foundryCard` recipes.
- **Styleguide (`/styleguide/*`)**
  - Developer-facing reference loaded inside a chrome-less layout (Navbar/Footer hidden).
  - Routes defined under `routes/styleguide/` for typography, colors, components, animations, etc.
- **Demo (`/demo`)**
  - Experimental page for prototyping (safe to hide from navigation).

## Shared Components & Context
- **Navbar/Footer**: Imported from `apps/web/src/components/layout/`; consume shared tokens and include theme toggle + navigation menu.
- **CursorOverlay**: Global cursor system layered above content and controlled via `CursorContext`.
- **CTA modules**: `CtaHome`, `CtaWork`, `CtaFoundry` reuse shared button atoms to maintain consistent call-to-action styling.

## Data & Utilities
- Sanity queries live in `apps/web/src/lib/queries.js` and proxy to `@kol/content`.
- Route-level hooks (`useEffect`) guard against state updates on unmounted components by tracking a `cancelled` flag.
- All fetched records hydrate shared preview components (e.g. `ProjectsGrid`, `ArticleCardHero`) so design and content stay in sync with the design system.

## Extending the Site
1. Add new routes under `apps/web/src/routes/` and wire them into `AppRoutes` inside `App.jsx`.
2. Compose sections using shared atoms (`@kol/ui`) and contextual utilities (`.surface-inverse`, `.text-auto`, `.bg-auto`).
3. For Sanity-backed pages, create GROQ helpers in `lib/queries.js`, then document the flow in a session log + update the status board if scope changes.
