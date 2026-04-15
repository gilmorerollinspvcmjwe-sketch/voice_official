import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Container, CustomerLogoPlaceholder } from '@/components/common'
import { metrics, getFormattedMetric } from '@/data/metrics'

const SocialProofSection = () => {
  const { t, i18n } = useTranslation('home')

  return (
    <section className="py-12 md:py-16 bg-surface-secondary">
      <Container>
        {/* Customer logos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <p className="text-body text-text-secondary mb-6">
            {t('socialProof.title', { count: 500 })}
          </p>
          
          {/* Logo wall */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <CustomerLogoPlaceholder 
                key={i} 
                name={`Customer ${i + 1}`}
                className="w-28 h-10 md:w-32 md:h-12"
              />
            ))}
          </div>
        </motion.div>

        {/* Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {metrics.slice(0, 6).map((metric) => (
            <div 
              key={metric.key}
              className="text-center p-4 rounded-xl bg-surface shadow-soft"
            >
              <div className="text-display font-bold text-accent mb-2">
                {getFormattedMetric(metric)}
              </div>
              <div className="text-body-sm text-text-secondary">
                {i18n.language === 'zh' 
                  ? metric.label.zh 
                  : metric.label.en
                }
              </div>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default SocialProofSection