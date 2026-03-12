import { OverviewCard } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const APPARATUS_CARDS = [
  { id: 'kol-radial', label: 'Kol Radial', subtitle: 'Parametric waveform vector editor', icon: 'circle', href: '/workshop/apparat/kol-radial' },
  { id: 'kol-modulator', label: 'Kol Modulator', subtitle: 'Interactive frequency visualizer', icon: 'frequency', href: '/workshop/apparat/kol-modulator' },
  { id: 'kol-editor', label: 'Kol Editor', subtitle: 'Vector design editor', icon: 'layout', href: '/workshop/apparat/kol-editor' },
  { id: 'kol-noter', label: 'Kol Noter', subtitle: 'Hierarchical note-taking system', icon: 'pen', href: '/workshop/apparat/kol-noter' },
  { id: 'kol-distress', label: 'Kol Distress', subtitle: 'SVG distortion and texture tool', icon: 'interactive', href: '/workshop/apparat/kol-distress' },
  { id: 'kol-mirror', label: 'Kol Mirror', subtitle: 'Interactive image distortion playground', icon: 'hall-of-symphony', href: '/workshop/apparat/kol-mirror' }
]

const HomeApparat = () => {
  return (
    <div className="space-y-10">
      <DesPage
        title="Apparat Overview"
        subtitle="Experimental canvases for wave physics, PixiJS manipulations, and embedded editors. Pick a lab to explore."
        meta="Scope: Apparat — Overview"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {APPARATUS_CARDS.map((card) => (
          <OverviewCard key={card.id} {...card} className="h-64" description={`Explore ${card.label}`} />
        ))}
      </div>
    </div>
  )
}

export default HomeApparat
