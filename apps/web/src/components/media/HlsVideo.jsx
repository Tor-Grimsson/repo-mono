import { useEffect, useRef } from 'react'
import Hls from 'hls.js'

export default function HlsVideo({ src, poster, className, ...props }) {
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

  return (
    <video
      ref={videoRef}
      poster={poster}
      className={className}
      autoPlay
      loop
      muted
      playsInline
      {...props}
    />
  )
}
