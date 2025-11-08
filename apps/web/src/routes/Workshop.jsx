import { Routes, Route, Navigate } from 'react-router-dom'
import WorkshopLayout from '../components/workshop/layout/WorkshopLayout'
import Home from './workshop/Home'
import Introduction from './workshop/Introduction'
import Logo from './workshop/Logo'
import Colors from './workshop/Colors'
import Typography from './workshop/Typography'
import Icons from './workshop/Icons'
import TypeReport from './workshop/TypeReport'
import Foundations from './workshop/Foundations'
import Components from './workshop/Components'
import ComponentsAtoms from './workshop/ComponentsAtoms'
import ComponentsMolecules from './workshop/ComponentsMolecules'
import ComponentsOrganisms from './workshop/ComponentsOrganisms'
import Animations from './workshop/Animations'
import Spacing from './workshop/Spacing'
import Prose from './workshop/Prose'
import HomeApparat from './workshop/HomeApparat'
import ApparatusCircleGenerator from './workshop/ApparatusCircleGenerator'
import ApparatusFrequencyModulator from './workshop/ApparatusFrequencyModulator'
import ApparatusHallOfMirrors from './workshop/ApparatusHallOfMirrors'
import HallOfMirrors from './workshop/HallOfMirrors'
import HallOfDisplacement from './workshop/HallOfDisplacement'
import HallOfMovement from './workshop/HallOfMovement'
import HallOfCopies from './workshop/HallOfCopies'
import HallOfSymphony from './workshop/HallOfSymphony'
import HallOfArchive from './workshop/HallOfArchive'
import Documentations from './workshop/Documentations'
import DocumentationReader from './workshop/DocumentationReader'
import ChessHome from './workshop/ChessHome'
import ChessOverview from './workshop/ChessOverview'
import ChessAnalysis from './workshop/ChessAnalysis'
import ChessDashboards from './workshop/ChessDashboards'
import ChessDashboardAnalysis from './workshop/ChessDashboardAnalysis'
import ChessDashboardPerformance from './workshop/ChessDashboardPerformance'
import ChessTables from './workshop/ChessTables'
import ChessDocumentation from './workshop/ChessDocumentation'
import ChessComponents from './workshop/ChessComponents'

const Styleguide = () => {
  return (
    <Routes>
      <Route element={<WorkshopLayout />}>
        <Route index element={<Home />} />
        <Route path="introduction" element={<Introduction />} />
        <Route path="logo" element={<Logo />} />
        <Route path="colors" element={<Colors />} />
        <Route path="foundations" element={<Foundations />} />
        <Route path="typography" element={<Typography />} />
        <Route path="prose" element={<Prose />} />
        <Route path="apparatus" element={<HomeApparat />} />
        <Route path="apparatus/circle-generator" element={<ApparatusCircleGenerator />} />
        <Route path="apparatus/frequency-modulator" element={<ApparatusFrequencyModulator />} />
        <Route path="apparatus/hall-of-mirrors" element={<Navigate to="/workshop/mirrors/displacement" replace />} />
        <Route path="apparatus/wavy-circle" element={<Navigate to="apparatus/circle-generator" replace />} />
        <Route path="mirrors" element={<HallOfMirrors />} />
        <Route path="mirrors/displacement" element={<HallOfDisplacement />} />
        <Route path="mirrors/movement" element={<HallOfMovement />} />
        <Route path="mirrors/copies" element={<HallOfCopies />} />
        <Route path="mirrors/symphony" element={<HallOfSymphony />} />
        <Route path="mirrors/archive" element={<HallOfArchive />} />
        <Route path="icons" element={<Icons />} />
        <Route path="type-report" element={<TypeReport />} />
        <Route path="components/atoms" element={<ComponentsAtoms />} />
        <Route path="components/molecules" element={<ComponentsMolecules />} />
        <Route path="components/organisms" element={<ComponentsOrganisms />} />
        <Route path="components" element={<Components />} />
        <Route path="animations" element={<Animations />} />
        <Route path="spacing" element={<Spacing />} />
        <Route path="docs" element={<Documentations />} />
        <Route path="design-system/documentation" element={<Documentations />} />
        <Route path="design-system/documentation/:docId" element={<DocumentationReader />} />
      </Route>
      <Route element={<WorkshopLayout variant="compact" />}>
        <Route path="chess" element={<ChessHome />} />
      </Route>
      <Route element={<WorkshopLayout />}>
        <Route path="chess/overview" element={<ChessOverview />} />
        <Route path="chess/analysis" element={<ChessAnalysis />} />
        <Route path="chess/dashboards" element={<ChessDashboards />} />
        <Route path="chess/dashboards/analysis" element={<ChessDashboardAnalysis />} />
        <Route path="chess/dashboards/performance" element={<ChessDashboardPerformance />} />
        <Route path="chess/tables" element={<ChessTables />} />
        <Route path="chess/documentation" element={<ChessDocumentation />} />
        <Route path="chess/components" element={<ChessComponents />} />
      </Route>
    </Routes>
  )
}

export default Styleguide
