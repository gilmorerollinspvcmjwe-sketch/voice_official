/**
 * HorizontalScroll - 横向滚动区域组件
 * 
 * 功能：
 * - 功能特性横向滚动展示
 * - 鼠标滚轮触发横向滚动
 * - 进度指示器
 * - 修复滚动冲突（触摸事件优化）
 * 
 * 技术方案：Framer Motion useScroll + useTransform
 */

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

interface HorizontalScrollProps {
  children: React.ReactNode[]
  /**
   * 每个子元素的宽度
   * @default '100vw'
   */
  itemWidth?: string | number
  /**
   * 容器高度（需要足够高以支持滚动）
   * @default '300vh'
   */
  containerHeight?: string
  /**
   * 是否显示进度指示器
   * @default true
   */
  showProgress?: boolean
  /**
   * 是否显示导航点
   * @default false
   */
  showDots?: boolean
  /**
   * 容器类名
   */
  className?: string
  /**
   * 内容区域类名
   */
  contentClassName?: string
  /**
   * 单个项目类名
   */
  itemClassName?: string
  /**
   * 是否支持减弱动画
   * @default true
   */
  respectReducedMotion?: boolean
  /**
   * 卡片间距（px）
   * @default 32
   */
  gap?: number
}

export function HorizontalScroll({
  children,
  itemWidth = '100vw',
  containerHeight = '300vh',
  showProgress = true,
  showDots = false,
  className = '',
  contentClassName = '',
  itemClassName = '',
  respectReducedMotion = true,
  gap = 32,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false)

  // 检测减弱动画偏好
  useEffect(() => {
    if (!respectReducedMotion) return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [respectReducedMotion])

  // 触摸事件处理 - 修复横向滚动 Bug
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!contentRef.current) return
    
    // 记录初始触摸位置
    contentRef.current.dataset.touchStartX = String(touch.clientX)
    contentRef.current.dataset.touchStartY = String(touch.clientY)
    setIsHorizontalScrolling(false)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    if (!contentRef.current) return
    
    const startX = parseFloat(contentRef.current.dataset.touchStartX || '0')
    const startY = parseFloat(contentRef.current.dataset.touchStartY || '0')
    const deltaX = touch.clientX - startX
    const deltaY = touch.clientY - startY
    
    // 判断滚动方向：横向优先
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 10) {
      setIsHorizontalScrolling(true)
      // 阻止页面纵向滚动
      e.preventDefault()
    }
  }, [])

  const handleTouchEnd = useCallback(() => {
    setIsHorizontalScrolling(false)
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 使用弹簧动画使滚动更流畅
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  // 计算横向位移
  const x = useTransform(
    smoothProgress,
    [0, 1],
    ['0%', `-${(children.length - 1) * 100}%`]
  )

  // 进度条宽度
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  // 监听当前激活的索引
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      const index = Math.round(latest * (children.length - 1))
      setActiveIndex(Math.min(index, children.length - 1))
    })
    return () => unsubscribe()
  }, [smoothProgress, children.length])

  // 减弱动画模式
  if (isReducedMotion) {
    return (
      <div className={`${className}`}>
        <div className={`flex flex-col gap-8 ${contentClassName}`}>
          {children.map((child, index) => (
            <div key={index} className={itemClassName}>
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ height: containerHeight }}
    >
      {/* 固定内容区域 */}
      <div 
        className="sticky top-0 h-screen overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: isHorizontalScrolling ? 'pan-x' : 'auto' }}
      >
        <motion.div
          ref={contentRef}
          className={`flex h-full ${contentClassName}`}
          style={{ x, gap: `${gap}px` }}
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 h-full flex items-center justify-center ${itemClassName}`}
              style={{ width: itemWidth }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>

        {/* 进度指示器 */}
        {showProgress && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#D4FF00] rounded-full"
              style={{ width: progressWidth }}
            />
          </div>
        )}

        {/* 导航点 */}
        {showDots && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
            {children.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-[#D4FF00] w-6'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to section ${index + 1}`}
                onClick={() => {
                  const container = containerRef.current
                  if (!container) return
                  
                  const scrollHeight = container.scrollHeight - window.innerHeight
                  const targetScroll = (index / (children.length - 1)) * scrollHeight
                  window.scrollTo({
                    top: container.offsetTop + targetScroll,
                    behavior: 'smooth',
                  })
                }}
              />
            ))}
          </div>
        )}

        {/* 滚动提示 */}
        <motion.div
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <span className="text-xs uppercase tracking-wider">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-[#D4FF00] to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  )
}

/**
 * FeatureCard - 功能卡片组件（配合 HorizontalScroll 使用）
 */
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}

export function FeatureCard({
  icon,
  title,
  description,
  className = '',
}: FeatureCardProps) {
  return (
    <div
      className={`max-w-xl p-8 bg-[#1A1A1A] rounded-3xl border border-white/10 ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#D4FF00]/10 flex items-center justify-center mb-6">
        <div className="text-[#D4FF00]">{icon}</div>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-white/60 leading-relaxed">{description}</p>
    </div>
  )
}

/**
 * ParallaxHorizontalScroll - 带视差效果的横向滚动
 */
interface ParallaxHorizontalScrollProps extends HorizontalScrollProps {
  /**
   * 视差强度
   * @default 0.2
   */
  parallaxStrength?: number
}

export function ParallaxHorizontalScroll({
  children,
  parallaxStrength: _parallaxStrength = 0.2, // Reserved for future parallax effect enhancement
  ...props
}: ParallaxHorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    if (!props.respectReducedMotion) return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [props.respectReducedMotion])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  })

  const x = useTransform(
    smoothProgress,
    [0, 1],
    ['0%', `-${(children.length - 1) * 100}%`]
  )

  // 进度条宽度 - 必须在条件返回之前调用
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  // 减弱动画模式
  if (isReducedMotion) {
    return (
      <div className={`${props.className}`}>
        <div className={`flex flex-col gap-8 ${props.contentClassName}`}>
          {children.map((child, index) => (
            <div key={index} className={props.itemClassName}>
              {child}
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${props.className}`}
      style={{ height: props.containerHeight }}
    >
      {/* 固定内容区域 */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className={`flex h-full ${props.contentClassName}`}
          style={{ x }}
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 h-full flex items-center justify-center ${props.itemClassName}`}
              style={{ width: props.itemWidth }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20%' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>

        {/* 进度指示器 */}
        {props.showProgress && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#D4FF00] rounded-full"
              style={{ width: progressWidth }}
            />
          </div>
        )}
      </div>
    </div>
  )
}