# Session: Slide unification, /compose feature work, Phase-6 roadmap

**Date:** 2026-05-01
**Agent:** Grim (Opus 4.7, 1M)
**Summary:** Continuation of the 2026-05-01 work that started with Phase 5a/5b/5c
foundation (logged in `2026-05-01-phase-5a-foundation.md`). This session
closes the slide deck merge, lifts slides into a single palette-aware source,
ports the Layout feature to /compose, completes a multi-pass button-primary
sweep across all generators, renames /demo → /components with Atoms/Molecules
grouping, and writes the comprehensive Phase 5 + 6 + 7 roadmap.

## Changes Made

### Files Modified (post-foundation work)

**Tier 1 / brand cascade**
- `src/brand.config.js` — `name` flipped to `'Kolkrabbi Vinnustofa'` (cascades to 7 consumers: Landing H1 + logo title, Styleguide hero, usePageTitle suffix, compose state default text-layer, demoSeed type sample, combo-lab LOGOS label).

**Slide-layouts.jsx KOL rebrand**
- `combo-lab/slide-layouts.jsx` — 3× "Another Creation" → "Kolkrabbi Vinnustofa", AC badge → KV, display split "Another"/"Creation" → "Kolkrabbi"/"Vinnustofa" (font-size 220 → 200), "A/C" sign-off initials → "K/V". (Later this entire file was gutted to a re-export — see Slide unification below.)

**Compose feature gaps acknowledged + Layout ported**
- `compose/inspectors/LayoutInspector.jsx` — implemented (was Phase-2 placeholder). Dropdown of all 9 LAYOUTS (6 grid + 3 slide). Sets compose state `layoutId`. Hint message when active.
- `compose/CanvasArea.jsx` — imports `LAYOUT_COMPONENTS` (which already merges SLIDE_LAYOUT_COMPONENTS via spread). Reads `layoutId` from state. Renders `<LayoutBackdrop palette={palette} logo={LAYOUT_LOGO} />` as `absolute inset-0 pointer-events-none` backdrop. When `LayoutBackdrop` is set, auto-suppresses bg/pattern/image cover layers via `visibleLayers` filter. `Canvas bgColor` passes null + `kol-checker` inhibited so layout shows through.

**ThemeToggle hop-bare variant**
- `navigation/ThemeToggle.jsx` — added `hop-bare` variant alongside `hop`. Hop unchanged (kol-btn-primary). Hop-bare is `py-1.5 px-6 rounded kol-mono-14 bg-transparent text-emphasis transition-colors` (24px horizontal, 6px vertical, no rest bg, no hover bg). SideNav consumes hop-bare. Demo still showcases hop.

**Add layer (LayerStack) — icon-only Buttons**
- `compose/LayerStack.jsx` — 6 raw `kol-compose-add-btn` buttons → 6 `<Button variant="primary" size="sm" iconOnly={TYPE_ICONS[type]} iconSize={14} />`. Tooltips + aria-labels preserved. Compact icon grid replaces text-with-icon row.

**ComposeTopbar buttons → primary**
- `compose/ComposeTopbar.jsx` — undo/redo/save/SVG/PNG buttons flipped variant `outline` → `primary`. (5 buttons via replace_all.)

**All-buttons-to-primary sweep across generators**
- `combo-lab/ComboLab.jsx` — Randomize / Reset / Save palette → Button primary
- `social/ColorPicker.jsx` — Copy CSS / Reset → Button primary
- `type-lab/TypeControls.jsx` — Italic / Variable axis / Re-roll layout / Explode / Copy CSS / Reset → Button primary; "+ Add frame" inline link → Button primary with iconLeft="plus"
- `type-lab/TypeLab.jsx` — Save type / Save SVG to library / Download SVG → Button primary
- `social/SocialLab.jsx` — Browse/Replace (was kol-btn-accent) / Clear (was iconOnly secondary) / Save layout → Button primary
- `compositor/Compositor.jsx` — Upload photo / Clear / Save mark / Export SVG / Export PNG → Button primary
- `lobby/Lobby.jsx` — Download (per-row) / Load demo / Clear all → Button primary
- `pattern-lab/PatternLab.jsx` — Add rule / 2× Randomize → Button primary (Save was already primary)

Total: ~30 button migrations + 3 PatternLab variant flips. 0 `kol-btn` literal buttons remain in `/components/generators/`.

