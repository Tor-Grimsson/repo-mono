# Playbook — brand-adoption (elder package flush + DS swap)

> **Live work journal.** Append-only, newest at the bottom, real timestamps. One idea per line, no prose.
> Milestone logs: `session-log/`. Branch: `brand-adoption` (user-created, git = his).

**Goal:** Delete the elder supply so the demand reveals itself — quarantine every visual `@kol/*` package from `packages/` (ui · component · fontviewer · loader; `@kol/content` schema EXEMPT), let the build scream, fix every scream against `@kolkrabbi/*`, green + playwright-verified = the phase-out finally true repo-wide.

**Standing rules (non-negotiable):**
- USER LAW (2026-07-29): no more legacy consumer compromises — supply dies FIRST, consumers fix after. The error list IS the census.
- `@kol/content` untouched — schema exemption, TS tier.
- Quarantine = `_tmp/`, never delete outright · never git · publish/consume = mine.
- Build green ≠ done: playwright on brand dev (pages render, icons paint, console clean) before any report.
- CSS convergence (local kol-framework.css 643-line drift vs package) = NEXT arc, not this one.

---
## Entries

[22:00 GMT · 2026-07-29] · setup · playbook created
  what → initialised brand-adoption playbook   why → elder-flush arc, /kol-goal armed
  note → packages/ census at start: component · content · fontviewer · loader · ui

[22:07 GMT · 2026-07-29] · flush · packages/ → _tmp/packages-elder-flush/
  what → ▣ ui · component · fontviewer · loader OUT of the workspace (content stays, schema exemption)
  scream 1 → manifest level: pnpm install failed on brand's @kol/component decl — census: brand was the ONLY dead declaration (web/studio = @kol/content only, as promised)
  fix → brand package.json +@kolkrabbi/kol-component ^0.12.19 · vite exclude +kol-component · 18 files import-rewritten '@kol/component'→'@kolkrabbi/kol-component' · PKG display string + Review captions truthed
  verify → repo-wide grep: ZERO non-content @kol/* references left outside _tmp

[22:07 GMT · 2026-07-29] · screams · build + runtime
  build → NO screams — turbo 3/3 green first try (prop contracts held across all 26 components)
  runtime → playwright all 8 routes render (/, styleguide, assets, library, gallery, review, reference, components)
  scream 2 → DS Input dropped elder's `uppercase` auto-transform prop (correctly, per casing law) → React non-boolean-attr error · fixed: prop removed at 4 Components.jsx demo call sites (chars kept — DS supports it)
  noise → ~80 r2.kolkrabbi.io CONNECTION_RESET on /library thumbnails = external bucket, pre-existing, NOT flush-related · FeatureSplit key bug = known, review-relevant

──────────── GOAL DONE: elder flush — phase-out true repo-wide ──────────── [22:07]
  packages/ = content ONLY · runtime proof: 13 kol-component modules served from node_modules/@kolkrabbi on /components · 0 console errors on components+styleguide · final build 3/3 green 36s
  next arc (parked): CSS convergence — local kol-framework.css (643-line drift) + kol-brand-color.css (57) vs kol-framework package · then orphan review on true foundation
