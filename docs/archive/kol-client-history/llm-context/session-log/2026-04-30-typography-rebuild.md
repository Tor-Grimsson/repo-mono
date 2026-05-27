# Session: Typography rebuild — sans + mono + descriptors

**Date:** 2026-04-30 (continuation)
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Rebuilt the typography system end-to-end across three sub-passes:
T-1 mono split (JetBrains Mono swap, two-scale system with kol-mono-N body +
kol-helper-N label-preset), T-2 sans + prose streamline (numbered token scale,
sans family-cut tokens, atomic classes renamed, prose H1-H6 wired through
tokens, prose code/pre added), T-3 descriptor unification (6-stop opacity
hierarchy with text/bg/border/ring class families, .text-trim utility).

## Changes Made

### Files Created

- `src/styles/kol-typography-mono.css` — JetBrains Mono `@font-face` × 4
  weights (Regular/Medium/MediumItalic/SemiBold), `--kol-font-family-mono`
  repointed at JetBrains, `.kol-mono-{8,10,12,14,16,20}` (weight 400, with
  leading), `.kol-helper-{8,10,12,14,16,20}` (weight 500, line-height 1,
  letter-spaced), `@theme --font-mono` contract.
- `public/fonts/jetbrains-mono/JetBrainsMono-{Regular,Medium,MediumItalic,SemiBold}.woff2`
  — copied from `kol-editor` repo.

### Files Modified

- `src/styles/kol-typography.css` — sans rebuild:
  - Removed Right Grotesk Mono `@font-face` blocks (moved to mono file).
  - Added `--kol-font-family-sans / -narrow / -compact` family tokens.
  - Renamed size tokens: t-shirt → numbered (display 01-03, heading 01-06,
    body 01-03). Added heading-06 stop at 16px (HTML H6 anchor).
  - Renamed atomic classes: `.kol-display-* → .kol-sans-display-*`,
    `.kol-heading-* → .kol-sans-heading-*`, `.kol-text-{lg,md,sm} →
    .kol-sans-body-{01,02,03}`. Fixed 11-class family drift
    (`var(--kol-font-family-mono)` → `var(--kol-font-family-sans[-narrow|-compact])`).
  - `.kol-display-subsection` retired (orphan).
  - `.kol-prose h1-h6` wired through `--kol-text-heading-*` tokens (was
    hardcoded). H5/H6 rules added.
  - `.kol-prose code` and `.kol-prose pre` rules added — consume
    `--kol-font-family-mono` so JetBrains cascades into prose code blocks.
  - `.kol-prose-*` family strings replaced with sans-cut tokens.
  - `.kol-mono-text`, `.kol-helper-{xl..xxxxs}`, `.kol-text-{lg,md,sm}`
    class definitions retired.
  - `--kol-text-helper-*` size tokens retired (mono scale inlines values).
  - `@theme --font-mono` removed (lives in mono file now).
- `src/styles/kol-theme.css` — added `kol-typography-mono.css` to import cascade.
- `src/styles/kol-opacity.css` — added 6-stop descriptor system:
  - Tokens: `--kol-fg-{subtle, mute, meta, body, strong, emphasis}` chained
    from existing 14-stop `--kol-fg-{01..96}` primitives.
  - Classes: `text-`, `bg-`, `border-`, `ring-` × 6 stops × hover variants.
  - `text-lede` → `text-strong` (rename, 8 JSX consumers migrated).
  - `text-subtle` value shifted from 32% to 24% (zero migration; semantic
    intent "lowest visible" preserved at new floor).
- `src/styles/kol-utilities.css` — added `.text-trim` utility class
  (`text-box-trim: trim-start trim-end` + `text-box-edge: cap alphabetic`,
  Chrome 133+ / Safari 18.2+ / Firefox no-op fallback).
- `src/styles/kol-framework.css` — fixed 2 stale token refs:
  `var(--kol-text-helper-xxs)` → `10px` literal,
  `var(--kol-text-body-sm)` → `var(--kol-text-body-03)`.

### Migrations (mechanical sed across JSX/JS)

- **162 helper consumers** — t-shirt names (`xs`/`xxs`/`s`/`md`/`lg`/`xl`/`xxxs`/`xxxxs`)
  → px-literal names (`12`/`10`/`14`/`16`/`20`/`8`).
  - `kol-helper-xs` (78 refs) → `kol-helper-12`
  - `kol-helper-xxs` (73 refs) → `kol-helper-10`
  - `kol-helper-s` (5 refs) → `kol-helper-14`
  - `kol-helper-md` (2 refs), `kol-helper-lg` (1 ref doc-only) → `kol-helper-16`
  - `kol-helper-xl` (1 ref doc-only) → `kol-helper-20`
  - `kol-helper-xxxs` / `kol-helper-xxxxs` (1 ref each, doc-only) → `kol-helper-8`
- **2 `kol-mono-text`** consumers (Input.jsx, LayerInspector.jsx) → Tailwind
  `font-mono` utility (resolves through `--font-mono` → JetBrains).
- **5 inline `'Right Grotesk Mono'`** family strings → `var(--kol-font-family-mono)`.
- **5 atomic class consumers**:
  - `.kol-display-lg` (2 refs: SubPageHero, NotFound) → `.kol-sans-display-01`
  - `.kol-heading-md` (1 ref: SectionLabel) → `.kol-sans-heading-03`
  - `.kol-text-lg` (3 refs: SubPageHero, NotFound, ProsePreview) → `.kol-sans-body-01`
  - `.kol-text-sm` (1 ref: Placeholder) → `.kol-sans-body-03`
