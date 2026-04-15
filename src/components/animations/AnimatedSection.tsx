/**
 * AnimatedSection - 动画区块包装组件
 *
 * 统一的 GSAP 动画包装组件
 * 支持入场、滚动触发、错落动画
 */

import { useEffect, useRef, memo, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface AnimatedSectionProps {
  /**
   * 子元素
   */
  children: ReactNode
  /**
   * 区块标题选择器（应用文字入场动画）
   */
  titleSelector?: string
  /**
   * 内容选择器（应用错落入场动画）
   */
  contentSelector?: string
  /**
   * 入场动画类型
   * @default 'fadeUp'
   */
  entranceAnimation?: 'fadeUp' | 'fadeDown' | 'scale' | 'stagger'
  /**
   * 标题动画时长
   * @default 0.8
   */
  titleDuration?: number
  /**
   * 内容动画时长
   * @default 0.6
   */
  contentDuration?: number
  /**
   * 内容错落间隔
   * @default 0.15
   */
  contentStagger?: number
  /**
   * 触发位置
   * @default 'top 70%'
   */
  start?: string
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 自定义类名
   */
  className?: string
  /**
   * Section ID
   */
  id?: string
}

const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const AnimatedSection = memo(function AnimatedSection({
  children,
  titleSelector = '.section-title',
  contentSelector = '.section-content > *',
  entranceAnimation = 'fadeUp',
  titleDuration = 0.8,
  contentDuration = 0.6,
  contentStagger = 0.15,
  start = 'top 70%',
  disabled = false,
  className = '',
  id,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled || prefersReducedMotion() || !ref.current) return

    // 创建时间线
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ref.current,
        start,
        toggleActions: 'play none none reverse',
      },
    })

    // 标题动画
    if (titleSelector) {
      const title = ref.current.querySelector(titleSelector)
      if (title) {
        tl.from(title, {
          y: entranceAnimation === 'fadeDown' ? -30 : 30,
          opacity: 0,
          duration: titleDuration,
          ease: 'power4.out',
        })
      }
    }

    // 内容错落动画
    if (contentSelector) {
      const contents = ref.current.querySelectorAll(contentSelector)
      if (contents.length > 0) {
        tl.from(contents, {
          y: 20,
          opacity: 0,
          scale: entranceAnimation === 'scale' ? 0.95 : undefined,
          duration: contentDuration,
          stagger: contentStagger,
          ease: 'power2.out',
        }, `-=${titleDuration * 0.3}`) // 标题动画完成 70% 时开始
      }
    }

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [titleSelector, contentSelector, entranceAnimation, titleDuration, contentDuration, contentStagger, start, disabled])

  return (
    <div
      ref={ref}
      className={`animated-section ${className}`}
      id={id}
    >
      {children}
    </div>
  )
})

AnimatedSection.displayName = 'AnimatedSection'

export default AnimatedSection