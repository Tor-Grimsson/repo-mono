# Session: Foundry hero to top, navbar fade rework, stack hero recolor + theme overlay

**Date:** 2026-07-29
**Agent:** Grim (Fable 5)
**Summary:** Typeface-page hero now spans to viewport top; navbar bg+links fade as one scroll-positioned unit; /stack hero swapped to the colorful mannequin master (new CDN set) under a theme-conditional fg-inverse overlay.

## Changes Made

### Files Modified
- `routes/foundry/components/TypefacePage.jsx` — hero wrapper `mt-14 md:mt-16` removed; `FullBleedHero` gets `height="h-[560px] md:h-[768px]"` (offset added to size, content below unmoved)
- `components/layout/Navbar.jsx` — bg now always painted; fade moved to whole-header `opacity`, position-driven: solid within first 100vh, fades out past it (300ms, no timer/delay); hover or open mobile menu reveals anywhere. Note: deep-page scroll-up slide now brings in a faded bar — reveal down there is hover-only
- `foundry-system/sections/FontPreviewSection.jsx` — engine `SPECIMEN_SAMPLE_TEXT` import dropped; full Icelandic specimen passage ("Rennimjúkt eðal flauel…") vendored as local `SAMPLE_TEXT`
- `foundry-system/sections/TypefaceLibraryGridWithVariables.jsx` — All Typefaces header icon `library` → `book-open`
- `routes/Stack.jsx` — hero src/srcSet → `mood-05` CDN set (400–1600w, dead 2560 dropped); `objectPosition="center"`
- `components/sections/stack-detail/StackHero.jsx` — hardcoded `#151518` gradient overlay replaced with `.stack-hero-overlay` class
- `styles/ui.css` — new `.stack-hero-overlay` (@layer components): fg-inverse color-mix with `--overlay-mix` 32% light / 80% dark, dark selectors mirror the theme law (explicit + system-dark media block, house pattern). Placed here per standing rule: `index.css` is for imports, component rules live in `styles/`
- `routes/foundry/FoundryTypefaces.jsx` — net zero (carousel edit made in error, reverted same session)
- `index.css` — `@utility full-bleed` repaired: dead `var(--spacing-4/5/6)` refs (vars died with the 07-15 elder-theme quarantine; Tailwind v4 has no numbered spacing vars) → literal `1/1.25/1.5rem`, mirroring kol-theme `.breakpoint-padding`. Was a silent no-op breaking the bleed on all 5 consumer sites (stack + home heroes, workshop embeds); prod predated the breakage

### Assets
- CDN upload: `asset-library/cms/stack/mood/mood-05-{400,800,1200,1600}.jpg` — colorful mannequin master (1600×2000 portrait, 4:5); ladder tops at 1600 (master width). The old `mood-01` set is the same shot with darkness baked into the JPEG.

## Current State

### Working
- Typeface hero runs under the nav to the top; carousel on /foundry/typefaces untouched
- Navbar: plate + text one fading unit, scroll-position-driven; verified live by user
- /stack hero renders colorful image in both modes; overlay rungs verified live (32/80 user-tuned)

### Known Issues
- `bg-surface-primary/80`-style opacity modifiers are silent no-ops (surface classes are hand-authored kol-theme CSS, not Tailwind colors) — latent at `PrintDetailOverlay.jsx:284` and `StickyNavCard.jsx:27`
- On touch at page top the navbar hamburger is invisible-but-tappable until first scroll (no hover on touch)

## Next Steps
1. Sweep the two latent no-op opacity-modifier classes onto ladder utilities
2. Rule on deep-page navbar reveal (hover-only today) if it bothers in use
