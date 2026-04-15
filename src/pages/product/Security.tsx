/**
 * Product Security 独立页面
 * 
 * 展示安全合规：SOC 2 Type II、HIPAA、GDPR、加密、访问控制、审计日志
 */

import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Shield,
  Lock,
  UserCheck,
  Eye,
  Award,
  ArrowRight,
  CheckCircle,
  FileText,
  ChevronRight
} from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Security = () => {
  const { t } = useTranslation('product')

  const certifications = [
    { key: 'soc2', color: 'primary-purple' },
    { key: 'hipaa', color: 'primary-cyan' },
    { key: 'gdpr', color: 'accent' },
    { key: 'iso27001', color: 'gold' },
  ]

  const securitySections = [
    { key: 'encryption', icon: Lock, color: 'accent' },
    { key: 'accessControl', icon: UserCheck, color: 'primary-purple' },
    { key: 'auditLog', icon: Eye, color: 'primary-cyan' },
  ]

  return (
    <>
      <Helmet>
        <title>{t('securityPage.seo.title')}</title>
        <meta name="description" content={t('securityPage.seo.description')} />
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
              <Badge variant="gradient" className="mb-4">{t('securityPage.hero.badge')}</Badge>
              <h1 className="text-hero font-bold mb-6">{t('securityPage.hero.title')}</h1>
              <p className="text-body-lg text-white/80">{t('securityPage.hero.subtitle')}</p>
            </motion.div>
          </Container>
        </section>

        {/* Compliance Certifications */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-display font-bold text-text mb-4">
                {t('securityPage.certifications.title')}
              </h2>
              <p className="text-body-lg text-text-secondary">
                {t('securityPage.certifications.subtitle')}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="hover" padding="lg" className="text-center h-full">
                    <div className={`w-16 h-16 rounded-full bg-${cert.color}/10 flex items-center justify-center mx-auto mb-4`}>
                      <Award size={32} className={`text-${cert.color}`} />
                    </div>
                    <h3 className="text-subheading font-semibold text-text mb-2">
                      {t(`securityPage.certifications.${cert.key}.name`)}
                    </h3>
                    <p className="text-body-sm text-text-secondary">
                      {t(`securityPage.certifications.${cert.key}.description`)}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Security Details */}
        <section className="py-16 md:py-24 bg-background-secondary">
          <Container>
            <div className="space-y-8">
              {securitySections.map((section, sIndex) => (
                <motion.div
                  key={section.key}
                  initial={{ opacity: 0, x: sIndex % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card padding="lg">
                    <div className="flex items-center gap-3 mb-6">
                      <div className={`w-12 h-12 rounded-xl bg-${section.color}/10 flex items-center justify-center`}>
                        <section.icon size={24} className={`text-${section.color}`} />
                      </div>
                      <div>
                        <h3 className="text-subheading font-semibold text-text">
                          {t(`securityPage.${section.key}.title`)}
                        </h3>
                        <p className="text-caption text-text-muted">
                          {t(`securityPage.${section.key}.subtitle`)}
                        </p>
                      </div>
                    </div>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {(t(`securityPage.${section.key}.items`, { returnObjects: true }) as string[]).map(
                        (item, i) => (
                          <li key={i} className="flex items-center gap-3 text-body-sm text-text-secondary">
                            <CheckCircle size={16} className="text-accent flex-shrink-0" />
                            {item}
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

        {/* Compliance Documentation */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card padding="lg">
                <h3 className="text-title font-bold text-text mb-6 flex items-center gap-3">
                  <FileText size={24} className="text-accent" />
                  {t('securityPage.documents.title')}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(t('securityPage.documents.items', { returnObjects: true }) as string[]).map((doc) => (
                    <button
                      key={doc}
                      className="flex items-center gap-3 px-4 py-3 bg-background-secondary rounded-xl hover:bg-accent/10 transition-colors text-left"
                    >
                      <FileText size={20} className="text-text-muted" />
                      <span className="text-body-sm text-text flex-1">{doc}</span>
                      <ChevronRight size={16} className="text-text-muted" />
                    </button>
                  ))}
                </div>
              </Card>
            </motion.div>
          </Container>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-cta text-white">
          <Container>
            <div className="text-center">
              <Shield size={48} className="mx-auto mb-4 text-white/80" />
              <h2 className="text-display font-bold mb-4">{t('securityPage.cta.title')}</h2>
              <p className="text-body-lg text-white/80 mb-8">{t('securityPage.cta.subtitle')}</p>
              <Link to={getLocalizedPath('/company/contact')}>
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={20} />}>
                  {t('securityPage.cta.button')}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Security
