import GridOverlay from '../../../../components/specimens/GridOverlay'
import LigaturesLightCard from './cards/LigaturesLightCard'
import BadalamentiPoetryCard from './cards/BadalamentiPoetryCard'
import ModernPrintingTypesCard from './cards/ModernPrintingTypesCard'
import WeightVariationsCard from './cards/WeightVariationsCard'

export default function RestComplete2Selection() {
  const columns = 12
  const gutter = 24
  const marginX = 48

  return (
    <GridOverlay columns={columns} gutter={gutter} marginX={marginX}>
      <LigaturesLightCard columns={columns} gutter={gutter} marginX={marginX} />
      <BadalamentiPoetryCard columns={columns} gutter={gutter} marginX={marginX} />
      <ModernPrintingTypesCard columns={columns} gutter={gutter} marginX={marginX} />
      <WeightVariationsCard columns={columns} gutter={gutter} marginX={marginX} />
    </GridOverlay>
  )
}
