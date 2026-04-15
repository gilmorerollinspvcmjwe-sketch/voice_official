import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files
import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enProduct from './locales/en/product.json'
import enSolutions from './locales/en/solutions.json'
import enPricing from './locales/en/pricing.json'
import enDemo from './locales/en/demo.json'
import enDocs from './locales/en/docs.json'
import enCompany from './locales/en/company.json'
import enCustomers from './locales/en/customers.json'
import enLegal from './locales/en/legal.json'
import enTTSDemo from './locales/en/tts-demo.json'

import zhCommon from './locales/zh/common.json'
import zhHome from './locales/zh/home.json'
import zhProduct from './locales/zh/product.json'
import zhSolutions from './locales/zh/solutions.json'
import zhPricing from './locales/zh/pricing.json'
import zhDemo from './locales/zh/demo.json'
import zhDocs from './locales/zh/docs.json'
import zhCompany from './locales/zh/company.json'
import zhCustomers from './locales/zh/customers.json'
import zhLegal from './locales/zh/legal.json'
import zhTTSDemo from './locales/zh/tts-demo.json'

const resources = {
  en: {
    common: enCommon,
    home: enHome,
    product: enProduct,
    solutions: enSolutions,
    pricing: enPricing,
    demo: enDemo,
    docs: enDocs,
    company: enCompany,
    customers: enCustomers,
    legal: enLegal,
    ttsDemo: enTTSDemo,
  },
  zh: {
    common: zhCommon,
    home: zhHome,
    product: zhProduct,
    solutions: zhSolutions,
    pricing: zhPricing,
    demo: zhDemo,
    docs: zhDocs,
    company: zhCompany,
    customers: zhCustomers,
    legal: zhLegal,
    ttsDemo: zhTTSDemo,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'preferredLanguage',
    },

    interpolation: {
      escapeValue: false, // React already safes from XSS
    },

    react: {
      useSuspense: false,
    },
  })

export default i18n