import { Routes, Route } from 'react-router-dom'
import Layout from './components/framework/Layout'
import BrandLayout from './components/framework/BrandLayout'
import EmbedFrame from './components/framework/EmbedFrame'
import Landing from './pages/Landing'
import Brand from './pages/Brand'
import Reference from './pages/Reference'
import Components from './pages/Components'
import Library from './pages/Library'
import Assets from './pages/Assets'
import NotFound from './pages/NotFound'

import SlideDeckManager from './pages/SlideDeckManager'
import SlideDeckTemplates from './pages/SlideDeckTemplates'
import SlideDeckPage from './pages/SlideDeckPage'
import IconsGallery from './pages/IconsGallery'
import EditorPreset from './pages/EditorPreset'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Portal — landing + brand / assets / library / reference */}
        <Route element={<BrandLayout />}>
          <Route path="/" element={<Landing />} />
          {/* /styleguide → /brand 2026-08-01: the page's own hero has always
              read "brand guidelines", and "styleguide" names the UI-component
              surface in this ecosystem (/components, /reference). */}
          <Route path="/brand" element={<Brand />} />
          {/* Slide deck: a MANAGER at the root, not a viewer. `/templates` is a
              literal segment so it must be declared BEFORE `/:deck` — otherwise
              the param route swallows it and "templates" is read as a slug. */}
          <Route path="/slide-deck" element={<SlideDeckManager />} />
          <Route path="/slide-deck/templates" element={<SlideDeckTemplates />} />
          <Route path="/slide-deck/:deck" element={<SlideDeckPage />} />

          {/* Library: ONE route. The folder-scoped galleries at /library/:folder
              retired 2026-08-01 with the MediaLibrary adoption — the organism
              discloses folders in place (Finder's list model), and its provider
              calls listMedia('') with no prefix seam, so a scoped child route
              has nothing to scope. lobby/outbox/MediaLibrary.md */}
          <Route path="/library" element={<Library />} />
          <Route path="/assets" element={<Assets />} />

          {/* Embedded surfaces — the two brand-book pages that live in their own
              repos. Both point at the deployed host, matching every embed in
              apps/web/src/data/workshop/navigation.js; a localhost src would be
              a dead frame for anyone without those dev servers running.
              editor = kol-ds-fxr (the URL already used at navigation.js:70),
              icons  = kol-ds-ui's showcase. Neither repo is touched. */}
          <Route path="/editor" element={<EmbedFrame src="https://editor.kolkrabbi.io/" title="Design editor" />} />
          {/* ?embed=1 is the showcase's own embed mode (showcase/src/lib/useEmbed.js,
              read by ShellChrome): layout-level, drops TopBar + sidebar + TOC rail,
              keeps content padding. Without it the frame nests Workshop's whole shell
              inside brand's. Latches per document, so in-frame links can't pop the
              chrome back. Documented in kol-ds-ui
              docs/documentation/04-compositions/02-shells.md, "Embed mode". */}
          <Route path="/icons" element={<EmbedFrame src="https://ui.kolkrabbi.io/icons?embed=1" title="Icons" />} />

          {/* Child routes: the editor presets are PLACEHOLDERS (fxr accepts no
              preset yet); the icons child is the contact-sheet presentation. */}
          <Route path="/editor/:preset" element={<EditorPreset />} />
          <Route path="/icons/:set" element={<IconsGallery />} />

          <Route path="/reference" element={<Reference />} />
          <Route path="/components" element={<Components />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
