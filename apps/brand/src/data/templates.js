/**
 * Template registry — what `/slide-deck/template` lists, on two views.
 *
 * DECK  — the deck types a new deck starts from. Presets: a named sequence of
 *         slide layouts. PLACEHOLDERS today (2026-09-03) — the sequences are
 *         unwritten, so each carries a name and nothing it cannot back up.
 *         `Empty` is one of the types, not a second button: New deck asks for a
 *         name and a type, and the top type happens to be nothing.
 * SLIDE — the page layouts those types are assembled out of: the fourteen
 *         sections of the credentials deck, each a slide DOCUMENT (slideDoc.js)
 *         the editor can open. The card renders each one live (`SlideThumb`).
 *         (Ported from olina 2026-10-13 as documents only: this repo's
 *         `SlideDeck.jsx` is the Right Grotesk deck, not fourteen sections.)
 *
 * No `detail` on the slide layouts on purpose — the picture is the description,
 * and prose about a layout you can see is text to keep in step for nothing.
 */
import {
  COVER_DOC, WIDE_STAMP_DOC, NUMBER_DOC, TALL_DOC, MANIFESTO_DOC, SPATIAL_DOC, LOOK_DOC,
  QUOTE_DOC, INDEX_DOC, DUO_DOC, SPECIMEN_DOC, CONTRAST_DOC, CREDITS_DOC, END_DOC,
} from '../components/loaders/decks/slideDoc'

export const DECK_TYPES = [
  { slug: 'empty',        name: 'Empty',        detail: 'No slides. Start from nothing.' },
  { slug: 'pitch',        name: 'Pitch',        detail: 'Placeholder — the sequence is unwritten.' },
  { slug: 'brand',        name: 'Brand',        detail: 'Placeholder — the sequence is unwritten.' },
  { slug: 'report',       name: 'Report',       detail: 'Placeholder — the sequence is unwritten.' },
  { slug: 'presentation', name: 'Presentation', detail: 'Placeholder — the sequence is unwritten.' },
]

export const SLIDE_LAYOUTS = [
  { slug: 'cover',      name: 'Cover',      doc: COVER_DOC },
  { slug: 'wide-stamp', name: 'Wide stamp', doc: WIDE_STAMP_DOC },
  { slug: 'number',     name: 'Number',     doc: NUMBER_DOC },
  { slug: 'tall',       name: 'Tall',       doc: TALL_DOC },
  { slug: 'manifesto',  name: 'Manifesto',  doc: MANIFESTO_DOC },
  { slug: 'spatial',    name: 'Spatial',    doc: SPATIAL_DOC },
  { slug: 'look',       name: 'Look',       doc: LOOK_DOC },
  { slug: 'quote',      name: 'Quote',      doc: QUOTE_DOC },
  { slug: 'index',      name: 'Index',      doc: INDEX_DOC },
  { slug: 'duo',        name: 'Duo',        doc: DUO_DOC },
  { slug: 'specimen',   name: 'Specimen',   doc: SPECIMEN_DOC },
  { slug: 'contrast',   name: 'Contrast',   doc: CONTRAST_DOC },
  { slug: 'credits',    name: 'Credits',    doc: CREDITS_DOC },
  { slug: 'end',        name: 'End',        doc: END_DOC },
]
