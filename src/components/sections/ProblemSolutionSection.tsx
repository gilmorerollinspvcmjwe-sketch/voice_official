/**
 * ProblemSolutionSection - 传统呼叫中心的困境 vs AI解决方案
 * 
 * 特效升级：
 * - 3D 翻转卡片（正面=问题，背面=方案）
 * - GlowCard 鼠标跟随光效
 * - ParticleBackground 粒子网络（红色=混乱 vs 绿色=秩序）
 * - Grid 布局，3列展示
 */

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState, useCallback, useRef } from 'react'
import { 
  Phone, Clock, Users, BarChart3, Globe,
  Bot, Zap, Target, Star,
  type LucideIcon
} from 'lucide-react'
import { Container } from '@/components/common'
import { ParticleBackground } from '@/components/effects/ParticleBackground'

// ==================== 数据 ====================

const items: Array<{
  icon: LucideIcon
  problemTitle: { en: string; zh: string }
  problemDesc: { en: string; zh: string }
  solutionIcon: LucideIcon
  solutionTitle: { en: string; zh: string }
  solutionDesc: { en: string; zh: string }
}> = [
  {
    icon: Phone,
    problemTitle: { en: 'High Labor Costs', zh: '高昂人力成本' },
    problemDesc: { en: 'Each agent costs $40,000+/year, labor costs remain high', zh: '每位客服年成本 $40,000+，人力成本居高不下' },
    solutionIcon: Bot,
    solutionTitle: { en: 'AI Agent Replacement', zh: 'AI 智能体替代' },
    solutionDesc: { en: 'Replace 80% of repetitive work, reduce costs by 60%+', zh: '替代 80% 重复工作，成本降低 60% 以上' },
  },
  {
    icon: Clock,
    problemTitle: { en: '24/7 Coverage Difficulty', zh: '24/7 覆盖困难' },
    problemDesc: { en: 'Unable to handle night and holiday inquiries, long customer wait times', zh: '无法处理夜间和节假日咨询，客户等待时间长' },
    solutionIcon: Zap,
    solutionTitle: { en: '24/7 Service', zh: '全天候服务' },
    solutionDesc: { en: 'Non-stop 24/7 response, always meeting customer needs', zh: '24/7 无间断响应，随时满足客户需求' },
  },
  {
    icon: Users,
    problemTitle: { en: 'High Employee Turnover', zh: '高员工流失率' },
    problemDesc: { en: 'Average tenure only 6-12 months, high training costs', zh: '平均任期仅 6-12 个月，培训成本高' },
    solutionIcon: Target,
    solutionTitle: { en: 'Zero Training Cost', zh: '零培训成本' },
    solutionDesc: { en: 'Deploy in minutes, ready to work immediately, no training cycle needed', zh: '分钟级部署，即刻上岗，无需培训周期' },
  },
  {
    icon: BarChart3,
    problemTitle: { en: 'Inconsistent Service Quality', zh: '服务质量不稳定' },
    problemDesc: { en: 'Call quality varies, inconsistent customer experience', zh: '每次通话质量参差不齐，客户体验不一致' },
    solutionIcon: Star,
    solutionTitle: { en: '100% Consistency', zh: '100% 一致性' },
    solutionDesc: { en: 'Every call executed perfectly, stable service quality', zh: '每一通电话都完美执行，服务品质稳定' },
  },
  {
    icon: Globe,
    problemTitle: { en: 'Limited Multi-language Support', zh: '多语言支持有限' },
    problemDesc: { en: 'Difficult to serve international customers, obvious language barriers', zh: '难以服务国际化客户，语言壁垒明显' },
    solutionIcon: Globe,
    solutionTitle: { en: '50+ Languages Supported', zh: '50+ 语言支持' },
    solutionDesc: { en: 'Reach global customers without barriers, seamless multi-language switching', zh: '触达全球客户无障碍，多语言无缝切换' },
  },
  {
    icon: Phone,
    problemTitle: { en: 'Difficult Data Collection', zh: '数据收集困难' },
    problemDesc: { en: 'Call data cannot be structured, lacks real-time analysis capabilities', zh: '通话数据无法结构化，缺少实时分析能力' },
    solutionIcon: BarChart3,
    solutionTitle: { en: 'Real-time Data Insights', zh: '实时数据洞察' },
    solutionDesc: { en: 'Automatic call content analysis, instant business insights', zh: '通话内容自动分析，业务洞察即时生成' },
  },
]

// ==================== FlipCard 子组件 ====================

