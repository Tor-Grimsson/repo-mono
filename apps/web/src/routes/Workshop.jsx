import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import WorkshopLayout from '../components/workshop/layout/WorkshopLayout'
import Home from './workshop/Home'
import WorkshopHome from './workshop/WorkshopHome'
import WorkshopIntroduction from './workshop/WorkshopIntroduction'
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
import Interactive from './workshop/Interactive'
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

// CRITICAL: Lazy load chess routes to avoid bundling 177MB chess data in main bundle
// Chess data is ~3MB gzipped and only needed on chess routes
const ChessHome = lazy(() => import('./workshop/ChessHome'))
const ChessAnalysis = lazy(() => import('./workshop/ChessAnalysis'))
const ChessComponents = lazy(() => import('./workshop/ChessComponents'))

// CRITICAL: Lazy load analytics routes to avoid bundling chess data
// Analytics dashboard uses getGameMeta() which loads all 27,200 games
const AnalyticsHome = lazy(() => import('./workshop/AnalyticsHome'))
const AnalyticsOverview = lazy(() => import('./workshop/AnalyticsOverview'))
const AnalyticsComponents = lazy(() => import('./workshop/AnalyticsComponents'))
const AnalyticsDashboard = lazy(() => import('./workshop/AnalyticsDashboard'))
const AnalyticsDashboardAnalysis = lazy(() => import('./workshop/AnalyticsDashboardAnalysis'))
const AnalyticsDashboardPerformance = lazy(() => import('./workshop/AnalyticsDashboardPerformance'))

const Styleguide = () => {
  return (
    <Routes>
      {/* Documentation routes - no layout wrapper */}
      <Route path="docs" element={<Documentations />} />
      <Route path="design-system/documentation" element={<Documentations />} />
      <Route path="design-system/documentation/:docId" element={<DocumentationReader />} />

      <Route element={<WorkshopLayout />}>
        <Route index element={<WorkshopHome />} />
        <Route path="workshop/introduction" element={<WorkshopIntroduction />} />
        <Route path="introduction" element={<Introduction />} />
        <Route path="logo" element={<Logo />} />
        <Route path="colors" element={<Colors />} />
        <Route path="foundations" element={<Foundations />} />
        <Route path="foundations/interactive" element={<Interactive />} />
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
      </Route>
      <Route element={<WorkshopLayout />}>
        <Route path="chess" element={<ChessHome />} />
        <Route path="chess/analysis" element={<ChessAnalysis />} />
        <Route path="chess/components" element={<ChessComponents />} />
        <Route path="analytics" element={<AnalyticsHome />} />
        <Route path="analytics/overview" element={<AnalyticsOverview />} />
        <Route path="analytics/components" element={<AnalyticsComponents />} />
        <Route path="analytics/dashboard" element={<AnalyticsDashboard />} />
        <Route path="analytics/analysis" element={<AnalyticsDashboardAnalysis />} />
        <Route path="analytics/performance" element={<AnalyticsDashboardPerformance />} />
      </Route>
    </Routes>
  )
}

export default Styleguide
