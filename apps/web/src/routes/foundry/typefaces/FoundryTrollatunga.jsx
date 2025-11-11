import TypefacePage from '../../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryTrollatunga() {
  const typeface = getTypefaceConfig('trollatunga')
  return <TypefacePage typeface={typeface} />
}
