import { Outlet, useLocation } from 'react-router-dom'
import ScrollToTop from './ScrollToTop'
import { ExitPreview } from '@kolkrabbi/kol-component'

const clientSurfacePatterns = [/^\/site/]

export default function Layout() {
  const { pathname } = useLocation()
  const isClientSiteRoute = clientSurfacePatterns.some((re) => re.test(pathname))

  return (
    <div className="min-h-dvh flex flex-col">
      <ScrollToTop />
      {/* Skip link must precede the landmark it targets — same pattern as
        * apps/web SiteLayout (07-28 a11y pass). BrandLayout nests inside this
        * <main>, so both the link and the id belong here, not there. */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:px-4 focus:py-2 focus:rounded bg-accent-primary text-surface-primary kol-mono-14"
      >
        Skip to content
      </a>
      <main id="main" className="flex-1 min-w-0">
        <Outlet />
      </main>
      {isClientSiteRoute && <ExitPreview />}
    </div>
  )
}
