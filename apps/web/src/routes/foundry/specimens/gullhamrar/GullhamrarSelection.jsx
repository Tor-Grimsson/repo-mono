import GridOverlay from '../../../../components/specimens/GridOverlay'
import TitlePageCard from './cards/TitlePageCard'
import AmpersandCard from './cards/AmpersandCard'
import LongSCard from './cards/LongSCard'
import WordListDualCard from './cards/WordListDualCard'
import AaSpecimenCard from './cards/AaSpecimenCard'
import WordListStackedCard from './cards/WordListStackedCard'
import DynkurCard from './cards/DynkurCard'
import SpecialCharactersCard from './cards/SpecialCharactersCard'
import SlarkCard from './cards/SlarkCard'
import PoetryCard from './cards/PoetryCard'
import LigaturesCard from './cards/LigaturesCard'
import ExtendedWordListCard from './cards/ExtendedWordListCard'
import SignageCard from './cards/SignageCard'
import WordBrokenCard from './cards/WordBrokenCard'
import OrganicShapesCard from './cards/OrganicShapesCard'
import WordListDark2Card from './cards/WordListDark2Card'
import AlphabetDualCard from './cards/AlphabetDualCard'
import PoemPage1Card from './cards/PoemPage1Card'
import CharacterSetCard from './cards/CharacterSetCard'
import PoemPage2Card from './cards/PoemPage2Card'
import FinalTitleCard from './cards/FinalTitleCard'

export default function GullhamrarSelection() {
  const columns = 12
  const gutter = 24
  const marginX = 48

  return (
    <GridOverlay columns={columns} gutter={gutter} marginX={marginX}>
      <TitlePageCard columns={columns} gutter={gutter} marginX={marginX} />
      <AmpersandCard columns={columns} gutter={gutter} marginX={marginX} />
      <LongSCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordListDualCard columns={columns} gutter={gutter} marginX={marginX} />
      <AaSpecimenCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordListStackedCard columns={columns} gutter={gutter} marginX={marginX} />
      <DynkurCard columns={columns} gutter={gutter} marginX={marginX} />
      <SpecialCharactersCard columns={columns} gutter={gutter} marginX={marginX} />
      <SlarkCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordBrokenCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoetryCard columns={columns} gutter={gutter} marginX={marginX} />
      <LigaturesCard columns={columns} gutter={gutter} marginX={marginX} />
      <ExtendedWordListCard columns={columns} gutter={gutter} marginX={marginX} />
      <OrganicShapesCard columns={columns} gutter={gutter} marginX={marginX} />
      <SignageCard columns={columns} gutter={gutter} marginX={marginX} />
      <WordListDark2Card columns={columns} gutter={gutter} marginX={marginX} />
      <AlphabetDualCard columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage1Card columns={columns} gutter={gutter} marginX={marginX} />
      <PoemPage2Card columns={columns} gutter={gutter} marginX={marginX} />
      <CharacterSetCard columns={columns} gutter={gutter} marginX={marginX} />
      <FinalTitleCard columns={columns} gutter={gutter} marginX={marginX} />
    </GridOverlay>
  )
}
