import { useState } from 'react'
import { ToggleSwitch, Tooltip } from '@kolkrabbi/kol-component'
import { Asset } from '@kolkrabbi/kol-brand/svg'
import { Icon } from '@kolkrabbi/kol-icons'

const socials = [
  { icon: 'social-instagram-2', href: 'https://www.instagram.com/kolkrabbi_/', label: 'Instagram' },
  { icon: 'social-dribbble', href: 'https://dribbble.com/kolkrabbi', label: 'Dribbble' },
  { icon: 'social-behance', href: 'https://www.behance.net/kolkrabbi_', label: 'Behance' },
  { icon: 'social-youtube', href: 'https://www.youtube.com/@kolkrabbi', label: 'YouTube' },
  { icon: 'social-tiktok', href: 'https://www.tiktok.com/@kolkrabbi', label: 'TikTok' },
]

const VARIANTS = {
  xl: {
    width:          'w-[680px]',
    panel:          'h-60 p-6',
    panelMaxHeight: '240px',
    logo:           'h-20',
    text:           'kol-mono-16',
    iconSize:       24,
    iconContainer:  'w-8 h-8',
    iconGap:        'gap-2',
    togglePos:      'bottom-4 left-4',
  },
  lg: {
    width:          'w-[480px]',
    panel:          'h-44 p-5',
    panelMaxHeight: '176px',
    logo:           'h-14',
    text:           'kol-mono-14',
    iconSize:       20,
    iconContainer:  'w-7 h-7',
    iconGap:        'gap-1.5',
    togglePos:      'bottom-3 left-3',
  },
  'lg-h': {
    horizontal:     true,
    panelWidth:     'w-56',
    panelMaxWidth:  '320px',
    panel:          'p-4',
    logo:           'h-14',
    text:           'kol-mono-14',
    iconSize:       16,
    iconContainer:  'w-6 h-6',
    iconGap:        'gap-1.5',
    togglePos:      'bottom-3 left-3',
  },
  md: {
    width:          'w-[320px]',
    panel:          'h-32 p-4',
    panelMaxHeight: '128px',
    logo:           'h-10',
    text:           'kol-mono-12',
    iconSize:       16,
    iconContainer:  'w-6 h-6',
    iconGap:        'gap-1',
    togglePos:      'bottom-3 left-3',
  },
  sm: {
    width:          'w-[200px]',
    panel:          'h-24 p-3',
    panelMaxHeight: '96px',
    logo:           'h-7',
    text:           'kol-mono-10',
    iconSize:       12,
    iconContainer:  'w-5 h-5',
    iconGap:        'gap-1',
    togglePos:      'bottom-2 left-2',
  },
}

/**
 * ProfileCard — digital namecard.
 * Variants: xl (680px) | lg (480px) | md (320px) | sm (200px)
 */
export default function ProfileCard({
  image = 'https://b2.kolkrabbi.io/website/asset-library/studio/card-about/studio-about-1200.jpg',
  variant = 'xl',
  className = '',
}) {
  const [showInfo, setShowInfo] = useState(false)
  const v = VARIANTS[variant] ?? VARIANTS.xl

  if (v.horizontal) {
    return (
      <div
        /* the CARD owns the square; the photo fills its height and crops when
         * the panel opens, so the card never changes height (user 2026-08-27) */
        className={`flex flex-row w-full aspect-square rounded overflow-hidden ${className}`}
        style={{ boxShadow: '0 112px 192px -80px rgba(0,0,0,0.6)' }}
      >
        {/* Info panel — LEFT */}
        <div
          className={`bg-surface-inverse self-stretch ${v.panel} flex flex-col justify-between items-start overflow-hidden transition-all duration-300 ease-in-out`}
          style={{ maxWidth: showInfo ? '224px' : '0px', padding: showInfo ? undefined : '0px' }}
        >
          <Asset name="kol-lockup-vert" title="Kolkrabbi" className={`inline-flex ${v.logo} text-auto-inverse [&>svg]:h-full [&>svg]:w-auto`} />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-1.5 antialiased" style={{ lineHeight: 1 }}>
              <span className={`${v.text} text-auto-inverse`}>Tór Grímsson</span>
              <a
                href="mailto:hello@kolkrabbi.io"
                className={`${v.text} text-auto-inverse underline decoration-2 decoration-transparent hover:decoration-current transition-all`}
              >
                hello@kolkrabbi.io
              </a>
            </div>
            <div className={`flex flex-row ${v.iconGap}`}>
              {socials.map(({ icon, href, label }) => (
                <Tooltip key={icon} label={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className={`${v.iconContainer} flex items-center justify-center text-auto-inverse transition-transform hover:scale-125`}
                  >
                    <Icon name={icon} size={v.iconSize} />
                  </a>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>

        {/* Photo — RIGHT */}
        <div
          className="relative flex-1 min-w-0 h-full overflow-hidden bg-surface-secondary"
        >
          <img
            src={image}
            alt="Tór Grímsson — Kolkrabbi"
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
          <div className={`absolute ${v.togglePos}`}>
            <ToggleSwitch checked={showInfo} onChange={setShowInfo} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${v.width} rounded overflow-hidden ${className}`}
      style={{ boxShadow: '0 112px 192px -80px rgba(0,0,0,0.6)' }}
    >
      {/* Photo — square */}
      <div className="relative w-full aspect-square overflow-hidden bg-surface-secondary">
        <img
          src={image}
          alt="Tór Grímsson — Kolkrabbi"
          className="w-full h-full object-cover object-top"
          style={{}}
          loading="lazy"
        />
        <div className={`absolute ${v.togglePos}`}>
          <ToggleSwitch checked={showInfo} onChange={setShowInfo} />
        </div>
      </div>

      {/* Info panel */}
      <div
        className="bg-surface-inverse overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: showInfo ? v.panelMaxHeight : '0px' }}
      >
        <div className={`${v.panel} flex justify-between items-end`}>
          {/* Left: logo + contact */}
          <div className="self-stretch flex flex-col justify-between items-start">
            <Asset name="kol-lockup-vert" title="Kolkrabbi" className={`inline-flex ${v.logo} text-auto-inverse [&>svg]:h-full [&>svg]:w-auto`} />
            <div className="flex flex-col gap-1 antialiased" style={{ lineHeight: 1 }}>
              <span className={`${v.text} text-auto-inverse`}>Tór Grímsson</span>
              <a
                href="mailto:hello@kolkrabbi.io"
                className={`${v.text} text-auto-inverse underline decoration-2 decoration-transparent hover:decoration-current transition-all`}
              >
                hello@kolkrabbi.io
              </a>
            </div>
          </div>

          {/* Right: social icons */}
          <div className={`flex flex-col ${v.iconGap} items-start`}>
            {socials.map(({ icon, href, label }) => (
              <Tooltip key={icon} label={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`${v.iconContainer} flex items-center justify-center text-auto-inverse transition-transform hover:scale-125`}
                >
                  <Icon name={icon} size={v.iconSize} />
                </a>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
