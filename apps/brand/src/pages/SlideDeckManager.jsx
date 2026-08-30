import { useNavigate } from 'react-router-dom'
import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { Button, ContentCollection, ContentRow, Icon } from '@kolkrabbi/kol-component'
import { DECKS } from '../data/decks'

/**
 * SlideDeckManager — the `/slide-deck` home. A LIST of decks, not a viewer.
 *
 * Row anatomy is the DS content-card family — `ContentCollection form="list"`
 * over `ContentRow variant="file"` (media · title · date · size · actions),
 * swapped off the deprecated `MediaRow` 2026-08-27 with the rest of the site.
 * Not hand-rolled: a third transcription of that row is exactly what the
 * `MediaLibrary` lobby brief exists to stop.
 *
 * Create · rename · delete · export are rendered DISABLED. They are the PRODUCT
 * half of this scope and carry unmade decisions (the slide-count/color/template
 * modal, and which export target — pptx / key / pdf / svg — is real). Showing
 * the affordance without the behaviour is deliberate; wiring a fake one is not.
 */
export default function SlideDeckManager() {
  usePageTitle('Slide deck')
  const navigate = useNavigate()

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

      <div className="mt-8">
        <ContentCollection form="list">
        {DECKS.map((deck) => (
          <ContentRow
            key={deck.slug}
            variant="file"
            media={
              <div className="w-full h-full bg-surface-inverse flex items-center justify-center">
                <Icon name="maximize" size={16} className="text-fg-inverse-64" />
              </div>
            }
            title={deck.name}
            href={`/slide-deck/${deck.slug}`}
            onNavigate={(e) => { e.preventDefault(); navigate(`/slide-deck/${deck.slug}`) }}
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
        </ContentCollection>
      </div>
    </PageSection>
  )
}
