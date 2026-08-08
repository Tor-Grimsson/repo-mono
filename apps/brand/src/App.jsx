import { Routes, Route } from 'react-router-dom'
import Layout from './components/framework/Layout'
import BrandLayout from './components/framework/BrandLayout'
import EmbedFrame from './components/framework/EmbedFrame'
import Landing from './pages/Landing'
import Reference from './pages/Reference'
import Components from './pages/Components'
import NotFound from './pages/NotFound'
import Placeholder from './pages/Placeholder'

import BrandOverview from './pages/brand/Overview'
import BrandAbout from './pages/brand/About'
import BrandTone from './pages/brand/Tone'
import BrandLook from './pages/brand/Look'
import BrandLogo from './pages/brand/Logo'
import BrandLockups from './pages/brand/Lockups'
import BrandColor from './pages/brand/Color'
import BrandTypography from './pages/brand/Typography'

import AssetsOverview from './pages/assets/Overview'
import AssetsLogos from './pages/assets/Logos'
import AssetsGraphics from './pages/assets/Graphics'
import AssetsPatterns from './pages/assets/Patterns'
import AssetsBranded from './pages/assets/Branded'
import AssetsStationery from './pages/assets/Stationery'
import AssetsLabels from './pages/assets/Labels'
import AssetsBags from './pages/assets/Bags'
import AssetsPackaging from './pages/assets/Packaging'
import AssetsSocial from './pages/assets/Social'
import AssetsProfile from './pages/assets/Profile'

import Library from './pages/Library'
import SlideDeckManager from './pages/SlideDeckManager'
import SlideDeckTemplates from './pages/SlideDeckTemplates'
import IconsGallery from './pages/IconsGallery'
import EditorPreset from './pages/EditorPreset'
import { MonitorOverview } from './pages/category/Overviews'

/* TWO LEVELS (2026-08-01): a category is a grouping label with NO route; every
 * leaf in the sidebar is a real page here. `Brand.jsx` and `Assets.jsx` split
 * into one page per former section — the originals are quarantined.
 *
 * Each category's bare route (`/brand`, `/assets`, …) belongs to its Overview,
 * so nothing that used to be a URL 404s after the split. */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<BrandLayout />}>
          <Route path="/" element={<Landing />} />

          {/* BRAND — seven pages that were `PageSection` blocks in one file. */}
          <Route path="/brand" element={<BrandOverview />} />
          <Route path="/brand/about" element={<BrandAbout />} />
          <Route path="/brand/tone" element={<BrandTone />} />
          <Route path="/brand/look" element={<BrandLook />} />
          <Route path="/brand/logo" element={<BrandLogo />} />
          <Route path="/brand/lockups" element={<BrandLockups />} />
          <Route path="/brand/color" element={<BrandColor />} />
          <Route path="/brand/typography" element={<BrandTypography />} />

          {/* ASSETS — ten pages, same extraction. */}
          <Route path="/assets" element={<AssetsOverview />} />
          <Route path="/assets/logos" element={<AssetsLogos />} />
          <Route path="/assets/graphics" element={<AssetsGraphics />} />
          <Route path="/assets/patterns" element={<AssetsPatterns />} />
          <Route path="/assets/branded" element={<AssetsBranded />} />
          <Route path="/assets/stationery" element={<AssetsStationery />} />
          <Route path="/assets/labels" element={<AssetsLabels />} />
          <Route path="/assets/bags" element={<AssetsBags />} />
          <Route path="/assets/packaging" element={<AssetsPackaging />} />
          <Route path="/assets/social" element={<AssetsSocial />} />
          <Route path="/assets/profile" element={<AssetsProfile />} />

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
          <Route path="/icons" element={<EmbedFrame src="https://ui.kolkrabbi.io/icons?embed=1" title="Icons" />} />
          <Route path="/icons/shipped" element={<IconsGallery />} />
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
