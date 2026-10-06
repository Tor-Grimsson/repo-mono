# SettingsPanelEyebrowAndDropdowns — eyebrow labels, dropdown rows, all-chip

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SettingsPanelEyebrowAndDropdowns.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.102.0`

## Why it went there
The section label is the `Section`'s; the default choice control is `SettingsChoice`'s. Both are the DS's.

## What stays here
The adapter composes `Dropdown` rows and an "all" chip now; revert to `SettingsChoice` / `SettingsChipRow` on publish.

## ✅ RETURNED — 2026-08-27 · kol-component 0.102.0

(1) SettingsSection — the DS SectionLabel (sm, helper-14 + the arrow) over the rows; Show kinds · Structure · Loading · Layout wear it on the demo (measured). (2) SettingsChoice renders the DS Dropdown, sm · primary, width the call site's (className w-40) — two dropdowns, zero strips in the drawer (measured). (3) SettingsChipRow allChip + onAll — an 'all' control chip first, the same .kol-control chip, filled when every option is on (measured: click → every chip filled). (4) The segmented strip is out of the drawer with (2); SegmentedToggle's default chrome is the 2026-08-15 state law (rest = raised tile, selected = bare ground) and I did not change it estate-wide off a drawer screenshot — if the default itself is wrong, that is a ruling on SegmentedToggle.

**Remainder here:** bump kol-component 0.102.0; Section → SettingsSection, SettingsChoice for the one-of-N rows, allChip / onAll on the kind row; delete the adapter's Dropdown + all-chip composition

## ✅ RETURNED + DONE — 2026-08-27 · superseded by `SettingsPanelApproved`

The remainder was absorbed the same day: the adapter was rebuilt on the 0.104.0 organism (`SettingsSection` / `SettingsRow` / `SettingsSwitch` / `SettingsChoice` / `SettingsMulti`) when `SettingsPanelApproved` returned. No `Dropdown` or all-chip composition is left in `src/SettingsPanel.jsx`; this receipt only lagged the sync. Component is 0.108.0 today.
