# Handoff — 2026-08-01 15:27

## Goal of the current arc

Turn `apps/brand` from a flat brand-book into a navigated app: real child routes
everywhere, section anchors retired, one background for the whole shell — and
where a decision was outstanding, build the **placeholder** rather than stall,
on the user's ruling *"build everything, use placeholders if waiting for stuff"*.

## Last actions taken (causal trail, newest first)

- **Built all six remaining items with placeholders.** Icons contact sheet
  (`/icons/:set`, 165 icons / 26 groups, groups read from `KOL_ICON_SET_V1` so
  the list cannot drift); seven editor preset routes from the user's own list;
  one hoisted background; the accent override; a video-tile fallback.
  14/14 routes verified 200.
- **Sidebar sections DISABLED, not deleted** — every anchor group moved to a new
  exported `SECTION_ANCHORS` in `sidebars.config.js`, keyed by page, with restore
  instructions. `collectSectionIds` / `useScrollSpy` / `hasActiveDescendant` /
  `SectionLeaf` / `ChildNode` all stay in `SideNav.jsx` with a PARKED note at the
  call site. Paste an array back onto a page row and the whole layer works again.
- **`/slide-deck` became a MANAGER**, not a viewer — rows on the DS `MediaRow`
  molecule (the same component behind the admin list the user specced against),
  registry at `data/decks.js`, `/slide-deck/templates` derived from it,
  `/slide-deck/:deck` the viewer. Create/rename/delete/export render **disabled**.
- **Library gained three folder galleries** — one `LibraryFolder` component over
  three routes, matching the three folders the bucket root actually holds.
- **Filed `ButtonIconOnlyParity` to the kol-ds-ui lobby** — `Button.jsx:60`
  resolves one glyph ladder regardless of `iconOnly`, so an icon-only button puts
  a text-adjacent glyph (14/16/18) in a solo pinned square where the law says
  16/20/24. Mirror of the `hop-bare` bug framework 0.10.3 already fixed.
- **Filed `MediaLibrary` to the same lobby** — 4 repos / 9 files / 1542 lines all
  render the kol-media bucket over one endpoint; fxr and labs-single are forks
  with identical filenames that diverged in opposite directions.
- **Published kol-component 0.15.3** — `iconSize` on `IconFrame`, consumed in
  both apps.
- Earlier: Editor + Icons embedded as iframes, Styleguide renamed to Brand with
  8 sections moved to Assets, Gallery quarantined.

## Current state / open decision points

**Four placeholders, every one reversible in a single edit:**

1. **`bg-oq-04` as the one hoisted surface** (`BrandLayout.jsx`) — chosen because
   it is the position `Library.jsx:54` argued in its own comment
   ("Page surface = an OPAQUE tier, never an fg alpha"), **not** because it beats
   the user's `bg-fg-02` pick from earlier the same day. He picked fg-02 for the
   sidebar; a single hoisted background cannot honour both. One constant.
2. **The accent override** — active nav icons no longer take
   `--kol-accent-primary`. Done **consumer-side** in
   `styles/sidenav-collapse.css` with the DS source cited. The rule lives at
   kol-theme `kol-components-atoms.css:701-703` and hits every consumer; the same
   token is **1.41:1 on light** with six candidates staged since 2026-07-30.
   Override vs lobby brief is his call.
3. **Seven editor presets** — his list verbatim, all inert. kol-ds-fxr has **no
   preset URL contract**, so each route embeds the same editor and the page says
   so on screen. `presetUrl()` in `EditorPreset.jsx` is the single line to change.
4. **Video thumbnails still unconfirmed.** Proven: `preload="metadata"` caps
   `readyState` at 1, so a `#t=` fragment alone can never paint. Ruled out: the
   CDN — range requests return 206, `canPlayType` reports h264 "probably". The
   current tile loads only when in view, then seeks; it stays at readyState 1 in
   headless. **Needs his eyes in real Chrome.** A fallback (play glyph +
   filename) means a non-decoding tile is at least legible.

**Still PRODUCT, deliberately not built:** deck edit mode, the
slide-count/color/template modal, export to pptx/key/pdf/svg. Export is a
dependency question, not a UI task.

**Two lobby entries owed from kol-ds-ui:** `ButtonIconOnlyParity` and
`MediaLibrary`. The DS agent closed `InteractiveImage` and `MediaLibrary`'s
predecessors while this session ran — check `kol-ds-ui/lobby/INDEX.md` before
assuming the queue depth.

## Next intended action

Get the four placeholder rulings, in this order — 1 and 2 are one-line changes,
3 and 4 need him at a browser:

1. Background: `oq-04` or `fg-02`?
2. Accent: keep the consumer override, or file it to the DS?
3. Which editor presets are real vs thinking aloud?
4. Open `/library/video` in Chrome — do the video tiles paint?

Then: `AGENT-CONTEXT.md` needs a real update. Its stack line and its
"Awaiting user rulings — THE COMPLETE LIST" section are both stale, and parked
backlog **#4 is now wrong** — it says the popover tier has "zero DIRECT call
sites in web/brand" and "nothing to adopt consumer-side". `SideNav.jsx` adopted
`Tooltip` today; that is the first consumer.

## Working memory not yet in AGENT-CONTEXT

- **`ds.kolkrabbi.io` is dead DNS.** The live showcase is **`ui.kolkrabbi.io`**.
  kol-ds-ui's own `README.md:3` badge advertised the dead one — fixed today, plus
  a second stale reference in `docs/operations/04-content-pipeline/INDEX.md:27`.
  I reported `/icons` as blocked on this and was wrong twice over: I had probed a
  correct-shaped host and dismissed it on its `<title>`, but
  `showcase/index.html:7` is literally `<title>kol-labs</title>`. **Title is never
  evidence of which app a host serves.**
- **The showcase has an embed mode**: `?embed=1`, `showcase/src/lib/useEmbed.js`
  read by `ShellChrome`, layout-level, latches per document. Without it an iframe
  nests Workshop's whole shell. Documented in
  `docs/documentation/04-compositions/02-shells.md`.
- **Route order bites**: `/slide-deck/templates` must be declared BEFORE
  `/slide-deck/:deck` or the param route swallows the literal segment.
- **The glyph ladder is transcribed in four places** — `Button.jsx:60`,
  `IconFrame.jsx:44`, `Input.jsx` (`ICON_SIZE`), `Tag.jsx:40` (`ICON_SIZES`).
  That is the root cause behind the ButtonIconOnlyParity defect; the brief names
  hoisting them to one module as the real fix and the ternary swap as the patch.
- **`kol-theme` is pinned EXACT in both `package.json` files** (no caret) — a
  caret-only sed silently skips it. Still true.
- **`.kol-sidenav-list` is brand's class, `.kol-sidenav-body` is the package's.**
  The collapse CSS hid the package name, which never matched this markup — that
  is why the rail had a tall empty band under Styleguide.
- **The horizontal lockup does not fit the collapsed rail.** The rail takes the
  square `logomark` variant instead; the lockup is not in the rail's
  `display:none` list the way `.kol-sidenav-hop-label` is.
- The user's dev server on **5174 ran all session — never touch it.** Agent work
  used 5395 only, killed and verified clear every time.
