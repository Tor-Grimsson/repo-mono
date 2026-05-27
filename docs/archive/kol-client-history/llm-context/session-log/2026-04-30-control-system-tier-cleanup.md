# Session log — Control system + tier cleanup + guides removal

**Date:** 2026-04-30
**Phases:** 3a / 3b / 3c / 3d / 3e
**Scope:** Shell primitive + atom/molecule extraction + dead-class
deletion + full guides system removal.

---

## What shipped

### System primitives

- **`.kol-control` shell** in new `src/styles/kol-components-atoms.css`.
  3 variants (`--filled` / `--ghost` / `--outline`) × 3 sizes
  (`-sm` / `-md` / `-lg`). Single source for chrome on chromed controls.
- **Opacity hierarchy rule** codified — content full-ink, affordances
  `text-meta`. Table in `01-components-atoms.md §11`.
- **Padding scale unified** — Button + shell + control molecules now
  share `4/12 · 6/16 · 8/20`.
- **Reading hierarchy descriptors trimmed** — `text-mute` retired
  (0 consumers); descriptors are text-only now (bg/border/ring families
  dropped — consumers reach for numeric `--kol-fg-NN` instead).

### Atoms / molecules refactored to use shell

- `Input.jsx` — was orphan, ported from kol-editor sibling, now uses
  shell. Filled / ghost / outline variants. `prefix`/`suffix`/`chars`/
  `width` props. Inner-input balanced padding to compensate dim
  affordance weight.
- `Stepper.jsx` — new (ported). Shell-based, sizes scale chevrons (8/10/12).
  Chevrons absolute-positioned so size doesn't tug shell height.
- `Label.jsx` — new (ported). Minimal `text-fg-48` wrapper.
- `PropertyInput.jsx` — new (ported molecule). Composes Label + Stepper/Input.
- `ToggleBracket.jsx` — shell-based, `.toggle-bracket--active` modifier.
- `ViewToggle.jsx` — text variant uses shell; icon variant uses inset
  "well" pattern (`bg-fg-04` container + `bg-fg-absolute-24` active).

### Atoms with custom shape (touched but not shell)

- `Button.jsx` — variant swap (primary ↔ secondary; daily-chrome
  promoted, heavy-ink demoted), font-weight 500 on heavy variants,
  uppercase removed, 4px radius (no longer pill).
- `ToggleSwitch.jsx` ON state — pill `--kol-color-absolute-white`,
  indicator `--kol-color-absolute-black` (theme-invariant).
- `ToggleCheckbox.jsx` ON state — same inversion (white box, black check,
  no border).
- `ThemeToggle.jsx` — `compact` + responsive default variants deleted;
  `hop` adopts pure Button primary; `icon` kept.

### Icon registry

- `00-kol/` folder created. First curated stroke icons:
  `chevron-up.svg`, `chevron-down.svg` (24×24 viewBox, stroke-width 2.5).
- `00-rack/` renamed → `99-rack/`. Eurorack legacy demoted in glob order.
- Duplicate chevrons removed from `01-navigation/` and `00-rack/`.

### Guides system — full feature removal

- **Deleted:** `src/components/guides/` (4 files: AssetSpecTable,
  GuideStage, GuidesContext, StandardGuides), `GuidesHop.jsx`,
  `kol-guides.css`.
- **Edited consumers:** `index.css`, `BrandLayout.jsx`, `SideNav.jsx`,
  `Styleguide.jsx` (asset register chapters now show bare mocks; spec
  tables + guide overlays gone), `kol-framework.css` (`.kol-sidenav-guides`),
  `ARCHITECTURE.md` (non-goal entry updated).
- Orphan `ASSET_SPECS` data in `branded-assets.js` left in place for
  future cleanup.

### CSS file structure

- `kol-components.css`: 1228 → ~155 lines (-87%). Holds long-tail residual
  only (plain `.checkbox`, `.kol-label-*`, `.icon-default/-hover` utility).
- `kol-components-atoms.css`: ~85 → ~520 lines. Now holds shell + Button
  + Toggles + Slider.
- `kol-components-molecules.css`: new (~190 lines). Pill + Tag + Badge.
- `kol-components-organisms.css`: unchanged (Table).
- `kol-opacity.css`: ~412 → ~360 lines. Dropped 30+ unused descriptor rules.

### File rename

- `kol-fonts-full.css` → `kol-typography-fonts-full.css`. Single import in
  TypeLab.jsx updated.

### Demo updates

- `Demo.jsx` "00 — control system" section restructured to match a polished
  showcase pattern (mini-headers + prose explainers per subsection).
- `Demo.jsx` "01 — Button" section restructured (4-column grid with column
  alignment for variants × sizes; new "With icons" + "Icon only" subsections).
- `Demo.jsx` "02 — Toggles" section restructured to match the same pattern.
- `Demo.jsx` "03 — inputs & steppers" section absorbed into "00 — control
  system" (atoms + PropertyInput live there now).

### Documentation

- `01-components-atoms.md` — refreshed with Status section + completion
  checkmarks on action list.
- `02-components-molecules.md` — new (molecules audit, SIZE_MAP duplication
  problem, composition opportunities).
- `03-components-organisms.md` — new (Table extraction history, organism
  inventory, generator + guides organisms).
- `04-css-tier-audit.md` — new (CSS file structure audit, dead-class
  inventory, framework promotion candidates).
- `05-deletion-plan.md` — new and now in `executed` status (per-block
  shipped/kept summary).
- Memory notes added: `feedback_no_auto_text_transform.md`,
  `feedback_visual_tweaks_inline.md`, `feedback_typography_system_locked.md`,
  `feedback_visual_between_sections.md`.
- Global `~/.claude/CLAUDE.md` — added "no auto text-transform" rule.
- Repo `ARCHITECTURE.md §2` — added text-casing-is-content-concern invariant.

---

## Known issues / pending

- `Checkbox.jsx` plain atom — only used in Demo. Verify intended.
- `ButtonNav.jsx` molecule — 0 importers per audit. Verify and delete.
- `Dropdown` / `DropdownTagFilter` / `QuantityInput` / `QuantityStepper` —
  duplicate SIZE_MAP pattern (4 molecules), violate the 4px radius rule.
  Pending shell migration.
- `branded-assets.js` `ASSET_SPECS` — orphan data after guides removal.
- Framework-tier `.kol-sidenav-hop` family is component-like; tier
  promotion decision deferred.

---

## Next steps

1. Verify the build / dev server runs cleanly after this much surgery.
2. Visual regression check: `/styleguide` (asset chapters), `/reference`
  (opacity descriptors, fg-classes table), `/demo` (control system,
  buttons, toggles).
3. ButtonNav cleanup if confirmed dead.
4. Dropdown shell migration (the largest remaining ad-hoc CSS-in-JS pile).
