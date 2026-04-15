/**
 * MetricsSection - 数据展示区域
 * 6大核心能力卡片 + 大数字展示
 * 荧光绿数据强调 + 悬停光效
 * 
 * 📝 TODO(老徐): 数据可从后端 API 获取实时更新
 */

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import { Container } from '@/components/common'
import { GradientText } from '@/components/effects/GradientText'
import { AnimatedCounter } from '@/components/effects/AnimatedCounter'

interface Metric {
  id: string
  value: number
  suffix?: string
  prefix?: string
  label: string
  description?: string
}

// 📝 TODO(老徐): 替换为真实数据
const metrics: Metric[] = [
  {
    id: 'csat',
    value: 15,
    suffix: 'pt',
    label: 'CSAT 提升',
    description: '客户满意度显著提升',
  },
  {
    id: 'revenue',
    value: 7.2,
    suffix: 'M',
    prefix: '$',
    label: '年度节省',
    description: '运营成本大幅降低',
  },
  {
    id: 'cost',
    value: 60,
    suffix: '%',
    label: '成本降低',
    description: '人力成本优化',
  },
  {
    id: 'resolution',
    value: 75,
    suffix: '%',
    label: '问题解决率',
    description: 'AI 自动处理比例',
  },
  {
    id: 'latency',
    value: 200,
    suffix: 'ms',
    prefix: '<',
    label: '响应延迟',
    description: '实时语音交互',
  },
  {
    id: 'availability',
    value: 99.9,
    suffix: '%',
    label: '可用性',
    description: '全年稳定运行',
  },
]

const MetricsSection = () => {
  const { t } = useTranslation('home')
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
              {t('metrics.title', '数据驱动，效果显著')}
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
              {/* 大数字 - 使用 AnimatedCounter */}
              <div className="metric-value group-hover:scale-105 transition-transform duration-300">
                <GradientText
                  colors={['#D4FF00', '#00FF88', '#D4FF00']}
                  animated
                  speed={3}
                  className="text-metric-lg"
                >
                  {metric.prefix && <span className="text-2xl">{metric.prefix}</span>}
                  {/* 使用 AnimatedCounter 组件实现数字滚动动画 */}
                  <AnimatedCounter
                    value={metric.value}
                    duration={2}
                    decimals={metric.value % 1 !== 0 ? 1 : 0}
                  />
                  {metric.suffix && <span className="text-2xl">{metric.suffix}</span>}
                </GradientText>
              </div>

              {/* 标签 */}
              <div className="metric-label">{t(`metrics.${metric.id}.label`, metric.label)}</div>

              {/* 描述 */}
              {metric.description && (
                <div className="text-caption text-foreground-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {t(`metrics.${metric.id}.description`, metric.description)}
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
            * 数据来源：2024-2025 年客户案例统计平均值
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

export default MetricsSection
