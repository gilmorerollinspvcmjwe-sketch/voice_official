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

import { useEffect, useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ArrowRight, Play, Phone } from 'lucide-react'
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



// ========================
// 语音消息条数据（航空客服退票场景）
// ========================

interface VoiceMessage {
  id: string
  role: 'ai' | 'customer'
  text: string
  duration: string
  toolCalls?: Array<{ fn: string; args: string; result: string }>
}

const VOICE_MESSAGES: VoiceMessage[] = [
  { id: 'vm-1', role: 'ai', text: '您好，欢迎致电星辰航空，请问有什么可以帮您？', duration: '0:04', toolCalls: [
    { fn: 'identify_caller', args: '来电号码识别', result: '✅ VIP 客户' },
  ]},
  { id: 'vm-2', role: 'customer', text: '我想退掉后天北京飞上海的机票，订单号 NH2847', duration: '0:06' },
  { id: 'vm-3', role: 'ai', text: '已为您查询到订单，12月8日 CA1502 航班，北京首都飞上海虹桥，经济舱', duration: '0:08', toolCalls: [
    { fn: 'query_order', args: 'NH2847', result: '✅ 找到订单' },
  ]},
  { id: 'vm-4', role: 'customer', text: '对的，行程有变去不了了', duration: '0:04' },
  { id: 'vm-5', role: 'ai', text: '已提交退票申请，扣除5%手续费，退款1216元3到5个工作日原路退回', duration: '0:09', toolCalls: [
    { fn: 'refund_ticket', args: 'NH2847 · 5%手续费', result: '✅ 退票成功' },
  ]},
  { id: 'vm-6', role: 'customer', text: '能发个确认短信吗？', duration: '0:03' },
  { id: 'vm-7', role: 'ai', text: '确认短信已发送至您尾号1234的手机号，请注意查收', duration: '0:07', toolCalls: [
    { fn: 'send_sms', args: '****1234 · refund_confirm', result: '✅ 已发送' },
  ]},
  { id: 'vm-8', role: 'customer', text: '好的，谢谢', duration: '0:02', toolCalls: [] },
  { id: 'vm-9', role: 'ai', text: '感谢您的来电，祝您旅途愉快，再见', duration: '0:04', toolCalls: [
    { fn: 'end_call', args: '正常挂机', result: '✅ 通话结束' },
  ]},
]

const N = VOICE_MESSAGES.length

// 打字机速度：每个字符间隔毫秒数
const TYPEWRITER_MS = 50

// ========================
// SVG 头像组件
// ========================

const AIAvatar = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
    <defs>
      <linearGradient id="aiGrad" x1="0" y1="0" x2="32" y2="32">
        <stop offset="0%" stopColor="#8B5CF6" />
        <stop offset="100%" stopColor="#3B82F6" />
      </linearGradient>
    </defs>
    <line x1="10" y1="6" x2="10" y2="2" stroke="url(#aiGrad)" strokeWidth="2" strokeLinecap="round" />
    <line x1="22" y1="6" x2="22" y2="2" stroke="url(#aiGrad)" strokeWidth="2" strokeLinecap="round" />
    <circle cx="10" cy="2" r="1.5" fill="#8B5CF6" />
    <circle cx="22" cy="2" r="1.5" fill="#3B82F6" />
    <rect x="5" y="7" width="22" height="16" rx="5" fill="url(#aiGrad)" />
    <circle cx="12" cy="15" r="2.5" fill="#fff">
      <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="20" cy="15" r="2.5" fill="#fff">
      <animate attributeName="opacity" values="1;0.6;1" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="12" cy="15" r="1" fill="#8B5CF6" />
    <circle cx="20" cy="15" r="1" fill="#3B82F6" />
    <rect x="11" y="19" width="10" height="2" rx="1" fill="#fff" opacity="0.5" />
  </svg>
)

