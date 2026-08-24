import { Icon } from '@kolkrabbi/kol-icons'
import { Tooltip } from '@kolkrabbi/kol-component'

const socialLinks = [
  { name: 'social-instagram', href: 'https://www.instagram.com/kolkrabbi_/', label: 'Instagram' },
  { name: 'social-behance', href: 'https://www.behance.net/kolkrabbi_', label: 'Behance' },
  { name: 'social-dribbble', href: 'https://dribbble.com/kolkrabbi', label: 'Dribbble' },
  { name: 'social-youtube', href: 'https://www.youtube.com/@kolkrabbi-io', label: 'YouTube' },
  { name: 'social-tiktok', href: 'https://www.tiktok.com/@kolkrabbi_', label: 'TikTok' },
]

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative z-10 bg-surface-tertiary px-4 py-6 md:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <p className="kol-helper-12 uppercase">&copy; {new Date().getFullYear()} Kolkrabbi</p>
        <div className="flex items-center gap-4">
          {socialLinks.map(({ name, href, label }) => (
            <Tooltip key={name} label={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-auto opacity-60 hover:opacity-100 transition-opacity"
              >
                <Icon name={name} size={16} />
              </a>
            </Tooltip>
          ))}
        </div>
        <button
          type="button"
          onClick={scrollToTop}
          className="kol-helper-12 uppercase transition-opacity hover:opacity-70 cursor-pointer"
        >
          <span className="flex items-center gap-1">
            <span>↑</span>
            Back to top
          </span>
        </button>
      </div>
    </footer>
  )
}

export { Footer }
