# Session: Phone review — six fixes local, KOL bumped to component 0.162 / shell 0.40 / theme 0.128

**Date:** 2026-09-02
**Agent:** Grim
**Summary:** Bumped the three stale KOL packages in web + brand, then closed a seven-item phone review (six asked, one found by the user on the first fix) entirely consumer-side, every item measured under iPhone 13 WebKit emulation on the user's 5173.

## Changes Made

### Files Modified
- `apps/web/package.json` · `apps/brand/package.json` — component `^0.158.0` → `^0.162.0`, shell `^0.37.1` → `^0.40.0`, theme `0.125.0` → `0.128.0` (`/bump`, nothing else touched; no `kol-link` was active)
- `components/workshop/WorkshopChrome.jsx` — the takeover trigger is the hamburger's box (`w-9 h-9`, `right-4 md:right-6 lg:right-8`; was `right-6 w-12`), so the open X centres at (356, 34) on both surfaces · `ShellLayout` wrapped in `max-lg:[&_.kol-page]:px-0` — the shell frame's `--kol-pad-chrome-x` (24) and PageSection's `.kol-page` (section-x 20) were stacking to 44 on a phone; no rail below lg, so nothing to inset from
- `components/layout/TakeoverMenu.jsx` — `h-[100lvh]` off, `inset-0` back, plus `shadow-[0_0_0_120px_var(--kol-surface-secondary)]` — the band iOS paints under its collapsed pill is OUTSIDE the layout viewport, so `bottom:0`, `dvh` and `lvh` all stopped ~46px short; a spread halo of the panel's own surface reaches past it
- `components/layout/Navbar.jsx` — `WorkViewToggle` gets `max-sm:[&>:last-child]:hidden`: the expanding search had no bar to expand into and landed on the wordmark
- `routes/Work.jsx` — row tags `max-sm:hidden`; `ContentRow` `className="[&_.truncate]:max-w-full max-sm:[&_.items-center.justify-between]:items-start"` (title ran 483px on a 370 row because the leading stack is `items-start` and `truncate` never got a box; with tags gone the centred between-row floated the title between `Client` and `2026`)
- `routes/prints/PrintsGrid.jsx` — the Custom Commissions `SectionCta` on `.kol-page`, the fifth call site the gutter sweep missed

### Verification (scratchpad `verify.mjs`, WebKit + `devices['iPhone 13']`, 11/11)
Search `display:none` @390, `flex` @700 · 85 tags hidden @390, shown @700 · 0/26 rows overflow, `scrollWidth` 390/390 · panel top 0 → bottom 664 with the 120px halo computed · workshop label at x=24 @390, `.kol-page` keeps 48 @1280 · X centres equal @390 and @1280 · CTA body 20 → 370 · title and meta tops both 428.39.

## Current State

### Working
- Every review item above, measured and eyeballed; web and brand on one version of each KOL package

### Known Issues
- **The menu strip is still hardware-only.** Desktop makes `lvh`/`dvh`/`vh` equal, so the halo is proven present and sized, not proven to cover the pill band. Open the menu at a page's foot on the phone and look.
- `/work` row titles clip to ~9 characters at 390 — the meta column hugs and the thumb takes half the row; the DS row's geometry, not a defect introduced here.
- Four DS-owned defects were patched around, none filed (not asked): `ContentText` showcase between-row (`items-start` stack defeats `truncate`; centring floats a one-line stack), `ShellLayout` + `PageSection` double gutter below lg, `WorkViewToggle` has no seam to hide its search, `ContentRow` showcase tags overrun the meta column at 390.

## Laws this session bought
- **A descendant selector on a Tailwind class is a net, not a hook.** `[&_.justify-between]:items-start` also caught the text COLUMN (`flex-col … justify-between`), where `items-start` is horizontal — it un-stretched the row and re-broke the truncation the same edit was preserving. Qualify it (`.items-center.justify-between`) and re-measure the thing you already fixed.
- **Read the rest of the row before declaring a phantom absorbed.** I said the empty tags line was absorbed by the meta stack's height — true for height, wrong for alignment: the between-row centres, so the shorter stack moved.

## Next Steps
1. Real-iPhone look at the menu at a page's foot with the pill collapsed
2. File the four DS defects above to kol-ds-ui when he says so — each local patch names its DS home in its comment
3. The two old shelf eyeballs on `/work` (`ShelfCardTiltWrapsCard` · `TiltBentoVoiceAndDefaults`) still stand
