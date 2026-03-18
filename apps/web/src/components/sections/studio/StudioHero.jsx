import { Button } from '@kol/ui'
import { Link } from 'react-router-dom'
import HlsVideo from '../../media/HlsVideo'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website'

const StudioHero = () => {
  return (
    <section className="relative w-full h-[calc(100vh-3.5rem)] md:h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background Video (HLS) */}
      <HlsVideo
        src={`${cdnBase}/hls-library/video-library/studio/hls/master.m3u8`}
        poster={`${cdnBase}/asset-library/studio/studio-video-still/video-still-1200.jpg`}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Text overlay */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="flex flex-col items-center text-center gap-4 md:gap-6 px-6 py-8 rounded-[2px]" style={{ backgroundColor: 'color-mix(in srgb, var(--kol-surface-primary) 80%, transparent)', backdropFilter: 'blur(1px)' }}>
          <p className="kol-mono-xs text-fg-64 tracking-[0.5px] uppercase">Kolkrabbi</p>
          <h1 className="kol-heading-xl md:kol-display-md text-auto">Studio & Atelier</h1>
          <p className="kol-mono-sm text-auto opacity-80 max-w-[480px]">
            Brand identity, visual systems, illustration, UI/UX, and type design.
          </p>
          <Link to="/work">
            <Button variant="primary" size="sm">View Work</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default StudioHero