**Slide deck V1–V4 merge**
- New: `loaders/decks/Runway.jsx` (later renamed `SlideDeck.jsx`). 14 deduped slides. Origin: V3 (8 slides, branded V1) + V4 (14 slides, branded V2) merged per user's slide-by-slide map. Chapter labels renumbered I–XII for narrative coherence post-merge.
- Deleted: `RunwayV1.jsx`, `RunwayV2.jsx`, `RunwayV3.jsx`, `RunwayV4.jsx`.
- `App.jsx` — 4 routes → 1 (`/demo/runway-v1..v4` → `/runway` → `/slide-deck`).
- `Demo.jsx` — 4 inline figures → 1.
- Sidebar: `runway-decks` consolidated.

**Slide deck rename Runway → SlideDeck + KOL rebrand of deck content**
- `loaders/decks/Runway.jsx` → `SlideDeck.jsx`. Component `Runway` → `SlideDeck`. Page title `'Slide deck'`.
- Route `/runway` → `/slide-deck`.
- Inside the deck: 13× `<span>Another Creation</span>` → `Kolkrabbi Vinnustofa`; cover badge `AC` → `KV`; cover stack `Another / Creation` → `Kolkrabbi / Vinnustofa`; Look + End big mono `A<em>C</em>` → `K<em>V</em>`; Specimen `ANOTHER CREATION` → `KOLKRABBI VINNUSTOFA`; End URL `anothercreation · com` → `kolkrabbi · com`; Contrast + Credits `By Hand · In Burgundy Ink` → `In Red Ink`.
- Sidebar Graphics group: id `graphics-runway` → `graphics-slide-deck`, label "Runway deck" → "Slide deck".
- Styleguide PageSection: id + label + title + body all reflect "Slide deck".
- `deckStyles.js` comment: "Runway deck" → "Slide deck".

**Slide deck + combo-lab/slide-layouts UNIFIED (single source)**
The big architectural move. Slide deck (greyscale) and combo-lab/social/compose
slide layouts (palette-painted) now render from the same components.

- `loaders/decks/SlideDeck.jsx` — `SlideCover`, `SlideManifesto`, `SlideEnd` are named exports. Each accepts optional `palette` prop. Each computes its own CSS-var injection (`--slide-bg / --slide-fg / --slide-accent / --slide-fg-meta / --slide-fg-faint`) from palette role-colors. Greyscale fallback comes from CSS via `var(--grey-*)` defaults — no palette injected → original deck look.
  - Cover palette mapping: `bg=primary, fg=fgOn(primary), accent=light`
  - Manifesto: `bg=light, fg=dark, accent=accent`
  - End: `bg=dark, fg=fgOn(dark), accent=accent ?? light`
  - Dim variants computed via `color-mix(in srgb, fg X%, transparent)` for meta (55%) + faint (40%).
- `SlideManifesto` + `SlideEnd` accept `footIndex / footTotal` (optional) — render foot only when passed. Slide deck passes `footIndex={5}` / `footIndex={14}` to those two. Combo-lab/social/compose render without footIndex → no foot.
- `SlideCover` has no foot in any context (has topbar instead).
- `loaders/decks/deckStyles.js` — slide-specific rules dropped `.runway-deck-stage` scope (now plain `.s-cover / .s-manifesto / .s-end / .s-look / etc.`). Type-cut aliases (`--display`, `--tall`, `--text`, `--tight`, `--wide`, `--spatial`, `--base`) applied to BOTH `.runway-deck-stage` AND each `.s-X` standalone selector. Slide section base (position-absolute fills parent) is on the `.s-X` selectors; deck-specific section sizing (flex item, 1920×1080, position relative) stays on `.runway-deck-stage section` (higher specificity wins inside the deck).
- CSS auto-injection on module load via `<style id="kol-slide-css">` (idempotent guard). Both DeckShell + standalone consumers get styles.
- `loaders/decks/DeckShell.jsx` — dropped inline `<style>{SHARED}</style>` (CSS auto-injects). Imports `'./deckStyles'` for the side-effect.
- `combo-lab/slide-layouts.jsx` — gutted to thin re-export. ~190 lines of inline-style + AcLogo + DEFAULT_PALETTE + LogoMark + DEFAULT_LOGO + FRAME_FAMILY all DELETED.
- AcLogo dropped from slides entirely (text marks only — KV badge in cover, K<em>V</em> in End, no logo in Manifesto).
- Consumers (`combo-lab/layouts.jsx`, `social/layouts.jsx`, `compose/CanvasArea.jsx`) — zero API change. Still consume `SLIDE_LAYOUT_COMPONENTS`. Their existing `<Comp palette={...} logo={...}>` calls work — `logo` silently ignored.

