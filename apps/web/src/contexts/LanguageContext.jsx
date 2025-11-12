import { createContext, useContext, useState, useEffect } from 'react'

const LanguageContext = createContext()

const translations = {
  en: null,
  is: null
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState(() => {
    // Try to get from localStorage first
    const stored = localStorage.getItem('kol-language')
    if (stored && (stored === 'en' || stored === 'is')) {
      return stored
    }
    // Default to English
    return 'en'
  })

  const [locales, setLocales] = useState({ en: {}, is: {} })

  // Load translation files
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enModule, isModule] = await Promise.all([
          import('../locales/en.json'),
          import('../locales/is.json')
        ])
        setLocales({
          en: enModule.default,
          is: isModule.default
        })
      } catch (error) {
        console.error('Failed to load translations:', error)
      }
    }
    loadTranslations()
  }, [])

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'is') {
      setLanguageState(lang)
      localStorage.setItem('kol-language', lang)
    }
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = locales[language]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
