import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Book, Code, Rocket, Package, ExternalLink } from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Docs = () => {
  const { t } = useTranslation('docs')

  const sections = [
    { 
      icon: Rocket, 
      title: t('sections.quickstart.title'), 
      description: t('sections.quickstart.description'),
      href: '/docs#quickstart'
    },
    { 
      icon: Code, 
      title: t('sections.api.title'), 
      description: t('sections.api.description'),
      href: '/docs#api'
    },
    { 
      icon: Package, 
      title: t('sections.sdks.title'), 
      description: t('sections.sdks.description'),
      href: '/docs#sdks'
    },
    { 
      icon: Book, 
      title: t('sections.guides.title'), 
      description: t('sections.guides.description'),
      href: '/docs#guides'
    },
  ]

  const codeExample = `import { VoiceAgent } from '@voiceai/sdk';

const agent = new VoiceAgent({
  apiKey: 'your-api-key',
  model: 'conversational-v1'
});

// Start a voice conversation
const session = await agent.start({
  context: 'customer-support',
  language: 'en'
});

// Handle responses
session.on('response', (text) => {
  console.log('Agent:', text);
});`

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
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <Badge variant="gradient" className="mb-4">{t('hero.badge')}</Badge>
                <h1 className="text-hero font-bold mb-6">{t('hero.title')}</h1>
                <p className="text-body-lg text-white/80 mb-8">{t('hero.subtitle')}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={getLocalizedPath('/docs/quickstart')}>
                    <Button variant="secondary" size="lg">{t('hero.cta')}</Button>
                  </Link>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg" className="border-white text-white" rightIcon={<ExternalLink size={18} />}>
                      GitHub
                    </Button>
                  </a>
                </div>
              </div>

              {/* Code example */}
              <div className="bg-surface-secondary/10 rounded-xl p-6 backdrop-blur-sm border border-white/10">
                <pre className="text-body-sm text-white/90 overflow-x-auto">
                  <code>{codeExample}</code>
                </pre>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Sections */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={getLocalizedPath(section.href)} onClick={() => {
                    // 滚动到对应section
                    const el = document.getElementById(section.href.split('#')[1] || '')
                    if (el) el.scrollIntoView({ behavior: 'smooth' })
                  }}>
                    <Card variant="interactive" padding="lg" className="h-full group">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                        <section.icon size={24} className="text-accent" />
                      </div>
                      <h3 className="text-subheading font-semibold text-text mb-2 group-hover:text-accent transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-body text-text-secondary">{section.description}</p>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Quick start placeholder */}
        <section className="py-16 bg-surface-secondary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-display font-bold text-text mb-8">{t('quickstart.title')}</h2>
              
              <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Card padding="lg" key={i}>
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-body font-bold text-accent">{i + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-subheading font-semibold text-text mb-2">{t(`quickstart.step${i + 1}.title`)}</h4>
                        <p className="text-body text-text-secondary">{t(`quickstart.step${i + 1}.description`)}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Docs