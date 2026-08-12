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
      {/* Space-driven tracks, not viewport breakpoints — the shell's fixed
        * rails shrink the main column, so md:/lg: column counts over-packed
        * it and the cards compressed. auto-fill + a card min snaps 3→2→1. */}
      <div className="mt-8 grid gap-6 grid-cols-[repeat(auto-fill,minmax(22rem,1fr))]">
        {group.pages.map((p) => (
          <OverviewCard
            key={p.path}
            label={p.label}
            subtitle={p.desc}
            icon={p.icon || group.icon}
            href={`/workshop/${p.path}`}
            description={`Open ${p.label} in the workshop`}
           
          />
        ))}
      </div>
    </PageSection>
  </div>
)

export default EmbedOverview
