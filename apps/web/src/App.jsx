import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
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
import FoundryProseStyles from './routes/foundry/FoundryProseStyles'
import MalromurProseSpecs from './routes/foundry/prose-specs/MalromurProseSpecs'
import DocumentationProseSpecs from './routes/foundry/prose-specs/DocumentationProseSpecs'
import StackProseSpecs from './routes/foundry/prose-specs/StackProseSpecs'
import FoundryTypefaces from './routes/foundry/FoundryTypefaces'
import FoundryLicensing from './routes/foundry/FoundryLicensing'
import FoundryMalromur from './routes/foundry/typefaces/FoundryMalromur'
import FoundryRoot from './routes/foundry/typefaces/FoundryRoot'
import FoundryTrollatunga from './routes/foundry/typefaces/FoundryTrollatunga'
import FoundryDylgjur from './routes/foundry/typefaces/FoundryDylgjur'
import FoundryGullhamrar from './routes/foundry/typefaces/FoundryGullhamrar'
import FoundrySilfurbarki from './routes/foundry/typefaces/FoundrySilfurbarki'
import FoundryOrdspor from './routes/foundry/typefaces/FoundryOrdspor'
import GullhamrarHub from './routes/foundry/specimens/gullhamrar/GullhamrarHub'
import GullhamrarPoetryGrid from './routes/foundry/specimens/gullhamrar/GullhamrarPoetryGrid'
import GullhamrarSelection from './routes/foundry/specimens/gullhamrar/GullhamrarSelection'
import RotHub from './routes/foundry/specimens/rot/RotHub'
import RotSelection from './routes/foundry/specimens/rot/RotSelection'
import Stack from './routes/Stack'
import StackArticle from './routes/StackArticle'
import Workshop from './routes/Workshop'
import CollectionsOverview from './routes/collections/CollectionsOverview'
import CollectionsIllustrations from './routes/collections/Illustrations'
import CollectionsGrids from './routes/collections/Grids'
import CollectionsLogomarks from './routes/collections/Logomarks'
import CollectionsMotionGraphics from './routes/collections/MotionGraphics'
import PrintsLayout from './routes/prints/PrintsLayout'
// import TypographySheet from './routes/workshop/Typography' // Has broken dependencies
import GullhamrarPoetry from './routes/foundry/specimens/gullhamrar/GullhamrarPoetry'
import MalromurVariableAxis from './routes/foundry/specimens/malromur/cards/MalromurVariableAxis'
import MalromurScientific from './routes/foundry/specimens/malromur/cards/MalromurScientific'
import MalromurLegislative from './routes/foundry/specimens/malromur/cards/MalromurLegislative'
import MalromurHub from './routes/foundry/specimens/malromur/routes/MalromurHub'
import MalromurEditorial from './routes/foundry/specimens/malromur/cards/MalromurEditorial'
import MalromurDataTable from './routes/foundry/specimens/malromur/cards/MalromurDataTable'
import MalromurMenu from './routes/foundry/specimens/malromur/cards/MalromurMenu'
import MalromurNewsletter from './routes/foundry/specimens/malromur/cards/MalromurNewsletter'
import MalromurIndex from './routes/foundry/specimens/malromur/cards/MalromurIndex'
import MalromurChapter from './routes/foundry/specimens/malromur/cards/MalromurChapter'
import MalromurTOC from './routes/foundry/specimens/malromur/cards/MalromurTOC'
import MalromurTitlePage from './routes/foundry/specimens/malromur/cards/MalromurTitlePage'
import MalromurSelection from './routes/foundry/specimens/malromur/routes/MalromurSelection'
import RotDesignSystem from './routes/foundry/specimens/rot/RotDesignSystem'
import DylgjurHub from './routes/foundry/specimens/dylgjur/DylgjurHub'
import DylgjurSelection from './routes/foundry/specimens/dylgjur/DylgjurSelection'
import SilfurbarkiHub from './routes/foundry/specimens/silfurbarki/SilfurbarkiHub'
import SilfurbarkiSelection from './routes/foundry/specimens/silfurbarki/SilfurbarkiSelection'
import TrollatungaHub from './routes/foundry/specimens/trollatunga/TrollatungaHub'
import TrollatungaSelection from './routes/foundry/specimens/trollatunga/TrollatungaSelection'
import OrdsporHub from './routes/foundry/specimens/ordspor/OrdsporHub'
import OrdsporSelection from './routes/foundry/specimens/ordspor/OrdsporSelection'
import RestComplete1Selection from './routes/foundry/specimens/trollatunga/rest/RestComplete1Selection'
import RestComplete2Selection from './routes/foundry/specimens/trollatunga/rest/RestComplete2Selection'
import RestComplete3Selection from './routes/foundry/specimens/trollatunga/rest/RestComplete3Selection'
import RestComplete4Selection from './routes/foundry/specimens/trollatunga/rest/RestComplete4Selection'
import LayoutL1 from './routes/foundry/specimens/ordspor/layout/LayoutL1'
import LayoutL2 from './routes/foundry/specimens/ordspor/layout/LayoutL2'
import LayoutL2New from './routes/foundry/specimens/ordspor/layout/LayoutL2_NEW'
import LoaderOverlay from './components/layout/LoaderOverlay'
const InstagramFeed = lazy(() => import('./routes/demo/InstagramFeed'))
import RouteLoader from './components/layout/RouteLoader'
import WorkshopLayout from './components/workshop/layout/WorkshopLayout'
import WorkshopIntroduction from './routes/workshop/WorkshopIntroduction'
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
  const scrollToTop = () => {
    window.scrollTo(0, 0)
    requestAnimationFrame(() => window.scrollTo(0, 0))
  }

  const [isLoading, setIsLoading] = useState(() => {
    // Check if user has seen loader this session
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader')
    return !hasSeenLoader
  })
  const location = useLocation()

  const handleEnter = () => {
    scrollToTop()
    // Re-enable body scroll immediately when slide completes
    document.body.style.overflow = 'unset'
    setIsLoading(false)
    sessionStorage.setItem('hasSeenLoader', 'true')
  }

  // Prevent body scroll while loader is active
  useEffect(() => {
    const shouldLock = isLoading && location.pathname === '/'
    if (shouldLock) {
      document.body.style.overflow = 'hidden'
      document.body.setAttribute('data-loading', 'true')
      scrollToTop()
    } else {
      document.body.style.overflow = 'unset'
      document.body.removeAttribute('data-loading')
    }

    return () => {
      document.body.style.overflow = 'unset'
      document.body.removeAttribute('data-loading')
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

  // Restore scroll position when returning to non-home routes
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition')
    if (!savedPosition) return

    if (location.pathname === '/') {
      // Home should always reset to hero after loader; discard saved scroll
      sessionStorage.removeItem('scrollPosition')
      window.scrollTo(0, 0)
      return
    }

    window.scrollTo(0, parseInt(savedPosition, 10))
    sessionStorage.removeItem('scrollPosition')
  }, [location.pathname])

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsLoading(false)
    }
    // Scroll to top on route change
    scrollToTop()
  }, [location])

  return (
    <>
      {isLoading && location.pathname === '/' && <LoaderOverlay onEnter={handleEnter} />}
      <RouteLoader />
      <Routes>
        {/* Demo routes (unlisted, no layout) */}
        <Route path="demo" element={<Suspense fallback={<div className="min-h-screen bg-surface-primary" />}><InstagramFeed /></Suspense>} />
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<WorkDetail />} />
          <Route path="foundry" element={<FoundryOverview />} />
          <Route path="foundry/typefaces/malromur" element={<FoundryMalromur />} />
          <Route path="foundry/typefaces/root" element={<FoundryRoot />} />
          <Route path="foundry/typefaces/trollatunga" element={<FoundryTrollatunga />} />
          <Route path="foundry/typefaces/dylgjur" element={<FoundryDylgjur />} />
          <Route path="foundry/typefaces/gullhamrar" element={<FoundryGullhamrar />} />
          <Route path="foundry/typefaces/silfurbarki" element={<FoundrySilfurbarki />} />
          <Route path="foundry/typefaces/ordspor" element={<FoundryOrdspor />} />
          <Route path="foundry/specimen" element={<FoundrySpecimens />} />
          <Route path="foundry/prose-styles" element={<FoundryProseStyles />} />
          <Route path="foundry/prose-specs/malromur" element={<MalromurProseSpecs />} />
          <Route path="foundry/prose-specs/documentation" element={<DocumentationProseSpecs />} />
          <Route path="foundry/prose-specs/stack" element={<StackProseSpecs />} />
          <Route path="foundry/typefaces" element={<FoundryTypefaces />} />
          <Route path="foundry/licensing" element={<FoundryLicensing />} />
          <Route path="foundry/specimen/gullhamrar" element={<GullhamrarHub />} />
          <Route path="foundry/specimen/gullhamrar/poetry" element={<GullhamrarPoetry />} />
          <Route path="foundry/specimen/gullhamrar/poetry-grid" element={<GullhamrarPoetryGrid />} />
          <Route path="foundry/specimen/gullhamrar/selection" element={<GullhamrarSelection />} />
          <Route path="foundry/specimen/malromur" element={<MalromurHub />} />
          <Route path="foundry/specimen/malromur/selection" element={<MalromurSelection />} />
          <Route path="foundry/specimen/malromur/variable-axis" element={<MalromurVariableAxis />} />
          <Route path="foundry/specimen/malromur/specs" element={<MalromurProseSpecs />} />
          <Route path="foundry/specimen/malromur/editorial" element={<MalromurEditorial />} />
          <Route path="foundry/specimen/malromur/data-table" element={<MalromurDataTable />} />
          <Route path="foundry/specimen/malromur/menu" element={<MalromurMenu />} />
          <Route path="foundry/specimen/malromur/newsletter" element={<MalromurNewsletter />} />
          <Route path="foundry/specimen/malromur/index" element={<MalromurIndex />} />
          <Route path="foundry/specimen/malromur/chapter" element={<MalromurChapter />} />
          <Route path="foundry/specimen/malromur/toc" element={<MalromurTOC />} />
          <Route path="foundry/specimen/malromur/title-page" element={<MalromurTitlePage />} />
          <Route path="foundry/specimen/malromur/complete" element={<MalromurSelection />} />
          <Route path="foundry/specimen/malromur/scientific" element={<MalromurScientific />} />
          <Route path="foundry/specimen/malromur/legislative" element={<MalromurLegislative />} />
          <Route path="foundry/specimen/rot" element={<RotHub />} />
          <Route path="foundry/specimen/rot/design-systems" element={<RotDesignSystem />} />
          <Route path="foundry/specimen/rot/complete" element={<RotSelection />} />
          <Route path="foundry/specimen/dylgjur" element={<DylgjurHub />} />
          <Route path="foundry/specimen/dylgjur/selection" element={<DylgjurSelection />} />
          <Route path="foundry/specimen/silfurbarki" element={<SilfurbarkiHub />} />
          <Route path="foundry/specimen/silfurbarki/selection" element={<SilfurbarkiSelection />} />
          <Route path="foundry/specimen/trollatunga" element={<TrollatungaHub />} />
          <Route path="foundry/specimen/trollatunga/complete" element={<TrollatungaSelection />} />
          <Route path="foundry/specimen/ordspor" element={<OrdsporHub />} />
          <Route path="foundry/specimen/ordspor/complete" element={<OrdsporSelection />} />
          <Route path="foundry/specimen/rot/rest-1-selection" element={<RestComplete1Selection />} />
          <Route path="foundry/specimen/rot/rest-2-selection" element={<RestComplete2Selection />} />
          <Route path="foundry/specimen/rot/rest-3-selection" element={<RestComplete3Selection />} />
          <Route path="foundry/specimen/rot/rest-4-selection" element={<RestComplete4Selection />} />
          <Route path="foundry/specimen/ordspor/layout/l-1" element={<LayoutL1 />} />
          <Route path="foundry/specimen/ordspor/layout/l-2" element={<LayoutL2 />} />
          <Route path="foundry/specimen/ordspor/layout/l-2-new" element={<LayoutL2New />} />
          <Route path="stack" element={<Stack />} />
          <Route path="stack/:slug" element={<StackArticle />} />
          <Route path="collections" element={<CollectionsOverview />} />
          <Route path="collections/illustrations" element={<CollectionsIllustrations />} />
          <Route path="collections/grids" element={<CollectionsGrids />} />
          <Route path="collections/logomarks" element={<CollectionsLogomarks />} />
          <Route path="collections/motion-graphics" element={<CollectionsMotionGraphics />} />
          <Route path="prints" element={<PrintsLayout />}>
            <Route index element={null} />
            <Route path=":slug" element={null} />
          </Route>
          <Route path="workshop" element={<Workshop />}>
            <Route path="docs" element={<Documentations />} />
            <Route path="design-system/documentation" element={<Documentations />} />
            <Route path="design-system/documentation/:docId" element={<DocumentationReader />} />
            <Route element={<WorkshopLayout />}>
              <Route index element={<WorkshopIntroduction />} />
              <Route path="foundations/logo" element={<Logo />} />
              <Route path="foundations/colors" element={<Colors />} />
              <Route path="foundations" element={<Foundations />} />
              <Route path="foundations/interactive" element={<Interactive />} />
              <Route path="foundations/typography" element={<Typography />} />
              <Route path="foundations/prose" element={<Prose />} />
              <Route path="apparat" element={<HomeApparat />} />
              <Route path="apparat/frequency-modulator" element={<ApparatusFrequencyModulator />} />
              <Route path="apparat/radial-editor" element={<ApparatusRadialEditor />} />
              <Route path="apparat/kol-editor" element={<KolEditor />} />
              <Route path="apparat/hall-of-mirrors" element={<Navigate to="/workshop/mirrors/displacement" replace />} />
              <Route path="apparatus" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparatus/frequency-modulator" element={<Navigate to="/workshop/apparat/frequency-modulator" replace />} />
              <Route path="apparatus/radial-editor" element={<Navigate to="/workshop/apparat/radial-editor" replace />} />
              <Route path="apparatus/kol-editor" element={<Navigate to="/workshop/apparat/kol-editor" replace />} />
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
  // Global reveal observer - watches for .reveal and .reveal-group elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    // Observe all reveal elements
    const observeRevealElements = () => {
      document.querySelectorAll('.reveal:not(.is-visible), .reveal-group:not(.is-visible), .reveal-from-left:not(.is-visible), .reveal-from-right:not(.is-visible)').forEach((el) => {
        observer.observe(el)
      })
    }

    // Initial observation
    observeRevealElements()

    // Re-observe on DOM changes (for lazy-loaded content)
    const mutationObserver = new MutationObserver(() => {
      observeRevealElements()
    })
    mutationObserver.observe(document.body, { childList: true, subtree: true })

    return () => {
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [])

  return (
    <ErrorBoundary>
      <HelmetProvider>
        <LanguageProvider>
          <BrowserRouter>
            <AppRoutes />
            <Analytics />
          </BrowserRouter>
        </LanguageProvider>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
