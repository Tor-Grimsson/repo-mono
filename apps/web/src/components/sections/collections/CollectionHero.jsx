import { SectionLabel } from '@kol/ui'

export default function CollectionHero() {
  return (
    <div className="relative h-dvh flex flex-col justify-end overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-secondary via-surface-tertiary to-surface-secondary opacity-95" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 p-12 flex flex-col gap-2">
        <SectionLabel text="Collection" />
        <h1 className="kol-heading-display">
          / logomarks
        </h1>
      </div>
    </div>
  )
}
