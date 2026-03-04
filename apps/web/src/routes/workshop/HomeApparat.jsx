import { OverviewCard } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const APPARATUS_CARDS = [
  { id: 'radial-editor', label: 'Radial Editor', subtitle: '360° Sine wave generator', icon: 'circle', href: '/workshop/apparat/radial-editor' },
  { id: 'frequency-modulator', label: 'Frequency Modulator', subtitle: 'Multi-circle wave apparatus', icon: 'frequency', href: '/workshop/apparat/frequency-modulator' },
  { id: 'kol-editor', label: 'Kol Editor', subtitle: 'Embedded visual editor', icon: 'layout', href: '/workshop/apparat/kol-editor' }
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
