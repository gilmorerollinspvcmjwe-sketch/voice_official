/**
 * Login 登录页面
 * 
 * 📝 TODO(老徐): 对接认证服务 (Auth0/Cognito)
 */

import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome, Github } from 'lucide-react'
import { useState } from 'react'
import { Container, Card, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'

const Login = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // 📝 TODO(老徐): 对接认证服务 (Auth0/Cognito)
    // Example: await authService.login(email, password)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsLoading(false)
    // Redirect after successful login
    window.location.href = getLocalizedPath('/')
  }

  const handleSocialLogin = async (provider: 'google' | 'github') => {
    // 📝 TODO(老徐): 对接认证服务 (Auth0/Cognito)
    // Example: await authService.socialLogin(provider)
    console.log(`Logging in with ${provider}`)
  }

  return (
    <>
      <Helmet>
        <title>{t('auth.login.seoTitle', 'Log In - VoiceAI')}</title>
        <meta name="description" content={t('auth.login.seoDescription', 'Log in to your VoiceAI account to manage your voice agents, view analytics, and more.')} />
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
                  {t('auth.login.title', 'Welcome Back')}
                </h2>
                <p className="text-body text-text-secondary">
                  {t('auth.login.subtitle', 'Sign in to continue to your dashboard')}
                </p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => handleSocialLogin('google')}
                  leftIcon={<Chrome className="w-5 h-5" />}
                >
                  {t('auth.login.google', 'Continue with Google')}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => handleSocialLogin('github')}
                  leftIcon={<Github className="w-5 h-5" />}
                >
                  {t('auth.login.github', 'Continue with GitHub')}
                </Button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-caption">
                  <span className="px-4 bg-background-card text-text-muted">
                    {t('auth.login.or', 'or')}
                  </span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-body-sm font-medium text-text mb-2">
                    {t('auth.login.email', 'Email Address')}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t('auth.login.emailPlaceholder', 'you@company.com')}
                      className="w-full pl-12 pr-4 py-3 bg-background-secondary border border-border rounded-xl text-text placeholder:text-foreground-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-body-sm font-medium text-text">
                      {t('auth.login.password', 'Password')}
                    </label>
                    <Link
                      to={getLocalizedPath('/forgot-password')}
                      className="text-caption text-accent hover:underline"
                    >
                      {t('auth.login.forgot', 'Forgot password?')}
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground-muted" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t('auth.login.passwordPlaceholder', 'Enter your password')}
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
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-border bg-background-secondary text-accent focus:ring-accent focus:ring-offset-0"
                  />
                  <label htmlFor="remember" className="ml-2 text-body-sm text-text-secondary cursor-pointer">
                    {t('auth.login.remember', 'Remember me for 30 days')}
                  </label>
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
                    ? t('auth.login.loading', 'Signing in...')
                    : t('auth.login.submit', 'Sign In')}
                </Button>
              </form>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-body-sm text-text-secondary">
                  {t('auth.login.noAccount', "Don't have an account?")}{' '}
                  <Link to={getLocalizedPath('/signup')} className="text-accent font-medium hover:underline">
                    {t('auth.login.signUp', 'Sign up')}
                  </Link>
                </p>
              </div>
            </Card>

            {/* Terms */}
            <div className="mt-6 text-center">
              <p className="text-caption text-text-muted">
                {t('auth.login.termsAgree', 'By signing in, you agree to our')}{' '}
                <Link to={getLocalizedPath('/legal/terms')} className="text-accent hover:underline">
                  {t('auth.terms', 'Terms of Service')}
                </Link>
                {' '}{t('auth.login.and', 'and')}{' '}
                <Link to={getLocalizedPath('/legal/privacy')} className="text-accent hover:underline">
                  {t('auth.privacy', 'Privacy Policy')}
                </Link>
              </p>
            </div>
          </motion.div>
        </Container>
      </div>
    </>
  )
}

export default Login
