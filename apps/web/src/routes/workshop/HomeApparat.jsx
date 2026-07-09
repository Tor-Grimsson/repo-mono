import { OverviewCard } from '@kol/ui'
import { PageSection } from '@kolkrabbi/kol-framework'

// Curated launcher: each apparat ships as its own deployed standalone. Cards link OUT to the
// live tool (repo links live in the sidebar nav). Replaces the old inline re-implementations.
const APPARATUS_CARDS = [
  { id: 'kol-monitor', label: 'Kol Monitor', subtitle: 'Modular video synthesizer — eurorack model, pure-math geometry', icon: 'stat-chart-a', href: 'https://monitor.kolkrabbi.io/', description: 'monitor.kolkrabbi.io ↗' },
  { id: 'kol-mirror', label: 'Kol Mirror', subtitle: 'Interactive image-distortion playground (PixiJS)', icon: 'hall-of-symphony', href: 'https://mirror.kolkrabbi.io/', description: 'mirror.kolkrabbi.io ↗' },
  { id: 'kol-ds-editor', label: 'Kol Design Editor', subtitle: 'Embeddable vector + generative design editor', icon: 'layout', href: 'https://editor.kolkrabbi.io/', description: 'editor.kolkrabbi.io ↗' },
  { id: 'kol-distress', label: 'Kol Distress', subtitle: 'SVG distortion & texture tool', icon: 'interactive', href: 'https://distress.kolkrabbi.io/', description: 'distress.kolkrabbi.io ↗' },
  { id: 'kol-vcap', label: 'Kol Vcap', subtitle: 'Console-driven skinless tab recorder for Chromium', icon: 'row', href: 'https://kol-vcap.vercel.app/', description: 'kol-vcap.vercel.app ↗' },
  { id: 'kol-radial', label: 'Kol Radial', subtitle: 'Parametric waveform vector editor', icon: 'circle', href: 'https://radial.kolkrabbi.io/', description: 'radial.kolkrabbi.io ↗' },
  { id: 'kol-modulator', label: 'Kol Modulator', subtitle: 'Interactive frequency visualizer', icon: 'frequency', href: 'https://modulator.kolkrabbi.io/', description: 'modulator.kolkrabbi.io ↗' },
  // TODO(blurb): confirm what kol-radar is — placeholder subtitle.
  { id: 'kol-radar', label: 'Kol Radar', subtitle: 'Radar visualizer', icon: 'dashboard-roadmap', href: 'https://kol-radar.vercel.app/', description: 'kol-radar.vercel.app ↗' }
]

const HomeApparat = () => {
  return (
    <div>
      <PageSection
        id="apparat-overview"
        label="Scope: Apparat — Overview"
        title="Apparat Overview"
        body="Standalone experimental tools — wave physics, generative geometry, SVG effects, embedded editors. Each runs as its own live deploy; pick one to open it."
      />

      <PageSection id="tools" label="Live deploys" title="Explore">
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {APPARATUS_CARDS.map((card) => (
            <OverviewCard key={card.id} {...card} target="_blank" rel="noreferrer" className="h-64" />
          ))}
        </div>
      </PageSection>
    </div>
  )
}

export default HomeApparat
