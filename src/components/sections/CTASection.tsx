/**
 * CTASection - 行动召唤区块
 *
 * 动画升级：
 * - ElectricBorder 电光边框按钮
 * - GSAP 入场动画
 * - GradientText 渐变标题
 */

import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Mail } from 'lucide-react'
import { Container } from '@/components/common'
import { GradientText } from '@/components/effects/GradientText'
import { CTAButton } from '@/components/effects'
import { getLocalizedPath } from '@/utils'

// 注册 GSAP 插件
gsap.registerPlugin(ScrollTrigger)

// 检测减弱动画偏好
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const CTASection = () => {
  const { t } = useTranslation('home')
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  // GSAP 入场动画
  useEffect(() => {
    if (prefersReducedMotion() || !sectionRef.current || !contentRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    })

    // 内容入场
    tl.from(contentRef.current.children, {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 0.6,
      ease: 'power4.out',
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-gradient-cta text-white relative overflow-hidden">
      {/* 背景光效 */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-accent-lime/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary-purple/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative">
        <div ref={contentRef} className="text-center">
          {/* 标题 */}
          <h2 className="text-display font-bold mb-6">
            <GradientText metallic direction="horizontal" speed={3}>
              {t('cta.title')}
            </GradientText>
          </h2>

          {/* 副标题 */}
          <p className="text-body-lg text-white/80 mb-8 max-w-xl mx-auto">
            {t('cta.subtitle')}
          </p>

          {/* Buttons - 使用统一的 CTAButton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* 主按钮 - ElectricBorder */}
            <CTAButton
              variant="primary"
              size="lg"
              href={getLocalizedPath('/signup')}
              rightIcon={<ArrowRight className="w-5 h-5" />}
            >
              {t('cta.buttons.primary')}
            </CTAButton>

            {/* 联系按钮 - StarBorder */}
            <CTAButton
              variant="secondary"
              size="lg"
              href={getLocalizedPath('/company/contact')}
              leftIcon={<Mail className="w-5 h-5" />}
            >
              {t('cta.buttons.secondary')}
            </CTAButton>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default CTASection