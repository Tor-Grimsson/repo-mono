import GridOverlay from '../../../../components/specimens/GridOverlay'
import TitlePageCard from './cards/TitlePageCard'
import WordGridBadgesCard from './cards/WordGridBadgesCard'
import WordListDarkCard from './cards/WordListDarkCard'
import AmpersandCard from './cards/AmpersandCard'
import AaSpecimenCard from './cards/AaSpecimenCard'
import WordListStackedCard from './cards/WordListStackedCard'
import DynkurCard from './cards/DynkurCard'
import SlarkCard from './cards/SlarkCard'
import LigatureCard from './cards/LigatureCard'
import KarpBusinessCard from './cards/KarpBusinessCard'
import WordBrokenCard from './cards/WordBrokenCard'
import UppercaseAlphabetCard from './cards/UppercaseAlphabetCard'
import LowercaseAlphabetCard from './cards/LowercaseAlphabetCard'
import RaftjanCard from './cards/RaftjanCard'
import PoemPage1Card from './cards/PoemPage1Card'
import GridLayoutLightCard from './cards/GridLayoutLightCard'
import PoemPage2Card from './cards/PoemPage2Card'
import GridLayoutDarkCard from './cards/GridLayoutDarkCard'
import PoemPage3Card from './cards/PoemPage3Card'
import IcelandicCharSetCard from './cards/IcelandicCharSetCard'
import PoemPage1DarkCard from './cards/PoemPage1DarkCard'
import FladurTitleCard from './cards/FladurTitleCard'
import GridLigaturesCard from './cards/GridLigaturesCard'

export default function DylgjurSelection() {
  const columns = 12
  const gutter = 24
  const marginX = 48

  return (
    <GridOverlay columns={columns} gutter={gutter} marginX={marginX}>
      <TitlePageCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordGridBadgesCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordListDarkCard columns={columns} gutter={gutter} marginX={marginX} />
      <AmpersandCard columns={columns} gutter={gutter} marginX={marginX} />
      <AaSpecimenCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordListStackedCard columns={columns} gutter={gutter} marginX={marginX} />
      <DynkurCard columns={columns} gutter={gutter} marginX={marginX} />
      <SlarkCard columns={columns} gutter={gutter} marginX={marginX} />
      <LigatureCard columns={columns} gutter={gutter} marginX={marginX} />
      <KarpBusinessCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordBrokenCard columns={columns} gutter={gutter} marginX={marginX} />
      <UppercaseAlphabetCard columns={columns} gutter={gutter} marginX={marginX} />
      <LowercaseAlphabetCard columns={columns} gutter={gutter} marginX={marginX} />
      <RaftjanCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage1Card columns={columns} gutter={gutter} marginX={marginX} />
      <GridLayoutLightCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage2Card columns={columns} gutter={gutter} marginX={marginX} />
      <GridLayoutDarkCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage3Card columns={columns} gutter={gutter} marginX={marginX} />
      <IcelandicCharSetCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage1DarkCard columns={columns} gutter={gutter} marginX={marginX} />
      <FladurTitleCard columns={columns} gutter={gutter} marginX={marginX} />
      <GridLigaturesCard columns={columns} gutter={gutter} marginX={marginX} />
    </GridOverlay>
  )
}
