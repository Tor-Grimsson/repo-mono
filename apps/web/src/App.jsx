import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import SiteLayout from './components/layout/SiteLayout'
import Home from './routes/Home'
import Work from './routes/Work'
import WorkDetail from './routes/WorkDetail'
import Foundry from './routes/foundry/Foundry'
import FoundrySpecimens from './routes/foundry/FoundrySpecimens'
import FoundryTypefaces from './routes/foundry/FoundryTypefaces'
import FoundryLicensing from './routes/foundry/FoundryLicensing'
import FoundryMalromur from './routes/foundry/FoundryMalromur'
import FoundryRoot from './routes/foundry/FoundryRoot'
import FoundryTrollatunga from './routes/foundry/FoundryTrollatunga'
import FoundryDylgjur from './routes/foundry/FoundryDylgjur'
import FoundryGullhamrar from './routes/foundry/FoundryGullhamrar'
import FoundrySilfurbarki from './routes/foundry/FoundrySilfurbarki'
import FoundryOrdspor from './routes/foundry/FoundryOrdspor'
import Stack from './routes/Stack'
import StackArticle from './routes/StackArticle'
import Demo from './routes/Demo'
import Styleguide from './routes/Styleguide'
import StyleguideMain from './routes/styleguide/Styleguide'
import CollectionsIllustrations from './routes/collections/Illustrations'
import CollectionsLogomarks from './routes/collections/Logomarks'
// import TypographySheet from './routes/styleguide/Typography' // Has broken dependencies
import SpecimenOne from './routes/foundry/SpecimenOne'
import SpecimenTwo from './routes/foundry/SpecimenTwo'
import SpecimenThree from './routes/foundry/SpecimenThree'
import SpecimenFour from './routes/foundry/SpecimenFour'
import SpecimenFive from './routes/foundry/SpecimenFive'
import SpecimenProseOverview from './routes/foundry/SpecimenProseOverview'
import SpecimenProseSpecs from './routes/foundry/SpecimenProseSpecs'
import SpecimenRootSystem from './routes/foundry/SpecimenRootSystem'
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
          <Route path="foundry/malromur" element={<FoundryMalromur />} />
          <Route path="foundry/root" element={<FoundryRoot />} />
          <Route path="foundry/trollatunga" element={<FoundryTrollatunga />} />
          <Route path="foundry/dylgjur" element={<FoundryDylgjur />} />
          <Route path="foundry/gullhamrar" element={<FoundryGullhamrar />} />
          <Route path="foundry/silfurbarki" element={<FoundrySilfurbarki />} />
          <Route path="foundry/ordspor" element={<FoundryOrdspor />} />
          <Route path="foundry/specimens" element={<FoundrySpecimens />} />
          <Route path="foundry/typefaces" element={<FoundryTypefaces />} />
          <Route path="foundry/licensing" element={<FoundryLicensing />} />
          <Route path="specimen/one" element={<SpecimenOne />} />
          <Route path="specimen/two" element={<SpecimenTwo />} />
          <Route path="specimen/prose" element={<SpecimenProseOverview />} />
          <Route path="specimen/prose/specs" element={<SpecimenProseSpecs />} />
          <Route path="specimen/three" element={<SpecimenThree />} />
          <Route path="specimen/four" element={<SpecimenFour />} />
          <Route path="specimen/five" element={<SpecimenFive />} />
          <Route path="specimen/root-system" element={<SpecimenRootSystem />} />
          <Route path="stack" element={<Stack />} />
          <Route path="stack/:slug" element={<StackArticle />} />
          <Route path="collections/illustrations" element={<CollectionsIllustrations />} />
          <Route path="collections/logomarks" element={<CollectionsLogomarks />} />
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
