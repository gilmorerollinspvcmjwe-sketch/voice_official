import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import {
  HeroSection,
  SocialProofSection,
  ProblemSolutionSection,
  FeaturesSection,
  HowItWorksSection,
  AudioDemoSection,
  UseCasesSection,
  IntegrationsSection,
  TestimonialsSection,
  SecuritySection,
  CTASection,
} from '@/components/sections'
import MetricsSection from '@/components/sections/MetricsSection'
import PricingSection from '@/components/sections/PricingSection'

const Home = () => {
  const { t } = useTranslation('seo')

  return (
    <>
      <Helmet>
        <title>{t('home.title')}</title>
        <meta name="description" content={t('home.description')} />
        <meta property="og:title" content={t('home.title')} />
        <meta property="og:description" content={t('home.description')} />
        <link rel="alternate" hrefLang="en" href="https://example.com/" />
        <link rel="alternate" hrefLang="zh" href="https://example.com/zh/" />
        <link rel="alternate" hrefLang="x-default" href="https://example.com/" />
      </Helmet>

      <div className="bg-background-primary">
        {/* Hero 区域 - 全新重设计 */}
        <HeroSection />

        {/* 社会证明 - 客户 Logo 墙 */}
        <SocialProofSection />

        {/* 数据指标 - 新增：6大核心能力卡片 */}
        <MetricsSection />

        {/* 问题解决方案 */}
        <ProblemSolutionSection />

        {/* 功能特性 - 更新：3x2 网格 + 横向滚动 */}
        <FeaturesSection />

        {/* 工作原理 */}
        <HowItWorksSection />

        {/* 音频演示 */}
        <AudioDemoSection />

        {/* 应用场景 */}
        <UseCasesSection />

        {/* 集成 */}
        <IntegrationsSection />

        {/* 客户案例 - 更新：金色边框证言卡片 */}
        <TestimonialsSection />

        {/* 定价 - 新增：三栏对比 */}
        <PricingSection />

        {/* 安全 */}
        <SecuritySection />

        {/* CTA */}
        <CTASection />
      </div>
    </>
  )
}

export default Home