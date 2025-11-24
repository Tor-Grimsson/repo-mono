import { useState, useEffect, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/errors/ErrorBoundary'
import SiteLayout from './components/layout/SiteLayout'
import { LanguageProvider } from './contexts/LanguageContext'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Studio from './routes/Studio'
import Work from './routes/Work'
import WorkDetail from './routes/WorkDetail'
import FoundryOverview from './routes/foundry/FoundryOverview'
import FoundrySpecimens from './routes/foundry/FoundrySpecimens'
import FoundryTypefaces from './routes/foundry/FoundryTypefaces'
import FoundryLicensing from './routes/foundry/FoundryLicensing'
import FoundryMalromur from './routes/foundry/typefaces/FoundryMalromur'
import FoundryRoot from './routes/foundry/typefaces/FoundryRoot'
import FoundryTrollatunga from './routes/foundry/typefaces/FoundryTrollatunga'
import FoundryDylgjur from './routes/foundry/typefaces/FoundryDylgjur'
import FoundryGullhamrar from './routes/foundry/typefaces/FoundryGullhamrar'
import FoundrySilfurbarki from './routes/foundry/typefaces/FoundrySilfurbarki'
import FoundryOrdspor from './routes/foundry/typefaces/FoundryOrdspor'
import GullhamrarHub from './routes/specimens/gullhamrar/GullhamrarHub'
import GullhamrarPoetryGrid from './routes/specimens/gullhamrar/GullhamrarPoetryGrid'
import GullhamrarSelection from './routes/specimens/gullhamrar/GullhamrarSelection'
import RotHub from './routes/specimens/rot/RotHub'
import RotSelection from './routes/specimens/rot/RotSelection'
import Stack from './routes/Stack'
import StackArticle from './routes/StackArticle'
import Workshop from './routes/Workshop'
import CollectionsOverview from './routes/collections/CollectionsOverview'
import CollectionsIllustrations from './routes/collections/Illustrations'
import CollectionsGrids from './routes/collections/Grids'
import CollectionsLogomarks from './routes/collections/Logomarks'
import CollectionsMotionGraphics from './routes/collections/MotionGraphics'
// import TypographySheet from './routes/workshop/Typography' // Has broken dependencies
import GullhamrarPoetry from './routes/specimens/gullhamrar/GullhamrarPoetry'
import MalromurVariableAxis from './routes/specimens/malromur/cards/MalromurVariableAxis'
import MalromurScientific from './routes/specimens/malromur/cards/MalromurScientific'
import MalromurLegislative from './routes/specimens/malromur/cards/MalromurLegislative'
import MalromurHub from './routes/specimens/malromur/routes/MalromurHub'
import MalromurProseHub from './routes/specimens/malromur/MalromurProseHub'
import MalromurSpecs from './routes/specimens/malromur/routes/MalromurSpecs'
import MalromurEditorial from './routes/specimens/malromur/cards/MalromurEditorial'
import MalromurDataTable from './routes/specimens/malromur/cards/MalromurDataTable'
import MalromurMenu from './routes/specimens/malromur/cards/MalromurMenu'
import MalromurNewsletter from './routes/specimens/malromur/cards/MalromurNewsletter'
import MalromurIndex from './routes/specimens/malromur/cards/MalromurIndex'
import MalromurChapter from './routes/specimens/malromur/cards/MalromurChapter'
import MalromurTOC from './routes/specimens/malromur/cards/MalromurTOC'
import MalromurTitlePage from './routes/specimens/malromur/cards/MalromurTitlePage'
import MalromurSelection from './routes/specimens/malromur/routes/MalromurSelection'
import RotDesignSystem from './routes/specimens/rot/RotDesignSystem'
import DylgjurHub from './routes/specimens/dylgjur/DylgjurHub'
import DylgjurSelection from './routes/specimens/dylgjur/DylgjurSelection'
import SilfurbarkiHub from './routes/specimens/silfurbarki/SilfurbarkiHub'
import SilfurbarkiSelection from './routes/specimens/silfurbarki/SilfurbarkiSelection'
import TrollatungaHub from './routes/specimens/trollatunga/TrollatungaHub'
import OrdsporHub from './routes/specimens/ordspor/OrdsporHub'
import RestComplete1Selection from './routes/specimens/rot/rest/RestComplete1Selection'
import RestComplete2Selection from './routes/specimens/rot/rest/RestComplete2Selection'
import RestComplete3Selection from './routes/specimens/rot/rest/RestComplete3Selection'
import RestComplete4Selection from './routes/specimens/rot/rest/RestComplete4Selection'
import LayoutL1 from './routes/specimens/ordspor/layout/LayoutL1'
import LayoutL2 from './routes/specimens/ordspor/layout/LayoutL2'
import LayoutL2New from './routes/specimens/ordspor/layout/LayoutL2_NEW'
import LoaderOverlay from './components/layout/LoaderOverlay'
import RouteLoader from './components/layout/RouteLoader'
import WorkshopLayout from './components/workshop/layout/WorkshopLayout'
import WorkshopIntroduction from './routes/workshop/WorkshopIntroduction'
import Introduction from './routes/workshop/Introduction'
import Logo from './routes/workshop/Logo'
import Colors from './routes/workshop/Colors'
import Typography from './routes/workshop/Typography'
import Icons from './routes/workshop/Icons'
import TypeReport from './routes/workshop/TypeReport'
import Foundations from './routes/workshop/Foundations'
import Components from './routes/workshop/Components'
import ComponentsAtoms from './routes/workshop/ComponentsAtoms'
import ComponentsMolecules from './routes/workshop/ComponentsMolecules'
import ComponentsOrganisms from './routes/workshop/ComponentsOrganisms'
import Animations from './routes/workshop/Animations'
import Spacing from './routes/workshop/Spacing'
import Prose from './routes/workshop/Prose'
import Interactive from './routes/workshop/Interactive'
import HomeApparat from './routes/workshop/HomeApparat'
import ApparatusFrequencyModulator from './routes/workshop/ApparatusFrequencyModulator'
import ApparatusRadialEditor from './routes/workshop/ApparatusRadialEditor'
import KolEditor from './routes/workshop/KolEditor'
import HallOfMirrors from './routes/workshop/HallOfMirrors'
import HallOfDisplacement from './routes/workshop/HallOfDisplacement'
import HallOfMovement from './routes/workshop/HallOfMovement'
import HallOfCopies from './routes/workshop/HallOfCopies'
import HallOfSymphony from './routes/workshop/HallOfSymphony'
import HallOfArchive from './routes/workshop/HallOfArchive'
import Documentations from './routes/workshop/Documentations'
import DocumentationReader from './routes/workshop/DocumentationReader'

const ChessHome = lazy(() => import('./routes/workshop/ChessHome'))
const ChessAnalysis = lazy(() => import('./routes/workshop/ChessAnalysis'))
const ChessComponents = lazy(() => import('./routes/workshop/ChessComponents'))
const AnalyticsHome = lazy(() => import('./routes/workshop/AnalyticsHome'))
const AnalyticsOverview = lazy(() => import('./routes/workshop/AnalyticsOverview'))
const AnalyticsComponents = lazy(() => import('./routes/workshop/AnalyticsComponents'))
const AnalyticsDashboard = lazy(() => import('./routes/workshop/AnalyticsDashboard'))
const AnalyticsDashboardAnalysis = lazy(() => import('./routes/workshop/AnalyticsDashboardAnalysis'))
const AnalyticsDashboardPerformance = lazy(() => import('./routes/workshop/AnalyticsDashboardPerformance'))

function AppRoutes() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if user has seen loader this session
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader')
    return !hasSeenLoader
  })
  const location = useLocation()

  const handleEnter = () => {
    // Re-enable body scroll immediately when slide completes
    document.body.style.overflow = 'unset'
    setIsLoading(false)
    sessionStorage.setItem('hasSeenLoader', 'true')
  }

  // Prevent body scroll while loader is active
  useEffect(() => {
    if (isLoading && location.pathname === '/') {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading, location.pathname])

  // Save scroll position before unload
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }
    window.addEventListener('beforeunload', saveScrollPosition)
    return () => window.removeEventListener('beforeunload', saveScrollPosition)
  }, [])

  // Restore scroll position on mount
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition')
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10))
      sessionStorage.removeItem('scrollPosition')
    }
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsLoading(false)
    }
    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [location])

  return (
    <>
      {isLoading && location.pathname === '/' && <LoaderOverlay onEnter={handleEnter} />}
      <RouteLoader />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<WorkDetail />} />
          <Route path="foundry" element={<FoundryOverview />} />
          <Route path="foundry/malromur" element={<FoundryMalromur />} />
          <Route path="foundry/root" element={<FoundryRoot />} />
          <Route path="foundry/trollatunga" element={<FoundryTrollatunga />} />
          <Route path="foundry/dylgjur" element={<FoundryDylgjur />} />
          <Route path="foundry/gullhamrar" element={<FoundryGullhamrar />} />
          <Route path="foundry/silfurbarki" element={<FoundrySilfurbarki />} />
          <Route path="foundry/ordspor" element={<FoundryOrdspor />} />
          <Route path="foundry/specimens" element={<FoundrySpecimens />} />
          <Route path="foundry/typefaces" element={<FoundryTypefaces />} />
          <Route path="foundry/licensing" element={<FoundryLicensing />} />
          <Route path="specimen/gullhamrar" element={<GullhamrarHub />} />
          <Route path="specimen/gullhamrar/poetry" element={<GullhamrarPoetry />} />
          <Route path="specimen/gullhamrar/poetry-grid" element={<GullhamrarPoetryGrid />} />
          <Route path="specimen/gullhamrar/selection" element={<GullhamrarSelection />} />
          <Route path="specimen/malromur" element={<MalromurHub />} />
          <Route path="specimen/malromur/prose" element={<MalromurProseHub />} />
          <Route path="specimen/malromur/selection" element={<MalromurSelection />} />
          <Route path="specimen/malromur/variable-axis" element={<MalromurVariableAxis />} />
          <Route path="specimen/malromur/specs" element={<MalromurSpecs />} />
          <Route path="specimen/malromur/editorial" element={<MalromurEditorial />} />
          <Route path="specimen/malromur/data-table" element={<MalromurDataTable />} />
          <Route path="specimen/malromur/menu" element={<MalromurMenu />} />
          <Route path="specimen/malromur/newsletter" element={<MalromurNewsletter />} />
          <Route path="specimen/malromur/index" element={<MalromurIndex />} />
          <Route path="specimen/malromur/chapter" element={<MalromurChapter />} />
          <Route path="specimen/malromur/toc" element={<MalromurTOC />} />
          <Route path="specimen/malromur/title-page" element={<MalromurTitlePage />} />
          <Route path="specimen/malromur/complete" element={<MalromurSelection />} />
          <Route path="specimen/malromur/scientific" element={<MalromurScientific />} />
          <Route path="specimen/malromur/legislative" element={<MalromurLegislative />} />
          <Route path="specimen/rot" element={<RotHub />} />
          <Route path="specimen/rot/design-systems" element={<RotDesignSystem />} />
          <Route path="specimen/rot/complete" element={<RotSelection />} />
          <Route path="specimen/dylgjur" element={<DylgjurHub />} />
          <Route path="specimen/dylgjur/selection" element={<DylgjurSelection />} />
          <Route path="specimen/silfurbarki" element={<SilfurbarkiHub />} />
          <Route path="specimen/silfurbarki/selection" element={<SilfurbarkiSelection />} />
          <Route path="specimen/trollatunga" element={<TrollatungaHub />} />
          <Route path="specimen/ordspor" element={<OrdsporHub />} />
          <Route path="specimen/rot/rest-1-selection" element={<RestComplete1Selection />} />
          <Route path="specimen/rot/rest-2-selection" element={<RestComplete2Selection />} />
          <Route path="specimen/rot/rest-3-selection" element={<RestComplete3Selection />} />
          <Route path="specimen/rot/rest-4-selection" element={<RestComplete4Selection />} />
          <Route path="specimen/ordspor/layout/l-1" element={<LayoutL1 />} />
          <Route path="specimen/ordspor/layout/l-2" element={<LayoutL2 />} />
          <Route path="specimen/ordspor/layout/l-2-new" element={<LayoutL2New />} />
          <Route path="stack" element={<Stack />} />
          <Route path="stack/:slug" element={<StackArticle />} />
          <Route path="collections" element={<CollectionsOverview />} />
          <Route path="collections/illustrations" element={<CollectionsIllustrations />} />
          <Route path="collections/grids" element={<CollectionsGrids />} />
          <Route path="collections/logomarks" element={<CollectionsLogomarks />} />
          <Route path="collections/motion-graphics" element={<CollectionsMotionGraphics />} />
          <Route path="workshop" element={<Workshop />}>
            <Route path="docs" element={<Documentations />} />
            <Route path="design-system/documentation" element={<Documentations />} />
            <Route path="design-system/documentation/:docId" element={<DocumentationReader />} />
            <Route element={<WorkshopLayout />}>
              <Route index element={<WorkshopIntroduction />} />
              <Route path="introduction" element={<Introduction />} />
              <Route path="foundations/logo" element={<Logo />} />
              <Route path="foundations/colors" element={<Colors />} />
              <Route path="foundations" element={<Foundations />} />
              <Route path="foundations/interactive" element={<Interactive />} />
              <Route path="foundations/typography" element={<Typography />} />
              <Route path="foundations/prose" element={<Prose />} />
              <Route path="apparatus" element={<HomeApparat />} />
              <Route path="apparatus/frequency-modulator" element={<ApparatusFrequencyModulator />} />
              <Route path="apparatus/radial-editor" element={<ApparatusRadialEditor />} />
              <Route path="apparatus/kol-editor" element={<KolEditor />} />
              <Route path="apparatus/hall-of-mirrors" element={<Navigate to="/workshop/mirrors/displacement" replace />} />
              <Route path="mirrors" element={<HallOfMirrors />} />
              <Route path="mirrors/displacement" element={<HallOfDisplacement />} />
              <Route path="mirrors/movement" element={<HallOfMovement />} />
              <Route path="mirrors/copies" element={<HallOfCopies />} />
              <Route path="mirrors/symphony" element={<HallOfSymphony />} />
              <Route path="mirrors/archive" element={<HallOfArchive />} />
              <Route path="foundations/icons" element={<Icons />} />
              <Route path="type-report" element={<TypeReport />} />
              <Route path="components/atoms" element={<ComponentsAtoms />} />
              <Route path="components/molecules" element={<ComponentsMolecules />} />
              <Route path="components/organisms" element={<ComponentsOrganisms />} />
              <Route path="components" element={<Components />} />
              <Route path="foundations/animations" element={<Animations />} />
              <Route path="foundations/spacing" element={<Spacing />} />
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
          </Route>
          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
