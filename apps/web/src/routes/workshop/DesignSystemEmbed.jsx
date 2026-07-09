import { PageSection } from '@kolkrabbi/kol-framework'
import { Icon } from '@kolkrabbi/kol-component'

// Embedded view of the live design system, for people who'd rather not leave the workshop.
// If ui.kolkrabbi.io blocks framing (X-Frame-Options/CSP), the iframe stays blank — the
// open-external link is the guaranteed path.
const LIVE_URL = 'https://ui.kolkrabbi.io'

const DesignSystemEmbed = () => (
  <div>
    <PageSection
      id="ds-embed-intro"
      label="Scope: Design System — Embedded"
      title="Embedded view"
      body="The live design system, in-frame. If it doesn't load, it's blocking embedding — open it directly instead."
    >
      <div className="mt-6">
        <a href={LIVE_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-[4px] border border-fg-08 bg-fg-04 px-4 py-3 kol-sans-body-02 text-fg-88 hover:bg-fg-08">
          <Icon name="interactive" size={16} />
          Open ui.kolkrabbi.io
          <Icon name="arrow-up-right" size={14} />
        </a>
      </div>
    </PageSection>

    <PageSection id="frame" label="Live" title="ui.kolkrabbi.io">
      <div className="mt-8 overflow-hidden rounded-[4px] border border-fg-08 bg-fg-04">
        <iframe
          src={LIVE_URL}
          title="KOL Design System — ui.kolkrabbi.io"
          className="h-[80vh] w-full border-0"
          loading="lazy"
        />
      </div>
    </PageSection>
  </div>
)

export default DesignSystemEmbed
