import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'
import { Container, Card, Badge, Button, AvatarPlaceholder } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Company = () => {
  const { t } = useTranslation('company')

  const team = [
    { name: 'John Smith', title: t('team.ceo'), bio: t('team.ceoBio') },
    { name: 'Sarah Chen', title: t('team.cto'), bio: t('team.ctoBio') },
    { name: 'Mike Johnson', title: t('team.coo'), bio: t('team.cooBio') },
    { name: 'Emily Wang', title: t('team.vp'), bio: t('team.vpBio') },
  ]

  const careers = [
    { title: t('careers.job1.title'), department: 'Engineering', location: 'Remote' },
    { title: t('careers.job2.title'), department: 'Engineering', location: 'San Francisco' },
    { title: t('careers.job3.title'), department: 'Product', location: 'Remote' },
  ]

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
              className="text-center max-w-3xl mx-auto"
            >
              <h1 className="text-hero font-bold mb-6">{t('hero.title')}</h1>
              <p className="text-body-lg text-white/80">{t('hero.subtitle')}</p>
            </motion.div>
          </Container>
        </section>

        {/* About section */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <Badge variant="accent" className="mb-4">{t('about.badge')}</Badge>
                <h2 className="text-display font-bold text-text mb-6">{t('about.title')}</h2>
                <p className="text-body-lg text-text-secondary mb-6">{t('about.description1')}</p>
                <p className="text-body-lg text-text-secondary">{t('about.description2')}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6">
                {[
                  { value: '500+', label: t('about.stat1') },
                  { value: '10M+', label: t('about.stat2') },
                  { value: '50+', label: t('about.stat3') },
                  { value: '99.9%', label: t('about.stat4') },
                ].map((stat, i) => (
                  <Card padding="lg" key={i} className="text-center">
                    <div className="text-display font-bold text-accent mb-2">{stat.value}</div>
                    <div className="text-body text-text-secondary">{stat.label}</div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Team section */}
        <section className="py-16 md:py-24 bg-surface-secondary">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="accent" className="mb-4">{t('team.badge')}</Badge>
              <h2 className="text-display font-bold text-text mb-4">{t('team.title')}</h2>
              <p className="text-body-lg text-text-secondary">{t('team.subtitle')}</p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="hover" padding="lg" className="text-center">
                    <AvatarPlaceholder name={member.name} size="xl" className="mx-auto mb-4" />
                    <h3 className="text-subheading font-semibold text-text mb-1">{member.name}</h3>
                    <p className="text-body-sm text-accent mb-3">{member.title}</p>
                    <p className="text-body-sm text-text-secondary">{member.bio}</p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-6">
              <p className="text-caption text-text-muted">
                📁 Add team photos at: <code>public/images/team/</code>
              </p>
            </div>
          </Container>
        </section>

        {/* Careers section */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="accent" className="mb-4">{t('careers.badge')}</Badge>
              <h2 className="text-display font-bold text-text mb-4">{t('careers.title')}</h2>
              <p className="text-body-lg text-text-secondary">{t('careers.subtitle')}</p>
            </motion.div>

            <div className="max-w-2xl mx-auto space-y-4">
              {careers.map((job, index) => (
                <motion.div
                  key={job.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card variant="interactive" padding="lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-subheading font-semibold text-text">{job.title}</h4>
                        <p className="text-body-sm text-text-secondary">{job.department} • {job.location}</p>
                      </div>
                      <ArrowRight size={20} className="text-accent" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </section>

        {/* Contact section */}
        <section className="py-16 bg-gradient-cta text-white">
          <Container>
            <div className="text-center">
              <h2 className="text-display font-bold mb-4">{t('contact.title')}</h2>
              <p className="text-body-lg text-white/80 mb-8">{t('contact.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={getLocalizedPath('/company/contact')}>
                  <Button variant="secondary" size="lg" leftIcon={<Mail size={20} />}>
                    {t('contact.cta')}
                  </Button>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Company