- **5 inline `var(--kol-text-helper-*)`** size-token refs → literal px values:
  - AssetPlaceholder.jsx (xs → 12px) × 2
  - Accordion.jsx (lg → 18px) × 1
  - deckStyles.js (md → 16px) × 3
- **8 `text-lede` consumers** → `text-strong`.
- **2 broken `kol-helper-uc-xs` refs** in UnitSelector.jsx → `kol-helper-12 uppercase`
  (the `-uc-` class never had a CSS definition — pre-existing tech debt fixed).

### Reference page updates

- `src/pages/Reference.jsx`:
  - Anchor `id="helpers"` → `id="mono"`. New mono section renders both
    `.kol-mono-N` and `.kol-helper-N` tables side-by-side with prose explainer
    above ("Same px size, different weight = visible hierarchy without
    size-jumps...").
  - `helperRows` rewritten — 6 stops × px-literal names, removed t-shirt
    references, fixed letter-spacing on smallest two stops (0.10em).
  - `monoRows` + `monoCols` added — documents `.kol-mono-N` body scale.
- `src/components/navigation/sidebars.config.js` — sidebar entry
  `{ id: 'helpers', label: 'Helpers' }` → `{ id: 'mono', label: 'Mono' }`.

### Documentation

- `docs/kol-migration/typography-system.md` — extended with "What landed"
  section at top covering the implemented architecture (file layout, tokens,
  classes, descriptors, completed migrations).

## Architecture decisions (locked during this session)

- **Numbered tokens, not t-shirts.** Numbers describe a fixed value position
  (01 = largest, ascending = smaller). Letters require a decoder ring.
- **Heading scale 6 stops** to align with HTML H1–H6.
- **Class names mirror token names** — same numbered convention, same role
  (display/heading/body), full role spelling (no `.kol-sans-d-01`
  abbreviations).
- **Two-scale mono system** — `.kol-mono-N` (body, weight 400, with leading) +
  `.kol-helper-N` (label, weight 500, line-height 1, tracked). Same px stops,
  weight split creates label/value visual hierarchy at the same size.
- **JetBrains Mono swap** — aligns with `kol-editor` repo. 4 weights ship
  initially; 400i (Italic) deferred until a consumer requires it.
- **Right Grotesk stays for sans.** Multiple cuts retained (base / Narrow /
  Compact). Cuts assigned per role: Narrow for display + H1, Compact for
  H2-H5, base for body.
- **Prose body weight 300, atomic body weight 400.** Different contexts —
  prose is editorial long-form, atomic is chrome / cards / descriptions.
- **6-stop opacity hierarchy** — subtle (24%) / mute (32%) / meta (48%) /
  body (64%) / strong (80%) / emphasis (100%). Same names across `text-`,
  `bg-`, `border-`, `ring-`.
- **`text-subtle` shifts 32%→24%, no rename** — semantic intent ("lowest
  visible") preserved at the new floor; 9 consumers re-render slightly
  fainter.
- **`.text-trim` opt-in only initially** — applied where consumers explicitly
  want cap-baseline trim, not blanket-applied to all text.

## Current State

### Working
- All three new style files imported in correct cascade order.
- JetBrains Mono fonts load from `public/fonts/jetbrains-mono/`.
- All atomic classes use the correct family per role.
- All prose elements consume tokens (no hardcoded pixels in heading sizes).
- Helper + mono scales coexist at the same px stops with clear role separation.
- Opacity descriptors work across `text-`, `bg-`, `border-`, `ring-`.
- `text-trim` available for opt-in use.

### Known issues / out of scope
- Reference.jsx `typeRows` data array still has hardcoded prose px values
  matching what the new tokens resolve to. Functionally consistent but could
  be refactored to read live tokens (parallel to `LiveHex` for color).
  Not blocking.
- Reference.jsx + Styleguide.jsx haven't gained "Atomic sans" tables yet
  — `.kol-sans-display-*`, `.kol-sans-heading-*`, `.kol-sans-body-*` aren't
  documented in their own table. Add later if useful.
- Italic regular mono (400i) not loaded — italics on `.kol-mono-N` use
  synthesized italic until JetBrainsMono-Italic.woff2 is provided.
- Prose `typeRows` hardcoded sample text "Another Creation" — content sweep
  item, not typography concern.

## Next Steps

1. **Verify in browser.** Click through `/`, `/styleguide`, `/reference`
   (especially the new `#mono` anchor), `/generators` + sub-labs, `/compose`,
   `/demo`. Watch for misrendered atomic classes, prose drift, helper
   regressions in dense UI.
2. **Add atomic sans tables to Reference.jsx** — `.kol-sans-display-*`,
   `.kol-sans-heading-*`, `.kol-sans-body-*` (separate from prose).
3. **Add reasoning notes** to Reference.jsx tables (per user ask) — a small
   prose paragraph explaining the design rationale for each table.
4. **Demo page color-system → typography section?** Demo currently shows
   color ramps (`/demo#kol-color-system`). A parallel `/demo#typography`
   showing all sans + mono scales side-by-side could be useful.
