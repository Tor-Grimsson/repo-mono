import TypefacePage from '../../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundrySilfurbarki() {
  const typeface = getTypefaceConfig('silfurbarki')
  return <TypefacePage typeface={typeface} />
}
