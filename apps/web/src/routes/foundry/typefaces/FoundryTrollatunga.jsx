import SEO from '../../../components/layout/SEO'
import TypefacePage from '../../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryTrollatunga() {
  const typeface = getTypefaceConfig('trollatunga')
  return (
    <>
      <SEO
        title="Trollatunga — Experimental Typeface | Kolkrabbi Foundry"
        description="Trollatunga is an experimental typeface exploring unique letterforms and typography. Free under SIL Open Font License."
        ogTitle="Trollatunga — Experimental Typeface"
        ogDescription="Experimental typeface with unique letterforms. Free download."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/trollatunga"
        canonical="https://kolkrabbi.io/foundry/trollatunga"
      />
      <TypefacePage typeface={typeface} />
    </>
  )
}
