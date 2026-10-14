import { useParams } from 'react-router-dom'
import { PageSection } from '@kolkrabbi/kol-framework'
import { getDeck } from '../data/decks'

/* The viewer the manager has always linked to (`/slide-deck/<slug>`) and no
 * repo ever routed — kol-website's App.jsx has the same gap, so the deck was
 * unreachable there too. Found 2026-09-02 ("it doesn't show on brand").
 * A deck without a renderer gets a sentence, not a crash (see data/decks.js). */
export default function SlideDeckView() {
  const { slug } = useParams()
  const deck = getDeck(slug)

  if (!deck) {
    return <PageSection id="deck-missing" label="slide deck" title="No such deck" body={`Nothing in the registry is called "${slug}".`} />
  }
  if (!deck.component) {
    return <PageSection id="deck-empty" label="slide deck" title={deck.name} body="This deck has no renderer yet — it is a row in the registry and nothing more." />
  }

  const Deck = deck.component
  return <Deck />
}
