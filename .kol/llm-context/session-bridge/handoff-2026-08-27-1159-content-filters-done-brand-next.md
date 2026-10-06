# Handoff — 2026-08-27 11:59

## Goal of the current arc
Every content-filter surface on the site on the DS content-card family with nothing local. Web is done (`/stack` · `/prints` · typefaces ×2 · `/work` LIST/GRID/shelf). Brand has three surfaces left. The foundry fork is gone.

## Last actions taken (causal trail, newest first)
- `SectionCtaConnectVariant` returned (kol-component 0.105.0) — bumped; **swap DECLINED by the user ("nah just leave it")**. `ConnectCta.jsx` renamed **`SectionCtaWrapper.jsx`** (Home · Stack · Studio · Work import it). The `connect` variant exists in the DS unused by this site
- `SectionBackgroundProp` filed + returned (component 0.103.0): every section takes `background`; `ConnectCta` forwards it, `/work` CTA `background="none"`, `HomeSignup` `background="bg-fg-absolute-16"`. Bumped; no `className` surfaces left on sections
- After the log: the retired `WorkCard`'s animation restored locally — `ShelfEnter` (perspective + rotateX/translateY settle staggered by index, the old card's values verbatim) wraps each shelf card; `TiltCard variant="grounded"` is the card's media (grid + shelf); `ConnectCta` (Home's) is the last section of the page, with no surface (`.work-cta > section { background-color: transparent }` — `SectionCta` paints `bg-auto` with no prop; a `background={false}`-style seam is a DS ask). Tilt is shelf-only (`tilt` flag on `WorkContentCard`). All of it belongs to the DS shelf/work card — NOT filed yet, file with the `/work` cleanup. `pb-[100vh]` still sits between the last shelf and the CTA — the user hasn't seen it
- `/work` shelf: `renderCard` put back rendering `WorkContentCard` (= `<ContentCard variant="work">` + content + `WORK_TITLE_FACE`), the caption rule `.work-shelf p.kol-helper-12` restored — both because the user's server still runs kol-content 0.10.x whose shelf default is the old `WorkCard`. Local wrapper renamed `WorkCard` → `WorkContentCard` after it read as the retired package card
- `WorkCardAndShelf` returned (component 0.102.3 · content 0.11.0): the DS shelf now renders `ContentCard work` on the ladder with eyebrow captions; bumped
- Tools + Systems merged into one shelf; Typefaces shelf shows all five faces (three placeholders); a 5th placeholder card at the head of Tools & Systems (fromLeft) so the parallax has track; `pb-[100vh]` under the last shelf (parallax moves by scroll delta — needs room to leave the viewport)
- `TagTertiary` returned (theme 0.70.0 · component 0.102.2): rows on `<Tag variant="tertiary">`
- `CollectionItemMinWidth` returned (0.102.1) — the "row 3586px wide" defect; verified by live DOM that the user's server hadn't loaded it
- `WorkListingRowsAndFilters` returned (0.100.0 · theme 0.69.0): list swapped onto `ContentCollection` + `ContentRow work`, `WorkListItem` gone
- Foundry: fork → `kol-foundry` in two tickets (0.7.0 nine files; 0.8.0 three specimen sections + cards), plus reveal text, clamp+bearings (my misread corrected), slug-page defects; `/dev/demo` retired; hero on split inverse; In Development placeholders; licence CTA
- Typeface library: TEMP comparison ruled → DS pair, `TypefaceLibraryItem` retired

## Current state / open decision points
- **Server-stale trap:** three times today a "broken" report was the dev server not reloading a bumped package. Always read the live DOM (`.kol-collection-item` has `min-w-0`? shelf card has `.kol-card`?) before touching code
- **`/work` cleanup owed after the user's restart + eyeball:** drop `renderCard`, `className="work-shelf"`, the `.work-shelf` rule; `WORK_TITLE_FACE` can lose `truncate` (the card truncates itself since 0.102.3). Keep `titleClass={WORK_TITLE_FACE}` on the shelf
- **Brand, not on the family:** `/icons/:set` (hand `ul grid` of `li` tiles, grouped), `/slide-deck` (`MediaRow`, deprecated), `/library` (DS `MediaLibrary` — its internal MediaCard/MediaRow swap belongs to `ContentSetRetirement` in the DS)
- Parallax on a 4-card shelf: Embla stops at the track end; a placeholder 5th card is the chosen fix; a looping track would need `ParallaxShelf` to expose Embla `loop` (not filed)
- `PrintsGridGsap.jsx` unrouted, still imports `PrintGridCard`

## Next intended action
1. On the user's word: verify `/work` in the live DOM after his restart, then the `/work` cleanup above
2. Brand `/icons/:set` local-first: `ContentFilters` (group filter + search) → `ContentCollection` → a DS card/row for an icon, with one DS comparison item first, like the typefaces pass; then `/slide-deck` (`ContentRow`); `/library` = nudge on `ContentSetRetirement`

## Working memory not yet in AGENT-CONTEXT
- The user's rulings on how to work, all from today, all after anger: read the literal words; a value he ruled never moves unless he names it; two readings → ask ONE question, never pick; "opacity" = ink only, type stays the DS's; "truncate title with more than 1 line" = ONE line (twice); "cement this" = done, move on — not memory; a question gets its answer first, binary if binary; a status ask gets the table of surfaces, nothing about deploy state; never say anything about git/Vercel/undeployed
- Ticket discipline: anything I can't do through a prop gets done locally by rule (className seam + two-class CSS) AND written into a ticket the same turn — "goes in the ticket" without a file is the failure that blew up the afternoon
- `ContentFilters` groups: `className`/`wrapClassName` seams exist since 0.100.0; ≤6 values stack by default
- The DS turns tickets in minutes and closes them narrower or wider than filed — read the RETURNED block, then measure on the bump
