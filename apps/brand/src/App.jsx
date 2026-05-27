import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/framework/Layout'
import BrandLayout from './components/framework/BrandLayout'
import Landing from './pages/Landing'
import Styleguide from './pages/Styleguide'
import Reference from './pages/Reference'
import Components from './pages/Components'
import Icons from './pages/Icons'
import IconsVariants from './pages/IconsVariants'
import Demo from './pages/Demo'
import Acyr from './pages/Acyr'
import Editor from './editor/Editor'
import Library from './pages/Library'
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
          <Route path="/reference" element={<Reference />} />
          <Route path="/reference/acyr" element={<Acyr />} />
          {/* Legacy redirects into the unified editor. */}
          <Route path="/generators"              element={<Navigate to="/editor/compose" replace />} />
          <Route path="/generators/combo-lab"    element={<Navigate to="/editor/palette" replace />} />
          <Route path="/generators/pattern-lab"  element={<Navigate to="/editor/pattern" replace />} />
          <Route path="/generators/type-lab"     element={<Navigate to="/editor/type"    replace />} />
          <Route path="/generators/social"       element={<Navigate to="/editor/compose?starter=social-square" replace />} />
          <Route path="/generators/compositor"   element={<Navigate to="/editor/compose" replace />} />
          <Route path="/compose"                 element={<Navigate to="/editor/compose" replace />} />
          <Route path="/editor/:mode" element={<Editor />} />
          <Route path="/components" element={<Components />} />
          <Route path="/icons" element={<Icons />} />
          <Route path="/icons/variants" element={<IconsVariants />} />
          <Route path="/demo" element={<Demo />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
