import SEO from '../../components/layout/SEO'
import { OverviewHero, FoundryCTA, PrintCard } from '@kol/ui'
import { prints } from '../../data/prints'

export default function Prints() {

  return (
    <>
      <SEO
        title="Prints — Art Print Store"
        description="Original art prints available for purchase. Limited editions and open editions in various sizes."
        ogTitle="Art Prints — Kolkrabbi"
        ogDescription="Browse and purchase original art prints, limited editions, and open editions."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/prints"
        canonical="https://kolkrabbi.io/prints"
      />
      <main className="min-h-screen w-full overflow-x-hidden bg-surface-primary pb-24">
        <OverviewHero
          badge="Print Shop"
          title="Art Prints"
          description="Original artwork available as high-quality prints. Each piece is printed on archival paper with museum-grade inks."
          variant="left"
        />

        {/* Cards Section */}
        <section aria-label="Print catalog" className="flex flex-col">
          {prints.map((print, index) => (
            <div
              key={print.id}
              className="reveal"
              style={{ '--reveal-delay': `${index * 0.1}s` }}
            >
              <PrintCard print={print} />
            </div>
          ))}
        </section>

        <FoundryCTA
          heading="Custom Commissions"
          description="Interested in a custom piece or collaboration? Get in touch to discuss your project."
          action={{
            to: 'mailto:hello@kolkrabbi.io',
            label: 'Get in Touch'
          }}
        />
      </main>
    </>
  )
}
