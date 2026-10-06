import { ExhibitLinkCard } from '@kolkrabbi/kol-workshop'
import { PageSection } from '@kolkrabbi/kol-framework'
import { PAGES, pageHref } from '../../data/workshop/pages.js'

/* The card's footer line: the page's state and when it last changed, in the
 * same DD.MM.YYYY the frontmatter block prints. */
const stateLine = ({ status, updated }) =>
  [status && status.charAt(0).toUpperCase() + status.slice(1), updated && updated.split('-').reverse().join('.')]
    .filter(Boolean)
    .join(' · ')

const WorkshopIntroduction = () => (
  <div>
    <PageSection
      id="workshop-overview"
      label="Scope: Workshop — Introduction"
      title="Workshop Overview"
      body="The apps and tools around Kolkrabbi, each on its own subdomain. A card opens its page here — what it is, its state, and the way to the live app."
    />

    <PageSection id="sections" label="Sections" title="Explore">
      <div className="mt-8 grid gap-6 grid-cols-[repeat(auto-fill,minmax(min(22rem,100%),1fr))]">
        {PAGES.map((page) => (
          <ExhibitLinkCard
            key={page.id}
            label={page.title.toUpperCase()}
            subtitle={page.description}
            description={stateLine(page)}
            icon={page.icon}
            image={page.image || null}
            href={pageHref(page.id)}
          />
        ))}
      </div>
    </PageSection>
  </div>
)

export default WorkshopIntroduction
