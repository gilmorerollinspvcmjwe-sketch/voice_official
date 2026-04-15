/**
 * Product Technology 独立页面
 * 
 * 展示 VoiceAI 技术架构：大模型底座、流式处理、TTS引擎、低延迟架构、分布式部署
 */

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Brain,
  Radio,
  Volume2,
  Zap,
  Server,
  ArrowRight,
  CheckCircle,
  Layers
} from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Technology = () => {
  const { t } = useTranslation('product')

  const stackItems = [
    { key: 'foundationModel', icon: Brain, color: 'primary-purple' },
    { key: 'streaming', icon: Radio, color: 'primary-cyan' },
    { key: 'ttsEngine', icon: Volume2, color: 'accent' },
    { key: 'lowLatency', icon: Zap, color: 'gold' },
    { key: 'distributed', icon: Server, color: 'primary-purple' },
  ]

  const architectureLayers = ['ingress', 'processing', 'data', 'infra'] as const

  const benchmarks = ['latency', 'accuracy', 'uptime', 'concurrent'] as const

  return (
    <>
      <Helmet>
        <title>{t('technologyPage.seo.title')}</title>
        <meta name="description" content={t('technologyPage.seo.description')} />
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
              <Badge variant="gradient" className="mb-4">{t('technologyPage.hero.badge')}</Badge>
              <h1 className="text-hero font-bold mb-6">{t('technologyPage.hero.title')}</h1>
              <p className="text-body-lg text-white/80">{t('technologyPage.hero.subtitle')}</p>
            </motion.div>
          </Container>
        </section>

        {/* Technology Stack */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-display font-bold text-text mb-4">
                {t('technologyPage.stack.title')}
              </h2>
              <p className="text-body-lg text-text-secondary">
                {t('technologyPage.stack.subtitle')}
              </p>
            </motion.div>

            <div className="space-y-6">
              {stackItems.map((item, index) => (
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card padding="lg" className="h-full">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-shrink-0">
                        <div className={`w-14 h-14 rounded-xl bg-${item.color}/10 flex items-center justify-center`}>
                          <item.icon size={28} className={`text-${item.color}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-subheading font-semibold text-text mb-2">
                          {t(`technologyPage.stack.${item.key}.title`)}
                        </h3>
                        <p className="text-body text-text-secondary mb-4">
                          {t(`technologyPage.stack.${item.key}.description`)}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(t(`technologyPage.stack.${item.key}.specs`, { returnObjects: true }) as string[]).map(
                            (spec, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background-secondary text-body-sm text-text-secondary"
                              >
                                <CheckCircle size={12} className="text-accent" />
                                {spec}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Architecture Diagram */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-display font-bold text-text mb-4">
                {t('technologyPage.architecture.title')}
              </h2>
              <p className="text-body-lg text-text-secondary">
                {t('technologyPage.architecture.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card padding="lg">
                <div className="space-y-4">
                  {architectureLayers.map((layer, index) => (
                    <motion.div
                      key={layer}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 }}
                      className={`flex items-center gap-4 p-4 rounded-xl ${
                        index === 0 ? 'bg-primary-purple/10 border border-primary-purple/20' :
                        index === 1 ? 'bg-primary-cyan/10 border border-primary-cyan/20' :
                        index === 2 ? 'bg-accent/10 border border-accent/20' :
                        'bg-gold/10 border border-gold/20'
                      }`}
                    >
                      <Layers size={20} className={
                        index === 0 ? 'text-primary-purple' :
                        index === 1 ? 'text-primary-cyan' :
                        index === 2 ? 'text-accent' :
                        'text-gold'
                      } />
                      <span className="text-body text-text">
                        {t(`technologyPage.architecture.layers.${layer}`)}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </Container>
        </section>

        {/* Performance Benchmarks */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-display font-bold text-text mb-4">
                {t('technologyPage.benchmarks.title')}
              </h2>
              <p className="text-body-lg text-text-secondary">
                {t('technologyPage.benchmarks.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {benchmarks.map((bm, index) => (
                <motion.div
                  key={bm}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card padding="lg" className="text-center h-full">
                    <div className="text-3xl md:text-4xl font-bold text-accent mb-2">
                      {t(`technologyPage.benchmarks.${bm}.value`)}
                    </div>
                    <div className="text-body-sm text-text-secondary">
                      {t(`technologyPage.benchmarks.${bm}.label`)}
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
              <h2 className="text-display font-bold mb-4">{t('technologyPage.cta.title')}</h2>
              <p className="text-body-lg text-white/80 mb-8">{t('technologyPage.cta.subtitle')}</p>
              <Link to={getLocalizedPath('/demo')}>
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={20} />}>
                  {t('technologyPage.cta.button')}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Technology
