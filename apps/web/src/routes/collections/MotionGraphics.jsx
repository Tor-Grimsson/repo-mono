import { useState, useRef, useMemo, useEffect } from 'react'
import Hls from 'hls.js'
import SEO from '../../components/layout/SEO'
import { Pill, CollectionCard, CollectionFilters, OverviewHero, FoundryCTA, useTheme } from '@kol/ui'
import motionGraphics from '../../data/motion-graphics'
import FeaturesCardSection from '../../components/sections/shared/FeaturesCardSection'

const cdnBase = 'https://f005.backblazeb2.com/file/kolkrabbi/website/asset-library/collections/collection-overview/ql-card'

// HLS Video Thumbnail with Hover Preview
const VideoThumbnail = ({ videoUrl, thumbnailUrl, alt, isHovered }) => {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)

  // Initialize HLS
  useEffect(() => {
    const video = videoRef.current
    if (!video || !videoUrl) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(videoUrl)
      hls.attachMedia(video)
      hlsRef.current = hls
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoUrl
    }
  }, [videoUrl])

  // Play/pause based on isHovered prop
  useEffect(() => {
    if (videoRef.current) {
      if (isHovered) {
        videoRef.current.play().catch(err => console.error('Error playing video:', err))
      } else {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
    }
  }, [isHovered])

  return (
    <video
      ref={videoRef}
      poster={thumbnailUrl}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-full object-cover"
      style={{ pointerEvents: 'none' }}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
    />
  )
}

// HLS Video Player for Modal (non-interactive, autoplay)
const HlsPlayer = ({ src, poster, className }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
      video.play().catch(() => {})
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      style={{ pointerEvents: 'none' }}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
    />
  )
}

// HLS Featured Video (background, non-interactive)
const HlsFeaturedVideo = ({ src, poster, className = "absolute left-0 top-0 size-full object-cover object-center" }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !src) return

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = src
    }
  }, [src])

  return (
    <video
      ref={videoRef}
      poster={poster}
      autoPlay
      loop
      muted
      playsInline
      className={className}
      style={{ pointerEvents: 'none' }}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
    />
  )
}

