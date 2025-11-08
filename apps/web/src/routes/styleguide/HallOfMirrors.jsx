import { Link } from 'react-router-dom'
import DesPage from '../../components/styleguide/molecules/DesPage'

export default function HallOfMirrors() {
  return (
    <DesPage
      title="Hall of Mirrors"
      subtitle="A research apparatus for visual distortion, transformation, and replication effects"
    >
      <div className="space-y-12">
        {/* Introduction */}
        <div className="space-y-6">
          <div className="kol-body-m text-fg-96">
            The Hall of Mirrors explores three fundamental approaches to manipulating visual media:
            <strong> displacement</strong>, <strong>movement</strong>, and <strong>replication</strong>.
            Each hall investigates different techniques and technologies for creating effects that bend,
            transform, and multiply images in real-time.
          </div>

          <div className="kol-body-s text-fg-64">
            This research aims to benchmark performance and visual quality across different implementation
            approaches, from SVG filters to WebGL rendering, ultimately informing decisions about the most
            efficient way to achieve dynamic visual effects in production.
          </div>
        </div>

        {/* The Three Halls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Hall of Displacement */}
          <Link to="/styleguide/mirrors/displacement">
            <div className="group border border-fg-08 hover:border-fg-16 transition-colors p-6 space-y-4 cursor-pointer">
              <div className="kol-heading-s text-fg-96 group-hover:accentYellow transition-colors">
                Hall of Displacement
              </div>
              <div className="kol-body-s text-fg-64">
                SVG filter techniques using feTurbulence and feDisplacementMap to create organic,
                wavy distortions. CPU-based rendering with GSAP for real-time animation.
              </div>
              <div className="kol-helper-xs text-fg-48 font-mono">
                8 variants • SVG filters • GSAP
              </div>
            </div>
          </Link>

          {/* Hall of Movement */}
          <Link to="/styleguide/mirrors/movement">
            <div className="group border border-fg-08 hover:border-fg-16 transition-colors p-6 space-y-4 cursor-pointer">
              <div className="kol-heading-s text-fg-96 group-hover:accentYellow transition-colors">
                Hall of Movement
              </div>
              <div className="kol-body-s text-fg-64">
                GSAP-powered transformations for moving, bending, and stretching. Explores variable
                font animations, text morphing, and 3D transforms.
              </div>
              <div className="kol-helper-xs text-fg-48 font-mono">
                Coming soon • GSAP • Variable fonts
              </div>
            </div>
          </Link>

          {/* Hall of Copies */}
          <Link to="/styleguide/mirrors/copies">
            <div className="group border border-fg-08 hover:border-fg-16 transition-colors p-6 space-y-4 cursor-pointer">
              <div className="kol-heading-s text-fg-96 group-hover:accentYellow transition-colors">
                Hall of Copies
              </div>
              <div className="kol-body-s text-fg-64">
                PixiJS TilingSprite effects for repeating patterns, glitch aesthetics, and morphing tiles.
                WebGL-accelerated with precise control over delays and repetition.
              </div>
              <div className="kol-helper-xs text-fg-48 font-mono">
                4 variants • PixiJS • WebGL
              </div>
            </div>
          </Link>
        </div>

        {/* Symphony & Archive */}
        <div className="border-t border-fg-08 pt-12 space-y-6">
          <Link to="/styleguide/mirrors/symphony">
            <div className="group border border-fg-08 hover:border-fg-16 transition-colors p-8 space-y-6 cursor-pointer">
              <div className="kol-heading-m text-fg-96 group-hover:accentYellow transition-colors">
                Hall of Symphony
              </div>
              <div className="kol-body-m text-fg-64">
                A live performance mixer combining displacement, movement, and replication.
                This hall serves as a performance benchmark and creative playground, allowing you to
                compose complex visual effects by layering techniques from all three halls.
              </div>
              <div className="flex items-center gap-4">
                <div className="kol-helper-xs text-fg-48 font-mono">
                  Performance benchmark
                </div>
                <div className="kol-helper-xs text-fg-48">•</div>
                <div className="kol-helper-xs text-fg-48 font-mono">
                  Live mixer
                </div>
                <div className="kol-helper-xs text-fg-48">•</div>
                <div className="kol-helper-xs text-fg-48 font-mono">
                  FPS monitoring
                </div>
              </div>
            </div>
          </Link>

          <Link to="/styleguide/mirrors/archive">
            <div className="group border border-fg-08 hover:border-fg-16 transition-colors p-8 space-y-6 cursor-pointer">
              <div className="kol-heading-m text-fg-96 group-hover:accentYellow transition-colors">
                Hall of Archive
              </div>
              <div className="kol-body-m text-fg-64">
                Store and preserve experiments from the Symphony mixer. Save your best compositions,
                compare performance across iterations, and maintain a reference library of effects
                that worked. 9 slots encourage thoughtful curation.
              </div>
              <div className="flex items-center gap-4">
                <div className="kol-helper-xs text-fg-48 font-mono">
                  Saved experiments
                </div>
                <div className="kol-helper-xs text-fg-48">•</div>
                <div className="kol-helper-xs text-fg-48 font-mono">
                  Local storage
                </div>
                <div className="kol-helper-xs text-fg-48">•</div>
                <div className="kol-helper-xs text-fg-48 font-mono">
                  9 slot limit
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Research Goals */}
        <div className="rounded border border-fg-08 bg-surface-secondary p-6 space-y-4">
          <h2 className="kol-heading-s">Research Goals</h2>
          <ul className="kol-helper-s text-fg-64 space-y-2 list-disc pl-6">
            <li><strong>Performance:</strong> Compare CPU vs GPU rendering approaches across different effect types</li>
            <li><strong>Quality:</strong> Evaluate visual fidelity and smoothness of animations at different frame rates</li>
            <li><strong>Flexibility:</strong> Test parameter range and creative possibilities of each technique</li>
            <li><strong>Production Viability:</strong> Determine optimal approach for homepage video effect vs variable font animation</li>
            <li><strong>Thermal Management:</strong> Benchmark resource usage to prevent device overheating during development</li>
          </ul>
        </div>

        {/* Technical Stack */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="kol-helper-s accentYellow">SVG Filters</div>
            <div className="kol-helper-xs text-fg-64">
              feTurbulence, feDisplacementMap, GSAP AttrPlugin
            </div>
          </div>
          <div className="space-y-2">
            <div className="kol-helper-s accentYellow">GSAP</div>
            <div className="kol-helper-xs text-fg-64">
              Timeline animations, variable font axis, text morphing
            </div>
          </div>
          <div className="space-y-2">
            <div className="kol-helper-s accentYellow">PixiJS v8</div>
            <div className="kol-helper-xs text-fg-64">
              TilingSprite, WebGL rendering, displacement filters
            </div>
          </div>
        </div>
      </div>
    </DesPage>
  )
}
