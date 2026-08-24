import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, FeatureSplit } from '@kolkrabbi/kol-component'
import { useThemeAttr } from '../../../hooks/useThemeAttr'

const cdnBase = 'https://b2.kolkrabbi.io/website/asset-library/homepage'

const HomeFoundry = () => {
  const theme = useThemeAttr()

  const imageSrc = useMemo(() => {
    // Inverted: light image on dark background, dark image on light background
    const variant = theme === 'dark' ? 'foundry-card-light' : 'foundry-card-dark'
    return `${cdnBase}/home-foundry-card/${variant}/${variant}-1200.jpg`
  }, [theme])

  return (
    <div id="type" className="w-full" style={{ '--reveal-delay': '0.3s' }}>
      <FeatureSplit
        flip
        kicker="Type Foundry"
        title="Custom typefaces & specimens"
        titleSize="heading-01"
        body="Explore collections of original typefaces designed for editorial, branding, and digital applications. Experimental display types and classic typefaces, variable axis OTF, TTF, and WOFF formats with specimen pages that display in layout context."
        ctas={
          <Link to="/foundry" className="inline-flex">
            <Button id="type-button">Browse Typefaces</Button>
          </Link>
        }
        media={<img src={imageSrc} alt="Type Design" className="w-full h-full object-cover" />}
        mediaAspect="5/4"
        mediaHover
        columnClassName="reveal"
      />
    </div>
  )
}

export default HomeFoundry
