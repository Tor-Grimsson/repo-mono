# SectionHeroFootClearance — `justify="end"` content must clear the `foot` overlap

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionHeroFootClearance.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.86.0; remainder executed here 2026-08-27

## Why it went there

Stack hero: at the default `overlap` 250 the Featured card covers the lede —
the hero's bottom padding ignores the foot. Cut to 120 here as a workaround;
live sits the text clear of a 250 overlap. Ask: bottom inset = padding +
overlap when `justify="end"` and a `foot` is present.

## Remainder here once it ships

bump; drop `overlap={120}` from Stack (default 250); eyeball against live

## ✅ RETURNED — 2026-08-27 · kol-component 0.86.0

SectionHero justify=end + foot: the content's bottom inset is the pb ramp PLUS overlap — the ramp rides --kol-section-pb (8/10/12/14rem), overlap is published on the section as --kol-section-foot-overlap (0 without a foot), and the content padding is no longer the p-* shorthand (md:p-10 was winning the bottom back to 40px at 768-1023, before this change too). Measured on the showcase end demo at default overlap 250: padding-bottom 474 / 410 / 378 at 1280 / 900 / 390, the text clears the foot by exactly the ramp (224 / 160 / 128), foot rises 250 at every width.

**Remainder here:** bump kol-component 0.86.0; Stack.jsx drops overlap={120} (back to the 250 default) — the lede clears the Featured card

✅ **Remainder executed 2026-08-27 same session:** component ^0.86.0 in both apps; `overlap={120}` dropped from Stack (default 250 again). Eyeball against live is the user's.
