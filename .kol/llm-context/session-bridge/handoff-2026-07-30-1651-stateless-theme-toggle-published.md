# Handoff — 2026-07-30 16:51

## Goal of the current arc

Strip every interactive state from `ThemeToggle` (user ruling: *"no variant at all
should have an interactive state — it's just a click 1-2, and it's themed"*), publish it
from kol-ds-ui, and consume it here. **Published and installed; the one thing NOT done is
the live playwright check on brand's sidebar** — the user interrupted the dev server
before it ran.

## Last actions taken (causal trail, newest first)

- **Killed brand dev on 5399 (PID 32496) mid-verification** — user interrupted to call
  this handoff. His own 5174 was never touched.
- **`turbo build --force` green, 3/3, 47.2s** on the new packages. Build only — the
  standing "build green is a half-proof" check did **not** complete.
- **Bumped + installed here:** theme `0.13.4→0.13.5`, framework `0.10.0→0.10.1`.
  `pnpm -r outdated` clean. Confirmed the change actually arrived in `node_modules`:
  5 `kol-theme-toggle` hits in the installed CSS, 7 in the installed `ThemeToggle.jsx`.
- **Published from kol-ds-ui** with `pnpm --filter … publish --no-git-checks --access public`
  (never `npm publish` — the law). Verified no `workspace:*` leak: the published
  framework's deps resolved to `kol-component@0.15.0` / `kol-icons@0.8.11`.
- **Made ThemeToggle stateless.** Added `.kol-theme-toggle{,-none,-subtle,-flush}` to
  `packages/theme/kol-components-atoms.css` (directly after the IconFrame block it
  mirrors); `packages/framework/src/ThemeToggle.jsx` emits those instead of `.kol-btn` +
  `.kol-btn-nav`/`.kol-btn-primary`. Changeset at
  `.changeset/stateless-theme-toggle.md`. Docstring synced.
- Before that: consumed the 0.10.0/0.15.0 wave, migrated web's `SectionTitle` onto the
  new `IconFrame`, filed both lobby briefs, restored the sidenav chevron, fixed the theme
  boot, purged the stale backlog.

## Current state / open decision points

**The only unfinished step: playwright-verify brand's sidebar toggle.** Everything points
to it being right — the same check passed in the DS showcase before publishing (hovered
with `:hover` reading true, background/colour/border identical to rest; zero elements
still carrying the three state classes; resting appearance byte-identical for both fills)
— but that was the showcase, not this repo. **Do not report the consumer surface as
verified until it is.**

**Three things still owed by the user, unchanged:**

1. **The light-mode accent pick.** `#FFCF33` is 1.41:1 on `#fafafa` (needs 3 for icons,
   4.5 for text). Six candidates ≥4.5 staged at
   `_tmp/accent-contrast-proposals/preview.html`. Binds at `kol-brand-color.css:107`.
2. **`chevron-left` vs `panel-left`** — blocks inserting `IconFrame`
   (`variant="secondary" size="lg"`) below the sidebar chevron. Nothing else blocks it.
3. Gallery's fate · `Landing.jsx:35` uppercase · hoisting the shared 9.5M of statics.

## Next intended action

Start brand dev app-scoped on a task port, hover the sidebar toggle, assert
background/colour/border are unchanged while `:hover` is true, then kill the PID. If it
passes, the arc is closed and AGENT-CONTEXT's stack line needs theme 0.13.5 /
framework 0.10.1 written in — **it currently still says 0.13.4 / 0.10.0.**

## Working memory not yet in AGENT-CONTEXT

- **`kol-theme` is pinned EXACT in both `package.json` files** (no caret). A caret-only
  sed silently skips it — cost me a wasted install cycle earlier today. Bump it by literal
  version string.
- **kol-ds-ui uses changesets** (`version-packages` / `release`), but `changeset publish`
  tags in git. The repo's established agent path is
  `pnpm --filter <pkg> publish --no-git-checks --access public`, which touches no git. I
  bumped the two `package.json` versions by hand and left the changeset as the record —
  so **the changeset is unconsumed**; whoever runs `changeset version` next will see it
  and should not double-bump.
- **`.kol-btn` itself is untouched** and must stay that way — stripping hover there would
  kill every real Button. The fix was surgical: three classes off ThemeToggle only.
- **Two DS docstrings have now been caught stale today** (Dropdown claims its trigger
  takes button hover/active/focus "from the button rules"; ThemeToggle's claimed `subtle`
  suited the brand sidebar). Treat DS docstrings as a lead, not a fact — read the CSS.
- The user's own dev server on **5174** has been running all session. Never touch it;
  agent work goes on 5397/5398/5399.
