/**
 * Pricing 定价页面
 * 
 * 📝 TODO(老徐): FAQ 可从 CMS 动态加载
 */

import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, ArrowRight, ChevronDown, Mail } from 'lucide-react'
import { useState } from 'react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'
import { pricingFAQ } from '@/data/pricing-faq'

const Pricing = () => {
  const { t, i18n } = useTranslation('pricing')
  const [openFaqId, setOpenFaqId] = useState<string | null>(null)

  const plans = [
    {
      id: 'free',
      name: t('plans.free.name'),
      price: '$0',
      period: t('plans.free.period'),
      description: t('plans.free.description'),
      features: [
        t('plans.free.feature1'),
        t('plans.free.feature2'),
        t('plans.free.feature3'),
        t('plans.free.feature4'),
      ],
      cta: t('plans.free.cta'),
      popular: false,
    },
    {
      id: 'pro',
      name: t('plans.pro.name'),
      price: '$99',
      period: t('plans.pro.period'),
      description: t('plans.pro.description'),
      features: [
        t('plans.pro.feature1'),
        t('plans.pro.feature2'),
        t('plans.pro.feature3'),
        t('plans.pro.feature4'),
        t('plans.pro.feature5'),
        t('plans.pro.feature6'),
      ],
      cta: t('plans.pro.cta'),
      popular: true,
    },
    {
      id: 'enterprise',
      name: t('plans.enterprise.name'),
      price: t('plans.enterprise.price'),
      period: '',
      description: t('plans.enterprise.description'),
      features: [
        t('plans.enterprise.feature1'),
        t('plans.enterprise.feature2'),
        t('plans.enterprise.feature3'),
        t('plans.enterprise.feature4'),
        t('plans.enterprise.feature5'),
        t('plans.enterprise.feature6'),
        t('plans.enterprise.feature7'),
      ],
      cta: t('plans.enterprise.cta'),
      popular: false,
    },
  ]

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id)
  }

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

        {/* Pricing cards */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={plan.popular ? 'md:-mt-4 md:mb-4' : ''}
                >
                  <Card 
                    variant={plan.popular ? 'elevated' : 'default'}
                    padding="lg"
                    className={`h-full ${plan.popular ? 'border-2 border-accent shadow-glow' : ''}`}
                  >
                    {/* Popular badge */}
                    {plan.popular && (
                      <Badge variant="accent" className="mb-4">{t('plans.popular')}</Badge>
                    )}

                    {/* Plan header */}
                    <h3 className="text-subheading font-semibold text-text mb-2">{plan.name}</h3>
                    
                    {/* Price */}
                    <div className="mb-4">
                      <span className="text-display font-bold text-accent">{plan.price}</span>
                      {plan.period && <span className="text-body text-text-secondary">/{plan.period}</span>}
                    </div>

                    {/* Description */}
                    <p className="text-body text-text-secondary mb-6">{plan.description}</p>

                    {/* Features */}
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="text-body-sm text-text flex items-center gap-2">
                          <Check size={16} className="text-accent flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link to={getLocalizedPath(plan.id === 'enterprise' ? '/company/contact' : '/signup')}>
                      <Button 
                        variant={plan.popular ? 'primary' : 'outline'}
                        fullWidth
                        rightIcon={<ArrowRight size={16} />}
                      >
                        {plan.cta}
                      </Button>
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Pricing note */}
            <div className="text-center mt-12">
              <p className="text-body text-text-secondary">
                {t('footer.note')}
              </p>
            </div>
          </Container>
        </section>

        {/* FAQ Section */}
        {/* 📝 TODO(老徐): FAQ 可从 CMS 动态加载 */}
        <section className="py-16 bg-surface-secondary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-display font-bold text-text mb-8 text-center">{t('faq.title')}</h2>
              
              <div className="space-y-4">
                {pricingFAQ.map((faq, index) => {
                  const isOpen = openFaqId === faq.id
                  const question = i18n.language === 'zh' && faq.question.zh 
                    ? faq.question.zh 
                    : faq.question.en
                  const answer = i18n.language === 'zh' && faq.answer.zh 
                    ? faq.answer.zh 
                    : faq.answer.en

                  return (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        padding="none" 
                        variant={isOpen ? 'elevated' : 'default'}
                        className="overflow-hidden"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-background-secondary/50 transition-colors"
                        >
                          <h4 className="text-subheading font-semibold text-text pr-4">
                            {question}
                          </h4>
                          <ChevronDown 
                            className={`w-5 h-5 text-text-muted flex-shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <motion.div
                          initial={false}
                          animate={{
                            height: isOpen ? 'auto' : 0,
                            opacity: isOpen ? 1 : 0,
                          }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 text-body text-text-secondary border-t border-border pt-4">
                            {answer}
                          </div>
                        </motion.div>
                      </Card>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Enterprise CTA */}
        <section className="py-16 bg-gradient-cta text-white">
          <Container>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-display font-bold mb-4">{t('enterprise.title', 'Need a Custom Solution?')}</h2>
              <p className="text-body-lg text-white/80 mb-8">
                {t('enterprise.subtitle', 'Contact our sales team to discuss your specific requirements and get a tailored quote.')}
              </p>
              <Link to={getLocalizedPath('/company/contact')}>
                <Button variant="secondary" size="lg" leftIcon={<Mail size={20} />}>
                  {t('enterprise.cta', 'Contact Sales')}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Pricing
