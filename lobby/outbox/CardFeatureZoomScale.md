# CardFeatureZoomScale

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/CardFeatureZoomScale.md`
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

## ✅ RETURNED — 2026-08-31 · kol-theme@0.114.0

The card publishes --kol-card-feature-zoom from a per-feature zoom prop (feature.zoom through SectionCards, alongside backgroundColor and imageAspectRatio as you suggested) and kol-animation.css reads it with 1.03 as the fallback, so nothing moves for anyone who does not set it. Per-feature rather than per-set, because your own evidence is that one set holds both kinds: line-art on white needing more and dark UI screenshots correct at 3%. Requires kol-component >=0.147.0 for the prop. NOT SHIPPED, and deliberately: the shared in-view attention state. You are right that two components now need it and that a card cannot hold hover on touch, but making .is-viewing a DS-wide behaviour across the card set is an architecture call that binds every card kind, not a fix to this rule — it wants its own ticket and the user's ruling. Keep your local hook until then.

**Remainder here:** bump kol-theme >=0.114.0 and kol-component >=0.147.0, pass zoom per feature, delete the stopgap block and the kol-card-lineart marker; KEEP hooks/useMobileActiveCard.js — the shared attention state was not shipped
