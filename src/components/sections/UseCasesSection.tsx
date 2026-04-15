import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Landmark, 
  Hospital, 
  ShoppingCart, 
  Phone, 
  GraduationCap, 
  Truck,
  ArrowRight
} from 'lucide-react'
import { Container, Card, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const iconMap = {
  bank: Landmark,
  hospital: Hospital,
  shopping: ShoppingCart,
  phone: Phone,
  school: GraduationCap,
  truck: Truck,
}

const UseCasesSection = () => {
  const { t } = useTranslation('home')

  const industries = t('useCases.industries', { returnObjects: true }) as Array<{
    id: string
    icon: keyof typeof iconMap
    title: string
    description: string
    link: string
  }>

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
            {t('useCases.title')}
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            {t('useCases.subtitle')}
          </p>
        </motion.div>

        {/* Use cases grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((industry, index) => {
            const IconComponent = iconMap[industry.icon] || Landmark
            
            return (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={getLocalizedPath(industry.link)}>
                  <Card 
                    variant="interactive" 
                    padding="lg" 
                    className="h-full group"
                  >
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                      <IconComponent size={24} className="text-accent" />
                    </div>

                    {/* Title */}
                    <h3 className="text-subheading font-semibold text-text mb-2 group-hover:text-accent transition-colors">
                      {industry.title}
                    </h3>

                    {/* Description */}
                    <p className="text-body text-text-secondary mb-4">
                      {industry.description}
                    </p>

                    {/* Link arrow */}
                    <div className="flex items-center gap-1 text-accent opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-body-sm">Learn more</span>
                      <ArrowRight size={16} />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link to={getLocalizedPath('/solutions')}>
            <Button 
              variant="ghost" 
              size="lg"
              rightIcon={<ArrowRight size={20} />}
            >
              {t('useCases.cta.text')}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}

export default UseCasesSection