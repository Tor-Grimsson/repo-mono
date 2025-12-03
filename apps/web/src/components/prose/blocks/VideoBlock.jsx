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
      <div className="overflow-hidden rounded border border-fg-08 bg-black">
        <video
          src={videoUrl}
          poster={posterUrl}
          controls={controls}
          autoPlay={autoplay}
          loop={loop}
          muted={muted}
          playsInline
          className="w-full"
        />
      </div>
      {value?.caption ? <figcaption className="kol-caption-text">{value.caption}</figcaption> : null}
    </figure>
  )
}

export default VideoBlock
