---
Title: Operations - /work Surface DS Backport Brief
Version: 1.1.0
Date: 2026-07-15
Status: Active
Content-Type: reference
Category: operations
tags: [operations, design-system, kol-content, backport, work-surface]
---

## What this is

On 2026-07-15 the website's `/work` surface adopted `@kolkrabbi/kol-content`'s components
**as published**, accepting their deltas. This brief travels to the **kol-design-system repo**:
the backward changes that make the DS carry what `/work` originally had. Scope is `/work` only.

---

## 1. Display faces — TGDylgjur + TGMalromur have no DS home

The biggest accepted delta: `/work`'s display type changed from the brand faces to Right Grotesk.

| Site had | DS renders instead | Where |
|---|---|---|
| `TGDylgjur` 400 (inline style) — shelf-card hover title | `.kol-sans-display-02` → `--kol-font-family-sans-narrow` = Right Grotesk Narrow | `WorkCard.jsx` drawer |
| `TGMalromur` italic (inline style, `TGMalromurItalicVF.ttf`) — list-row preview line | `.kol-sans-heading-03` → `--kol-font-family-sans-compact` = Right Grotesk Compact | `WorkListItem.jsx` preview |

`kol-theme` (`kol-typography.css:750-752`) declares only the Right Grotesk sans stacks — no
display-face slot exists, and neither component exposes a class seam for its title/preview line.
The `@font-face` for both TG faces lives in the website's elder `packages/ui/theme.css`
(`/fonts/TGMalromur*VF.ttf` etc.).

**Backport (pick one):**
- **(a) Token slot** — add display-face tokens (e.g. `--kol-font-family-display`,
  `--kol-font-family-display-italic`) + type classes to kol-theme; WorkCard/WorkListItem author
  against them; faces default to the sans stacks so brand-neutral consumers see no change, and a
  brand layer (kol-brand?) maps the TG faces in.
- **(b) Class seam** — `titleClassName` on WorkCard, `previewClassName` on WorkListItem, so
  consumers can restore their own display type without forking.

(a) is the system answer; (b) is the 10-minute unblock. Both can coexist.

## 2. ParallaxShelf — wheel-gestures seam

The site's shelf rows (`Work.jsx` `ShelfRow`) ran Embla with **`embla-carousel-wheel-gestures`**
— horizontal mouse-wheel scrolling on the shelves. `ParallaxShelf` deliberately dropped the
plugin (not a DS dependency), so wheel scroll on shelves is dead on the adopted page.

**Backport:** a `plugins` pass-through prop on ParallaxShelf (forwarded to `useEmblaCarousel`),
so the website re-injects WheelGesturesPlugin from its own dependency — DS stays plugin-free.

## 3. AsciiClouds — lobby brief

`Work.jsx` renders `<AsciiClouds variant="drift" />` as the shelf-view backdrop. Upstream has
only `AsciiCursor`. AsciiClouds stays on the elder `@kol/ui` until kol-component grows it.

**Backport:** port AsciiClouds (elder: `packages/ui/src/…/AsciiClouds`) into kol-component's
organisms, sibling to AsciiCursor.

## 4. Accepted as-is — recorded, no DS action

- Casing renders verbatim (KOL no-text-transform rule): shelf-card meta + list-row title lose
  their `uppercase`, type labels pass through `TYPE_LABELS` at the call site.
- List-row tags render as DS `Tag` chips (`naked`, `sm`) instead of `' · '`-joined text.
- List row is its own anchor (`href` + `onNavigate`) — the site drops its `Link` wrapper.
- `active` border on list rows now actually works (the elder `isActive` prop was dead code).
- Missing thumbnails get `AssetPlaceholder` on shelf cards.
- `WorkViewToggle` replaces the navbar's hand-rolled pill control; `WorkViewContext` stays as
  the app-side state owner.

---

## 5. RESOLUTION — DS side executed 2026-07-15 (kol-content 0.2.0)

Items 1(b) + 2 shipped in `@kolkrabbi/kol-content` **0.2.0** (additive, no breaking changes).
Item 3 (AsciiClouds) **rejected** — user call: not design-system material; it stays on the
elder `@kol/ui`. Item 1(a) (theme display-face tokens) **not executed** — the class seam
unblocks `/work`; revisit tokens only if a second consumer needs a display face.

### What the website does once 0.2.0 is on npm

1. `pnpm add @kolkrabbi/kol-content@^0.2.0` (or let the range float).
2. Declare classes for the TG faces (the site already hosts the `@font-face`s in
   `packages/ui/theme.css`), e.g.:
   ```css
   .work-display-title   { font-family: 'TGDylgjur', var(--kol-font-family-sans-narrow); font-weight: 400; }
   .work-display-preview { font-family: 'TGMalromur', var(--kol-font-family-sans-compact); font-style: italic; }
   ```
3. Pass the seams — the prop **replaces** the DS type class (color/layout stay
   component-owned), so the class only needs to carry type styling:
   ```jsx
   <WorkCard     titleClassName="work-display-title"     … />
   <WorkListItem previewClassName="work-display-preview" … />
   <ParallaxShelf plugins={[WheelGesturesPlugin()]} … />   // site's own embla-carousel-wheel-gestures dep
   ```
4. Defaults are the previous behavior (`kol-sans-display-02` / `kol-sans-heading-03` /
   no plugins) — omitting the props changes nothing.

| Brief item | Status | DS change |
|---|---|---|
| 1(b) class seam | ✅ shipped | `WorkCard.titleClassName` + `WorkListItem.previewClassName` (replace-not-append) |
| 1(a) token slot | deferred | none — revisit on a second display-face consumer |
| 2 wheel-gestures | ✅ shipped | `ParallaxShelf.plugins` → forwarded verbatim to `useEmblaCarousel` |
| 3 AsciiClouds | ❌ rejected | none — stays on elder `@kol/ui` |
