/**
 * VideoCardsSection - 全卡片视频展示区
 * 替换原有的 ProblemSolutionSection + FeaturesSection + HowItWorksSection
 * 
 * 视频位暂时用渐变占位图，后续替换为真实视频
 */

import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Container } from '@/components/common'
import { GradientText } from '@/components/effects/GradientText'
import { Play, Pause } from 'lucide-react'

interface VideoCard {
  id: string
  title: { en: string; zh: string }
  subtitle: { en: string; zh: string }
  gradientFrom: string
  gradientTo: string
  accentColor: string
  videoUrl?: string
  posterUrl?: string
}

const videoCards: VideoCard[] = [
  {
    id: 'demo-1',
    title: { en: 'AI Voice Dialogue Demo', zh: 'AI 语音对话演示' },
    subtitle: { en: 'Real-scenario conversation experience', zh: '真实场景对话体验' },
    gradientFrom: '#8B5CF6',
    gradientTo: '#3B82F6',
    accentColor: '#8B5CF6',
  },
  {
    id: 'demo-2',
    title: { en: 'Smart Interruption Demo', zh: '智能打断演示' },
    subtitle: { en: 'Interrupt anytime, AI responds instantly', zh: '随时打断，AI 即时响应' },
    gradientFrom: '#D4FF00',
    gradientTo: '#22C55E',
    accentColor: '#D4FF00',
  },
  {
    id: 'demo-3',
    title: { en: 'Multi-language Support', zh: '多语言支持' },
    subtitle: { en: '50+ languages seamless switching', zh: '50+ 语言无缝切换' },
    gradientFrom: '#D4A574',
    gradientTo: '#F59E0B',
    accentColor: '#D4A574',
  },
  {
    id: 'demo-4',
    title: { en: 'Data Analytics Dashboard', zh: '数据分析看板' },
    subtitle: { en: 'Real-time business insights', zh: '实时洞察业务趋势' },
    gradientFrom: '#06B6D4',
    gradientTo: '#0EA5E9',
    accentColor: '#06B6D4',
  },
]

function VideoCardComponent({ card, index }: { card: VideoCard; index: number }) {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language === 'zh' ? 'zh' : 'en'
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-background-card border border-border/50 shadow-2xl">
        {/* 视频占位区 */}
        <div
          className="relative w-full aspect-video cursor-pointer"
          style={{
            background: `linear-gradient(135deg, ${card.gradientFrom}15 0%, ${card.gradientTo}10 50%, ${card.gradientFrom}05 100%)`,
          }}
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {/* 网格纹理 */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(${card.gradientFrom}20 1px, transparent 1px), linear-gradient(90deg, ${card.gradientFrom}20 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }}
          />

          {/* 光晕 */}
          <div
            className="absolute inset-0 opacity-30 transition-opacity duration-500"
            style={{
              background: `radial-gradient(ellipse at 50% 50%, ${card.gradientFrom}30 0%, transparent 70%)`,
            }}
          />

          {/* 播放按钮 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm border-2"
              style={{
                backgroundColor: `${card.gradientFrom}20`,
                borderColor: `${card.gradientFrom}60`,
              }}
              animate={{
                scale: isHovered ? 1.1 : 1,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {isPlaying ? (
                <Pause size={32} color={card.accentColor} />
              ) : (
                <Play size={32} color={card.accentColor} className="ml-1" />
              )}
            </motion.div>
          </div>

          {/* 悬浮光效 */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, transparent 0%, ${card.gradientFrom}10 100%)`,
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* 卡片信息 */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-foreground-primary mb-1">
            {card.title[currentLocale]}
          </h3>
          <p className="text-body-sm text-foreground-secondary">
            {card.subtitle[currentLocale]}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

const VideoCardsSection = () => {
  const { t, i18n } = useTranslation('home')
  const currentLocale = i18n.language === 'zh' ? 'zh' : 'en'

  return (
    <section className="relative py-24 bg-background-primary overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-purple/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-lime/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-display font-bold mb-4">
            <GradientText metallic direction="diagonal" speed={4}>
              {t('videoDemo.title', currentLocale === 'zh' ? '产品演示' : 'Product Demo')}
            </GradientText>
          </h2>
          <p className="text-body-lg text-foreground-secondary max-w-2xl mx-auto">
            {t('videoDemo.subtitle', currentLocale === 'zh' ? '观看 AI 语音智能体的真实表现' : 'Watch AI Voice Agents in action')}
          </p>
        </motion.div>

        {/* 视频卡片网格 — 2x2 */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {videoCards.map((card, index) => (
            <VideoCardComponent key={card.id} card={card} index={index} />
          ))}
        </div>
      </Container>
    </section>
  )
}

export default VideoCardsSection
