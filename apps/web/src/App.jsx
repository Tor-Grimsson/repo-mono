import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import Home from './routes/Home'
import Work from './routes/Work'
import WorkDetail from './routes/WorkDetail'
import Foundry from './routes/Foundry'
import Stack from './routes/Stack'
import StackArticle from './routes/StackArticle'
import Demo from './routes/Demo'
import Styleguide from './routes/Styleguide'
import LoaderOverlay from './components/layout/LoaderOverlay'

function AppRoutes() {
  const [isLoading, setIsLoading] = useState(() => {
    // Check if user has seen loader this session
    const hasSeenLoader = sessionStorage.getItem('hasSeenLoader')
    return !hasSeenLoader
  })
  const location = useLocation()

  const handleEnter = () => {
    setIsLoading(false)
    sessionStorage.setItem('hasSeenLoader', 'true')
  }

  // Save scroll position before unload
  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString())
    }
    window.addEventListener('beforeunload', saveScrollPosition)
    return () => window.removeEventListener('beforeunload', saveScrollPosition)
  }, [])

  // Restore scroll position on mount
  useEffect(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition')
    if (savedPosition) {
      window.scrollTo(0, parseInt(savedPosition, 10))
      sessionStorage.removeItem('scrollPosition')
    }
  }, [])

  useEffect(() => {
    if (location.pathname !== '/') {
      setIsLoading(false)
    }
    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [location])

  return (
    <>
      {isLoading && location.pathname === '/' && <LoaderOverlay onEnter={handleEnter} />}
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />
          <Route path="work" element={<Work />} />
        <Route path="work/:slug" element={<WorkDetail />} />
        <Route path="foundry" element={<Foundry />} />
        <Route path="stack" element={<Stack />} />
        <Route path="stack/:slug" element={<StackArticle />} />
        <Route path="demo" element={<Demo />} />
        <Route path="styleguide/*" element={<Styleguide />} />
      </Route>
    </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
