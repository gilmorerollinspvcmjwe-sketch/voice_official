/**
 * Product 产品页面
 * 
 * 📝 TODO(老徐): 补充真实技术文档和合规证书
 */

import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Bot, 
  Brain, 
  Shield, 
  Link2, 
  Mic, 
  Zap, 
  Globe, 
  BarChart3,
  ArrowRight,
  CheckCircle,
  Lock,
  FileText,
  Users,
  Server,
  Database,
  Cloud,
  Activity,
  Award,
  ChevronRight
} from 'lucide-react'
import { Container, Card, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Product = () => {
  const { t } = useTranslation('product')
  const params = useParams()
  const activeSection = params['*'] || ''

  const tabs = [
    { id: 'features', icon: Bot, label: t('sections.features') },
    { id: 'technology', icon: Brain, label: t('sections.technology') },
    { id: 'security', icon: Shield, label: t('sections.security') },
    { id: 'integrations', icon: Link2, label: t('sections.integrations') },
  ]

  const features = [
    { icon: Mic, title: t('features.voiceSynthesis.title'), description: t('features.voiceSynthesis.description') },
    { icon: Brain, title: t('features.conversationAI.title'), description: t('features.conversationAI.description') },
    { icon: Zap, title: t('features.lowLatency.title'), description: t('features.lowLatency.description') },
    { icon: Globe, title: t('features.multilingual.title'), description: t('features.multilingual.description') },
    { icon: BarChart3, title: t('features.analytics.title'), description: t('features.analytics.description') },
    { icon: Shield, title: t('features.security.title'), description: t('features.security.description') },
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
              <Badge variant="gradient" className="mb-4">{t('hero.badge')}</Badge>
              <h1 className="text-hero font-bold mb-6">{t('hero.title')}</h1>
              <p className="text-body-lg text-white/80 mb-8">{t('hero.subtitle')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to={getLocalizedPath('/signup')}>
                  <Button variant="secondary" size="lg">{t('hero.cta')}</Button>
                </Link>
                <Link to={getLocalizedPath('/demo')}>
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    {t('hero.ctaSecondary')}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </Container>
        </section>

        {/* Section tabs */}
        <section className="py-6 bg-surface-secondary sticky top-16 md:top-18 z-40">
          <Container>
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <Link 
                  key={tab.id}
                  to={getLocalizedPath(`/product/${tab.id}`)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                    activeSection === tab.id 
                      ? 'bg-accent text-white' 
                      : 'text-text-secondary hover:bg-surface-tertiary hover:text-text'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </Link>
              ))}
            </div>
          </Container>
        </section>

        {/* Features section */}
        {activeSection === 'features' && (
          <section className="py-16 md:py-24 bg-surface">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-display font-bold text-text mb-4">{t('features.title')}</h2>
                <p className="text-body-lg text-text-secondary">{t('features.subtitle')}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="hover" padding="lg" className="h-full">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <feature.icon size={24} className="text-accent" />
                      </div>
                      <h3 className="text-subheading font-semibold text-text mb-2">{feature.title}</h3>
                      <p className="text-body text-text-secondary">{feature.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Technology section */}
        {/* 📝 TODO(老徐): 补充真实技术文档和合规证书 */}
        {activeSection === 'technology' && (
          <section className="py-16 md:py-24 bg-surface">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Badge variant="accent" className="mb-4">{t('technology.badge', 'Technology')}</Badge>
                <h2 className="text-display font-bold text-text mb-4">{t('technology.title')}</h2>
                <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                  {t('technology.subtitle', 'Built on cutting-edge AI technology for natural voice conversations.')}
                </p>
              </motion.div>

              {/* Tech Stack Overview */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {/* ASR */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <Card padding="lg" className="h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary-purple/10 flex items-center justify-center">
                        <Mic className="w-6 h-6 text-primary-purple" />
                      </div>
                      <div>
                        <h3 className="text-subheading font-semibold text-text">ASR</h3>
                        <p className="text-caption text-text-muted">Speech Recognition</p>
                      </div>
                    </div>
                    {/* 📝 TODO(老徐): 替换为真实 ASR 技术信息 */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="text-text-secondary">Accuracy</span>
                        <span className="text-accent font-medium">99.5%</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="text-text-secondary">Languages</span>
                        <span className="text-accent font-medium">50+</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="text-text-secondary">Latency</span>
                        <span className="text-accent font-medium">&lt;100ms</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* LLM */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <Card padding="lg" className="h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary-cyan/10 flex items-center justify-center">
                        <Brain className="w-6 h-6 text-primary-cyan" />
                      </div>
                      <div>
                        <h3 className="text-subheading font-semibold text-text">LLM</h3>
                        <p className="text-caption text-text-muted">Large Language Model</p>
                      </div>
                    </div>
                    {/* 📝 TODO(老徐): 替换为真实 LLM 技术信息 */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="text-text-secondary">Model</span>
                        <span className="text-accent font-medium">GPT-4o</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="text-text-secondary">Context</span>
                        <span className="text-accent font-medium">128K</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="text-text-secondary">Fine-tuned</span>
                        <span className="text-accent font-medium">Voice-optimized</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>

                {/* TTS */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <Card padding="lg" className="h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Zap className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-subheading font-semibold text-text">TTS</h3>
                        <p className="text-caption text-text-muted">Text-to-Speech</p>
                      </div>
                    </div>
                    {/* 📝 TODO(老徐): 替换为真实 TTS 技术信息 */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="text-text-secondary">Voices</span>
                        <span className="text-accent font-medium">100+</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="text-text-secondary">Emotions</span>
                        <span className="text-accent font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between text-body-sm">
                        <span className="text-text-secondary">Quality</span>
                        <span className="text-accent font-medium">HD / 48kHz</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Architecture Diagram Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card padding="lg" className="text-center">
                  {/* 📝 TODO(老徐): 替换为真实技术架构图 */}
                  <div className="py-16 bg-gradient-to-br from-primary-purple/5 to-primary-cyan/5 rounded-2xl">
                    <Server className="w-16 h-16 text-foreground-muted mx-auto mb-4" />
                    <h3 className="text-title font-semibold text-text mb-2">System Architecture</h3>
                    <p className="text-body text-text-secondary mb-6 max-w-md mx-auto">
                      Scalable microservices architecture with real-time processing capabilities.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {['Auto-scaling', '99.99% Uptime', 'Global CDN', 'Real-time'].map((tag) => (
                        <Badge key={tag} variant="default">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Tech Stack Details */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {[
                  { icon: Cloud, label: 'Cloud Infrastructure', value: 'AWS / GCP / Azure' },
                  { icon: Database, label: 'Data Storage', value: 'Encrypted at rest' },
                  { icon: Server, label: 'Processing', value: 'Edge computing' },
                  { icon: Activity, label: 'Monitoring', value: '24/7 observability' },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card padding="md" className="text-center">
                      <item.icon className="w-8 h-8 text-accent mx-auto mb-2" />
                      <h4 className="text-body-sm font-semibold text-text">{item.label}</h4>
                      <p className="text-caption text-text-muted">{item.value}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Security section */}
        {/* 📝 TODO(老徐): 补充真实技术文档和合规证书 */}
        {activeSection === 'security' && (
          <section className="py-16 md:py-24 bg-surface">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Badge variant="accent" className="mb-4">{t('security.badge', 'Security & Compliance')}</Badge>
                <h2 className="text-display font-bold text-text mb-4">{t('security.title')}</h2>
                <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                  {t('security.subtitle', 'Enterprise-grade security with comprehensive compliance certifications.')}
                </p>
              </motion.div>

              {/* Compliance Badges */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                {/* 📝 TODO(老徐): 替换为真实合规证书 */}
                {[
                  { id: 'soc2', name: 'SOC 2', full: 'SOC 2 Type II', color: 'primary-purple' },
                  { id: 'hipaa', name: 'HIPAA', full: 'HIPAA Compliant', color: 'primary-cyan' },
                  { id: 'gdpr', name: 'GDPR', full: 'GDPR Compliant', color: 'accent' },
                  { id: 'iso', name: 'ISO 27001', full: 'ISO 27001 Certified', color: 'gold' },
                ].map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="hover" padding="lg" className="text-center h-full">
                      <div className={`w-16 h-16 rounded-full bg-${cert.color}/10 flex items-center justify-center mx-auto mb-4`}>
                        <Award className={`w-8 h-8 text-${cert.color}`} />
                      </div>
                      <h3 className="text-subheading font-semibold text-text mb-1">{cert.name}</h3>
                      <p className="text-caption text-text-muted">{cert.full}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Security Features */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card padding="lg" className="h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-subheading font-semibold text-text">Data Encryption</h3>
                        <p className="text-caption text-text-muted">End-to-end protection</p>
                      </div>
                    </div>
                    {/* 📝 TODO(老徐): 替换为真实安全特性信息 */}
                    <ul className="space-y-3">
                      {[
                        'AES-256 encryption at rest',
                        'TLS 1.3 for data in transit',
                        'Hardware Security Modules (HSM)',
                        'Regular key rotation',
                        'Zero-trust architecture',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-body-sm text-text-secondary">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <Card padding="lg" className="h-full">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-xl bg-primary-purple/10 flex items-center justify-center">
                        <Shield className="w-6 h-6 text-primary-purple" />
                      </div>
                      <div>
                        <h3 className="text-subheading font-semibold text-text">Access Control</h3>
                        <p className="text-caption text-text-muted">Granular permissions</p>
                      </div>
                    </div>
                    {/* 📝 TODO(老徐): 替换为真实访问控制信息 */}
                    <ul className="space-y-3">
                      {[
                        'Multi-factor authentication (MFA)',
                        'Role-based access control (RBAC)',
                        'SSO integration (SAML, OIDC)',
                        'IP allowlisting',
                        'Session management & timeouts',
                      ].map((item) => (
                        <li key={item} className="flex items-center gap-3 text-body-sm text-text-secondary">
                          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </motion.div>
              </div>

              {/* Compliance Documentation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card padding="lg">
                  <h3 className="text-title font-bold text-text mb-6 flex items-center gap-3">
                    <FileText className="w-6 h-6 text-accent" />
                    Compliance Documentation
                  </h3>
                  {/* 📝 TODO(老徐): 替换为真实文档链接 */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      'Security Whitepaper',
                      'Privacy Policy',
                      'Data Processing Agreement',
                      'Penetration Test Report',
                    ].map((doc) => (
                      <button
                        key={doc}
                        className="flex items-center gap-3 px-4 py-3 bg-background-secondary rounded-xl hover:bg-accent/10 transition-colors text-left"
                      >
                        <FileText className="w-5 h-5 text-text-muted" />
                        <span className="text-body-sm text-text">{doc}</span>
                        <ChevronRight className="w-4 h-4 text-text-muted ml-auto" />
                      </button>
                    ))}
                  </div>
                </Card>
              </motion.div>
            </Container>
          </section>
        )}

        {/* Integrations section */}
        {/* 📝 TODO(老徐): 替换为真实集成平台 Logo */}
        {activeSection === 'integrations' && (
          <section className="py-16 md:py-24 bg-surface">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <Badge variant="accent" className="mb-4">{t('integrations.badge', 'Integrations')}</Badge>
                <h2 className="text-display font-bold text-text mb-4">{t('integrations.title')}</h2>
                <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
                  {t('integrations.subtitle', 'Connect with your existing tools and platforms seamlessly.')}
                </p>
              </motion.div>

              {/* Integration Categories */}
              <div className="space-y-8">
                {/* CRM */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-subheading font-semibold text-text mb-4 flex items-center gap-2">
                    <Users className="w-5 h-5 text-accent" />
                    CRM Platforms
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Salesforce', 'HubSpot', 'Zendesk', 'Freshdesk'].map((platform) => (
                      <Card key={platform} variant="hover" padding="md" className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-background-secondary mx-auto mb-3 flex items-center justify-center">
                          <span className="text-body font-semibold text-text-muted">{platform.charAt(0)}</span>
                        </div>
                        <p className="text-body-sm font-medium text-text">{platform}</p>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Communication */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-subheading font-semibold text-text mb-4 flex items-center gap-2">
                    <Link2 className="w-5 h-5 text-primary-purple" />
                    Communication & Telephony
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Twilio', 'Vonage', 'SIP Trunking', 'WebRTC'].map((platform) => (
                      <Card key={platform} variant="hover" padding="md" className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-background-secondary mx-auto mb-3 flex items-center justify-center">
                          <span className="text-body font-semibold text-text-muted">{platform.charAt(0)}</span>
                        </div>
                        <p className="text-body-sm font-medium text-text">{platform}</p>
                      </Card>
                    ))}
                  </div>
                </motion.div>

                {/* Business Intelligence */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-subheading font-semibold text-text mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary-cyan" />
                    Analytics & BI
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Tableau', 'Power BI', 'Looker', 'Mixpanel'].map((platform) => (
                      <Card key={platform} variant="hover" padding="md" className="text-center">
                        <div className="w-12 h-12 rounded-xl bg-background-secondary mx-auto mb-3 flex items-center justify-center">
                          <span className="text-body font-semibold text-text-muted">{platform.charAt(0)}</span>
                        </div>
                        <p className="text-body-sm font-medium text-text">{platform}</p>
                      </Card>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* API Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-16"
              >
                <Card padding="lg" className="bg-gradient-to-r from-primary-purple/10 to-primary-cyan/10 border-primary-purple/20">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h3 className="text-title font-bold text-text mb-4">RESTful API & Webhooks</h3>
                      <p className="text-body text-text-secondary mb-6">
                        Build custom integrations with our comprehensive API. Real-time webhooks for event-driven architectures.
                      </p>
                      <Link to={getLocalizedPath('/docs')}>
                        <Button variant="primary" rightIcon={<ArrowRight className="w-5 h-5" />}>
                          View API Documentation
                        </Button>
                      </Link>
                    </div>
                    <div className="bg-background-card rounded-xl p-6 border border-border">
                      <code className="text-body-sm text-accent">
                        {`POST /api/v1/calls
{
  "phone": "+1234567890",
  "scenario": "outbound-sales",
  "voice": "female-young"
}`}
                      </code>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Custom Integration CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-8 text-center"
              >
                <p className="text-body text-text-secondary mb-4">
                  Need a custom integration?
                </p>
                <Link to={getLocalizedPath('/company/contact')}>
                  <Button variant="outline" leftIcon={<Link2 className="w-5 h-5" />}>
                    Contact Our Integration Team
                  </Button>
                </Link>
              </motion.div>
            </Container>
          </section>
        )}

        {/* Default/All Features View */}
        {!activeSection && (
          <section className="py-16 md:py-24 bg-surface">
            <Container>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="text-display font-bold text-text mb-4">{t('features.title')}</h2>
                <p className="text-body-lg text-text-secondary">{t('features.subtitle')}</p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card variant="hover" padding="lg" className="h-full">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                        <feature.icon size={24} className="text-accent" />
                      </div>
                      <h3 className="text-subheading font-semibold text-text mb-2">{feature.title}</h3>
                      <p className="text-body text-text-secondary">{feature.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 bg-gradient-cta text-white">
          <Container>
            <div className="text-center">
              <h2 className="text-display font-bold mb-4">{t('cta.title')}</h2>
              <p className="text-body-lg text-white/80 mb-8">{t('cta.subtitle')}</p>
              <Link to={getLocalizedPath('/signup')}>
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight size={20} />}>
                  {t('cta.button')}
                </Button>
              </Link>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Product
