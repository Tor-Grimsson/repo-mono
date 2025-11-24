import GridOverlay from '../../../../../components/specimens/GridOverlay'
import TypeSizesCard from './l2-new-cards/TypeSizesCard'

export default function LayoutL2New() {
  const columns = 12
  const gutter = 24
  const marginX = 48

  return (
    <GridOverlay columns={columns} gutter={gutter} marginX={marginX}>
      <TypeSizesCard columns={columns} gutter={gutter} marginX={marginX} />
    </GridOverlay>
  )
}
