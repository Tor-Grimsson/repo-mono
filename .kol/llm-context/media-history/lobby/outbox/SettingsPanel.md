# SettingsPanel — the display-settings drawer, staged for the DS

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SettingsPanel.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — shipped as `kol-component@0.69.0` + `kol-theme@0.53.0` the same day

## Why it went there

`src/SettingsPanel.jsx` is a local build — the drawer shell, section headers,
label+hint rows, the word Switch, the segmented Choice and the count chips are
all hand-rolled here on DS `Button` / `Divider` / `Icon`. The user wants the
same shape in other apps, with a **drawer** and an **overlay** presentation
from one anatomy (variant prop or a related pair). That's a DS component, so
the DS recreates it clean; the spec carries the exact classes and tokens.

Defects at the source — inconsistent case, some alignment, the segmented-toggle
variant — are the user's to fix in the DS repo, not here.

## What stays here

Once the DS version ships:

1. Adopt it in `App.jsx` / `FileList.jsx` (the `settings` / `profile` / `bucket`
   wiring stays local — it's consumer state).
2. Retire `src/SettingsPanel.jsx` to `_tmp/`.

Nothing here is on a deadline; the local panel keeps working until then.

## ✅ RETURNED — 2026-08-26 · kol-component@0.69.0 · kol-theme@0.53.0

`SettingsPanel` is a kol-component organism — one anatomy (title · subtitle · intro · `Section divided` stack · footer), two presentations: `variant="drawer"` rides the DS `ShellDrawer` (right-anchored, `width` 380 default; scrim, Escape, focus trap, scroll lock, focus return, the × control) and `variant="overlay"` rides `FullscreenOverlay` (centred; it now traps focus too — Tab cycles in the sheet, focus returns to the opener). Parts: `SettingsRow` (a grid, so a long hint wraps in its own column and the control centres on the row — the alignment defect), `SettingsSwitch` = `ToggleSwitch` sm (disabled state added to the theme, it had none), `SettingsChoice` = `SegmentedToggle` sm (the source's word-button segments were the thing to fix, not copy), `SettingsChipRow` (toggle chips with counts, the `.kol-control` pattern), `SettingsFooter` (state word + ghost reset). No `text-transform`; the hand-typed `rgba(0,0,0,0.6)` scrim, the hard 380 and the bucket/profile wiring are gone. Rendered headless in the showcase: drawer flush right at 380, overlay centred at 380, focus inside on open, Tab stays inside, Escape closes both.

**Remainder here:** bump kol-component to 0.69.0 (+ kol-theme 0.53.0), replace `src/SettingsPanel.jsx` with `<SettingsPanel>` + `Section divided` + `SettingsRow`/`SettingsSwitch`/`SettingsChoice`/`SettingsChipRow`/`SettingsFooter`, author the labels' casing at the call site (`Show kinds` / `On` / `Grid` — one register)

## ✅ RETURNED + REMAINDER DONE — 2026-08-26

DS closed it same day: `SettingsPanel` organism in `kol-component@0.69.0` (+ `kol-theme@0.53.0`) — `variant="drawer"` on `ShellDrawer`, `variant="overlay"` on `FullscreenOverlay`; parts `SettingsRow` (grid — the alignment fix), `SettingsSwitch` = `ToggleSwitch`, `SettingsChoice` = `SegmentedToggle`, `SettingsChipRow`, `SettingsFooter`.

Here: bumped to `kol-component@0.78.0` / `kol-theme@0.58.0` (versions pinned in `pnpm-workspace.yaml` `minimumReleaseAgeExclude` — the gate hid them from `pnpm outdated`). `src/SettingsPanel.jsx` is now a 130-line adapter over the DS organism carrying only the bucket/profile wiring; the old 220-line local build is at `_tmp/2026-08-26-settingspanel-local/`. Labels cased at the call site in one register (`Show kinds` · `Grid` · `Poster` · `All`). Deployed; verified in a browser on `admin.kolkrabbi.io`.
