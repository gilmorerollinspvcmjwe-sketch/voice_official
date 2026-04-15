/**
 * useGSAPAnimation - GSAP 动画 Hook
 *
 * 提供常用的 GSAP 动画效果
 * - 滚动触发入场动画
 * - 文字拆分动画
 * - 卡片交错动画
 */

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 注册插件
gsap.registerPlugin(ScrollTrigger)

/**
 * 检测减弱动画偏好
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * 滚动触发入场动画
 */
export function useScrollReveal<T extends HTMLElement>(
  options: {
    /** 触发位置 */
    start?: string
    /** 结束位置 */
    end?: string
    /** 动画时长 */
    duration?: number
    /** 延迟 */
    delay?: number
    /** 缓动函数 */
    ease?: string
    /** Y 偏移 */
    y?: number
    /** 初始透明度 */
    opacity?: number
    /** 每次触发 */
    toggleActions?: string
    /** 错落间隔 */
    stagger?: number
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    const {
      start = 'top 80%',
      end = 'bottom 20%',
      duration = 0.6,
      delay = 0,
      ease = 'power2.out',
      y = 30,
      opacity = 0,
      toggleActions = 'play none none reverse',
      stagger = 0,
    } = options

    gsap.from(ref.current, {
      y,
      opacity,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: ref.current,
        start,
        end,
        toggleActions,
      },
      stagger,
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [options])

  return ref
}

/**
 * 卡片交错入场动画
 */
export function useStaggerReveal<T extends HTMLElement>(
  selector: string,
  options: {
    /** 触发容器 */
    trigger?: string
    /** 动画时长 */
    duration?: number
    /** 错落间隔 */
    stagger?: number
    /** Y 偏移 */
    y?: number
    /** 缩放 */
    scale?: number
    /** 缓动函数 */
    ease?: string
    /** 滚动 scrub */
    scrub?: boolean | number
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    const {
      duration = 0.6,
      stagger = 0.15,
      y = 60,
      scale = 1,
      ease = 'power2.out',
      scrub = false,
    } = options

    const elements = ref.current.querySelectorAll(selector)
    if (elements.length === 0) return

    const animation = gsap.from(elements, {
      y,
      opacity: 0,
      scale: scale !== 1 ? scale : undefined,
      duration,
      stagger,
      ease,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 70%',
        end: scrub ? 'bottom 30%' : undefined,
        toggleActions: scrub ? undefined : 'play none none reverse',
        scrub: scrub || undefined,
      },
    })

    return () => {
      animation.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [selector, options])

  return ref
}

/**
 * 视差滚动效果
 */
export function useParallax<T extends HTMLElement>(
  selector: string,
  options: {
    /** Y 速度 */
    speed?: number
    /** 透明度变化 */
    opacityRange?: [number, number]
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    const { speed = 0.5, opacityRange } = options

    const elements = ref.current.querySelectorAll(selector)
    if (elements.length === 0) return

    elements.forEach((el) => {
      gsap.to(el, {
        y: `${speed * 100}`,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })

      if (opacityRange) {
        gsap.to(el, {
          opacity: opacityRange[1],
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'bottom 20%',
            scrub: true,
          },
        })
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, [selector, options])

  return ref
}

/**
 * 时间线动画（用于复杂动画序列）
 */
export function useTimeline<T extends HTMLElement>(
  callback: (tl: gsap.core.Timeline, container: T) => void,
  deps: unknown[] = []
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    const tl = gsap.timeline()
    callback(tl, ref.current!)

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach((st) => st.kill())
    }
  }, deps)

  return ref
}

/**
 * 入场动画（页面加载时触发）
 */
export function useEntranceAnimation<T extends HTMLElement>(
  options: {
    /** 动画类型 */
    type?: 'fadeUp' | 'fadeDown' | 'fadeIn' | 'scale' | 'slideLeft' | 'slideRight'
    /** 动画时长 */
    duration?: number
    /** 延迟 */
    delay?: number
    /** 缓动函数 */
    ease?: string
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    const {
      type = 'fadeUp',
      duration = 0.8,
      delay = 0,
      ease = 'power4.out',
    } = options

    const animations = {
      fadeUp: { y: 50, opacity: 0 },
      fadeDown: { y: -50, opacity: 0 },
      fadeIn: { opacity: 0 },
      scale: { scale: 0.9, opacity: 0 },
      slideLeft: { x: 50, opacity: 0 },
      slideRight: { x: -50, opacity: 0 },
    }

    gsap.from(ref.current, {
      ...animations[type],
      duration,
      delay,
      ease,
    })
  }, [options])

  return ref
}

/**
 * 浮动动画（无限循环）
 */
export function useFloatingAnimation<T extends HTMLElement>(
  options: {
    /** Y 振幅 */
    amplitude?: number
    /** 动画时长 */
    duration?: number
  } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return

    const { amplitude = 10, duration = 2 } = options

    gsap.to(ref.current, {
      y: amplitude,
      duration,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
    })
  }, [options])

  return ref
}

export default {
  useScrollReveal,
  useStaggerReveal,
  useParallax,
  useTimeline,
  useEntranceAnimation,
  useFloatingAnimation,
  prefersReducedMotion,
}