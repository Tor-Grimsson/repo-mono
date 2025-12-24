import { useMemo } from 'react'
import { useTheme } from '@kol/ui'
import FoundryFeatureSection from '../../../routes/foundry/components/FoundryFeatureSection'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/homepage'

const HomeFoundry = () => {
  const { theme } = useTheme()

  const imageSrc = useMemo(() => {
    // Inverted: light image on dark background, dark image on light background
    const variant = theme === 'dark' ? 'foundry-card-light' : 'foundry-card-dark'
    return `${cdnBase}/home-foundry-card/${variant}/${variant}-1200.jpg`
  }, [theme])

  return (
    <section id="type" className="w-full">

      <div className="max-w-[1400px] mx-auto">

        <FoundryFeatureSection
          imageSrc={imageSrc}
          imageAlt="Type Design"
          label="Type Foundry"
          title="Custom typefaces & specimens"
          description="Explore collections of original typefaces designed for editorial, branding, and digital applications. Experimental display types and classic typefaces, variable axis OTF, TTF, and WOFF formats with specimen pages that display in layout context."
          contentWrapperClassName="reveal w-full lg:flex-1 py-16"
          contentWrapperStyle={{ '--reveal-delay': '0.3s' }}
          cta={{
            to: '/foundry',
            label: 'Browse Typefaces',
            id: 'type-button',
            className: 'mt-12 mb-3'
          }}
        />

      </div>
    </section>
  )
}

export default HomeFoundry
