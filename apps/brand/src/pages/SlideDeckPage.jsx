import { useState } from 'react'
import { useParams } from 'react-router-dom'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { Button } from '@kolkrabbi/kol-component'
import { getDeck } from '../data/decks'

/**
 * SlideDeckPage — ONE deck, at `/slide-deck/:deck`.
 *
 * The route used to mount the deck OUTSIDE `Layout` (App.jsx), so it was
 * chrome-less always and the sidebar was unreachable from it. Inverted
 * 2026-08-01: the default keeps the shell and renders `DeckShell`'s existing
 * `inline` mode; fullscreen is the SAME component with `inline` off.
 *
 * Nothing was built for the fullscreen half — `.runway-deck-wrap` is
 * `position: fixed; inset: 0` at a high z-index (deckStyles.js), so it covers
 * the sidebar on its own even while mounted inside BrandLayout. `onExit`
 * returns here instead of DeckShell's default `navigate(-1)`, which would leave
 * the page entirely.
 *
 * A registry row without a `component` is a deck that has been named but has no
 * renderer yet — the manager can create rows before slides exist, so this says
 * so rather than crashing.
 */
export default function SlideDeckPage() {
  const { deck: slug } = useParams()
  const deck = getDeck(slug)
  usePageTitle(deck?.name ?? 'Slide deck')

  const [fullscreen, setFullscreen] = useState(false)
  const Deck = deck?.component

  if (!deck) {
    return (
      <PageSection id="slide-deck" label="slide deck" title="Unknown deck">
        <p className="kol-mono-12 text-fg-48 mt-6">No deck named “{slug}”.</p>
      </PageSection>
    )
  }

  if (fullscreen && Deck) return <Deck onExit={() => setFullscreen(false)} />

  return (
    <PageSection
      id={`slide-deck-${deck.slug}`}
      label="slide deck"
      title={deck.name}
      body={`${deck.slides} slides on the ${deck.template} template. Click prev/next to browse, or open it fullscreen.`}
    >
      <div className="mt-8 flex flex-col gap-6">
        {Deck ? (
          <>
            <Button
              variant="secondary"
              size="sm"
              iconRight="maximize"
              onClick={() => setFullscreen(true)}
              className="self-start"
            >
              Fullscreen
            </Button>
            <Deck inline />
          </>
        ) : (
          <p className="kol-mono-12 text-fg-48">This deck has no slides yet.</p>
        )}
      </div>
    </PageSection>
  )
}
