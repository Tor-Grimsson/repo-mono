# Handoff — 2026-07-31 01:12

## Goal of the current arc

Take the ThemeToggle / IconFrame chrome to what the user actually wants — no interactive
states anywhere, full-strength ink, and a sidebar built from real DS atoms rather than
anonymous spans — then give him surfaces he can *see* so he can rule without a round trip.

## Last actions taken (causal trail, newest first)

- **Rebuilt the dial panel into the accent picker** (`_tmp/accent-contrast-proposals/preview.html`).
  Free-value colour input + hex field that sets the LIGHT value directly; every surface
  below re-renders (both panes, sidebar row, both text rules, both tables, pair block).
  `nudge to 4.5:1` walks the same hue down in lightness until it clears the text bar
  (verified `#CF510B` → `#C74C0A`, 4.16 → 4.50). `use this value` copies the binding line.
  Clicking any of the six candidates takes control back from the dial.
- **`IconFrame` gained a `radius` prop** — `sm` (4px, default) / `full` (9999px). Published
  theme **0.13.7** + component **0.15.2**; bumped + installed here. Sidebar chevron swapped
  from a hand-rolled 24px circle to `<IconFrame variant="secondary" size="lg" radius="full" />`;
  the button now carries behaviour + placement only (`right-[-18px]`, half the 36px square).
- **`hop-bare` now honours `size`** (framework **0.10.3**): pad-y 4/6/8, type 12/14/16, glyph
  14/16/18 — it previously hardcoded `kol-mono-14` and took the SOLO glyph ladder despite
  carrying a label. The 24px horizontal gutter stays fixed at every size; that's the
  alignment contract with the sidenav's `pl-6`. `hop` untouched (pinned md by its contract).
- **Sidebar ThemeToggle → `variant="hop-bare"`** on the user's pick, and the slot lost its
  own `px-6` so the alias's padding isn't doubled.
- **Found and fixed a systemic Tailwind gap:** neither app declared `@source`, so *every*
  utility living only in `@kolkrabbi` package JSX was never generated. `hop-bare` exposed it
  (padding computed `0px`, label centred). Added three `@source` lines to
  `apps/brand/src/index.css`. **apps/web still has the same gap.**
- **ThemeToggle made stateless, reverted, then redone** — the user asked for a backtrack,
  then reversed it. It now emits `.kol-theme-toggle{,-none,-subtle,-flush}` instead of
  `.kol-btn` + `.kol-btn-nav`/`.kol-btn-primary`, with **full-strength ink** on `none`
  (it inherited `oq-64`, a dim that only existed so hover could brighten it).
- Earlier in the session: board collapse, stale purge, theme-boot fix, sidenav collapse
  restore, `/review` deleted, two lobby briefs filed (both returned).

## Current state / open decision points

**Stack, all installed and `pnpm -r outdated` clean:** theme 0.13.7 · component 0.15.2 ·
framework 0.10.3 · icons 0.8.11 · brand 0.1.2.

**NOT visually verified — the one loose end.** The sidebar chevron was swapped to the round
`IconFrame` and never rendered; the user rejected that dev-server run. Everything else this
session was playwright-verified. **Do not report the chevron as confirmed.**

**Open user decisions:**

1. **The light accent value.** `#FFCF33` is 1.41:1 on `#fafafa` (needs 3 for icons, 4.5 for
   text). Six candidates plus the new dial are staged in the preview; nothing bound yet.
   Binds at `kol-brand-color.css:107`.
2. `chevron-left` vs `panel-left` for the collapse control — still unanswered, so it's
   still `chevron-left`.
3. Gallery's fate · `Landing.jsx:35` uppercase · hoisting the shared 9.5M of statics.

**apps/web needs the `@source` fix** — same latent bug, only brand was patched.

## Next intended action

Run brand dev app-scoped, look at the sidebar, confirm the round chevron renders at 36px
with the ink fill and that `hop-bare` still sits on the 24px gutter. Then AGENT-CONTEXT's
stack line needs updating — **it still reads component 0.14.3 / framework 0.9.1 / theme
0.13.3 and is now four waves stale.**

## Working memory not yet in AGENT-CONTEXT

- **`kol-theme` is pinned EXACT in both `package.json` files** (no caret). A caret-only sed
  silently skips it — cost me two wasted cycles today. Bump it by literal version string.
- **kol-ds-ui uses changesets but `changeset publish` tags in git.** The agent path is
  `pnpm --filter <pkg> publish --no-git-checks --access public`. I bump the version by hand;
  the changeset I wrote for the stateless work was deleted during the revert and never
  recreated, so **0.13.5→0.13.7 and 0.10.1→0.10.3 have no changeset entries.**
- **The theme CSS is layered (`@layer components`).** Any unlayered rule beats it regardless
  of specificity — this bit me twice inside the standalone preview (`button { background }`
  wiped the fills; `button { font: inherit }` pinned every specimen to 16px). Relevant to any
  consumer writing plain element selectors.
- **Published theme 0.13.4 ships a truncated final rule** — `.kol-icon-frame-danger` is
  missing its `border` line and closing brace. Harmless (browser recovers) and fixed from
  0.13.5 on, but it means 0.13.4 is malformed on the registry.
- **`variants-2026-07-30.html` in kol-ds-ui `_tmp/toggle-library-proposals/` is a SNAPSHOT** —
  all 18 CSS files inlined so it opens by double-click. It will not track theme changes;
  regenerate it after any theme edit. The old `preview.html` beside it is the pre-ruling
  three-position build and is kept deliberately, not overwritten.
- **The user's dev server on 5174 ran all session** — never touch it. Agent work used
  5394–5399, all killed and verified clear.
- Dark-mode scare resolved: `localStorage['kol-theme']` was left on `dark` by my own cycle
  test in the automated browser. Nothing in the repo forces a theme.
