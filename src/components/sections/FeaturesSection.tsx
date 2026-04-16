/**
 * FeaturesSection - 功能特性展示
 * 3x2 网格布局 + GradientText 标题
 *
 * 动画方案：
 * - Framer Motion whileInView 滚动驱动卡片交错入场
 * - FeatureCard 3D 倾斜 + 鼠标跟随光效 + 悬浮发光边框
 * - 图标旋转弹出动画
 */

import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
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
import { Container, Badge, Button } from '@/components/common'
import { GradientText } from '@/components/effects/GradientText'
import { FeatureCard } from '@/components/effects/FeatureCard'
import { getLocalizedPath } from '@/utils'

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
  glowColor?: string
  gradientBg?: string
}

const features: Feature[] = [
  {
    id: 'natural',
    icon: 'mic',
    title: '拟人对话',
    description: '自然流畅的对话体验，支持打断和上下文记忆',
    glowColor: '#8B5CF6',
    gradientBg: 'from-primary-purple/20 to-primary-blue/10',
  },
  {
    id: 'realtime',
    icon: 'zap',
    title: '实时响应',
    description: '<200ms 响应延迟，毫秒级语音识别和合成',
    highlight: '极速',
    glowColor: '#D4FF00',
    gradientBg: 'from-accent-lime/20 to-accent-lime/10',
  },
  {
    id: 'interrupt',
    icon: 'refresh',
    title: '智能打断',
    description: '支持用户随时打断，AI 智能响应调整',
    glowColor: '#D4A574',
    gradientBg: 'from-gold/20 to-gold-light/10',
  },
  {
    id: 'context',
    icon: 'brain',
    title: '上下文记忆',
    description: '长时记忆能力，跨对话上下文保持',
    glowColor: '#8B5CF6',
    gradientBg: 'from-primary-purple/20 to-primary-blue/10',
  },
  {
    id: 'emotion',
    icon: 'heart',
    title: '情感智能',
    description: '识别用户情绪，动态调整对话策略',
    glowColor: '#D4A574',
    gradientBg: 'from-gold/20 to-gold-light/10',
  },
  {
    id: 'analytics',
    icon: 'chart',
    title: '数据分析',
    description: '全链路数据追踪，可视化报表分析',
    glowColor: '#D4FF00',
    gradientBg: 'from-accent-lime/20 to-accent-lime/10',
  },
]

// Framer Motion 变体
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const cardVariants = {
  hidden: { y: 60, opacity: 0, scale: 0.9 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 14,
      mass: 0.8,
    },
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -120 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 200,
      damping: 12,
    },
  },
}

const headerVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const FeaturesSection = () => {
  const { t } = useTranslation('home')
  const sectionRef = useRef<HTMLDivElement>(null)

  return (
    <section ref={sectionRef} className="relative py-24 bg-background-primary overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-lime/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <motion.div
          className="section-header"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h2 className="section-title">
            <GradientText metallic direction="diagonal" speed={4}>
              {t('features.title', '核心能力')}
            </GradientText>
          </h2>
          <p className="section-subtitle">
            {t('features.subtitle', '6 大核心技术能力，打造企业级 AI 语音对话体验')}
          </p>
        </motion.div>

        {/* Grid — 3x2 唯一布局 */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((feature) => {
            const IconComponent = iconMap[feature.icon] || Mic

            return (
              <motion.div
                key={feature.id}
                variants={cardVariants}
              >
                <FeatureCard
                  glowColor={feature.glowColor}
                  bgGradient={`bg-gradient-to-br ${feature.gradientBg} bg-background-card`}
                  className="h-full"
                >
                  <div className="p-8">
                    {/* 图标 */}
                    <motion.div
                      className="feature-icon-wrapper w-14 h-14 rounded-2xl bg-background-card/50 flex items-center justify-center mb-6"
                      variants={iconVariants}
                    >
                      <IconComponent size={28} className={feature.glowColor} />
                    </motion.div>

                    {/* 标题 */}
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-h4 font-semibold text-foreground-primary">
                        {t(`features.${feature.id}.title`, feature.title)}
                      </h3>
                      {feature.highlight && (
                        <Badge
                          variant="accent"
                          size="sm"
                          className="bg-accent-lime/10 text-accent-lime"
                        >
                          {feature.highlight}
                        </Badge>
                      )}
                    </div>

                    {/* 描述 */}
                    <p className="text-body text-foreground-secondary leading-relaxed">
                      {t(`features.${feature.id}.description`, feature.description)}
                    </p>
                  </div>
                </FeatureCard>
              </motion.div>
            )
          })}
        </motion.div>

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
