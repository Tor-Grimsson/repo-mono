# SettingsPanelApproved — the locked drawer, filed as the reference

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SettingsPanelApproved.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.104.0` + `kol-theme@0.71.0`

## Why it went there
Built and ruled locally, then locked. The organism's default composition should be this; the consumer's copy goes once it is.

## What stays here
On publish: bump; `SettingsPanel.jsx` back to a thin adapter; drop the `.kol-popover-float`, `.kol-overlay`, `.kol-prose` overrides in `index.css`; delete the file-pick seed click in `FileList.jsx`.

## ✅ RETURNED — 2026-08-27 · kol-component 0.104.0 · kol-theme 0.71.0

The organism is the approved drawer: title only + a Divider under it; SettingsSection = kol-eyebrow text-fg-80 standing apart (gap-3) from a row stack (rowGap 1 / 2); SettingsRow = LabeledControl inline (uppercase helper-10 label at 160, hint on the control's title, switches at the far right, dropdowns fill via align="fill"); SettingsChoice a full-width Dropdown sm primary; SettingsMulti = one Dropdown of toggling entries (N of M kinds, ✓ on the on ones); SettingsFooter = Divider + refresh IconFrame; SettingsSwitch keeps title; ShellDrawer takes edge / shadow and the drawer passes neither. Defects: (1) .kol-popover-float z 210. (2) the lightbox scrim: the theme's .kol-overlay has been flat --kol-surface-primary since 0.65.0 and 0.70.0 did not touch it — there is no 88% ink rule on it in the theme; the wash you measured is not the DS's rule (the ShellDrawer backdrop .kol-overlay-scrim is #000 60%, a different element) — drop the override and re-measure on the bump; if it persists, it's a consumer stylesheet. (3) .kol-column-browser-preview .kol-prose zoom .5 and .kol-overlay .kol-prose on the content measure + 24px padding. (4) ColumnBrowser: picking a file in a column with an open folder collapses that folder and keeps the cursor on the file. (5) SettingsSwitch title. Verified in source only (no server run, by your rule); all 21 gates clean.

**Remainder here:** bump kol-component 0.104.0 + kol-theme 0.71.0; delete src/SettingsPanel.jsx's composition for the organism (SettingsSection / SettingsRow / SettingsSwitch / SettingsChoice / SettingsMulti / SettingsFooter), the three CSS overrides and the cursor re-seed click

## ✅ RETURNED + DONE — 2026-08-27

DS 0.104.0: the organism IS the locked drawer (`SettingsSection` eyebrow + row stack, `SettingsRow` = LabeledControl inline at 160, `SettingsChoice` full-width Dropdown, `SettingsMulti` toggling list, `SettingsFooter` divider + refresh icon, no drawer edge/shadow); popover z 210; `.kol-prose` bounded in preview and overlay; `ColumnBrowser` file pick collapses the sibling and keeps the cursor; `SettingsSwitch` keeps `title`. The DS found no 88% ink rule on `.kol-overlay` — the wash is to be re-measured here with the override gone. Here: bumped; `SettingsPanel.jsx` is a thin adapter again (locked composition kept at `_tmp/2026-08-27-settingspanel-locked/`); the three CSS overrides and the seed click deleted.
