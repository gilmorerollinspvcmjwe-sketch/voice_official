import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Headphones, 
  ShoppingCart, 
  CreditCard, 
  Calendar, 
  ClipboardList,
  ArrowRight
} from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Solutions = () => {
  const { t } = useTranslation('solutions')

  const solutions = [
    { 
      id: 'customerService', 
      icon: Headphones, 
      title: t('solutions.customerService.title'),
      description: t('solutions.customerService.description'),
      features: [t('solutions.customerService.feature1'), t('solutions.customerService.feature2'), t('solutions.customerService.feature3')]
    },
    { 
      id: 'sales', 
      icon: ShoppingCart, 
      title: t('solutions.sales.title'),
      description: t('solutions.sales.description'),
      features: [t('solutions.sales.feature1'), t('solutions.sales.feature2'), t('solutions.sales.feature3')]
    },
    { 
      id: 'collections', 
      icon: CreditCard, 
      title: t('solutions.collections.title'),
      description: t('solutions.collections.description'),
      features: [t('solutions.collections.feature1'), t('solutions.collections.feature2'), t('solutions.collections.feature3')]
    },
    // appointment 暂未上线，Coming Soon
    // { 
    //   id: 'appointment', 
    //   icon: Calendar, 
    //   title: t('solutions.appointment.title'),
    //   description: t('solutions.appointment.description'),
    //   features: [t('solutions.appointment.feature1'), t('solutions.appointment.feature2'), t('solutions.appointment.feature3')]
    // },
    { 
      id: 'survey', 
      icon: ClipboardList, 
      title: t('solutions.survey.title'),
      description: t('solutions.survey.description'),
      features: [t('solutions.survey.feature1'), t('solutions.survey.feature2'), t('solutions.survey.feature3')],
      comingSoon: true,
    },

  ]

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
              <Badge variant="gradient" className="mb-4">{t('hero.badge')}</Badge>
              <h1 className="text-hero font-bold mb-6">{t('hero.title')}</h1>
              <p className="text-body-lg text-white/80">{t('hero.subtitle')}</p>
            </motion.div>
          </Container>
        </section>

        {/* Solutions grid */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link 
                    to={solution.comingSoon ? getLocalizedPath('/company/contact') : getLocalizedPath(`/solutions/${solution.id}`)}
                    className={solution.comingSoon ? 'cursor-default' : ''}
                  >
                    <Card variant="interactive" padding="lg" className="h-full group">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <solution.icon size={24} className="text-accent" />
                      </div>
                      <h3 className="text-subheading font-semibold text-text mb-2 group-hover:text-accent transition-colors">
                        {solution.title}
                      </h3>
                      <p className="text-body text-text-secondary mb-4">
                        {solution.description}
                      </p>
                      <ul className="space-y-2 mb-4">
                        {solution.features.map((feature, i) => (
                          <li key={i} className="text-body-sm text-text-secondary flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      {solution.comingSoon ? (
                        <Badge variant="outline" className="text-text-muted">
                          Coming Soon
                        </Badge>
                      ) : (
                        <div className="flex items-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-body-sm">{t('common.learnMore')}</span>
                          <ArrowRight size={16} />
                        </div>
                      )}
                    </Card>
                  </Link>
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

export default Solutions