# SectionSplit's media frame keeps its ratio at desktop

**Filed:** 2026-10-02 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/section-split-frame-ratio-holds-at-desktop.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟠 `addressed` · synced 2026-10-03 — kol-component 0.239.0; remainder executed here 2026-10-03

## Why it went there

The home Foundry band passes `ratio="5/4"` with a 1200×960 image, and at
≥901px the frame rendered 696×314 (1600×950) — cropped, not 5:4. The frame in
`SectionSplit.jsx` has `w-full` and a fixed rung height together, so
`aspect-ratio` decides nothing. The class string is the same in component
0.162.0, so this is not from the 2026-10-02 bump; it dates from
`SectionSplitVisualWidth` (this repo's 08-31 ticket). The user reported it:
"why is this no longer its original ratio? its squished?"

## Stopgap here

`apps/web/src/components/sections/home/HomeFoundry.jsx` —
`className="min-[901px]:[&_.kol-section-split-visual]:h-auto"` on the
`SectionSplit`. The frame is 696×557 at 1600 and 546×436 at 1280; 350×280 at
390 is unchanged. The section grows with the image.

## What stays here

Once it ships: bump, delete that `className` and its comment in
`HomeFoundry.jsx`, re-measure `/` at 1600×950, 1280×800 and 390. If they rule
the other way (width follows the rung), the image gets smaller than the
stopgap shows — that is then a look to check, not a defect.

## 🟠 ADDRESSED — 2026-10-02 · kol-component@0.239.0

The frame is `w-full min-[901px]:w-auto`: beside the text the rung sets the
height and `ratio` sets the width (the 08-27 `SectionSplitMediaBounded` rule,
restored). A taller rung is how the media gets bigger.

**Remainder here:** none.

✅ **Remainder executed 2026-10-03:** component ^0.239.0 (with framework
^0.49.0 · shell ^0.61.0 · theme 0.165.0 · workshop ^0.38.0, all current) in
web and brand; the `h-auto` override and its comment deleted from
`HomeFoundry.jsx`; `height="80"` on the section, since the default rung gave
393×314 in a 744 column. Measured on the built app: 630×504 at 1600×950,
580×464 at 1440×900, 480×384 at 1280×800 — 1.25 at each — and 350×280 at 390
unchanged. Confirmation appended to the entry; the destination closes it.
