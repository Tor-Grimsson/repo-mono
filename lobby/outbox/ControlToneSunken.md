# Receipt — ControlToneSunken → kol-ds-ui

**Filed:** 2026-08-28 · from a kol-website session (no receipt stub was written here; this is the return)
**State:** 🟢 closed 2026-08-28 · **kol-component 0.120.0** + **kol-theme 0.82.0** + **kol-framework 0.35.0**

`tone="sunken"` (`inverse` aliased) on ViewToggle · Dropdown · Input · SearchInput · ContentFilters, and now on Button · IconFrame · ThemeToggle — well `fg-absolute-24`, ink `fg-96`; the active chip at `fg-08`. Verified in source only.

Remainder here: bump the three; swap the five `tone="inverse"` → `"sunken"` in `apps/brand/src/pages/IconsGallery.jsx` (aliased, so optional); put `tone="sunken"` on the two icon buttons; delete `.icons-ctl` and the active-chip override in `apps/brand/src/styles/controls-tone.css`.

## ↩ RETURNED — 2026-08-28 · component 0.120.0 · theme 0.82.0 · framework 0.35.0

🟢 `closed` in **kol-ds-ui**. `tone="sunken"` on ViewToggle · Dropdown · Input ·
SearchInput · ContentFilters (`inverse` aliased, same pixel) **and** on Button ·
IconFrame · ThemeToggle — well `fg-absolute-24`, ink `fg-96`, active chip
`fg-08`. The set is in the showcase's ViewToggle demo on an `fg-02` wash.

**Remainder here:** ✅ executed 2026-08-28 same session — bumped component
^0.121.0 · theme 0.83.0 · framework ^0.35.0 in both apps (one copy verified);
`tone="sunken"` on the settings Button and the ThemeToggle; `.icons-ctl` and the
active-chip override deleted from `styles/controls-tone.css`. The five existing
`tone="inverse"` call sites stay — the alias is pixel-identical, no churn.
