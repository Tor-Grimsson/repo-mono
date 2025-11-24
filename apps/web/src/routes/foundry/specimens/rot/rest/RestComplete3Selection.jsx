import GridOverlay from '../../../../../components/specimens/GridOverlay'
import SjofidlaHyrpingsordCard from './cards/SjofidlaHyrpingsordCard'
import ModernPrintingTypesContinuedCard from './cards/ModernPrintingTypesContinuedCard'
import MalromurAlmannarCard from './cards/MalromurAlmannarCard'
import IcelandicPoetryDisplayCard from './cards/IcelandicPoetryDisplayCard'
import SizeProgressionCard from './cards/SizeProgressionCard'

export default function RestComplete3Selection() {
  const columns = 12
  const gutter = 24
  const marginX = 48

  return (
    <GridOverlay columns={columns} gutter={gutter} marginX={marginX}>
      <SjofidlaHyrpingsordCard columns={columns} gutter={gutter} marginX={marginX} />
      <ModernPrintingTypesContinuedCard columns={columns} gutter={gutter} marginX={marginX} />
      <MalromurAlmannarCard columns={columns} gutter={gutter} marginX={marginX} />
      <IcelandicPoetryDisplayCard columns={columns} gutter={gutter} marginX={marginX} />
      <SizeProgressionCard columns={columns} gutter={gutter} marginX={marginX} />
    </GridOverlay>
  )
}
