import SEO from '../../../components/layout/SEO'
import TypefacePage from '../components/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryOrdspor() {
  const typeface = getTypefaceConfig('ordspor')
  return (
    <>
      <SEO
        title="Orðspor — Typeface | Kolkrabbi Foundry"
        description="Orðspor is a typeface from the Kolkrabbi foundry collection. Free to download under SIL Open Font License."
        ogTitle="Orðspor — Typeface"
        ogDescription="Typeface from Kolkrabbi foundry. Free download."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/ordspor"
        canonical="https://kolkrabbi.io/foundry/ordspor"
      />
      <TypefacePage typeface={typeface} />
    </>
  )
}
