import GridOverlay from '../../../../components/specimens/GridOverlay'
import LigaturesCard from './cards/LigaturesCard'
import WaterfallCard from './cards/WaterfallCard'
import MalromurSpecimenCard from './cards/MalromurSpecimenCard'
import CharacterSetCard from './cards/CharacterSetCard'

export default function RestComplete1Selection() {
  const columns = 12
  const gutter = 24
  const marginX = 48

  return (
    <GridOverlay columns={columns} gutter={gutter} marginX={marginX}>
      <LigaturesCard columns={columns} gutter={gutter} marginX={marginX} />
      <WaterfallCard columns={columns} gutter={gutter} marginX={marginX} />
      <MalromurSpecimenCard columns={columns} gutter={gutter} marginX={marginX} />
      <CharacterSetCard columns={columns} gutter={gutter} marginX={marginX} />
    </GridOverlay>
  )
}
