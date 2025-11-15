import GridOverlay from '../../../components/specimens/GridOverlay'
import MalromurEditorial from './cards/MalromurEditorial'
import MalromurDataTable from './cards/MalromurDataTable'
import MalromurMenu from './cards/MalromurMenu'
import MalromurNewsletter from './cards/MalromurNewsletter'
import MalromurIndex from './cards/MalromurIndex'
import MalromurChapter from './cards/MalromurChapter'
import MalromurTOC from './cards/MalromurTOC'
import MalromurTitlePage from './cards/MalromurTitlePage'
import MalromurScientific from './cards/MalromurScientific'
import MalromurLegislative from './cards/MalromurLegislative'
import MalromurVariableAxis from './cards/MalromurVariableAxis'

export default function MalromurSelection() {
  const columns = 12
  const gutter = 24
  const marginX = 48

  return (
    <GridOverlay columns={columns} gutter={gutter} marginX={marginX}>
      <MalromurTitlePage />
      <MalromurEditorial />
      <MalromurDataTable />
      <MalromurMenu />
      <MalromurNewsletter />
      <MalromurIndex />
      <MalromurChapter />
      <MalromurTOC />
      <MalromurScientific />
      <MalromurLegislative />
      <MalromurVariableAxis />
    </GridOverlay>
  )
}
