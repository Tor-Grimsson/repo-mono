import FoundryFeatureSection from '../../../routes/foundry/components/FoundryFeatureSection'

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
