/**
 * TTS 客户案例组件
 * 
 * 展示客户使用 TTS 的真实案例和效果
 */

import { useTranslation } from 'react-i18next';
import { 
  Building2, 
  TrendingDown, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Quote
} from 'lucide-react';
import { Badge, Card } from '@/components/common';

interface TTSTestimonial {
  customer: {
    name: string;
    logo: string;
    industry: string;
  };
  quote: string;
  author: string;
  title: string;
  metrics: {
    label: string;
    value: string;
    trend?: 'up' | 'down';
  }[];
}

const testimonials: TTSTestimonial[] = [
  {
    customer: {
      name: '某电商平台',
      logo: '/images/customers/ecommerce.png',
      industry: '电商'
    },
    quote: '接入 AI 语音后，客服成本降低 60%，客户满意度提升 35%，客户完全听不出是 AI',
    author: '张总',
    title: '客服总监',
    metrics: [
      { label: '成本降低', value: '60%', trend: 'down' },
      { label: '满意度提升', value: '35%', trend: 'up' },
      { label: '响应速度', value: '<1s' }
    ]
  },
  {
    customer: {
      name: '某金融机构',
      logo: '/images/customers/finance.png',
      industry: '金融'
    },
    quote: 'AI 语音的专业度超出预期，客户完全听不出是 AI，外呼效率提升 10 倍',
    author: '李总',
    title: '数字化转型负责人',
    metrics: [
      { label: '外呼效率', value: '10x', trend: 'up' },
      { label: '意向筛选', value: '85%', trend: 'up' },
      { label: '合规率', value: '100%' }
    ]
  },
  {
    customer: {
      name: '某教育平台',
      logo: '/images/customers/education.png',
      industry: '教育'
    },
    quote: 'AI 语音让课程内容更生动，学生参与度提升 40%，制作成本降低 70%',
    author: '王老师',
    title: '课程研发负责人',
    metrics: [
      { label: '学生参与', value: '40%', trend: 'up' },
      { label: '制作效率', value: '5x', trend: 'up' },
      { label: '成本节省', value: '70%', trend: 'down' }
    ]
  },
  {
    customer: {
      name: '某游戏公司',
      logo: '/images/customers/game.png',
      industry: '游戏'
    },
    quote: 'AI 语音让 NPC 更有生命力，玩家沉浸感提升 50%，对话选项无限扩展',
    author: '陈总',
    title: '游戏制作人',
    metrics: [
      { label: '玩家沉浸', value: '50%', trend: 'up' },
      { label: '对话选项', value: '∞' },
      { label: '开发效率', value: '10x', trend: 'up' }
    ]
  }
];

export function TTSTestimonials() {
  const { t } = useTranslation('ttsDemo');

  return (
    <div className="w-full">
      {/* 标题 */}
      <div className="text-center mb-12">
        <Badge variant="accent" className="mb-4">{t('testimonials.title', 'Customer Stories')}</Badge>
        <h2 className="text-h2 font-bold text-foreground-primary mb-4">
          {t('testimonials.title', 'Customer Stories')}
        </h2>
        <p className="text-foreground-secondary max-w-2xl mx-auto">
          {t('testimonials.subtitle', 'Real use cases from e-commerce, finance, education, gaming and other industries')}
        </p>
      </div>

      {/* 客户案例卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial) => (
          <Card key={testimonial.customer.name} variant="hover" padding="lg" className="h-full">
            {/* 客户信息 */}
            <div className="flex items-center gap-4 mb-6">
              {/* Logo 占位 */}
              <div className="w-12 h-12 rounded-xl bg-background-elevated flex items-center 
                              justify-center overflow-hidden border border-border">
                <Building2 className="w-6 h-6 text-foreground-muted" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground-primary">
                  {testimonial.customer.name}
                </h3>
                <p className="text-sm text-foreground-muted">
                  {testimonial.customer.industry}
                </p>
              </div>
            </div>

            {/* 引用 */}
            <div className="relative mb-6 p-4 bg-background-secondary rounded-lg border border-border">
              <Quote className="absolute top-3 left-3 w-5 h-5 text-primary-purple/30" />
              <p className="text-foreground-secondary leading-relaxed pl-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
            </div>

            {/* 数据指标 */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {testimonial.metrics.map((metric, i) => (
                <div key={i} className="text-center p-3 bg-background-secondary rounded-lg border border-border">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    {metric.trend === 'up' && (
                      <TrendingUp className="w-4 h-4 text-success" />
                    )}
                    {metric.trend === 'down' && (
                      <TrendingDown className="w-4 h-4 text-primary-purple" />
                    )}
                    <span className="text-xl font-bold text-foreground-primary">
                      {metric.value}
                    </span>
                  </div>
                  <p className="text-caption text-foreground-muted">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>

            {/* 作者信息 */}
            <div className="flex items-center gap-3 pt-4 border-t border-border">
              <div className="w-10 h-10 rounded-full bg-primary-purple/10 flex items-center 
                              justify-center">
                <CheckCircle className="w-5 h-5 text-primary-purple" />
              </div>
              <div>
                <p className="font-medium text-foreground-primary">{testimonial.author}</p>
                <p className="text-sm text-foreground-muted">{testimonial.title}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 统计汇总 */}
      <div className="mt-12 bg-gradient-primary rounded-2xl p-8 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: t('testimonials.summary.customers.label', 'Enterprise Customers'), value: '500+', icon: <Building2 className="w-6 h-6" /> },
            { label: t('testimonials.summary.calls.label', 'Monthly Calls'), value: '10M+', icon: <Clock className="w-6 h-6" /> },
            { label: t('testimonials.summary.satisfaction.label', 'Avg Satisfaction'), value: '95%', icon: <CheckCircle className="w-6 h-6" /> },
            { label: t('testimonials.summary.costReduction.label', 'Cost Reduction'), value: '60%', icon: <TrendingDown className="w-6 h-6" /> }
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center 
                              justify-center mx-auto mb-3">
                {stat.icon}
              </div>
              <p className="text-3xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 行业分布 */}
      <div className="mt-12 bg-background-card rounded-2xl border border-border p-8">
        <h3 className="text-xl font-semibold text-foreground-primary mb-6 text-center">
          {t('testimonials.industryDistribution', 'Industry Customer Distribution')}
        </h3>
        
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: t('testimonials.industry.ecommerce', 'E-commerce'), count: 120, color: 'bg-orange-500' },
            { name: t('testimonials.industry.finance', 'Finance'), count: 85, color: 'bg-blue-500' },
            { name: t('testimonials.industry.education', 'Education'), count: 60, color: 'bg-green-500' },
            { name: t('testimonials.industry.gaming', 'Gaming'), count: 45, color: 'bg-purple-500' },
            { name: t('testimonials.industry.healthcare', 'Healthcare'), count: 35, color: 'bg-red-500' },
            { name: t('testimonials.industry.other', 'Other'), count: 155, color: 'bg-foreground-muted' }
          ].map((industry) => (
            <div
              key={industry.name}
              className="text-center p-4 bg-background-secondary rounded-lg border border-border 
                         hover:bg-background-elevated transition-colors"
            >
              <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${industry.color}`}>
                <span className="text-white text-xs font-bold">
                  {industry.count}
                </span>
              </div>
              <p className="text-sm font-medium text-foreground-secondary">
                {industry.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