const CustomerAvatar = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className="flex-shrink-0">
    <circle cx="16" cy="16" r="14" fill="#D4A574" />
    <circle cx="16" cy="11" r="5" fill="#fff" opacity="0.9" />
    <ellipse cx="16" cy="24" rx="8" ry="5" fill="#fff" opacity="0.9" />
  </svg>
)

// ========================
// 波形条预计算参数
// ========================

interface WaveBarParam {
  height: number
  delay: number
  duration: number
}

// 为每条消息预计算波形参数，根据文字长度决定波形条数
const MAX_BARS = 20
const MIN_BARS = 6

function generateWaveParams(text: string): WaveBarParam[] {
  // 文字越长，波形条越多；起伏越小
  const textLen = text.length
  const barCount = Math.round(MIN_BARS + ((MAX_BARS - MIN_BARS) * Math.min(textLen / 50, 1)))
  // 基础高度随文字长度变化：文字越长，平均高度越高
  const baseHeight = 14 + Math.min(textLen / 5, 20)
  // 起伏幅度：文字越短，起伏越小（防止短句波形太突兀）
  const variance = 0.2 + 0.15 * Math.min(textLen / 50, 1)

  return Array.from({ length: barCount }, (_, i) => {
    // 使用正弦波模拟更自然的波形
    const sine = Math.sin(i / barCount * Math.PI * 2.5 + i * 0.8)
    const normalizedHeight = baseHeight * (0.6 + sine * variance + Math.random() * 0.15)
    return {
      height: Math.max(6, Math.min(40, normalizedHeight)),
      delay: i * 0.04 + Math.random() * 0.05,
      duration: 0.5 + Math.random() * 0.4,
    }
  })
}

// 预计算所有消息的波形参数
const waveParamsMap: Record<string, WaveBarParam[]> = {}
VOICE_MESSAGES.forEach((msg) => {
  waveParamsMap[msg.id] = generateWaveParams(msg.text)
})

// ========================
// 单条语音消息卡片
// ========================

interface VoiceMessageCardProps {
  message: VoiceMessage
  isPlaying: boolean
  showTool: boolean
  typewriter: boolean       // 当前消息是否启用打字机效果
  typewriterText: string    // 打字机当前已输出的文字
}

