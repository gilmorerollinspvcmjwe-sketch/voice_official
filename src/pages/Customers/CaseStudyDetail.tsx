/**
 * CaseStudyDetail 客户案例详情页
 */

import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote, TrendingUp, Users } from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'
import { caseStudies, getCaseStudyBySlug } from '@/data/case-studies'

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation('customers')
  
  const caseStudy = slug ? getCaseStudyBySlug(slug) : undefined

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display font-bold text-text mb-4">{t('notFound', 'Case Study Not Found')}</h1>
          <p className="text-body text-text-secondary mb-6">{t('notFoundDesc', 'The case study you\'re looking for doesn\'t exist.')}</p>
          <Link to={getLocalizedPath('/customers')}>
            <Button variant="primary">{t('backToList', 'Back to Case Studies')}</Button>
          </Link>
        </div>
      </div>
    )
  }

  const title = i18n.language === 'zh' && caseStudy.title.zh ? caseStudy.title.zh : caseStudy.title.en
  const summary = i18n.language === 'zh' && caseStudy.summary.zh ? caseStudy.summary.zh : caseStudy.summary.en
  const challenge = i18n.language === 'zh' && caseStudy.challenge.zh ? caseStudy.challenge.zh : caseStudy.challenge.en
  const solution = i18n.language === 'zh' && caseStudy.solution.zh ? caseStudy.solution.zh : caseStudy.solution.en

  const relatedCases = caseStudies.filter(c => c.id !== caseStudy.id).slice(0, 2)

  return (
    <>
      <Helmet>
        <title>{`${title} - VoiceAI Case Studies`}</title>
        <meta name="description" content={summary} />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero */}
        <section className="py-16 md:py-24 bg-gradient-hero text-white">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back Button */}
              <Link 
                to={getLocalizedPath('/customers')}
                className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>{t('backToList', 'Back to Case Studies')}</span>
              </Link>

              {/* Customer Logo */}
              <div className="w-32 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-white/60 text-body-sm">{caseStudy.customer.name}</span>
              </div>

              {/* Title */}
              <h1 className="text-hero font-bold mb-6">{title}</h1>

              {/* Summary */}
              <p className="text-body-lg text-white/80 mb-8">{summary}</p>

              {/* Customer Info */}
              <div className="flex flex-wrap items-center gap-6 text-white/70">
                <Badge variant="outline" className="border-white/30 text-white">
                  {caseStudy.customer.industry}
                </Badge>
                <span>{caseStudy.customer.size}</span>
                <span>{caseStudy.customer.location}</span>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Results Metrics */}
        <section className="py-12 bg-surface">
          <Container>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {caseStudy.results.map((result, index) => (
                <motion.div
                  key={result.metric}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-display font-bold text-accent mb-2">{result.value}</div>
                  <div className="text-subheading font-semibold text-text mb-1">{result.metric}</div>
                  <div className="text-caption text-text-muted">{result.description}</div>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Case Study Content */}
        <section className="py-16 bg-background-primary">
          <Container>
            <div className="max-w-4xl mx-auto">
              {/* Challenge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <ArrowLeft className="w-5 h-5 text-accent" />
                  </div>
                  <h2 className="text-title font-bold text-text">{t('challenge', 'The Challenge')}</h2>
                </div>
                <Card padding="lg">
                  <div className="text-body text-text-secondary whitespace-pre-line">
                    {challenge}
                  </div>
                </Card>
              </motion.div>

              {/* Solution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary-purple/10 flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-primary-purple" />
                  </div>
                  <h2 className="text-title font-bold text-text">{t('solution', 'The Solution')}</h2>
                </div>
                <Card padding="lg">
                  <div className="text-body text-text-secondary whitespace-pre-line">
                    {solution}
                  </div>
                </Card>
              </motion.div>

              {/* Quote */}
              {caseStudy.quote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-16"
                >
                  <Card padding="lg" className="bg-gradient-to-r from-accent/10 to-primary-purple/10 border-accent/20">
                    <Quote className="w-12 h-12 text-accent mb-4" />
                    <blockquote className="text-title font-semibold text-text mb-6">
                      "{caseStudy.quote.text}"
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                        <Users className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-subheading font-semibold text-text">{caseStudy.quote.author}</p>
                        <p className="text-body-sm text-text-secondary">{caseStudy.quote.title}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}

              {/* Key Results */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-title font-bold text-text mb-6">{t('keyResults', 'Key Results')}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {caseStudy.results.map((result) => (
                    <Card key={result.metric} padding="lg" variant="hover">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <TrendingUp className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <div className="text-subheading font-semibold text-text mb-1">{result.metric}</div>
                          <div className="text-display font-bold text-accent mb-2">{result.value}</div>
                          <div className="text-body-sm text-text-secondary">{result.description}</div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* Images Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h2 className="text-title font-bold text-text mb-6">{t('gallery', 'Gallery')}</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {caseStudy.images.map((_, index) => (
                    <Card key={index} padding="none" className="overflow-hidden">
                      <div className="aspect-video bg-gradient-to-br from-accent/10 to-primary-purple/10 flex items-center justify-center">
                        <span className="text-foreground-muted text-body">Image {index + 1}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <Card padding="lg" className="bg-gradient-cta text-white">
                  <h2 className="text-title font-bold mb-4">{t('cta.title', 'Ready to achieve similar results?')}</h2>
                  <p className="text-body text-white/80 mb-8">{t('cta.subtitle', 'Join 500+ companies using VoiceAI to transform their customer experience.')}</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={getLocalizedPath('/signup')}>
                      <Button variant="secondary" size="lg">
                        {t('cta.startTrial', 'Start Free Trial')}
                      </Button>
                    </Link>
                    <Link to={getLocalizedPath('/demo')}>
                      <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                        {t('cta.watchDemo', 'Watch Demo')}
                      </Button>
                    </Link>
                  </div>
                </Card>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* Related Case Studies */}
        <section className="py-16 bg-surface-secondary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-display font-bold text-text">{t('relatedCases', 'Related Case Studies')}</h2>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedCases.map((relatedCase, index) => (
                <motion.div
                  key={relatedCase.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={getLocalizedPath(`/customers/${relatedCase.slug}`)}>
                    <Card variant="hover" padding="lg" className="h-full">
                      <div className="w-20 h-10 bg-background-secondary rounded flex items-center justify-center mb-4">
                        <span className="text-foreground-muted text-caption">{relatedCase.customer.name}</span>
                      </div>
                      <h3 className="text-subheading font-semibold text-text mb-2 hover:text-accent transition-colors">
                        {i18n.language === 'zh' && relatedCase.title.zh ? relatedCase.title.zh : relatedCase.title.en}
                      </h3>
                      <p className="text-body-sm text-text-secondary mb-4 line-clamp-2">
                        {i18n.language === 'zh' && relatedCase.summary.zh ? relatedCase.summary.zh : relatedCase.summary.en}
                      </p>
                      <div className="flex items-center gap-2 text-accent text-body-sm font-medium">
                        <span>{t('readMore', 'Read Case Study')}</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default CaseStudyDetail
