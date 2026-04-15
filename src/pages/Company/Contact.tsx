/**
 * Contact 联系页面
 * 
 * 📝 TODO(老徐): 表单提交对接后端 API
 * 📝 TODO(老徐): 嵌入 Google Maps
 */

import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react'
import { Container, Card, Button, Input } from '@/components/common'

const Contact = () => {
  const { t } = useTranslation('company')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // 📝 TODO(老徐): 表单提交对接后端 API
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <>
      <Helmet>
        <title>{t('contact.seo.title', 'Contact Us - VoiceAI')}</title>
        <meta name="description" content={t('contact.seo.description', 'Get in touch with VoiceAI. Contact our sales team, customer support, or visit our office.')} />
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
              <h1 className="text-hero font-bold mb-6">{t('contact.title', 'Get in Touch')}</h1>
              <p className="text-body-lg text-white/80">
                {t('contact.subtitle', 'Have questions? We\'d love to hear from you. Send us a message and we\'ll respond as soon as possible.')}
              </p>
            </motion.div>
          </Container>
        </section>

        {/* Contact Content */}
        <section className="py-16 md:py-24 bg-surface">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card padding="lg">
                  <h2 className="text-display font-bold text-text mb-6">{t('contact.form.title', 'Send us a message')}</h2>
                  
                  {isSubmitted ? (
                    <div className="text-center py-12">
                      <CheckCircle className="w-16 h-16 text-accent mx-auto mb-4" />
                      <h3 className="text-subheading font-semibold text-text mb-2">{t('contact.form.success', 'Message Sent!')}</h3>
                      <p className="text-body text-text-secondary">{t('contact.form.successMessage', 'We\'ll get back to you within 24 hours.')}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-body-sm font-medium text-text mb-2">
                            {t('contact.form.name', 'Your Name')} *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t('contact.form.namePlaceholder', 'John Smith')}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-body-sm font-medium text-text mb-2">
                            {t('contact.form.email', 'Email Address')} *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={t('contact.form.emailPlaceholder', 'john@company.com')}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-body-sm font-medium text-text mb-2">
                          {t('contact.form.company', 'Company')}
                        </label>
                        <Input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder={t('contact.form.companyPlaceholder', 'Your Company Name')}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-body-sm font-medium text-text mb-2">
                          {t('contact.form.message', 'Message')} *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={5}
                          className="w-full px-4 py-3 bg-background-secondary border border-border rounded-xl text-text placeholder:text-foreground-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                          placeholder={t('contact.form.messagePlaceholder', 'How can we help you?')}
                          required
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        variant="primary" 
                        size="lg" 
                        fullWidth
                        disabled={isSubmitting}
                        leftIcon={!isSubmitting && <Send className="w-5 h-5" />}
                      >
                        {isSubmitting 
                          ? t('contact.form.submitting', 'Sending...') 
                          : t('contact.form.submit', 'Send Message')}
                      </Button>
                    </form>
                  )}
                </Card>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Contact Cards */}
                <div className="grid gap-6">
                  <Card padding="lg" variant="hover">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-subheading font-semibold text-text mb-1">{t('contact.info.email', 'Email')}</h3>
                        <a href="mailto:hello@voiceai.com" className="text-body text-accent hover:underline">
                          hello@voiceai.com
                        </a>
                        <p className="text-caption text-text-muted mt-1">
                          {t('contact.info.emailSupport', 'Support: support@voiceai.com')}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card padding="lg" variant="hover">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-subheading font-semibold text-text mb-1">{t('contact.info.phone', 'Phone')}</h3>
                        <a href="tel:+1-800-VOICE-AI" className="text-body text-accent hover:underline">
                          +1 (800) VOICE-AI
                        </a>
                        <p className="text-caption text-text-muted mt-1">
                          {t('contact.info.phoneHours', 'Mon-Fri, 9am-6pm PST')}
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card padding="lg" variant="hover">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-subheading font-semibold text-text mb-1">{t('contact.info.address', 'Office')}</h3>
                        <p className="text-body text-text-secondary">
                          123 Innovation Drive<br />
                          Suite 500<br />
                          San Francisco, CA 94105
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card padding="lg" variant="hover">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="text-subheading font-semibold text-text mb-1">{t('contact.info.hours', 'Business Hours')}</h3>
                        <p className="text-body text-text-secondary">
                          {t('contact.info.weekdays', 'Monday - Friday')}: 9:00 AM - 6:00 PM PST<br />
                          {t('contact.info.weekend', 'Saturday - Sunday')}: {t('contact.info.closed', 'Closed')}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Map Placeholder */}
                {/* 📝 TODO(老徐): 嵌入 Google Maps */}
                <Card padding="none" className="overflow-hidden">
                  <div className="h-64 bg-background-secondary flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-foreground-muted mx-auto mb-2" />
                      <p className="text-body text-foreground-muted">
                        {/* TODO: Replace with actual Google Maps embed */}
                        <span className="text-accent">📍</span> San Francisco, CA
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}

export default Contact
