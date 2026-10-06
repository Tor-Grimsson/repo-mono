# Session: Navbar → takeover consolidation, fork purge, five DS round-trips

**Date:** 2026-08-12
**Agent:** Grim (Opus 5 → Fable 5)
**Summary:** The site went from four different top bars to ONE navbar + ONE full-bleed takeover menu (Rosco-shaped, GSAP-animated, shared with workshop via a bottom-right +→X that rides up the link column); three vendored forks retired to the DS versions; five tickets filed to kol-ds-ui all shipped and were consumed same-day (theme 0.34→0.40, component 0.34→0.38, framework 0.17→0.19, icons 0.12→0.15, workshop 0.20→0.21).

## Changes Made

### Files Modified
- `apps/web/src/components/layout/Navbar.jsx` — 595→~250 lines: desktop link row, mega-dropdown, work-only 8-col grid variant, dead `variant` prop, dup hamburger all gone; ONE bar (wordmark · TOOLS_ROUTES slot · menu button), 8-col grid geometry at lg+ preserved for /work's Shelf/List+search
- `apps/web/src/components/layout/TakeoverMenu.jsx` — NEW: the extracted full-bleed menu (bg-surface-secondary, big logomark, heading-02 statement + mono-16 line + Divider + instagram + flush ThemeToggle bottom-left, 7 links heading-01 bottom-right, `.kol-link-underline` w/ 4px size var); GSAP open/close (autoAlpha + stagger), Escape + html/body scroll lock
- `apps/web/src/components/workshop/WorkshopChrome.jsx` — mounts the same TakeoverMenu behind a floating bare +→X (bottom-right); on open the X rides up to top-right over 1.6s shoving each link left as it passes (quickTo pushers + ascii sparkles `* + · ˚ x` at collisions + arrival burst)
- `apps/web/src/App.jsx` — /metrics moved INSIDE SiteLayout; dead routes (prints-x, prints-xx, demo, footer-test) + lazy imports removed
- `apps/web/src/components/ui/AsciiCursor.jsx` — right-click restored (contextmenu preventDefault dropped; invader spawn kept)
- 4× ContentFilters call sites (Work, Stack, PrintsGrid, TypefaceLibraryGridWithVariables) → `@kolkrabbi/kol-component` import; vendored copy retired
- `apps/web/src/components/layout/Footer.jsx` — 151→51 lines (unmounted default export cut; FooterSimple survives)
- Home/Studio/InDevelopmentSection/WorkshopFeatures → DS `FeaturesCardSection`/`CardFeatureItem`; fork defaults moved to NEW `apps/web/src/data/featureCards.js` (`useFeatureCards()`, theme-variant CDN URLs)
- `apps/web/src/components/sections/home/HomeAbout.jsx` — eyebrow: font-normal + tracking-[0.04em]
- `apps/web/src/main.jsx` — DEV-only favicon recolor (glyph → #FF0000, square stays dark)
- `apps/web/src/styles/animations.css` — nav-link-underline lifted out (now kol-theme's `.kol-link-underline`)
- `apps/web/src/routes/Metrics.jsx` — pt-20 to clear the fixed bar
- Workshop overview card grids (WorkshopIntroduction, EmbedOverview) — auto-fill floor 17.5→22rem (3-up)
- Both `package.json`s — final stack: theme **0.40.0** (exact) · component **^0.38.0** · framework **^0.19.0** · icons **^0.15.0** · workshop **^0.21.0**

### Tickets filed → kol-ds-ui (ALL 🟢 same-day, all consumed)
- `NavLinkUnderline` → theme 0.35.0 (`.kol-link-underline` + focus-visible + reduced-motion + size var) — swapped in, local CSS deleted
- `ShellNavItemInk` → theme 0.39.0 (rail rest ink fg-80, active +wt300; rails split root-caused: `--own` at 500) — bumped
- `HeadingTwoNarrow` → theme 0.40.0 (heading-02 = sans-narrow; ramp: 01+02 narrow, 03–05 compact) — bumped
- `CardFeatureHoverZoom` → theme 0.40.0 + component 0.38.0 (visual 1.03 zoom, border-clock synced) — adopted across all 4 fork consumers
- (also consumed: heading-04 line-height 100→120% fix, ridden in 0.35.0)

### Retired to _tmp/
- `_tmp/2026-08-12-chrome-fork-retirement/` — vendored ContentFilters, unmounted Footer, brand's dead PortalFooter, FeaturesCardSection + CardFeatureItem fork pair
- `_tmp/2026-08-12-dead-routes-retired/` — FooterTest, PrintsExperimental (376L), PrintsArchitectural (747L), demo/ (incl. InstagramFeed), MagnetLines + TextPressureHero (orphans), navbar workshop-submenu disclosure JSX, nav-link-underline.css shelf copy

### Elsewhere
- kol-ds-ui `docs/visual-reference/` — NEW vault section (INDEX.md + conventions): `theme-toggle.html` + pane, every shipped ThemeToggle variation (31/pane, both themes, live state relay), playwright-verified; deprecated-alias section removed on user order; front-door INDEX linked
- Memory: `read-ds-source-before-workarounds` (the ThemeToggle `-ml` hack vs `variant="flush"`)

## Current State

### Working
- ONE navigation system site-wide: navbar (hamburger) + workshop (floating +→X) open the same takeover; right-click works; /metrics on brand chrome; dead routes gone; build 3/3 green throughout
- Lobby: outbox carries 4 🟢 receipts from today, nothing owed; kol-ds-ui queue has our 0 open tickets

### Known Issues
- FeaturesCardSection deltas unviewed: header heading-02→03 (DS spec), per-card reveal stagger gone — if missed, ticket `reveal` support upstream
- Workshop content well max-width (`ShellLayout.jsx:68`) — user floated removing it for overviews; NOT filed, needs his call
- TOOLS_ROUTES only carries /work — stack/prints/foundry still render their own toggle in-page (duplicate-control question open)
- Deeper web surfaces (foundry, dashboards, store) unwalked since 0.32; now on 0.38 — user validates live
- 7 dashboard icon names still resolve nowhere (pre-existing, `Metrics.jsx` + `DashboardComponents.jsx`) — map or file when asked

## Next Steps
1. User eyeballs live: takeover (both entries), X ride + sparkles, hero eyebrow, feature-card zoom, rails ink
2. Everything-audit (user ordered 2026-08-12, in progress this session)
3. Deploy: all of today rides the next push
