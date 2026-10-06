# Handoff — 2026-08-27 05:51

## Goal of the current arc
Every website section on ONE DS family and every content-filter surface on the content-card system — with nothing local left behind. Stack is done; Prints is one bump away; the foundry typeface library is mid-comparison; `/work` is scoped and waiting on two rulings. Nothing is deployed.

## Last actions taken (causal trail, newest first)
- Foundry typeface library: the DS `ContentRow typeface` (LIST) / `ContentCard typeface` (GRID) sits as the **first item** inside the filter as a TEMP comparison against the local `TypefaceLibraryItem`. Row: title + year on `text-auto` (ink only — the user said *opacity, nothing else*; type is the DS's), alphabet via the new `TypefaceAlphabet.jsx` (the local card's measured clipper, extracted). Card: specimen `Ðð` filling the canvas. Not ruled yet.
- Typeface bar swapped: LIST/GRID in the layout strip (`kol-helper-14`), `Kind` (was Classification) `stack: true`, DS `mutuallyExclusiveFilters=['name']`; `titleIcon` is a prop — set only by `FoundryOtherTypefaces` on the slug pages, none on `/foundry` ("foundry is home, typefaces is slug")
- `/prints` on the set: `ContentFilters` (Category `stack: true` · Year, LIST/GRID) → `ContentCollection cols={{ md: 2, lg: 4 }}` → `ContentCard print` (image only, `selected`, rect via `onClick`) / `ContentRow article` with Stack's exact slot voices. `PrintGridCard` import gone from the route
- Two local `ui.css` rules added (row thumb = fixed 120 square the image fills; no thumb zoom on rows) and filed as `ContentRowsAndPrintCard` — **it RETURNED (kol-theme 0.63.0 · kol-component 0.94.0) and is NOT executed**
- `/stack` completed: hero on `SectionHero` (90vh, veil, wash, Featured `ContentCard article hero` in `foot`), bar with LIST/GRID + Type/Tags groups, `ContentCollection cols={{ md: 3, xl: 4 }}`, article cards/rows, `SectionNewsletter` on `bg-fg-absolute-16`, all local rules removed as their tickets returned
- Earlier the same arc: SectionSet + ~25 follow-up tickets filed and executed same day (height ladder, theme inverse, foot/veil, carousel media, reveal seams, eyebrow voice, mono body, cols, mediaClip, frames, zoom rungs, title gap…); 31 hardcoded caps → `--kol-container-max`; 19 elder type classes → numbered roles; `kol-chess` dep removed from web; page gutters off the section mains

## Current state / open decision points
- **Unexecuted return — do first:** bump `kol-theme 0.63.0` + `kol-component 0.94.0` (both apps), delete the two rules at the tail of `apps/web/src/styles/ui.css` (`.kol-row .kol-row-thumb …` and `.kol-row.group:hover .kol-media-zoom …`), verify `/prints` grid flips on `selected`. Renames are aliased — `kicker`→`eyebrow`, `kickerClass`→`eyebrowClass`, section `label`→`eyebrow`, `kol-card-kicker`→`kol-eyebrow` — do them when the user says
- **Typeface card ruling pending:** the user expects the DS `typeface` card/row to be wrong; the comparison is live at the top of `/foundry`'s library in both layouts. Once ruled: swap the cards (`ContentCollection cols={{ md: 2, lg: 4 }}`, `ContentCard typeface` / `ContentRow typeface` with `TypefaceAlphabet` in `footer`), keep `TypefaceVariablePreview` (the slider rows when a face is selected — an inspector, not a card), retire `TypefaceLibraryItem.jsx` → `_tmp/`, remove the TEMP block, then ONE ticket with the final values
- **`/work` needs two rulings before touching:** does the shelf view stay on the navbar toggle or become a third strip option (LIST · GRID · SHELF); does `ContentRow work` carry the hover preview the current `WorkListItem` rows have. Scope table is in the 2026-08-27 session log
- `PrintsGridGsap.jsx` (the GSAP prints route) still uses `PrintGridCard` — untouched, not asked
- Brand `/library` on the reconciled `MediaLibrary` — never eyeballed. Studio split hero `theme="inverse"` — approved on screen

## Next intended action
1. Execute `ContentRowsAndPrintCard` (above), build, square the receipt + ledger (`lobby --lint`)
2. Ask nothing; wait for the typeface ruling; then the swap as described

## Working memory not yet in AGENT-CONTEXT
- **How to work with him (ruled, repeatedly, 08-27):** a question gets its answer and nothing else — no context, no "plus", no status; act only on an instruction; when unsure, ask ONE question instead of doing; "opacity" means ink, not type; "first one" means one; local first, then a single ticket with approved values; never write a "law"; never bump packages this repo doesn't import (kol-chess); the dev server must be restarted after a bump before judging anything
- The lobby watch was a session Monitor (`b2magzdpj`, returns on this repo's receipts only) — it's gone with the session; re-arm with the same one-loop script if wanted (it's in the 08-26 history)
- The DS turns tickets around in minutes; read the receipt's RETURNED block before bumping — the DS sometimes closes a ticket narrower than filed (SectionSplitHeight came back split-only; the widening became `SectionHeightLadder`)
- `ContentCollection` list form ignores `cols`; `stack: true` on a filter group = narrow; `slotClass`/`slotStyle`/`itemClassName` are the reveal seams; `theme="inverse"` = one `data-theme` on the section root
- The DS's own `ContentCard` root IS a `.group` (the 0.90.2 return corrected my ticket) — hover rules can key on it
