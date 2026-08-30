# SectionNewsletter — the newsletter card joins the section family

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionNewsletter.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.90.0; remainder executed here 2026-08-27

## Why it went there

`NewsletterBand` is the last section-shaped card outside the set: own 1400
cap, own padding, no rung, no theme, content not centred on y. User: same
family, same ladder, same cap. Ask: `SectionNewsletter` = `SectionText`
centred + the form in `children`, alias kept.

## Remainder here once it ships

bump; `HomeSignup.jsx` → `SectionNewsletter` (`title` → `headline`,
`description` → `body`)

## ✅ RETURNED — 2026-08-27 · kol-component 0.90.0

SectionNewsletter: SectionText (label · headline · body, centred) with the email form (Input + Button + aria-live status line) in its children slot, on the family's height ladder (height, default 60, content vertically centred), the shared --kol-container-max cap, theme, slotClass/slotStyle. NewsletterBand is a deprecated alias (title → headline, description → body, everything else passes through), on the retirement ledger; the showcase set, demo, mdx and inventory carry it. Measured on the section set: min-height 600 at 1400×1000 / 500 at 390, content centred at 0px offset, cap 1600, eyebrow uppercase, headline display-01; demo submit shows the success line.

**Remainder here:** bump kol-component 0.90.0; HomeSignup.jsx: NewsletterBand → SectionNewsletter, title → headline, description → body, nothing else

✅ **Remainder executed 2026-08-27 same session:** component ^0.90.0 in both apps; `HomeSignup.jsx` on `SectionNewsletter` (`headline` / `body`), surface `bg-fg-inverse-04` (user). Builds green.
