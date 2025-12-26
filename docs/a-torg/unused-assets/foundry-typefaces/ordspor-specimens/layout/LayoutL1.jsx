import GridOverlay from '../../../../../components/specimens/GridOverlay'
import GridSystemIntroCard from '../cards/GridSystemIntroCard'
import TwelveColumnsCard from '../cards/TwelveColumnsCard'
import TwoColumnCard from '../cards/TwoColumnCard'
import ThreeColumnCard from '../cards/ThreeColumnCard'
import AsymmetricCard from '../cards/AsymmetricCard'
import EditorialCard from '../cards/EditorialCard'
import ComplexGridCard from '../cards/ComplexGridCard'
import BaselineGridCard from '../cards/BaselineGridCard'

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
