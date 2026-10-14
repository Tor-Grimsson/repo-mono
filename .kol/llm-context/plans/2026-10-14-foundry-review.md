# Foundry review — the user's walk, 2026-10-14

**State:** DONE 2026-10-14 (/kol-goal "get it done all of it"). The audit table is § 0; items 1–5 are fixed and re-measured at 390 + 1440. Open: the `SpecimenSectionHeader` wrapping to 175px on a phone (table row), and `TypefaceVariablePreview`'s 960px slider box in the library grid.

## Done this session (before "just make notes")

- `/foundry` In Development cards: placeholder plate gone, text-only tiles (`InDevelopmentSection.jsx`).
- `/foundry/licensing` FAQ: answers in `kol-mono-16`; the FAQ column is one card (`innerClassName` seam); hero clears the navbar.
- `/foundry/typefaces/*`: the shared hero clears the navbar (`TypefacePage.jsx`).

## Notes

1. **Font preview card — same padding on desktop and mobile.** `/foundry/typefaces/malromur`, the Font Preview cards (`components/foundry/FontPreviewSection.jsx` / `TypefaceVariablePreview.jsx`). On a phone the card's inner padding is the desktop value, so the preview line truncates to "Rennimjú…". Wants a mobile rung.
2. **Variable Font card — padding.** `/foundry/typefaces/malromur`, the Variable Font card (`TypefaceVariablePreview.jsx`): ~48px inner padding on all sides (AXES label and the `wght` chip sit far inside the frame, the slider row too), and a tall empty band above and below the "Variable" word. The user: "what's with the padding here?" Wants the card's padding reviewed against the Font Preview cards above it.
3. **Font Pairings cards show no pairing.** `/foundry/typefaces/malromur`, Font Pairings (`PairingCard` / `PairingsList` in `components/foundry/`): each card is two typeface NAMES (set in their own face), a role label (BODY TEXT · HEADINGS…) and a mono blurb. No sample text in the paired fonts — the heading face is never shown as a heading, the body face never as body copy. The user: "why would font pairing not show the fonts in question?"
4. **Font Preview controls row — the sliders are far too wide.** Same cards as item 1 (`FontPreviewSection.jsx`): Size · Leading · Spacing each stretch across a third of a 1790px card, with the number boxes (64 · 100 · 0) ~96px wide. The user: "why are all the inputs so wide? do they need to be?" — they don't; a slider for a 12–200 range needs no 320px track. Wants the row compact (fixed-width sliders + narrow number fields), not a flex third each.
5. **Styles section on a phone — "a bit weird".** `TypefaceStyleSection.jsx`: a sticky inverted preview panel beside a grid of style tiles, `flex-col md:flex-row`. Below `md` the panel stacks over the grid, the preview lines (AaBbCc / 01234567 / {(!@#$?&)}) are sized for a desktop panel, and every style tile is a fixed 120px tall with the name bottom-left and the value top-right — on a 390 screen that is a column of tall, mostly empty boxes under a panel that no longer sticks to anything. No screenshot; measure at 390 before touching.

6. **Breakpoint audit — the real goal.** Items 1–5 are symptoms of one thing: the foundry copy's
   components were laid out for a desktop and given a `md:` here and there. Audit every file in
   `components/foundry/` for its breakpoints — which rungs exist (`sm` · `md` · `lg`), what changes at
   each, what has NO rung and should (padding, control widths, fixed heights, sticky, font sizes) — and
   put the result in one table before fixing anything. Measure at 390 · 768 · 1024 · 1440.


## 0. Breakpoint audit — the table (measured 2026-10-14 on the built app, `/foundry/typefaces/malromur`)

No horizontal overflow at any width. Page gutter 20 · 32 · 48 · 48. Hero clears the navbar (mt 68) at every width.

| File · element | 390 | 768 | 1024 | 1440 | Rungs today | Verdict |
|---|---|---|---|---|---|---|
| `FontPreviewSection` card pad | 24 | 24 | 24 | 24 | none (`p-6`) | **needs** 16 below md (item 1) |
| `FontPreviewSection` sliders | Size track **8px**, Leading/Spacing hidden | 3 × 130–153 wide, track **0** — dead | 3 × 217, track 64–88 | 3 × 356, track 203–226 | `hidden md:flex` + `flex-1` thirds | **needs** fixed-width sliders that wrap; the row is unusable at 768 (item 4) |
| `FontPreviewSection` sample 96px | 302px box, "Rennimjú…" | ok | ok | ok | none | the clamp is the ruling; a smaller first rung on a phone is the user's call |
| `VariableFontSection` plate | pad 24 · h 253 (30vh) · word 80 | pad 40 · h 540 (60vh) · word 144 | pad 40 · h 480 | pad 40 · h 540 | `p-6 md:p-10` + inline vh + JS isDesktop | **needs** content-sized height; pad on the card ladder (item 2) |
| `PairingCard` sides | 2 × 128 in a row, title 20, pad 16 | 2 × 240, title 28, pad 20 | 2 × 320, title 36 | 2 × 320, title 36 | `w-[128/240/320]`, `text-[20/28/36]`, `p-4/5/6` | widths are a ladder but the card shows no specimen (item 3); stack below md |
| `TypefaceStyleSection` panel | 350×280 pad 24, lines 60, **sticky top 96 over the list** | 443×355 pad 48, lines 96 | 584×467 pad 48, lines 128 | 854×683 pad 48, lines 128 | `md:w-[65%]`, `p-6 md:p-12`, `text-6xl md:text-8xl lg:text-[128px]` | **needs** `md:sticky` (static on a phone) (item 5) |
| `TypefaceStyleSection` tiles | 8 × 350×**120** = 1044 tall column | 8 × 237×120 | 8 × 312×120 | 8 × 458×120 | inline `height: 120` | **needs** a phone height (item 5) |
| `SpecimenSectionHeader` | 175 tall (icon+label, then two dropdowns wrap) | ok | ok | ok | `md:gap-4` | open — a phone header that wraps to three rows; not in the five |
| `TypefaceAlphabet` | 48px, 300 wide, no overflow | ok | ok | ok | none | fine |
| `TypefacePage` hero text | 48 → 144 ladder | | | | `sm/md/lg` | fine (content hidden anyway) |
| `GlyphMetricsGrid` | | | | | full `md/lg` ladder | fine — the one file built responsive |
| `TypefaceVariablePreview` (library grid only) | | | | | none, `w-[960px]` sliders box | **fixed 2026-10-14** — `p-4 md:p-6`, wrapping header row, `w-56` sliders |
| `SpecimenSectionHeader` (follow-up) | | | | | | **fixed 2026-10-14** — the dropdown group takes the row below md, two dropdowns share it |
| `/foundry` (index) | no overflow, sections 776 · 1145 · 810 · 435 | — | — | no overflow, hero 832 | `FoundryTypefaces` + library grid | fine at both ends; 768 / 1024 not measured |
| `/foundry/licensing` | FAQ card 350 wide, pad 24, inset 20; no overflow | — | — | FAQ card 768, pad 32, mono-16 answers; no overflow | `SectionHero` + `SectionFaq` | fine |

## Plan (executed 2026-10-14 — see the playbook `playbook/2026-10-14-foundry-breakpoints.md`)

0. **Breakpoint audit first** (item 6) — one table: file · element · rungs today · what is fixed-size
   or desktop-only · the rung it needs. Items 1–5 become rows in it; anything else found joins them.
   The fixes below then run off the table, not off the screenshots.

All five are in the local foundry copy (`apps/web/src/components/foundry/`), so every fix is made here (ARCHITECTURE §9), no tickets. Tailwind on the elements; no new CSS.

1. **Preview card padding** (item 1) — one responsive rung on the card's pad in `FontPreviewSection.jsx`: the DS card ladder, 16 below `md`, the current value above.
2. **Preview controls** (item 4) — same file: the controls row stops being three flex thirds. Fixed-width slider tracks, narrow number fields, the row wraps below `md` (Size on the first line, Leading + Spacing on the second, or hidden on a phone — ask).
3. **Variable Font card** (item 2) — `TypefaceVariablePreview.jsx`: the inner pad onto the same ladder as the preview cards; the word's band gets a height that follows the font size instead of a fixed stage.
4. **Pairing cards** (item 3) — `PairingCard.jsx`: each side renders a SPECIMEN in its role — a heading line in the heading face, two lines of body in the body face — with the name as the label, not the content. Copy for the specimens is the user's call.
5. **Styles on a phone** (item 5) — `TypefaceStyleSection.jsx`: measure at 390 first; likely the panel loses `sticky`, the preview lines take a phone size, the tiles drop to a single row height (name and value on one line).

Order: 0 (the audit, report-only) → the user reads the table → 1 → 4 → 2 → 3 → 5 → whatever else the table surfaced.
