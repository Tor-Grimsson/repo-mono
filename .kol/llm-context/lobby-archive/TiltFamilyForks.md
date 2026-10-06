# TiltFamilyForks — home + work run local tilt forks; swap onto the DS Tilt family

**Staged:** 2026-08-27 · from a kol-ds-ui session
**Change:** small — three local files retire, three imports move, one CTA seam maps

---

## The problem, in one case

`apps/web/src/components/sections/home/HomeFoundry.jsx:5` imports `../../ui/TiltCard`; `components/sections/home/HomeHighlights.jsx:1` imports `../../ui/BentoCard` (seven tiles); `routes/WorkDetail.jsx:10` imports `../components/ui/TiltCard`. All three ride `hooks/useTilt.js` (107 lines — `useBentoTilt` + `useBentoTiltMotion`, the monorepo fork) and `hooks/useIsTouchDevice`. Meanwhile `/work`'s shelf already tilts on the DS (`ParallaxShelf` → `TiltCard grounded`, kol-content 0.12.0) — so home and work run two tilt implementations today, and the feel (±4°, spring 350/35, perspective 700, the touch gate) can drift between them with no version in between.

The DS ruled the three tilting things ONE prefix family 2026-08-27 (kol-component **0.110.0**): `TiltCard` — the bare frame (`default` | `grounded`) · `TiltBento` — the composed hover tile (was `BentoCard`; the old name is an alias on the retirement ledger) · `useTilt` — the one hook.

## The fix

- Bump `@kolkrabbi/kol-component` to ≥ 0.110.0 (`apps/web/package.json:19` is `^0.108.0`).
- `HomeFoundry.jsx:5` and `WorkDetail.jsx:10` → `import { TiltCard } from '@kolkrabbi/kol-component'` — same surface (`src` · `alt` · `className` · `variant` · children).
- `HomeHighlights.jsx:1` → `import { TiltBento } from '@kolkrabbi/kol-component'`. The CTA seam differs: the fork renders a react-router `<Link>` for internal hrefs; the DS renders `<a href>` and exposes `onNavigate(event)` (capture-phase) for the SPA intercept — `onNavigate={(e) => { e.preventDefault(); navigate(e.currentTarget.getAttribute('href')) }}`. Check the seven tiles' props against the DS surface: `src` · `poster` · `title` · `subtitle` · `description` · `href` · `buttonLabel` · `bodyContent` · `overlayOpacity` · `alignRight` · `enableTilt` · `titleClassName` / `contentClassName` / `imageClassName` / `contentStackClassName`. Anything the tiles need that the DS lacks is a ticket back to kol-ds-ui, not a local patch.
- Retire `components/ui/TiltCard.jsx` · `components/ui/BentoCard.jsx` · `hooks/useTilt.js` (and `hooks/useIsTouchDevice.js` if nothing else imports it) to `_tmp/2026-08-27-tilt-forks/`.

## Rejected alternative

Keep the forks and re-align their numbers to the DS by hand — the same drift returns on the next tune. The DS hook is the one source of the feel; the site consuming it is what makes home, work and the shelf move as one.

## Definition of done

- [ ] no `ui/TiltCard`, `ui/BentoCard` or `hooks/useTilt` import left in `apps/web/src`
- [ ] the Foundry image, the seven highlight tiles and the WorkDetail image tilt on the DS hook — measured, fine pointer
- [ ] an internal highlight CTA still navigates in-app (the `onNavigate` seam)
- [ ] forks in `_tmp/`, receipt returned to kol-ds-ui `lobby/outbox/TiltFamilyForks.md`

---

## ✅ CLOSED — 2026-08-27, executed here same session

kol-component `^0.110.0` in both apps (`pnpm why` → one copy), web + brand build green.

- `HomeFoundry.jsx` · `WorkDetail.jsx` → the DS `TiltCard`. WorkDetail's was a **dead import** — no call site — so it was simply dropped.
- `HomeHighlights.jsx` → `TiltBento` on all seven tiles. `useMotion` is gone with the fork's CSS tilt path (the DS has one spring path — the ruled feel). Three seams passed explicitly on every tile so the render is unchanged: `onNavigate` (the SPA intercept replacing the fork's react-router `<Link>`), `buttonLabel="View Project"` and `titleClassName="kol-sans-heading-02 text-light-fixed uppercase"` — the DS defaults differ on the last two and would have shipped a bigger, un-uppercased title over an empty CTA.
- Retired to `_tmp/2026-08-27-tilt-forks/`: `components/ui/TiltCard.jsx` · `components/ui/BentoCard.jsx` · `hooks/useTilt.js`. **`hooks/useIsTouchDevice.js` STAYS** — `HomeHero.jsx` still imports it; the ticket's "if nothing else imports it" condition is not met.

### DoD
- [x] no `ui/TiltCard` · `ui/BentoCard` · `hooks/useTilt` import left in `apps/web/src`
- [x] an internal highlight CTA navigates in-app (the `onNavigate` seam)
- [x] forks in `_tmp/`, receipt returned to kol-ds-ui
- [ ] **the user's eyeball** — Foundry image + seven tiles + the tilt feel on a fine pointer (the fork's CSS tilt → the DS spring is a real change)

### Filed back — one defect this surfaced
`TiltBentoVoiceAndDefaults` (kol-ds-ui, 🔵): the DS subtitle rides `kol-mono-text`, **retired in kol-theme** — 0 rules in the built CSS, so every tile's subtitle inherits the ambient font until it returns. No local patch: a broken package class is not a missing seam.
