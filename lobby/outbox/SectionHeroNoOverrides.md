# SectionHeroNoOverrides — the hero forces its own voice on SectionText

**Filed:** 2026-08-26 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionHeroNoOverrides.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-08-26 — component 0.80.0; remainder executed here 2026-08-26

## Why it went there

Studio hero vs Studio process split, same `headlineSize`: the hero's body is
smaller, headline capped, rhythm tighter. `SectionHero` forces `headlineClass`
· `bodyClass` · `gap` · `actionsClass` onto `SectionText` (both routes) for
parity with the retired glass-panel hero — the label override's siblings.
Ask: the hero renders `SectionText` bare, like the split; its only say is the
glass panel.

## Remainder here once it ships

bump; eyeball the Studio hero against the process split

## ✅ RETURNED — 2026-08-26 · kol-component@0.80.0

`SectionHero` renders `SectionText` bare — label · headline · headlineSize · body · actions · align · slotClass · slotStyle, plus `gap` only when the consumer passes it. The forced `gap-6`, `kol-sans-body-02` body, caps headline class and actions row are gone; the `display-04 → heading-02` remap is gone. What survives: `headlineSize` defaults per variant (media `display-04`, split `heading-02`) and the split hero's caps headline as `SectionText headlineCase="upper"` — a role on the molecule the consumer can set too. Measured side by side: hero body and split body both `kol-section-text-body` 16px, both gap 16px; split hero headline uppercase through the role. Reference pages updated.

**Remainder here:** bump kol-component 0.80.0 — Studio hero and process split now match with nothing passed; pass `gap="gap-6"` on the hero only if you want the old rhythm back

✅ **Remainder executed 2026-08-26 same session:** component ^0.80.0 in both apps; nothing passed on the Studio hero (no `gap`), so hero and split share the molecule's voice. Eyeball is the user's.
