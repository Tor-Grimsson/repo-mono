import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType, Navigate, useParams } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/errors/ErrorBoundary'
import SiteLayout from './components/layout/SiteLayout'
import { LanguageProvider } from './contexts/LanguageContext'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Studio from './routes/Studio'
const Work = lazy(() => import('./routes/Work'))
import WorkDetail from './routes/WorkDetail'
import FoundryTypefaces from './routes/foundry/FoundryTypefaces'
import FoundryLicensing from './routes/foundry/FoundryLicensing'
import FoundryMalromur from './routes/foundry/typefaces/FoundryMalromur'
import FoundryRoot from './routes/foundry/typefaces/FoundryRoot'
import FoundryTrollatunga from './routes/foundry/typefaces/FoundryTrollatunga'
import FoundryDylgjur from './routes/foundry/typefaces/FoundryDylgjur'
import FoundryGullhamrar from './routes/foundry/typefaces/FoundryGullhamrar'
import Stack from './routes/Stack'
import StackArticle from './routes/StackArticle'
import Workshop from './routes/Workshop'
import Prints from './routes/Prints'
// import TypographySheet from './routes/workshop/Typography' // Has broken dependencies
import LoaderOverlay from './components/layout/LoaderOverlay'
const InstagramFeed = lazy(() => import('./routes/demo/InstagramFeed'))
const Metrics = lazy(() => import('./routes/Metrics'))
const FooterTest = lazy(() => import('./routes/FooterTest'))
const PrintsExperimental = lazy(() => import('./routes/prints/PrintsExperimental'))
const PrintsArchitectural = lazy(() => import('./routes/prints/PrintsArchitectural'))
import RouteLoader from './components/layout/RouteLoader'
import { ShellLayout } from './components/shell'
import WorkshopDefaultSidebar from './components/workshop/WorkshopDefaultSidebar'
import WorkshopIntroduction from './routes/workshop/WorkshopIntroduction'
import Logo from './routes/workshop/Logo'
import Colors from './routes/workshop/Colors'
import Typography from './routes/workshop/Typography'
import Icons from './routes/workshop/Icons'
import TypeReport from './routes/workshop/TypeReport'
import DesignSystem from './routes/workshop/DesignSystem'
import Components from './routes/workshop/Components'
import ComponentsAtoms from './routes/workshop/ComponentsAtoms'
import ComponentsMolecules from './routes/workshop/ComponentsMolecules'
import ComponentsOrganisms from './routes/workshop/ComponentsOrganisms'
import Animations from './routes/workshop/Animations'
import Spacing from './routes/workshop/Spacing'
import Prose from './routes/workshop/Prose'
import HomeApparat from './routes/workshop/HomeApparat'
import Documentations from './routes/workshop/Documentations'
import DocumentationReader from './routes/workshop/DocumentationReader'
import DocsComponents from './routes/workshop/DocsComponents'
import WorkshopSidebar from './components/workshop/WorkshopSidebar'
import { TagModeProvider, TagModeGate } from './components/workshop/docs'
import { WORKSHOP_ROUTES, buildWorkshopSearchItems } from './data/workshop/navigation'

const workshopSearchItems = buildWorkshopSearchItems()

const RedirectDocId = () => {
  const { docId } = useParams()
  return <Navigate to={`/workshop/docs/${docId}`} replace />
}

