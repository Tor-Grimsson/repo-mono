# SectionNewsletterForm — the email field renders ~190px; and a `bodyClass` override

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionNewsletterForm.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — component 0.90.1; remainder executed here 2026-08-27

## Why it went there

On 0.90.0 the newsletter's email field is ~190px (was ~460); the wrapper
caps at 520 but the field doesn't fill it. And `SectionNewsletter` forces a
`bodyClass` onto `SectionText` — the override class the hero just lost.
Ask: field fills the wrapper; override gone.

## Remainder here once it ships

bump; eyeball the newsletter on Home + `/stack`

## ✅ RETURNED — 2026-08-27 · kol-component 0.90.1

The form is w-full: SectionText centres its children as flex items, so the form shrink-wrapped and the Input's w-full had nothing to fill (~190px intrinsic). The field's shell now reads 520 at 1400 and 900, 390 (full width) at 390. bodyClass override dropped — the lede renders bare kol-section-text-body; the 64rem measure sits on a wrapper inside the family cap.

**Remainder here:** bump kol-component 0.90.1; no consumer change

✅ **Remainder executed 2026-08-27 same session:** component ^0.90.1 in both apps; no consumer change. Newsletter surface is `bg-fg-absolute-08` (user).
