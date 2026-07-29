function getEmbedUrl(url) {
  if (!url) return null
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/)
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`
  return null
}

const VideoBlock = ({ value }) => {
  const embedSrc = getEmbedUrl(value?.embedUrl)
  const videoUrl = value?.file?.asset?.url || value?.file?.url

  if (!embedSrc && !videoUrl) return null

  const posterUrl = value?.poster?.asset?.url || value?.poster?.url
  const autoplay = Boolean(value?.autoplay)
  const muted = autoplay ? true : Boolean(value?.muted)
  const controls = value?.controls !== false
  const loop = Boolean(value?.loop)

  return (
    <figure className="kol-prose-figure">
      {value?.label ? <div className="kol-caption-label">{value.label}</div> : null}
      <div className="border border-fg-08 rounded overflow-hidden aspect-[5/3]">
        {embedSrc ? (
          <iframe
            src={embedSrc}
            title={value?.label || value?.caption || 'Embedded video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        ) : (
          <video
            src={videoUrl}
            poster={posterUrl}
            aria-label={value?.label || value?.caption || 'Embedded video'}
            controls={controls}
            controlsList="nodownload noplaybackrate noremoteplayback"
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            disablePictureInPicture
            disableRemotePlayback
            playsInline
            className="w-full h-full object-cover"
          />
        )}
      </div>
      {value?.caption ? <figcaption className="kol-caption-text">{value.caption}</figcaption> : null}
    </figure>
  )
}

export default VideoBlock
