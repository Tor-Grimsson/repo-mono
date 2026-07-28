import { PageSection } from '@kolkrabbi/kol-framework'
import { Button } from '@kolkrabbi/kol-component'
import OverviewCard from '../../components/ui/OverviewCard'

// The 'about' page of an embed group (overview contract): concept intro with the
// single-site external opt-in, then every child page as a card. Scrollable by
// design — the embeds themselves are full-bleed.
const EmbedOverview = ({ group }) => (
  <div>
    <PageSection
      id={`${group.id}-overview`}
      label={`Scope: ${group.label} — Overview`}
      title="Overview"
      body={group.blurb}
    >
      <div className="mt-6">
        <Button variant="primary" href={group.site} target="_blank" rel="noreferrer" iconLeft="desktop" iconRight="external-link">
          Open {group.siteLabel}
        </Button>
      </div>
    </PageSection>

    <PageSection id={`${group.id}-pages`} label="Pages" title="Embedded views">
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {group.pages.map((p) => (
          <OverviewCard
            key={p.path}
            label={p.label}
            subtitle={p.desc}
            icon={group.icon}
            href={`/workshop/${p.path}`}
            description={`Open ${p.label} in the workshop`}
            className="h-64"
          />
        ))}
      </div>
    </PageSection>
  </div>
)

export default EmbedOverview
