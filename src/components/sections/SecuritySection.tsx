import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Shield, Lock, CheckCircle, ArrowRight } from 'lucide-react'
import { Container, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const SecuritySection = () => {
  const { t } = useTranslation('home')

  const certifications = t('security.certifications', { returnObjects: true }) as Array<{
    name: string
    description: string
  }>

  const features = t('security.features', { returnObjects: true }) as Array<{
    name: string
    description: string
  }>

  return (
    <section className="py-16 md:py-24 bg-gradient-hero text-white">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-accent" />
          </div>
          <h2 className="text-display font-bold mb-4">
            {t('security.title')}
          </h2>
          <p className="text-body-lg text-white/80 max-w-2xl mx-auto">
            {t('security.subtitle')}
          </p>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {certifications.map((cert) => (
            <div
              key={cert.name}
              className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={24} className="text-accent" />
              </div>
              <h3 className="text-subheading font-semibold mb-2">
                {cert.name}
              </h3>
              <p className="text-body-sm text-white/70">
                {cert.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Security features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => (
            <div
              key={feature.name}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/5"
            >
              <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center flex-shrink-0">
                <Lock size={20} className="text-accent" />
              </div>
              <div>
                <h4 className="text-body font-semibold">
                  {feature.name}
                </h4>
                <p className="text-caption text-white/60">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link to={getLocalizedPath('/product/security')}>
            <Button 
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight size={20} />}
            >
              {t('security.cta.text')}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}

export default SecuritySection