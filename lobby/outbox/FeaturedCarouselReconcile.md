# FeaturedCarouselReconcile — 458-line divergence, one survivor

**Filed:** 2026-08-15 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/FeaturedCarouselReconcile.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-15 — component 0.41.0 + framework 0.20.1

## Why it went there

Local FeaturedCarousel (231L, Studio + FoundryTypefaces) vs the kol-component
organism (259L): 458 diff lines. Reconciled superset ships package-side;
local CarouselNavigation folds in the same pass.

## What stays here

- **On ship: adopt** — both consumers swap, local pair retires.

## Return — 🟢 2026-08-15

Shipped in **`@kolkrabbi/kol-component@0.41.0`** + **`@kolkrabbi/kol-framework@0.20.1`**
(both registry-verified).

**Read both: it was never a fork, it was two engines.** Yours runs framer-motion
`AnimatePresence` over an index; the package runs embla. That settles the drag
question the brief raised — yours has **no drag at all** — so canon is the embla
engine, and with it the `{ media }` descriptor, `OverlayGlassPanel` and the
autoplay progress ring.

**Five things yours had, now in the package:** `children` (the static overlay
that does not travel with the slides), `fullWidth`, `rounded`,
`showTitle`/`showDescription`/`showCta` (global + per-item), and `subtitle`.
Nav placement answered as **`navPosition='header'`**.

**`CarouselNavigation` is superseded rather than folded** — and reading it
explained the whole fork. It existed because it wanted real chevron icons, while
the package's buttons were the literal text characters `‹` and `›` in a design
system that ships a chevron set. That markup was hand-typed at three sites here,
so it became **`EmblaNav`**, exported: import it if you build your own embla
stage rather than re-typing the buttons.

**What did NOT cross, and why it matters to your adoption:** the foundry title
treatment. The size ramp keyed on the literal strings `'Málrómur'` and
`'Tröllatunga'` and the per-typeface inline `fontFamily`/`fontStyle` are app
data, not component behaviour — re-express them through `renderTitle` or
per-item `titleClassName`/`fontFamily` in your own slide data. Also dropped: the
hidden block preloading every slide image (a performance defect — embla plus
`loading="eager"` on the visible slide covers the real need).

**Remainder here:** bump `@kolkrabbi/kol-component` to `^0.41.0` and
`@kolkrabbi/kol-framework` to `^0.20.1`, port `routes/Studio.jsx` +
`routes/foundry/FoundryTypefaces.jsx` onto the package component (map
`item.image`/`item.video` → `item.media: { src, kind, poster }`, and the foundry
title via `renderTitle`), then retire
`components/sections/shared/FeaturedCarousel.jsx` and
`components/ui/CarouselNavigation.jsx`.

✅ **Remainder executed 2026-08-15 same session:** kol-component ^0.43.0 +
kol-framework ^0.20.1 bumped; Studio + FoundryTypefaces on the package organism
(media descriptors, `navPosition="header"` + `showHeader={false}` reproducing the
old no-visible-nav layout, foundry title ramp via app-side `renderTitle`, preload
block dropped per the defect ruling); both local files retired to
`_tmp/2026-08-15-anatomy-adoption/`, all 3 CarouselNavigation call sites resolved,
components-list doc row removed. Build 3/3 green; embla drag on both surfaces owed
a live eyeball.
