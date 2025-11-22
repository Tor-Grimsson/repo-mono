const ApparatusRadialEditor = () => {
  return (
    <div className="flex h-full flex-col">
      <div className="relative w-full flex-1">
        <div className="relative h-full min-h-[480px] overflow-hidden">
          <iframe
            title="Radial Editor"
            src="https://kol-radial.vercel.app/"
            loading="lazy"
            className="absolute inset-0 h-full w-full"
            allowFullScreen
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </div>
  )
}

export default ApparatusRadialEditor
