import TypefacePage from '../../components/sections/foundry/TypefacePage'
import { getTypefaceConfig } from '../../data/foundry/typefaceConfig'

export default function FoundryDylgjur() {
  const typeface = getTypefaceConfig('dylgjur')
  return <TypefacePage typeface={typeface} />
}
