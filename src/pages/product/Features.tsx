/**
 * Product Features 独立页面
 * 
 * 展示 VoiceAI 平台六大核心功能
 */

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Mic,
  Brain,
  Heart,
  Globe,
  BarChart3,
  BookOpen,
  ArrowRight,
  CheckCircle,
  Zap
} from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Features = () => {
  const { t } = useTranslation('product')

  const capabilities = [
    {
      key: 'speechRecognition',
      icon: Mic,
      color: 'primary-purple',
    },
    {
      key: 'nlu',
      icon: Brain,
      color: 'primary-cyan',
    },
    {
      key: 'emotionDetection',
      icon: Heart,
      color: 'accent',
    },
    {
      key: 'multilingual',
      icon: Globe,
      color: 'gold',
    },
    {
      key: 'analytics',
      icon: BarChart3,
      color: 'primary-purple',
    },
    {
      key: 'knowledgeBase',
      icon: BookOpen,
      color: 'primary-cyan',
    },
  ]

  const workflowSteps = ['step1', 'step2', 'step3', 'step4'] as const

  return (
    <>
      <Helmet>
        <title>{t('featuresPage.seo.title')}</title>
        <meta name="description" content={t('featuresPage.seo.description')} />
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
              <Badge variant="gradient" className="mb-4">{t('featuresPage.hero.badge')}</Badge>
              <h1 className="text-hero font-bold mb-6">{t('featuresPage.hero.title')}</h1>
              <p className="text-body-lg text-white/80">{t('featuresPage.hero.subtitle')}</p>
            </motion.div>
          </Container>
        </section>

        {/* Core Capabilities */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-display font-bold text-text mb-4">
                {t('featuresPage.capabilities.title')}
              </h2>
              <p className="text-body-lg text-text-secondary">
                {t('featuresPage.capabilities.subtitle')}
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
                      {t(`featuresPage.capabilities.${cap.key}.title`)}
                    </h3>
                    <p className="text-body text-text-secondary mb-4">
                      {t(`featuresPage.capabilities.${cap.key}.description`)}
                    </p>
                    <ul className="space-y-2">
                      {(t(`featuresPage.capabilities.${cap.key}.highlights`, { returnObjects: true }) as string[]).map(
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

        {/* How It Works */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-display font-bold text-text mb-4">
                {t('featuresPage.workflow.title')}
              </h2>
              <p className="text-body-lg text-text-secondary">
                {t('featuresPage.workflow.subtitle')}
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Card padding="lg" className="h-full text-center relative">
                    <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center mx-auto mb-4 text-body font-bold">
                      {index + 1}
                    </div>
                    <h3 className="text-subheading font-semibold text-text mb-2">
                      {t(`featuresPage.workflow.${step}.title`)}
                    </h3>
                    <p className="text-body-sm text-text-secondary">
                      {t(`featuresPage.workflow.${step}.description`)}
                    </p>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <Zap size={16} className="text-accent" />
                      </div>
                    )}
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
              <h2 className="text-display font-bold mb-4">{t('featuresPage.cta.title')}</h2>
              <p className="text-body-lg text-white/80 mb-8">{t('featuresPage.cta.subtitle')}</p>
              <Link to={getLocalizedPath('/signup')}>
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={20} />}>
                  {t('featuresPage.cta.button')}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Features
