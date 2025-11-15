import SEO from '../../../components/layout/SEO'
import TypefacePage from '../../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryGullhamrar() {
  const typeface = getTypefaceConfig('gullhamrar')
  return (
    <>
      <SEO
        title="Gullhamrar — Typeface | Kolkrabbi Foundry"
        description="Gullhamrar is a typeface from the Kolkrabbi foundry collection. Free to download under SIL Open Font License."
        ogTitle="Gullhamrar — Typeface"
        ogDescription="Typeface from Kolkrabbi foundry. Free download."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/gullhamrar"
        canonical="https://kolkrabbi.io/foundry/gullhamrar"
      />
      <TypefacePage typeface={typeface} />
    </>
  )
}
