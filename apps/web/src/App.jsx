import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import Home from './routes/Home'
import Work from './routes/Work'
import WorkDetail from './routes/WorkDetail'
import Foundry from './routes/Foundry'
import Stack from './routes/Stack'
import StackDetail from './routes/StackDetail'
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
        <Route path="stack/:slug" element={<StackDetail />} />
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