**Demo → Components rename + Atoms/Molecules grouping**
- `pages/Demo.jsx` → `pages/Components.jsx`. Function `Demo` → `Components`. Page title `'Components'`.
- Routes: `/demo` → `/components`. `/demo/runway` → `/runway` → `/slide-deck`.
- `App.jsx` — import + route paths updated.
- `sidebars.config.js` — top-level `demo` group → `components`. Children regrouped:
  - **Atoms**: Control system · Button · Slider · Primitives
  - **Molecules**: Toggles · LabeledControl · Pill / Tag / Badge
  - (Organisms group skipped — no organism showcases yet)
- Cross-refs updated: `Reference.jsx` component-table links `/demo#X` → `/components#X` + body text.
- Comment cleanup: `Components.jsx` + `data/system/components.js` swapped `/demo` → `/components`.
- Sidebar dead `/site` external-link entry deleted.

**Graphics chapter lifted from Components to Styleguide**
- `Styleguide.jsx` — chapters 15–16 added after social-generators:
  - 15 — graphics · slide deck (Runway inline preview)
  - 16 — graphics · patterns (GraphicCard grid)
- `Components.jsx` — runway-decks + graphics-patterns PageSections deleted; GraphicCard helper moved to Styleguide; `Runway / Graphic / GRAPHICS` imports dropped.
- Sidebar Styleguide group gained "Graphics" subgroup with `graphics-slide-deck` + `graphics-patterns` anchors.
- Color-system PageSection (`06 — color system`) deleted from Components (outdated; user direct).

**Styleguide brand-color anchor markers**
- `organisms/Swatch.jsx` — new `anchor` boolean prop. Renders 10×10 white circle with `mix-blend-mode: difference` centered in the chip.
- `Styleguide.jsx` — `LiveSwatch` forwards `anchor`. `★` removed from name.

**Landing dead-button removal**
- `pages/Landing.jsx` — `Enter site` button (pointed at deleted `/site`) removed. Lone `Styleguide` CTA promoted to `variant="primary"`.

**Atom polish**
- `atoms/Textarea.jsx` — no native resize (was rendering double icon — native handle + custom kol icon). Now `resize: none` inline (fixed at `rows={3}`, content scrolls). Custom kol resize-corner icon stays as visual marker only. Plus controlled-vs-uncontrolled branching (`value` + `onChange` if both passed → controlled; else `defaultValue` only) — silences React's "controlled-without-onChange" warning when used in demo without state.
- `kol-components-atoms.css` — dropped obsolete `::-webkit-resizer { display: none }` rule.
- `atoms/TransparentX.jsx` — `vectorEffect="non-scaling-stroke"` keeps line at 1px regardless of container size; consumers add `overflow-hidden` for clean clipping. Demo showcase: 24px + 32px (dropped 96px).
- `00-kol/resize-corner.svg` — new icon (two parallel diagonals, stroke 2.5, currentColor, matches chevron convention).

**Generators visual cleanup**
- /compose all Inputs flipped `variant="outline"` → `variant="ghost"` per user (Figma-style — invisible at rest, reveal on hover/focus). 7 sites: 4 PositionFields X/Y/W/H + Content + ColorField hex + SwatchRow hex chip.
- `LayerStack.jsx` — 3 inline-style cleanups (`mt-2`, `mb-1.5`, `min-w-[28px]`).
- `compose/inspectors/Placeholder.jsx` — 4 inline-style margins → Tailwind utility classes.

### Comprehensive Phase 5+6+7 roadmap doc
- New: `docs/kol-migration/roadmap.md` — full plan covering remaining Phase 5 work + Phase 6 chain (compose-as-slide-editor) + Phase 7 cleanup.
  - Snapshot of what shipped this session
  - Phase 5c residual (TypeFrame + FloatingToolbar — fold into 6b)
  - Phase 5d string sweep
  - Phase 5e AcLogo / SVG / ac-images mechanical rename
  - Phase 6 chain: 6a ColorSwatch atom · 6b TypeBlock organism · 6c Canvas organism · 6d /compose text layer adopts TypeBlock · 6e Slide-as-template instantiator
  - Phase 7 cleanup (drift doc, kol-site.css, Acyr decision, _tmp/, package.json name)
  - Risks + open questions (renderer choice, slide template format, ColorSwatch tier, type/text layer merge, inspector hosting)
  - Recommended sequence: 5d → 6a → 6c → 6b → 6d → 6e → 5e → 7 (~7–8 sessions to "compose can edit slides")

### Audit doc maintenance
- `docs/kol-migration/generators-audit.md` — extended with Phase 5b execution log, Phase 5c shipped log, decisions resolved.

## Current State

