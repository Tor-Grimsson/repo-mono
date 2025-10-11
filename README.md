# kolkrabbi.io Monorepo (Yarn + React/Vite/Tailwind4)

**Rules**
- Apps use **React + Vite + Tailwind 4** with **.jsx** (no TS).
- Only **Sanity Studio + schemas** use **TypeScript**.
- Yarn workspaces (npm only when required).

## Workspaces
- `apps/web` — marketing site (React/Vite/TW4, .jsx)
- `apps/foundry` — foundry app (React/Vite/TW4, .jsx)
- `apps/studio-cms1` — Sanity Studio instance 1 (TS)
- `apps/studio-cms2` — Sanity Studio instance 2 (TS)
- `packages/ui` — shared UI (JS, .jsx) + **`theme.css` (master Tailwind tokens)**
- `packages/content` — Sanity schemas + GROQ (TS)
- `packages/fontviewer` — font viewer components (JS)

## Component Architecture (apps/web)

```
src/components/
  ui/              # Reusable UI primitives
    Button.jsx
    SectionHeader.jsx
    SectionLabel.jsx
  
  animation/       # GSAP animation wrappers
    AnimatedTitle.jsx
    AnimatedTitleStory.jsx
    VideoPreview.jsx
  
  media/           # Image & video handlers
    SanityImage.jsx
    ClippedImage.jsx
    InteractiveImage.jsx
    RoundedCorners.jsx
  
  loaders/         # Loading states
    ColorLoader.jsx
    SpinnerLoader.jsx
  
  layout/          # Shell components
    Navbar.jsx
    Footer.jsx
    SiteLayout.jsx
    LoaderOverlay.jsx
  
  overlay/         # Cursor effects
    CursorOverlay.jsx
    CursorTrail.jsx
    CursorTrailColor.jsx
  
  react-bits/      # Third-party ports
    MagnetLines.jsx
    TextPressure.jsx
  
  sections/        # Page sections by domain
    home/
    work/
    work-detail/
    blog/
    cta/
    foundry/
    foundry-atoms/
    stack-detail/
```

See **docs/RULES_STRUCTURE.md** for the single source of truth.


## Multiple Studios
- You now have **apps/studio-cms1** and **apps/studio-cms2**.
- Both import schemas from **@kol/content** but can point to **different Sanity projects/datasets** via their own `.env` files.
- Run them independently:
  - `yarn workspace studio-cms1 run dev`
  - `yarn workspace studio-cms2 run dev`
