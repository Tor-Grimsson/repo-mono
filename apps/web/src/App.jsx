import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType, Navigate, useParams } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { HelmetProvider } from 'react-helmet-async'
import ErrorBoundary from './components/ui/ErrorBoundary'
import SiteLayout from './components/layout/SiteLayout'
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
import IntroLoader from './components/layout/IntroLoader'
const Metrics = lazy(() => import('./routes/Metrics'))
import RouteLoader from './components/layout/RouteLoader'
// Dev-only foundry viewer demo — compile-time gated, tree-shaken from prod builds.
const Demo = import.meta.env.DEV ? lazy(() => import('./routes/Demo')) : null
import { TagModeProvider } from '@kolkrabbi/kol-workshop'
import WorkshopChrome from './components/workshop/WorkshopChrome'
import { VAULT } from './data/workshop/vault.js'
import WorkshopIntroduction from './routes/workshop/WorkshopIntroduction'
import EmbedFrame from './routes/workshop/EmbedFrame'
import EmbedOverview from './routes/workshop/EmbedOverview'
import { EMBED_GROUPS } from './data/workshop/embedSections'
import ApparatTool from './routes/workshop/ApparatTool'
import { APPARAT_TOOLS } from './data/workshop/apparatTools'
import HomeApparat from './routes/workshop/HomeApparat'
import Documentations from './routes/workshop/Documentations'
import DocumentationReader from './routes/workshop/DocumentationReader'
import DocsComponents from './routes/workshop/DocsComponents'
const docHref = (id) => (id ? `/workshop/docs/${id}` : '/workshop/docs')

const RedirectDocId = () => {
  const { docId } = useParams()
  return <Navigate to={`/workshop/docs/${docId}`} replace />
}

const DashboardOverview = lazy(() => import('./routes/workshop/DashboardOverview'))
const DashboardComponents = lazy(() => import('./routes/workshop/DashboardComponents'))
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
      {isLoading && location.pathname === '/' && <IntroLoader onEnter={handleEnter} />}
      <RouteLoader />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="studio" element={<Studio />} />
          {import.meta.env.DEV && Demo && (
            <Route path="dev/demo" element={<Suspense fallback={null}><Demo /></Suspense>} />
          )}
          <Route path="metrics" element={<Suspense fallback={<div className="min-h-screen bg-surface-primary" />}><Metrics /></Suspense>} />
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
            {/* TagModeProvider wraps the WHOLE shell (the reader portals its rail
              * via ShellTocContext). TagModeGate is GONE with kol-workshop ≥0.18 —
              * the tag browser is the search palette's expanded body now. */}
            <Route element={<TagModeProvider inventory={VAULT} docHref={docHref}><WorkshopChrome /></TagModeProvider>}>
              <Route index element={<WorkshopIntroduction />} />
              <Route path="docs" element={<Documentations />} />
              <Route path="docs/components" element={<DocsComponents />} />
              <Route path="docs/:docId" element={<DocumentationReader />} />
              <Route path="design-system" element={<EmbedOverview group={EMBED_GROUPS.designSystem} />} />
              <Route path="design-system/embed" element={<Navigate to="/workshop/design-system" replace />} />
              <Route path="brand" element={<EmbedOverview group={EMBED_GROUPS.brand} />} />
              <Route path="chess" element={<EmbedOverview group={EMBED_GROUPS.chess} />} />
              {Object.values(EMBED_GROUPS).flatMap((g) => g.pages).map((p) => (
                <Route key={p.path} path={p.path} element={<EmbedFrame src={p.src} title={p.label} />} />
              ))}
              <Route path="apparat" element={<HomeApparat />} />
              {/* Apparat: per-tool about page + frame at <id>/live; only dead
                * legacy aliases still redirect to the overview. */}
              {APPARAT_TOOLS.map((t) => (
                <Route key={t.id} path={`apparat/${t.id}`} element={<ApparatTool tool={t} />} />
              ))}
              {APPARAT_TOOLS.map((t) => (
                <Route key={`${t.id}-live`} path={`apparat/${t.id}/live`} element={<EmbedFrame src={t.live} title={t.label} />} />
              ))}
              <Route path="apparat/frequency-modulator" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-editor" element={<Navigate to="/workshop/apparat" replace />} />
              <Route path="apparat/kol-noter" element={<Navigate to="/workshop/apparat" replace />} />
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
              <Route path="dashboard" element={<DashboardOverview />} />
              <Route path="dashboard/components" element={<DashboardComponents />} />
              <Route path="dashboard/chess" element={<Navigate to="/workshop/chess" replace />} />
              <Route path="dashboard/metrics" element={<Navigate to="/metrics" replace />} />
              <Route path="dashboard/setup" element={<DashboardMetricsSetup />} />
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
        <BrowserRouter>
          <AppRoutes />
          <Analytics />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  )
}

export default App
