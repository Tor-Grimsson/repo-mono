import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigationType, Navigate } from 'react-router-dom'
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
import RouteLoader from './components/layout/RouteLoader'
import WorkshopChrome from './components/workshop/WorkshopChrome'
import WorkshopIntroduction from './routes/workshop/WorkshopIntroduction'
import WorkshopPage from './routes/workshop/WorkshopPage'
import EmbedFrame from './routes/workshop/EmbedFrame'
import { PAGES } from './data/workshop/pages.js'

/* The four tools that kept a page when the Apparat layer was retired
 * (2026-10-05): old id → the page it lives on now. */
const APPARAT_MOVED = {
  'kol-ds-editor': 'fxr',
  'kol-monitor': 'monitor',
  'kol-mirror': 'mirror',
  'kol-vcap': 'vcap',
}

/* Routes whose deeper segment is an OVERLAY, not a page (2026-08-28).
 *
 * `/prints/:slug` renders `element={null}` — the grid stays mounted and a
 * detail panel opens on top of it. Nothing was left, so nothing should be
 * re-entered: resetting scroll on the way in and out dumps you at the top of
 * the catalog every time you close a print, having lost your place in 24 cards.
 *
 * A route belongs here only if the deeper segment mounts NO route element of
 * its own. `/work/:slug` is a real page and is deliberately not in this list. */
const OVERLAY_ROUTES = ['/prints']

const sameOverlayGroup = (a, b) => {
  if (a === b) return false
  return OVERLAY_ROUTES.some((root) => {
    const inGroup = (p) => p === root || p.startsWith(`${root}/`)
    return inGroup(a) && inGroup(b)
  })
}

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
  const prevPathname = useRef(location.pathname)

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
    const prev = prevPathname.current
    prevPathname.current = location.pathname

    // Skip scroll reset on browser back/forward — browser restores position natively
    if (navigationType === 'POP') return
    // …and when only an overlay opened or closed over a page that never unmounted
    if (sameOverlayGroup(prev, location.pathname)) return
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
          {/* Redirects: the docs left the live site (2026-10-05) */}
          <Route path="docs/*" element={<Navigate to="/workshop" replace />} />
          <Route path="workshop" element={<Workshop />}>
            <Route element={<WorkshopChrome />}>
              <Route index element={<WorkshopIntroduction />} />
              {/* One page per app, from data/workshop/pages; the open-in-place
                * frame lives at <id>/live for a page that declares `embed`. */}
              {PAGES.map((p) => (
                <Route key={p.id} path={p.id} element={<WorkshopPage id={p.id} />} />
              ))}
              {PAGES.filter((p) => p.embed).map((p) => (
                <Route key={`${p.id}-live`} path={`${p.id}/live`} element={<EmbedFrame src={p.url} title={p.title} />} />
              ))}
              {/* Redirects: everything the hub retired lands on the page that
                * holds it now. A page's own route outranks its splat. */}
              <Route path="docs/*" element={<Navigate to="/workshop" replace />} />
              <Route path="design-system/*" element={<Navigate to="/workshop/design-system" replace />} />
              <Route path="brand/*" element={<Navigate to="/workshop/brand" replace />} />
              <Route path="chess/*" element={<Navigate to="/workshop/chess" replace />} />
              {Object.entries(APPARAT_MOVED).map(([old, id]) => (
                <Route key={old} path={`apparat/${old}`} element={<Navigate to={`/workshop/${id}`} replace />} />
              ))}
              {Object.entries(APPARAT_MOVED).map(([old, id]) => (
                <Route key={`${old}-live`} path={`apparat/${old}/live`} element={<Navigate to={`/workshop/${id}/live`} replace />} />
              ))}
              <Route path="apparat/*" element={<Navigate to="/workshop" replace />} />
              <Route path="apparatus/*" element={<Navigate to="/workshop" replace />} />
              <Route path="mirrors/*" element={<Navigate to="/workshop" replace />} />
              <Route path="dashboard/chess" element={<Navigate to="/workshop/chess" replace />} />
              <Route path="dashboard/*" element={<Navigate to="/workshop/metrics" replace />} />
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
