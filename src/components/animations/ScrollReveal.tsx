/**
 * ScrollReveal - 滚动触发入场动画组件
 *
 * GSAP ScrollTrigger 入场动画
 * 支持多种动画效果
 */

import { useEffect, useRef, memo, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface ScrollRevealProps {
  /**
   * 子元素
   */
  children: ReactNode
  /**
   * 动画类型
   * @default 'fadeUp'
   */
  animation?: 'fadeUp' | 'fadeDown' | 'fadeIn' | 'scale' | 'slideLeft' | 'slideRight' | 'flip'
  /**
   * 动画时长
   * @default 0.6
   */
  duration?: number
  /**
   * 延迟
   * @default 0
   */
  delay?: number
  /**
   * 错落间隔（用于多个子元素）
   * @default 0
   */
  stagger?: number
  /**
   * 缓动函数
   * @default 'power2.out'
   */
  ease?: string
  /**
   * Y 偏移
   * @default 30
   */
  y?: number
  /**
   * X 偏移
   * @default 0
   */
  x?: number
  /**
   * 缩放值
   * @default 1
   */
  scale?: number
  /**
   * 触发位置
   * @default 'top 80%'
   */
  start?: string
  /**
   * 结束位置
   * @default 'bottom 20%'
   */
  end?: string
  /**
   * 触发行为
   * @default 'play none none reverse'
   */
  toggleActions?: string
  /**
   * 是否 scrub（滚动进度控制动画）
   * @default false
   */
  scrub?: boolean | number
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
   * 子元素选择器（用于错落动画）
   */
  childSelector?: string
}

const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const ScrollReveal = memo(function ScrollReveal({
  children,
  animation = 'fadeUp',
  duration = 0.6,
  delay = 0,
  stagger = 0,
  ease = 'power2.out',
  y = 30,
  x = 0,
  scale = 1,
  start = 'top 80%',
  end = 'bottom 20%',
  toggleActions = 'play none none reverse',
  scrub = false,
  disabled = false,
  className = '',
  childSelector,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (disabled || prefersReducedMotion() || !ref.current) return

    // 动画参数
    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { y, opacity: 0 },
      fadeDown: { y: -y, opacity: 0 },
      fadeIn: { opacity: 0 },
      scale: { scale: scale !== 1 ? scale : 0.9, opacity: 0 },
      slideLeft: { x: x || 50, opacity: 0 },
      slideRight: { x: x || -50, opacity: 0 },
      flip: { rotationY: 90, opacity: 0 },
    }

    // 如果有子元素选择器，应用错落动画
    if (childSelector) {
      const elements = ref.current.querySelectorAll(childSelector)
      if (elements.length > 0) {
        gsap.from(elements, {
          ...animations[animation],
          duration,
          stagger,
          delay,
          ease,
          scrollTrigger: {
            trigger: ref.current,
            start,
            end: scrub ? end : undefined,
            toggleActions: scrub ? undefined : toggleActions,
            scrub: scrub || undefined,
          },
        })
      }
    } else {
      // 单个元素动画
      gsap.from(ref.current, {
        ...animations[animation],
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: ref.current,
          start,
          end: scrub ? end : undefined,
          toggleActions: scrub ? undefined : toggleActions,
          scrub: scrub || undefined,
        },
      })
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [animation, duration, delay, stagger, ease, y, x, scale, start, end, toggleActions, scrub, disabled, childSelector])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
})

ScrollReveal.displayName = 'ScrollReveal'

export default ScrollReveal