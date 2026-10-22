# Session: Home cards — local bento, Stack retitle, Radial links, phone plate

**Date:** 2026-10-15
**Agent:** Claude (Grim)
**Summary:** Ran `plans/2026-10-15-home-cards.md` §0–§6: TiltBento is a local copy, the card is legible on phones, the Radial Dial tile has two destinations, and `/status` was filed to dotfiles (which closed it the same day).

## Changes Made

### Files Modified
- `apps/web/src/components/sections/home/TiltBento.jsx` — new: a copy of kol-component 0.260.0 TiltBento, edited.
- `apps/web/src/components/sections/home/HomeHighlights.jsx` — uses the local card; the mobile heights moved into the card (`md:h-*` only on the wrappers); Radial → `/work/kol-radial` plus `links` "Read on Stack" → `/stack/kol-radial`.
- `apps/web/src/hooks/useFeatureCards.js` — Collections → **Stack**, "Writing, notes and case studies" (placeholder copy; same art).
- `.kol/llm-context/ARCHITECTURE.md` — §10: the home bento is local; **nothing goes to kol-ds-ui unless the user says so**.
- `lobby/` + `~/.dotfiles/lobby/` — `status-skill-one-line-state` filed, then closed by dotfiles.

### Features Added/Removed
- Pad ladder `p-4 md:p-6 lg:p-8`: a card's pad never exceeds the page gutter.
- Phone (<md): the media is a 264px block with the title over a bottom gradient; subtitle, description, CTA and links sit as an always-open plate below. Desktop is unchanged.
- `links: [{ label, href, external }]` prop: a quiet secondary row under the CTA, SPA-intercepted when internal.

## Current State

### Working
- Measured on the built app at 390 (plate readable, 16px pad) and 1440 (unchanged).

### Known Issues
- The plate text colour uses `max-md:text-(--kol-surface-on-primary)!`: the theme `text-fg*` classes have no Tailwind variants, and `text-ab-white` wins without the `!`.

## Next Steps
1. None. The user ruled out the kol-ds-ui spec round trip.
