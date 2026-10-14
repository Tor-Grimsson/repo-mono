import { useState } from 'react'
import { CatalogPage } from '@kolkrabbi/kol-shell'
import { FullscreenOverlay, Icon } from '@kolkrabbi/kol-component'
import usePageTitle from '../components/hooks/usePageTitle'
import SlideThumb from '../components/loaders/decks/SlideThumb'
import { DECK_TYPES, SLIDE_LAYOUTS } from '../data/templates'
import '../styles/decks.css'

/**
 * SlideDeckTemplates — `/slide-deck/template`, on `CatalogPage preset="shelf"`.
 *
 * Two views on one page, reached through the strip the shelf preset already
 * puts top-right above the divider — DECK / SLIDES rather than All / Recent
 * (user, 2026-09-03). DECK is the deck types a new deck starts from; SLIDES is
 * the page layouts those types are assembled out of. The strip does not filter
 * `items` — `views` is a controlled strip and the page swaps the list.
 *
 * The slide cards render the layout LIVE (`SlideThumb`), so this page cannot
 * drift from what the deck actually renders — the same reason the old list read
 * its one row off `DECKS`.
 *
 * Editing is not implemented — it is the PRODUCT half of this scope, with the
 * deck types themselves. The page says what it holds rather than faking an
 * editor.
 */
export default function SlideDeckTemplates() {
  usePageTitle('Templates')
  const [view, setView] = useState('deck')
  const [preview, setPreview] = useState(null)
  const slides = view === 'slides'

  return (
    <>
    <CatalogPage
      preset="shelf"
      /* the preset's own strip is All / Recent; this page's axis is what the
         two lists ARE, so both values and labels are replaced */
      views={[{ value: 'deck', label: 'Deck' }, { value: 'slides', label: 'Slides' }]}
      view={view}
      onViewChange={setView}
      header={{
        title: 'Templates',
        subtitle: 'Deck types a new deck starts from, and the page layouts they are assembled out of.',
      }}
      /* a slide card is ONE track of the six-track grid (user 2026-09-03), not
         the shelf preset's two. The 280 floor is what caps it at three, so the
         slides view goes back to the catalog's own 160. */
      maxColumns={slides ? 6 : 3}
      minColumn={slides ? 160 : 280}
      /* showcase's card layout is `drawer` — image-only at rest, the title on a
         plate that rises over the bottom on hover. A wall of layouts is a wall
         of images by design and the name is the reveal, which is the shipped
         WorkCard's whole argument. Its own ratio is 3/4; a slide is 16:9, set
         per card below. */
      cardVariant={slides ? 'showcase' : 'slide'}
      /* the drawer plate's padding is a work card's (16 → 24 at the md rung) and
         these cards are a sixth of the grid; `.slide-layouts` cuts it in
         decks.css. Local, not a DS trip — the pad is right for a work shelf. */
      className={slides ? 'slide-layouts' : ''}
      items={slides ? SLIDE_LAYOUTS : DECK_TYPES}
      filtersTitle="Templates"
      searchKeys={['name', 'detail']}
      iconComponent={Icon}
      toCard={(t, { layout }) => ({
        key: t.slug,
        title: t.name,
        detail: t.detail,
        ...(slides ? { ratio: '16 / 9' } : {}),
        /* GRID ONLY. showcase's card title is `kol-sans-display-03` — a work
           card's face, and these cards are a sixth of the grid; `titleClass` is
           the DS's own override for it (ContentText: "the site passes its face
           as titleClass"). The ink is INVERSE because the drawer plate is
           `surface-inverse` — the row has no plate, so the same class there is
           inverse ink on the dark page and the title all but vanishes. */
        ...(slides && layout !== 'list' ? { titleClass: 'kol-helper-12 uppercase text-fg-inverse truncate' } : {}),
        /* the layout renders itself; `media` is the consumer's slot, so the
           preset leaves it alone. A deck type has no picture until its
           sequence exists, so its card is an empty 16:9 plate. */
        media: t.doc ? <SlideThumb doc={t.doc} /> : undefined,
        /* a layout card OPENS the layout — `interactive` is `href || onClick`,
           so the anchor is what makes the card pressable and `onNavigate` is the
           SPA seam that cancels it. There is no route to a layout; the overlay
           IS the destination. */
        ...(t.doc ? { href: '#', onNavigate: (e) => { e.preventDefault(); setPreview(t) } } : {}),
      })}
    />

      {/* the DS overlay owns the scrim, Escape, the backdrop, the focus trap and
          the scroll lock; the panel is ours. Same SlideThumb as the card — it
          measures its box and zooms the 1920 stage, so one component serves the
          thumbnail and the full view. */}
      <FullscreenOverlay open={preview != null} onClose={() => setPreview(null)}>
        {/* the close is `absolute; top: spacing-3 (12); right: 0` on the SHEET,
            and the sheet hugs its child — flush, the X lands on the artwork.
            The pads move the slide off both edges so the 26px square clears it
            by the SAME 12 on each axis: top 50 − (12 + 26) = 12, right 38 − 26
            = 12. Asymmetric pads because the DS insets are asymmetric. */}
        <div className="w-[90vw] max-w-[1600px] pt-[50px] pr-[38px]">
          {preview && <SlideThumb doc={preview.doc} />}
        </div>
      </FullscreenOverlay>
    </>
  )
}
