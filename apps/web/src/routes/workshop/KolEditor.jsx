const KolEditor = () => {
  return (
    <div className="px-4" style={{ height: 'calc(100dvh - 64px)' }}>
      <div className="relative h-full w-full overflow-hidden rounded border border-fg-08">
        <iframe
          title="Kol Editor"
          src="https://kol-editor.vercel.app/"
          loading="lazy"
          className="absolute inset-0 h-full w-full"
          allowFullScreen
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  )
}

export default KolEditor
