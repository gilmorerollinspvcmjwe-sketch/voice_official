/**
 * PricingSection - 定价展示
 * 三栏定价对比 + 金色推荐方案
 *
 * 动画升级：
 * - ElectricBorder 电光边框（CTA按钮）
 * - GSAP ScrollTrigger 卡片入场
 * - Hover 交互增强
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Check, ArrowRight, Sparkles } from 'lucide-react'
import { Container, Button } from '@/components/common'
import { GradientText } from '@/components/effects/GradientText'
import { CTAButton } from '@/components/effects'
import { getLocalizedPath } from '@/utils'

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger)

// 检测减弱动画偏好
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

interface PricingPlan {
  id: string
  name: { en: string; zh: string }
  price: string
  period: string
  description: { en: string; zh: string }
  features: { en: string[]; zh: string[] }
  cta: { en: string; zh: string }
  variant: 'default' | 'popular' | 'enterprise'
  badge?: { en: string; zh: string }
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'cloud',
    name: { en: 'Cloud', zh: '云端版' },
    price: '',
    period: '',
    description: { en: 'SaaS hosted, pay per minute, get started fast', zh: 'SaaS 托管，按分钟计费，快速上线' },
    features: {
      en: [
        'Inbound & outbound at unified rate',
        'LLM + TTS + ASR included',
        'Telecom charges billed separately',
        'Advanced voice models',
        'Custom voice tones',
        'Full API access',
        'Data analytics reports',
        'Multi-scenario templates',
        'Priority technical support',
      ],
      zh: [
        '呼入/外呼统一计费',
        '已含 LLM + TTS + ASR 费用',
        '话费由运营商单独结算',
        '高级语音模型',
        '自定义音色',
        '完整 API 访问',
        '数据分析报表',
        '多场景模板',
        '优先技术支持',
      ],
    },
    cta: { en: 'Contact Sales', zh: '联系销售' },
    variant: 'popular',
    badge: { en: 'Recommended', zh: '推荐' },
  },
  {
    id: 'private',
    name: { en: 'Private Deployment', zh: '私有化部署' },
    price: '',
    period: '',
    description: { en: 'Deploy on your own servers, full data control', zh: '部署在客户自有服务器，数据完全可控' },
    features: {
      en: [
        'All Cloud features included',
        'Private cloud / on-premise deployment',
        'Annual license',
        'SLA guarantee',
        '7x24 dedicated support',
        'Dedicated account manager',
        'Custom development',
        'Security compliance audit',
        'Data isolation & sovereignty',
      ],
      zh: [
        '包含云端版全部功能',
        '私有云/本地化部署',
        '年度授权费',
        'SLA 保障',
        '7x24 专属技术支持',
        '专属客户经理',
        '定制化开发',
        '安全合规审计',
        '数据隔离与主权',
      ],
    },
    cta: { en: 'Contact Sales', zh: '联系销售' },
    variant: 'enterprise',
  },
]

const PricingSection = () => {
  const { t, i18n } = useTranslation('pricing')
  const currentLocale = i18n.language === 'zh' ? 'zh' : 'en'
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  // GSAP 滚动触发动画
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })

      // 标题入场
      if (headerRef.current) {
        tl.from(headerRef.current.children, {
          y: 30,
          opacity: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power4.out',
        })
      }

      // 卡片错落入场
      if (cardsRef.current.length > 0) {
        tl.from(cardsRef.current, {
          y: 40,
          opacity: 0,
          stagger: 0.2,
          duration: 0.6,
          ease: 'power2.out',
        }, '-=0.3')
      }
    }, sectionRef)

    // 安全兜底：2秒后如果卡片仍不可见，强制显示
    const fallbackTimer = setTimeout(() => {
      if (headerRef.current) {
        gsap.set(headerRef.current.children, { opacity: 1, y: 0 })
      }
      if (cardsRef.current.length > 0) {
        gsap.set(cardsRef.current, { opacity: 1, y: 0 })
      }
    }, 2000)

    return () => {
      clearTimeout(fallbackTimer)
      ctx.revert()
    }
  }, [])

  const getCardStyles = (variant: string) => {
    switch (variant) {
      case 'popular':
        return 'bg-background-card border-2 border-gold shadow-gold/20 relative'
      case 'enterprise':
        return 'bg-background-elevated border border-border-light'
      default:
        return 'bg-background-card border border-border'
    }
  }

  const getPriceStyles = (variant: string) => {
    switch (variant) {
      case 'popular':
        return 'bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent'
      case 'enterprise':
        return 'text-foreground-primary'
      default:
        return 'text-foreground-primary'
    }
  }

  return (
    <section ref={sectionRef} className="relative py-16 bg-background-primary overflow-hidden">
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-purple/5 rounded-full blur-3xl" />

      <Container className="relative">
        {/* Header */}
        <div ref={headerRef} className="section-header">
          <h2 className="section-title">
            <GradientText metallic direction="diagonal" speed={4}>
              {t('title', 'Simple and Transparent Pricing')}
            </GradientText>
          </h2>
          <p className="section-subtitle">
            {t('subtitle', 'Pay only for actual call minutes used')}
          </p>
        </div>

        {/* 免费体验入口 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 max-w-3xl mx-auto"
        >
          <div className="bg-gradient-to-r from-accent-lime/10 to-gold/10 border border-accent-lime/30 rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-body-lg font-semibold text-foreground-primary">
                {currentLocale === 'zh' ? '免费体验' : 'Free Trial'}
              </p>
              <p className="text-body-sm text-foreground-secondary">
                {currentLocale === 'zh' ? '注册即送体验额度，无需绑卡，5 分钟快速上手' : 'Sign up for free credits, no card required, 5-min setup'}
              </p>
            </div>
            <CTAButton
              variant="primary"
              size="md"
              href={getLocalizedPath('/demo')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {currentLocale === 'zh' ? '立即体验' : 'Try Now'}
            </CTAButton>
          </div>
        </motion.div>

        {/* 计费说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <p className="text-body text-foreground-secondary">
            {currentLocale === 'zh'
              ? '呼入/外呼统一计费 · 已含 LLM + TTS + ASR 费用 · 话费由运营商单独结算'
              : 'Unified inbound/outbound rate · LLM + TTS + ASR included · Telecom charges billed separately'}
          </p>
        </motion.div>

        {/* Pricing Cards - 两栏 */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => { if (el) cardsRef.current[index] = el }}
              className={`${getCardStyles(plan.variant)} rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-elevated`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                  <span className="bg-gradient-gold text-background-primary px-4 py-1.5 rounded-full text-caption font-semibold shadow-gold">
                    {plan.badge?.[currentLocale]}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-h3 font-semibold text-foreground-primary mb-2">
                {plan.name[currentLocale]}
              </h3>

              {/* Description */}
              <p className="text-body text-foreground-secondary mb-2">
                {plan.description[currentLocale]}
              </p>

              {/* Price hint */}
              <p className="text-body-sm text-foreground-muted mb-6">
                {currentLocale === 'zh' ? '联系销售获取报价' : 'Contact sales for pricing'}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features[currentLocale].map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.variant === 'popular' ? 'text-gold' : 'text-accent-lime'}`} />
                    <span className="text-body-sm text-foreground-secondary">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <CTAButton
                variant={plan.variant === 'popular' ? 'primary' : 'secondary'}
                size="lg"
                fullWidth
                href={getLocalizedPath('/company/contact')}
              >
                {plan.cta[currentLocale]}
              </CTAButton>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mt-10 text-center">
          <p className="text-body text-foreground-secondary">
            {currentLocale === 'zh' ? '有疑问？' : 'Have questions?'}{' '}
            <Link
              to={getLocalizedPath('/pricing#faq')}
              className="text-gold hover:text-gold-light underline underline-offset-2"
            >
              {currentLocale === 'zh' ? '查看常见问题' : 'View FAQ'}
            </Link>
          </p>
        </div>
      </Container>
    </section>
  )
}

export default PricingSection