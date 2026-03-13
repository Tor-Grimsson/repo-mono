import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { CursorProvider } from '../../context/CursorContext'
import { WorkViewProvider } from '../../context/WorkViewContext'
import CursorOverlay from '../overlay/CursorOverlay'

export default function SiteLayout() {
  const location = useLocation()
  const hideChrome = location.pathname.startsWith('/workshop') || location.pathname.startsWith('/docs')

  return (
    <WorkViewProvider>
      <CursorProvider>
        <div className="min-h-dvh bg-surface-primary">
          {!hideChrome && <Navbar />}
          <div style={{ containerType: 'inline-size' }}>
            <Outlet />
          </div>
          {!hideChrome && <Footer />}
          <CursorOverlay />
        </div>
      </CursorProvider>
    </WorkViewProvider>
  )
}
