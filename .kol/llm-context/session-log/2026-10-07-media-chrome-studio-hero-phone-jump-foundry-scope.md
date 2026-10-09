# Session: media on the DS reference, studio and foundry heroes, the phone jump, foundry scope

**Date:** 2026-10-07
**Agent:** Grim (Fable 5.1 / Opus 5.5)
**Summary:** Continuation of 10-06. The moved media app was wrong on the live site (18px rows, unstyled toolbar, wrong padding) because I had carried kol-r2b2's wiring instead of reading the design system's own `apps/media`; fixed to match ui.kolkrabbi.io/apps/media edge for edge and redeployed. Then three home/foundry defects fixed consumer-side without tickets, the Workshop section switched off, and the "take kol-foundry local" idea scoped and parked.

## Changes Made

### Files Modified
- `apps/media/src/index.css` — explicit `@source` lines for kol-component · kol-framework · kol-icons · kol-shell. kol-theme's `kol-sources.css` manifest resolves nothing inside a pnpm workspace (the theme's real path is `.pnpm/…`, no siblings), so no utility used inside a DS component was generated. The DS's own `apps/media/src/index.css` says this in its first comment.
- `apps/media/src/lib/settings.js` — `COLUMN_HEIGHT = 'fill'` (the DS fixture's value; the hand-counted `calc(100dvh - 212px)` ran past the frame), `filters` forced off on load, store key `v3`. `apps/media/src/App.jsx` — `bucketLevel` and `defaults={DEFAULTS}` as the reference passes them.
- Media deployed three times; final build matches the reference at 1440 and 1920 on every edge (pad 48, browser L48 T182 R48 B76, count line at B48); at 390 the only difference is the reference's fixture-only Clear-changes control.
- `apps/web/src/routes/foundry/FoundryTypefaces.jsx` · `routes/Studio.jsx` — the split heroes take `height="min-h-[calc(100dvh-var(--kol-nav-h))]"`: the 08-31 fix cleared the fixed navbar with a margin but left the hero at `min-h-dvh`, so it ran 68px past the fold and centred its copy on the hidden box. Now 832 tall at 900, 776 at 844. `SectionHero` accepts any class as `height` — no ticket needed.
- `apps/web/src/components/sections/home/HomeAbout.jsx` — the phone jump by signup and stack: `#clip` was `h-dvh` (the one element sized to the dynamic viewport; it grew and shrank ~100px with the URL bar, moving everything below) and ScrollTrigger refreshed on every such resize. Now `h-screen` + `ScrollTrigger.config({ ignoreMobileResize: true })`. Pin still animates; scroll holds across a bar-like resize in emulation. Final proof is a phone after publish.
- `apps/web/src/routes/Home.jsx` — `HomeWorkshop` off (user); the component stays in `sections/home`.
- `.kol/llm-context/plans/2026-10-07-foundry-local-copy-scope.md` — parked scope for taking `@kolkrabbi/kol-foundry` local (36 files / 4,979 lines, this site its only consumer, styles live in kol-theme's `kol-components-foundry.css`, 12 receipts of foundry round-trips).
- Memory: `ds-reference-app-is-the-spec`, `fix-here-when-the-seam-exists`.

### Verification
- Media vs ui.kolkrabbi.io/apps/media, built app with `/api` on production: identical toolbar (filter · search · columns · rows · grid), 32px rows, frame edges equal at 1440 and 1920.
- Heroes measured at 1440 and 390 on `/foundry` and `/studio`.
- Home: no programmatic scroll and no layout shift in the signup/stack region at a fixed viewport; with a height-only resize, the About clip no longer resizes.

## Current State

### Working
- Media live on the reference's shape. All six kol-ds-ui receipts of 10-05/06 closed. Web and brand build.

### Known Issues
- Web and brand undeployed (workshop hub, home, studio/foundry heroes, the phone-jump fix, the Workshop section off, metrics redirect).
- `admin.kolkrabbi.io` still attached and redirecting — waits on kol-fxr and kol-mirror returning `media-client-0-4-1-api-on-media`.
- The user has a foundry bug list, not yet given; the local-copy question is parked.

## Laws this session bought
- **The DS's own `apps/<name>` is the spec.** Copy its `index.css` sources, defaults and frame props before measuring anything; measuring is the check, not the method. (User: "this defeats the purpose of having media own this and document it, if you have to pixel measure rather than follow instructions.")
- **Fix here when the seam exists.** A prop, class or token on this side beats a ticket; a ticket only when the package itself is wrong, and batched. (User: "every single thing I mention has to go through a ticket to ds. I'm sick of it.")
- **Say yes or no.** Asked "did u fix it yes or no?" — the answer is one word, then the caveat.

## Next Steps
1. User publishes web and brand; checks the phone jump and the two heroes on a real phone.
2. The foundry bug list — fixed here where the seam exists; the parked local-copy plan if he picks it up.
3. kol-fxr / kol-mirror returns → detach `admin.`, delete `apps/media/functions/_middleware.js`, redeploy media.
