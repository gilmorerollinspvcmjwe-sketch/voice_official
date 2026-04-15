/**
 * IntegrationsSection - 集成合作伙伴展示
 * 横向无限滚动，一行展示所有 Logo
 */

import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'
import { integrations } from '@/data/integrations'

const IntegrationsSection = () => {
  const { t } = useTranslation('home')

  return (
    <section className="py-12 md:py-16 bg-surface-secondary overflow-hidden">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-display font-bold text-text mb-3">
            {t('integrations.title')}
          </h2>
          <p className="text-body text-text-secondary max-w-xl mx-auto">
            {t('integrations.subtitle')}
          </p>
        </motion.div>

        {/* Horizontal auto-scroll row */}
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none
            bg-gradient-to-r from-surface-secondary to-transparent" />
          <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none
            bg-gradient-to-l from-surface-secondary to-transparent" />

          <motion.div
            className="flex items-center gap-8"
            initial={{ x: 0 }}
            animate={{ x: '-50%' }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
            style={{ width: 'max-content' }}
          >
            {/* Duplicate set for seamless loop */}
            {[...integrations, ...integrations].map((item, idx) => (
              <a
                key={`${item.id}-${idx}`}
                href={item.websiteUrl || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 flex-shrink-0
                  px-5 py-3 rounded-xl
                  hover:bg-surface-tertiary/80 transition-all duration-200
                  hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 flex items-center justify-center
                  bg-surface-secondary rounded-lg border border-border
                  group-hover:border-accent/30 transition-colors">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="max-w-[32px] max-h-[32px] object-contain
                      opacity-60 group-hover:opacity-100 transition-opacity"
                    loading="lazy"
                  />
                </div>
                <span className="text-body-sm text-text-secondary whitespace-nowrap
                  group-hover:text-text transition-colors">
                  {item.name}
                </span>
              </a>
            ))}
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
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
      </Container>
    </section>
  )
}

export default IntegrationsSection
