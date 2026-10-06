# Handoff — 2026-07-30 12:26

## Goal of the current arc

Close out the apps/brand audit — take every item that was agent-owned to done, and
make the closed ones *provably* closed so no future session mistakes history for a
backlog. The arc is finished; what remains is three user rulings.

## Last actions taken (causal trail, newest first)

- **Squared the records** (the reason this handoff exists). `plans/brand-audit-inventory.md`
  got a ⛔ box at the top naming the only three open items; §§2,4,5,6,7,8 each got an
  inline `✅ CLOSED` line stating what shipped, with the 07-29 prose kept beneath as
  provenance. AGENT-CONTEXT's "Awaiting user rulings" section was rewritten from a
  stale seven-item list to the true three, and the 07-30 milestone entry carries a
  ⚠ SUPERSEDED note so its two "FAIL" verdicts aren't re-reported as live.
- **Fixed a regression the last bump introduced**: framework 0.9.0 flipped
  `ThemeToggle`'s default variant `icon` → `button`. Web's six bare `<ThemeToggle />`
  call sites (Navbar ×4, WorkshopHeader ×2) silently became padded labeled buttons in
  the navbar. All now pass `variant="icon"`; verified on `/stack`.
- **Updated everything**: theme 0.13.3 · component 0.14.1 · icons 0.8.11 · framework
  0.9.0. `pnpm outdated` clean for the scope.
- **Closed the /kol-goal 7/7.** Width tokens adopted, full-bleed unified, container-max
  re-declaration deleted, viewport trick confirmed dead, a11y pass, Library wrapper,
  casing + color.
- **Published framework 0.8.1 from here** to unblock the full-bleed item — `.kol-full-bleed`
  now takes its inset as a parameter. 0.8.0 was burned first (`npm publish` leaked
  `workspace:*`), the DS agent has since deprecated it.
- **Killed SigTicker + LogoCarousel** on user verdict, which emptied the last `.site-*`
  family and took `kol-site.css` from 1040 lines to 39 as `styles/landing.css`.
- **Killed the seven twin-duplicates** and PortalIndex before that — 12 files total to
  `_tmp/brand-orphan-elder/`.

## Current state / open decision points

**Three open items, all user rulings, all recorded in AGENT-CONTEXT's "Awaiting user
rulings — THE COMPLETE LIST" and mirrored in the inventory's ⛔ box:**

1. Theme boot — `apps/brand/index.html:2` hardcodes `data-theme="dark"` against the
   explicit > system > light law. One line.
2. Gallery's fate — colors and casing are conformant now, but it's still all inline
   styles, no `PageSection`, bypasses `usePageTitle`, and fetches `/__photos.json` from
   a dev-only vite plugin. Rebuild / denavigate / kill.
3. `Landing.jsx:35` — `{BRAND.name}` under an `uppercase` class. Content decision; the
   name is shared with page titles and the footer.

**Nothing is owed to or from kol-ds-ui.** Everything filed from this side is resolved
or archived; that lobby holds one entry (`InteractiveImage`, web-side, parked since
07-03).

**Deferred, not blocked:** `/review` still exists at 50 lines, holding the casing demo
and the live-non-DS index. It dies when items 2 and 3 land.

## Next intended action

Take a user ruling on any of the three and execute it — they're independent. Item 1 is
a one-liner and the highest-value (it's a standing-law violation on every fresh visit).

If instead the next session opens on new work: **read the ⛔ box in
`plans/brand-audit-inventory.md` before touching brand.** The single biggest failure
mode here today was re-reporting closed items as open.

## Working memory not yet in AGENT-CONTEXT

- **`_tmp/brand-orphan-elder/` holds 12 files** and `_tmp/brand-staging-icons/` holds
  3,472 SVGs. Both gitignored, both inert. Nothing imports them. They're recoverable if
  a verdict flips, but nothing depends on that.
- **The DS's default-flip pattern has now bitten twice in one day** — Pill (`md`→`sm`)
  and ThemeToggle (`icon`→`button`). Both were silent: build green, no console error,
  wrong pixels. After any framework/component bump, grep for call sites that rely on
  defaults, not just for renamed exports.
- **`styles/landing.css` mirrors `apps/web/src/styles/ui.css`'s `.stack-hero-overlay`.**
  They're two copies of the same 32/80 theme-conditional wash. If one changes, change
  the other, or promote it DS-side.
- **Web pads with `.breakpoint-padding` (16/20/24) and uses zero `.kol-page` classes.**
  Brand uses `.kol-page` and the DS `--kol-pad-section-x` ladder (20/32/48). Two apps,
  two inset systems. It's handled for full-bleed (web declares
  `--kol-full-bleed-inset`), but any future DS rule that assumes the DS ladder will
  trip on web the same way.
- **`Components.jsx:583`** describes ThemeToggle as having "icon + hop variants" —
  stale after 0.9.0's 2-variant rebuild. User-facing copy, deliberately not touched.