function ProblemSolutionCard({
  icon: ProblemIcon,
  problemTitle,
  problemDesc,
  solutionIcon: SolutionIcon,
  solutionTitle,
  solutionDesc,
  delay = 0,
}: {
  icon: LucideIcon
  problemTitle: { en: string; zh: string }
  problemDesc: { en: string; zh: string }
  solutionIcon: LucideIcon
  solutionTitle: { en: string; zh: string }
  solutionDesc: { en: string; zh: string }
  delay?: number
}) {
  const { i18n } = useTranslation()
  const currentLocale = i18n.language === 'zh' ? 'zh' : 'en'
  const [isFlipped, setIsFlipped] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="relative h-64 cursor-pointer perspective-800"
        style={{ perspective: '800px' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }}
          animate={{ rotateY: isFlipped ? 180 : 0 }}
        >
          {/* ========== 正面：问题 ========== */}
          <div
            ref={cardRef}
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
          >
            {/* 背景 */}
            <div className="absolute inset-0 bg-background-card border border-red-500/20 rounded-2xl" />
            
            {/* 鼠标跟随光效 */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(239,68,68,0.15), transparent 50%)`,
                opacity: 1,
              }}
            />

            {/* 内容 */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
              {/* 红色问题图标 */}
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                <ProblemIcon className="w-8 h-8 text-red-400" />
              </div>

              <h3 className="text-xl font-semibold text-foreground-primary mb-2">
                {problemTitle[currentLocale]}
              </h3>
              <p className="text-foreground-muted text-sm leading-relaxed mb-4">
                {problemDesc[currentLocale]}
              </p>

              {/* 翻转提示 */}
              <span className="text-xs text-red-400/60 flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 1l4 4-4 4" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <path d="M7 23l-4-4 4-4" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
                Hover to see solution
              </span>
            </div>

            {/* 红色光晕 */}
            <div className="absolute -inset-1 bg-gradient-to-br from-red-500/5 via-transparent to-transparent rounded-2xl -z-10" />
          </div>

          {/* ========== 背面：方案 ========== */}
          <div
            className="absolute inset-0 rounded-2xl overflow-hidden"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* 背景 */}
            <div className="absolute inset-0 bg-background-card border border-accent-lime/30 rounded-2xl" />

            {/* 鼠标跟随光效 */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(212,255,0,0.12), transparent 50%)`,
              }}
            />

            {/* 内容 */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full p-6 text-center">
              {/* 绿色方案图标 */}
              <div className="w-16 h-16 rounded-2xl bg-accent-lime/10 border border-accent-lime/20 flex items-center justify-center mb-4">
                <SolutionIcon className="w-8 h-8 text-accent-lime" />
              </div>

              <h3 className="text-xl font-semibold text-accent-lime mb-2">
                {solutionTitle[currentLocale]}
              </h3>
              <p className="text-foreground-secondary text-sm leading-relaxed">
                {solutionDesc[currentLocale]}
              </p>

              {/* 成功标记 */}
              <div className="mt-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-lime/10 border border-accent-lime/20">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-accent-lime">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-xs text-accent-lime">Solved</span>
              </div>
            </div>

            {/* 绿色光晕 */}
            <div className="absolute -inset-1 bg-gradient-to-br from-accent-lime/5 via-transparent to-transparent rounded-2xl -z-10" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

// ==================== 主组件 ====================

const ProblemSolutionSection = () => {
  const { t } = useTranslation('home')

  return (
    <section className="relative py-20 md:py-24 bg-background-primary overflow-hidden">
      {/* 粒子背景 */}
      <ParticleBackground
        particleCount={40}
        particleColor="#EF4444"
        connectionDistance={120}
        speed={0.3}
        className="absolute inset-0 opacity-20"
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-h2 md:text-h1 font-semibold text-foreground-primary mb-4">
            {t('problem.title', 'The Dilemma of Traditional Call Centers')}
          </h2>
          <p className="text-body-lg text-foreground-secondary max-w-2xl mx-auto">
            {t('problem.subtitle', 'Are you facing these challenges?')}
          </p>

          {/* 分隔线 + VS */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-24 h-px bg-gradient-to-r from-transparent to-red-500/50" />
            <div className="px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
              PROBLEM
            </div>
            <div className="text-foreground-muted text-sm">→</div>
            <div className="px-4 py-1.5 rounded-full bg-accent-lime/10 border border-accent-lime/20 text-accent-lime text-sm font-medium">
              SOLUTION
            </div>
            <div className="w-24 h-px bg-gradient-to-r from-accent-lime/50 to-transparent" />
          </div>
        </motion.div>

        {/* Grid: 3列 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {items.map((item, index) => (
            <ProblemSolutionCard
              key={index}
              icon={item.icon}
              problemTitle={item.problemTitle}
              problemDesc={item.problemDesc}
              solutionIcon={item.solutionIcon}
              solutionTitle={item.solutionTitle}
              solutionDesc={item.solutionDesc}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* 底部提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-caption text-foreground-muted flex items-center justify-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500/50" />
            Hover a card to reveal the AI solution
            <span className="inline-block w-2 h-2 rounded-full bg-accent-lime/50" />
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

export default ProblemSolutionSection
