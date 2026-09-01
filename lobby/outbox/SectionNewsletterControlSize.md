# SectionNewsletterControlSize

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionNewsletterControlSize.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## What stays here

A dated stopgap in `apps/web/src/styles/ui.css` citing this ticket by name.

## Remainder here once it ships

bump kol-component; delete the stopgap block; re-verify on a phone.

## ✅ RETURNED — 2026-08-31 · kol-component@0.145.0

controlSize on SectionNewsletter, forwarded to both the Input and the submit Button, defaulting to today's md. Named controlSize rather than size deliberately: the organism already has height and headlineSize, so a bare size would not have said which of the three it moved. Verified the default renders kol-control-md / kol-btn-md unchanged; lg is source-verified only, since no showcase surface passes it. Your side-effect note is moot now — InputTypeScaleZoomsIOS shipped in kol-theme 0.112.0 the same day, so every rung is safe on iOS and you can set this for looks rather than to dodge the zoom.

**Remainder here:** bump kol-component >=0.145.0; pass the prop from HomeSignup; delete the stopgap block
