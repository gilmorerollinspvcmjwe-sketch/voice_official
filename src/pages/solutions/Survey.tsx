/**
 * Solutions - Survey 独立页面
 *
 * 语音调研/问卷方案 - Coming Soon
 */

import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ClipboardList, Sparkles } from 'lucide-react'
import { Container } from '@/components/common'
import { getLocalizedPath } from '@/utils'
import { Link } from 'react-router-dom'

const Survey = () => {
  const { t } = useTranslation('solutions')

  return (
    <>
      <Helmet>
        <title>{t('survey.pageTitle', '语音调研 - VoiceAgent')}</title>
        <meta name="description" content={t('survey.pageDescription', 'AI 语音调研解决方案，即将上线')} />
      </Helmet>

      <div className="min-h-screen bg-background-primary flex items-center justify-center">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto py-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-primary/10 mb-8"
            >
              <ClipboardList className="w-12 h-12 text-primary-purple" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground-primary mb-4">
              {t('survey.comingSoon', 'Coming Soon')}
            </h1>

            <p className="text-lg text-foreground-secondary mb-8">
              {t('survey.description', 'AI 语音调研解决方案正在开发中，敬请期待。')}
            </p>

            <Link to={getLocalizedPath('/solutions')}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-gold text-background-primary font-semibold rounded-xl shadow-gold"
              >
                <Sparkles className="w-5 h-5" />
                {t('survey.backToSolutions', '返回解决方案')}
              </motion.button>
            </Link>
          </motion.div>
        </Container>
      </div>
    </>
  )
}

export default Survey
