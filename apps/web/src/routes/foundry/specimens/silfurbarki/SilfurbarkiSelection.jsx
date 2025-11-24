import GridOverlay from '../../../components/specimens/GridOverlay'
import TitlePageCard from './cards/TitlePageCard'
import GutenbergBibleCard from './cards/GutenbergBibleCard'
import HymnBookCard from './cards/HymnBookCard'
import SpecimenSheetCard from './cards/SpecimenSheetCard'
import BlackMetalLogoCard from './cards/BlackMetalLogoCard'
import CertificateCard from './cards/CertificateCard'
import IlluminatedManuscriptCard from './cards/IlluminatedManuscriptCard'
import MedievalCharterCard from './cards/MedievalCharterCard'
import BookTitlePageCard from './cards/BookTitlePageCard'
import CharacterShowcaseCard from './cards/CharacterShowcaseCard'
import RunicInscriptionCard from './cards/RunicInscriptionCard'
import MedievalColophonCard from './cards/MedievalColophonCard'
import ModernBlackletterCard from './cards/ModernBlackletterCard'
import OrnamentalLettersCard from './cards/OrnamentalLettersCard'
import FinalTitleCard from './cards/FinalTitleCard'

export default function SilfurbarkiSelection() {
  const columns = 12
  const gutter = 24
  const marginX = 48

  return (
    <GridOverlay columns={columns} gutter={gutter} marginX={marginX}>
      <TitlePageCard columns={columns} gutter={gutter} marginX={marginX} />
      <GutenbergBibleCard columns={columns} gutter={gutter} marginX={marginX} />
      <HymnBookCard columns={columns} gutter={gutter} marginX={marginX} />
      <SpecimenSheetCard columns={columns} gutter={gutter} marginX={marginX} />
      <BlackMetalLogoCard columns={columns} gutter={gutter} marginX={marginX} />
      <CertificateCard columns={columns} gutter={gutter} marginX={marginX} />
      <IlluminatedManuscriptCard columns={columns} gutter={gutter} marginX={marginX} />
      <MedievalCharterCard columns={columns} gutter={gutter} marginX={marginX} />
      <BookTitlePageCard columns={columns} gutter={gutter} marginX={marginX} />
      <CharacterShowcaseCard columns={columns} gutter={gutter} marginX={marginX} />
      <RunicInscriptionCard columns={columns} gutter={gutter} marginX={marginX} />
      <MedievalColophonCard columns={columns} gutter={gutter} marginX={marginX} />
      <ModernBlackletterCard columns={columns} gutter={gutter} marginX={marginX} />
      <OrnamentalLettersCard columns={columns} gutter={gutter} marginX={marginX} />
      <FinalTitleCard columns={columns} gutter={gutter} marginX={marginX} />
    </GridOverlay>
  )
}
