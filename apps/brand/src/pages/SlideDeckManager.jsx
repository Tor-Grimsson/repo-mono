import { Link } from 'react-router-dom'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { Button, MediaRow, Icon } from '@kolkrabbi/kol-component'
import { DECKS } from '../data/decks'

/**
 * SlideDeckManager — the `/slide-deck` home. A LIST of decks, not a viewer.
 *
 * Row anatomy is the DS `MediaRow` molecule (thumb · name · date · size ·
 * actions) — the same component behind the kol-media admin's list view, which
 * is the surface this was specced against. Not hand-rolled: a third
 * transcription of that row is exactly what the `MediaLibrary` lobby brief
 * exists to stop.
 *
 * Create · rename · delete · export are rendered DISABLED. They are the PRODUCT
 * half of this scope and carry unmade decisions (the slide-count/color/template
 * modal, and which export target — pptx / key / pdf / svg — is real). Showing
 * the affordance without the behaviour is deliberate; wiring a fake one is not.
 */
export default function SlideDeckManager() {
  usePageTitle('Slide deck')

  return (
    <PageSection
      id="slide-deck"
      label="slide deck"
      title="Decks"
      body="Every deck in the brand book. Open one to view or present it; templates define the layouts a new deck starts from."
    >
      <header className="mt-6 flex items-center gap-3 flex-wrap">
        <Button variant="primary" size="sm" iconRight="plus" disabled>
          New deck
        </Button>
        <Button variant="secondary" size="sm" href="/slide-deck/templates">
          Templates
        </Button>
        <span className="kol-mono-12 text-fg-48">
          {DECKS.length} {DECKS.length === 1 ? 'deck' : 'decks'}
        </span>
      </header>

      <ul className="mt-8">
        {DECKS.map((deck) => (
          <MediaRow
            key={deck.slug}
            thumb={
              <div className="w-full h-full bg-surface-inverse flex items-center justify-center">
                <Icon name="maximize" size={16} className="text-fg-inverse-64" />
              </div>
            }
            name={
              <Link to={`/slide-deck/${deck.slug}`} className="kol-mono-12 text-emphasis no-underline hover:underline">
                {deck.name}
              </Link>
            }
            date={deck.updated}
            size={`${deck.slides} slides`}
            actions={
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" quiet disabled>Rename</Button>
                <Button variant="ghost" size="sm" quiet disabled>Export</Button>
                <Button variant="ghost" size="sm" quiet disabled>Delete</Button>
              </div>
            }
          />
        ))}
      </ul>
    </PageSection>
  )
}
