import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Quote, ArrowRight } from 'lucide-react'
import { Container, Card, Badge, Button, CustomerLogoPlaceholder, AvatarPlaceholder } from '@/components/common'
import { getLocalizedPath } from '@/utils'
import { caseStudies } from '@/data/case-studies'

const Customers = () => {
  const { t, i18n } = useTranslation('customers')

  return (
    <>
      <Helmet>
        <title>{t('seo.title')}</title>
        <meta name="description" content={t('seo.description')} />
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
              <h1 className="text-hero font-bold mb-6">{t('hero.title')}</h1>
              <p className="text-body-lg text-white/80">{t('hero.subtitle')}</p>
            </motion.div>
          </Container>
        </section>

        {/* Customer logos */}
        <section className="py-12 bg-surface-secondary">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
              {Array.from({ length: 12 }).map((_, i) => (
                <CustomerLogoPlaceholder 
                  key={i} 
                  name={`Logo ${i + 1}`}
                  className="w-28 h-10 md:w-32 md:h-12"
                />
              ))}
            </div>
          </Container>
        </section>

        {/* Case studies */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="accent" className="mb-4">{t('cases.badge')}</Badge>
              <h2 className="text-display font-bold text-text mb-4">{t('cases.title')}</h2>
              <p className="text-body-lg text-text-secondary">{t('cases.subtitle')}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {caseStudies.slice(0, 4).map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="interactive" padding="lg" className="h-full">
                    {/* Customer info */}
                    <div className="flex items-center gap-4 mb-4">
                      <CustomerLogoPlaceholder name={caseStudy.customer.name} className="w-16 h-8" />
                      <div>
                        <Badge variant="default">{caseStudy.customer.industry}</Badge>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-subheading font-semibold text-text mb-3">
                      {i18n.language === 'zh' ? caseStudy.title.zh : caseStudy.title.en}
                    </h3>

                    {/* Summary */}
                    <p className="text-body text-text-secondary mb-4">
                      {i18n.language === 'zh' ? caseStudy.summary.zh : caseStudy.summary.en}
                    </p>

                    {/* Results */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {caseStudy.results.slice(0, 3).map((result, i) => (
                        <div key={i} className="text-center p-2 bg-surface-secondary rounded-lg">
                          <div className="text-body font-bold text-accent">{result.value}</div>
                          <div className="text-caption text-text-muted">{result.metric}</div>
                        </div>
                      ))}
                    </div>

                    {/* Quote */}
                    {caseStudy.quote && (
                      <div className="p-3 bg-surface-secondary rounded-lg">
                        <div className="flex items-start gap-2">
                          <Quote size={16} className="text-accent flex-shrink-0 mt-1" />
                          <p className="text-body-sm text-text-secondary italic">
                            "{caseStudy.quote.text.slice(0, 100)}..."
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mt-4">
                      <span className="text-body-sm text-accent">{t('cases.readMore')}</span>
                      <ArrowRight size={16} className="text-accent" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-surface-secondary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="accent" className="mb-4">{t('testimonials.badge')}</Badge>
              <h2 className="text-display font-bold text-text mb-4">{t('testimonials.title')}</h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="elevated" padding="lg">
                    <Quote size={24} className="text-accent/20 mb-4" />
                    <p className="text-body text-text-secondary mb-6 italic">
                      "{t(`testimonials.quote${index + 1}`)}"
                    </p>
                    <div className="flex items-center gap-3">
                      <AvatarPlaceholder size="md" />
                      <div>
                        <div className="text-body font-semibold text-text">{t(`testimonials.author${index + 1}`)}</div>
                        <div className="text-caption text-text-muted">{t(`testimonials.role${index + 1}`)}</div>
                      </div>
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
              <h2 className="text-display font-bold mb-4">{t('cta.title')}</h2>
              <p className="text-body-lg text-white/80 mb-8">{t('cta.subtitle')}</p>
              <Link to={getLocalizedPath('/signup')}>
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={20} />}>
                  {t('cta.button')}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Customers