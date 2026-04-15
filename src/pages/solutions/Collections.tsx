/**
 * Solutions - Collections 独立页面
 * 
 * 智能催收方案：合规提醒、分级催收、语音外呼、还款计划协商
 */

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  CreditCard,
  ShieldCheck,
  Layers,
  Phone,
  Handshake,
  Brain,
  BarChart3,
  ArrowRight,
  CheckCircle
} from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Collections = () => {
  const { t } = useTranslation('solutions')

  const capabilities = [
    { key: 'complianceReminders', icon: ShieldCheck, color: 'primary-purple' },
    { key: 'tieredEscalation', icon: Layers, color: 'primary-cyan' },
    { key: 'voiceOutreach', icon: Phone, color: 'accent' },
    { key: 'paymentNegotiation', icon: Handshake, color: 'gold' },
    { key: 'accountIntelligence', icon: Brain, color: 'primary-purple' },
    { key: 'reporting', icon: BarChart3, color: 'primary-cyan' },
  ]

  const metrics = ['recovery', 'cost', 'compliance', 'contact'] as const

  return (
    <>
      <Helmet>
        <title>{t('collectionsPage.seo.title')}</title>
        <meta name="description" content={t('collectionsPage.seo.description')} />
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
                <CreditCard size={16} className="inline mr-2" />
                {t('collectionsPage.hero.badge')}
              </Badge>
              <h1 className="text-hero font-bold mb-6">{t('collectionsPage.hero.title')}</h1>
              <p className="text-body-lg text-white/80">{t('collectionsPage.hero.subtitle')}</p>
            </motion.div>
          </Container>
        </section>

        {/* Collections Capabilities */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-display font-bold text-text mb-4">
                {t('collectionsPage.capabilities.title')}
              </h2>
              <p className="text-body-lg text-text-secondary">
                {t('collectionsPage.capabilities.subtitle')}
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
                      {t(`collectionsPage.capabilities.${cap.key}.title`)}
                    </h3>
                    <p className="text-body text-text-secondary mb-4">
                      {t(`collectionsPage.capabilities.${cap.key}.description`)}
                    </p>
                    <ul className="space-y-2">
                      {(t(`collectionsPage.capabilities.${cap.key}.highlights`, { returnObjects: true }) as string[]).map(
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
                {t('collectionsPage.metrics.title')}
              </h2>
              <p className="text-body-lg text-text-secondary">
                {t('collectionsPage.metrics.subtitle')}
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
                      {t(`collectionsPage.metrics.${metric}.value`)}
                    </div>
                    <div className="text-body-sm text-text-secondary">
                      {t(`collectionsPage.metrics.${metric}.label`)}
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
              <h2 className="text-display font-bold mb-4">{t('collectionsPage.cta.title')}</h2>
              <p className="text-body-lg text-white/80 mb-8">{t('collectionsPage.cta.subtitle')}</p>
              <Link to={getLocalizedPath('/demo')}>
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={20} />}>
                  {t('collectionsPage.cta.button')}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Collections
