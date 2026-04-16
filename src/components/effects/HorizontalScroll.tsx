/**
 * HorizontalScroll - 横向滚动区域组件
 * 
 * 方案：wheel delta 直接驱动横向动画，不依赖页面 scrollY。
 * preventDefault 拦截 wheel，wheel 能量全部转为横向位移。
 * 不调用 window.scrollTo，页面完全不滚动。
 */

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion'

interface HorizontalScrollProps {
  children: React.ReactNode[]
  itemWidth?: string | number
  containerHeight?: string
  showProgress?: boolean
  showDots?: boolean
  className?: string
  contentClassName?: string
  itemClassName?: string
  respectReducedMotion?: boolean
  gap?: number
}

export function HorizontalScroll({
  children,
  itemWidth = '100vw',
  containerHeight = '200vh',
  showProgress = true,
  showDots = false,
  className = '',
  contentClassName = '',
  itemClassName = '',
  respectReducedMotion = true,
  gap = 32,
}: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  // wheel 累加值 (px)，直接驱动横向位移
  const accumulatedRef = useRef(0)
  const rawX = useMotionValue(0)
  const smoothX = useSpring(rawX, { stiffness: 150, damping: 20, restDelta: 0.5 })

  // 计算总滚动距离
  const count = children.length
  const getItemWidthPx = useCallback(() => {
    if (typeof itemWidth === 'number') return itemWidth
    if (itemWidth.includes('vw')) {
      return (parseInt(itemWidth, 10) / 100) * window.innerWidth
    }
    return parseInt(itemWidth, 10) || 480
  }, [itemWidth])

  const totalScrollable = (count - 1) * (getItemWidthPx() + gap)

  // 减弱动画偏好
  useEffect(() => {
    if (!respectReducedMotion) return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mq.matches)
    const h = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [respectReducedMotion])

  // 触摸
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0]
    const el = e.currentTarget
    el.dataset.tsx = String(t.clientX)
    el.dataset.tsy = String(t.clientY)
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0]
    const el = e.currentTarget
    const dx = t.clientX - parseFloat(el.dataset.tsx || '0')
    const dy = t.clientY - parseFloat(el.dataset.tsy || '0')
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      e.preventDefault()
    }
  }, [])

  // wheel → 横向位移（核心逻辑）
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 1) return
      e.preventDefault()
      e.stopPropagation()

      const delta = e.deltaY * 2.5
      accumulatedRef.current = Math.max(0, Math.min(totalScrollable, accumulatedRef.current + delta))
      rawX.set(-accumulatedRef.current)

      const progress = totalScrollable > 0 ? accumulatedRef.current / totalScrollable : 0
      setActiveIndex(Math.min(Math.round(progress * (count - 1)), count - 1))
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [totalScrollable, count, gap, itemWidth, rawX])

  // 进度条
  const progressWidth = useTransform(
    rawX,
    [0, -totalScrollable],
    ['0%', '100%']
  )

  // 减弱模式
  if (isReducedMotion) {
    return (
      <div className={className}>
        <div className="flex flex-col gap-8">
          {children.map((child, i) => <div key={i}>{child}</div>)}
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ height: containerHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className={`flex h-full ${contentClassName}`}
          style={{ x: smoothX, gap: `${gap}px` }}
        >
          {children.map((child, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 h-full flex items-center justify-center ${itemClassName}`}
              style={{ width: itemWidth }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: activeIndex === index ? 1 : 0.4,
                scale: activeIndex === index ? 1 : 0.95,
              }}
              transition={{ duration: 0.3 }}
            >
              {child}
            </motion.div>
          ))}
        </motion.div>

        {showProgress && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-[#D4FF00] rounded-full"
              style={{ width: progressWidth }}
            />
          </div>
        )}

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
                  accumulatedRef.current = (index / (count - 1)) * totalScrollable
                  rawX.set(-accumulatedRef.current)
                  setActiveIndex(index)
                }}
              />
            ))}
          </div>
        )}

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

export function FeatureCard({
  icon,
  title,
  description,
  className = '',
}: {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
}) {
  return (
    <div className={`max-w-xl p-8 bg-[#1A1A1A] rounded-3xl border border-white/10 ${className}`}>
      <div className="w-14 h-14 rounded-2xl bg-[#D4FF00]/10 flex items-center justify-center mb-6">
        <div className="text-[#D4FF00]">{icon}</div>
      </div>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-white/60 leading-relaxed">{description}</p>
    </div>
  )
}
