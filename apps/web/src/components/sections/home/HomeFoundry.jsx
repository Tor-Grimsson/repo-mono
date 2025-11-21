import TiltCard from '../../animation/TiltCard'
import { Button, SectionLabel } from '@kol/ui'
import { Link } from 'react-router-dom'

const HomeFoundry = () => {
  return (
    <section id="type" className="w-full">

      <div className="max-w-[1400px] mx-auto">

        <div className="flex flex-col py-16 lg:flex-row gap-16">

          {/* Image - Left Column */}
          <div className="w-full lg:flex-1">
          <TiltCard
            src="/img/home/foundry-solid.png"
            alt="Type Design"
            className="w-full aspect-[5/4] rounded-[4px]"
          />
          </div>

          {/* Content - Right Column */}
          <div className="w-full lg:flex-1 py-16">
            <SectionLabel className="mb-2" text="Type Foundry" size="md" />

            <h2 className="kol-heading-lg mb-6">
              Custom typefaces & specimens
            </h2>

            <p className="kol-mono text-auto mb-6">
              Explore collections of original typefaces designed for editorial, branding, and digital applications. Experimental display types and classic typefaces, variable axis otf, ttf, woff’s with specimen pages that display in layout context.
            </p>

            <Link to="/foundry" className="inline-flex">
              <Button id="type-button" iconLeft="type-foundry" size="md" className="mt-12 mb-3">
                Browse Typefaces
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

export default HomeFoundry
