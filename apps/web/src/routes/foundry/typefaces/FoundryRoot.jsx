import SEO from '../../../components/layout/SEO'
import TypefacePage from '../components/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryRoot() {
  const typeface = getTypefaceConfig('rot')
  return (
    <>
      <SEO
        title="Rót — Display Typeface | Kolkrabbi Foundry"
        description="Rót is a bold display typeface with geometric characteristics. Perfect for headlines and large-scale typography. Free under SIL OFL."
        ogTitle="Rót — Display Typeface"
        ogDescription="Bold geometric display typeface. Free download."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/typefaces/root"
        canonical="https://kolkrabbi.io/foundry/typefaces/root"
      />
      <TypefacePage typeface={typeface} />
    </>
  )
}
