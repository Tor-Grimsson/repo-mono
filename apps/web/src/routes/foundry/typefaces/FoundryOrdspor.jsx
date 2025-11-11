import TypefacePage from '../../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryOrdspor() {
  const typeface = getTypefaceConfig('ordspor')
  return <TypefacePage typeface={typeface} />
}
