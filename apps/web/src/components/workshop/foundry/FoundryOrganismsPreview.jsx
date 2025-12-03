import DesSection from '../molecules/DesSection'
import TypefaceLibraryGridWithVariables from '../../../routes/foundry/components/TypefaceLibraryGridWithVariables'

/**
 * FoundryOrganismsPreview - Showcase foundry organisms
 */
const FoundryOrganismsPreview = () => {
  const typefaces = [
    {
      name: 'TG Málrómur',
      classification: 'Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght)',
      link: '/foundry/typefaces/malromur'
    },
    {
      name: 'TG Gullhamrar',
      classification: 'Serif',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght)',
      link: '/foundry/typefaces/gullhamrar'
    },
    {
      name: 'TG Rót',
      classification: 'Sans',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght, wdth)',
      link: '/foundry/typefaces/root'
    },
    {
      name: 'TG Dylgjur',
      classification: 'Sans',
      status: 'Available',
      year: '2025',
      styles: 'Variable (wght)',
      link: '/foundry/typefaces/dylgjur'
    }
  ]

  const typefaceWeights = {
    'TG Málrómur': [
      { weight: 'Light', value: 300 },
      { weight: 'Regular', value: 400 },
      { weight: 'Medium', value: 500 },
      { weight: 'Bold', value: 700 }
    ],
    'TG Gullhamrar': [
      { weight: 'Light', value: 300 },
      { weight: 'Regular', value: 400 },
      { weight: 'Bold', value: 700 }
    ]
  }

  return (
    <div className="space-y-8">
      <DesSection
        name="Typeface Library Card"
        description="Filterable typeface grid with card and list view toggle."
        details="Used on /foundry/typefaces"
      />

      <TypefaceLibraryGridWithVariables
        typefaces={typefaces}
        typefaceWeights={typefaceWeights}
        totalCount={typefaces.length}
      />
    </div>
  )
}

export default FoundryOrganismsPreview
