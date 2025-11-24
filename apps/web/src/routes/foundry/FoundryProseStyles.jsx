import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/layout/SEO'
import { OverviewHero, FoundryCTA, TypefaceCard } from '@kol/ui'
import FeaturedCarousel from '../../components/sections/shared/FeaturedCarousel'
import { proseStyles } from '../../data/foundry/specimens'

const FoundryProseStyles = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const featuredProseStyles = [
    {
      displayText: 'Málrómur',
      subtitle: 'Prose Specifications',
      subtitleSecondary: '11 Editorial Patterns',
      description: 'Editorial patterns for prose applications across 11 typographic contexts',
      href: '/foundry/prose-specs/malromur',
      image: '/img/typefaces/malromur/set-a-04.png',
      fontFamily: 'TGMalromur',
      fontStyle: 'italic'
    },
    {
      displayText: 'Documentation',
      subtitle: 'Prose Specifications',
      subtitleSecondary: 'Wiki Style',
      description: 'Typography specifications for technical documentation and wiki-style content',
      href: '/foundry/prose-specs/documentation',
      image: '/img/typefaces/rot/set-g-03.png',
      fontFamily: 'RightGrotesk',
      fontStyle: 'normal'
    },
    {
      displayText: 'Stack',
      subtitle: 'Prose Specifications',
      subtitleSecondary: 'Article Style',
      description: 'Typography specifications for article and blog content',
      href: '/foundry/prose-specs/stack',
      image: '/img/typefaces/dylgjur/set-b-02.png',
      fontFamily: 'RightGrotesk',
      fontStyle: 'normal'
    }
  ]

  return (
    <>
      <SEO
        title="Prose Styles — Kolkrabbi Foundry"
        description="Typography patterns for real-world prose applications across editorial, scientific, and technical contexts."
        ogTitle="Prose Styles Collection"
        ogDescription="View prose style patterns across all Kolkrabbi typefaces"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/prose-styles"
        canonical="https://kolkrabbi.io/foundry/prose-styles"
      />
      <main className="min-h-screen w-full bg-surface-primary">
        {/* Hero Section */}
        <OverviewHero
          badge="Prose Styles"
          title="Typographic Patterns"
          description="Prose style specimens across multiple typefaces. Patterns include editorial layouts, scientific papers, legislative documents, and technical documentation."
          categories={['Editorial', 'Scientific', 'Technical']}
        />

        {/* Featured Carousel */}
        <FeaturedCarousel
          items={featuredProseStyles}
          sectionLabel="Featured Prose Styles"
          buttonLabel="View Specifications"
        />

        {/* Prose Styles Grid */}
        <section className="w-full px-8 py-16">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {proseStyles.map((prose, index) => (
                <Link key={prose.id} to={prose.link}>
                  <TypefaceCard
                    name={prose.name}
                    subtitle={`${prose.patterns} ${prose.patterns === 1 ? 'Pattern' : 'Patterns'}`}
                    description={prose.description}
                    fontFamily={prose.fontFamily}
                    fontStyle={prose.fontStyle}
                    isActive={activeIndex === index}
                    onMouseEnter={() => setActiveIndex(index)}
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <FoundryCTA
          heading="Typeface Specimens"
          description="Specimens with character sets and technical specifications."
          action={{
            to: "/foundry/specimens",
            label: "Browse Specimens"
          }}
        />
      </main>
    </>
  )
}

export default FoundryProseStyles
