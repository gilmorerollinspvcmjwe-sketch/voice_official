/**
 * MetricsSection - 数据展示区域
 * 合并了 SocialProofSection 的客户 Logo 墙
 * 客户 Logo 两行横向滚动 + 6 大核心能力卡片 + 渐变文字动画
 * 
 * 📝 TODO(老徐): 数据可从后端 API 获取实时更新
 */

import { useTranslation } from 'react-i18next'
import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Container } from '@/components/common'
import { GradientText } from '@/components/effects/GradientText'

/** 内联数字滚动组件 — 纯 <span> 保证和 prefix/suffix 一行 */
function InlineCounter({ value, decimals = 0, duration = 2 }: { value: number; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    let startTime: number | null = null
    const step = (time: number) => {
      if (!startTime) startTime = time
      const progress = Math.min((time - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(value * eased)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, value, duration])

  return (
    <span ref={ref}>
      {count.toFixed(decimals)}
    </span>
  )
}

// ==================== 客户 Logo ====================

const intlLogos = [
  { name: 'Walmart', file: 'walmart.svg' },
  { name: 'UPS', file: 'ups.svg' },
  { name: 'FedEx', file: 'fedex.svg' },
  { name: 'Bank of America', file: 'bankofamerica.svg' },
  { name: 'Visa', file: 'visa.svg' },
  { name: 'Mastercard', file: 'mastercard.svg' },
  { name: 'PayPal', file: 'paypal.svg' },
  { name: 'Accenture', file: 'accenture.svg' },
  { name: 'IBM', file: 'ibm.svg' },
  { name: 'Cisco', file: 'cisco.svg' },
  { name: 'Oracle', file: 'oracle.svg' },
  { name: 'SAP', file: 'sap.svg' },
  { name: 'Toyota', file: 'toyota.svg' },
  { name: 'Samsung', file: 'samsung.svg' },
  { name: "McDonald's", file: 'mcdonalds.svg' },
]

const cnLogos = [
  { name: '工商银行', file: 'icbc.ico' },
  { name: '中国银行', file: 'bank-of-china.ico' },
  { name: '建设银行', file: 'china-construction-bank.ico' },
  { name: '平安保险', file: 'pingan.ico' },
  { name: '中国移动', file: 'china-mobile.ico' },
  { name: '中国电信', file: 'china-telecom.ico' },
  { name: '华为', file: 'huawei.ico' },
  { name: '小米', file: 'xiaomi.ico' },
  { name: '美团', file: 'meituan.ico' },
  { name: '滴滴出行', file: 'didichuxing.ico' },
  { name: '中国人寿', file: 'china-life.ico' },
]

// ==================== 数据指标 ====================

interface Metric {
  id: string
  value: number
  suffix?: string
  prefix?: string
  label: { en: string; zh: string }
  description?: { en: string; zh: string }
}

// 📝 TODO(老徐): 替换为真实数据
const metrics: Metric[] = [
  {
    id: 'csat',
    value: 15,
    suffix: 'pt',
    label: { en: 'CSAT Improvement', zh: 'CSAT 提升' },
    description: { en: 'Customer satisfaction significantly improved', zh: '客户满意度显著提升' },
  },
  {
    id: 'revenue',
    value: 7.2,
    suffix: 'M',
    prefix: '$',
    label: { en: 'Annual Savings', zh: '年度节省' },
    description: { en: 'Significant reduction in operating costs', zh: '运营成本大幅降低' },
  },
  {
    id: 'cost',
    value: 60,
    suffix: '%',
    label: { en: 'Cost Reduction', zh: '成本降低' },
    description: { en: 'Labor cost optimization', zh: '人力成本优化' },
  },
  {
    id: 'resolution',
    value: 75,
    suffix: '%',
    label: { en: 'Resolution Rate', zh: '问题解决率' },
    description: { en: 'AI automated handling ratio', zh: 'AI 自动处理比例' },
  },
  {
    id: 'latency',
    value: 200,
    suffix: 'ms',
    prefix: '<',
    label: { en: 'Response Latency', zh: '响应延迟' },
    description: { en: 'Real-time voice interaction', zh: '实时语音交互' },
  },
  {
    id: 'availability',
    value: 99.9,
    suffix: '%',
    label: { en: 'Availability', zh: '可用性' },
    description: { en: 'Stable operation throughout the year', zh: '全年稳定运行' },
  },
]

const MetricsSection = () => {
  const { t, i18n } = useTranslation('home')
  const currentLocale = i18n.language === 'zh' ? 'zh' : 'en'
  const ref = useRef(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section ref={ref} className="relative py-24 bg-background-secondary overflow-hidden">
      {/* 背景光效 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent-lime/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/2 right-1/4 w-96 h-96 bg-primary-purple/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">

        {/* ===== 客户 Logo 轮播 ===== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-body text-foreground-muted mb-8">
            {t('socialProof.title', 'Trusted by 500+ enterprises worldwide')}
          </p>

          {/* 国际客户 - 向右滚动 */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none
              bg-gradient-to-r from-background-secondary to-transparent" />
            <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none
              bg-gradient-to-l from-background-secondary to-transparent" />
            <motion.div
              className="flex items-center gap-8"
              initial={{ x: 0 }}
              animate={{ x: '-50%' }}
              transition={{
                x: { repeat: Infinity, repeatType: 'loop', duration: 35, ease: 'linear' },
              }}
              style={{ width: 'max-content' }}
            >
              {[...intlLogos, ...intlLogos].map((logo, idx) => (
                <div
                  key={`intl-${idx}`}
                  className="flex-shrink-0 w-24 h-10 flex items-center justify-center
                    opacity-40 hover:opacity-70 transition-opacity duration-200"
                >
                  <img
                    src={`/logos/${logo.file}`}
                    alt={logo.name}
                    className="max-w-[80px] max-h-[32px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* 中国客户 - 向左滚动 */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none
              bg-gradient-to-r from-background-secondary to-transparent" />
            <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none
              bg-gradient-to-l from-background-secondary to-transparent" />
            <motion.div
              className="flex items-center gap-8"
              initial={{ x: '-50%' }}
              animate={{ x: 0 }}
              transition={{
                x: { repeat: Infinity, repeatType: 'loop', duration: 30, ease: 'linear' },
              }}
              style={{ width: 'max-content' }}
            >
              {[...cnLogos, ...cnLogos].map((logo, idx) => (
                <div
                  key={`cn-${idx}`}
                  className="flex-shrink-0 w-24 h-10 flex items-center justify-center
                    opacity-40 hover:opacity-70 transition-opacity duration-200"
                >
                  <img
                    src={`/logos/${logo.file}`}
                    alt={logo.name}
                    className="max-w-[80px] max-h-[32px] object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>

        {/* ===== 数据指标 ===== */}
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2 className="section-title">
            <GradientText metallic direction="diagonal" speed={4}>
              {t('metrics.title', 'Data-driven, significant results')}
            </GradientText>
          </h2>
          <p className="section-subtitle">
            {t('metrics.subtitle', 'AI Voice Agent 为企业带来可量化的业务价值')}
          </p>
        </motion.div>

        {/* Metrics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.id}
              variants={itemVariants}
              className="metric-card group"
            >
              {/* 大数字 */}
              <div className="metric-value group-hover:scale-105 transition-transform duration-300 flex items-baseline justify-center">
                <GradientText
                  colors={['#D4FF00', '#00FF88', '#D4FF00']}
                  animated
                  speed={3}
                  className="text-metric-lg whitespace-nowrap"
                >
                  {metric.prefix && <span className="text-2xl">{metric.prefix}</span>}
                  <InlineCounter
                    value={metric.value}
                    duration={2}
                    decimals={metric.value % 1 !== 0 ? 1 : 0}
                  />
                  {metric.suffix && <span className="text-2xl">{metric.suffix}</span>}
                </GradientText>
              </div>

              {/* 标签 */}
              <div className="metric-label">{t(`metrics.${metric.id}.label`, metric.label[currentLocale])}</div>

              {/* 描述 */}
              {metric.description && (
                <div className="text-caption text-foreground-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t(`metrics.${metric.id}.description`, metric.description[currentLocale])}
                </div>
              )}

              {/* Hover 光效 */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-accent-lime/0 via-accent-lime/5 to-accent-lime/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </motion.div>

        {/* 底部说明 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-body-sm text-foreground-muted">
            {/* 📝 TODO(老徐): 数据可从后端 API 获取实时更新 */}
            {currentLocale === 'zh' ? '* 数据来源：2024-2025 年客户案例统计平均值' : '* Data source: Average from 2024-2025 customer case studies'}
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

export default MetricsSection
