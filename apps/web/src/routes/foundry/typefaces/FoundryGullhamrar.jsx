import TypefacePage from '../../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../../data/foundry/typefaceConfig'

export default function FoundryGullhamrar() {
  const typeface = getTypefaceConfig('gullhamrar')
  return <TypefacePage typeface={typeface} />
}
