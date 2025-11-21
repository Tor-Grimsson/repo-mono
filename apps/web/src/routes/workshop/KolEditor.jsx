import DesPage from '../../components/workshop/molecules/DesPage'

const KolEditor = () => {
  return (
    <div className="flex h-full flex-col space-y-10 px-4 pb-16 pt-10 sm:px-8 lg:px-12">
      <DesPage message="Kol Editor – Embedded editor kol-editor.vercel.app" />
      <div className="relative w-full flex-1">
        <div className="relative h-full min-h-[480px] overflow-hidden rounded border border-fg-08">
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
    </div>
  )
}

export default KolEditor
