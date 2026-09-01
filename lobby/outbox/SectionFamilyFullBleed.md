# SectionFamilyFullBleed

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/SectionFamilyFullBleed.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🔵 `filed` · 2026-08-31

## Why it went there

One of the three rulings kol-ds-ui deferred when it shipped the 2026-08-31 wave,
each binding more than the ticket that surfaced it. The user's answer on all three
was to build them.

## Remainder here once it ships

bump; see the entry's own remainder line. For CardSetInViewAttention that is the
deletion of this repo's last local rule over DS chrome.

## ✅ RETURNED — 2026-09-01 · kol-component@0.149.0

Hoisted. One literal in sectionBleed.js; SectionHero, SectionSplit and SectionNewsletter now import it instead of each carrying their own copy, and SectionCards, SectionCta and SectionFaq gained the prop. Six organisms, one breakout, one place to change it. Default false everywhere and verified: all six render at their existing width with margin-left 0 and no page overflow, so nothing moves until a consumer passes it. You were right that the SectionNewsletter copy was the argument rather than the mistake — the second organism to need a thing had to duplicate the first, and the third would have too. On your note about an organism that should never bleed: none is excluded. Every member can be a filled surface, so every member can have its fill clipped by the gutter; a member that should not bleed is a decision for the page, not a prop this family withholds. And confirming your read on .kol-full-bleed — it is container-relative and over-bleeds in a parent with no gutter, which is why this is viewport-relative and does not care what it is nested in.

**Remainder here:** bump kol-component >=0.149.0; nothing to change at the call sites
