import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

export default function HlsVideo({ src, poster, className, onEnded, ...props }) {
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
      // Safari native HLS support
      video.src = src
    }
  }, [src])

  /**
   * IMPORTANT: This video component is for background/decorative videos ONLY.
   * ALL user interactions must be disabled - no controls, no PiP, no context menu,
   * no download, no fullscreen, no remote playback. The video should be completely
   * non-interactive across all devices (mobile to desktop).
   * DO NOT remove these attributes without explicit approval.
   */
  return (
    <video
      ref={videoRef}
      poster={poster}
      aria-hidden="true"
      className={className}
      style={{ pointerEvents: 'none' }}
      autoPlay
      loop={!onEnded}
      muted
      onEnded={onEnded}
      playsInline
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      controlsList="nodownload nofullscreen noremoteplayback"
      onContextMenu={(e) => e.preventDefault()}
      {...props}
    />
  )
}
