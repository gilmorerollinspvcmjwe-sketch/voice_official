/**
 * HeroSection - 全新重设计
 * 左右分栏布局（45%:55%）
 *
 * 动画升级：
 * - Hyperspeed 超光速背景（星空穿梭效果）
 * - GlitchText 故障文字（AI Voice Agent 标题）
 * - GSAP SplitText 入场动画
 * - SplashCursor 鼠标轨迹效果
 *
 * 📝 TODO(老徐): 替换为真实产品视频 (1920x1080, loop, <10MB)
 */

import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ArrowRight, Play, Mic } from 'lucide-react'
import { Container } from '@/components/common'
import { GradientText } from '@/components/effects/GradientText'
import Hyperspeed from '@/components/effects/Hyperspeed'
import GlitchText from '@/components/effects/GlitchText'
import { StarBorder } from '@/components/effects'
import { getLocalizedPath } from '@/utils'

// 检测减弱动画偏好
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// 信任指标
const trustMetrics = [
  { value: '500+', label: 'Enterprise Clients' },
  { value: '99.9%', label: 'Availability' },
  { value: '<200ms', label: 'Response Latency' },
]

// 合规徽章
const complianceBadges = ['SOC 2', 'GDPR', 'HIPAA', 'ISO 27001']

const HeroSection = () => {
  const { t } = useTranslation('home')
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const metricsRef = useRef<HTMLDivElement>(null)
  const badgesRef = useRef<HTMLDivElement>(null)

  // GSAP 入场动画
  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return

    // 确保元素初始可见（防止动画失败导致不可见）
    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 1,
      y: 0,
    })

    const tl = gsap.timeline({ delay: 0.3 })

    // 标题入场（字符拆分动画）
    if (titleRef.current) {
      const titleChars = titleRef.current.querySelectorAll('.hero-char')
      if (titleChars.length > 0) {
        tl.from(titleChars, {
          y: 80,
          opacity: 0,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power4.out',
        })
      } else {
        tl.from(titleRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: 'power4.out',
        })
      }
    }

    // 副标题入场
    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')
    }

    // CTA 按钮
    if (ctaRef.current) {
      tl.from(ctaRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, '-=0.2')
    }

    // 信任指标
    if (metricsRef.current) {
      tl.from(metricsRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.2')
    }

    // 合规徽章
    if (badgesRef.current) {
      tl.from(badgesRef.current.children, {
        scale: 0.8,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        ease: 'back.out(1.5)',
      }, '-=0.1')
    }

    return () => {
      tl.kill()
    }
  }, [])

  // GlitchText 触发（hover 时增强故障效果）
  // const [glitchTrigger, setGlitchTrigger] = useState<'auto' | 'hover'>('auto')

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center bg-background-primary overflow-hidden">
      {/* Hyperspeed 超光速背景 */}
      {!prefersReducedMotion() && (
        <Hyperspeed
          particleCount={150}
          particleColor="#8B5CF6"
          speed={2}
          sizeRange={{ min: 1, max: 3 }}
          centerOffset={{ x: 100, y: 0 }}
          className="opacity-30"
        />
      )}

      {/* Video Background Layer - using placeholder until hero-background.mp4 available */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-placeholder.mp4" type="video/mp4" />
        {/* Fallback poster image if video fails */}
      </video>

      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-lime/5 rounded-full blur-3xl" />

      <Container className="relative z-10 pt-20 pb-8 lg:pt-32 lg:pb-12">
        {/* 主内容区 - 左右分栏 */}
        <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-8 items-center">
          {/* 左侧 - 文字内容 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            {/* 主标题 - GlitchText 故障效果 */}
            <h1 ref={titleRef} className="mb-6">
              <div className="text-h2 md:text-h1 lg:text-hero font-semibold text-foreground-primary mb-4 hero-char-container">
                {/* 确保标题始终可见，GlitchText 作为增强 */}
                <span className="relative">
                  <GlitchText
                    color="#FFFFFF"
                    glitchColor1="#FF00FF"
                    glitchColor2="#00FFFF"
                    intensity="medium"
                    trigger="auto"
                  >
                    AI Voice Agent
                  </GlitchText>
                </span>
              </div>
              <div ref={subtitleRef} className="text-h3 md:text-h2 lg:text-h1 font-semibold text-foreground-primary">
                <GradientText metallic direction="diagonal" speed={4}>
                  {t('hero.title', '拟人化语音对话智能体平台')}
                </GradientText>
              </div>
            </h1>

            {/* 副标题 */}
            <p className="text-body-lg md:text-xl text-foreground-secondary mb-8 max-w-lg leading-relaxed">
              {t('hero.subtitle', '打造自然流畅的 AI 语音对话体验，支持呼入、外呼全场景，助力企业客户服务和销售转化效率提升 3 倍以上。')}
            </p>

            {/* CTA 按钮 */}
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* 主 CTA - StarBorder 金色光效 */}
              <Link to={getLocalizedPath('/signup')}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <StarBorder
                    color="#D4A574"
                    speed="5s"
                    thickness={3}
                    variant="gold"
                  >
                    <span className="px-8 py-4 font-semibold flex items-center gap-2 bg-gradient-gold text-background-primary rounded-xl">
                      {t('hero.cta.primary', '免费试用')}
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </StarBorder>
                </motion.div>
              </Link>

              {/* 演示按钮 - 紫色光效 */}
              <Link to={getLocalizedPath('/demo')}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <StarBorder
                    color="#8B5CF6"
                    speed="6s"
                    thickness={2}
                    variant="purple"
                  >
                    <span className="px-8 py-4 font-semibold flex items-center gap-2 bg-background-card/90 text-foreground-primary rounded-xl border border-primary-purple/30">
                      <Play className="w-5 h-5" />
                      {t('hero.cta.secondary', '观看演示')}
                    </span>
                  </StarBorder>
                </motion.div>
              </Link>
            </div>

            {/* 信任指标 */}
            <div ref={metricsRef} className="flex items-center gap-8 mb-6">
              {trustMetrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-2xl md:text-3xl font-bold text-accent-lime">{metric.value}</span>
                  <span className="text-body-sm text-foreground-muted">{metric.label}</span>
                  {index < trustMetrics.length - 1 && (
                    <div className="w-px h-8 bg-border hidden sm:block" />
                  )}
                </div>
              ))}
            </div>

            {/* 合规徽章 */}
            <div ref={badgesRef} className="flex items-center gap-3">
              {complianceBadges.map((badge) => (
                <div
                  key={badge}
                  className="px-3 py-1.5 bg-background-card/50 border border-border rounded-lg text-caption font-medium text-foreground-secondary"
                >
                  {badge}
                </div>
              ))}
            </div>
          </motion.div>

          {/* 右侧 - 产品展示 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <div className="relative perspective-1000">
              {/* 产品界面 - 3D 透视效果 */}
              <motion.div
                className="relative aspect-[4/3] max-w-xl mx-auto lg:mx-0"
                whileHover={{ rotateY: 0 }}
                initial={{ rotateY: -5 }}
                style={{ transform: 'rotateY(-5deg)', transition: 'transform 0.5s ease' }}
              >
                {/* 主界面卡片 */}
                <div className="relative rounded-2xl overflow-hidden border border-gold/30 shadow-elevated bg-background-card">
                  {/* 产品界面内容 */}
                  <div className="aspect-[4/3] bg-background-secondary flex items-center justify-center">
                    {/* 对话波形展示 */}
                    <div className="w-full h-full flex items-center justify-center gap-1 px-8">
                      {Array.from({ length: 40 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 bg-gradient-to-t from-primary-purple via-primary-blue to-primary-cyan rounded-full"
                          animate={{
                            height: [12, 30 + Math.random() * 40, 12],
                            opacity: [0.5, 0.8, 0.5],
                          }}
                          transition={{
                            duration: 1.2 + Math.random() * 0.5,
                            repeat: Infinity,
                            delay: i * 0.03,
                            ease: 'easeInOut',
                          }}
                        />
                      ))}
                    </div>

                    {/* 中心播放按钮 */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold cursor-pointer"
                      >
                        <Play className="w-8 h-8 text-background-primary ml-1" />
                      </motion.div>
                    </div>
                  </div>

                  {/* 金色边框光晕 */}
                  <div className="absolute inset-0 rounded-2xl border border-gold/40 shadow-gold opacity-50" />
                </div>

                {/* 悬浮数据卡片 */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 lg:right-8 w-20 h-20 bg-background-card/90 backdrop-blur-sm border border-accent-lime/30 rounded-xl shadow-lg p-3 hidden lg:flex flex-col items-center justify-center"
                >
                  <span className="text-lg font-bold text-accent-lime">15pt</span>
                  <span className="text-caption text-foreground-muted">CSAT</span>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -bottom-4 -left-4 lg:left-8 w-24 h-24 bg-background-card/90 backdrop-blur-sm border border-gold/30 rounded-xl shadow-lg p-3 hidden lg:flex flex-col items-center justify-center"
                >
                  <Mic className="w-6 h-6 text-gold mb-2" />
                  <span className="text-caption text-foreground-secondary">实时对话</span>
                </motion.div>
              </motion.div>

              {/* 装饰光晕 */}
              <div className="absolute -inset-8 bg-gradient-to-r from-primary-purple/20 via-transparent to-primary-cyan/20 rounded-3xl blur-2xl -z-10 opacity-60" />
            </div>
          </motion.div>
        </div>

      </Container>

      {/* 向下滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-foreground-muted"
      >
        <span className="text-caption uppercase tracking-wider">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-accent-lime to-transparent"
        />
      </motion.div>
    </section>
  )
}

export default HeroSection