### Working
- All atoms / molecules / organisms tier files clean. Components page (`/components`) shows full inventory.
- /compose layer system + Layout feature + auto-cover-suppression. ComposeTopbar primary variant. Add layer icon-only Button grid. PaletteInspector + LayerInspector fully refactored.
- Slide deck (`/slide-deck` fullscreen + Styleguide inline) renders 14 KOL-branded slides, KV mark.
- Same SlideCover/Manifesto/End components render in combo-lab (via "Slide · Cover/Manifesto/End" layouts) + social generator (via slide-* compositions) + /compose Layout backdrop. All palette-painted.
- All generators + lobby + compositor labeled buttons render as Button atoms variant primary.
- Demo → Components rename complete. Sidebar regrouped under Atoms / Molecules.
- Graphics chapter sits at end of Styleguide (15 slide deck + 16 patterns).
- ThemeToggle sidenav row uses chromeless `hop-bare` variant.
- BRAND.name = 'Kolkrabbi Vinnustofa'. Cascades hit Landing, Styleguide hero, usePageTitle, compose default text, demoSeed, combo-lab LOGOS.
- Roadmap doc shipped with Phase 5/6/7 plan.

### Verification greps post-session
- 0 `Runway` JSX consumers (only doc-comments referring to merge origin)
- 0 `kol-btn kol-btn-*` literal buttons in `/components/generators/`
- 0 toggle-button cluster (`w-full px-4 py-2 kol-helper-12 ...`) anywhere
- 0 `kol-compose-export-btn`, `kol-hex-chip`, `input-outline`, `#E04B4B` literal stroke
- 0 `Another Creation` strings in slide deck or combo-lab/slide-layouts
- 0 `_BRAND_RAMPS` in Components.jsx (color-system PageSection gone)
- AcLogo still consumed by ~17 non-slide files (stationery, social mocks, asset carousel, landing) — Phase 5e mechanical rename target.

### Known Issues
- **AC editorial residue still present** in Styleguide About/Voice/Look chapters (3 paragraphs of AC brand history), `StationeryMocks.jsx` AC ref codes + prose, `SocialMocks.jsx` `PAL.burgundy` palette, `Reference.jsx` `surface: 'burgundy'` descriptor. Phase 5d sweep target.
- **Acyr page + 5 data files** (~1500 lines combined) still AC-coded. Decision pending: keep / rewrite / delete.
- **kol-site.css** (1019 lines) deletion blocked — `organisms/PortalIndex.jsx` consumes `.site-anchor*` classes. Need PortalIndex retirement OR move classes first.
- **TypeFrame.jsx + FloatingToolbar.jsx** — large/rewrite items deferred, fold into Phase 6b TypeBlock organism extraction.
- **Drift doc `design-system-drift.md` §6** — lists `--kol-status-*` as live; deleted in Phase 4. Stale.
- **Phase 6 chain not started** — TypeBlock + Canvas + slide-as-template all open. ~7–8 sessions of work.

## Next Steps
1. **Phase 5d string sweep** — comment cleanup + per-file decisions on Styleguide / StationeryMocks editorial residue. Cross-ref `phase-out-checklist.md §5,§6`.
2. **Phase 6a — ColorSwatch atom** — lowest-friction step. Multiple consumers (TypeControls PaletteRow, ColorPicker grid, FloatingToolbar swatch, Slide picker). Foundation for TypeBlock's color picker. ½ session.
3. **Phase 6c — Canvas organism** — extract Canvas.jsx + Space-pan from GeneratorLayout into one reusable organism. /compose's CanvasArea adopts. 1 session, independent of TypeBlock.
4. **Phase 6b — TypeBlock organism** — extract TypeFrame + FloatingToolbar → unified `<TypeBlock>` (resizable + toolbar with font cut Dropdown + weight Dropdown + alignment ViewToggle + ColorSwatch). Drop axis-morph + native `<select>`. Renderer decision: HTML for editing, SVG for export (existing `buildTypeSvg.js`). 1.5–2 sessions, depends on 6a.
5. **Phase 6d** — /compose text layer adopts TypeBlock. Layer state shape → Type Lab frame shape. LayerInspector for text layers uses extracted typography group. 1 session.
6. **Phase 6e** — Slide-as-template. Picking a slide layout instantiates a layer set (bg + N text + 1 mark) instead of fixed backdrop. 1 session.
7. **Phase 5e** — AcLogo / ac-*.svg / ac-images mechanical rename. ~17 files. Independent — slot anywhere. 1 session.
8. **Phase 7** — drift doc update, kol-site.css unblock (after PortalIndex), Acyr decision. ½ session sweep.

Total to "compose can edit slides": ~7–8 sessions. Total to fully close Phase 5+6+7: ~9 sessions. Each step independently shippable + reversible. See `docs/kol-migration/roadmap.md` for the comprehensive plan.
