# kol-generator-acstrip — Agent Context

Current project state + operational reference. Updated at the end of each
significant session.

For chronological detail see `session-log/`. For load-bearing decisions see
`ARCHITECTURE.md`. For the transition history (extraction from `kol-ac`) see
`../kol-migration/migration-notes.md`. For decision history / alternatives
considered see `../history.md`. For speculative future work see `../plan.md`.

**Last updated:** 2026-05-27 — see
`session-log/2026-05-27-phase-3-icon-button-reconcile.md`
(Phase 3 prep: two primitive collisions pre-settled in `@kol/ui` ahead of the
`@kol/component` split. **Icon API unified** onto canonical — recursive
`./svg/**/*.svg` glob + `00-kol/` overlay, dead `responsive` prop dropped; zero
behavior change, 29 sites untouched. **Button casing "flip" was a non-issue** —
web already defaulted `uppercase=false`, only 1 consumer (not 23); removed the
`uppercase` prop entirely (always `normal-case` per ARCHITECTURE §2) + fixed the
`PrintDetailOverlay` Inquire button. Still CSS-coupled, deferred to Phase 3
proper: Button class-prefix `btn-*`→`kol-btn-*` + variant `control`→`ghost`/
`quiet` — breaks every web button without the CSS. `status` token group audited
→ fold-up verdict (web-only, real chess/prose use, canonical lacks it). Killed a
dead 1857-line orphan `apps/web/.../workshop/chess/chess.css`. All code in
`~/dev/projects/kol-monorepo`. Next: `@kol/component` package + Badge collision,
gated on team readiness.)
Earlier: `session-log/2026-05-27-phase-2-shared-surface-base.md`
(Phase 2 partial: shared neutral surface base `@kol/theme/kol-base-tokens.css`
consumed by BOTH web + brand — page bg/fg can't drift. Accent/fonts stay
per-app by design. opacity-hex/status/palette/container reconcile deferred.
web + brand build green.)
Earlier: `session-log/2026-05-27-monorepo-merge-brand-pnpm-theme.md`
(Began the `brand.kolkrabbi.io` integration into the website monorepo
`~/dev/projects/kol-monorepo`. Phases 0/0.5/1 done: brand (whole repo
incl. editor) landed as `apps/brand` and deployed live — unlisted,
noindex; monorepo migrated **yarn→pnpm** (pnpm@10.33.0, single React via
`pnpm.overrides`, isolated linker + `public-hoist-pattern` for Sanity);
**`@kol/theme`** extracted as the first shared token package, consumed by
brand. web/studio/brand all build + deploy green on pnpm. Phase 2 (web
onto `@kol/theme`) **deferred** — it's a real live-site merge (two
hand-written class layers + dark-mode mechanism diff). opacity-hex stays
as-is (NOT a `fg` swap — opaque vs transparent). Full plan + execution
record: `../monorepo-merge/migration-plan.md`.)
Earlier: `session-log/2026-05-05-library-page-bucket-browser.md`
(New `/library` page reads the kol-media R2 bucket via the
public `admin.kolkrabbi.io/api/list` endpoint. Route added in
`App.jsx`, sidebar entry in `sidebars.config.js` (icon
`library`), page at `src/pages/Library.jsx`. Folder-prefix
filter, image/video thumbnails, click-to-copy public URL,
"Open admin" deep-link in header. First consumer of the
kol-media bucket from kolkrabbi. ARCHITECTURE.md §1 patched —
was describing `/generators/*` folder structure that no longer
exists; corrected to "unified editor at `/editor/:mode` plus
portal pages.")
Earlier: `session-log/2026-05-04-landing-hero-and-sidenav-collapse.md`
(Landing hero image swapped to `/images/kol-style/tt-01/05.jpg`
(was `/images/kol-photoshoot/thg-01.jpg`). SideNav auto-collapse
scoped to /editor: dropped `COLLAPSE_KEY` localStorage entirely;
initial state and route-driven effect both follow `isEditor`.
/editor → collapsed, anywhere else → expanded; manual chevron
toggle is session-only and resets on navigation. Stale
`kol-sidenav-collapsed` keys in users' localStorage are now
ignored (no-op dead key).)
Earlier today: `session-log/2026-05-04-icons-pages-cleanup.md`
(Both icon pages rewritten. `/icons` is now loader-backed only —
`import.meta.glob` over `loaders/icons/svg/**/*.svg`, sectioned by
folder, ContentFilters wrap with search + folder chips + grid/list
view-mode toggle. New `ListRow` component for list view. Tile cell
scales with SIZE (`cell = size + 16`, no min-floor) and grid column
min scales too — small sizes actually look small now. SIZE goes
16→64. Body has a primary `kol-btn-primary` button linking to
/variants. `/icons/variants` walks loader strokes (00-kol overlay
rule), name-matches pool solids, skips rows without a pair, lays
them out as compare cards (220px auto-fill: solid · stroke · grid
+ uppercase label strip + name/folder footer) — visually adapted
from `_tmp/icons` Claude design without importing its CSS. Dropped
mark-for-delete, export, reset, hide-partial, localStorage
decisions. ContentFilters wrap on this side too. Keyline grid:
`KEYLINE_BG` constant became `KeylineBg({ bgLight })` component;
opacity 0.7→1; magenta keylines (`#CA3ABC`) on light BG, yellow
(`#F2D24B`) on dark BG; cyan diagonals (`#0A8DA4`) on both. Tweaks
panel from Claude design intentionally not included — would
require icons authored as JSX path data instead of static SVG.)
Earlier today: `session-log/2026-05-04-init-skills-overhaul.md`
(Promoted three new upstream packages under `kol-system/packages/`:
**kol-editor** — full editor surface (134 src files + 98-ttf
Right Grotesk set + 11 doc files); type-lab unit (`TypeBlock` +
`TypeBlockToolbar` + `data/typography-cuts.js` + opentype font
CSS + ttfs) lives here as a coherent group. **kol-styleguide** —
23 brand-reference presentation components (AssetCard, Swatch,
Ramp, MoodTile, etc.); TypeBlock removed (moved to kol-editor).
**kol-client** — 29-file client-template payload (pages +
brand placeholder set + Reference data + minimal asset
skeleton), replacing the deprecated `kol-client/kol-client/`
standalone repo. Synced drift to existing packages: kol-component
(10→12 atoms with ColorSwatch + TransparentX, 12→17 molecules
with ContentFilters / MenuItem / Modal / Popover /
SegmentedToggle; Button / Input / Slider / Stepper / Textarea /
Dropdown / LabeledControl / SectionLabel / ViewToggle DIFFs
overwritten upstream), kol-loader (29 `00-kol/` icons + Icon.jsx
two-pass overlay), kol-theme (4 CSS files). Skill updates:
**init-scaffold** — atom 10→12, molecule 12→17 counts; added
`pnpm add @floating-ui/react` step (kol-component Popover/MenuItem
require it). **init-client** — full rewrite; sources from
kol-system/packages/{kol-framework, kol-styleguide, kol-brand,
kol-loader, kol-client}; targets the 4-layer src layout; marketing-
site path removed. **init-editor** — NEW skill; prereq is
init-scaffold + init-client; copies kol-editor's src + fonts +
docs; installs colord / opentype.js / wawoff2 (runtime) +
vite-plugin-svgr (dev); patches App.jsx + sidebars.config.js.
This repo unchanged — all writes were under
`kol-system/packages/` and `~/.claude/skills/`. Skipped from
upstream sync: TypeBlockToolbar (moved to kol-editor instead),
MenuPopover (dead code, no consumers anywhere).)
Earlier today: `session-log/2026-05-04-punchlist-and-bugs-clear.md`
(Cleared the 11-item punch list + U1/U2 unresolved bugs from
`2026-05-04-unresolved-and-punchlist.md`. **U1 cursor**: removed
the redundant inline cursor on the stage div (the wrapper's
inherits down via the `cursor` CSS property), added
`e.currentTarget.blur()` on toolbar tool clicks so a focused
button can't suppress the cursor refresh. **U2 coord**:
`clientToVirtual` now reads scale fresh from
`stageRef.getBoundingClientRect()` per call instead of a
ResizeObserver-cached `scaleRef` that went stale on window resize
(RO does not fire on CSS-transform changes). **Item 1 (text
align)**: confirmed already shipped in `LayerInspector.TextFields`;
user surfaced a different issue — text inputs invisible at rest —
fixed by giving `.kol-control--ghost` rest a subtle
`fg-absolute-04` bg. **Items 4+5 (swatch consolidation)**:
`compose/SwatchRow.jsx` rewritten onto the DS `ColorSwatch`
atom; `palette/PaletteControls.jsx` dropped its near-duplicate
local copy and imports the compose one; `SwatchStack` /
`FramedSwatch` left intact per their off-limits header. **Items
6+7 (shape system)**: new `compose/shape-math.js` (regular
polygon, star, triangle vertex helpers); 4 new shape kinds
(triangle, line, polygon 3-12 sides, star 3-12 points + 0.2-0.9
inner ratio) with render branches in `LayerRenderer` and export
branches in `build.js`; 4 new tool icons (`tool-{triangle,line,
polygon,star}.svg`); `tools.jsx` + `ToolPalette` dropdown
extended; `LayerInspector` gained a Kind dropdown + per-kind
controls (Sides slider for polygon, Points + Inner ratio sliders
for star); `AddLayerButton` "Shape" entry now expands to a
`MenuDropdownNest` of all 7 shape kinds with their tool icons.
**Item 2 (marquee)**: `CanvasArea` got a `mode: 'marquee'` drag
branch with AABB intersection against every positioned layer;
new `selectMany(ids, { additive })` action; tiny drags fall
through as click-deselect; Shift adds. **Item 3 (multi-align)**:
new `compose/AlignmentPanel.jsx` (6 buttons in 6-col grid)
mounted in `InspectorRail` multi-layer branch; new `alignSelected
(axis, mode)` action computes common bbox and writes new x/y; 6
new editor-scope alignment icons (`align-{h,v}-{start,center,
end}.svg`). **Item 10 (snapping)**: new `compose/snap.js` with
`computeSnapTargets` + `findSnap` (6 vpx threshold, canvas edges
+ center + every non-active layer's edges/centers); wired into
`mode === 'move'` only (resize-snap deferred); magenta guide
lines render across the canvas while snap is engaged. **Item 9
(eyedropper)**: tightened the catch block to surface real errors
in dev via `console.warn` (skipping `AbortError` cancellations);
disabled-with-tooltip on unsupported browsers was already in
place. **Item 11 (capitalization)**: new `compose/labels.js`
single-sources `TYPE_LABELS`, `SHAPE_KIND_LABELS`, `labelForLayer`
(verbose, e.g. `Shape · Rectangle`), and `rowLabelForLayer`
(compact); `LayerStack` row labels now route through it (drops
the `<group>` lowercase + the `layer.content || 'Text'` bug —
field is `text`); `InspectorRail` imports the same. **Item 8
(icon audit)**: new `docs/editor/reference/icons.md` enumerates
all 26 editor-scope SVGs across tool/cursor/layer/align
categories, plus the DS Icon references found in editor code.)
Earlier today: `session-log/2026-05-04-icons-page-and-staging-merge.md`
(new `/icons` review page comparing live registry against staging
stroke set. `solid/` folder dropped from staging (340 files, ~334
byte-identical with live — pure noise). `stroke/` + `stroke-remake/`
merged into one categorized tree under `_staging/icons/stroke/
<category>/` — 493 SVGs across 19 categories: `actions, brand/{kol,ac},
commerce, communication, cursor, editing, files, layout, media,
navigation, rack/{cables,caps,color,curves,filters,generators,logic,
nav,patterns,sequencer,shapes-3d,transport,waves}, shapes, stats,
status, system, time, tools, typography, user`. Origin manifest at
`src/_staging/icons/_origin.json` maps each path → `native` (170) or
`remake` (323). Folds: search → actions; theme + tui → system;
user-auth → user; another-creation + kol → brand; brushes +
design-tools + editor-tools + swap → tools; misc distributed
per-file. Native-wins on collisions (~17 remake dupes dropped).
`Icons.jsx` mounts `ContentFilters` with browse / compare view modes,
BG / SIZE / STROKE-WIDTH render-control toolbar, amber dot on remake
tiles, click-to-zoom portaled overlay (192px preview + metadata +
raw SVG markup, Esc / backdrop dismisses). **Known unresolved issue:**
the `remake` set was generated by mechanically flipping `fill="X"`
→ `fill="none" stroke="X"`, producing **boundary strokes** (silhouette
of the filled glyph) rather than **trace strokes** (polylines through
space). Wrong for checks, arrows, +/−/×, chevrons, math, clock hands.
Right for rect, circle, folder, file, eye-outline, lock body, bell.
No replacement path without third-party attribution (every stroke-native
library is MIT/ISC) — user rejected attribution, so trace icons need
hand-redraw. Auto-flipped trace glyphs remain in place pending triage.)
Earlier today: `session-log/2026-05-04-svg-fix-and-label-trim.md`
(small follow-ups after the punchlist checkpoint. Fixed a React
warning where `ShapeLayer` rect/ellipse SVGs used CSS `calc()` in
SVG width/height attributes (not supported); both branches now
declare a viewBox sized to `layer.w × layer.h` with plain numeric
coords + `preserveAspectRatio="none"` to keep stretch behavior.
Trimmed "Edit in Pattern mode" → "Pattern mode" and "Edit in Type
mode" → "Type mode" (overflowing column). Punch list grew to 11:
item 10 = snapping (drag/resize snaps to canvas edges/center +
other layers, Figma-style guides); item 11 = capitalization
inconsistency throughout (layer rows show `text`/`pattern`
lowercase next to `Canvas`/`Group` capitalised; needs a
convention + audit). U1 (cursor) and U2 (coords) still
UNRESOLVED.)
Earlier today: `session-log/2026-05-04-unresolved-and-punchlist.md`
(checkpoint after a frustrating toolbar/cursor session. Two
**UNRESOLVED** bugs carried forward: **U1** — tool-cursor doesn't
reflect tool selection from toolbar clicks (keyboard shortcuts
work, click path doesn't, even though both call same setTool); root
cause not identified after multiple attempts (data-tool attr +
CSS, removed Tooltip wrapper, switched to system cursors, hoisted
cursor to outer wrapper, made PanViewport skip default cursor).
**U2** — drawn-object position doesn't match cursor coordinate;
not investigated meaningfully. Files touched for U1:
`CanvasArea.jsx`, `shell/Canvas.jsx`, `shell/panels/ToolPalette.jsx`,
`styles/kol-editor.css`. New punch list raised: **(1)** text
alignment options on text layer; **(2)** marquee selection on
canvas; **(3)** alignment of multi-selection; **(4)** Palette vs
Swatches swatch style mismatch; **(5)** color panel swatches
diverge across Pattern/Type/Palette modes (3+ swatch
implementations); **(6)** shape layer insertion defaults to Logo
instead of presenting a shape-kind picker; **(7)** shape tool only
has rect+ellipse, more primitives needed; **(8)** icon audit
across editor; **(9)** eyedropper tool doesn't work; **(10)**
snapping (drag/resize snaps to canvas edges/center + other layers,
Figma-style alignment guides); **(11)** capitalization
inconsistency throughout — layer rows show `text`/`pattern`
lowercase next to `Canvas`/`Group` capitalised; pick a convention,
audit inspector titles, toolbar labels, library item names,
dropdown options. Earlier this
session also shipped: ColorField inline hex input + 6th palette
slot (Background); HSL/RGB sliders horizontal layout; layer-row
color swatch removed (always show type icon); PopoverPanel marked
data-editor-keep-selection so color popover doesn't deselect on
swatch click.)
Earlier today: `session-log/2026-05-04-editor-icons-toolpalette.md`
(editor now owns its own icon loader and toolbar layout. New
`src/editor/icons/EditorIcon.jsx` mirrors the DS `Icon.jsx` pattern
(`import.meta.glob` cache, markup injection) but scoped to
`src/editor/icons/svg/`. Flat naming with by-use prefixes:
`tool-{cursor,text,rect,ellipse,pattern}` (24×24 currentColor stroke,
T glyph + 3×3 grid authored fresh), `cursor-{rect,ellipse,pattern,
text}` (32×32 with white outer-stroke + dark inner for visibility on
any canvas color), `layer-{background,pattern,photo,shape,text,
group}` (24×24 row icons). New `canvas.header` registry slot — added
to `state/panels.js` `SLOTS`; rendered in `EditorShell` above the
main canvas via a new `kol-editor-canvas-column` flex wrapper
(`.kol-editor-canvas` is no longer the grid-area cell directly,
flex-1 inside the column). Compose registry shifts ToolPalette from
`left.header` → `canvas.header`. ToolPalette full rewrite: layout
**Select · Text · [Shape ▾] · Pattern**; Shape dropdown is a
`usePopover`+`PopoverPanel` whose trigger reflects the last-picked
variant (default rect) and clicking the trigger arms the variant
AND opens the popover. `state/tools.jsx::TOOL_META.icon` values
renamed from DS names (`cursor`/`file-text`/`square`/`circle`/
`ptrn-checker`) to editor-scoped (`tool-*`). CanvasArea cursor swap:
imports four cursor SVGs via `?url`, applies `cursor: url(...) X Y,
fallback` per tool — hot-spot top-left (3,3) for shape/pattern,
center (16,16) for text, crosshair/text fallback. LayerStack
`TYPE_ICONS` map renamed to `layer-*` and three lookup sites swapped
from `<Icon>` to `<EditorIcon>` (other Icon usages — lock/eye/plus/
maximize/trash — stay on DS as generic UI controls). DS icons not
touched; cross-context callers unaffected.)
Earlier today: `session-log/2026-05-04-docs-editor-reconciliation.md`
(no code change. Reconciled `docs/editor/reference/` prose to today's
shipped state. `product.md` "Mode switching" expanded from two
pathways to three — added **Round-trip** describing the
`boundLayerId` binding from "Edit in Pattern/Type mode" (one-way
live edits, Linked badge, Done/Unlink, palette-refs-lost trade-off,
auto-unbind cases). `product.md` autosave list updated to include
the SwatchStack paint pair. `frame-state.md` autosave shape note
expanded from `{ aspect, layers, palette, canvasFill }` to the full
current shape including `canvas: { fill, fillOpacity }`, `palette:
{ poolId, modeId, colors, locks }`, and `paint: { fill, stroke,
active }`. Both files keep `verified: 2026-05-04` (prose now
actually matches reality). `tools.md`/`tree.md`/`ui.md` unchanged
today — keymap / file structure / registry diagram all already
current. Inventory remains empty. **2026-05-04 inventory-clear
marathon arc complete: paint-loop close → library validation →
cleanup batch → popover unification → edit-in-mode round-trip →
bgOn derivation → docs reconciliation.**)
Earlier today: `session-log/2026-05-04-bgon-derivation.md`
(closed item 9, the last inventory item. Pattern mode's `bgOn` was
keeping its previous session value when `loadPattern` received a
no-bg item — only ever flipped on, never off. With the new "Edit in
Pattern mode" round-trip, this could silently write a bg back to a
source layer that didn't have one. Fix: `if (item.bg != null)
setBgOn(true)` → `if (item.bg !== undefined) setBgOn(item.bg !=
null)`. Now `bgOn` derives from `bg` on every load, matching the
library's `patternFromSpec` rule. Compose layers still store `bgOn`
as a separate boolean — wider drop-and-derive refactor not needed
for the round-trip to work correctly. **All 13 items from the
2026-05-04 deferred-items inventory are closed. Editor is at a
clean checkpoint.**)
Earlier today: `session-log/2026-05-04-edit-in-mode-roundtrip.md`
(closed items 2 + 4. Item 4 turned out already done — every mode
(Compose/Palette/Pattern/Type) wraps `<EditorShell registry={...}>`,
the deferred-items inventory was inaccurate. Item 2 needed real
work: live one-way binding from Pattern/Type lab modes back to the
source compose layer. **Pattern mode**: added `boundLayerId` state
in `modes/pattern/state.jsx`; `loadPattern(item, { boundLayerId })`
opts in; `useEffect` watches every pattern field and fires
`compose.updateLayer(boundLayerId, ...)` when bound (with
`skipNextSyncRef` to suppress the first run after load — values
came from the layer itself). Auto-clears binding if the bound layer
is deleted in compose. **Type mode**: added `boundLayerId` state in
`modes/type/state.jsx`; `loadType` overrides the new frame's id to
match the compose layer.id so binding lookup is the natural
frame.id check; `updateFrame` intercepts and mirrors only
text-layer-relevant fields (`TEXT_LAYER_FIELDS` allowlist) into
compose. **LayerInspector** "Edit in mode" buttons resolve palette
refs to literal hex on entry (lab modes operate on hex; verbatim
refs would break the renderers) and pass `{ boundLayerId: layer.id
}`. **PatternControls + TypeControlsPanel** show a "Linked → Compose
layer" badge with Done (unbind + navigate to /editor/compose) and
Unlink (unbind in place) when bound. Trade-offs: one-way only
(compose-side edits during binding don't propagate to lab); palette
refs lost on entry; opening a different library item unbinds; only
the bound frame in Type mode syncs. 1 inventory item remains: 9
(cross-mode bgOn semantics — needs user input).)
Earlier today: `session-log/2026-05-04-popover-unification.md`
(closed item 1. Migrated 4 hand-rolled popovers onto the existing
`Popover`/`usePopover`/`PopoverPanel` molecule (`@floating-ui/
react`). `usePopover` gained two options: `flip: false` (Dropdown
needs always-below for the seamless border-radius edge) and
`referenceElement` (anchor to an external DOM node — TypeBlockToolbar
uses this to anchor to its TypeFrame parent). MenuItem full rewrite
— `align="end"` switches placement to `bottom-end`. Dropdown full
rewrite — variant-specific styling, responsive sizing, and seamless
button↔panel border-radius preserved; removed `position: fixed` +
getBoundingClientRect anchoring + scroll-tracking effect + manual
click-outside + manual Escape + zIndex juggling.
LayerInspector.ColorField now wraps the swatch in an explicit
`<button>` so floating-ui has a real reference. TypeBlockToolbar
migrated from CSS abs-positioning to portal-rendered floating-ui
anchor; `placement: 'top'` + `offset: 12` matches the previous
`bottom: calc(100% + 12px)`; added required `referenceElement` prop;
TypeFrame uses a `useState` callback ref so the first attach
triggers a re-render. All 4 popovers now escape overflow ancestors,
auto-update on scroll/resize, and route dismiss through `useDismiss`.
TypeBlockToolbar gains auto-flip-below (was previously fixed-above
and could go off-screen near canvas top). 3 items remain: 2 (cross-
mode fold-back), 4 (lab modes onto registry), 9 (cross-mode bgOn —
needs user input).)
Earlier today: `session-log/2026-05-04-cleanup-batch.md`
(closed 5 small inventory items in one pass: 8/10/11/12/13. (8)
StrokePanel switched from raw `updateLayer` to
`useLayerEdit({ history: 'coalesce' })` — weight-input typing +
style/cap/join click bursts collapse to one undo entry, symmetric
with LayerInspector. (10) `modes/type/state.jsx::newFrame` default
`case: 'upper'` → `'original'` to match
`compose/state.jsx::TEXT_DEFAULTS`; new Type-mode frames no longer
force-uppercase. (11) `SelectionPalettePanel` auto-flip to Inspector
now skips `selectedId === 'canvas'` — Canvas selection leaves the
user on Palette where it's more useful for frame-level editing.
(12) `InspectorRail` title built from `TYPE_LABELS` +
`SHAPE_KIND_LABELS` maps — shape layers expand to `Shape · Logo` /
`Shape · Rectangle` / `Shape · Ellipse` / `Shape · Flatten`; dropped
`capitalize` CSS class (labels authored in proper case, per the
no-auto-text-transform rule). (13) CanvasArea click-away collapsed
from 4 hand-rolled class checks to 1
`[data-editor-keep-selection]` attr check — attr lives on
`EditorShell` root, so new rails/panels integrate without touching
CanvasArea. 4 items remain: 1 (popover unification), 2 (cross-mode
fold-back), 4 (lab modes onto registry), 9 (cross-mode bgOn — needs
user input).)
Earlier today: `session-log/2026-05-04-library-validation.md`
(closed deferred item 3. `library.pattern[]` was holding three
different shapes from three save sites — including type-lab's
`shapeId: 'type-composition'` sentinel that never resolved to a
renderable shape (`getShapeSvg` returned null). Removed type-lab's
"Save SVG to library" button (cleaner: kept the "Download SVG"
sibling that already covered the save-to-disk case). Added per-slot
`VALIDATORS` map (palette/pattern/type/preset) in
`src/editor/library/LibraryProvider.jsx` — each coerces required
fields with defaults, returns `null` to reject malformed specs
(dev-warned). New `sanitizeLoaded()` runs every persisted entry
through its validator at load time so legacy bad entries get
silently dropped on first read; `addItem` and `updateItem` route
through validators too. Envelope fields (`v`/`id`/`savedAt`/
`updatedAt`/`name`) are preserved separately. Dropped the orphan
`svg: svgString` field from PatternControls' savePattern call (no
consumer). Validators strip unknown fields — fail-closed prevents
future drift but new fields must update validators first. 9
inventory items remain.)
Earlier today: `session-log/2026-05-04-paint-loop-close.md`
(closed deferred items 5/6/7 from the 2026-05-04 inventory — the
photoshop-paint plan's "out of scope" block. (5) `addLayer` reads
app-level `paintFill` / `paintStroke` (refs) and merges as `color`
for color-supporting types + `stroke` for shapes; new layers carry
literal hex, library inserts unaffected. (6) Stroke renders on logo
(SVG attr cascade through `KolLogo` props), text (CSS
`-webkit-text-stroke` via TypeBlock value props + `paint-order:
stroke fill`), pattern (`buildPatternSvg` accepts stroke/strokeWidth,
emits inline-style with `vector-effect: non-scaling-stroke` so stroke
width stays consistent across tile scales). `flattenPattern` threads
stroke through too. `StrokePanel` gate widened from `kind ∈ {rect,
ellipse}` to `type ∈ {shape, text, pattern}` — dash/cap/join cascade
for shape+pattern, no-op-but-stored for text. (7) Autosave
write+restore extended with `paint: { fill, stroke, active }`.
`build.js` export updated to match — patternLayerSvg threads stroke,
shapeLayerSvg logo branch corrects stroke-width for the wrapper
scale, textLayerSvg adds `-webkit-text-stroke` to the foreignObject
inline style. Plan doc bumped with `drift:` line + "Shipped" block.
Caveat: logo cascade depends on paths not setting their own stroke
attr (current Kolkrabbi logos comply). 10 inventory items remain;
suggested next: library shape validation (3) for data-correctness or
popover unification (1) for aesthetic-refactor payoff.)
Earlier today: `session-log/2026-05-04-deferred-items-inventory.md`
(post-checkpoint triage; no code changes. Surfaced 13 deferred editor
work items grouped by theme: architecture/consolidation (popover
unification onto floating-ui, "Edit in Pattern/Type mode" bidirectional
fold-back, library item shape validation, lab modes onto EditorShell
registry), color system polish to close the photoshop-paint loop
(new-layer defaults adopt app-level paint, stroke rendering on
text/logo/pattern, paint persistence in autosave), and 6 smaller
cleanups (StrokePanel onto useLayerEdit, bgOn cross-mode semantics,
text typography drift, SelectionPalettePanel over-eager auto-flip,
inspector title genericness, CanvasArea click-away DOM-class fragility).
Suggested order: paint-loop close → library validation → popover
unification → cross-mode + registry pair. Inventory may be promoted to
`docs/editor/plans/2026-05-04-deferred-items.md` if it stops being
ad-hoc.)
Earlier today: `session-log/2026-05-04-docs-checkpoint.md`
(`docs/editor/` restructured into `reference/` + `plans/` with frontmatter
on every file (title / status / updated / verified / verified-by / tags /
drift) and nested-tag convention `editor/<area>/<topic>` for Obsidian.
Every reference doc reconciled to current reality — `tree.md` full
rewrite mirroring actual `src/editor/` plus an "Original target vs
reality" diff table; `ui.md` replaced with the actual Compose registry
diagram (lab modes still bypass it); `product.md` panel-arrangement
duplicate dropped + Library updated to v3 / `library/LibraryProvider.jsx`
+ Mode-switching points at MenuTop; `tools.md` gained the Color
shortcuts section (D / X / Shift+X / N); `frame-state.md` flipped
autosave from "deferred" to "shipped". README has a drift-status table
that's all-clean — this is the **2026-05-04 reconciliation checkpoint**.
Workflow going forward: every session touching load-bearing editor code
either bumps the affected doc's `verified:` or appends to its `drift:`
list. **No code changes this session.**)
Earlier today: `session-log/2026-05-04-color-ownership-plan.md`
(Photoshop / Affinity color hierarchy implemented. SwatchStack is now
**app-level state**, exists independent of selection, all writes always
work — no conditional gates. New `paintFill` / `paintStroke` in compose
state (defaults white/black). New selection-sync `useEffect` snaps app-
level paint to selected layer's resolved fill/stroke (uses refs for
layers/palette/canvasFill so it doesn't re-run on every mutation).
`useColorTarget` rewritten: reads from app-level; `setFill` writes
app-level + (if color layer selected) `layer.color` + (if canvas)
`canvasFill`; `setStroke` writes app-level + (if color layer)
`layer.stroke`. Dropped `hasTarget` / `supportsFill` / `supportsStroke`
/ `NOOP`. CanvasArea paint shortcuts (D / X / Shift+X / N) stripped of
gates — fire regardless of selection. LayerInspector renders both Fill
and Stroke ColorFields together for any color layer (no more
selection-type hide). ColourPanel `localHex` fallback removed (target
always has working setters now). `COLOR_LAYER_TYPES` lifted into
`compose/state.jsx` as a single export. **Build green.** Plan at
`/Users/biskup/.claude/plans/mellow-exploring-crab.md`. Out of scope:
new-layer defaults adopting app-level fill, stroke rendering on
text/logo/pattern, app-level paint persistence.)
Earlier: `session-log/2026-05-04-icons-audit-and-library.md`
(cataloged the 480 staging SVGs at `_tmp/_components-2import/{icons-2-stroke-maybe,icons-to-diff}/`
into a new `docs/icons-audit/icons-audit.md`, with kind classification —
stroke/solid/mixed via `<defs>/<clipPath>/<mask>`-aware fill+stroke scan
— and content-read descriptions for the ambiguously-named ones (`_typography*`,
`color-0*`, `design tools+*`, `nav-ui*`, `placeholder*`, `shape-1..4`, etc.).
Reorganized into `_tmp/_components-2import/icons-organized/{stroke,solid}/`
with topical subfolders (`stroke/rack/{transport,waves,filters,generators,
sequencer,logic,patterns,color,cables,caps,curves,shapes-3d,nav}` for the
rack set; `solid/{navigation,actions,files,communication,user-auth,status,
media,time,layout,editing,system,theme,commerce,stats,shapes,misc,
editor-tools,tui,cursor,typography,search,another-creation}` for the
Carbon-style sets) — every ambiguous filename renamed by its visual
content, redundant `-tool-<group>` suffixes dropped from editor-tools.
9 basename collisions across the two staging folders (different glyphs,
same name) survive with `-alt` suffix on the legacy `icons-2-stroke-maybe`
copy. Generated `stroke-remake/` (340 files mirroring `solid/`) — every
renderable `fill="X"` mechanically flipped to `fill="none" stroke="X"
stroke-width="1.5" stroke-linecap=stroke-linejoin="round"`, paths inside
`<defs>/<clipPath>/<mask>/<pattern>/<symbol>` and already-stroked paths
preserved. **Programmatic starting point only** — icons relying on
compound/overlapping fills (e.g. `editing/adjust.svg`) need hand-redraw.
Then merged the 367 SVGs from the live `src/components/loaders/icons/svg/`
into the same library: 334 byte-identical dupes skipped, 31 new files
added (29 under new `stroke/kol/` bucket from `00-kol/` brand set, 1
under new `solid/another-creation/` bucket — `signature-thick.svg` with
generated stroke-remake — and `99-rack/chevron-right.svg`). Loaders pass
also surfaced 2 misclassifications: `search-line.svg`/`loader.svg` were
stroke icons folder-dominance-bucketed into `solid/` originally — moved
to `stroke/{actions,status}/`, dud stroke-remake entries dropped. Final:
solid/ 340 · stroke/ 170 · stroke-remake/ 340 · 850 total. Originals at
`_tmp/_components-2import/{icons-2-stroke-maybe,icons-to-diff}/` and
`src/components/loaders/icons/svg/` all untouched. Manifest at
`_tmp/_components-2import/icons-organized/_manifest.json`.).
Earlier: `session-log/2026-05-03-editor-state-consolidation.md`
(consumed the new editor state audit at `docs/editor/2026-05-03-state-audit.md`
and executed Tiers 0-4 of the fix plan. Color writes now have a single
owner: `useColorTarget` — inspector ColorField, CanvasArea D/X/Shift+X/N
shortcuts, and the picker modes all funnel through it. `setActivePaint`
clamps to supported paints (no more silent fallback). `null` clears now
resolve to `fill="none"` (was: rendered white). Phantom state purged:
`canvasVisible`/`canvasLocked` (write-only), `strokeAlign` (renderer
ignored), `layer.fill === 'none'` branch (no writer). Dead `EditorTopbar`
+ `ModeTabsPanel` deleted. `findLayerDeep` consolidated 4→1 in new
`compose/helpers.js`. New foundations: `useLayerEdit({ history })`
coordinator hook (discrete/coalesce/transaction), `deleteSelected` action
(multi-delete is one undo entry, kills 3 inline `forEach(removeLayer)`
copies). Pattern: `patternFromSpec` factory exported from compose state,
`bgOn = spec.bg != null` derived consistently. Aspect lifted out of
`modes/palette/state.jsx` — palette mode pulls from compose; one frame
aspect across modes. Palette gen state lifted out too —
`modes/palette/state.jsx` now owns only layoutId/logoId/seedColor; new
compose `loadPalette` action; MenuTop "open library palette" now reaches
the compose canvas. History snapshots pair `{ layers, selectedIds }` —
undo of delete re-selects the restored layers. **Build green.** Deferred
(Tier 5): keymap globalization, popover unification onto floating-ui,
library shape validation, "Edit in mode" bidirectional fold-back,
slider/typing sites onto `useLayerEdit`).
Earlier today: `session-log/2026-05-03-swatchstack-variant-rewrite.md`
(rewrote `SwatchStack` to follow a `/demo` prototype pattern: two named
variant components — `SwatchFillFront` and `SwatchStrokeFront` — selected
wholesale by `activePaint`, both pinning chips at fixed positions
(`FILL_SLOT (5,6)` and `STROKE_SLOT (15,16)`) and using DOM order alone for
stacking. No z-index, no transform; the active paint is rendered second so
it paints on top in the overlap. Renamed `FRONT_SLOT/BACK_SLOT` →
`FILL_SLOT/STROKE_SLOT`. `swap` in `ColourPanel` switched to functional
`setActivePaint(p => p === 'fill' ? 'stroke' : 'fill')` (immune to stale
closure). Dropped the brief `onFocus` prop — chip clicks go through `onSwap`
only, matching the original macOS-port click-anywhere-swaps semantics.
Added `/` as a hidden alias for `paint-clear` in `keymap.js` (cheat sheet
still shows only `N`). Added prototype scaffolding to `pages/Demo.jsx`:
four debug frames + `CirclesA`/`CirclesB` helpers used to isolate the
chip-swap pattern from compose state and verify DOM-order stacking. Tried
to add visible "none" feedback (slash-through-white bg when chip color is
null) — reverted because passing `null` through `ColourPanel` broke the
wheel/sliders (`colord(null)` throws). Known issues: chip clear is silent
(state goes to null but chip falls back to white default), `/` doesn't
preventDefault when no layer selected so browser quickfind still fires,
and `Demo.jsx` is fat with prototype scaffolding that should be removed
once the chip "none" indicator is wired.).
Earlier today: `session-log/2026-05-03-popover-tooltip-color-shortcuts.md`
(rolled back fg-04 → surface-secondary on every filled control —
`.kol-control--filled` master, `.kol-btn-primary`, `.control-slider*`,
Dropdown panel, SegmentedToggle active cell, ViewToggle icon container —
because translucent `fg-04` was rendering see-through against any
non-opaque parent. Built new `Popover` molecule on `@floating-ui/react`:
`usePopover` hook (offset/flip/shift middleware + autoUpdate +
click/hover/focus/dismiss/role interactions) + `PopoverPanel`
(FloatingPortal + FloatingFocusManager) + `Tooltip` wrapper
(hover-triggered with kbd-style shortcut chip). New `.kol-popover`
and `.kol-tooltip` styles. Wired LayerStack `[+]` add-layer dropdown
from hand-rolled portal+position to `Popover` (~75 lines → ~40, auto-
flip + viewport-shift for free). All 5 ToolPalette buttons now use
`<Tooltip>`. Rebuilt Dropdown options on `MenuDropdownItem` with
right-side `<Icon name="check"/>` for active (matches MenuTop's
Mode/File/Canvas dropdowns) — dropped abs-positioned dot + 0.4-opacity
inactive dim + bespoke padding. Tightened Pool/Mode gap in
PaletteControls and PaletteInspector (gap-3 → gap-2). Added Color
keymap section: D = default fill+stroke (white/black), X = toggle
fill/stroke focus, Shift+X = swap fill/stroke color values, N = clear
focused paint (moved off `/` due to browser quickfind). Wired all 4
in CanvasArea's keymap switch + deps array. Final: rewrote `SwatchStack`
to use two persistent-identity circles (fill always shows fillColor,
stroke always shows strokeColor); `activePaint` decides which sits in
the FRONT slot (left:15 top:16 z:2) vs BACK slot (left:5 top:6 z:1);
clicking either circle OR pressing X repositions both with explicit
z-index. New API: `(fillColor, strokeColor, activePaint, onSwap, onClear)`).
Earlier today: `session-log/2026-05-03-editor-marathon-color-tools-shape-primitives.md`
(massive editor session. 10-item punch list shipped W1-W5: dropdown
flipped + portaled, `aspects.js` moved to shell/, inspector eyebrow
deduped, Assets list/grid toggle, keymap registry + `ShortcutsOverlay`
(S), 20 stroke icons in 00-kol/ + Icon resolver overlay, swatches
mapped to KOL tokens, ColorModal wired to selection (Hue + Wheel +
Sliders all live-bound), inspector ColorField with palette popover +
image preview, `docs/editor/tools.md`, tools state + `ToolPalette`
(V/T/R/O/P) + drag-to-create + `rect`/`ellipse` shape primitives,
StrokePanel wired to vector strokes. Then a long iterative pass on
the colour picker — wheel rebuilt as inscribed rotating HSV triangle
with barycentric SV math, hue strip + SBSquare insetting handles,
SwatchStack/EyedropPick reverted to private `FramedSwatch` after
attempt to atomize broke the macOS-port look (off-limits header
added to `SwatchControls.jsx`; same for `SpectrumControls.jsx`).
Then DS-level cleanup: `ColorSwatch` consolidated as single
color-chip atom (variants + radius + size + frame + hoverable +
transparentTone props; default radius `tight` 2px; selected → 2px
border), `Input` height fix (explicit `h-4` so `kol-control-sm` is
exactly 26px), `Dropdown` padding + chrome alignment with shared
`.kol-control-*` system (removed redundant middle wrapper, transparent
border for parity, bg switched from `--kol-surface-secondary` →
`--kol-fg-04`), `LabeledControl` `inline` prop + optional label,
`SegmentedToggle` `border-fg-04` + `size` prop (sm 16px / md 26px),
`.kol-control--filled` bg unified to `--kol-fg-04` system-wide.
Inspector ColorField now renders Fill + Stroke side-by-side as 2 cols
of a 4-col grid; Stroke null state uses `transparentTone="error"`).
Earlier — `session-log/2026-05-02-color-modal-and-rail-tab-groups.md`
(new `/demo` workshop page; rebuilt the color tooling as a tabbed
`ColorModal` (Stroke / Colour / Swatches) mounted in the Compose left
rail; both rails became tab groups — left = Layers/Assets in
`LayersAssetsPanel`, right = Palette/Inspector in
`SelectionPalettePanel` (auto-flips to Inspector on layer-select).
New `editor/color/` folder houses the modal pieces with split body /
chrome exports (`*Body` named, default chromed) so the combined
`ColorModal` reuses bodies inside one shell. New `SegmentedToggle`
molecule for the Stroke segmented controls (Style / Cap / Join /
Align — joined buttons with one outer stroke, no gap). New
`AssetsBody` Logos picker. `LayerStack` refactored — body extracted,
rail-head dropped, bottom action row with `+` / trash that uses the
new `kol-btn-quiet` pattern (50% rest, hover→100%, dim under
disabled). Inspector picks up a trash button. Selection-bug fixes:
`CanvasArea` now stops native event propagation on stage mousedown
so the doc-level click-away can't clobber a fresh selection;
`LayerStack` Canvas row uses `selectCanvas()` (cascade); doc handler
also skips clicks in either rail. `Dropdown` migrated from inline
font styles to `kol-mono-N` classes. `Button` gains a `quiet` prop.
SVG pipeline rebuilt with `vite-plugin-svgr` — KolLogo now imports
each variant via `?react`, exposes `KOL_LOGO_NATURAL_DIMS`, and
shape-logo layers insert at the variant's natural aspect ratio;
`preserveAspectRatio="none"` (default `layer.fit='fill'`) lets the
user stretch/skew freely. Five new stroke icons in `00-kol/`:
`eyedrop`, `eye-open`, `eye-off`, `swap`, `close`. Pinned `*Ref.jsx`
snapshots of the macOS-port panels live alongside the working set so
`/demo` can render Reference vs Working side by side. New deps:
`vite-plugin-svgr` (dev), `playwright` (dev — used during this
session to probe SVG geometry), `colord`, `@floating-ui/react`).
Earlier today: `session-log/2026-05-02-topbar-canvas-as-layer-rail-rework.md`
(massive UI rework. New `MenuTop` topbar — Mode / File / Canvas /
Templates dropdowns built on new `components/molecules/MenuItem.jsx`
(MenuItem trigger + MenuDropdownItem rows + MenuDropdownDivider +
MenuDropdownNest accordion) — replaces the per-panel FrameHeaderPanel,
AspectInspector frame-slot, ModeTabsPanel, and LibraryTab. Compose
registry now stacks Layers (top) + Inspector (bottom) in left.body;
Palette only in right.body. Canvas became a selectable parent at the
TOP of the layer stack, owns its own fill/opacity (new
`CanvasInspector`), replaces the `background` layer type for new
presets. New compose state: `view` ('single'|'social'), `canvasFill`,
`canvasFillOpacity`, `canvasVisible`, `canvasLocked`, `selectCanvas`,
`toggleLayerLock` + `locked` field on layers. Social view renders
1:1/4:5/9:16 side-by-side (read-only). Layer rows redesigned:
chevron sibling outside the pill, pill is a flex container with
absolute-positioned lock+eye buttons on the right (hover-only by
default, full opacity when locked/hidden). Document-level click-away
listener deselects on any click outside `.kol-compose-layer-row`.
Locked layers ignore drag/resize. Pattern Rules folded back into
PatternControls; PatternRulesPanel deleted. Pattern abstract SVGs
copied to `src/editor/modes/pattern/abstracts/`. Dropdown chevron
migrated to Icon loader. Button gained `ghost` variant. Slider
readout now an editable Input. ViewToggle `single` width-locked via
grid-stack. New `check.svg` icon. ALL editor CSS extracted from
`kol-framework.css` into new `src/editor/styles/kol-editor.css`,
imported from EditorShell. `kol-checker` dropped from canvas (grid
shows through transparency). Dead rules cleaned out. Held files for
review: old `EditorTopbar.jsx`, `MenuPopover.jsx`, `ModeTabsPanel.jsx`
unreferenced but on disk.).
Earlier today: `session-log/2026-05-02-modal-and-autosave.md` (KOL-styled promise-based
modal replaces `window.prompt` / `window.confirm`. New
`src/components/molecules/Modal.jsx` (`ModalProvider` + `useModal`),
mounted in `BrandLayout`. `FrameHeaderPanel` Save / Save-as use
`modal.prompt`; `LibraryTab` open routes through `modal.confirm` to
prompt before discarding unsaved layers. Compose state gains autosave:
debounced 500ms write of `{ aspect, layers, palette }` to
`localStorage['kol.editor.draft']`; on first mount, prompts to restore
via `modal.confirm` and applies via raw setters or clears the slot on
cancel. Closes the three deferred phase-8 items from `frame-state.md`).
Earlier today: `session-log/2026-05-02-roadmap-cleanup-complete.md` (closed every roadmap-
deferred item. Folder restructure `editor/labs/<lab>/` →
`editor/modes/<mode>/`; `editor/labs/Canvas.jsx` → `editor/shell/Canvas.jsx`;
`editor/labs/aspects.js` → `editor/aspects.js`; `labs/` gone. Social +
Compositor labs deleted; folded into Compose via 5 baked starter presets in
new `src/editor/library/starters.js` (LibraryTab shows them above saved
slots). Drag-to-canvas wired — library `pattern`/`type`/`preset` items
draggable; CanvasArea handles drop via new `insertFromLibrary` action.
`/generators` lobby + index page deleted; all `/generators/*` legacy URLs
redirect to `/editor/*`. Page wrappers `pages/generators/{ComboLab,
PatternLab,TypeLab}.jsx` deleted (Editor.jsx imports labs directly).
Dead `.kol-compose-*` CSS removed. `loadPreset` re-IDs layers on load so
starters can be loaded repeatedly. `compose/build.js` inlined the SVG/PNG
download helpers that lived in compositor. ~14 import-path rewrites via
bulk sed. Tree now matches `docs/editor/product-tree.md`).
Earlier today: `session-log/2026-05-02-single-toggle-canvas-backdrop.md` (post-phase-8
polish. New `variant="single"` on `ViewToggle` — one button that flips
between `options[0]` and `options[1]`; replaces the segmented two-button
look for tight binary on/off slots. Palette mode's Logo + BG toggles
switched to it; PaletteControls grid restored to `grid-cols-4` with
`col-span-3` for Aspect/Layout. Canvas backdrop restored:
`.kol-editor-canvas` got `background-color: #0E0E11` and `EditorShell`'s
`<main>` got the `kol-grid-bg` class — these were on the old
`GeneratorLayout` wrapper and got dropped when EditorShell replaced it).
Earlier today: `session-log/2026-05-02-phase-8-frame-state.md` (Phase 8: named-frame
persistence. New `docs/editor/frame-state.md` sub-doc; `LibraryProvider`
gains `updateItem(slot,id,spec)`; compose state tracks `currentPresetId`
/ `currentPresetName` (set by `loadPreset` whole-frame, reset by
`clearLayers`); `FrameHeaderPanel` Save = overwrite-if-loaded /
prompt-and-create-otherwise; new Save-as = always prompt + create.
`window.prompt` for naming v1. Header label shows `Frame · <name>` or
`Frame · Untitled`. Autosave / draft slot / cross-tab conflict resolution
deferred per the sub-doc. **Roadmap complete: phases 1-8 all shipped.**
Outstanding cleanup is opportunistic — text flatten via opentype.js,
Social/Compositor fold into Compose, folder restructure to modes/,
lobby page deletion, drag-to-canvas, autosave, custom save modal, dead
`kol-compose-*` CSS).
Earlier today: `session-log/2026-05-02-phase-7-backwards-dep-cleanup.md` (Phase 7:
backwards-dep cleanup. New `src/data/typography-cuts.js` owns `WEIGHTS`,
`familyFor`, `applyCase` (lifted out of editor); `editor/labs/type-lab/
cuts.js` re-exports them. DS + styleguide (TypeBlockToolbar, TypeBlock)
now import from `data/typography-cuts`, not from editor. New
`src/editor/library/LibraryProvider.jsx` (moved from
`editor/labs/sharedState.jsx` which is deleted); 11 consumers updated to
the new import path including BrandLayout. Library still wrapped at the
BrandLayout level so `/generators` lobby and `/editor/*` share one
provider).
Earlier today: `session-log/2026-05-02-phase-6-flatten-roundtrip.md` (Phase 6: pattern
flatten + edit-in-mode round-trip. New `flattenPattern(layerId)` compose
action — renders pattern via `buildPatternSvg` (palette refs resolved),
wraps result in `shape{kind:'flatten',svg}` inside a `group`, replaces
the pattern layer in place. `ShapeLayer` + `shapeLayerSvg` switched from
logo-only to kind-aware; `kind:'flatten'` inlines stored SVG (DOM via
dangerouslySetInnerHTML, export via nested `<svg>` with
`preserveAspectRatio='none'`). PatternFields adds "Edit in Pattern
mode" + "Flatten" buttons; TextFields adds "Edit in Type mode" button —
both copy layer params into the destination mode's state and navigate.
Text flatten via opentype.js explicitly deferred — bigger async lift).
Earlier today: `session-log/2026-05-02-phase-5-library-panel.md` (Phase 5: Library panel.
New `editor/library/LibraryTab.jsx` mounted in `left.body` of every mode.
Click an item → loads it into the matching mode's state via new `load*`
actions on each provider (`loadPreset` / `loadPalette` / `loadPattern` /
`loadType`) and navigates to `/editor/<mode>`. Palette items get a
swatch-strip preview; others use text labels. Drag-to-canvas deferred to
phase 6. The legacy `/generators` index lobby still routes alongside).
Earlier today: `session-log/2026-05-02-phase-4-lift-labs.md` (Phase 4: lift labs into the
shell. ComboLab → Palette mode, PatternLab → Pattern mode, TypeLab → Type
mode. Each lab gets a per-mode `state.jsx` provider, a `*Canvas` panel,
and a `*Controls`/`*Panel` Tool Properties panel. Pattern adds a
`PatternRulesPanel` in `left.body` per the product description. State
providers (`ComposeStateProvider`, `PaletteStateProvider`,
`PatternStateProvider`, `TypeStateProvider`) all mount once in
`Editor.jsx` so state preserves across mode switches. Legacy `/compose`
and `/generators/{combo-lab,pattern-lab,type-lab}` routes redirect to
`/editor/:mode`. Social and Compositor still standalone at
`/generators/{social,compositor}` — folding into Compose deferred).
Earlier today: `session-log/2026-05-02-phase-3-mode-router.md` (Phase 3: mode router.
New `/editor/:mode` route + `Editor.jsx` dispatcher (compose → EditorShell;
palette/pattern/type → existing labs unchanged for now). New
`ModeTabsPanel` in Compose's right.header — `NavLink`-based tabs that
switch modes via URL navigation. Sidebar auto-collapse extended to
`/editor/*`. Compose nav entry now points to `/editor/compose`. Legacy
routes (`/compose`, `/generators/*`) still resolve for backward compat —
phase 4 cleanup. Per-mode state preservation deferred — each lab still
owns local state and unmounts on route change; phase 4 lifts labs into
shell with shared per-mode state slices).
Earlier today: `session-log/2026-05-02-phase-2-editor-shell.md` (Phase 2: unified shell.
New `src/editor/EditorShell.jsx` + `state/panels.js` + per-mode registry.
Compose now mounts as a registry: FrameHeaderPanel @ left.header,
LayerStack @ left.body, PalettePanel + ToolPropertiesPanel @ right.body.
Palette lifted into a persistent always-visible panel; no longer a
selectable frame slot. `ComposeTopbar.jsx` deleted, replaced by compact
`FrameHeaderPanel`. New CSS `.kol-editor-grid` + `.kol-editor-left/right
/canvas` + `.kol-editor-rail-header/body`; old `.kol-compose-grid` CSS
dead but retained for cleanup later. `right.header` empty until phase 3
mounts mode tabs).
Earlier today: `session-log/2026-05-02-phase-1c-group-multiselect.md` (third sub-phase.
New `group` layer type with recursive rendering — children stored at
group-relative coords; `<g transform="translate">` wrapper restores
absolute positioning at render. Selection model upgraded from
`selectedId: string` to `selectedIds: string[]`; `selectedId` retained as
back-compat getter. New `select`, `toggleSelection`, `groupLayers`,
`ungroupLayer` actions. Shift-click in LayerStack toggles multi-select;
"Group N" button appears when 2+ layers selected; GroupFields inspector
exposes Ungroup. Flat groups only for v1. **Phase 1 of the roadmap
(1a+1b+1c) now complete** — vocabulary migrated, pattern/photo positioned,
group + multi-select shipped).
Earlier today: `session-log/2026-05-02-phase-1b-positioning-promotion.md`
(second sub-phase. Pattern + photo promoted from cover-only to positioned
with `x/y/w/h`).
Earlier today: `session-log/2026-05-02-phase-1a-vocabulary-migration.md`
(first sub-phase of the editor implementation roadmap. Renamed library slots
`[palette,pattern,type,mark,layout,composition]` → `[palette,pattern,type,
preset]` and layer-type strings `bg`→`background`, `image`→`photo`,
`mark`→`shape{kind:'logo'}` everywhere. Dropped `layoutId` + `explodeLayout`
from compose state — `layout` is no longer a frame slot; saved frames live
in `preset` slot via `savePreset({intent:'whole',...})`. localStorage
v2→v3 migration with `_backup` snapshot for rollback. Dropped saveMark /
saveLayout / saveComposition; added savePreset. LayoutInspector deleted.
Compositor lab pruned of dropped library reads; folds into Compose in
phase 4. Pure code edits — not visually verified yet).
Earlier today: `session-log/2026-05-02-editor-product-docs.md` (wrote
target architecture for the editor surface in new `docs/editor/`. Six docs:
README index + product-description + product-ui + roadmap + product-tree
+ implementation-plan. Established
target shape: 4 modes (Compose / Palette / Pattern / Type — Mark dropped),
6 layer types (`background` cover-only-and-pinned-to-back / `pattern` /
`photo` / `shape` / `text` / `group` — all non-background positioned with
`x/y/w/h` + transform wireframe), 4 library slots (`palette` / `pattern` /
`type` / `preset` — `composition` and `mark` dropped, `layout` renamed to
`preset` and broadened to cover whole-frame OR partial-chunk saves).
Two-rail panel-model shell with no topbar / drawer / footer; Tool
Properties is one panel slot with mode-driven content; Palette persistent
in right.body; mode tabs in right.header. "Composition" is not a concept
in the target — frames are implicit in-memory, saved frames live in
`preset`. 8-phase roadmap from today's split to unified shell. No code
changes; pure design-doc work).
Earlier today: `session-log/2026-05-02-editor-extraction.md` (extracted compose + labs
out of `src/components/` into a new top-level `src/editor/` roof, peer to
`src/brand/` and `src/components/`. `src/components/compose/` → `src/editor/
compose/`. `src/components/generators/` → `src/editor/labs/`. Type Lab's
opentype.js font CSS moved with the editor — `src/styles/kol-typography-
fonts-full.css` → `src/editor/styles/`. Slide deck stays in `loaders/decks/`
(shared between compose and `/slide-deck`). 50 import sites rewritten across
25 files. Surfaced a backwards layer dependency — DS molecule
(`TypeBlockToolbar`), styleguide content (`TypeBlock`), and framework
(`BrandLayout`) all reach into `editor/labs/` for type-lab helpers +
`GeneratorLibraryProvider`. Flagged as next).
Earlier today: `session-log/2026-05-02-gallery-nav-and-context-sweep.md`
(post-refactor cleanup. Fixed three latent path bugs surfaced at runtime —
`photoIndexPlugin` middleware + `build-photos-manifest.js` + Landing hero all
pointed at the deleted `public/brand/images/` instead of `public/images/`.
Wired `/gallery` into the sidebar (top-level entry between Styleguide and
Reference, route moved inside `BrandLayout` so the navbar persists). Fixed
sidebar toggle clipping by bumping SideNav z-index `z-10` → `z-20`. Then
swept the AGENT-CONTEXT body for stale labels — surviving surfaces, key
files table, consistency seams, known gotchas all now match the four-layer
reality).
Earlier today: `session-log/2026-05-02-brand-ds-framework-split.md` (four-layer
architecture established. Created `kol-brand` package upstream + restructured
this repo's src/ to mirror the split: `brand/` (identity), `components/framework/`
(chrome), `components/styleguide/` (per-client content), `components/{atoms,
molecules,organisms,icons}` (DS only). Stripped brand from `kol-theme/src/
kol-color.css` upstream, synced packages with the new layout, updated
`init-scaffold`, wrote `docs/repo-setup/src-layout.md` explaining the four-layer
model. ~120 import sites rewritten. Vite HMR validated all paths resolve after
two follow-up patches).
Earlier: `session-log/2026-05-01-compose-audit.md` (read-only /compose UI audit
against the sibling kol-editor; logged at `docs/kol-migration/compose-audit.md`.
Quality flagged as thin — kol-editor research outsourced to an Explore agent,
not directly read. Recommendations are directionally fine but not deeply
verified. Phase 8 polish list shipped: inline visibility eye, filename input,
collapsible inspector sections, drawer repurpose, IconButton atom).
Earlier today: `session-log/2026-05-01-pattern-and-ux.md` (Phase 6f: compose
pattern layer self-contained — full Pattern Lab control surface in the inspector,
buildPatternSvg per render, Apply/Save library symmetry, RuleRow extracted.
Plus compose UX defaults: sidenav auto-collapses on /compose, canvas opens
empty, topbar Clear button).
Earlier today: `session-log/2026-05-01-slide-explode-fixes.md` (post-marathon
fixes: TypeBlock gains `mono` cut → JetBrains Mono via `familyFor`; slide
templates use mono for chrome layers; `explodeLayout` replaces the layer
stack instead of appending so the default bg/mark layers don't bleed
through after explode).
Earlier today: `session-log/2026-05-01-phase-5d-through-7.md` (the marathon:
Phase 5d comment sweep + 6a ColorSwatch atom + 6c Canvas pan + 6b TypeBlock
organism + 6d compose text-layer adopts TypeBlock + 6e slide-as-template
instantiator + 5e AcLogo/SVG/ac-images mechanical rename + 7 partial
cleanup. All roadmap-tractable phases closed; remaining Phase 7 work is
user-decision territory — Acyr keep/rewrite/delete, Styleguide editorial
chapters, StationeryMocks AC prose, kol-site.css deletion, _tmp/ delete).
Earlier today: `session-log/2026-05-01-phase-5d-6a-6c.md` (the first three
phases logged separately before the rest landed); plus
`session-log/2026-05-01-slide-unification-and-roadmap.md` (slide deck
unified, palette-aware SlideCover/Manifesto/End, /compose Layout feature,
button-primary sweep, /demo → /components rename, Graphics chapter to
Styleguide, Slide deck KOL rebrand, BRAND.name flipped to 'Kolkrabbi
Vinnustofa', new comprehensive roadmap at `docs/kol-migration/roadmap.md`).
Earlier today: `session-log/2026-05-01-phase-5a-foundation.md` (Phase
5a/5b/5c foundation: new atoms Textarea/TransparentX, ViewToggle text-
inactive bare-text, ControlsSection → LabeledControl, full /compose migration,
demoSeed token-driven, ColorPicker tab→ViewToggle, PatternLab residual,
Photos manifest restored).
Earlier: `session-log/2026-04-30-phase-4-tier-promotion-component-inventory.md`
(Phase 4: Round 3 promotion of residual + framework component CSS into
atoms tier; `kol-components.css` deleted; Slider variant restructure
(2 variants now: default + subtle; track exposed as `--kol-slider-track`);
new `LabeledControl` molecule (slot pattern); 3 dead components deleted
(Checkbox.jsx, ButtonNav.jsx, UnitSelector.jsx); new
`src/data/system/components.js` inventory feeding /reference Atoms /
Molecules / Organisms tables and /demo ComponentMeta badges). Earlier
in the day:
`session-log/2026-04-30-control-system-tier-cleanup.md` (Phase 3a–3e:
.kol-control shell primitive + atom/molecule tier extraction + dead-class
cleanup + full guides system removal),
`session-log/2026-04-30-asset-swap-site-strip-zero-point.md` (asset swap +
/site strip + docs reset),
`session-log/2026-04-30-color-system-rebuild-live-display.md` (color rebuild +
live-CSS pattern),
`session-log/2026-04-30-typography-rebuild.md` (typography rebuild — sans/mono
split, JetBrains swap, numbered scales, descriptor unification), and
`session-log/2026-04-30-typography-data-extraction-locked-docs.md` (single
source-of-truth data file pattern, opacity unification, locked/ docs
convention).

---

## Status at a glance

- React 19 + Vite 8 + Tailwind 4 + KOL (Kolkrabbi) design system. Package
  manager: pnpm.
- Repo is a stripped extraction of `kol-ac` (parent brand site). Strip is
  in-progress — see `../kol-migration/migration-notes.md` for the live
  punch-list.
- **Four-layer src/ architecture (2026-05-02):** DS (`components/{atoms,
  molecules,organisms,icons}` + `styles/`), brand (`brand/`), framework
  (`components/framework/`), per-client content (`components/styleguide/`).
  Apps live under `editor/` (`editor/compose/` + `editor/labs/`) — extracted
  out of `components/` 2026-05-02 (later session). See
  `docs/repo-setup/src-layout.md` for the full layout + decision rules.
- Upstream packages synced: `kol-brand` (NEW), `kol-theme` (brand-stripped +
  3-file components split + mono CSS split), `kol-component` (10 atoms / 12
  molecules / 1 organism), `kol-loader` (icons aligned). `kol-framework`
  package is not yet set up — when it is, `src/components/framework/` will
  sync upstream the same way atoms/molecules sync to `kol-component`.
- **Surviving surfaces:**
  - `/` — landing (single-screen hero + CTA buttons)
  - `/styleguide` — chapter-grouped brand styleguide (kept for now)
  - `/gallery` — photo lookup (sidebar-listed since 2026-05-02; wraps in `BrandLayout`)
  - `/reference` — token + asset lookup tables
  - `/reference/acyr` — AC reference page (kept for now; AC-themed content)
  - `/generators` + 5 sub-labs (`combo-lab`, `pattern-lab`, `type-lab`,
    `social`, `compositor`) — interactive generators
  - `/compose` — Figma-style direct-manipulation editor (in progress)
  - `/components` — atoms / molecules / organisms showcase (was `/demo` pre-2026-05-01)
  - `/slide-deck` — standalone fullscreen slide deck (no chrome)

## What works

**Asset layer**
- 4 Kolkrabbi logos served via `KolLogo` loader at `src/brand/logos/`
  (renamed from `AcLogo` in Phase 5e, relocated 2026-05-02). SVGs at
  `src/brand/logos/svg/kol-*.svg`. `currentColor`-themed.
- Photo library at `public/images/kol-{kol,mood,photoshoot,textures}/`
  (moved from `public/brand/images/` as part of the AC strip).
- `Landing.jsx` `HERO_IMAGE` points at `/images/kol-photoshoot/thg-01.jpg`.

**Marketing site**
- Removed — `/site/*` routes, `pages/site/`, `SiteLayout.jsx`,
  `components/site/`, site nav, and 12 site-only organisms all deleted.
- `Acyr.jsx` (`/reference/acyr`) preserved; its data deps
  (`blog-data.js`, `shop-data.js`, `collections-data.js`, `business-data.js`,
  `kol-images.js`) live at `src/brand/data/` (relocated 2026-05-02 from
  `src/data/`).

**Color system (rebuilt 5-layer architecture)**
- Primitives: 5 brand hue ramps × 5 stops (`--brand-{yellow, red, blue,
  orange, teal}-{100..500}`) + cream + legacy 10-stop grey + absolutes.
- Brand identity: 4-token theme-pair layer (`--brand-primary` / `-on-primary`
  / `-secondary` / `-on-secondary`). Yellow primary, navy ink, rust secondary.
- Accent role wired to brand layer; rebrand by editing 4 lines.
- UI state (`--ui-*`) deliberately disconnected from brand ramps.
- Tailwind `@theme` exposes brand role + 25 ramp stops + cream + ui-state.
- Deleted: AC `--burgundy-*`, AC `--cream-*` values, vestigial
  `--kol-color-brand-*` (6 hexes), `--kol-status-*` (8 tokens),
  jack roles, `--brand-surface-deep`.
- Tailwind `@theme` blocks moved out of `index.css` — color exposures live in
  `kol-color.css`, font exposures in `kol-typography.css`. `index.css` is now
  imports + one global rule.

**Live-CSS display pattern**
- `src/components/sections/ColorRamp.jsx` — generic CSS-reading helpers:
  `resolveCssVar(name)` (color, probe + rgbToHex), `resolveCssVarRaw(name)`
  (size / family literal), `<Chip>`, `<LiveValue>`, `<ColorRamp>`.
- Components (`/components`), Reference (`/reference`), Styleguide
  (`/styleguide#color`, `#typography`), and Combo Lab `pools.js` all read
  tokens live.

**Data-driven Reference + Styleguide pattern**
- `src/data/typography.js` (flattened from `data/system/` 2026-05-02) —
  single source of truth for the typography surface (sections + reasoning
  + token paths). Both Reference and Styleguide import `TYPOGRAPHY_SECTIONS`
  and render their own visual treatment over it. `TYPE_COLUMNS` dictionary
  in Reference holds the JSX render functions per column-set name.
- Same pattern in `src/data/color.js` and `src/data/components.js`.
  `routes.js` reserved for a future pass.

**Docs convention**
- `docs/kol-migration/locked/` — canonical docs (`color-system.md`,
  `typography-system.md`). Status: canonical. Edit only on architectural
  change.
- `docs/kol-migration/` parent — active docs (drift checklist, migration
  notes, phase-out checklist) + superseded historical (typography-proposal).
- Every `.md` carries frontmatter (`title`, `status`, `updated`, `tags`).
  Status visible at-a-glance.

**Typography system (rebuilt 2026-04-30)**
- **Sans** — Right Grotesk family. Three cut tokens (`--kol-font-family-sans`,
  `-narrow`, `-compact`). Numbered size tokens
  (`--kol-text-display-{01..03}`, `--kol-text-heading-{01..06}`,
  `--kol-text-body-{01..03}`, 01 = largest). Atomic classes
  `.kol-sans-display-*`, `.kol-sans-heading-*`, `.kol-sans-body-*`. Cuts
  assigned per role: Narrow for display + H1, Compact for H2-H5, base for
  body. Atomic body weight 400; prose body weight 300.
- **Mono** — JetBrains Mono (replaces Right Grotesk Mono). Lives in its own
  file `kol-typography-mono.css`. Two scales at the same px stops (8/10/12/14/16/20):
  `.kol-mono-N` (body, weight 400, with leading) + `.kol-helper-N` (label,
  weight 500, line-height 1, letter-spaced). Weight split creates label/value
  hierarchy without size jumps.
- **`.kol-prose`** — H1–H6 wired through `--kol-text-heading-*` tokens (was
  hardcoded). Prose code/pre rules consume `--kol-font-family-mono`. Cuts
  consume the family-cut tokens.
- **Opacity descriptors** — 6-stop hierarchy: `subtle` (24%) / `mute` (32%) /
  `meta` (48%) / `body` (64%) / `strong` (80%) / `emphasis` (100%). Tokens
  `--kol-fg-{name}` + class families `text-`, `bg-`, `border-`, `ring-` ×
  6 stops × hover variants. Numeric `text-fg-*` family preserved as
  precision escape hatch.
- **`.text-trim`** utility — `text-box-trim` cap-baseline trim for tight UI
  labels. Chrome 133+ / Safari 18.2+ / Firefox no-op fallback.
- Architecture: `docs/kol-migration/locked/typography-system.md`.

**Phase 5d / 6a / 6c / 6b / 6d / 6e / 5e / 7 (shipped 2026-05-01)**
- Phase 5d comment sweep — all AC code-comment residue + dead `--kol-accent-primary, #C82C42` AC-red fallbacks cleaned (10 sites). Editorial residue deferred to Phase 7.
- Phase 6a `<ColorSwatch>` atom — polymorphic (button when onClick, span otherwise). `size={number}` or `size="fill"`. `showTransparent` overlays `<TransparentX>`. 5 sites migrated.
- Phase 6c Canvas pan extraction — Canvas owns pan via internal `<PanViewport>`. `panEnabled` opts in. GeneratorLayout 121→55 lines. CanvasArea opted in.
- Phase 6b `<TypeBlock>` organism (`src/components/organisms/TypeBlock.jsx`) — typography rendering primitive + double-click contentEditable. Position is the consumer's job. `<TypeBlockToolbar>` molecule (`src/components/molecules/TypeBlockToolbar.jsx`) — floating chrome (alignment / weight cycle / italic / ColorSwatch + OS picker / delete). `FloatingToolbar.jsx` deleted. `TypeFrame` composes both for the basic branch; axis-on (morph/random/fade) keeps inline rendering.
- Phase 6d /compose text layer adopts TypeBlock — `type` and `text` layer types merged into single self-contained `text` layer with full Type Lab typography. `LayerInspector.TextFields` covers cut/weight/italic/size/tracking/leading/case/align + saved-spec picker. `LayerRenderer.TextLayer` wraps `<TypeBlock>`. `build.js` SVG export uses full typography. `LayerStack` icon registry updated.
- Phase 6e slide-as-template — `loaders/decks/slideTemplates.js` exports `SLIDE_TEMPLATES` for cover / manifesto / end. `explodeLayout` action in compose state appends template layers + clears layoutId + selects first new layer. `LayoutInspector` "Explode to layers" button surfaces only when a slide layout is active.
- Phase 5e AcLogo / SVG / ac-images mechanical rename — `KolLogo.jsx` (4 kol-*.svg) + 13 consumer files + 2 build.js paths + `ac-images.js` → `kol-images.js`.
- Phase 7 mechanical cleanup (partial) — `package.json` name `kol-ac` → `kol-generator-acstrip`; `index.html` title + favicon path; drift doc status note flagging §1–10 closed by Phase 4 color rebuild + Phase 5d sweep.

**Post-marathon fixes (2026-05-01)**
- TypeBlock `mono` cut — `WIDTHS` gains `mono` (8th option); `familyFor('mono')` resolves to `'JetBrains Mono'`; slide templates' size-14 chrome layers (topbar / eyebrow / meta / foot / caption / URL) use `width: 'mono'` so they render in mono not sans.
- Slide explode replaces — `explodeLayout` swaps the layer stack for the template's fresh layers instead of appending, so the default bg/mark/etc. don't render on top of an exploded slide. Undo restores via history.

**Phase 6f + compose UX (2026-05-01)**
- Compose pattern layer self-contained — pattern carries full Pattern Lab params (shapeId, customSvg, cols, rows, gap, padding, stretch, overflow, bgOn, bg, color, rules, scale). LayerRenderer + build.js call `buildPatternSvg` per render. `PatternFields` inspector renders the full Pattern Lab control surface + Apply-saved-pattern picker + Save-to-library button. RuleRow extracted from PatternLab.jsx into `pattern-lab/RuleRow.jsx`.
- Compose UX — SideNav auto-collapses on `/compose` route entry (user can re-expand via chevron). `DEFAULT_LAYERS = []` so compose opens empty. ComposeTopbar gains a `Clear` button (variant secondary, trash icon) that drops all layers via the new `clearLayers` action; disabled when layers are already empty; tracked through history (undo restores).

## What's pending

See `../kol-migration/migration-notes.md` for the live punch-list. Headline
items:

1. **Verify.** Click through every surviving route, watch console.
2. **Stale `/brand/images/ac-*` path refs** in `src/brand/data/{blog,shop,
   collections,kol-images}-data.js`. Two compounding issues: (a) photos
   moved from `public/brand/images/` to `public/images/`, (b) AC-named
   subfolders (`ac-photoshoot`, `ac-mood`, `ac-textures`) no longer exist.
   Acyr article previews 404 until rewritten.
3. **Dead `/site` link in `Landing.jsx`** (`Enter site` button → 404).
4. **String sweep "Another Creation" → "Kolkrabbi"** across Styleguide
   prose, slide-layouts comments, Runway decks. Color rebuild left
   3 "burgundy and cream" copy refs in Styleguide.
5. **`kol-site.css` deletion** — still imported by `src/index.css` but
   marketing-site routes are gone. Out of scope until next sweep.
6. **`kol-framework` package** — not yet set up upstream. When it is,
   `src/components/framework/` syncs to it the same way atoms/molecules
   sync to `kol-component`.

**Closed since last context refresh:**
- ✓ Brand identity rename (2026-05-02 — `brand.config.js` → `brand/config.js`,
  brand layer split out into `src/brand/`).
- ✓ Code rename (`AcLogo` → `KolLogo`, `ac-images.js` → `kol-images.js`,
  SVG filenames `ac-*` → `kol-*` — Phase 5e + 2026-05-02 relocation).
- ✓ Guides system removal (per ARCHITECTURE.md §N — 2026-04-30).
- ✓ `package.json` rename (`kol-ac` → `kol-generator-acstrip` — Phase 7).

## Key files and their roles

For the full src/ map see `docs/repo-setup/src-layout.md`.

| file | role |
|---|---|
| `src/App.jsx` | route table |
| `src/brand/config.js` | brand name + slug — single source for client-brand naming |
| `src/brand/kol-brand-color.css` | Kolkrabbi brand color layer (5 hue ramps, brand-primary/secondary, accent rebind, brand Tailwind utilities). Mirrors `kol-system/packages/kol-brand/`. |
| `src/brand/logos/KolLogo.jsx` | logo loader (SVG injection, currentColor-themed). Source: 4 SVGs at `src/brand/logos/svg/kol-*.svg` |
| `src/brand/data/info.js` | brand strings (address, contact, ASSET_SPECS) |
| `src/brand/data/{blog,shop,collections,business}-data.js` | content data — only consumer is `Acyr.jsx` after the /site strip |
| `src/components/framework/*` | page chrome — `Layout`, `BrandLayout`, `SideNav`, `sidebars.config.js`, `PageSection`, `BrandHero`, `SubPageHero`, etc. + `kol-framework.css` |
| `src/components/styleguide/*` | per-client chapter components (asset / logo / type / mood chapters, mocks, etc.) |
| `src/components/atoms/`, `molecules/`, `organisms/` | DS components (Table is the only DS organism) |
| `src/components/sections/ColorRamp.jsx` | Live-CSS color display helper. `resolveCssVar()` + `<Chip>` + `<ColorRamp>`. Used by Components, Reference, Styleguide, Combo Lab pools |
| `src/components/loaders/icons/` | Icon component + KOL icon SVG registry (~340 icons). Mirrors `kol-system/packages/kol-loader/src/icons/` |
| `src/components/loaders/{decks,graphics}/` | slide deck templates + brand-flavored SVG graphics |
| `src/editor/labs/*` | 5 generator labs + shared library context (`sharedState.jsx`) + `lobby/` + `GeneratorLayout` / `Canvas` / `aspects` |
| `src/editor/compose/*` | `/compose` editor (`state.jsx`, `LayerStack`, `CanvasArea`, `LayerRenderer`, inspectors) |
| `src/editor/styles/kol-typography-fonts-full.css` | 98-ttf opentype.js plumbing for Type Lab morph (editor-only, not DS) |
| `src/styles/kol-theme.css` | DS umbrella — imports color/opacity/typography(×2)/utilities/components(×3) in cascade order |
| `src/styles/kol-color.css` | DS color layer (brand-neutral). Surface tiers, ink-default accent, ui-state, borders. Color architecture documented in `docs/kol-migration/locked/color-system.md` |
| `src/styles/kol-typography.css` | Sans system — Right Grotesk @font-face + size/family tokens + atomic classes + `.kol-prose` |
| `src/styles/kol-typography-mono.css` | Mono system — JetBrains Mono @font-face + `.kol-mono-N` + `.kol-helper-N` |
| `src/styles/kol-opacity.css` | fg-opacity ramp + 5-stop descriptor system (text/bg/border × subtle..emphasis) |
| `src/styles/kol-components-{atoms,molecules,organisms}.css` | DS component CSS (3-file split since 2026-05-02) |
| `src/data/{typography,color,components}.js` | DS data files (flattened from `data/system/` 2026-05-02) |
| `public/images/kol-*` | photo library (mood / photoshoot / textures / kol) |
| `public/fonts/Right-Grotesk-ttf/` | 98 ttf files for opentype.js morph plumbing in Type Lab |

## Critical consistency seams

### `BRAND.nameSlug` ↔ `public/brand/<slug>/` folder
`src/brand/config.js` exports `BRAND.nameSlug`. Historically brand-data
paths under `public/brand/<slug>/` resolved via this slug. Photos have
since moved to `public/images/` (no slug dependency); other slug consumers
worth auditing.

### Sidebar anchors ↔ `<PageSection id=…>`
`src/components/framework/sidebars.config.js` anchor ids must match each
`<PageSection>` id on the corresponding page. They drift silently and break
sidebar scroll-spy.

### Repo `src/` layout ↔ upstream `kol-system/packages/`
`src/styles/kol-*.css` (DS) syncs to `kol-theme`. `src/brand/kol-brand-color.css`
syncs to `kol-brand`. `src/components/{atoms,molecules,organisms,icons}` syncs
to `kol-component` + `kol-loader`. `src/components/framework/` will sync to
`kol-framework` once that package is set up. `src/editor/` (compose + labs)
is currently consumer-only, no upstream package yet. See
`docs/repo-setup/src-layout.md` for the full mapping.

---

## Known gotchas

- `src/editor/styles/kol-typography-fonts-full.css` ships 98 ttf files for
  Type Lab opentype.js morph plumbing — editor-specific, NOT part of the DS
  that `init-scaffold` distributes. Moved out of `src/styles/` into the
  editor roof 2026-05-02.
- **Backwards layer dependency:** DS molecule `TypeBlockToolbar`, styleguide
  content `TypeBlock`, and framework `BrandLayout` all import from
  `src/editor/labs/` (`type-lab/cuts.js` for `WEIGHTS` / `familyFor` /
  `applyCase`; `sharedState.jsx` for `GeneratorLibraryProvider`). DS /
  framework should not depend on the editor — pending lift into a shared
  module or DS root.
- `src/styles/kol-site.css` is still imported by `src/index.css` even though
  marketing-site routes (`/site/*`) are gone. Pending deletion.
- `kol-loader/src/icons/index.js` registry's `rack` bucket still lists
  `chevron-up`/`chevron-down` even though those icons live in `00-kol/` now.
  Cosmetic — `Icon.jsx` resolves by filename via `import.meta.glob`, runtime
  works.
