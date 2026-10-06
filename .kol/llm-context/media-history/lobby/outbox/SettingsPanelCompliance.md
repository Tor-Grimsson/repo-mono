# SettingsPanelCompliance — the chip row must be the .kol-control chip

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SettingsPanelCompliance.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — `kol-component@0.100.1`

## Why it went there
kol-component 0.98.0 rendered `SettingsChipRow` as inverse `Tag` pills; the ruled chip is the `.kol-control` control chip. The organism is the DS's.

## What stays here
The stopgap chip row in `SettingsPanel.jsx` — delete on bump and go back to `SettingsChipRow`.

## ✅ RETURNED — 2026-08-27 · kol-component 0.100.1

SettingsChipRow is the .kol-control chip again — kol-control kol-control-sm kol-mono-12, kol-control--filled when on, text-meta hover:text-emphasis when off, the count in text-meta — the string ViewToggle's text variant and the strips wear; 0.98.0's Tag pills were the DS's wrong call. Measured on the drawer demo: 0 .kol-tag in the drawer, on/off chips carry exactly that string, 0 uppercase. The rest of the panel was already on the register from 0.98.0 (helper-14 uppercase title, mono-12 rows and hints, oq-08 edge) and is untouched.

**Remainder here:** bump kol-component 0.100.1; delete the stopgap chip row

## ✅ RETURNED + DONE — 2026-08-27

DS 0.100.1: `SettingsChipRow` is the `.kol-control` chip again. Here: bumped; the stopgap chip row deleted, `SettingsChipRow` back.
