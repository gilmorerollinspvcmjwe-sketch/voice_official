/**
 * ParallaxSection - 视差滚动效果组件
 * 
 * 功能：
 * - 多层背景视差
 * - 产品截图浮动效果
 * 
 * 技术方案：Framer Motion useScroll + useTransform
 */

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface ParallaxLayerProps {
  children: React.ReactNode
  /**
   * 视差速度（相对于滚动速度）
   * 1 = 正常速度, 0.5 = 慢速, 2 = 快速
   * @default 0.5
   */
  speed?: number
  /**
   * 初始偏移
   * @default 0
   */
  offset?: number
  className?: string
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  offset = 0,
  className = '',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [offset, offset + (1 - speed) * 100])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: smoothY }}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxSectionProps {
  children: React.ReactNode
  /**
   * 背景层
   */
  background?: React.ReactNode
  /**
   * 前景层
   */
  foreground?: React.ReactNode
  /**
   * 背景视差速度
   * @default 0.3
   */
  backgroundSpeed?: number
  /**
   * 前景视差速度
   * @default 1.5
   */
  foregroundSpeed?: number
  /**
   * 容器高度
   * @default '100vh'
   */
  height?: string
  className?: string
  /**
   * 是否支持减弱动画
   * @default true
   */
  respectReducedMotion?: boolean
}

export function ParallaxSection({
  children,
  background,
  foreground,
  backgroundSpeed = 0.3,
  foregroundSpeed = 1.5,
  height = '100vh',
  className = '',
  respectReducedMotion = true,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    if (!respectReducedMotion) return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [respectReducedMotion])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (1 - backgroundSpeed) * 100]
  )
  const foregroundY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, (foregroundSpeed - 1) * -100]
  )

  const smoothBackgroundY = useSpring(backgroundY, { stiffness: 100, damping: 30 })
  const smoothForegroundY = useSpring(foregroundY, { stiffness: 100, damping: 30 })

  if (isReducedMotion) {
    return (
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
        style={{ height }}
      >
        {background && <div className="absolute inset-0">{background}</div>}
        <div className="relative z-10">{children}</div>
        {foreground && <div className="absolute inset-0 z-20">{foreground}</div>}
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height }}
    >
      {/* 背景层 */}
      {background && (
        <motion.div
          className="absolute inset-0"
          style={{ y: smoothBackgroundY }}
        >
          {background}
        </motion.div>
      )}

      {/* 内容层 */}
      <div className="relative z-10">{children}</div>

      {/* 前景层 */}
      {foreground && (
        <motion.div
          className="absolute inset-0 z-20 pointer-events-none"
          style={{ y: smoothForegroundY }}
        >
          {foreground}
        </motion.div>
      )}
    </div>
  )
}

/**
 * FloatingElement - 浮动元素
 */
interface FloatingElementProps {
  children: React.ReactNode
  /**
   * 浮动幅度
   * @default 20
   */
  amplitude?: number
  /**
   * 浮动周期（秒）
   * @default 4
   */
  duration?: number
  /**
   * 延迟（秒）
   * @default 0
   */
  delay?: number
  className?: string
}

export function FloatingElement({
  children,
  amplitude = 20,
  duration = 4,
  delay = 0,
  className = '',
}: FloatingElementProps) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude / 2, amplitude / 2, -amplitude / 2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * ParallaxImage - 视差图片
 */
interface ParallaxImageProps {
  src: string
  alt: string
  className?: string
}

export function ParallaxImage({
  src,
  alt,
  className = '',
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['-20%', '20%'])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 1.2])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 })

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{ y: smoothY, scale: smoothScale }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  )
}

/**
 * StaggerContainer - 错落动画容器
 */
interface StaggerContainerProps {
  children: React.ReactNode[]
  /**
   * 错落延迟（秒）
   * @default 0.1
   */
  staggerDelay?: number
  className?: string
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = '',
}: StaggerContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <div ref={containerRef} className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: index * staggerDelay,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  )
}

// 导入 useInView
import { useInView } from 'framer-motion'

export default ParallaxSection
