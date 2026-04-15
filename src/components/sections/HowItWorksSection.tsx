import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Container } from '@/components/common'

const HowItWorksSection = () => {
  const { t } = useTranslation('home')

  const steps = t('howItWorks.steps', { returnObjects: true }) as Array<{
    number: string
    title: string
    description: string
  }>

  return (
    <section className="py-16 md:py-24 bg-gradient-hero text-white overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-display font-bold mb-4">
            {t('howItWorks.title')}
          </h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto">
            {t('howItWorks.subtitle')}
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Step card */}
              <div className="relative p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
                {/* Number badge */}
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-accent flex items-center justify-center text-body font-bold">
                  {step.number}
                </div>

                {/* Content */}
                <h3 className="text-subheading font-semibold mb-3 pt-2">
                  {step.title}
                </h3>
                <p className="text-body text-white/70">
                  {step.description}
                </p>
              </div>

              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-white/30">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                    className="h-full bg-gradient-accent"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

export default HowItWorksSection