const VoiceMessageCard = ({ message, isPlaying, showTool, typewriter, typewriterText }: VoiceMessageCardProps) => {
  const isAI = message.role === 'ai'
  const params = waveParamsMap[message.id] || []
  const displayText = typewriter ? typewriterText : message.text
  const toolCalls = message.toolCalls || []

  return (
    <motion.div
      className={`flex items-start gap-3 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 头像 */}
      <div className="flex-shrink-0 mt-0.5">
        {isAI ? <AIAvatar size={28} /> : <CustomerAvatar size={28} />}
      </div>

      {/* 右侧内容 */}
      <div className={`flex-1 min-w-0 ${isAI ? 'text-left' : 'text-right'}`}>
        {/* 上行：播放按钮 + 波形条 + 时长 */}
        <div className={`flex items-center gap-3 ${isAI ? 'flex-row' : 'flex-row-reverse'}`}>
          {/* 播放按钮 */}
          <div
            className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
              isPlaying
                ? 'bg-primary-purple shadow-lg shadow-primary-purple/30'
                : 'bg-white/[0.07]'
            }`}
          >
            <Play className="w-3 h-3 text-white ml-0.5" fill="white" />
          </div>

          {/* 波形条 */}
          <div className="flex items-end gap-[2px] h-8">
            {params.map((p, i) => (
              <motion.div
                key={i}
                className="w-[2px] rounded-full"
                style={{
                  background: isAI
                    ? 'linear-gradient(to top, #8B5CF6, #60A5FA)'
                    : 'linear-gradient(to top, #D4A574, #F59E0B)',
                  height: p.height,
                  transformOrigin: 'bottom',
                }}
                animate={isPlaying ? { scaleY: [0.5, 1.3, 0.5] } : { scaleY: 1 }}
                transition={
                  isPlaying
                    ? { duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }
                    : { duration: 0 }
                }
              />
            ))}
          </div>

          {/* 时长 */}
          <span className="text-[10px] text-white/25 flex-shrink-0 tabular-nums font-medium">{message.duration}</span>
        </div>

        {/* 转写文字 + 打字机光标 */}
        <p className={`text-xs mt-1.5 leading-relaxed ${isAI ? 'text-purple-300/90' : 'text-amber-200/70'}`}>
          {displayText}
          {typewriter && (
            <motion.span
              className="inline-block w-[1px] h-[14px] bg-purple-300/80 ml-0.5 align-middle"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            />
          )}
        </p>

        {/* 工具调用指示器（仅 AI + 有 toolCalls） */}
        {isAI && toolCalls.length > 0 && showTool && (
          <div className="mt-2 flex flex-col gap-1 items-start">
            {toolCalls.map((tc, i) => (
              <motion.div
                key={tc.fn}
                className="flex items-center gap-2"
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: 0.1 + i * 0.15 }}
              >
                <svg className="w-3 h-3 text-violet-400/40 flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M11.07 1.79a1.5 1.5 0 0 0-2.12 0l-1.83 1.83a6.03 6.03 0 0 0-1.36-.56l.27-2.55A1.5 1.5 0 0 0 4.54.02L1.55.52A1.5 1.5 0 0 0 1.02 3l2.19 1.04a6.04 6.04 0 0 0-.7 1.41H.5a1.5 1.5 0 0 0 0 3h2.01a6.04 6.04 0 0 0 .7 1.41L1.02 10.9a1.5 1.5 0 0 0 .52 2.48l2.99.5a1.5 1.5 0 0 0 1.49-1.49l-.27-2.55c.47-.13.92-.32 1.36-.56l1.83 1.83a1.5 1.5 0 0 0 2.12 0l2.12-2.12a1.5 1.5 0 0 0 0-2.12l-2.11-2.08zM12 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                </svg>
                <span className="text-[10px] text-violet-300/50 font-mono">{tc.fn}</span>
                <span className="text-[10px] text-white/15">({tc.args})</span>
                <span className="text-[10px] text-emerald-400/60">{tc.result}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ========================
// 产品展示面板（语音条轮播）
// ========================

const ProductDemoPanel = () => {
  // activeIdx 表示当前播放到哪条消息了
  // 始终显示最近 4 条（含当前），模拟对话进行感
  const [activeIdx, setActiveIdx] = useState(0)
  const VISIBLE_COUNT = 4

  // 打字机：当前消息已输出的字符数
  const [typedChars, setTypedChars] = useState(0)

  // 已播放过的最大索引（不随循环重置），用于控制工具调用保留显示
  const [playedUpTo, setPlayedUpTo] = useState(0)

  // 轮播间隔：慢速，5 秒一条
  const CAROUSEL_INTERVAL = 5000

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => {
        const next = (prev + 1) % N
        setPlayedUpTo((p) => Math.max(p, next)) // 只增不减
        return next
      })
      setTypedChars(0) // 重置打字机
    }, CAROUSEL_INTERVAL)
    return () => clearInterval(interval)
  }, [])

  // 打字机效果
  const currentText = VOICE_MESSAGES[activeIdx].text
  useEffect(() => {
    if (typedChars >= currentText.length) return
    const timer = setTimeout(() => {
      setTypedChars((prev) => Math.min(prev + 1, currentText.length))
    }, TYPEWRITER_MS)
    return () => clearTimeout(timer)
  }, [typedChars, currentText.length, activeIdx])

  // 计算可见的消息索引：从 activeIdx 往前推 VISIBLE_COUNT-1 条
  const visibleIndices = useMemo(() => {
    const indices: number[] = []
    for (let i = 0; i < VISIBLE_COUNT; i++) {
      indices.push((activeIdx - VISIBLE_COUNT + 1 + i + N) % N)
    }
    return indices
  }, [activeIdx])

  return (
    <div className="relative lg:perspective-[1000px]">
      {/* 主面板 — 通透风格：极淡底色、无外边框、底部细金线 */}
      <motion.div
        className="relative max-w-xl mx-auto lg:mx-0 rounded-2xl bg-background-primary/15 border-b border-gold/15 overflow-hidden"
        initial={{ rotateY: -5 }}
        whileHover={{ rotateY: 0, scale: 1.02 }}
        style={{ transition: 'transform 0.5s ease' }}
      >
        <div className="px-6 py-6 flex flex-col gap-3 min-h-[360px] sm:min-h-[400px]">
          {/* 轮播区域 */}
          <div className="flex flex-col gap-4 relative z-[1]">
            <AnimatePresence>
              {visibleIndices.map((idx) => {
                const msg = VOICE_MESSAGES[idx]
                const isCurrent = idx === activeIdx
                // 工具调用：当前消息 or 已经播放过的消息都保留显示
                const isPast = idx <= playedUpTo
                const showTool = (isCurrent || isPast) && msg.role === 'ai' && (msg.toolCalls || []).length > 0
                // 打字机：只有当前消息启用
                const typewriter = isCurrent
                const typewriterText = msg.text.slice(0, typedChars)

                return (
                  <VoiceMessageCard
                    key={msg.id}
                    message={msg}
                    isPlaying={isCurrent}
                    showTool={showTool}
                    typewriter={typewriter}
                    typewriterText={typewriterText}
                  />
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* 底部光晕 */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background-primary/60 to-transparent pointer-events-none" />
      </motion.div>

      {/* 装饰光晕 */}
      <div className="absolute -inset-8 bg-gradient-to-r from-primary-purple/15 via-transparent to-primary-cyan/15 rounded-3xl blur-2xl -z-10 opacity-50 pointer-events-none" />
    </div>
  )
}

// ========================
// HeroSection 主组件
// ========================

const HeroSection = () => {
  const { t } = useTranslation('home')
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)


  // GSAP 入场动画
  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return

    gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
      opacity: 1,
      y: 0,
    })

    const tl = gsap.timeline({ delay: 0.3 })

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

    if (subtitleRef.current) {
      tl.from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.4')
    }

    if (ctaRef.current) {
      tl.from(ctaRef.current.children, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      }, '-=0.2')
    }



    return () => {
      tl.kill()
    }
  }, [])

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

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero-placeholder.mp4" type="video/mp4" />
      </video>

      {/* 背景光效 */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-lime/5 rounded-full blur-3xl" />

      <Container className="relative z-10 pt-20 pb-8 lg:pt-32 lg:pb-12">
        {/* 主内容区 - 左右分栏 */}
        <div className="grid lg:grid-cols-[45%_55%] gap-12 lg:gap-8 items-center">
          {/* 左侧 - 文字内容（完全不变） */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <h1 ref={titleRef} className="mb-6">
              <div className="text-h2 md:text-h1 lg:text-hero font-semibold text-foreground-primary mb-4 hero-char-container">
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

            <p className="text-body-lg md:text-xl text-foreground-secondary mb-8 max-w-lg leading-relaxed">
              {t('hero.subtitle', '打造自然流畅的 AI 语音对话体验，支持呼入、外呼全场景，助力企业客户服务和销售转化效率提升 3 倍以上。')}
            </p>

            {/* 拨打体验 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mb-6"
            >
              <a
                href="tel:02131445977"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-background-card/50 border border-border/40 hover:border-gold/30 transition-all duration-300 group"
              >
                <Phone size={14} className="text-gold/60 group-hover:text-gold transition-colors" />
                <span className="text-sm font-mono text-foreground-secondary group-hover:text-foreground-primary transition-colors">
                  021-3144 5977
                </span>
                <span className="text-xs text-foreground-muted group-hover:text-gold/80 transition-colors">拨打体验 →</span>
              </a>
            </motion.div>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 mb-8">
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
          </motion.div>

          {/* 右侧 - 产品 Demo 实时演示面板 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <ProductDemoPanel />
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
