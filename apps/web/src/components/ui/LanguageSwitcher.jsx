import { LanguageToggle } from '@kol/ui'
import { useLanguage } from '../../contexts/LanguageContext'

const LanguageSwitcher = ({ className = '' }) => {
  const { language, setLanguage } = useLanguage()

  return (
    <LanguageToggle
      language={language}
      onLanguageChange={setLanguage}
      className={className}
    />
  )
}

export default LanguageSwitcher
