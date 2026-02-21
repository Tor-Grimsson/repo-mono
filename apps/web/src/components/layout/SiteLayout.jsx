import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { CursorProvider } from '../../context/CursorContext'
import CursorOverlay from '../overlay/CursorOverlay'

export default function SiteLayout() {
  const location = useLocation()
  const hideChrome = location.pathname.startsWith('/workshop')
  const isPrints = location.pathname === '/prints' || location.pathname.startsWith('/prints/')

  // Specimen selection pages have custom grid systems with precise padding
  const hasCustomGridPadding = location.pathname.includes('/specimen/') &&
                                 (location.pathname.includes('/selection') ||
                                  location.pathname.includes('/poetry') ||
                                  location.pathname.includes('/complete'))

  const shouldApplyDefaultPadding = !(hideChrome || hasCustomGridPadding || isPrints)

  return (
    <CursorProvider>
      <div className="min-h-dvh bg-surface-primary">
        {!hideChrome && <Navbar />}
        <div className={shouldApplyDefaultPadding ? 'px-4 md:px-6 lg:px-8' : ''}>
          <Outlet />
        </div>
        {!hideChrome && <Footer />}
        <CursorOverlay />
      </div>
    </CursorProvider>
  )
}
