import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslation from '../../locales/en/translation.json'
import esTranslation from '../../locales/es/translation.json'

export const LANGUAGE_STORAGE_KEY = 'memora.language'
export const supportedLanguages = ['es', 'en'] as const

export type AppLanguage = (typeof supportedLanguages)[number]

function getInitialLanguage(): AppLanguage {
  if (typeof window === 'undefined') {
    return 'es'
  }

  const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY)
  if (storedLanguage === 'es' || storedLanguage === 'en') {
    return storedLanguage
  }

  const browserLanguage = window.navigator.language.toLowerCase()
  return browserLanguage.startsWith('en') ? 'en' : 'es'
}

void i18n.use(initReactI18next).init({
  resources: {
    es: {
      translation: esTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
  lng: getInitialLanguage(),
  fallbackLng: 'es',
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
})

i18n.on('languageChanged', (language) => {
  if (typeof window === 'undefined') {
    return
  }

  if (language === 'es' || language === 'en') {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language)
  }
})

export default i18n
