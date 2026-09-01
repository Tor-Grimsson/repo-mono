# ProfileCard — the digital namecard belongs in the DS

**Filed:** 2026-09-01 → **kol-ds-ui**
**Entry:** `~/dev/projects/kol-ds-ui/lobby/inbox/ProfileCard.md`
**Ledger:** `~/dev/projects/kol-ds-ui/lobby/INDEX.md` — **the truth about this ticket**
**Last known:** 🟢 `closed` · synced 2026-09-01 — **kol-component@0.154.0**

## Why it went there

User review on a real iPhone, 2026-09-01: *"look at the shelf, it clips content
and why is it dark in light mode? are we using inverse classes or is this all
inline? if it isnt this should go through DS and get a better treatment?"* —
plus *"what toggle is this? DS component? do we have a better variant?"*

Answers established before filing: the colours are correct semantic tokens
(`bg-surface-inverse` / `text-auto-inverse`), deliberately the inverse of the
page — not inline, not a bug. The clip is real and structural: a fixed-height
shelf holding a vertical rack of 5 social icons, short by 28/40/44px on
`lg`/`md`/`sm`. The toggle is `ToggleSwitch` — a real DS component, but a form
control doing a disclosure's job, and the DS ships no disclosure control.

## What stays here

`apps/web/src/components/ui/ProfileCard.jsx` keeps rendering `/studio` until the
component ships. **Patched 2026-09-01 as a holding action, not a design:** panel
heights became a floor (`min-h-*`) and `panelMaxHeight` a ceiling above the
content need, so the phone stops clipping. The root model is the DS's to rule.

## Remainder here once it ships

bump; swap the local file for the published component; retire
`components/ui/ProfileCard.jsx` to `_tmp/`; re-check `/studio` under phone
emulation with the shelf open, both orientations.

## ✅ RETURNED — 2026-09-01 · kol-component@0.154.0

Promoted, carried class-for-class, with the three things you named fixed at the root. The shelf sizes to its content: the open state animates grid-template-rows 0fr → 1fr (horizontal: grid-template-columns 0 → 224px, ONE number where the source carried three) — the browser measures, so your min-h/max-height patch and its two guesses go away; verified in a real render: md opens to 168, sm to 140, lg-h to 224 wide, rack of five fully inside at every size, nothing clipped in either axis. Scale and width are separate: size drives the ramp and caps the width (max-w-[680/480/320/200]), the card is w-full inside the cap, so your className="w-full" no longer fights a second utility. The disclosure ruling, applied not minted: a disclosure is a button carrying aria-expanded + aria-controls, plus closed / minus open — over media it is IconFrame secondary radius="full", because the bare nav glyph was measured invisible on the photo (page ink on a dark picture); on a surface the bare nav idiom is the same ruling with no frame. It is written in the docstring; no second ticket. Brand content is yours: logo is a slot (this package cannot import kol-brand), name / email / socials are props with no defaults — pass your lockup, the five socials, the name and the mailto. variant="lg-h" still works as an alias; open / defaultOpen / onOpenChange is the controlled seam you asked for. ToggleSwitch stays a form control.

**Remainder here:** bump kol-component@0.154.0; swap apps/web/src/components/ui/ProfileCard.jsx for the published one — pass logo={<Asset name="kol-lockup-vert" …/>}, name, email, socials and your image; retire the local file to _tmp/; re-check /studio under phone emulation with the shelf open, both orientations

## ✅ RETURNED — 2026-09-01 · kol-component@0.154.0

Promoted class-for-class with all three root causes fixed. The shelf sizes to
its content — the open state animates `grid-template-rows: 0fr → 1fr`, so the
browser measures and the `min-h`/`max-height` pair (two guesses at one number)
goes away; horizontal is `grid-template-columns: 0 → 224px`, ONE number where
the source carried three. Scale and width separated: `size` caps the width, the
card is `w-full` inside the cap, so a caller's `w-full` no longer fights a
second utility. **Disclosure ruling applied, not minted:** a button with
`aria-expanded`, plus/minus glyph — `IconFrame secondary radius="full"` over
media (the bare `nav` glyph measured invisible on a photo), bare `nav` on a
surface. `ToggleSwitch` stays a form control. Logo is a slot; name/email/socials
are props with no defaults.

**Remainder here:** bump kol-component@0.154.0; swap the local file for the
published one passing logo/name/email/socials/image; retire the local to
`_tmp/`; re-check `/studio` under phone emulation with the shelf open.

✅ **Remainder executed 2026-09-01 same session.** component `^0.154.0` in web +
brand (one version beneath both). `StudioProcessCard.jsx` now renders the
package card, passing the lockup as a slot and the same name/email/socials/image
the local file carried — content identical, nothing re-authored. Local file
retired to `_tmp/2026-09-01-profilecard-ds-adoption/`; zero importers remain.

**Verified at 390×700, shelf open, leaf-measured:** shelf height **204px**,
rack of five fully inside (`clipped: false` on the last icon against its clip
parent — the exact measurement that failed before). `/studio` gutter after the
same session's `.kol-page` fix: Services · `/ CONNECT` · `SEND A MESSAGE` ·
`CONTACT` and the 48px email all at **x=20**, `scrollWidth == innerWidth == 390`,
no horizontal overflow. Screenshots: `_tmp/2026-09-01-profilecard-verify/`.

**Addendum — 2026-09-01 · kol-component@0.154.1.** The `logo` slot sized `[&>svg]` only, so a brand `Asset` (which wraps its svg) came through unsized and the site had re-added `[&>svg]:h-full [&>svg]:w-auto` on the node it passed. 0.154.1 sizes whatever the slot is handed (`[&>*]:h-full [&_svg]:h-full [&_svg]:w-auto`) — bump to **0.154.1**, not 0.154.0, and drop the `className` on the `Asset`: `logo={<Asset name="kol-lockup-vert" title="Kolkrabbi" />}` is the whole call. Verified in a real render at 390 with the studio content: b2 photo, the lockup at 184×56, five socials, nothing clipped. The showcase demo now carries the studio card itself — your photo, lockup, name, mailto and socials — not a stand-in.

**Addendum — 2026-09-01 · kol-component@0.155.0.** The shelf has seams now (user ruling, not the ticket): `shelfTheme` (`inverse` · `light` · `dark` — the section `theme` stamp on the shelf; ink and the lockup follow, `inverse` tracks the toggle), `shelfBackground` (the section `background` prop — named surface or raw token; default `inverse`, or that theme's `primary` once stamped), `controlVariant` (straight to the disclosure's `IconFrame`), and `pad` (`sm` · `md` · `lg` on `--kol-pad-card-*`). A call passing none of them renders exactly as 0.154.1. Bump to **0.155.0**.
