import SEO from '../../../components/layout/SEO'
import TypefacePage from '../components/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryDylgjur() {
  const typeface = getTypefaceConfig('dylgjur')
  return (
    <>
      <SEO
        title="Dylgjur — Typeface | Kolkrabbi Foundry"
        description="Dylgjur is a distinctive typeface from the Kolkrabbi collection. Free to download under SIL Open Font License."
        ogTitle="Dylgjur — Typeface"
        ogDescription="Distinctive typeface from Kolkrabbi. Free download."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/dylgjur"
        canonical="https://kolkrabbi.io/foundry/dylgjur"
      />
      <TypefacePage typeface={typeface} />
    </>
  )
}
