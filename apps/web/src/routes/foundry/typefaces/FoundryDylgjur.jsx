import SEO from '../../../components/layout/SEO'
import TypefacePage from '../../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryDylgjur() {
  const typeface = getTypefaceConfig('dylgjur')
  return (
    <>
      <SEO
        title="Dylgjur — Experimental Sans-Serif Display Typeface | Kolkrabbi Foundry"
        description="Experimental sans-serif display typeface. Free to download under SIL Open Font License."
        ogTitle="Dylgjur — Experimental Sans-Serif Display"
        ogDescription="Experimental sans-serif display typeface. Free download."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-01.png"
        ogUrl="https://kolkrabbi.io/foundry/typefaces/dylgjur"
        canonical="https://kolkrabbi.io/foundry/typefaces/dylgjur"
      />
      <TypefacePage typeface={typeface} />
    </>
  )
}
