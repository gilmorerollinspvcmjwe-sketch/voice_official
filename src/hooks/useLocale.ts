import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useEffect, useRef } from 'react'

const SUPPORTED_LOCALES = ['en', 'zh'] as const
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]
const DEFAULT_LOCALE: SupportedLocale = 'en'

export function isValidLocale(locale: string | undefined): locale is SupportedLocale {
  return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}

/**
 * Hook that syncs URL locale with i18n language.
 * Call this at the top of every page component.
 */
export function useLocale(): SupportedLocale {
  const { locale } = useParams<{ locale: string }>()
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const applied = useRef(false)

  useEffect(() => {
    const targetLocale = isValidLocale(locale) ? locale : DEFAULT_LOCALE

    // Sync i18n
    if (i18n.language !== targetLocale) {
      i18n.changeLanguage(targetLocale)
    }

    // Redirect if no locale in URL (canonical /en/*)
    if (!isValidLocale(locale) && applied.current === false) {
      applied.current = true
      const path = location.pathname
      const newPath = path === '/' ? '/en' : `/en${path}`
      navigate(newPath, { replace: true })
    }
  }, [locale, i18n, navigate, location.pathname])

  return isValidLocale(locale) ? locale : DEFAULT_LOCALE
}

/**
 * Get path without locale prefix
 */
export function getPathWithoutLocale(path: string): string {
  return path.replace(/^\/(en|zh)(\/|$)/, '/').replace(/^$/, '/')
}

/**
 * Build a localized path
 */
export function getLocalizedPath(path: string, locale: string): string {
  const clean = getPathWithoutLocale(path)
  if (locale === 'en') return clean === '/' ? '/en' : `/en${clean === '/' ? '' : clean}`
  return clean === '/' ? '/zh' : `/zh${clean === '/' ? '' : clean}`
}
