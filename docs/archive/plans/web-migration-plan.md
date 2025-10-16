# Web Migration Plan

> Working document for migrating the public kolkrabbi.io site into `apps/web`.

## Route Inventory

| Route | Legacy Source | Key Sections/Components | Migration Notes |
|-------|---------------|-------------------------|-----------------|
| `/` | kolkrabbi-home (`App.jsx`, `features/*`) | Navbar, Hero, About, Features grid, Story timeline, Contact module, Foundry teaser, Blog teaser, Footer | Consolidate sections into `apps/web/src/routes/Home.jsx` using shared atoms; ensure animation hooks migrate last |
| `/work/` | kolkrabbi-staging (`pages/ProjectsHome.jsx`) | Navbar, Magnetic cursor, HomeHero (projects intro), ProjectsGrid, ProjectsList, CTAConnect, Footer | Wrap in new route component; reuse `@kol/ui` Container/SectionTitle; replicate loader overlay behaviour with Sanity-backed data |
| `/work/:slug` | kolkrabbi-staging (`pages/ProjectDetail.jsx`) | DetailHero, FeatureImage, ProjectText, ImageLayout, ProjectsList, CTAConnect, Footer | Requires GROQ detail query + PortableText renderer; ensure fallback navigation and loader overlay retained |
| `/fonts/` | kolkrabbi-fontviewer (`pages/FontViewerPage.jsx`) | Viewer hero, specimen controls, font metadata cards, pairing suggestions | Depends on forthcoming `@kol/fontviewer`; migrate after package extraction |
| `/tools/fontviewer/` | kolkrabbi-fontviewer (`pages/TypefacePost.jsx`) | Standalone font specimen experience | Route can embed `SpecimenEmbed` once `@kol/fontviewer` is ready; likely mounts foundry bundle |
| `/foundry/` | kolkrabbi-foundry (`components/sections/*`) | Hero, Carousel, Glyphs, Variable section, Download CTA, License info | Consider separate app shell remains but embed entry link in web; shared tokens already aligned |

## Proposed Directory Layout (apps/web/src)

```
apps/web/src/
  routes/
    Home.jsx
    WorkIndex.jsx
    WorkDetail.jsx
  components/
    layout/
      Navbar.jsx
      Footer.jsx
      MagneticCursor.jsx (optional)
    sections/
      home/
      work/
      shared/
  data/
    queries.js (front-end helpers wrapping @kol/content/frontend)
    transforms.js
  lib/
    sanityClient.js (current)
    fetchHelpers.js
```

- Keep JSX files colocated by route to simplify incremental migration.
- Re-export shared section components via `components/sections/index.js` for clean imports.
- Convertible utilities (formatters, hooks) live in `lib/` or `hooks/` folders per naming rules.

## Migration Milestones

1. **Scaffold Routes** — add React Router to `apps/web`, create `routes/` structure, render placeholder shells for `/`, `/work/`, `/work/:slug`.
2. **Port Home Hero & Supporting Sections** — migrate `HeroSection`, `About`, and `Features` using `@kol/ui` primitives. *(Hero, about, story, contact now live in Home route)*
3. **Bring Projects Listing Online** — wire `WorkIndex` to Sanity via `CASE_STUDY_LIST` with fallback data; port `ProjectsGrid` + `ProjectsList`. *(Initial grid live with fallback content)*
4. **Implement Project Detail View** — fetch `CASE_STUDY_DETAIL`, render detail sections, set up PortableText renderer.
5. **Enable Shared Layout** — migrate Navbar/Footer and global providers (cursor, theming) for reuse across routes.
6. **Font Viewer Integration** — once `@kol/fontviewer` is extracted, embed specimens on `/fonts/` and `/tools/fontviewer/`.
7. **Performance/QA** — audit animations, lazy-load heavy assets, add smoke tests.

## Data Layer Groundwork

- `apps/web/src/data/queries.js` wraps Sanity fetches with published/preview clients and graceful fallbacks.
- `apps/web/src/data/fallbackProjects.js` provides lightweight placeholder entries for home/work routes until live data connects.
- Helper utilities should return plain JS objects so routes stay framework-agnostic and easy to test.
- TODO: add Portable Text renderer + GROQ projections for rich modules once routes migrate.

## Environment Variables

Set these in your `.env` (Vite) file before enabling live Sanity data:
- `VITE_SANITY_PROJECT_ID` — main project id
- `VITE_SANITY_DATASET` — dataset key (e.g. `production` or `projects`)
- `VITE_SANITY_API_VERSION` — API date version, defaults to `2025-01-01`
- `VITE_SANITY_USE_CDN` — `true`/`false` for cached reads
- `VITE_SANITY_PREVIEW_TOKEN` — token for preview client (optional but required for drafts)

## Immediate Action Items

- [x] Install React Router in `apps/web` workspace (shared yarn already in place).
- [x] Create `routes/` directory and move current scaffold into `routes/Home.jsx`.
- [x] Draft shared layout component (App shell) that mounts router and imports global styles.
- [x] Identify minimal fallback data for home and work routes to unblock while Sanity credentials are pending.
- [x] Stand up `/work` index route using fallback dataset + new Sanity helpers.
- [x] Document outstanding dependencies (PortableText renderer, Sanity preview token) in this file as they arise.
- [x] Connect live Sanity data (production dataset: to8h15ed/projects)
- [x] Fix GROQ queries to match actual schema (`project` type, not `caseStudy`)
- [x] Implement PortableText renderer with full block type support
- [x] Add image galleries to detail pages
- [x] Optimize queries with image metadata (dimensions, lqip)
- [x] Test production build (passes, 353KB bundle)

## Completed Milestones

1. ✅ **Scaffold Routes** — React Router working with `/`, `/work/`, `/work/:slug`
2. ✅ **Port Home Sections** — Hero, About, Story, Contact, Foundry teaser live
3. ✅ **Projects Listing** — `/work` displays 8 real projects from Sanity
4. ✅ **Project Detail View** — PortableText rendering, hero images, galleries working
5. ✅ **Shared Layout** — Navbar, Footer, CursorProvider integrated

## Next Steps (Optional Enhancements)

1. **SEO & Meta** — Add document titles, meta tags, Open Graph images per route
2. **Image Optimization** — Use Sanity LQIP for blur placeholders, implement lazy loading
3. **Animations** — Port animation hooks from original site for hero/scroll effects
4. **Font Viewer Routes** — Add `/fonts/` once `packages/fontviewer` is ready
5. **Performance** — Code splitting, bundle analysis, lighthouse audit

