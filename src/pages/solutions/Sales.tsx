/**
 * Solutions - Sales 独立页面
 * 
 * 智能销售方案：线索筛选、产品推荐、自动跟进、销售漏斗分析
 */

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  ShoppingCart,
  Target,
  Package,
  RefreshCw,
  TrendingUp,
  Calendar,
  Database,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Sales = () => {
  const { t } = useTranslation('solutions')

  const capabilities = [
    { key: 'leadQualification', icon: Target, color: 'primary-purple' },
    { key: 'productRecommendation', icon: Package, color: 'primary-cyan' },
    { key: 'autoFollowUp', icon: RefreshCw, color: 'accent' },
    { key: 'funnelAnalytics', icon: TrendingUp, color: 'gold' },
    { key: 'appointmentBooking', icon: Calendar, color: 'primary-purple' },
    { key: 'crmIntegration', icon: Database, color: 'primary-cyan' },
  ]

  const metrics = ['qualified', 'conversion', 'coverage', 'cost'] as const

  return (
    <>
      <Helmet>
        <title>{t('salesPage.seo.title')}</title>
        <meta name="description" content={t('salesPage.seo.description')} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-hero text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <Badge variant="gradient" className="mb-4">
                <ShoppingCart size={16} className="inline mr-2" />
                {t('salesPage.hero.badge')}
              </Badge>
              <h1 className="text-hero font-bold mb-6">{t('salesPage.hero.title')}</h1>
              <p className="text-body-lg text-white/80">{t('salesPage.hero.subtitle')}</p>
            </motion.div>
          </Container>
        </section>

        {/* Sales Capabilities */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-display font-bold text-text mb-4">
                {t('salesPage.capabilities.title')}
              </h2>
              <p className="text-body-lg text-text-secondary">
                {t('salesPage.capabilities.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {capabilities.map((cap, index) => (
                <motion.div
                  key={cap.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="hover" padding="lg" className="h-full">
                    <div className={`w-12 h-12 rounded-xl bg-${cap.color}/10 flex items-center justify-center mb-4`}>
                      <cap.icon size={24} className={`text-${cap.color}`} />
                    </div>
                    <h3 className="text-subheading font-semibold text-text mb-3">
                      {t(`salesPage.capabilities.${cap.key}.title`)}
                    </h3>
                    <p className="text-body text-text-secondary mb-4">
                      {t(`salesPage.capabilities.${cap.key}.description`)}
                    </p>
                    <ul className="space-y-2">
                      {(t(`salesPage.capabilities.${cap.key}.highlights`, { returnObjects: true }) as string[]).map(
                        (highlight, i) => (
                          <li key={i} className="flex items-center gap-2 text-body-sm text-text-secondary">
                            <CheckCircle size={14} className="text-accent flex-shrink-0" />
                            {highlight}
                          </li>
                        )
                      )}
                    </ul>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Metrics */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-display font-bold text-text mb-4">
                {t('salesPage.metrics.title')}
              </h2>
              <p className="text-body-lg text-text-secondary">
                {t('salesPage.metrics.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {metrics.map((metric, index) => (
                <motion.div
                  key={metric}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card padding="lg" className="text-center h-full">
                    <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                      {t(`salesPage.metrics.${metric}.value`)}
                    </div>
                    <div className="text-body-sm text-text-secondary">
                      {t(`salesPage.metrics.${metric}.label`)}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-cta text-white">
          <Container>
            <div className="text-center">
              <h2 className="text-display font-bold mb-4">{t('salesPage.cta.title')}</h2>
              <p className="text-body-lg text-white/80 mb-8">{t('salesPage.cta.subtitle')}</p>
              <Link to={getLocalizedPath('/signup')}>
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={20} />}>
                  {t('salesPage.cta.button')}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Sales
