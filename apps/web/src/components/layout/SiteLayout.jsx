import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { CursorProvider } from '../../context/CursorContext'
import CursorOverlay from '../overlay/CursorOverlay'

export default function SiteLayout() {
  return (
    <CursorProvider>
      <div className="min-h-dvh bgAbsoluteWhite text-[var(--color-text-primary)]">
        <Navbar />
        <Outlet />
        <Footer />
        <CursorOverlay />
      </div>
    </CursorProvider>
  )
}
