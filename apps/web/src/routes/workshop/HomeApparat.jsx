import { Icon } from '@kol/ui'
import DesPage from '../../components/workshop/molecules/DesPage'

const APPARATUS_CARDS = [
  { id: 'circle-generator', label: 'Harmonic Radial Dial', subtitle: 'Wave sculpting interface', icon: 'circle', href: '/workshop/apparatus/circle-generator' },
  { id: 'frequency-modulator', label: 'Frequency Modulator', subtitle: 'Multi-circle wave apparatus', icon: 'interactive', href: '/workshop/apparatus/frequency-modulator' },
  { id: 'kol-editor', label: 'Kol Editor', subtitle: 'Embedded visual editor', icon: 'styleguide', href: '/workshop/apparatus/kol-editor' }
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
          <a key={card.id} href={card.href} className="group flex h-60 flex-col gap-3 rounded bg-surface-inverse p-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="kol-helper-uc-s">{card.label}</h3>
                <p className="kol-helper-fine-xxs italic text-fg-64 mt-1">{card.subtitle}</p>
              </div>
              <Icon name={card.icon} size={16} />
            </div>
            <div className="flex flex-1 items-center justify-center overflow-hidden rounded border border-fg-08">
              <Icon name={card.icon} size={64} className="text-auto transition-transform duration-300 group-hover:scale-105" />
            </div>
            <p className="kol-helper-xxs text-fg-48">Explore {card.label}</p>
          </a>
        ))}
      </div>
    </div>
  )
}

export default HomeApparat