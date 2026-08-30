# TagTertiary — fourth Tag variant: no outline, mono voice, fg-80

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/TagTertiary.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — theme 0.70.0 · component 0.102.2; remainder executed here 2026-08-27 (bumped, `variant="tertiary"`, className + `ui.css` rule deleted)

## Why it went there

The `/work` row tags were tuned to a borderless chip in the mono voice
(fg-80, weight 400, 0.04em, line-height 100%, `#` on) — a new variant, not
an override of `secondary`.

## What stays here

`Work.jsx` `tagNodes`: `<Tag variant="secondary" className="border-transparent work-tag">`;
`ui.css` `.kol-tag.work-tag { … }`.

## Remainder here once it ships

bump; `variant="tertiary"`, drop the `className` and the `ui.css` rule

## ✅ RETURNED — 2026-08-27 · kol-theme 0.70.0 · kol-component 0.102.2

Tag variant="tertiary": secondary's fill (surface-primary), border transparent in every state, ink fg-80, the mono voice per size — sm 10 / md 12 / lg 14, weight 400, line-height 100%, letter-spacing 0.04em — hover 8% wash, active 16%, hash default true untouched. Verified in source only (no server run, by your rule): six .kol-tag--tertiary rules in the theme, the variant in the atom's map. Measure /work's rows on the bump.

**Remainder here:** bump kol-theme 0.70.0 + kol-component 0.102.2; <Tag variant="tertiary"> with nothing else; delete .kol-tag.work-tag and the border-transparent className
