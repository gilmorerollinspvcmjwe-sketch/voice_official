/**
 * TestimonialsSection - 客户案例展示
 * 金色边框证言卡片 + InfiniteCarousel Logo 墙
 */

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Quote, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Container } from '@/components/common'
import { GradientText } from '@/components/effects/GradientText'
import { TestimonialCarousel } from '@/components/effects/InfiniteCarousel'
import { testimonials } from '@/data/testimonials'
import { getLocalizedPath } from '@/utils'

const TestimonialsSection = () => {
  const { t, i18n } = useTranslation('home')

  // 示例案例数据
  const caseStudies = [
    {
      id: 'case1',
      company: '某知名电商',
      title: '如何通过 AI Voice Agent 提升 40% 客户转化率',
      quote: {
        en: 'Using AI Voice Agent, our customer service efficiency increased by 3x, and satisfaction rose from 75% to 92%.',
        zh: '使用 AI Voice Agent 后，我们的客服效率提升了 3 倍，客户满意度从 75% 提升到了 92%。',
      },
      author: {
        name: '张经理',
        title: '客户成功总监',
        avatar: null,
      },
      metrics: [
        { value: '40%', label: '转化率提升' },
        { value: '3x', label: '效率提升' },
        { value: '92%', label: '满意度' },
      ],
    },
    {
      id: 'case2',
      company: '某金融银行',
      title: '智能语音客服实现 7x24 小时无间断服务',
      quote: {
        en: 'The AI voice system handles 80% of routine inquiries, freeing our agents to focus on complex cases.',
        zh: 'AI 语音系统处理了 80% 的常规咨询，让我们的客服专员能专注于复杂案例。',
      },
      author: {
        name: '李总监',
        title: '运营总监',
        avatar: null,
      },
      metrics: [
        { value: '80%', label: '自动处理' },
        { value: '24/7', label: '全天候' },
        { value: '-60%', label: '成本降低' },
      ],
    },
  ]

  return (
    <section className="relative py-24 bg-background-secondary overflow-hidden">
      {/* 背景光效 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary-purple/5 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="section-header"
        >
          {/* 标签 */}
          <div className="inline-block px-4 py-2 bg-gold/10 border border-gold/20 rounded-lg mb-4">
            <span className="text-caption font-medium text-gold uppercase tracking-wider">
              CASE STUDY
            </span>
          </div>

          <h2 className="section-title">
            <GradientText metallic direction="diagonal" speed={4}>
              {t('testimonials.title', '客户成功案例')}
            </GradientText>
          </h2>
          <p className="section-subtitle">
            {t('testimonials.subtitle', '看看企业如何通过 AI Voice Agent 提升业务价值')}
          </p>
        </motion.div>

        {/* Featured Case Study */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="testimonial-card relative max-w-4xl mx-auto">
            {/* 引号装饰 */}
            <Quote className="testimonial-quote" />

            {/* 标题 */}
            <h3 className="text-h3 font-semibold text-foreground-primary mb-4 pl-8">
              {i18n.language === 'zh'
                ? caseStudies[0].title
                : caseStudies[0].title}
            </h3>

            {/* 证言内容 */}
            <p className="text-body-lg text-foreground-secondary mb-6 pl-8 leading-relaxed italic">
              "{i18n.language === 'zh'
                ? caseStudies[0].quote.zh
                : caseStudies[0].quote.en}"
            </p>

            {/* 作者信息 */}
            <div className="flex items-center gap-4 pl-8 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-semibold text-lg">
                  {caseStudies[0].author.name.charAt(0)}
                </span>
              </div>
              <div>
                <h4 className="text-subheading font-semibold text-foreground-primary">
                  {caseStudies[0].author.name}
                </h4>
                <p className="text-body text-foreground-muted">
                  {caseStudies[0].author.title}, {caseStudies[0].company}
                </p>
              </div>
            </div>

            {/* 数据指标 */}
            <div className="flex items-center gap-6 pl-8">
              {caseStudies[0].metrics.map((metric, index) => (
                <div
                  key={index}
                  className="px-4 py-3 bg-background-card/50 rounded-xl border border-border"
                >
                  <span className="text-xl font-bold text-accent-lime">{metric.value}</span>
                  <span className="text-caption text-foreground-muted ml-2">{metric.label}</span>
                </div>
              ))}
            </div>

            {/* Hover 光效 */}
            <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5 opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-r-2xl" />
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <TestimonialCarousel 
            testimonials={testimonials.slice(0, 4).map(t => ({
              id: t.id,
              quote: i18n.language === 'zh' ? t.quote.zh : t.quote.en,
              author: t.author.name,
              role: t.author.title,
              company: t.author.company,
              avatar: t.author.avatar
            }))} 
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to={getLocalizedPath('/customers')}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gold/10 text-gold font-medium rounded-lg hover:bg-gold/20 transition-colors"
            >
              {t('testimonials.cta', '查看更多案例')}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </motion.div>

        {/* 数据来源提示 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6"
        >
          <p className="text-caption text-foreground-muted">
            📁 添加客户证言数据: <code>src/data/testimonials.ts</code>
          </p>
        </motion.div>
      </Container>
    </section>
  )
}

export default TestimonialsSection