# LabeledControlSection — rename SettingsSection

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/LabeledControlSection.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` in kol-ds-ui — kol-component 0.112.0, 2026-08-27

## Why it went there

User ruling: `SettingsSection` is the wrong name. It names where the component
was first used, not what it is — a section of `LabeledControl`s. kol-fxr took
it for its parameter rail the same day, which is not a settings drawer, and the
name already misleads there. Rename to `LabeledControlSection`. **No alias** —
the old name goes. Name only — the composition `SettingsPanelApproved` locked
at 0.104.0 does not move.

## What stays here

On publish: bump kol-component and swap `SettingsSection` → `LabeledControlSection`
in `src/SettingsPanel.jsx` (four call sites — Structure · Loading · Layout ·
Write).

**Remainder here:** none yet — nothing is owed until the DS returns it.

---

## ✅ RETURNED — 2026-08-27 · kol-component 0.112.0

🟢 `closed` in **kol-ds-ui** — `SettingsSection` → `LabeledControlSection`, no alias, render untouched (the 0.104.0 locked composition). Barrel, showcase demo, docs and classification follow; `SettingsRow` / `SettingsSwitch` / `SettingsChoice` and `InspectorSection`'s label voice noted in the changelog, not touched (not asked). 21 gates clean; verified in source.

**Remainder here:** bump kol-component 0.112.0 and swap the import in `src/SettingsPanel.jsx` (`SettingsSection` → `LabeledControlSection`). kol-fxr owes the same swap in `src/editor/params/AutoControls.jsx` — BREAKING, no alias; it has no receipt of this, tell it.

## ✅ RETURNED + DONE — 2026-08-27 · kol-component 0.112.0

Bumped 0.108.0 → 0.111.0 → 0.112.0 (+ kol-theme 0.73.0); all nine occurrences in `src/SettingsPanel.jsx` swapped, no stray left (the only `SettingsSection` in the tree is the comment recording the rename). Lint, both test files and `pnpm build` green. **kol-fxr still owes the same swap** in `src/editor/params/AutoControls.jsx` — BREAKING, no alias, and it has no receipt of this.
