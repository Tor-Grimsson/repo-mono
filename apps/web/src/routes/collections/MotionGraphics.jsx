import { useState, useEffect, useRef } from 'react'
import { Pill } from '@kol/ui'

// Simple Video Thumbnail with Hover Preview
const VideoThumbnail = ({ videoUrl, thumbnailUrl, alt }) => {
  const videoRef = useRef(null)

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.error('Error playing video:', err))
    }
  }

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  return (
    <video
      ref={videoRef}
      src={videoUrl}
      poster={thumbnailUrl}
      muted
      loop
      playsInline
      preload="metadata"
      className="w-full h-full object-cover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  )
}

// Video Player Component
const VideoPlayer = ({ video, onClose }) => {
  if (!video) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-8 overflow-y-auto" onClick={onClose}>
      <div className="max-w-[1200px] w-full bg-container-primary rounded-lg my-8" onClick={(e) => e.stopPropagation()}>
        {/* Video */}
        <div className="relative aspect-video bg-surface-secondary">
          {video.videoUrl ? (
            <video
              className="w-full h-full object-cover"
              controls
              autoPlay
              src={video.videoUrl}
            >
              Your browser does not support the video tag.
            </video>
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
                className="ml-auto kol-mono-xs text-fg-64 hover:text-auto transition-colors"
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

  // Placeholder video data - replace with actual data
  const videos = [
    {
      id: 1,
      title: 'Geometric Patterns',
      subtitle: 'Procedural animation study',
      description: 'Exploration of geometric patterns using noise and feedback loops.',
      thumbnailUrl: null,
      videoUrl: '/videos/video-4.mp4',
      touchDesigner: {
        patchName: 'geometric_patterns_v01.toe',
        version: '2023.11880',
        resolution: '1920x1080',
        fps: '60',
        operators: ['Noise TOP', 'Feedback TOP', 'Displace TOP', 'Composite TOP'],
        notes: 'Uses feedback loop with displacement for organic movement'
      }
    },
    {
      id: 2,
      title: 'Fluid Dynamics',
      subtitle: 'Real-time fluid simulation',
      description: 'Real-time fluid dynamics simulation with particle systems.',
      thumbnailUrl: null,
      videoUrl: '/videos/videofeat-1.mp4',
      touchDesigner: {
        patchName: 'fluid_sim_v02.toe',
        version: '2023.11880',
        resolution: '1920x1080',
        fps: '60',
        operators: ['Particle SOP', 'Fluid Force', 'Point SOP', 'Render TOP'],
        notes: 'GPU-accelerated particle simulation with custom forces'
      }
    },
    {
      id: 3,
      title: 'Abstract Forms',
      subtitle: 'Morphing shapes',
      description: 'Abstract morphing forms driven by audio reactivity.',
      thumbnailUrl: null,
      videoUrl: '/videos/videofeat-4.mp4',
      touchDesigner: null
    },
    {
      id: 4,
      title: 'Shader Experiments',
      subtitle: 'GLSL studies',
      description: 'Collection of custom GLSL shader experiments.',
      thumbnailUrl: null,
      videoUrl: null,
      touchDesigner: null
    },
    {
      id: 5,
      title: 'Particle Systems',
      subtitle: 'Dynamic particles',
      description: 'Complex particle system with multiple attractors.',
      thumbnailUrl: null,
      videoUrl: null,
      touchDesigner: null
    },
    {
      id: 6,
      title: 'Data Visualization',
      subtitle: 'Information design',
      description: 'Animated data visualization exploring complex datasets.',
      thumbnailUrl: null,
      videoUrl: null,
      touchDesigner: null
    },
    {
      id: 7,
      title: 'Generative Art',
      subtitle: 'Algorithmic composition',
      description: 'Generative art piece using algorithmic composition.',
      thumbnailUrl: null,
      videoUrl: null,
      touchDesigner: null
    },
    {
      id: 8,
      title: 'Kinetic Typography',
      subtitle: 'Text in motion',
      description: 'Kinetic typography exploring type as moving image.',
      thumbnailUrl: null,
      videoUrl: null,
      touchDesigner: null
    },
    {
      id: 9,
      title: 'Audio Reactive',
      subtitle: 'Sound visualization',
      description: 'Audio reactive visuals responding to music frequency data.',
      thumbnailUrl: null,
      videoUrl: null,
      touchDesigner: null
    }
  ]

  return (
    <>
      <main className="min-h-screen w-full bg-surface-primary">
        {/* Header */}
        <section className="w-full px-8 pt-24 pb-16 mt-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="space-y-4">
              <Pill variant="inverse">Motion Graphics</Pill>
              <h1 className="kol-display-lg text-auto">Motion Graphics Collection</h1>
              <p className="kol-mono-text text-fg-64 max-w-[700px]">
                Experimental motion graphics, generative animations, and Touch Designer explorations.
              </p>
            </div>
          </div>
        </section>

        {/* Video Grid */}
        <section className="w-full px-8 pb-24">
          <div className="max-w-[1400px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group bg-container-primary rounded-sm overflow-hidden hover:ring-2 hover:ring-fg-24 transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-surface-secondary flex items-center justify-center overflow-hidden">
                    {video.videoUrl ? (
                      <VideoThumbnail
                        videoUrl={video.videoUrl}
                        thumbnailUrl={video.thumbnailUrl}
                        alt={video.title}
                      />
                    ) : video.thumbnailUrl ? (
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-fg-24 kol-mono-text">▶</div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors pointer-events-none" />
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-2 text-left">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="kol-heading-sm text-auto">{video.title}</h3>
                      {video.touchDesigner && (
                        <Pill variant="subtle" size="sm">TD</Pill>
                      )}
                    </div>
                    {video.subtitle && (
                      <p className="kol-mono-xs text-fg-64">{video.subtitle}</p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>
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
