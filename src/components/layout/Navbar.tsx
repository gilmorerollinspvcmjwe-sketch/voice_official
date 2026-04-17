/**
 * Navbar - 新设计系统导航栏
 * 固定顶部 + 滚动变色 + 金色 CTA
 */

import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Menu,
  X,
  ChevronDown,
  Globe,
  Phone,
  Bot,
  Building2,
  CreditCard,
  Play,
  BookOpen,
  Sparkles,
  Headphones,
} from 'lucide-react'
import { cn, getPathWithoutLocale, getLocalizedPath } from '@/utils'
import { Container } from '@/components/common'
import { useScrollPositionStore, useMobileMenuStore } from '@/stores'
import { GradientText } from '@/components/effects/GradientText'

const Navbar = () => {
  const { t, i18n } = useTranslation('common')
  const location = useLocation()
  const { isScrolled } = useScrollPositionStore()
  const { isOpen, setIsOpen, toggle } = useMobileMenuStore()

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      useScrollPositionStore.getState().setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname, setIsOpen])

  const navItems = [
    {
      label: t('nav.product'),
      href: '/product',
      icon: Bot,
      dropdown: [
        { label: t('nav.productOverview'), href: '/product' },
        { label: t('nav.features'), href: '/product/features' },
        { label: t('nav.technology'), href: '/product/technology' },
        { label: t('nav.security'), href: '/product/security' },
      ],
    },
    {
      label: t('nav.solutions'),
      href: '/solutions',
      icon: Building2,
      dropdown: [
        { label: t('nav.customerService'), href: '/solutions/customer-service' },
        { label: t('nav.sales'), href: '/solutions/sales' },
        { label: t('nav.collections'), href: '/solutions/collections' },
        { label: t('nav.survey'), href: '/solutions/survey' },
      ],
    },
    {
      label: t('nav.pricing'),
      href: '/pricing',
      icon: CreditCard,
    },
    {
      label: t('nav.demo'),
      href: '/demo',
      icon: Play,
      dropdown: [
        { label: t('nav.voiceDemo'), href: '/demo' },
        { label: t('nav.effects'), href: '/demo/effects' },
      ],
    },
    {
      label: t('nav.ttsDemo'),
      href: '/tts-demo',
      icon: Headphones,
    },
    {
      label: t('nav.docs'),
      href: '/docs',
      icon: BookOpen,
    },
    {
      label: t('nav.company'),
      href: '/company',
      icon: Building2,
      dropdown: [
        { label: t('nav.about'), href: '/company' },
        { label: t('nav.blog'), href: '/blog' },
        { label: t('nav.careers'), href: '/company/careers' },
        { label: t('nav.contact'), href: '/company/contact' },
      ],
    },
  ]

  const handleLanguageSwitch = (lang: string) => {
    i18n.changeLanguage(lang)
    localStorage.setItem('preferredLanguage', lang)
    const currentPath = location.pathname
    const cleanPath = getPathWithoutLocale(currentPath)
    const newPath = lang === 'en' ? `/en${cleanPath === '/' ? '' : cleanPath}` : `/${lang}${cleanPath === '/' ? '' : cleanPath}`
    window.location.href = newPath
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background-primary/95 backdrop-blur-md border-b border-border shadow-soft'
          : 'bg-transparent'
      )}
    >
      <Container>
        <nav className="flex items-center justify-between h-16 md:h-18 lg:h-20">
          {/* Logo */}
          <Link to={getLocalizedPath('/')} className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow"
            >
              <Phone className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-lg font-bold text-foreground-primary group-hover:text-primary-purple transition-colors">
              <GradientText metallic speed={5} className="text-lg">
                {t('brand.name', 'VoiceAgent')}
              </GradientText>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  to={getLocalizedPath(item.href)}
                  className={cn(
                    'flex items-center gap-1 px-4 py-2.5 rounded-lg text-body font-medium',
                    'transition-colors duration-200',
                    'text-foreground-secondary hover:text-foreground-primary hover:bg-background-hover',
                    location.pathname.includes(getPathWithoutLocale(item.href)) &&
                      'text-primary-purple bg-primary-purple/5'
                  )}
                >
                  {item.label}
                  {item.dropdown && <ChevronDown size={14} className="ml-1 opacity-60" />}
                </Link>

                {/* Dropdown */}
                {item.dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-2 w-56 py-2 bg-background-card rounded-xl shadow-elevated border border-border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  >
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.href}
                        to={getLocalizedPath(subItem.href)}
                        className="block px-4 py-2.5 text-body text-foreground-secondary hover:text-foreground-primary hover:bg-background-hover transition-colors"
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-3">
            {/* 拨打体验 */}
            <a
              href="tel:02131445977"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-background-hover transition-all duration-300 group whitespace-nowrap"
            >
              <Phone size={13} className="text-gold/50 group-hover:text-gold transition-colors" />
              <span className="text-caption font-mono text-foreground-muted group-hover:text-foreground-primary transition-colors">
                021-3144 5977
              </span>
            </a>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-background-card/50 border border-border">
              <Globe size={14} className="text-foreground-muted" />
              <button
                onClick={() => handleLanguageSwitch('en')}
                className={cn(
                  'px-2 py-1 text-caption rounded transition-colors',
                  i18n.language === 'en'
                    ? 'bg-primary-purple text-white'
                    : 'text-foreground-secondary hover:text-foreground-primary'
                )}
              >
                EN
              </button>
              <button
                onClick={() => handleLanguageSwitch('zh')}
                className={cn(
                  'px-2 py-1 text-caption rounded transition-colors',
                  i18n.language === 'zh'
                    ? 'bg-primary-purple text-white'
                    : 'text-foreground-secondary hover:text-foreground-primary'
                )}
              >
                中文
              </button>
            </div>

            {/* Auth buttons */}
            <Link
              to={getLocalizedPath('/login')}
              className="text-body font-medium text-foreground-secondary hover:text-foreground-primary transition-colors"
            >
              {t('nav.login')}
            </Link>
            <Link to={getLocalizedPath('/signup')}>
              <motion.button
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="px-5 py-2.5 bg-gradient-gold text-background-primary font-semibold rounded-xl shadow-gold hover:shadow-gold-lg transition-shadow text-body"
              >
                <Sparkles className="w-4 h-4 inline mr-1.5" />
                {t('nav.getStarted')}
              </motion.button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggle}
            className="lg:hidden p-2 rounded-lg hover:bg-background-hover transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} className="text-foreground-primary" /> : <Menu size={24} className="text-foreground-primary" />}
          </button>
        </nav>
      </Container>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background-primary border-b border-border"
          >
            <Container>
              <div className="py-4 space-y-2">
                {navItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      to={getLocalizedPath(item.href)}
                      className={cn(
                        'flex items-center gap-2 px-4 py-3 rounded-lg',
                        'text-body font-medium',
                        'hover:bg-background-hover',
                        location.pathname.includes(getPathWithoutLocale(item.href))
                          ? 'text-primary-purple bg-primary-purple/5'
                          : 'text-foreground-primary'
                      )}
                    >
                      {item.icon && <item.icon size={20} className="text-foreground-muted" />}
                      {item.label}
                    </Link>
                    {item.dropdown && (
                      <div className="ml-8 mt-1 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.href}
                            to={getLocalizedPath(subItem.href)}
                            className="block px-4 py-2 text-body-sm text-foreground-secondary hover:text-foreground-primary hover:bg-background-hover rounded-lg"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {/* Language switcher */}
                <div className="flex items-center gap-2 px-4 py-3">
                  <Globe size={20} className="text-foreground-muted" />
                  <button
                    onClick={() => handleLanguageSwitch('en')}
                    className={cn(
                      'px-3 py-2 text-body-sm rounded-lg transition-colors',
                      i18n.language === 'en'
                        ? 'bg-primary-purple text-white'
                        : 'bg-background-card text-foreground-primary hover:bg-background-hover'
                    )}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageSwitch('zh')}
                    className={cn(
                      'px-3 py-2 text-body-sm rounded-lg transition-colors',
                      i18n.language === 'zh'
                        ? 'bg-primary-purple text-white'
                        : 'bg-background-card text-foreground-primary hover:bg-background-hover'
                    )}
                  >
                    中文
                  </button>
                </div>

                {/* Auth buttons */}
                <div className="flex gap-3 px-4 pt-4">
                  <Link to={getLocalizedPath('/login')} className="w-1/2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-background-card border border-border text-foreground-primary font-medium rounded-xl"
                    >
                      {t('nav.login')}
                    </motion.button>
                  </Link>
                  <Link to={getLocalizedPath('/signup')} className="w-1/2">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-gold text-background-primary font-semibold rounded-xl shadow-gold"
                    >
                      {t('nav.getStarted')}
                    </motion.button>
                  </Link>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar