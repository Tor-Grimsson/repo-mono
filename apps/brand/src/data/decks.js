/**
 * Deck registry — the source of truth for what `/slide-deck` lists.
 *
 * One real deck exists today: the Right Grotesk typographic deck, deduped from
 * the V1–V4 Runway sources in 2026-05-01 and rendered by
 * `components/loaders/decks/SlideDeck.jsx`.
 *
 * `component` is the renderer. A deck without one is a record with nothing to
 * show — the manager lists it and the viewer says so, rather than crashing.
 * That is deliberate: create/name lands rows here before a renderer exists.
 *
 * Create · delete · rename · export are NOT implemented — they are the PRODUCT
 * half of this scope (edit mode, the slide-count/color/template modal, export
 * to pptx/key/pdf/svg) and carry decisions the user has not made. The manager
 * renders their affordances as disabled so the shape is visible without
 * pretending the behaviour exists.
 */
import SlideDeck from '../components/loaders/decks/SlideDeck'

export const DECKS = [
  {
    slug: 'right-grotesk',
    name: 'Right Grotesk',
    slides: 14,
    updated: '2026-05-01',
    template: 'runway',
    component: SlideDeck,
  },
]

export const getDeck = (slug) => DECKS.find((d) => d.slug === slug)
