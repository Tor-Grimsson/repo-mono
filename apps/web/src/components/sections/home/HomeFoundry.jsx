import FoundryFeatureSection from '../foundry/FoundryFeatureSection'

const HomeFoundry = () => {
  return (
    <section id="type" className="w-full">

      <div className="max-w-[1400px] mx-auto">

        <FoundryFeatureSection
          imageSrc="/img/home/foundry-solid.png"
          imageAlt="Type Design"
          label="Type Foundry"
          title="Custom typefaces & specimens"
          description="Explore collections of original typefaces designed for editorial, branding, and digital applications. Experimental display types and classic typefaces, variable axis OTF, TTF, and WOFF formats with specimen pages that display in layout context."
          cta={{
            to: '/foundry',
            label: 'Browse Typefaces',
            icon: 'type-foundry',
            id: 'type-button',
            className: 'mt-12 mb-3'
          }}
        />

      </div>
    </section>
  )
}

export default HomeFoundry
