import { Routes, Route, Navigate } from 'react-router-dom'
import StyleguideLayout from '../components/styleguide/layout/StyleguideLayout'
import Home from './styleguide/Home'
import Introduction from './styleguide/Introduction'
import Logo from './styleguide/Logo'
import Colors from './styleguide/Colors'
import Typography from './styleguide/Typography'
import Icons from './styleguide/Icons'
import TypeReport from './styleguide/TypeReport'
import Foundations from './styleguide/Foundations'
import Components from './styleguide/Components'
import ComponentsAtoms from './styleguide/ComponentsAtoms'
import ComponentsMolecules from './styleguide/ComponentsMolecules'
import ComponentsOrganisms from './styleguide/ComponentsOrganisms'
import Animations from './styleguide/Animations'
import Spacing from './styleguide/Spacing'
import Prose from './styleguide/Prose'
import HomeApparat from './styleguide/HomeApparat'
import ApparatusCircleGenerator from './styleguide/ApparatusCircleGenerator'
import ApparatusFrequencyModulator from './styleguide/ApparatusFrequencyModulator'
import Documentations from './styleguide/Documentations'
import DocumentationReader from './styleguide/DocumentationReader'
import ChessHome from './styleguide/ChessHome'
import ChessOverview from './styleguide/ChessOverview'
import ChessAnalysis from './styleguide/ChessAnalysis'
import ChessDashboards from './styleguide/ChessDashboards'
import ChessDashboardAnalysis from './styleguide/ChessDashboardAnalysis'
import ChessDashboardPerformance from './styleguide/ChessDashboardPerformance'
import ChessTables from './styleguide/ChessTables'
import ChessDocumentation from './styleguide/ChessDocumentation'
import ChessComponents from './styleguide/ChessComponents'

const Styleguide = () => {
  return (
    <Routes>
      <Route element={<StyleguideLayout />}>
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
        <Route path="apparatus/wavy-circle" element={<Navigate to="apparatus/circle-generator" replace />} />
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
      <Route element={<StyleguideLayout variant="compact" />}>
        <Route path="chess" element={<ChessHome />} />
      </Route>
      <Route element={<StyleguideLayout />}>
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