// Video Player Component
const VideoPlayer = ({ video, onClose }) => {
  if (!video) return null

  return (
    <div className="fixed inset-0 z-[100] bg-surface-primary/90 flex items-center justify-center p-8 overflow-y-auto" onClick={onClose}>
      <div className="max-w-[1200px] w-full bg-container-primary rounded-lg my-8" onClick={(e) => e.stopPropagation()}>
        {/* Video */}
        <div className="relative aspect-video bg-surface-secondary">
          {video.videoUrl ? (
            <HlsPlayer
              src={video.videoUrl}
              poster={video.thumbnailUrl}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-fg-64 kol-mono-text">
              Video Placeholder
            </div>
          )}
        </div>

        {/* Metadata */}
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h2 className="kol-heading-lg text-auto">{video.title}</h2>
              <button
                onClick={onClose}
                className="ml-auto kol-mono-xs text-fg-64 hover:text-auto transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-auto"
              >
                Close ✕
              </button>
            </div>
            {video.subtitle && (
              <p className="kol-mono-text text-fg-64">{video.subtitle}</p>
            )}
          </div>

          {/* Description */}
          {video.description && (
            <div className="space-y-2">
              <h3 className="kol-label-mono-xs text-auto uppercase">Description</h3>
              <p className="kol-mono-sm text-fg-64">{video.description}</p>
            </div>
          )}

          {/* Touch Designer Patch Info */}
          {video.touchDesigner && (
            <div className="space-y-3 pt-4 border-t border-fg-08">
              <div className="flex items-center gap-2">
                <h3 className="kol-label-mono-xs text-auto uppercase">Touch Designer Patch</h3>
                <Pill variant="subtle" size="sm">TD</Pill>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {video.touchDesigner.patchName && (
                  <div className="space-y-1">
                    <span className="kol-mono-xs text-fg-64">Patch Name</span>
                    <p className="kol-mono-sm text-auto">{video.touchDesigner.patchName}</p>
                  </div>
                )}

                {video.touchDesigner.version && (
                  <div className="space-y-1">
                    <span className="kol-mono-xs text-fg-64">TD Version</span>
                    <p className="kol-mono-sm text-auto">{video.touchDesigner.version}</p>
                  </div>
                )}

                {video.touchDesigner.resolution && (
                  <div className="space-y-1">
                    <span className="kol-mono-xs text-fg-64">Resolution</span>
                    <p className="kol-mono-sm text-auto">{video.touchDesigner.resolution}</p>
                  </div>
                )}

                {video.touchDesigner.fps && (
                  <div className="space-y-1">
                    <span className="kol-mono-xs text-fg-64">Frame Rate</span>
                    <p className="kol-mono-sm text-auto">{video.touchDesigner.fps}</p>
                  </div>
                )}
              </div>

              {video.touchDesigner.operators && video.touchDesigner.operators.length > 0 && (
                <div className="space-y-2">
                  <span className="kol-mono-xs text-fg-64">Key Operators</span>
                  <div className="flex flex-wrap gap-2">
                    {video.touchDesigner.operators.map((op, idx) => (
                      <Pill key={idx} variant="subtle" size="sm">{op}</Pill>
                    ))}
                  </div>
                </div>
              )}

              {video.touchDesigner.notes && (
                <div className="space-y-1">
                  <span className="kol-mono-xs text-fg-64">Notes</span>
                  <p className="kol-mono-sm text-fg-64">{video.touchDesigner.notes}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const MotionGraphics = () => {
  const [selectedVideo, setSelectedVideo] = useState(null)
  const [filters, setFilters] = useState(new Set())
  const { theme } = useTheme()
  const variant = theme === 'dark' ? 'dark' : 'light'

  const quickLinkFeatures = [
    {
      title: 'Illustrations',
      description: 'Illustration portfolio',
      href: '/collections/illustrations',
      visual: (
        <div className="w-full aspect-[4/3] flex items-center justify-center p-4">
          <img src={`${cdnBase}/ql-illustration/ql-${variant}/ql-${variant}.svg`} alt="Illustrations" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      title: 'Grids',
      description: 'Modular grid systems',
      href: '/collections/grids',
      visual: (
        <div className="w-full aspect-[4/3] flex items-center justify-center p-4">
          <img src={`${cdnBase}/ql-grid/ql-${variant}/ql-${variant}.svg`} alt="Grids" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      title: 'Motion Graphics',
      description: 'Motion graphics lab',
      href: '/collections/motion-graphics',
      visual: (
        <div className="w-full aspect-[4/3] flex items-center justify-center p-4">
          <img src={`${cdnBase}/ql-motion-graphics/ql-${variant}/ql-${variant}.svg`} alt="Motion Graphics" className="w-full h-full object-contain" />
        </div>
      )
    },
    {
      title: 'Logomarks',
      description: 'Logomark design gallery',
      href: '/collections/logomarks',
      visual: (
        <div className="w-full aspect-[4/3] flex items-center justify-center p-4">
          <img src={`${cdnBase}/ql-logomark/ql-${variant}/ql-${variant}.svg`} alt="Logomarks" className="w-full h-full object-contain" />
        </div>
      )
    }
  ]

  const filteredVideos = useMemo(() => {
    if (filters.size === 0) return motionGraphics

    return motionGraphics.filter((video) => {
      return Array.from(filters).some((filterKey) => {
        const [filterType, filterValue] = filterKey.split(':')
        return video[filterType] === filterValue
      })
    })
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  return (
    <>
      <SEO
        title="Motion Graphics — Kolkrabbi Collections"
        description="Discover animated design work and motion graphics showcasing dynamic visual storytelling and experimental animation."
        ogTitle="Motion Graphics Portfolio"
        ogDescription="Animated design work and dynamic visual storytelling"
        ogImage="https://kolkrabbi.io/img/open-graph/open-graph-03.png"
        ogUrl="https://kolkrabbi.io/collections/motion-graphics"
        canonical="https://kolkrabbi.io/collections/motion-graphics"
      />
      <main className="min-h-screen w-full bg-surface-primary mb-16">
        <OverviewHero
          badge="Motion Graphics"
          title="Motion Graphics Collection"
          description="Experimental motion graphics, generative animations, and Touch Designer explorations."
          variant="left"
        />

        {/* Featured Video */}
        <section className="w-full">
          <div className="max-w-[1400px] mx-auto">
            <div className="relative w-full h-[440px] md:h-[640px] rounded overflow-hidden bg-container-primary">
              <HlsFeaturedVideo
                src={motionGraphics.find(v => v.id === 4)?.videoUrl}
                poster={motionGraphics.find(v => v.id === 4)?.thumbnailUrl}
              />
            </div>
          </div>
        </section>

        {/* Video Grid Section */}
        <div className="py-6 md:py-8 flex flex-col gap-8">
          <div className="w-full max-w-[1400px] mx-auto">
            <div className="py-16">

              {/* Filters */}
              <div className="mb-8">
                <CollectionFilters
                  logomarks={motionGraphics}
                  onFilterChange={handleFilterChange}
                  collections={[]}
                  totalCount={motionGraphics.length}
                  showCollectionCategories={false}
                  collectionTitle="Motion Graphics Collection"
                />
              </div>

              {/* Grid */}
              <div>
                {filteredVideos.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                      <CollectionCard
                        key={video.id}
                        item={video}
                        type="video"
                        onClick={() => setSelectedVideo(video)}
                        backgroundColor="bg-surface-secondary"
                        renderPreview={(item, isHovered) => (
                          item.videoUrl ? (
                            <VideoThumbnail
                              videoUrl={item.videoUrl}
                              thumbnailUrl={item.thumbnailUrl}
                              alt={item.title}
                              isHovered={isHovered}
                            />
                          ) : item.thumbnailUrl ? (
                            <img
                              src={item.thumbnailUrl}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : null
                        )}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="kol-mono-sm-fine py-16">
                    <p className="kol-mono-sm-fine mb-4">No motion graphics match your current filters</p>
                    <button
                      onClick={() => setFilters(new Set())}
                      className="kol-mono-sm-fine underline hover:no-underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-auto"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>

              {/* Explore Collections */}
              <div className="pt-24">
                <FeaturesCardSection
                  showHeader={true}
                  headerClassName="w-full"
                  headerTextWidthClass="w-full md:w-[50%]"
                  headerLabel="Explore Collections"
                  headerDescription="Jump into each collection"
                  cardsWrapperClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  features={quickLinkFeatures}
                  showActions={false}
                  sectionClassName="w-full"
                  wrapperClassName="w-full flex flex-col gap-8"
                />
              </div>

            </div>
          </div>
        </div>

        <FoundryCTA
          heading="Explore More Work"
          description="Portfolio of design work, including client projects and experimental explorations."
          action={{
            to: '/work',
            label: 'View Portfolio'
          }}
        />
      </main>

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayer
          video={selectedVideo}
          onClose={() => setSelectedVideo(null)}
        />
      )}
    </>
  )
}

export default MotionGraphics
