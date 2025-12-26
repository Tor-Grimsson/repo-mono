import HlsVideo from '../../media/HlsVideo'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website'

const StudioHeroSimple = () => {
  const videoSrc = `${cdnBase}/hls-library/video-library/studio/hls/master.m3u8`
  const posterSrc = `${cdnBase}/asset-library/studio/studio-video-still/video-still-1600.jpg`

  return (
    <section className="w-full">
      {/* Hero Text */}
      <div className="max-w-[1400px] mx-auto px-6 pt-32 pb-16 text-center">
        <p className="kol-mono-sm uppercase text-auto opacity-60 mb-4">
          Kolkrabbi Vinnustofa
        </p>
        <h1 className="kol-heading-display text-auto">
          Modular Design Frameworks
        </h1>
      </div>

      {/* Video Carousel (1/1 for now) */}
      <div className="max-w-[1400px] mx-auto">
        <div className="relative w-full aspect-[16/9] rounded overflow-hidden border border-fg-08">
          <HlsVideo
            src={videoSrc}
            poster={posterSrc}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default StudioHeroSimple
