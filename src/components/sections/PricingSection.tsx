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
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  variant: 'default' | 'popular' | 'enterprise'
  badge?: string
}

const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: '入门版',
    price: '¥0',
    period: '/月',
    description: '适合个人开发者和小团队试用',
    features: [
      '每月 100 分钟通话',
      '基础语音模型',
      '标准技术支持',
      '社区支持',
      '基础 API 访问',
    ],
    cta: '免费开始',
    variant: 'default',
  },
  {
    id: 'pro',
    name: '专业版',
    price: '¥299',
    period: '/月',
    description: '适合成长型企业',
    features: [
      '每月 1000 分钟通话',
      '高级语音模型',
      '优先技术支持',
      '自定义音色',
      '完整 API 访问',
      '数据分析报表',
      '多场景模板',
    ],
    cta: '立即升级',
    variant: 'popular',
    badge: '最受欢迎',
  },
  {
    id: 'enterprise',
    name: '企业版',
    price: '定制',
    period: '',
    description: '适合大型企业和定制需求',
    features: [
      '无限通话时长',
      '专属语音模型',
      '7x24 技术支持',
      '私有化部署',
      'SLA 保障',
      '专属客户经理',
      '定制化开发',
      '安全合规审计',
    ],
    cta: '联系销售',
    variant: 'enterprise',
  },
]

const PricingSection = () => {
  const { t } = useTranslation('pricing')
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  // GSAP 滚动触发动画
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse',
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

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
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
    <section ref={sectionRef} className="relative py-24 bg-background-primary overflow-hidden">
      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-hero opacity-30" />
      <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary-purple/5 rounded-full blur-3xl" />

      <Container className="relative">
        {/* Header */}
        <div ref={headerRef} className="section-header">
          <h2 className="section-title">
            <GradientText metallic direction="diagonal" speed={4}>
              {t('title', '简单透明的定价')}
            </GradientText>
          </h2>
          <p className="section-subtitle">
            {t('subtitle', '按需付费，只为实际使用的通话时长付费')}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
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
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-h4 font-semibold text-foreground-primary mb-2">
                {t(`plans.${plan.id}.name`, plan.name)}
              </h3>

              {/* Price */}
              <div className="mb-4">
                <span className={`text-4xl font-bold ${getPriceStyles(plan.variant)}`}>
                  {plan.price}
                </span>
                <span className="text-body text-foreground-muted ml-1">
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p className="text-body-sm text-foreground-secondary mb-6">
                {t(`plans.${plan.id}.description`, plan.description)}
              </p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.variant === 'popular' ? 'text-gold' : 'text-accent-lime'}`} />
                    <span className="text-body-sm text-foreground-secondary">
                      {t(`plans.${plan.id}.features.${fIndex}`, feature)}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button - 使用统一的 CTAButton */}
              <CTAButton
                variant={plan.variant === 'popular' ? 'primary' : plan.variant === 'enterprise' ? 'secondary' : 'default'}
                size="lg"
                fullWidth
                href={getLocalizedPath(plan.variant === 'enterprise' ? '/company/contact' : '/signup')}
                rightIcon={plan.variant === 'popular' ? <ArrowRight className="w-4 h-4" /> : undefined}
              >
                {t(`plans.${plan.id}.cta`, plan.cta)}
              </CTAButton>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-body text-foreground-secondary">
            {t('faqHint', '有疑问？')}{' '}
            <Link
              to={getLocalizedPath('/pricing#faq')}
              className="text-gold hover:text-gold-light underline underline-offset-2"
            >
              {t('faqLink', '查看常见问题')}
            </Link>
          </p>
        </motion.div>

        {/* 企业定制提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 max-w-2xl mx-auto text-center"
        >
          <div className="bg-background-card/50 border border-border rounded-xl p-6">
            <h4 className="text-subheading font-semibold text-foreground-primary mb-2">
              {t('enterprise.title', '需要定制方案？')}
            </h4>
            <p className="text-body text-foreground-secondary mb-4">
              {t('enterprise.description', '联系我们获取专属定价和私有化部署方案')}
            </p>
            <Link to={getLocalizedPath('/company/contact')}>
              <Button variant="secondary" size="sm">
                {t('enterprise.cta', '联系销售团队')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default PricingSection