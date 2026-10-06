import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Button, SectionSplit, TiltCard } from '@kolkrabbi/kol-component'
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
    <div id="type" className="w-full">
      <SectionSplit
        align="left"
        eyebrow="Type Foundry"
        headline="Custom typefaces & specimens"
        headlineSize="heading-01"
        body="Explore collections of original typefaces designed for editorial, branding, and digital applications. Experimental display types and classic typefaces, variable axis OTF, TTF, and WOFF formats with specimen pages that display in layout context."
        actions={
          <Link to="/foundry" className="inline-flex">
            <Button id="type-button" size="lg">Browse Typefaces</Button>
          </Link>
        }
        /* TiltCard is the section's hover — it was dropped in the 08-15 swap to
         * the DS split (user 2026-08-26: "it completely skips the tilt"). The
         * frame zoom (`mediaHover`) would fight it, so it stays off. */
        media={<TiltCard src={imageSrc} alt="Type Design" className="w-full h-full rounded-[var(--kol-radius-sm)]" />}
        mediaClip={false}
        ratio="5/4"
        /* THE RUNG SIZES THE IMAGE (component 0.239.0, SectionSplit frame ratio
         * ticket 2026-10-02): beside the text the frame's height is the rung minus
         * padding and its width follows `ratio`. On the default `60` a 5/4 frame
         * reads 393×314 at 1600×950 — small in a 696 column — so `80`. */
        height="80"
        slotClass={{ eyebrow: 'reveal', headline: 'reveal', body: 'reveal', actions: 'reveal' }}
        slotStyle={{ eyebrow: { '--reveal-delay': '0.3s' }, headline: { '--reveal-delay': '0.4s' }, body: { '--reveal-delay': '0.5s' }, actions: { '--reveal-delay': '0.6s' } }}
      />
    </div>
  )
}

export default HomeFoundry
