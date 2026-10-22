# Home cards — links, multi-destination, padding rule, touch legibility

**State:** §0–§5 done 2026-10-15 (local card, Stack retitle, Radial links, pad ladder, phone plate). §6 filed to dotfiles. No kol-ds-ui spec — the package is updated only on the user's say (2026-10-15).

## 0. Decision — we own the card (user 2026-10-15)

`TiltBento` is rendered by this repo's home page and nowhere else across the projects (grep 2026-10-15). No DS round trip per iteration: **copy it verbatim into `apps/web/src/components/` and edit the copy.** When the card is settled (padding rule, touch plate, link row), **one** spec goes to kol-ds-ui to fold back. ARCHITECTURE gets a one-line sibling to § 9: the home bento is local, fixed here, not ticketed mid-iteration.

## 1. Feature cards ("Typefaces & Design Systems")

Collections links to `/stack` since 2026-10-13, but the card still says **Collections** with the collection art and "Collection of design explorations". The card should say what it links to.

- **Proposal:** retitle to **Stack** (`icon`, `description`, `visual` to match — e.g. "Writing, notes and case studies"). Art stays the same for now (user 2026-10-15). Copy is yours to word.
- Foundry, Client Work, Workshop: unchanged.

## 2. Highlights (`HomeHighlights.jsx`) — destinations

| Tile | Now | Verdict |
|---|---|---|
| Monitor | `/work/monitor` (CMS work entry) | fine |
| Málrómur | `/foundry/typefaces/malromur` | fine |
| **Radial Dial** | `https://radial.kolkrabbi.io/` — stale, not mobile-ready | **→ `/work/kol-radial`** as the primary, **`/stack/kol-radial`** as the secondary "Read on Stack" (both exist — user 2026-10-15) |
| Chess · Visuals · Analytics · Prints | — | fine |

## 3. More than one destination per tile — agreed (user 2026-10-15)

Yes, it makes sense: most featured things have several homes (work entry, stack article, subdomain, GitHub, workshop page, ui.kolkrabbi.io). Proposal:

- One **primary** action (the existing "View Project" — the most complete home), plus **secondary links** as a quiet row: `Read on Stack` · `Open app ↗` · `GitHub ↗` — only those that exist for that item.
- The data lives in one place: a `links: [{ label, href, external }]` per tile in `HomeHighlights.jsx`, so a tile with one home renders exactly as today.
- The local card grows a `links` prop for the secondary row.
- Later, when the work/stack entries carry these links in Sanity, the tile reads them from there instead of a hand-written list.

## 4. Card padding vs the page gutter — the rule

Measured from the screenshot at 390: page gutter **20** (`--kol-pad-section-x` = `clamp(20px, 5vw, 48px)`), the bento's inner pad **24** (`p-6 md:p-8` — 24 / 32, TiltBento's default `contentStackClassName`). So the card's text sits further in than the page's — that is the inconsistency you saw.

There is no written rule tying a card's inner pad to the page gutter. Proposal for the rule:

- **A card's inner pad never exceeds the page gutter at that width.** Phone: gutter 20 → card pad 16. Desk: gutter 48 → card pad 24–32.
- Expressed as one ladder (`p-4 md:p-6 lg:p-8`), the same one the foundry cards moved to on 10-14 — so every card on the site shares it.
- Write it down where the layout laws live (kol-ds-ui `05-layout-systems.md`) — that makes it a DS ruling, so: one ticket asking TiltBento's default to follow it, or set `contentStackClassName` here. **Not asked yet.** The card is the DS's (`TiltBento`, kol-component) — one ticket, carrying § 4 and § 5 together.

## 5. Touch legibility

Desk: hover darkens the tile (`overlayOpacity` 40 here) so the copy reads. Touch: `coarseReveal="in-view"` opens the copy on the tile crossing the screen's centre line and fades the veil to 60% of that 40 — about **24% black**, which is why the text sits on raw video (Monitor, Málrómur in the screenshot).

Proposals, smallest first:
- **a.** A real scrim on touch: a bottom-to-top gradient behind the text block only (not the whole tile), so the image stays and the copy reads. On the local card.
- **b.** Raise the touch veil to the desk value (40–60%) when the tile is "in view".
- **c.** Touch layout: title only over the image; subtitle + description + buttons BELOW the image as a plate (the card becomes image-then-text on a phone). Most legible, biggest change.

My pick: **c** for the phone, **a** as the fallback. Agreed in principle (user 2026-10-15).

## Ownership

Everything in this plan is local: `HomeHighlights.jsx`, `useFeatureCards.js` and the copied card. The DS hears once, at the end, with the finished spec.

## Order

0 → 1 → 2 → 3 → 4 → 5. ~~Then the one spec to kol-ds-ui~~ — dropped 2026-10-15: no round trip; the package is updated only on the user's say.

## 6. A `/status` skill (dotfiles — lobby it there)

The user, 2026-10-15: "can we make this a skill? I dont feel like typing it out every time when I just need bare info." The model answer: **"Nothing open. DMARC and the images upload to R2 are parked."**

Proposal — `/status`, user-invoked, read-only, works in any repo with `.kol/llm-context/`:
- Reads: the active goal file (unticked items), `plans/` files whose `State:` is not done, the AGENT-CONTEXT "Parked" line, lobby receipts owed here (📌 only).
- Answers in ONE line: `Nothing open.` or `Open: <items>.` then `Parked: <items>.` Nothing else — no review prompts, no recap, no next steps.
- Distinct from `/ticket` (lobby only) and `/scan` (packages only); those stay.
- Lives in dotfiles (`~/.dotfiles/claude/skills/status/SKILL.md`), filed with `/lobby-dotfiles` once the user says go.
