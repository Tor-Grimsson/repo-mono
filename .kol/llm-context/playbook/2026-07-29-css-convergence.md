# Playbook — CSS convergence (brand geometry → kol-framework package)

> **Live work journal.** Append-only, newest at the bottom, real timestamps. One idea per line, no prose.
> Milestone logs: `session-log/`. Branch: `brand-adoption` (git = his).

**Goal:** Geometry answers to the DS like components now do. Per-diff ruling on local `kol-framework.css` (643 lines drift) + `kol-brand-color.css` (57) vs the published kol-framework siblings: wanted drift goes UP into the package and publishes, unwanted dies, brand consumes the package CSS, local files shrink to explicitly-labeled brand-local residue or die.

**Standing rules (non-negotiable):**
- Classification per hunk: geometry/framework → package canon · brand-local component chrome (components only brand has) → stays local, labeled · dead (client-era, removed-feature) → dies.
- Brand's LIVE truth wins where it's deliberate (collapse removal, select-gate removal, rail-mode) — those go UP.
- Visual identity gate: computed geometry (page padding, sidenav width, container max) must measure IDENTICAL before/after · playwright screenshots both themes.
- Publishing kol-framework ships the user's finished tri-state ThemeToggle 0.6.0 (his authored work, complete in repo) — noted, deliberate.
- kol-site.css is NOT this arc (client-content layer; dies later).
- No git · publish/consume = mine.

---
## Entries

[22:11 GMT · 2026-07-29] · setup · playbook created
  what → initialised css-convergence playbook   why → next arc after elder flush, /kol-goal armed
  note → framework pkg at 0.6.0 unpublished (user's tri-state toggle — complete, ships with this arc's publish)

[22:20 GMT · 2026-07-29] · analysis · the 643-line drift decomposed
  what → selector-level diff: 79 local-only selector families — ALL verified present in kol-theme 0.11.24 (styleguide/foundry/molecules css) which brand already loads
  what → kol-brand-color.css: package is a STRICT superset (green/purple ramps + chart palette) — 0 local-only lines
  verdict → brand's local files held ZERO unique canon; only UP-migration needed = today's two deliberate removals the package still carried

[22:20 GMT · 2026-07-29] · package · kol-framework 0.6.1 PUBLISHED
  what → removed from package css: user-select gate + allowlist · :root[data-sidenav=collapsed] · .is-collapsed rules ×3 · .kol-sidenav-toggle rail rule — brand's live truth UP, comments date the removals
  note → user published 0.6.0 HIMSELF mid-arc (tri-state toggle; my publish 403'd on the existing version) — tarball-checked: his 0.6.0 predated the css edits → patched as 0.6.1 on top
  note → parallel user session also shipped icons 0.8.9/0.8.10 (stroke conformance + scribble-02 cull) — kol-ds-ui is co-active, tread light

[22:20 GMT · 2026-07-29] · consume · brand on package CSS
  what → index.css: ./brand/kol-brand-color.css + ./components/framework/kol-framework.css → @kolkrabbi/kol-framework/* · local pair ▣ _tmp/css-convergence-elder/ · Review captions truthed
  verify → IDENTITY GATE PASSED: pad-section-x 48px · band-y 104px · sidenav 260px · container 1600px · page padding 64px 48px · layout cols 260/1020 — ALL identical to pre-swap baseline · user-select auto ✓ · console 0 errors · styleguide screenshot intact
  verify → consumers web+brand on ^0.6.1 · full build 3/3 green ×2

──────────── GOAL DONE: geometry answers to the DS ──────────── [22:20]
  reference chain now: components → kol-component · type/color → kol-theme · geometry → kol-framework 0.6.1 · brand-local css = kol-site.css ONLY (client layer, dies later arc)
  note → 0.6.1 also delivers his tri-state toggle to both apps (cycle light→dark→system)
