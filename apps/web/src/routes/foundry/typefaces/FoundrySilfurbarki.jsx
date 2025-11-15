import SEO from '../../../components/layout/SEO'
import TypefacePage from '../../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundrySilfurbarki() {
  const typeface = getTypefaceConfig('silfurbarki')
  return (
    <>
      <SEO
        title="Silfurbarki — Typeface | Kolkrabbi Foundry"
        description="Silfurbarki is a typeface from the Kolkrabbi foundry collection. Free to download under SIL Open Font License."
        ogTitle="Silfurbarki — Typeface"
        ogDescription="Typeface from Kolkrabbi foundry. Free download."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/silfurbarki"
        canonical="https://kolkrabbi.io/foundry/silfurbarki"
      />
      <TypefacePage typeface={typeface} />
    </>
  )
}
