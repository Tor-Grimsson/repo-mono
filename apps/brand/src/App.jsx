import { Routes, Route } from 'react-router-dom'
import Layout from './components/framework/Layout'
import BrandLayout from './components/framework/BrandLayout'
import Landing from './pages/Landing'
import Styleguide from './pages/Styleguide'
import Reference from './pages/Reference'
import Components from './pages/Components'
import Library from './pages/Library'
import Assets from './pages/Assets'
import Review from './pages/Review'
import NotFound from './pages/NotFound'

// Framework tools
import Gallery from './components/tools/Gallery'
import SlideDeck from './components/loaders/decks/SlideDeck'

export default function App() {
  return (
    <Routes>
      {/* Standalone slide deck (fullscreen, no chrome) */}
      <Route path="/slide-deck" element={<SlideDeck />} />

      <Route element={<Layout />}>
        {/* Portal — landing + styleguide / gallery / reference / generators */}
        <Route element={<BrandLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/styleguide" element={<Styleguide />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/library" element={<Library />} />
          <Route path="/assets" element={<Assets />} />
          <Route path="/reference" element={<Reference />} />
          <Route path="/components" element={<Components />} />
          {/* Audit review line-up — route-only, dies with the audit. */}
          <Route path="/review" element={<Review />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
