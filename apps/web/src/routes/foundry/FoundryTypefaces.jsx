import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../../components/layout/SEO'
import { TypefaceLibraryGridWithVariables } from '@kolkrabbi/kol-foundry'
import InDevelopmentSection from './components/InDevelopmentSection'
import FeaturedCarousel from '../../components/sections/shared/FeaturedCarousel'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/foundry'

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
      subtitle: 'Voice Characteristic',
      description: 'A contemporary italic variable font for editorial design',
      classification: 'Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght, slnt)',
      link: '/foundry/typefaces/malromur',
      specimens: [
        { name: 'Variable Axis', link: '/foundry/specimen/two' },
        { name: 'Prose Styles', link: '/foundry/specimen/prose' }
      ]
    },
    {
      name: 'TG Rót',
      subtitle: 'Root',
      description: 'Precise geometric sans serif with variable weight and width axes',
      classification: 'Sans Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght, wdth)',
      link: '/foundry/typefaces/root',
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
      link: '/foundry/typefaces/trollatunga',
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
      link: '/foundry/typefaces/dylgjur',
      specimens: []
    },
    {
      name: 'TG Gullhamrar',
      subtitle: 'Compliments',
      description: 'Variable weight typeface with warm, graceful forms',
      classification: 'Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght)',
      link: '/foundry/typefaces/gullhamrar',
      specimens: []
    }
  ]

  const upcomingTypefaces = [
    {
      name: 'TG Silfurbarki',
      subtitle: 'Silver Bark',
      description: 'Organic display typeface inspired by birch bark textures',
      classification: 'Display',
      status: 'In Development',
      year: '2025',
      styles: 'Regular'
    },
    {
      name: 'TG Orðspor',
      subtitle: 'Reputation',
      description: 'Editorial serif with strong personality for headlines',
      classification: 'Serif',
      status: 'In Development',
      year: '2025',
      styles: 'Variable (wght)'
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
  const carouselBase = `${cdnBase}/foundry-global/01-carousel`
  const featuredTypefaces = typefaces.slice(0, 5).map(typeface => {
    // Map typeface to CDN carousel image
    const carouselId = typeface.name === 'TG Málrómur' ? 'malromur' :
                       typeface.name === 'TG Rót' ? 'raetur' :
                       typeface.name === 'TG Tröllatunga' ? 'trollatunga' :
                       typeface.name === 'TG Dylgjur' ? 'dylgjur' :
                       typeface.name === 'TG Gullhamrar' ? 'gullhamrar' :
                       null
    const imagePath = carouselId ? `${carouselBase}/carousel-${carouselId}/carousel-${carouselId}-1200.jpg` : null

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
      <main id="main" className="min-h-screen w-full bg-surface-primary">
      {/* Featured Typefaces Carousel — full bleed */}
      <div className="pt-14 md:pt-16">
        <FeaturedCarousel
          items={featuredTypefaces}
          sectionLabel="Featured Typefaces"
          buttonLabel="Explore Typeface"
          showHeader={false}
          fullWidth
          rounded={false}
          autoPlay
          autoPlayInterval={10000}
        />
      </div>

      {/* All Typefaces Grid with Variable Preview and Typeface Filter */}
      <div className="breakpoint-padding">
      <TypefaceLibraryGridWithVariables
        typefaces={typefaces}
        typefaceWeights={typefaceWeights}
        totalCount={typefaces.length}
        linkComponent={Link}
      />

      {/* Coming Soon */}
      <InDevelopmentSection typefaces={upcomingTypefaces} />
      </div>

    </main>
    </>
  )
}

export default FoundryTypefaces
