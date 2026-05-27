# kol-generator-acstrip — Architecture

Load-bearing decisions and constraints. Anything in this document is "we chose this
deliberately and it has downstream consequences." Do not revisit without explicit
reason. For decision history (alternatives considered, rejections, evolution), see
`../history.md`.

---

<!--
Structure each decision as:

  ## §N — [short rule / invariant]

  [One-to-three-sentence statement of what the rule is and why it holds.]

  **Consequence:** [what this enables or forbids downstream]

  **Do not revisit** unless [specific condition that would flip it]

Keep sections short. If a section grows into a session-log-style narrative, it
belongs in a session log, not here.
-->

## §1 — Repository purpose

`kol-generator-acstrip` is the isolated home for the **unified editor
(`/editor/:mode` — compose, palette, pattern, type)** plus the brand-portal
pages (Landing, Styleguide, Gallery, Library, Reference, Components,
Icons, Demo). It was stripped from the parent `kol-ac` brand site. The
marketing site, asset guides system, and AC-specific identity are removed;
the KOL design system (`src/styles/kol-*.css`) is retained.

**Consequence:** Anything related to the marketing site (`/site/*`) or
`Another Creation`-specific brand identity is out of scope by default.
New top-level surfaces are page-shaped (`src/pages/Foo.jsx`, route in
`src/App.jsx`, sidebar entry in `sidebars.config.js`); new editor surfaces
live under `/editor/:mode`. Legacy `/generators/*` and `/compose` paths
are kept as `<Navigate>` redirects into `/editor/*` only — no `src/generators/`
folder exists.

**Do not revisit** unless the project pivots back into a full brand-site repo.

---

## §2 — Text casing is a content concern, not a UI concern

UI components do not transform the case of text content. No
`text-transform: uppercase`, no `text-transform: capitalize`, no
`::first-letter` tricks, no JS-side string mutation of children. Components
render the string the consumer authored, verbatim.

This matches common practice across real design systems (Material, Carbon,
Radix, Tailwind UI) and the requirements of i18n (translators provide
pre-cased strings; UI-side transforms break in languages where casing
doesn't apply).

**Consequence:** Buttons, labels, eyebrow text, prefix/suffix slots — all
of it — accepts the string as-is. If a label should read "Save changes",
the call site writes "Save changes". UI atoms have no `uppercase` /
`capitalize` props.

**Do not revisit** unless the repo grows a CMS or i18n layer that requires
soft enforcement against badly-cased input — at which point an opt-in
utility class is acceptable, but never a default.

---

## §N — Non-goals (do not reopen)

Stated design limits. Opening discussion on any of these requires explicit user ask:

- Marketing site (`/site/*`) is not coming back.
- Guides overlay system (cut / bleed / safe / clear marks) — removed 2026-04-30. Was AC-asset-register-specific; out of scope for this repo. `src/components/guides/`, `kol-guides.css`, `GuidesHop.jsx`, `StandardAsset` + `AssetSpecTable` deleted; styleguide asset chapters now show bare mocks without overlays/specs.
- Multi-brand support — this repo is single-brand (Kolkrabbi).
