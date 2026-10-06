---
title: Component Scan Coverage — Reusable-Component Sweep for the DS Lobby
type: audit
status: active
updated: 2026-07-03
description: Which folders were swept for reusable components (staged to kol-design-system/lobby) and which were NOT — a coverage map to catch misses.
tags:
  - project/monorepo
  - domain/design-system
sources:
  - apps/web/src
  - apps/brand/src
related:
  - "[[migration-status-board|migration status board]]"
  - "[[02-dead-code|dead-code ledger]]"
---

# Component Scan Coverage — Reusable-Component Sweep

## Scope

A 2026-07-03 sweep of **kol-monorepo** for reusable UI components to promote into
the design system. Candidates were staged as briefs into `kol-design-system/lobby/`
(53 specs — see that repo's `lobby/INDEX.md`). Each candidate was cross-checked
against **both** DS packages (`@kol/component` + `@kol/ui`) so nothing already
shipped got re-staged.

Only two apps carry promotable UI: **`apps/web`** and **`apps/brand`**. `apps/studio`
is Sanity Studio (schema/TS, no UI), `apps/video` has **zero `.jsx`**, and `packages/*`
**is** the DS (destination, not source).

## Method

Fan-out read-only scans by surface: web primitives · effects · overlays · brand
layout/styleguide · type-specimen · color-specimen · app shell/chrome · foundry
type-specimen · CMS (work + stack) · loader · work-index chrome. Each classified
every component as **candidate / app-specific / already-in-DS** and recorded exact
tokens + coupling to drop.

## Coverage — SWEPT

| Folder | Swept | Outcome |
|---|---|---|
| `web/src/components/ui` | ✅ | AsciiCursor staged; rest app/decor |
| `web/src/components/errors` | ✅ | ErrorBoundary staged |
| `web/src/components/animation` | ✅ | AnimatedTitle, TiltCard staged |
| `web/src/components/media` | ✅ | HlsVideo, InteractiveImage staged |
| `web/src/components/react-bits` | ✅ | TextPressure staged |
| `web/src/components/cards` | ✅ | BentoCard staged |
| `web/src/components/loaders` | ✅ | ColorLoader staged |
| `web/src/components/fontviewer` | ✅ | GlyphMetricsGrid staged |
| `web/src/components/shell` | ✅ | full shell set (6) staged |
| `web/src/components/layout` | ✅ | Footer, LoaderOverlay, RouteLoader, WorkViewToggle (inline in Navbar) staged; SiteLayout app-welded |
| `web/src/components/overlay` | ✅ | app-specific (PrintDetailOverlay/TagModeOverlay) — none staged |
| `web/src/components/work` | ✅ | WorkCard, WorkListItem, ImageLightbox staged |
| `web/src/components/prose` + `portable-text` | ✅ | ArticleHeader, PortableTextRenderer, VideoBlock, ImageBlock, ArticleCard family staged; dup maps flagged |
| `web/src/components/sections` | ✅ | StackHero (stack-detail) + blog card dupes staged |
| `web/src/components/workshop` | ✅ | RotaryDial, DocsToc staged; rest are DS **demo harnesses** (render existing DS) |
| `web/src/routes/foundry` | ✅ | 8 type-specimen sections staged (atoms already in `@kol/ui/foundry`) |
| `web/src/routes/Work.jsx` + `WorkDetail.jsx` | ✅ | ParallaxShelf, GalleryCarousel (inline) staged |
| `web/src/routes/Stack*.jsx` | ✅ | CMS scan (renderer/hero/blocks/cards) |
| `web/src/routes/prints` | ✅ | 5 store/sale staged: PriceDisplay, SpecList, DiagonalMarqueeRiver, ScrollDriftGallery, ProductDetailLayout (`PrintBuyButton`/`PrintGridCard` already in `@kol/ui`; ad-hoc PayPal buttons → consolidate into `PrintBuyButton`, not re-lobbied) |
| `brand/src/components` (+ molecules, framework, styleguide, sections) | ✅ | PageSection, FeatureSplit, AssetGrid, type + color specimen kits, FullscreenGallery staged |
| `brand/src/editor/` (60 jsx) | ✅ | swept 2026-07-03 — **12 editor-chrome staged** (Canvas stage, SelectionOverlay, EditorShell + panel registry, TabsRow [DS had no Tabs], SpectrumControls [HSV picker family — DS had no picker], SwatchControls, ColorField, SwatchRow, ToolButton+ShapeDropdown, CurveOverlay, AlignmentGrid, Placeholder) + EditorButton earlier; 47 store-welded; EditorIcon kept as local `Icon` fork |
| `web` **layouts + section organisms** (Home/Work/Stack/prints/foundry/studio) | ✅ | taxonomy pass 2026-07-03 — **10 staged** (FullBleedHero, StudioHero, OverlayGlassPanel [4× dedupe], FeaturedCarousel [→ converge into `@kol/ui`], FramedMediaBand [5× dedupe], FeaturesCardSection + CardFeatureItem [dedupes 3 feature grids], CtaGlobal, NewsletterBand, ChapterNavigation). Marketing PAGE compositions themselves stay welded (no seam) |

## NOT swept — gaps to close

Ranked by likely payoff. This is the "did you miss any" list.

Prints, brand/editor, and the site layout/section-organism taxonomy are all **SWEPT** as of 2026-07-03 (see table). What remains is low-payoff or excluded:

1. **`web/src/routes/Metrics.jsx`** — welded 4-tab dashboard; composes `@kol/ui/dashboards` cards (in-DS). No new seam — verify only.
2. **`web/src/routes/demo/` (MagnetLines, InstagramFeed)** + `FooterTest.jsx` — demo/test pages, low value.
3. **`brand/src/pages/` (11)** — brand page assemblies; app-welded compositions, low payoff.
4. **`web/src/routes/collections/`** — ⚠️ OUTDATED/dead per user (2026-07-03); excluded, do not sweep.

### Taxonomy whitespace (genuine gaps — nothing to stage because it doesn't exist on the site)
- **No editorial stat/number band** (numbers only via `@kol/ui/dashboards`).
- **No logo / client-partner cloud** anywhere.
- **No alternating multi-row feature-band** organism (only the single split `FeatureSplit` + the grid `FeaturesCardSection`).

### Cleanup found along the way (delete/dedupe, don't promote)
Verified importer-checked list in [[02-dead-code|dead-code ledger]]. Summary:
- **8 dead files** (0 functional importers): `StackBlog`, `StackDetail`, chain-dead `ArticleLayout`, `StudioHero`, `ChapterNavigation`, `CtaWork`, `CtaFoundry`, `CardFeatures`.
- **2 live duplicates** — migrate then delete: `WorkshopFeatures` → `FeaturesCardSection`; `StudioProcessCard` → `FeatureSplit` (`imagePosition:'right'`).
- DS-side stale dupes: `StickyNavCard`, `SourcesList`×2, dup PortableText map; ad-hoc PayPal buttons → `PrintBuyButton`.

## Excluded by design (not gaps)

- **`apps/video`** — zero `.jsx`; nothing to scan.
- **`apps/studio`** — Sanity Studio (schema/TS), no promotable UI.
- **`packages/*`** — the DS itself (`@kol/component`, `@kol/ui`, `@kol/theme`, `@kol/loader`, `fontviewer`, `table`, `content`) — the destination, not a source.
- **`web/src/routes/workshop/*`** — DS showcase/demo harnesses that render already-shipped DS components.
- **`brand/src/_staging`** — icon staging (icons, already `@kol/loader` territory).

## Outcome

**80 specs staged** to `kol-design-system/lobby/` across web primitives, effects,
overlays, brand layout, type + color specimen kits, app shell, foundry, CMS (work +
stack), loader, work-index chrome, the **print store** (price/spec/PDP + GSAP marquee +
scroll-drift gallery), the **brand editor chrome** (canvas stage, HSV picker family,
tabs, color fields, editor shell + panel registry — 12), and the **site layout / section-
organism taxonomy** (heroes, glass panel, feature grid, CTA + newsletter bands — 10).
All two apps (`apps/web` + `apps/brand`) now swept; only low-payoff route wrappers and
excluded/dead surfaces remain.
