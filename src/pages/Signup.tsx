/**
 * Signup 注册页面
 * 
 * 📝 TODO(老徐): 对接认证服务 (Auth0/Cognito)
 */

import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Lock, User, Building2, Eye, EyeOff, ArrowRight, Chrome, Github, Check } from 'lucide-react'
import { useState } from 'react'
import { Container, Card, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Signup = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptMarketing, setAcceptMarketing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!acceptTerms) {
      alert(t('auth.signup.termsRequired', 'Please accept the Terms of Service'))
      return
    }
    
    setIsLoading(true)
    
    // 📝 TODO(老徐): 对接认证服务 (Auth0/Cognito)
    // Example: await authService.signup(formData)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    // Redirect after successful signup
    window.location.href = getLocalizedPath('/')
  }

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    // 📝 TODO(老徐): 对接认证服务 (Auth0/Cognito)
    // Example: await authService.socialSignup(provider)
    console.log(`Signing up with ${provider}`)
  }

  const passwordRequirements = [
    { id: 'length', label: t('auth.signup.reqLength', 'At least 8 characters'), met: formData.password.length >= 8 },
    { id: 'upper', label: t('auth.signup.reqUpper', 'One uppercase letter'), met: /[A-Z]/.test(formData.password) },
    { id: 'lower', label: t('auth.signup.reqLower', 'One lowercase letter'), met: /[a-z]/.test(formData.password) },
    { id: 'number', label: t('auth.signup.reqNumber', 'One number'), met: /\d/.test(formData.password) },
  ]

  return (
    <>
      <Helmet>
        <title>{t('auth.signup.seoTitle', 'Sign Up - VoiceAI')}</title>
        <meta name="description" content={t('auth.signup.seoDescription', 'Create your VoiceAI account and start building AI voice agents today. Free trial available.')} />
      </Helmet>

      <div className="min-h-screen bg-background-primary flex items-center justify-center py-12 px-4">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto"
          >
            {/* Logo */}
            <div className="text-center mb-8">
              <Link to={getLocalizedPath('/')}>
                <h1 className="text-display font-bold text-accent">VoiceAI</h1>
              </Link>
            </div>

            <Card padding="lg">
              <div className="text-center mb-8">
                <h2 className="text-title font-bold text-text mb-2">
                  {t('auth.signup.title', 'Create Your Account')}
                </h2>
                <p className="text-body text-text-secondary">
                  {t('auth.signup.subtitle', 'Start your 14-day free trial. No credit card required.')}
                </p>
              </div>

              {/* Social Signup Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => handleSocialLogin('google')}
                  leftIcon={<Chrome className="w-5 h-5" />}
                >
                  {t('auth.signup.google', 'Sign up with Google')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => handleSocialLogin('github')}
                  leftIcon={<Github className="w-5 h-5" />}
                >
                  {t('auth.signup.github', 'Sign up with GitHub')}
                </Button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-caption">
                  <span className="px-4 bg-background-card text-text-muted">
                    {t('auth.signup.or', 'or')}
                  </span>
                </div>
              </div>

              {/* Signup Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-body-sm font-medium text-text mb-2">
                    {t('auth.signup.name', 'Full Name')} *
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t('auth.signup.namePlaceholder', 'John Smith')}
                      className="w-full pl-12 pr-4 py-3 bg-background-secondary border border-border rounded-xl text-text placeholder:text-foreground-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-body-sm font-medium text-text mb-2">
                    {t('auth.signup.email', 'Work Email')} *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t('auth.signup.emailPlaceholder', 'you@company.com')}
                      className="w-full pl-12 pr-4 py-3 bg-background-secondary border border-border rounded-xl text-text placeholder:text-foreground-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-body-sm font-medium text-text mb-2">
                    {t('auth.signup.company', 'Company Name')} *
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder={t('auth.signup.companyPlaceholder', 'Your Company')}
                      className="w-full pl-12 pr-4 py-3 bg-background-secondary border border-border rounded-xl text-text placeholder:text-foreground-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-body-sm font-medium text-text mb-2">
                    {t('auth.signup.password', 'Password')} *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder={t('auth.signup.passwordPlaceholder', 'Create a strong password')}
                      className="w-full pl-12 pr-12 py-3 bg-background-secondary border border-border rounded-xl text-text placeholder:text-foreground-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-muted hover:text-text transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  {/* Password Requirements */}
                  {formData.password && (
                    <div className="mt-3 space-y-1">
                      {passwordRequirements.map((req) => (
                        <div key={req.id} className="flex items-center gap-2 text-caption">
                          <Check className={`w-4 h-4 ${req.met ? 'text-accent' : 'text-foreground-muted'}`} />
                          <span className={req.met ? 'text-accent' : 'text-foreground-muted'}>
                            {req.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="w-4 h-4 mt-1 rounded border-border bg-background-secondary text-accent focus:ring-accent focus:ring-offset-0"
                      required
                    />
                    <label htmlFor="terms" className="text-body-sm text-text-secondary cursor-pointer">
                      {t('auth.signup.termsAgree', 'I agree to the')}{' '}
                      <Link to={getLocalizedPath('/legal/terms')} className="text-accent hover:underline">
                        {t('auth.terms', 'Terms of Service')}
                      </Link>
                      {' '}{t('auth.signup.and', 'and')}{' '}
                      <Link to={getLocalizedPath('/legal/privacy')} className="text-accent hover:underline">
                        {t('auth.privacy', 'Privacy Policy')}
                      </Link>
                      {' '}*
                    </label>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={acceptMarketing}
                      onChange={(e) => setAcceptMarketing(e.target.checked)}
                      className="w-4 h-4 mt-1 rounded border-border bg-background-secondary text-accent focus:ring-accent focus:ring-offset-0"
                    />
                    <label htmlFor="marketing" className="text-body-sm text-text-secondary cursor-pointer">
                      {t('auth.signup.marketingAgree', 'Send me product updates and tips (optional)')}
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={isLoading}
                  rightIcon={!isLoading && <ArrowRight className="w-5 h-5" />}
                >
                  {isLoading
                    ? t('auth.signup.loading', 'Creating account...')
                    : t('auth.signup.submit', 'Create Account')}
                </Button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-body-sm text-text-secondary">
                  {t('auth.signup.hasAccount', 'Already have an account?')}{' '}
                  <Link to={getLocalizedPath('/login')} className="text-accent font-medium hover:underline">
                    {t('auth.signup.login', 'Log in')}
                  </Link>
                </p>
              </div>
            </Card>

            {/* Trial Note */}
            <div className="mt-6 text-center">
              <p className="text-caption text-text-muted">
                {t('auth.signup.trialNote', '14-day free trial includes full access to all Pro features. No credit card required.')}
              </p>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  )
}

export default Signup
