/**
 * Footer - 新设计系统页脚
 * 深色主题 + 金色点缀
 *
 * 动画升级：
 * - GSAP ScrollTrigger 入场动画
 * - 错落显示效果
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Phone,
  Mail,
  MapPin,
  Twitter,
  Linkedin,
  Youtube,
  Github,
  ArrowRight,
} from 'lucide-react'
import { getLocalizedPath } from '@/utils'
import { Container } from '@/components/common'
import { GradientText } from '@/components/effects/GradientText'
import { motion } from 'framer-motion'

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger)

// 检测减弱动画偏好
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const Footer = () => {
  const { t } = useTranslation('common')
  const footerRef = useRef<HTMLDivElement>(null)
  const brandRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  // GSAP 入场动画
  useEffect(() => {
    if (prefersReducedMotion() || !footerRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse',
      },
    })

    // 品牌区入场
    if (brandRef.current) {
      tl.from(brandRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      })
    }

    // 导航列入场
    if (navRef.current) {
      tl.from(navRef.current.children, {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.3')
    }

    // 底部区入场
    if (bottomRef.current) {
      tl.from(bottomRef.current.children, {
        y: 10,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power1.out',
      }, '-=0.2')
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const footerNav = {
    product: [
      { label: t('footer.product.overview'), href: '/product' },
      { label: t('footer.product.features'), href: '/product/features' },
      { label: t('footer.product.technology'), href: '/product/technology' },
      { label: t('footer.product.security'), href: '/product/security' },
    ],
    solutions: [
      { label: t('footer.solutions.customerService'), href: '/solutions/customer-service' },
      { label: t('footer.solutions.sales'), href: '/solutions/sales' },
      { label: t('footer.solutions.collections'), href: '/solutions/collections' },
    ],
    resources: [
      { label: t('footer.resources.docs'), href: '/docs' },
      { label: t('footer.resources.api'), href: '/docs/api' },
      { label: t('footer.resources.blog'), href: '/blog' },
    ],
    company: [
      { label: t('footer.company.about'), href: '/company/about' },
      { label: t('footer.company.careers'), href: '/company/careers' },
      { label: t('footer.company.contact'), href: '/company/contact' },
    ],
    legal: [
      { label: t('footer.legal.privacy'), href: '/legal/privacy' },
      { label: t('footer.legal.terms'), href: '/legal/terms' },
      { label: t('footer.legal.gdpr'), href: '/legal/gdpr' },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
  ]

  return (
    <footer ref={footerRef} className="relative bg-background-primary border-t border-border overflow-hidden">
      {/* 背景光效 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary-purple/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <div className="py-12 md:py-16">
          {/* Top section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Brand column */}
            <div ref={brandRef} className="col-span-2 md:col-span-3 lg:col-span-2">
              <Link to={getLocalizedPath('/')} className="flex items-center gap-2 mb-4 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 text-white" />
                </motion.div>
                <span className="text-lg font-bold">
                  <GradientText metallic speed={5} className="text-lg">
                    {t('brand.name')}
                  </GradientText>
                </span>
              </Link>
              <p className="text-body text-foreground-secondary mb-6 max-w-xs">
                {t('brand.tagline', 'AI Voice Agent - 拟人化语音对话智能体平台')}
              </p>

              {/* Contact info */}
              <div className="space-y-3">
                <a
                  href="mailto:hello@voiceagent.ai"
                  className="flex items-center gap-2 text-body-sm text-foreground-muted hover:text-foreground-primary transition-colors"
                >
                  <Mail size={16} className="text-gold" />
                  hello@voiceagent.ai
                </a>
                <a
                  href="tel:+1800XXXXXX"
                  className="flex items-center gap-2 text-body-sm text-foreground-muted hover:text-foreground-primary transition-colors"
                >
                  <Phone size={16} className="text-gold" />
                  +1 (800) XXX-XXXX
                </a>
                <div className="flex items-center gap-2 text-body-sm text-foreground-muted">
                  <MapPin size={16} className="text-gold" />
                  San Francisco, CA
                </div>
              </div>

              {/* CTA */}
              <Link
                to={getLocalizedPath('/signup')}
                className="inline-flex items-center gap-2 mt-6 px-4 py-2 bg-gradient-gold/10 text-gold rounded-lg hover:bg-gradient-gold/20 transition-colors text-body-sm font-medium"
              >
                {t('footer.cta', '免费试用')}
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* Navigation columns */}
            <div ref={navRef} className="contents">
              {Object.entries(footerNav).map(([key, items]) => (
                <div key={key}>
                  <h4 className="text-subheading font-semibold text-foreground-primary mb-4 capitalize">
                    {t(`footer.${key}.title`, key)}
                  </h4>
                  <ul className="space-y-2">
                    {items.map((item) => (
                      <li key={item.href}>
                        <Link
                          to={getLocalizedPath(item.href)}
                          className="text-body-sm text-foreground-muted hover:text-foreground-primary transition-colors"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-8 border-t border-border" />

          {/* Bottom section */}
          <div ref={bottomRef} className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-caption text-foreground-muted">
              © {new Date().getFullYear()} {t('brand.name')}. {t('footer.copyright', '保留所有权利')}
            </p>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2.5 rounded-lg bg-background-card/50 border border-border text-foreground-muted hover:text-foreground-primary hover:border-gold/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>

            {/* Compliance badges */}
            <div className="flex items-center gap-2">
              {['SOC 2', 'GDPR', 'HIPAA'].map((badge) => (
                <span
                  key={badge}
                  className="px-2 py-1 text-caption text-foreground-muted bg-background-card/30 rounded"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer