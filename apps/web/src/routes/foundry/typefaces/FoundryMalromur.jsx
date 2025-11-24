import SEO from '../../../components/layout/SEO'
import TypefacePage from '../components/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryMalromur() {
  const typeface = getTypefaceConfig('malromur')
  return (
    <>
      <SEO
        title="Málrómur — Variable Serif Typeface | Kolkrabbi Foundry"
        description="Málrómur is a variable serif typeface designed for Icelandic editorial and literary design. Free download under SIL Open Font License."
        ogTitle="Málrómur — Variable Serif Typeface"
        ogDescription="Variable serif typeface for editorial design. Free download."
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/foundry/malromur"
        canonical="https://kolkrabbi.io/foundry/malromur"
      />
      <TypefacePage typeface={typeface} titleClassName="text-8xl font-bold" />
    </>
  )
}
