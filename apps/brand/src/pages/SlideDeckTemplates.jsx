import PageSection from '../components/framework/PageSection'
import usePageTitle from '../components/hooks/usePageTitle'
import { DECKS } from '../data/decks'

/**
 * SlideDeckTemplates — view (and eventually edit) the layouts a new deck starts
 * from.
 *
 * There is exactly ONE template today: `runway`, the layout the Right Grotesk
 * deck is built on. It is derived from the registry rather than declared
 * separately, so this page cannot drift from what the decks actually use.
 *
 * Editing is not implemented — it is the PRODUCT half of this scope. The page
 * exists so the route and its place in the tree are real; it says what it holds
 * rather than faking an editor.
 */
export default function SlideDeckTemplates() {
  usePageTitle('Templates')

  const templates = [...new Set(DECKS.map((d) => d.template))]

  return (
    <PageSection
      id="slide-deck-templates"
      label="slide deck"
      title="Templates"
      body="Layouts a new deck starts from. Derived from the deck registry, so this list cannot drift from what the decks actually use."
    >
      <ul className="mt-8 flex flex-col gap-3">
        {templates.map((t) => {
          const users = DECKS.filter((d) => d.template === t)
          return (
            <li key={t} className="flex items-baseline gap-4 py-3 border-b border-fg-08">
              <span className="kol-mono-12 text-emphasis flex-1">{t}</span>
              <span className="kol-mono-12 text-fg-48">
                {users.length} {users.length === 1 ? 'deck' : 'decks'}
              </span>
            </li>
          )
        })}
      </ul>
    </PageSection>
  )
}
