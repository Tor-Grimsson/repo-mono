const VideoBlock = ({ value }) => {
  const videoUrl = value?.file?.asset?.url || value?.file?.url
  if (!videoUrl) return null

  const posterUrl = value?.poster?.asset?.url || value?.poster?.url
  const autoplay = Boolean(value?.autoplay)
  const muted = autoplay ? true : Boolean(value?.muted)
  const controls = value?.controls !== false
  const loop = Boolean(value?.loop)

  return (
    <figure className="kol-prose-figure">
      {value?.label ? <div className="kol-caption-label">{value.label}</div> : null}
      <div className="border border-fg-08 rounded overflow-hidden aspect-video">
        <video
          src={videoUrl}
          poster={posterUrl}
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
      </div>
      {value?.caption ? <figcaption className="kol-caption-text">{value.caption}</figcaption> : null}
    </figure>
  )
}

export default VideoBlock
