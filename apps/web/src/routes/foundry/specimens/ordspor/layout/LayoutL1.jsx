import GridOverlay from '../../../../../components/specimens/GridOverlay'
import GridSystemIntroCard from './l1-cards/GridSystemIntroCard'
import TwelveColumnsCard from './l1-cards/TwelveColumnsCard'
import TwoColumnCard from './l1-cards/TwoColumnCard'
import ThreeColumnCard from './l1-cards/ThreeColumnCard'
import AsymmetricCard from './l1-cards/AsymmetricCard'
import EditorialCard from './l1-cards/EditorialCard'
import ComplexGridCard from './l1-cards/ComplexGridCard'
import BaselineGridCard from './l1-cards/BaselineGridCard'

export default function LayoutL1() {
  const columns = 12
  const gutter = 24
  const marginX = 48

  return (
    <GridOverlay columns={columns} gutter={gutter} marginX={marginX}>
      <GridSystemIntroCard columns={columns} gutter={gutter} marginX={marginX} />
      <TwelveColumnsCard columns={columns} gutter={gutter} marginX={marginX} />
      <TwoColumnCard columns={columns} gutter={gutter} marginX={marginX} />
      <ThreeColumnCard columns={columns} gutter={gutter} marginX={marginX} />
      <AsymmetricCard columns={columns} gutter={gutter} marginX={marginX} />
      <EditorialCard columns={columns} gutter={gutter} marginX={marginX} />
      <ComplexGridCard columns={columns} gutter={gutter} marginX={marginX} />
      <BaselineGridCard columns={columns} gutter={gutter} marginX={marginX} />
    </GridOverlay>
  )
}
