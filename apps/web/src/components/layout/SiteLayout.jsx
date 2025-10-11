import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { CursorProvider } from '../../context/CursorContext'
import CursorOverlay from '../overlay/CursorOverlay'

export default function SiteLayout() {
  const location = useLocation()
  const hideChrome = location.pathname.startsWith('/styleguide')

  return (
    <CursorProvider>
      <div className="min-h-dvh bgAbsoluteWhite text-[var(--foreground)]">
        {!hideChrome && <Navbar />}
        <Outlet />
        {!hideChrome && <Footer />}
        <CursorOverlay />
      </div>
    </CursorProvider>
  )
}
