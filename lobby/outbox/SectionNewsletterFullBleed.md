# SectionNewsletterFullBleed

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionNewsletterFullBleed.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## Why it went there

A local rule in this repo is currently changing DS component behaviour. That is a
fork, not a fix — it belongs upstream.

## What stays here

A dated stopgap in `apps/web/src/styles/ui.css` citing this ticket by name, and
for CardFeatureZoomScale also `hooks/useMobileActiveCard.js` and the
`kol-card-lineart` marker on `SectionCards`' `itemClassName`.

## Remainder here once it ships

bump; delete the stopgap and any marker class or hook it needed; re-verify at
390×700.

## ✅ RETURNED — 2026-08-31 · kol-component@0.147.0

fullBleed shipped on SectionNewsletter. The breakout literal is SectionHero's, character for character (w-screen ml-[calc(50%-50vw)]) rather than a second mechanism — you were right to ask, and two organisms in one family inventing two ways to leave a gutter is exactly how they drift. The section's own px-5 sm:px-8 then re-insets the content, so only the fill moves, which is the behaviour your stopgap was getting by hand. Not used: .kol-full-bleed — container-relative, and you already hit it over-bleeding tonight. NOT DONE: hoisting fullBleed to the whole section family. It is the right question and it binds eight organisms, so it is a ruling rather than a fix; file it and it gets built.

**Remainder here:** bump kol-component >=0.147.0, pass fullBleed from HomeSignup, delete the stopgap block
