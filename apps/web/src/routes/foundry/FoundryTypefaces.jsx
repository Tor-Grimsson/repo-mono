import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/layout/SEO'
import { FoundryCTA, OverviewHero } from '@kol/ui'
import TypefaceLibraryGridWithVariables from '../../components/sections/foundry/TypefaceLibraryGridWithVariables'
import InDevelopmentSection from '../../components/sections/foundry/InDevelopmentSection'
import FeaturedCarousel from '../../components/sections/shared/FeaturedCarousel'

const FoundryTypefaces = () => {

  // Weight variants and axes for variable fonts
  const typefaceWeights = {
    'TG Málrómur': [
      { weight: 'Light', value: 200, axis: 'wght' },
      { weight: 'Regular', value: 300, axis: 'wght' },
      { weight: 'Medium', value: 400, axis: 'wght' },
      { weight: 'SemiBold', value: 500, axis: 'wght' },
      { weight: 'Bold', value: 700, axis: 'wght' },
      { weight: 'Black', value: 900, axis: 'wght' }
    ],
    'TG Rót': [
      // Weight axis
      { weight: 'Light', value: 200, axis: 'wght' },
      { weight: 'Regular', value: 400, axis: 'wght' },
      { weight: 'Medium', value: 500, axis: 'wght' },
      { weight: 'Bold', value: 700, axis: 'wght' },
      { weight: 'Black', value: 900, axis: 'wght' },
      // Width axis
      { weight: 'Narrow', value: 75, axis: 'wdth' },
      { weight: 'Normal', value: 100, axis: 'wdth' },
      { weight: 'Extended', value: 125, axis: 'wdth' }
    ],
    'TG Gullhamrar': [
      { weight: 'Light', value: 200, axis: 'wght' },
      { weight: 'Regular', value: 400, axis: 'wght' },
      { weight: 'Medium', value: 500, axis: 'wght' },
      { weight: 'Bold', value: 700, axis: 'wght' },
      { weight: 'Black', value: 900, axis: 'wght' }
    ],
    'TG Orðspor': [
      { weight: 'Light', value: 200, axis: 'wght' },
      { weight: 'Regular', value: 400, axis: 'wght' },
      { weight: 'Medium', value: 500, axis: 'wght' },
      { weight: 'Bold', value: 700, axis: 'wght' },
      { weight: 'Black', value: 900, axis: 'wght' }
    ],
    'TG Dylgjur': [
      { weight: 'Regular', value: 400, axis: 'wght' }
    ],
    'TG Tröllatunga': [
      { weight: 'Regular', value: 400, axis: 'wght' }
    ]
  }

  const typefaces = [
    {
      name: 'TG Málrómur',
      subtitle: 'Variable Italic Serif',
      description: 'A contemporary italic variable font for editorial design',
      classification: 'Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght, slnt)',
      link: '/foundry/malromur',
      specimens: [
        { name: 'Variable Axis', link: '/specimen/two' },
        { name: 'Prose Styles', link: '/specimen/prose' }
      ]
    },
    {
      name: 'TG Rót',
      subtitle: '3-Axis Variable Sans',
      description: 'Precise geometric sans serif with variable weight and width axes',
      classification: 'Sans Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght, wdth)',
      link: '/foundry/root',
      specimens: []
    },
    {
      name: 'TG Tröllatunga',
      subtitle: 'Troll Tongue',
      description: 'Display typeface with expressive character',
      classification: 'Display',
      status: 'Available',
      year: '2025',
      styles: 'Regular',
      link: '/foundry/trollatunga',
      specimens: []
    },
    {
      name: 'TG Dylgjur',
      subtitle: 'Falsehood',
      description: 'Sharp angles and pointed character for critical discourse',
      classification: 'Sans Serif',
      status: 'Available',
      year: '2025',
      styles: 'Regular',
      link: '/foundry/dylgjur',
      specimens: []
    },
    {
      name: 'TG Gullhamrar',
      subtitle: 'Compliment',
      description: 'Variable weight typeface with warm, graceful forms',
      classification: 'Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght)',
      link: '/foundry/gullhamrar',
      specimens: []
    },
    {
      name: 'TG Orðspor',
      subtitle: 'Reputation',
      description: 'Variable weight typeface for impactful statements',
      classification: 'Sans Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght)',
      link: '/foundry/ordspor',
      specimens: []
    },
  ]

  const upcomingTypefaces = [
    {
      name: 'TG Silfurbarki',
      subtitle: 'Silver Bark',
      description: 'Display typeface for those with a voice like silver',
      classification: 'Display',
      status: 'In Development',
      year: '2026',
      styles: 'Regular'
    },
    {
      name: 'TG Einbreið',
      subtitle: 'Single Width',
      description: 'Monospaced for technical applications and code',
      classification: 'Monospace',
      status: 'In Development',
      year: '2026',
      styles: 'Variable (wght)'
    }
  ]

  // Prepare featured typefaces for carousel
  const featuredTypefaces = typefaces.slice(0, 4).map(typeface => {
    // Map typeface to image folder and file
    const imagePath = typeface.name === 'TG Málrómur' ? '/img/typefaces/malromur/set-a-01.png' :
                      typeface.name === 'TG Rót' ? '/img/typefaces/rot/set-g-01.png' :
                      typeface.name === 'TG Tröllatunga' ? '/img/typefaces/trollatunga/set-c-01.png' :
                      typeface.name === 'TG Dylgjur' ? '/img/typefaces/dylgjur/set-b-01.png' :
                      typeface.name === 'TG Gullhamrar' ? '/img/typefaces/gullhamrar/set-f-01.png' :
                      null

    const fontFamily = typeface.name === 'TG Rót' ? 'TGRoot' :
                       typeface.name === 'TG Tröllatunga' ? 'TGTrollatunga' :
                       typeface.name === 'TG Dylgjur' ? 'TGDylgjur' :
                       typeface.name === 'TG Gullhamrar' ? 'TGGullhamrar' :
                       'TGMalromur'

    const fontStyle = typeface.name === 'TG Málrómur' ? 'italic' : 'normal'
    const displayText = typeface.name.replace('TG ', '')

    return {
      title: displayText,
      subtitle: typeface.name,
      subtitleSecondary: typeface.subtitle,
      description: typeface.description,
      href: typeface.link,
      image: imagePath,
      fontFamily,
      fontStyle,
      displayText
    }
  })

  return (
    <>
      <SEO
        title="All Typefaces — Kolkrabbi Foundry"
        description="Browse our complete library of free, open-source typefaces including Málrómur, Rót, Gullhamrar, and more."
        ogTitle="Kolkrabbi Typeface Library"
        ogDescription="Browse all available free typefaces from Kolkrabbi"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/typefaces"
        canonical="https://kolkrabbi.io/foundry/typefaces"
      />
      <main className="min-h-screen w-full bg-surface-primary">
      {/* Hero Section */}
      <OverviewHero
        badge="Typefaces"
        title="Kolkrabbi Type Library"
        description="Browse our full lineup of fonts—versatile workhorses, iconic showstoppers, and everything in between. Each typeface is crafted to perform, obsessively detailed, and free to try."
        categories={['Serif', 'Sans Serif', 'Display', 'Monospace']}
      />

      {/* Featured Typefaces Carousel */}
      <FeaturedCarousel
        items={featuredTypefaces}
        sectionLabel="Featured Typefaces"
        buttonLabel="Explore Typeface"
      />

      {/* All Typefaces Grid with Variable Preview and Typeface Filter */}
      <TypefaceLibraryGridWithVariables
        typefaces={typefaces}
        typefaceWeights={typefaceWeights}
        totalCount={typefaces.length}
      />

      {/* Coming Soon */}
      <InDevelopmentSection typefaces={upcomingTypefaces} />

      {/* Bottom CTA */}
      <FoundryCTA
        heading="Explore Specimens"
        description="See our typefaces in action across different contexts and applications. Each specimen demonstrates real-world usage patterns."
        action={{
          to: "/foundry/specimens",
          label: "View All Specimens"
        }}
      />
    </main>
    </>
  )
}

export default FoundryTypefaces
