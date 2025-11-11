import TypefacePage from '../../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryMalromur() {
  const typeface = getTypefaceConfig('malromur')
  return <TypefacePage typeface={typeface} />
}
