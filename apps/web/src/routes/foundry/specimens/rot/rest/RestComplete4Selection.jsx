import GridOverlay from '../../../../../components/specimens/GridOverlay'
import LeturgerdPresentationCard from './cards/LeturgerdPresentationCard'
import LigatureFflLargeCard from './cards/LigatureFflLargeCard'
import MalromurOrnamentalCard from './cards/MalromurOrnamentalCard'
import TorgrotContinuousCard from './cards/TorgrotContinuousCard'
import TorgrotBoldGridCard from './cards/TorgrotBoldGridCard'

export default function RestComplete4Selection() {
  const columns = 12
  const gutter = 24
  const marginX = 48

  return (
    <GridOverlay columns={columns} gutter={gutter} marginX={marginX}>
      <LeturgerdPresentationCard columns={columns} gutter={gutter} marginX={marginX} />
      <LigatureFflLargeCard columns={columns} gutter={gutter} marginX={marginX} />
      <MalromurOrnamentalCard columns={columns} gutter={gutter} marginX={marginX} />
      <TorgrotContinuousCard columns={columns} gutter={gutter} marginX={marginX} />
      <TorgrotBoldGridCard columns={columns} gutter={gutter} marginX={marginX} />
    </GridOverlay>
  )
}
