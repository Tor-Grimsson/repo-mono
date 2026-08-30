import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/framework/Layout'
import BrandLayout from './components/framework/BrandLayout'
import EmbedFrame from './components/framework/EmbedFrame'
import Landing from './pages/Landing'
import Reference from './pages/Reference'
import Components from './pages/Components'
import NotFound from './pages/NotFound'
import Placeholder from './pages/Placeholder'

import Brand from './pages/brand/Brand'
import Assets from './pages/assets/Assets'

import Library from './pages/Library'
import LibraryBrowse from './pages/LibraryBrowse'
import LibraryLocal from './pages/LibraryLocal'
import SlideDeckManager from './pages/SlideDeckManager'
import SlideDeckTemplates from './pages/SlideDeckTemplates'
import IconsGallery from './pages/IconsGallery'
import EditorPreset from './pages/EditorPreset'
import { MonitorOverview } from './pages/category/Overviews'

/* Sidebar level 1 = category, level 2 = what the category holds. Brand and
 * Assets hold SECTIONS of one scrolling page (`/brand#about`); the tool
 * categories hold pages because each is an iframe mirror. The old one-route-
 * per-section URLs redirect to their anchor so nothing 404s. */
const SECTION_REDIRECTS = [
  ['/brand/about', '/brand#about'],
  ['/brand/tone', '/brand#voice'],
  ['/brand/look', '/brand#look'],
  ['/brand/logo', '/brand#logos-concept'],
  ['/brand/lockups', '/brand#logos-types'],
  ['/brand/color', '/brand#color'],
  ['/brand/typography', '/brand#typography'],
  ['/assets/logos', '/assets#logos'],
  ['/assets/graphics', '/assets#graphics'],
  ['/assets/patterns', '/assets#patterns'],
  ['/assets/branded', '/assets#branded-assets'],
  ['/assets/stationery', '/assets#assets-stationery'],
  ['/assets/labels', '/assets#assets-labels-tags'],
  ['/assets/bags', '/assets#assets-garment-bags'],
  ['/assets/packaging', '/assets#assets-packaging'],
  ['/assets/social', '/assets#social-sizes'],
  ['/assets/profile', '/assets#social-profile'],
]

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<BrandLayout pageWash="var(--kol-fg-02)" />}>
          <Route path="/" element={<Landing />} />

          <Route path="/brand" element={<Brand />} />
          <Route path="/assets" element={<Assets />} />
          {SECTION_REDIRECTS.map(([from, to]) => (
            <Route key={from} path={from} element={<Navigate to={to} replace />} />
          ))}

          {/* SLIDE DECK — Overview is the manager. Layout and the two sets have
              no source yet. */}
          <Route path="/slide-deck" element={<SlideDeckManager />} />
          <Route path="/slide-deck/template" element={<SlideDeckTemplates />} />
          <Route path="/slide-deck/layout" element={<Placeholder id="deck-layout" label="Layout" title="Layout" note="Deck layout system — slide grids, safe areas and the master pages a template is built from." />} />
          <Route path="/slide-deck/set-1" element={<Placeholder id="deck-set-1" label="Set 1" title="Set 1" note="A named deck set. The registry in data/decks.js holds one deck today; this is where a second set lands." />} />
          <Route path="/slide-deck/set-2" element={<Placeholder id="deck-set-2" label="Set 2" title="Set 2" note="A named deck set. The registry in data/decks.js holds one deck today; this is where a third set lands." />} />

          {/* LIBRARY — Overview is the kol-media bucket on the DS organism. The
              write layer lives in kol-media-admin, which is why Upload is not
              built here rather than not built at all. */}
          <Route path="/library" element={<Library />} />
          {/* LIBRARY is three pages (user 2026-08-27): Overview = the filters wall, Browse = folder / files, Local = the repo's own images */}
          <Route path="/library/browse" element={<LibraryBrowse />} />
          <Route path="/library/local" element={<LibraryLocal />} />
          <Route path="/library/gallery" element={<Navigate to="/library/local" replace />} />
          <Route path="/library/upload" element={<Placeholder id="library-upload" label="Upload" title="Upload" note="Upload and organise. kol-component's MediaLibrary is the READ layer by design — write auth stays in kol-media-admin, and uploadToLibrary ships separately from kol-media-client." />} />
          <Route path="/library/search" element={<Placeholder id="library-search" label="Search" title="Search" note="Search and index across the bucket. The organism filters what it has fetched; a real index is a service question, not a UI one." />} />
          <Route path="/library/gallery-1" element={<Placeholder id="library-gallery-1" label="Gallery 1" title="Gallery 1" note="A filtered view of the bucket. The filter is this page's own config — it never enters the page name." />} />
          <Route path="/library/gallery-2" element={<Placeholder id="library-gallery-2" label="Gallery 2" title="Gallery 2" note="A second filtered view. Same shape as Gallery 1, different filter." />} />

          {/* EDITOR — every page embeds the deployed kol-ds-fxr. It has NO preset
              URL contract, so the preset pages all open the same surface and each
              says so on screen. `presetUrl()` in EditorPreset.jsx is the one line
              that changes when fxr grows one. */}
          <Route path="/editor" element={<EmbedFrame src="https://editor.kolkrabbi.io/" title="Design editor" />} />
          <Route path="/editor/plan" element={<Placeholder id="editor-plan" label="Plan" title="Plan" note="Plan-to-app — the route from a planned surface to a running one. No source yet." />} />
          <Route path="/editor/:preset" element={<EditorPreset />} />

          {/* MONITOR — entirely new 2026-08-01. Nothing under it is built. */}
          <Route path="/monitor" element={<MonitorOverview />} />
          <Route path="/monitor/plan" element={<Placeholder id="monitor-plan" label="Plan" title="Plan" note="Plan-to-app for the monitor surface. No source yet." />} />
          <Route path="/monitor/iframe" element={<Placeholder id="monitor-iframe" label="Iframe" title="Iframe" note="An embedded live surface. Which host it points at is unresolved." />} />
          <Route path="/monitor/mirror" element={<Placeholder id="monitor-mirror" label="Mirror" title="Mirror" note="A mirror of the iframe surface, for side-by-side comparison." />} />

          {/* ICONS — Overview embeds the DS showcase's own labelled grid.
              `?embed=1` is the showcase's embed mode (showcase/src/lib/useEmbed.js,
              read by ShellChrome): drops TopBar + sidebar + TOC rail, keeps content
              padding. Without it the frame nests Workshop's whole shell inside
              brand's. Documented in kol-ds-ui docs/documentation/04-compositions/02-shells.md.
              Shipped is the contact sheet over the published set. */}
          {/* the native gallery IS the icons page (user 2026-08-27 — the DS-showcase embed painted its own ground over the wash); the old sub-route redirects */}
          <Route path="/icons" element={<IconsGallery />} />
          <Route path="/icons/shipped" element={<Navigate to="/icons" replace />} />
          <Route path="/icons/workspace" element={<Placeholder id="icons-workspace" label="Workspace" title="Workspace" note="The _tmp icon shelf — 3,472 SVGs housed for reference, deliberately NOT loaded. A page that renders them all is a different build from one that lists them." />} />
          <Route path="/icons/gallery-1" element={<Placeholder id="icons-gallery-1" label="Gallery 1" title="Gallery 1" note="A filtered view of the set. The filter is this page's own config — it never enters the page name." />} />
          <Route path="/icons/gallery-2" element={<Placeholder id="icons-gallery-2" label="Gallery 2" title="Gallery 2" note="A second filtered view. Same shape as Gallery 1, different filter." />} />

          {/* Denavigated 2026-07-29 — route-live for direct-URL harvest. */}
          <Route path="/reference" element={<Reference />} />
          <Route path="/components" element={<Components />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
