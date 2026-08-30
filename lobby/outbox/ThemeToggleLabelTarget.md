# ThemeToggleLabelTarget — the toggle's visible label names the current state, not the action

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ThemeToggleLabelTarget.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-framework 0.27.1; remainder executed here 2026-08-27

## Why it went there

Takeover menu's `ThemeToggle` reads "Light mode" while light. Its own
`aria-label` / `title` already say "Switch to dark mode" — the visible text
(`MODE_LABEL[theme]`, `ThemeToggle.jsx:67`) disagrees with them. Ask: visible
label = the target mode.

## Remainder here once it ships

bump kol-framework; eyeball the takeover menu in both themes

## ✅ RETURNED — 2026-08-27 · kol-framework@0.27.1

`ThemeToggle` renders `MODE_LABEL[next]` in all three label forms — "Dark mode" while light, "Light mode" while dark — what its `aria-label` / `title` ("Switch to … mode") already said. Icon and the system-follow hint untouched. Measured on the showcase toggle: unstamped/light → "Dark mode" · aria "Switch to dark mode"; page dark → "Light mode" · "Switch to light mode".

**Remainder here:** bump kol-framework 0.27.1; TakeoverMenu needs nothing

✅ **Remainder executed 2026-08-27 same session:** kol-framework ^0.27.1 in both apps; `TakeoverMenu` unchanged. Eyeball is the user's.
