import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container, CustomerLogoPlaceholder, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const IntegrationsSection = () => {
  const { t } = useTranslation('home')

  // Placeholder integration logos grouped by category
  const integrations = {
    crm: ['Salesforce', 'HubSpot', 'Zendesk'],
    communication: ['Twilio', 'Vonage', 'Nexmo'],
    ai: ['OpenAI', 'Anthropic'],
    analytics: ['Google', 'Mixpanel', 'Segment'],
  }

  return (
    <section className="py-16 md:py-24 bg-surface">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display font-bold text-text mb-4">
            {t('integrations.title')}
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            {t('integrations.subtitle')}
          </p>
        </motion.div>

        {/* Integration categories */}
        <div className="space-y-8">
          {Object.entries(integrations).map(([category, logos], categoryIndex) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              {/* Category label */}
              <h3 className="text-subheading font-semibold text-text mb-4 text-center">
                {t(`integrations.categories.${category}`)}
              </h3>

              {/* Logo grid */}
              <div className="flex flex-wrap items-center justify-center gap-4">
                {logos.map((logo, index) => (
                  <CustomerLogoPlaceholder 
                    key={index}
                    name={logo}
                    className="w-36 h-14"
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to={getLocalizedPath('/product/integrations')}>
            <Button 
              variant="ghost" 
              size="lg"
              rightIcon={<ArrowRight size={20} />}
            >
              {t('integrations.cta.text')}
            </Button>
          </Link>
        </motion.div>

        {/* Upload hint */}
        <div className="text-center mt-6">
          <p className="text-caption text-text-muted">
            📁 Add integration logos at: <code>public/images/integrations/</code>
          </p>
        </div>
      </Container>
    </section>
  )
}

export default IntegrationsSection