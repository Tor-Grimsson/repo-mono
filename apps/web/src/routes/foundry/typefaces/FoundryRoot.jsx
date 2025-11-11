import TypefacePage from '../../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryRoot() {
  const typeface = getTypefaceConfig('rot')
  return <TypefacePage typeface={typeface} />
}
