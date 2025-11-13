import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/errors/ErrorBoundary'
import SiteLayout from './components/layout/SiteLayout'
import { LanguageProvider } from './contexts/LanguageContext'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Studio from './routes/Studio'
import Work from './routes/Work'
import WorkDetail from './routes/WorkDetail'
import FoundryOverview from './routes/foundry/FoundryOverview'
import FoundrySpecimens from './routes/foundry/FoundrySpecimens'
import FoundryTypefaces from './routes/foundry/FoundryTypefaces'
import FoundryLicensing from './routes/foundry/FoundryLicensing'
import FoundryMalromur from './routes/foundry/typefaces/FoundryMalromur'
import FoundryRoot from './routes/foundry/typefaces/FoundryRoot'
import FoundryTrollatunga from './routes/foundry/typefaces/FoundryTrollatunga'
import FoundryDylgjur from './routes/foundry/typefaces/FoundryDylgjur'
import FoundryGullhamrar from './routes/foundry/typefaces/FoundryGullhamrar'
import FoundrySilfurbarki from './routes/foundry/typefaces/FoundrySilfurbarki'
import FoundryOrdspor from './routes/foundry/typefaces/FoundryOrdspor'
import GullhamrarHub from './routes/specimens/gullhamrar/GullhamrarHub'
import GullhamrarHubGrid from './routes/specimens/gullhamrar/GullhamrarHubGrid'
import GullhamrarPoetryGrid from './routes/specimens/gullhamrar/GullhamrarPoetryGrid'
import GullhamrarComplete1Grid from './routes/specimens/gullhamrar/GullhamrarComplete1Grid'
import GullhamrarSelection from './routes/specimens/gullhamrar/GullhamrarSelection'
import RotHub from './routes/specimens/rot/RotHub'
import RotSelection from './routes/specimens/rot/RotSelection'
import RotGrid from './routes/specimens/rot/RotGrid'
import Stack from './routes/Stack'
import StackArticle from './routes/StackArticle'
import Workshop from './routes/Workshop'
import WorkshopMain from './routes/workshop/Workshop'
import CollectionsOverview from './routes/collections/CollectionsOverview'
import CollectionsIllustrations from './routes/collections/Illustrations'
import CollectionsLogomarks from './routes/collections/Logomarks'
import CollectionsMotionGraphics from './routes/collections/MotionGraphics'
// import TypographySheet from './routes/workshop/Typography' // Has broken dependencies
import GullhamrarPoetry from './routes/specimens/gullhamrar/GullhamrarPoetry'
import MalromurVariableAxis from './routes/specimens/malromur/MalromurVariableAxis'
import MalromurComplete from './routes/specimens/malromur/MalromurComplete'
import MalromurScientific from './routes/specimens/malromur/MalromurScientific'
import MalromurLegislative from './routes/specimens/malromur/MalromurLegislative'
import MalromurHub from './routes/specimens/malromur/MalromurHub'
import MalromurSpecs from './routes/specimens/malromur/MalromurSpecs'
import MalromurEditorial from './routes/specimens/malromur/MalromurEditorial'
import MalromurDataTable from './routes/specimens/malromur/MalromurDataTable'
import MalromurMenu from './routes/specimens/malromur/MalromurMenu'
import MalromurNewsletter from './routes/specimens/malromur/MalromurNewsletter'
import MalromurIndex from './routes/specimens/malromur/MalromurIndex'
import MalromurChapter from './routes/specimens/malromur/MalromurChapter'
import MalromurTOC from './routes/specimens/malromur/MalromurTOC'
import MalromurTitlePage from './routes/specimens/malromur/MalromurTitlePage'
import RotDesignSystem from './routes/specimens/rot/RotDesignSystem'
import DylgjurComplete1 from './routes/specimens/dylgjur/DylgjurComplete1'
import DylgjurComplete1Grid from './routes/specimens/dylgjur/DylgjurComplete1Grid'
import DylgjurSelection from './routes/specimens/dylgjur/DylgjurSelection'
import GullhamrarComplete1 from './routes/specimens/gullhamrar/GullhamrarComplete1'
import SilfurbarkiComplete1 from './routes/specimens/silfurbarki/SilfurbarkiComplete1'
import SilfurbarkiComplete1Grid from './routes/specimens/silfurbarki/SilfurbarkiComplete1Grid'
import RestComplete1 from './routes/specimens/rest/RestComplete1'
import RestComplete1Grid from './routes/specimens/rest/RestComplete1Grid'
import RestComplete1Selection from './routes/specimens/rest/RestComplete1Selection'
import RestComplete2 from './routes/specimens/rest/RestComplete2'
import RestComplete2Grid from './routes/specimens/rest/RestComplete2Grid'
import RestComplete2Selection from './routes/specimens/rest/RestComplete2Selection'
import RestComplete3 from './routes/specimens/rest/RestComplete3'
import RestComplete3Grid from './routes/specimens/rest/RestComplete3Grid'
import RestComplete3Selection from './routes/specimens/rest/RestComplete3Selection'
import RestComplete4 from './routes/specimens/rest/RestComplete4'
import RestComplete4Grid from './routes/specimens/rest/RestComplete4Grid'
import RestComplete4Selection from './routes/specimens/rest/RestComplete4Selection'
import LayoutL1 from './routes/specimens/layout/LayoutL1'
import LayoutL2 from './routes/specimens/layout/LayoutL2'
import LoaderOverlay from './components/layout/LoaderOverlay'
import TextPressureTest from './routes/TextPressureTest'

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
          <Route path="studio" element={<Studio />} />
          <Route path="work" element={<Work />} />
          <Route path="work/:slug" element={<WorkDetail />} />
          <Route path="foundry" element={<FoundryOverview />} />
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
          <Route path="specimen/gullhamrar" element={<GullhamrarHub />} />
          <Route path="specimen/gullhamrar/poetry" element={<GullhamrarPoetry />} />
          <Route path="specimen/gullhamrar/grid" element={<GullhamrarHubGrid />} />
          <Route path="specimen/gullhamrar/poetry-grid" element={<GullhamrarPoetryGrid />} />
          <Route path="specimen/gullhamrar/complete-1-grid" element={<GullhamrarComplete1Grid />} />
          <Route path="specimen/gullhamrar/selection" element={<GullhamrarSelection />} />
          <Route path="specimen/malromur" element={<MalromurHub />} />
          <Route path="specimen/malromur/variable-axis" element={<MalromurVariableAxis />} />
          <Route path="specimen/malromur/specs" element={<MalromurSpecs />} />
          <Route path="specimen/malromur/editorial" element={<MalromurEditorial />} />
          <Route path="specimen/malromur/data-table" element={<MalromurDataTable />} />
          <Route path="specimen/malromur/menu" element={<MalromurMenu />} />
          <Route path="specimen/malromur/newsletter" element={<MalromurNewsletter />} />
          <Route path="specimen/malromur/index" element={<MalromurIndex />} />
          <Route path="specimen/malromur/chapter" element={<MalromurChapter />} />
          <Route path="specimen/malromur/toc" element={<MalromurTOC />} />
          <Route path="specimen/malromur/title-page" element={<MalromurTitlePage />} />
          <Route path="specimen/malromur/complete" element={<MalromurComplete />} />
          <Route path="specimen/malromur/scientific" element={<MalromurScientific />} />
          <Route path="specimen/malromur/legislative" element={<MalromurLegislative />} />
          <Route path="specimen/rot" element={<RotHub />} />
          <Route path="specimen/rot/design-systems" element={<RotDesignSystem />} />
          <Route path="specimen/rot/complete" element={<RotSelection />} />
          <Route path="specimen/rot/grid" element={<RotGrid />} />
          <Route path="specimen/dylgjur/complete-1" element={<DylgjurComplete1 />} />
          <Route path="specimen/dylgjur/complete-1-grid" element={<DylgjurComplete1Grid />} />
          <Route path="specimen/dylgjur/selection" element={<DylgjurSelection />} />
          <Route path="specimen/gullhamrar/complete-1" element={<GullhamrarComplete1 />} />
          <Route path="specimen/silfurbarki/complete-1" element={<SilfurbarkiComplete1 />} />
          <Route path="specimen/silfurbarki/complete-1-grid" element={<SilfurbarkiComplete1Grid />} />
          <Route path="specimen/rest/complete-1" element={<RestComplete1 />} />
          <Route path="specimen/rest/complete-1-grid" element={<RestComplete1Grid />} />
          <Route path="specimen/rest/complete-1-selection" element={<RestComplete1Selection />} />
          <Route path="specimen/rest/complete-2" element={<RestComplete2 />} />
          <Route path="specimen/rest/complete-2-grid" element={<RestComplete2Grid />} />
          <Route path="specimen/rest/complete-2-selection" element={<RestComplete2Selection />} />
          <Route path="specimen/rest/complete-3" element={<RestComplete3 />} />
          <Route path="specimen/rest/complete-3-grid" element={<RestComplete3Grid />} />
          <Route path="specimen/rest/complete-3-selection" element={<RestComplete3Selection />} />
          <Route path="specimen/rest/complete-4" element={<RestComplete4 />} />
          <Route path="specimen/rest/complete-4-grid" element={<RestComplete4Grid />} />
          <Route path="specimen/rest/complete-4-selection" element={<RestComplete4Selection />} />
          <Route path="specimen/layout/l-1" element={<LayoutL1 />} />
          <Route path="specimen/layout/l-2" element={<LayoutL2 />} />
          <Route path="stack" element={<Stack />} />
          <Route path="stack/:slug" element={<StackArticle />} />
          <Route path="collections" element={<CollectionsOverview />} />
          <Route path="collections/illustrations" element={<CollectionsIllustrations />} />
          <Route path="collections/logomarks" element={<CollectionsLogomarks />} />
          <Route path="collections/motion-graphics" element={<CollectionsMotionGraphics />} />
          <Route path="workshop/*" element={<Workshop />} />
          {/* 404 Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Route>
        {/* Standalone test route - no SiteLayout */}
        <Route path="text-pressure-test" element={<TextPressureTest />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <LanguageProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </LanguageProvider>
    </ErrorBoundary>
  )
}

export default App
