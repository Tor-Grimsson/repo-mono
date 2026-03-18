import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { FooterSimple } from './Footer'
import { CursorProvider } from '../../context/CursorContext'
import { WorkViewProvider } from '../../context/WorkViewContext'
import CursorOverlay from '../overlay/CursorOverlay'
import AsciiCursor from '../ui/AsciiCursor'

export default function SiteLayout() {
  const location = useLocation()
  const hideChrome = location.pathname.startsWith('/workshop') || location.pathname.startsWith('/docs')

  return (
    <WorkViewProvider>
      <CursorProvider>
        <div className="min-h-dvh bg-surface-primary">
          {!hideChrome && <Navbar />}
          <Outlet />
          {!hideChrome && <FooterSimple />}
          <CursorOverlay />
          <AsciiCursor />
        </div>
      </CursorProvider>
    </WorkViewProvider>
  )
}
