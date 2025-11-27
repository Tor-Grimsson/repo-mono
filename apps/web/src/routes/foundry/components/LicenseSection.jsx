import React from 'react'
import { FoundryCTA } from '@kol/ui'

const LicenseSection = () => {
  return (
    <FoundryCTA
      heading="Licence"
      description="TG Málrómur is available for both personal and commercial use. Please review licensing terms before use."
      action={{
        to: '/foundry/licence',
        label: 'Licence details',
        variant: 'secondary'
      }}
    />
  )
}

export default LicenseSection
