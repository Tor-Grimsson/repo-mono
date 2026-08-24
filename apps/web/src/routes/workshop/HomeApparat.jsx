import { ExhibitLinkCard } from '@kolkrabbi/kol-workshop'
import { PageSection } from '@kolkrabbi/kol-framework'
import { APPARAT_TOOLS, APPARAT_SECTIONS } from '../../data/workshop/apparatTools'

// Overview = the about/concept page (overview contract): use-case sections, cards
// link INTERNAL to each tool's about page; the live deploy is an opt-in link
// under each card — never the default click.
const HomeApparat = () => {
  return (
    <div>
      <PageSection
        id="apparat-overview"
        label="Scope: Apparat — Overview"
        title="Apparat Overview"
        body="Standalone experimental tools — wave physics, generative geometry, SVG effects, embedded editors. Each runs as its own live deploy; a card opens the tool's story page, where the frame and the live deploy are one click away."
      />

      {APPARAT_SECTIONS.map((section) => (
        <PageSection key={section.id} id={section.id} label="Use case" title={section.title} body={section.body}>
          <div className="mt-8 grid gap-6 grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))]">
            {APPARAT_TOOLS.filter((t) => t.section === section.id).map((tool) => (
              <div key={tool.id} className="flex flex-col gap-2">
                <ExhibitLinkCard
                  label={tool.label}
                  subtitle={tool.subtitle}
                  icon={tool.icon}
                  href={`/workshop/apparat/${tool.id}`}
                  description={`About ${tool.label}`}
                 
                />
                <a href={tool.live} target="_blank" rel="noreferrer" className="kol-helper-10 text-fg-48 hover:text-emphasis">
                  {tool.live.replace('https://', '').replace(/\/$/, '')} ↗
                </a>
              </div>
            ))}
          </div>
        </PageSection>
      ))}
    </div>
  )
}

export default HomeApparat
