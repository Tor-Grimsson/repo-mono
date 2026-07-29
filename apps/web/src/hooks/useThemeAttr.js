import { useEffect, useState } from 'react'

const read = () => {
  const attr = document.documentElement.dataset.theme
  if (attr === 'light' || attr === 'dark') return attr
  return window.matchMedia?.('(prefers-color-scheme: dark)')?.matches ? 'dark' : 'light'
}

/**
 * Reactive view of the page's EFFECTIVE theme: the app-set `data-theme`
 * attribute, else the OS preference. Read-only — never writes DOM or storage;
 * the kol-framework ThemeToggle owns the writing side. Replaces the elder
 * @kol/ui useTheme, whose hardcoded 'dark' fallback could disagree with the
 * rendered page (the wrong-hero-video bug).
 */
export function useThemeAttr() {
  const [theme, setTheme] = useState(read)

  useEffect(() => {
    const mo = new MutationObserver(() => setTheme(read()))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)')
    const onMq = () => setTheme(read())
    mq?.addEventListener?.('change', onMq)
    return () => {
      mo.disconnect()
      mq?.removeEventListener?.('change', onMq)
    }
  }, [])

  return theme
}
