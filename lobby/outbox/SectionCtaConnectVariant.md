# SectionCtaConnectVariant — the contact CTA as `SectionCta variant="connect"`

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionCtaConnectVariant.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-component 0.105.0; bumped, **remainder DECLINED by the user 2026-08-27 ("nah just leave it")** — the site keeps its wrapper, renamed `SectionCtaWrapper.jsx`; the variant exists in the DS for whoever wants it

## Why it went there

`ConnectCta.jsx` is `SectionCta` with the contact copy typed in, used from
four pages — a site wrapper around a family card, which defeats the family.
The copy becomes a `connect` variant's defaults in the DS.

## What stays here

`ConnectCta.jsx` + its four call sites (Home · Stack · Studio · Work).

## Remainder here once it ships

bump; the four pages → `<SectionCta variant="connect" className="reveal" />`
(Work adds `background="none"`); `ConnectCta.jsx` → `_tmp/`

## ✅ RETURNED — 2026-08-27 · kol-component 0.105.0

SectionCta variant="connect" = the editorial layout with the contact copy as defaults (/ CONNECT · WORKING ON A PROJECT? · SEND A MESSAGE · CONTACT · hello@kolkrabbi.io), every prop still overridable; background / className as on every section. Verified in source only (no server run, by your rule).

**Remainder here:** bump kol-component 0.105.0; the four pages render <SectionCta variant="connect" className="reveal" /> (Work: background="none"); ConnectCta.jsx retires
