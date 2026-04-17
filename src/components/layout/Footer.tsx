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
        toggleActions: 'play none none none',
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

    // 安全兜底：2秒后强制显示
    const fallback = setTimeout(() => {
      if (brandRef.current) gsap.set(brandRef.current.children, { opacity: 1, y: 0 })
      if (navRef.current) gsap.set(navRef.current.children, { opacity: 1, y: 0 })
      if (bottomRef.current) gsap.set(bottomRef.current.children, { opacity: 1, y: 0 })
    }, 2000)

    return () => {
      clearTimeout(fallback)
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  const footerNav = {
    product: [
      { label: t('footer.product.overview', '产品概览'), href: '/product' },
      { label: t('footer.product.features', '功能特性'), href: '/product/features' },
      { label: t('footer.product.technology', '技术架构'), href: '/product/technology' },
      { label: t('footer.product.security', '安全合规'), href: '/product/security' },
    ],
    solutions: [
      { label: t('footer.solutions.customerService', '智能客服'), href: '/solutions/customer-service' },
      { label: t('footer.solutions.sales', '销售外呼'), href: '/solutions/sales' },
      { label: t('footer.solutions.collections', '催收提醒'), href: '/solutions/collections' },
      { label: t('footer.solutions.survey', '问卷回访'), href: '/solutions/survey' },
    ],
    cases: [
      { label: t('footer.cases.finance', '金融'), href: '/cases/finance' },
      { label: t('footer.cases.healthcare', '医疗'), href: '/cases/healthcare' },
      { label: t('footer.cases.ecommerce', '电商'), href: '/cases/ecommerce' },
      { label: t('footer.cases.manufacturing', '制造业'), href: '/cases/manufacturing' },
      { label: t('footer.cases.logistics', '交通物流'), href: '/cases/logistics' },
    ],
    support: [
      { label: t('footer.support.docs', '帮助文档'), href: '/docs' },
      { label: t('footer.support.api', 'API 参考'), href: '/docs/api' },
      { label: t('footer.support.developer', '开发者中心'), href: '/developer' },
      { label: t('footer.support.blog', '新闻资讯'), href: '/blog' },
    ],
    company: [
      { label: t('footer.company.about', '关于我们'), href: '/company/about' },
      { label: t('footer.company.careers', '加入我们'), href: '/company/careers' },
      { label: t('footer.company.partners', '合作伙伴'), href: '/company/partners' },
      { label: t('footer.company.contact', '联系我们'), href: '/company/contact' },
      { label: t('footer.company.privacy', '隐私政策'), href: '/legal/privacy' },
      { label: t('footer.company.terms', '服务条款'), href: '/legal/terms' },
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
        <div className="py-10 md:py-12">
          {/* 主体：左品牌区 | 右导航区 */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
            {/* 左侧品牌 + 热线 + 二维码 */}
            <div ref={brandRef} className="lg:w-[240px] flex-shrink-0 lg:pr-8 lg:border-r lg:border-border/40">
              <Link to={getLocalizedPath('/')} className="flex items-center gap-2 mb-3 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-8 h-8 rounded-lg bg-gradient-primary flex items-center justify-center"
                >
                  <Phone className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-base font-bold">
                  <GradientText metallic speed={5} className="text-base">
                    {t('brand.name')}
                  </GradientText>
                </span>
              </Link>
              <p className="text-body-sm text-foreground-secondary mb-4">
                {t('brand.tagline', 'Enterprise Voice Platform')}
              </p>

              {/* 售前/售后双热线 */}
              <div className="space-y-2 mb-4">
                <div>
                  <span className="text-[10px] text-foreground-muted">{t('footer.hotline.preSale', '售前产品咨询')}</span>
                  <a href="tel:02131445977" className="block text-base font-bold text-gold hover:text-gold/80 transition-colors font-mono">
                    021-3144 5977
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-foreground-muted">{t('footer.hotline.afterSale', '售后服务支持')}</span>
                  <a href="tel:02131445978" className="block text-base font-bold text-gold hover:text-gold/80 transition-colors font-mono">
                    021-3144 5978
                  </a>
                </div>
              </div>

              {/* 联系信息 */}
              <div className="space-y-1 mb-4">
                <a href="mailto:hello@voiceagent.ai" className="flex items-center gap-1.5 text-body-sm text-foreground-muted hover:text-foreground-primary transition-colors">
                  <Mail size={12} className="text-gold" /> hello@voiceagent.ai
                </a>
                <div className="flex items-center gap-1.5 text-body-sm text-foreground-muted">
                  <MapPin size={12} className="text-gold" /> {t('footer.address', '上海市浦东新区')}
                </div>
              </div>

              {/* 微信公众号 */}
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-background-card/30 border border-border/50">
                <div className="w-12 h-12 rounded bg-white/10 flex items-center justify-center text-[10px] text-foreground-muted flex-shrink-0">QR</div>
                <div>
                  <p className="text-[11px] text-foreground-primary font-medium">{t('footer.wechat.title', '微信公众号')}</p>
                  <p className="text-[10px] text-foreground-muted">{t('footer.wechat.desc', '获取最新动态')}</p>
                </div>
              </div>
            </div>

            {/* 右侧导航链接 */}
            <div ref={navRef} className="flex-1 lg:pl-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 gap-y-6">
                {Object.entries(footerNav).map(([key, items]) => (
                  <div key={key}>
                    <h4 className="text-body-sm font-semibold text-foreground-primary mb-2">
                      {t(`footer.${key}.title`, key)}
                    </h4>
                    <ul className="space-y-1">
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
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-border" />

          {/* Bottom section */}
          <div ref={bottomRef} className="flex flex-col md:flex-row items-center justify-between gap-3">
            {/* Copyright + 备案 */}
            <div className="text-caption text-foreground-muted text-center md:text-left">
              <p>© {new Date().getFullYear()} {t('brand.name')} · 沪ICP备XXXXXXXX号</p>
            </div>

            {/* Social + Compliance 合并一行 */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="p-2 rounded-lg bg-background-card/50 border border-border text-foreground-muted hover:text-foreground-primary hover:border-gold/30 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
              <div className="h-4 w-px bg-border/60" />
              {['SOC 2', 'GDPR', 'HIPAA'].map((badge) => (
                <span key={badge} className="px-1.5 py-0.5 text-[10px] text-foreground-muted bg-background-card/30 rounded">
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