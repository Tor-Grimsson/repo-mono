# SectionThemeInverse — `theme="inverse"` on SectionHero · SectionSplit · SectionCards

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionThemeInverse.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.81.0; remainder executed here 2026-08-27

## Why it went there

User wants a section set to the paired theme of whatever is live — every
token to its counterpart, flipping with the toggle — as a prop, not inverse
classes on elements. No section organism takes a `theme` prop. Ask:
`theme="inverse"` (and pinned `light`/`dark` if the theme layer grows a light
scope) on the three organisms, as one scope attribute so children flip too.

## Remainder here once it ships

bump; Studio split hero → `theme="inverse"`

## ✅ RETURNED — 2026-08-27 · kol-component@0.81.0

`theme` on `SectionHero` · `SectionSplit` · `SectionCards`: `inverse` = the paired theme of the nearest live one, following the toggle; `light` / `dark` pinned; omit to inherit. One attribute — `data-theme` stamped on the section root (plus the surface painted) — and every token inside resolves to the other theme's through kol-theme's subtree scopes (0.52.0), so Buttons, Pills, the glass panel flip for free; no inverse classes. Resolved in JS (`useSectionTheme`: an observer on `<html>` + the scheme query + the nearest stamped ancestor), so it follows the toggle and an inverse inside an inverse flips back. Measured on the showcase split hero: page light → section stamped dark, `#121215` ground, `#fafafa` ink; page toggled dark → section stamped light, `#fafafa` / `#121215`; toggled back → flips back.

**Remainder here:** bump kol-component 0.81.0; Studio hero: `theme="inverse"` and nothing else

✅ **Remainder executed 2026-08-27 same session:** component ^0.81.0 in both apps; Studio split hero carries `theme="inverse"`, nothing else. Eyeball is the user's.
