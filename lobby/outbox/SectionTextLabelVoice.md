# SectionTextLabelVoice — the ruled eyebrow is the wrong voice; the hero's is right

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionTextLabelVoice.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — component 0.76.2 · theme 0.57.1; remainder executed here 2026-08-26

## Why it went there

`SectionText`'s default label (`kol-section-text-label`) renders every split /
cards / faq eyebrow uppercase-heavy-tracked ("PROCESS", "TYPE FOUNDRY") while
`SectionHero` overrides its own to `kol-helper-12 text-meta` ("Services").
User: the hero's is right, the split's is wrong. The transform also breaks the
casing law (authored `Process`, rendered `PROCESS`). `SectionSplit` has no
`labelClass` seam, so nothing can be done here.

## Remainder here once it ships

bump; eyeball the Studio process card + Home foundry split eyebrows

## ✅ RETURNED — 2026-08-26 · kol-component@0.76.2 · kol-theme@0.57.1

One eyebrow voice across the set: `SectionText`'s label default is the hero's `kol-helper-12 text-meta` (12px, meta ink) instead of the split's mono-18 accent kicker; `SectionHero` drops its override; the theme's `.kol-section-text-label` is retired from the kicker rule (`.kol-feature-split-kicker` keeps painting for a consumer's own CSS until the next major). Measured on split, hero and FAQ: 12px / 500 / meta on all three. The ticket's "no case transform" line cites the retired law — the eyebrow is uppercase by ROLE (user ruling 2026-08-26, `.kol-section-text-eyebrow`, typography doc § Casing) and stays so; author the strings as you like, they render caps.

**Remainder here:** bump kol-component 0.76.2 + kol-theme 0.57.1; Studio process split and Home foundry split need nothing — the rule is the fix

✅ **Remainder executed 2026-08-26 same session:** component ^0.76.2 + theme 0.57.1 in both apps; no call-site change. Note the DS's correction: the eyebrow is uppercase by ROLE (user ruling 2026-08-26) — the "no case transform" line in the ask was wrong and is superseded. Eyeball is the user's.
