# CardSetInViewAttention

**Filed:** 2026-08-31 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/CardSetInViewAttention.md`
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

Promoted to the set. useInViewAttention is exported from kol-component: the centre-band IntersectionObserver TiltBento shipped in 0.145.0, carried unchanged at rootMargin -45% rather than re-derived, one element active, no cross-card coordination and no shared store. TiltBento now uses the hook instead of its private copy, and SectionCardItem stamps data-attention when it holds the centre on a coarse pointer. On your third point — that it should be the hook the existing hover rules already use — that is exactly how it landed: data-attention was added to the SAME theme rule as :hover rather than given rules of its own, so the two cannot drift. Reduced-motion opts out of both. coarseReveal='static' is the escape on both components, and SectionCards forwards it for a whole wall. Verified: fine pointer unchanged (nothing stamped at rest, hover still scales 1.03), and on touch at 390 each of the three cards is stamped and zoomed alone as it takes the centre. TiltBento re-checked after the refactor — still one card open at a time. DELETE useMobileActiveCard.js and the .is-viewing block; that behaviour is in the package now.

**Remainder here:** bump kol-component >=0.149.0 and kol-theme >=0.116.0; delete hooks/useMobileActiveCard.js, its call in Home.jsx, and the .is-viewing block in ui.css
