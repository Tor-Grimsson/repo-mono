import SEO from '../../../../components/layout/SEO'
import { OverviewHero, FoundryCTA } from '@kol/ui'
import FeaturesCardSection from '../../../../components/sections/shared/FeaturesCardSection'
import FoundryFeatureSection from '../../components/FoundryFeatureSection'
import ChapterNavigation from '../../../../components/sections/shared/ChapterNavigation'

const SpecimenRotHub = () => {
  // Quick Links data
  const quickLinks = [
    {
      title: 'Complete Selection',
      description: 'Full specimen with all display patterns',
      href: '/foundry/specimen/rot/complete',
      icon: 'foundation',
      visual: '/img/typefaces/rot/set-g-03.png',
      backgroundColor: 'bg-surface-on-inverse'
    },
    {
      title: 'Design System Typography',
      description: 'Type scale with variable font capabilities',
      href: '/foundry/specimen/rot/design-systems',
      icon: 'dashboard-book-open',
      visual: '/img/typefaces/rot/set-g-03.png',
      backgroundColor: 'bg-surface-on-inverse'
    },
    {
      title: 'Licensing',
      description: 'Free under SIL OFL 1.1',
      href: '/foundry/licensing',
      icon: 'cone',
      visual: '/img/home/feat-4.png',
      backgroundColor: 'bg-surface-on-inverse'
    }
  ]

  // Specimen chapters for TOC navigation
  const proseChapters = [
    {
      title: 'Hero Title',
      subtitle: 'TG Rót Grotesk Sans',
      description: 'Large-scale title page displaying the typeface name.',
      href: '/foundry/specimen/rot/complete#section-1'
    },
    {
      title: 'Exhibition',
      subtitle: 'Performance Display',
      description: 'Event card layout with hierarchical typography.',
      href: '/foundry/specimen/rot/complete#section-2'
    },
    {
      title: 'Catalogue',
      subtitle: 'Editorial Layout',
      description: 'Exhibition catalogue spread with structured typography.',
      href: '/foundry/specimen/rot/complete#section-3'
    },
    {
      title: 'Pamphlet',
      subtitle: 'Performance Trio',
      description: 'Performance pamphlet with structured hierarchy.',
      href: '/foundry/specimen/rot/complete#section-4'
    },
    {
      title: 'Pantone',
      subtitle: 'Color Swatches',
      description: 'Pantone color swatch layout demonstrating weight variations.',
      href: '/foundry/specimen/rot/complete#section-5'
    },
    {
      title: 'Play 1-2',
      subtitle: 'Theatre Pages',
      description: 'Theatrical layout with dialogue structure.',
      href: '/foundry/specimen/rot/complete#section-6'
    },
    {
      title: 'Play 3-4',
      subtitle: 'Theatre Pages',
      description: 'Continuation of theatrical layout.',
      href: '/foundry/specimen/rot/complete#section-7'
    },
    {
      title: 'Restaurant',
      subtitle: 'Fine Dining Menu',
      description: 'Restaurant menu with elegant typographic hierarchy.',
      href: '/foundry/specimen/rot/complete#section-8'
    },
    {
      title: 'Suzanne Ciani',
      subtitle: 'Buchla Performance 1975',
      description: 'Music performance layout with modular grid.',
      href: '/foundry/specimen/rot/complete#section-9'
    },
    {
      title: 'Icelandic Poetry',
      subtitle: 'Large Display',
      description: 'Poetry layout at large display scale.',
      href: '/foundry/specimen/rot/complete#section-10'
    },
    {
      title: 'Character Display',
      subtitle: 'Large Ð Graphic',
      description: 'Single character showcase at large scale.',
      href: '/foundry/specimen/rot/complete#section-11'
    },
    {
      title: 'Variable Axis',
      subtitle: 'Weight Variations',
      description: 'Variable font demonstration showing weight axis.',
      href: '/foundry/specimen/rot/complete#section-12'
    }
  ]

  return (
    <>
      <SEO
        title="Rót Specimen — Kolkrabbi Foundry"
        description="Variable sans-serif typeface for design systems. Explore weight and width axes, type scale, and systematic typography."
        ogTitle="Rót Type Specimen"
        ogDescription="TG Rót specimen showcasing variable font capabilities and design systems"
        ogImage="https://kolkrabbi.io/img/typefaces/rot/set-g-03.png"
        ogUrl="https://kolkrabbi.io/foundry/specimen/rot"
        canonical="https://kolkrabbi.io/foundry/specimen/rot"
      />

      <main className="min-h-screen w-full bg-surface-primary mb-16">
        {/* Hero Section */}
        <OverviewHero
          badge="Variable Sans Serif"
          title={
            <span style={{ fontFamily: 'TGRoot', fontWeight: 700, textTransform: 'none' }}>
              Rót
            </span>
          }
          description="A variable sans-serif typeface with two axes—weight and width—designed for structured design systems. Complete typographic hierarchy from display to utility sizes with precise control."
          categories={['Sans Serif', 'Variable', 'Systems']}
        />

        {/* Featured Image */}
        <section className="w-full py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary flex items-center justify-center">
              <img
                src="/img/typefaces/rot/set-g-03.png"
                alt="Rót typeface specimen"
                className="absolute left-0 top-0 size-full object-cover object-center"
              />
              <div className="relative z-10 text-[120px] md:text-[256px] text-fg-96" style={{ fontFamily: 'TGRoot', fontWeight: 700 }}>
                Rót
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <FeaturesCardSection
          sectionClassName="w-full py-16"
          wrapperClassName="max-w-[1400px] mx-auto flex flex-col gap-6"
          headerClassName="w-full"
          headerLabel="Navigation"
          headerDescription="Jump into specimen sections and licensing"
          cardsWrapperClassName="grid grid-cols-1 md:grid-cols-3 gap-6"
          features={quickLinks}
          showHeader={true}
          showActions={false}
        />

        {/* About Section */}
        <section className="w-full h-[720px] flex items-center">
          <div className="max-w-[1400px] mx-auto">
            <FoundryFeatureSection
              label="About the Typeface"
              title="Variable Sans-Serif for Design Systems"
              description="Variable sans-serif typeface with two axes: weight and width. Built for design systems and structured typographic hierarchies."
              imagePosition="right"
              cta={{
                to: '/foundry/typefaces/root',
                label: 'View Typeface Details',
                className: 'mt-8'
              }}
              graphic={<img src="/img/typefaces/rot/set-g-03.png" alt="Rót specimen" className="w-full aspect-[10/7] rounded object-cover" />}
            />
          </div>
        </section>

        {/* Chapter Jump Links */}
        <ChapterNavigation
          title="Specimen Sections"
          description="Jump to specimen sections and display patterns"
          chapters={proseChapters}
          variant="list"
        />

        {/* Specs Preview Card */}
        <section className="w-full h-[720px] flex items-center">
          <div className="max-w-[1400px] mx-auto">
            <FoundryFeatureSection
              label="Technical Specifications"
              title="Font Metrics & Details"
              description="Technical specifications including variable axes, OpenType features, character set coverage, and file information."
              imagePosition="left"
              cta={{
                to: '#',
                label: 'Coming Soon',
                className: 'mt-8'
              }}
              graphic={<img src="/img/typefaces/rot/set-g-03.png" alt="Rót specifications" className="w-full aspect-[10/7] rounded object-cover" />}
            />
          </div>
        </section>

        {/* CTA */}
        <FoundryCTA
          heading="Download Rót"
          description="Free for personal and commercial use under SIL Open Font License."
          action={{
            to: '/foundry/licensing',
            label: 'View License & Download'
          }}
        />
      </main>
    </>
  )
}

export default SpecimenRotHub
