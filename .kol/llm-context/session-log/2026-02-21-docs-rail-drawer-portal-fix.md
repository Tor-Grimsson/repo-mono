# Session Log - 2026-02-21

## Agent Info
- **LLM Used**: Claude Sonnet 4.6 (plan) → Claude Opus 4.6 (implementation)
- **Session Started**: 2026-02-21
- **Session Ended**: 2026-02-21
- **Message Count**: ~8

## What Was Accomplished

### Fixed DocsRailDrawer — two compounding bugs

The mobile navigation drawer in the documentation system was visually broken (content clipped, no visible backdrop, panel only ~41px wide). Two separate root causes were identified and fixed.

**Bug 1: Stacking context trap**
`DocsShell.jsx` uses `fixed inset-0` on its root element. Per the CSS spec, `position: fixed` always creates a new stacking context. `DocsRailDrawer` was rendered as a child of this container, so its `fixed` children (backdrop + panel) were confined to DocsShell's stacking context and clipped by the `overflow-hidden` content wrapper.

**Fix:** Rewrote `DocsRailDrawer` to use `createPortal(…, document.body)` — the drawer markup now renders directly on `<body>`, completely escaping DocsShell's stacking context.

**Bug 2: Tailwind v4 `max-w-md` breaking change**
`max-w-md` in Tailwind v4 no longer resolves to `28rem` (448px). It uses the spacing scale and computed to `16px`, collapsing the panel to ~41px wide (just the horizontal padding).

**Fix:** Replaced `max-w-md` with explicit `max-w-[28rem]`.

**Also added:** `useEffect` scroll-lock — sets `document.body.style.overflow = 'hidden'` while drawer is open, restores on close.

### Verification method
Installed `@playwright/test` temporarily, wrote a diagnostic test that:
- Measured computed panel width (revealed 41px vs expected 390px)
- Inspected all ancestor elements for transform/filter/perspective that could create containing blocks (none found — pure Tailwind v4 regression)
- Confirmed portal renders as `body > div.lg:hidden` escaping DocsShell
- Took a screenshot confirming visual result

Then wrote verification tests (3 tests, all passing):
1. Mobile drawer opens with correct-width panel, backdrop, nav content, close button
2. Desktop: hamburger hidden
3. Scroll lock: body overflow locked while open, restored on close

Uninstalled `@playwright/test` and removed all test artifacts after confirmation.

## Files Changed
- `apps/web/src/components/workshop/docs/DocsRailDrawer.jsx` — Full rewrite: `createPortal`, `max-w-[28rem]`, scroll-lock `useEffect`, z-index bump (`z-[100]`/`z-[200]`)

## Current State
**What's Working:**
- Mobile (<1024px): hamburger tap → backdrop covers full viewport → panel slides in at full width with nav groups → close via × or backdrop tap
- Desktop (≥1024px): hamburger hidden, sidebar renders inline — drawer not used
- Scroll lock prevents page scroll behind open drawer
- Dark mode: `bg-black/50` backdrop visible, `bg-surface-primary` panel with `border-r border-fg-08` edge

**What's In Progress:**
- None

**What's Broken/Blocked:**
- None known

## Next Steps
- No immediate follow-up needed for the drawer

## Open Questions/Blockers
- None

## Notes
- **Tailwind v4 named size regression** is a recurring trap. `max-w-sm/md/lg/xl` and similar named sizes may all behave differently in v4. Always use explicit bracket values for fixed-size UI elements (e.g. `max-w-[28rem]`) rather than named aliases when working with this codebase.
- **Portal pattern is now established** — this is the first `createPortal` usage in the codebase. Any future modals, tooltips, or overlays that need to escape a stacking context should follow the same pattern: `createPortal(jsx, document.body)`.
- The two-step diagnosis (first fix the architectural issue, then discover the Tailwind regression via Playwright computed style inspection) shows value of running `getComputedStyle` to catch CSS resolution issues that aren't visible from class names alone.
- `WorkshopSidebar` uses `z-[100]`/`z-[200]` as its overlay convention — DocsRailDrawer now matches.
