import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Container } from '@/components/common'

const GDPR = () => {
  const { t } = useTranslation('legal')

  const sections = Object.keys(t('gdpr', { returnObjects: true }))
    .filter(key => key.startsWith('section'))

  return (
    <>
      <Helmet>
        <title>{t('gdpr.seo.title')}</title>
        <meta name="description" content={t('gdpr.seo.description')} />
      </Helmet>

      <div className="min-h-screen py-16 md:py-24 bg-surface">
        <Container size="sm">
          <article className="prose prose-lg max-w-none">
            <h1 className="text-display font-bold text-text mb-8">{t('gdpr.title')}</h1>
            <p className="text-body-lg text-text-secondary mb-8">{t('gdpr.lastUpdated')}</p>
            
            <div className="space-y-8 text-body text-text-secondary">
              {sections.map((sectionKey) => (
                <section key={sectionKey}>
                  <h2 className="text-subheading font-semibold text-text mb-4">
                    {t(`gdpr.${sectionKey}.title`)}
                  </h2>
                  <p>{t(`gdpr.${sectionKey}.content`)}</p>
                </section>
              ))}
            </div>
          </article>
        </Container>
      </div>
    </>
  )
}

export default GDPR
