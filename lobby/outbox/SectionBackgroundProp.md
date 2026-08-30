# SectionBackgroundProp — every section takes its background as a prop

**Filed:** 2026-08-27 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionBackgroundProp.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-27 — kol-component 0.103.0; remainder executed here 2026-08-27 (bumped, `ConnectCta` forwards `background`, `/work` `none`, `HomeSignup` `bg-fg-absolute-16` by prop)

## Why it went there

`/work`'s contact CTA needed no surface; `SectionCta` paints `bg-auto` with no
prop, so it went through `className="bg-transparent"` — a cascade gamble
(`HomeSignup` does the same with `bg-fg-absolute-16`). User: the whole section
family passes background as a prop.

## What stays here

`ConnectCta` now forwards `className`; `/work` passes `bg-transparent`.

## Remainder here once it ships

bump; `ConnectCta` forwards `background` instead; `/work` → `background="none"`,
`HomeSignup` → its rung by name

## ✅ RETURNED — 2026-08-27 · kol-component 0.103.0

background on all six sections through one SURFACES map (primary · secondary · tertiary · inverse · auto · none, or a raw utility / token string); defaults = what each painted before (Cta auto; hero / cards / newsletter primary under theme else none; split / faq none). Verified in source only (no server run, by your rule): every section root reads surfaceClass(background, …); all 21 gates clean.

**Remainder here:** bump kol-component 0.103.0; /work's CTA background="none", HomeSignup background="bg-fg-absolute-16"; drop the className surfaces
