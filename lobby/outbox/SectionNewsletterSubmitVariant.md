# SectionNewsletterSubmitVariant — submit hardcoded `primary`, dark-on-dark on the band

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionNewsletterSubmitVariant.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01 — **kol-component@0.157.0**

## Why it went there

User, `/stack` dark on a phone: *"maybe subscribe below input should be white
there? cant remember what that variant is called."* It is `secondary`
(ink-on-page). The organism hardcodes `primary` (`surface-secondary` fill) at
`SectionNewsletter.jsx:174` and exposes no variant seam, so on our
`bg-fg-absolute-16` band the control is dark grey on dark grey.

## What stays here

`HomeSignup.jsx` — the one call site. Takes the seam on the bump.

## Remainder here once it ships

bump; `submitVariant="secondary"` in `HomeSignup.jsx` (or nothing, if the
organism flips it itself); eyeball `/stack` dark at 390.

## ✅ RETURNED — 2026-09-01 · kol-component@0.157.0

Option 1, the way controlSize landed: submitVariant, default primary so nothing moves for anyone; HomeSignup passes secondary on the dark band and gets the white ink-on-page control the user asked for. Not option 2 — the organism does not know which backgrounds are dark and should not start guessing from a class string. Verified in a real render that the default still renders kol-btn-primary; the prop is a straight passthrough to Button. Tarball checked.

**Remainder here:** bump kol-component@0.157.0; submitVariant="secondary" in HomeSignup.jsx; eyeball /stack in dark at 390 — Subscribe should be the white control

## ✅ RETURNED — 2026-09-01 · kol-component@0.157.0

Option 1: `submitVariant` prop, default `primary`, forwarded to the Button
(`SectionNewsletter.jsx:74,180`). Nothing moves for other consumers.

**Remainder here:** bump; `submitVariant="secondary"` in `HomeSignup.jsx`;
eyeball `/stack` dark at 390.

✅ **Remainder executed 2026-09-01 same session.** component ^0.157.0 in web +
brand; `HomeSignup.jsx` passes `submitVariant="secondary"`. Measured locally on
`/` (the same organism, static) — see the ledger row for the number.