const ChessHome = lazy(() => import('./routes/workshop/ChessHome'))
const ChessAnalysis = lazy(() => import('./routes/workshop/ChessAnalysis'))
const ChessComponents = lazy(() => import('./routes/workshop/ChessComponents'))
const ChessMetrics = lazy(() => import('./routes/workshop/ChessMetrics'))
const DashboardOverview = lazy(() => import('./routes/workshop/DashboardOverview'))
const DashboardComponents = lazy(() => import('./routes/workshop/DashboardComponents'))
const DashboardMetrics = lazy(() => import('./routes/workshop/DashboardMetrics'))
const DashboardMetricsSetup = lazy(() => import('./routes/workshop/DashboardMetricsSetup'))

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
  const navigationType = useNavigationType()

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
    // Skip scroll reset on browser back/forward — browser restores position natively
    if (navigationType === 'POP') return
    scrollToTop()
  }, [location])

  return (
    <>
      {isLoading && location.pathname === '/' && <LoaderOverlay onEnter={handleEnter} />}
      <RouteLoader />
      <Routes>
        {/* Unlisted routes (no layout) */}
        <Route path="demo" element={<Suspense fallback={<div className="min-h-screen bg-surface-primary" />}><InstagramFeed /></Suspense>} />
        <Route path="metrics" element={<Suspense fallback={<div className="min-h-screen bg-surface-primary" />}><Metrics /></Suspense>} />
        <Route path="footer-test" element={<Suspense fallback={<div className="min-h-screen" style={{ background: '#0a0f1a' }} />}><FooterTest /></Suspense>} />
        <Route path="prints-x" element={<Suspense fallback={<div className="min-h-screen bg-black" />}><PrintsExperimental /></Suspense>}>
          <Route index element={null} />
          <Route path=":slug" element={null} />
        </Route>
        <Route path="prints-xx" element={<Suspense fallback={<div className="min-h-screen bg-black" />}><PrintsArchitectural /></Suspense>} />
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          <Route path="work" element={<Suspense fallback={<div className="min-h-screen bg-surface-secondary" />}><Work /></Suspense>} />
          <Route path="work/:slug" element={<Suspense fallback={<div className="min-h-screen bg-surface-primary" />}><WorkDetail /></Suspense>} />
          <Route path="foundry" element={<FoundryTypefaces />} />
          <Route path="foundry/typefaces" element={<Navigate to="/foundry" replace />} />
          <Route path="foundry/typefaces/malromur" element={<FoundryMalromur />} />
          <Route path="foundry/typefaces/root" element={<FoundryRoot />} />
          <Route path="foundry/typefaces/trollatunga" element={<FoundryTrollatunga />} />
          <Route path="foundry/typefaces/dylgjur" element={<FoundryDylgjur />} />
          <Route path="foundry/typefaces/gullhamrar" element={<FoundryGullhamrar />} />
          <Route path="foundry/licensing" element={<FoundryLicensing />} />
          <Route path="stack" element={<Stack />} />
          <Route path="stack/:slug" element={<StackArticle />} />
          <Route path="prints" element={<Prints />}>
            <Route index element={null} />
            <Route path=":slug" element={null} />
          </Route>
          {/* Redirects: old /docs/* → /workshop/docs/* */}
          <Route path="docs" element={<Navigate to="/workshop/docs" replace />} />
          <Route path="docs/components" element={<Navigate to="/workshop/docs/components" replace />} />
          <Route path="docs/:docId" element={<RedirectDocId />} />
          {/* Redirects from old workshop documentation URLs */}
          <Route path="workshop/design-system/documentation" element={<Navigate to="/workshop/docs" replace />} />
          <Route path="workshop/design-system/documentation/:docId" element={<RedirectDocId />} />
          <Route path="workshop" element={<Workshop />}>
            <Route element={<TagModeProvider><ShellLayout routes={WORKSHOP_ROUTES} basePath="/workshop" brandLogoSrc="https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/workshop/workshop-docs/workshop-logo.svg" brandLogoAlt="Workshop" renderSidebar={({ onNavigate }) => <WorkshopSidebar onNavigate={onNavigate} />} searchItems={workshopSearchItems} defaultTocContent={<WorkshopDefaultSidebar />} /></TagModeProvider>}>
              <Route element={<TagModeGate />}>
              <Route index element={<WorkshopIntroduction />} />
              <Route path="docs" element={<Documentations />} />
              <Route path="docs/components" element={<DocsComponents />} />
              <Route path="docs/:docId" element={<DocumentationReader />} />
              <Route path="design-system/logo" element={<Logo />} />
              <Route path="design-system/colors" element={<Colors />} />
              <Route path="design-system" element={<DesignSystem />} />
              <Route path="design-system/typography" element={<Typography />} />
              <Route path="design-system/prose" element={<Prose />} />
              <Route path="apparat" element={<HomeApparat />} />
              {/* Inline apparat pages retired — each tool is its own live deploy; the overview links out. */}
              <Route path="apparat/frequency-modulator" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-radial" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-editor" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-noter" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-distress" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-modulator" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-mirror" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-monitor" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-ds-editor" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-vcap" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-radar" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparatus" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparatus/frequency-modulator" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/radial-editor" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparatus/radial-editor" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparatus/kol-editor" element={<Navigate to="/workshop/apparat" replace />} />
              {/* Hall of Mirrors retired — superseded by kol-mirror (mirror.kolkrabbi.io), a gallery card. */}
              <Route path="apparat/hall-of-mirrors" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparatus/hall-of-mirrors" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="mirrors" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="mirrors/*" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="design-system/icons" element={<Icons />} />
              <Route path="type-report" element={<TypeReport />} />
              <Route path="components/atoms" element={<ComponentsAtoms />} />
              <Route path="components/molecules" element={<ComponentsMolecules />} />
              <Route path="components/organisms" element={<ComponentsOrganisms />} />
              <Route path="components" element={<Components />} />
              <Route path="design-system/animations" element={<Animations />} />
              <Route path="design-system/spacing" element={<Spacing />} />
              <Route path="chess" element={<ChessHome />} />
              <Route path="chess/analysis" element={<ChessAnalysis />} />
              <Route path="chess/components" element={<ChessComponents />} />
              <Route path="chess/metrics" element={<ChessMetrics />} />
              <Route path="dashboard" element={<DashboardOverview />} />
              <Route path="dashboard/components" element={<DashboardComponents />} />
              <Route path="dashboard/chess" element={<Navigate to="/workshop/chess/metrics" replace />} />
              <Route path="dashboard/metrics" element={<DashboardMetrics />} />
              <Route path="dashboard/setup" element={<DashboardMetricsSetup />} />
              </Route>
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
