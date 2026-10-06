# Session: /work shelf animation back · section `background` prop · CTA wrapper renamed

**Date:** 2026-08-27 (afternoon, after the content-filter log)
**Agent:** Grim
**Summary:** The tail of the `/work` arc. The retired `WorkCard`'s animation restored on the shelf (3D staggered entrance + `TiltCard` tilt, shelf-only); the section family takes `background` as a prop (DS ticket, returned in kol-component 0.103.0) and the `/work` contact CTA renders with `background="none"`; `SectionCta variant="connect"` shipped (0.105.0) but the user declined the swap — the site file `ConnectCta.jsx` is renamed **`SectionCtaWrapper.jsx`** and stays. Packages: component **0.105.0**.

## Changes Made

### Files Modified
- `routes/Work.jsx` — `ShelfEnter` (perspective + `rotateX`/`translateY` settle staggered by index, the old card's values verbatim) wraps each shelf card; `WorkContentCard` (was `WorkCard` — renamed after it read as the retired package card) takes `tilt` → `TiltCard variant="grounded"` in the media slot, shelf only; shelf `renderCard` kept (the running server had the old kol-content); `className="work-shelf"` kept for the caption rule; Tools + Systems ONE shelf; Typefaces shelf shows all five faces (three placeholders); 5th placeholder card at the head of Tools & Systems (fromLeft); `pb-[100vh]` under the last shelf; `<SectionCtaWrapper background="none" />` last on the page
- `components/sections/shared/ConnectCta.jsx` → **`SectionCtaWrapper.jsx`** — forwards `background` to `SectionCta`; imported by Home · Stack · Studio · Work
- `components/sections/home/HomeSignup.jsx` — `background="bg-fg-absolute-16"` (was `className`)
- `styles/ui.css` — `.work-shelf p.kol-helper-12` eyebrow caption rule kept (kol-content 0.11.0 ships it; the user's server hadn't loaded it); `.kol-tag.work-tag`, `.work-cta` rules gone
- `apps/web/package.json` · `apps/brand/package.json` — component ^0.105.0
- Lobby: `SectionBackgroundProp` 🟢 executed · `SectionCtaConnectVariant` 🟢 **declined** ("nah just leave it") · `WorkCardAndShelf` 🟢 executed · `TagTertiary` 🟢 · `CollectionItemMinWidth` 🟢

### Features Added/Removed
- **Added (DS):** `background` prop on all six sections (`primary`/`secondary`/`tertiary`/`inverse`/`auto`/`none` or a raw utility; defaults unchanged) · `SectionCta variant="connect"` (unused here) · `Tag variant="tertiary"` · `ContentCard work` one-line title + uppercase helper meta · `ParallaxShelf` renders `ContentCard work` + eyebrow caption · collection `<li>` `min-w-0`
- **Removed here:** `.work-tag` / `.work-cta` rules; `WorkListItem` + old `WorkCard` no longer render anywhere

## Current State

### Working
- `/work`: LIST · GRID · shelf on the DS family; shelf cards tilt and enter as before; CTA last, no surface
- Every receipt 🟢; DS queue has nothing open from this repo

### Known Issues
- Shelf still carries `renderCard` + `className="work-shelf"` + the caption rule; `ShelfEnter` + tilt are local — all four belong to the DS shelf card and are NOT filed (the user wanted to unload). File as one ticket next session, after his eyeball
- `pb-[100vh]` between the last shelf and the CTA — he hasn't seen it
- The user's dev server was stale for most of the afternoon; every "broken" was the old package. Read the live DOM first
- Conversation defect, repeated: after a completed instruction the agent appended unasked context (ticket states, DS artifacts) and each addition cost a round of confusion. The user's standing rule — answer what was asked, then stop — was violated ~10 turns running. No feedback is to be sent from this session (user's explicit order)

## Next Steps
1. User restarts the server and eyeballs `/work` (shelf entrance, tilt, CTA, the 100vh gap)
2. One ticket: shelf card entrance + tilt into the DS shelf card; then drop `renderCard`, `ShelfEnter`, `className="work-shelf"`, the caption rule
3. Brand: `/icons/:set` and `/slide-deck` onto the family; `/library` via the DS's own `MediaLibrary` swap
