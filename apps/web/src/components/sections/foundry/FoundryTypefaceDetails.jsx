import React from 'react'
import { FeatureGrid, ButtonGroup } from '@kol/ui'
import FoundrySection from './components/FoundrySection'

const FoundryTypefaceDetails = () => {
  const details = [
    { title: 'Designer', description: 'Tor Grimsson', icon: 'foundation' },
    { title: 'Categories', description: 'Serif, Italic, Display', icon: 'foundation' },
    { title: 'Styles', description: '4 Weights', icon: 'foundation' },
    { title: 'Format', description: 'OTF, WOFF2', icon: 'foundation' }
  ]

  return (
    <section className="w-full py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        <FoundrySection
          variant="label"
          label="Font Details"
          showDropdown={false}
        />

        <FeatureGrid variant="row" features={details} />

        <div className="flex flex-col items-center gap-2 pt-10 pb-4">
          <ButtonGroup
            buttons={[
              { label: 'Download Font', variant: 'primary' },
              { label: 'View Specimen', variant: 'outline' }
            ]}
            align="center"
          />
        </div>
      </div>
    </section>
  )
}

export default FoundryTypefaceDetails
