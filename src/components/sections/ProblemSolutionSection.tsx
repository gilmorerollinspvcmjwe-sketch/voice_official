import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Clock, 
  Users, 
  BarChart3, 
  Globe,
  Bot,
  Zap,
  Target,
  Star
} from 'lucide-react'
import { Container } from '@/components/common'

const problemIcons = {
  phone: Phone,
  clock: Clock,
  users: Users,
  chart: BarChart3,
  globe: Globe,
}

const solutionIcons = {
  robot: Bot,
  zap: Zap,
  target: Target,
  star: Star,
  globe: Globe,
}

const ProblemSolutionSection = () => {
  const { t } = useTranslation('home')

  const problems = t('problem.items', { returnObjects: true }) as Array<{
    icon: keyof typeof problemIcons
    title: string
    description: string
  }>

  const solutions = t('solution.items', { returnObjects: true }) as Array<{
    icon: keyof typeof solutionIcons
    title: string
    description: string
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
            {t('problem.title')}
          </h2>
          <p className="text-body-lg text-text-secondary">
            {t('problem.subtitle')}
          </p>
        </motion.div>

        {/* Comparison grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Problems */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center">
                <span className="text-error text-lg">✗</span>
              </div>
              <h3 className="text-subheading font-semibold text-text">
                {t('problem.title')}
              </h3>
            </div>

            <div className="space-y-4">
              {problems.map((problem, index) => {
                const IconComponent = problemIcons[problem.icon] || Phone
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-error/5 border border-error/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-error/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent size={20} className="text-error" />
                    </div>
                    <div>
                      <h4 className="text-body font-semibold text-text mb-1">
                        {problem.title}
                      </h4>
                      <p className="text-body-sm text-text-secondary">
                        {problem.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
                <span className="text-success text-lg">✓</span>
              </div>
              <h3 className="text-subheading font-semibold text-text">
                {t('solution.title')}
              </h3>
            </div>

            <div className="space-y-4">
              {solutions.map((solution, index) => {
                const IconComponent = solutionIcons[solution.icon] || Bot
                
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-success/5 border border-success/10"
                  >
                    <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent size={20} className="text-success" />
                    </div>
                    <div>
                      <h4 className="text-body font-semibold text-text mb-1">
                        {solution.title}
                      </h4>
                      <p className="text-body-sm text-text-secondary">
                        {solution.description}
                      </p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default ProblemSolutionSection