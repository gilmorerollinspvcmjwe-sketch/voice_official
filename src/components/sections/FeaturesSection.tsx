/**
 * FeaturesSection - 功能特性展示
 * 3x2 网格布局 + GradientText 标题
 *
 * 动画升级：
 * - GSAP ScrollTrigger 卡片入场动画
 * - 错落显示效果
 * - Hover 交互增强
 */

import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Mic,
  Brain,
  Zap,
  RefreshCw,
  MessageSquare,
  ChartBar,
  ArrowRight,
  Shield,
  Clock,
  Globe,
  Heart,
} from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { GradientText } from '@/components/effects/GradientText'
import { HorizontalScroll, FeatureCard } from '@/components/effects/HorizontalScroll'
import { getLocalizedPath } from '@/utils'

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger)

// 检测减弱动画偏好
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const iconMap = {
  mic: Mic,
  brain: Brain,
  zap: Zap,
  refresh: RefreshCw,
  message: MessageSquare,
  chart: ChartBar,
  shield: Shield,
  clock: Clock,
  globe: Globe,
  heart: Heart,
}

interface Feature {
  id: string
  icon: keyof typeof iconMap
  title: string
  description: string
  highlight?: string
  gradient?: 'purple' | 'gold' | 'lime'
}

const features: Feature[] = [
  {
    id: 'natural',
    icon: 'mic',
    title: '拟人对话',
    description: '自然流畅的对话体验，支持打断和上下文记忆',
    gradient: 'purple',
  },
  {
    id: 'realtime',
    icon: 'zap',
    title: '实时响应',
    description: '<200ms 响应延迟，毫秒级语音识别和合成',
    highlight: '极速',
    gradient: 'lime',
  },
  {
    id: 'interrupt',
    icon: 'refresh',
    title: '智能打断',
    description: '支持用户随时打断，AI 智能响应调整',
    gradient: 'gold',
  },
  {
    id: 'context',
    icon: 'brain',
    title: '上下文记忆',
    description: '长时记忆能力，跨对话上下文保持',
    gradient: 'purple',
  },
  {
    id: 'emotion',
    icon: 'heart',
    title: '情感智能',
    description: '识别用户情绪，动态调整对话策略',
    gradient: 'gold',
  },
  {
    id: 'analytics',
    icon: 'chart',
    title: '数据分析',
    description: '全链路数据追踪，可视化报表分析',
    gradient: 'lime',
  },
]

const FeaturesSection = () => {
  const { t } = useTranslation('home')
  const [viewMode, setViewMode] = useState<'grid' | 'scroll'>('grid')
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  // GSAP 滚动触发动画
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        end: 'bottom 30%',
        toggleActions: 'play none none reverse',
      },
    })

    // 标题入场
    if (headerRef.current) {
      tl.from(headerRef.current.children, {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power4.out',
      })
    }

    // 卡片错落入场
    if (cardsRef.current.length > 0) {
      tl.from(cardsRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3')

      // 图标动画
      cardsRef.current.forEach((card, i) => {
        const icon = card.querySelector('.feature-icon-wrapper')
        if (icon) {
          tl.from(icon, {
            scale: 0,
            rotation: -180,
            duration: 0.5,
            ease: 'back.out(1.7)',
          }, `-=${0.3 + i * 0.1}`)
        }
      })
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [viewMode])

  const getGradientClass = (gradient?: string) => {
    switch (gradient) {
      case 'purple':
        return 'from-primary-purple/20 to-primary-blue/10'
      case 'gold':
        return 'from-gold/20 to-gold-light/10'
      case 'lime':
        return 'from-accent-lime/20 to-accent-lime/10'
      default:
        return 'from-primary-purple/20 to-primary-blue/10'
    }
  }

  const getIconColor = (gradient?: string) => {
    switch (gradient) {
      case 'purple':
        return 'text-primary-purple'
      case 'gold':
        return 'text-gold'
      case 'lime':
        return 'text-accent-lime'
      default:
        return 'text-primary-purple'
    }
  }

  return (
    <section ref={sectionRef} className="relative py-24 bg-background-primary overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-lime/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <div ref={headerRef} className="section-header">
          <h2 className="section-title">
            <GradientText metallic direction="diagonal" speed={4}>
              {t('features.title', '核心能力')}
            </GradientText>
          </h2>
          <p className="section-subtitle">
            {t('features.subtitle', '6 大核心技术能力，打造企业级 AI 语音对话体验')}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-all ${
              viewMode === 'grid'
                ? 'bg-accent-lime text-background-primary'
                : 'bg-background-card text-foreground-secondary hover:text-foreground-primary'
            }`}
          >
            网格视图
          </button>
          <button
            onClick={() => setViewMode('scroll')}
            className={`px-4 py-2 rounded-lg text-body-sm font-medium transition-all ${
              viewMode === 'scroll'
                ? 'bg-accent-lime text-background-primary'
                : 'bg-background-card text-foreground-secondary hover:text-foreground-primary'
            }`}
          >
            横向滚动
          </button>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = iconMap[feature.icon] || Mic

              return (
                <div
                  key={feature.id}
                  ref={(el) => { if (el) cardsRef.current[index] = el }}
                  className="group"
                >
                  <Card
                    variant="hover"
                    padding="lg"
                    className={`h-full relative overflow-hidden bg-gradient-to-br ${getGradientClass(feature.gradient)} hover:shadow-glow transition-all duration-300`}
                  >
                    {/* 图标 */}
                    <div className="feature-icon-wrapper w-14 h-14 rounded-2xl bg-background-card/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent size={28} className={getIconColor(feature.gradient)} />
                    </div>

                    {/* 标题 */}
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-h4 font-semibold text-foreground-primary">
                        {t(`features.${feature.id}.title`, feature.title)}
                      </h3>
                      {feature.highlight && (
                        <Badge variant="accent" size="sm" className="bg-accent-lime/10 text-accent-lime">
                          {feature.highlight}
                        </Badge>
                      )}
                    </div>

                    {/* 描述 */}
                    <p className="text-body text-foreground-secondary leading-relaxed">
                      {t(`features.${feature.id}.description`, feature.description)}
                    </p>

                    {/* Hover 光效 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </Card>
                </div>
              )
            })}
          </div>
        )}

        {/* Scroll View */}
        {viewMode === 'scroll' && (
          <div className="mt-8">
            <HorizontalScroll
              showProgress
              showDots
              containerHeight="200vh"
              itemWidth="60vw"
              gap={24}
              className="py-8"
            >
              {features.map((feature) => {
                const IconComponent = iconMap[feature.icon] || Mic

                return (
                  <FeatureCard
                    key={feature.id}
                    icon={<IconComponent size={28} className={getIconColor(feature.gradient)} />}
                    title={t(`features.${feature.id}.title`, feature.title)}
                    description={t(`features.${feature.id}.description`, feature.description)}
                    className={`max-w-xl mx-auto bg-gradient-to-br ${getGradientClass(feature.gradient)}`}
                  />
                )
              })}
            </HorizontalScroll>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to={getLocalizedPath('/product/features')}>
            <Button
              variant="ghost"
              size="lg"
              rightIcon={<ArrowRight size={20} />}
              className="text-foreground-secondary hover:text-foreground-primary"
            >
              {t('features.cta.text', '了解更多功能')}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}

export default FeaturesSection