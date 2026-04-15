/**
 * InfiniteCarousel - 无限滚动轮播组件
 * 
 * 功能：
 * - 客户 Logo 无限滚动轮播
 * - 产品功能卡片轮播
 * - testimonials 评价轮播
 * 
 * 技术方案：Framer Motion + CSS Animation
 */

import { useRef, useEffect, useState, useCallback, useMemo } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselItem {
  id: string | number
  content: React.ReactNode
}

interface InfiniteCarouselProps {
  items: CarouselItem[]
  /**
   * 滚动方向
   * @default 'left'
   */
  direction?: 'left' | 'right'
  /**
   * 滚动速度（像素/秒）
   * @default 50
   */
  speed?: number
  /**
   * 是否暂停悬停
   * @default true
   */
  pauseOnHover?: boolean
  /**
   * 是否显示导航箭头
   * @default false
   */
  showArrows?: boolean
  /**
   * 是否显示指示器
   * @default false
   */
  showIndicators?: boolean
  /**
   * 是否自动播放
   * @default true
   */
  autoPlay?: boolean
  /**
   * 项目间距
   * @default 24
   */
  gap?: number
  /**
   * 容器类名
   */
  className?: string
  /**
   * 项目类名
   */
  itemClassName?: string
  /**
   * 是否支持减弱动画
   * @default true
   */
  respectReducedMotion?: boolean
}

export function InfiniteCarousel({
  items,
  direction = 'left',
  speed = 50,
  pauseOnHover = true,
  showArrows = false,
  showIndicators = false,
  autoPlay = true,
  gap = 24,
  className = '',
  itemClassName = '',
  respectReducedMotion = true,
}: InfiniteCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  // 检测减弱动画偏好
  useEffect(() => {
    if (!respectReducedMotion) return
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [respectReducedMotion])

  // 复制项目以实现无缝循环
  const duplicatedItems = useMemo(() => [...items, ...items, ...items], [items])

  // 计算动画持续时间
  const animationDuration = useMemo(() => {
    const totalWidth = items.length * 200 // 估算每个项目宽度
    return totalWidth / speed
  }, [items.length, speed])

  // CSS 动画样式
  const animationStyle = useMemo(() => {
    if (isReducedMotion) return {}
    
    const animationDirection = direction === 'left' ? 'normal' : 'reverse'
    return {
      animation: `scroll ${animationDuration}s linear infinite`,
      animationDirection,
      animationPlayState: isPaused || !autoPlay ? 'paused' : 'running',
    }
  }, [animationDuration, direction, isPaused, autoPlay, isReducedMotion])

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true)
  }, [pauseOnHover])

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false)
  }, [pauseOnHover])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  // 减弱动画模式下的变体
  const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
  }

  if (isReducedMotion) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <motion.div
          className="flex"
          style={{ gap }}
          initial="hidden"
          animate="visible"
          variants={reducedMotionVariants}
        >
          {items.map((item) => (
            <div key={item.id} className={itemClassName}>
              {item.content}
            </div>
          ))}
        </motion.div>
      </div>
    )
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
      
      <div
        ref={containerRef}
        className="flex"
        style={{
          ...animationStyle,
          gap,
          width: 'fit-content',
        }}
      >
        {duplicatedItems.map((item, index) => (
          <motion.div
            key={`${item.id}-${index}`}
            className={`flex-shrink-0 ${itemClassName}`}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {item.content}
          </motion.div>
        ))}
      </div>

      {/* 导航箭头 */}
      {showArrows && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* 指示器 */}
      {showIndicators && (
        <div className="flex justify-center gap-2 mt-4">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex 
                  ? 'bg-[#D4FF00] w-6' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

/**
 * LogoCarousel - Logo 无限滚动专用组件
 */
interface LogoItem {
  id: string
  name: string
  logo: React.ReactNode
}

interface LogoCarouselProps {
  logos: LogoItem[]
  className?: string
}

export function LogoCarousel({ logos, className = '' }: LogoCarouselProps) {
  const items = useMemo(
    () =>
      logos.map((logo) => ({
        id: logo.id,
        content: (
          <div className="flex items-center justify-center px-8 py-4 grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300">
            {logo.logo}
          </div>
        ),
      })),
    [logos]
  )

  return (
    <InfiniteCarousel
      items={items}
      direction="left"
      speed={40}
      gap={48}
      className={className}
      pauseOnHover={true}
    />
  )
}

/**
 * TestimonialCarousel - 评价轮播专用组件
 */
interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
  className?: string
}

export function TestimonialCarousel({
  testimonials,
  className = '',
}: TestimonialCarouselProps) {
  const items = useMemo(
    () =>
      testimonials.map((t) => ({
        id: t.id,
        content: (
          <div className="w-[400px] p-6 bg-[#1A1A1A] rounded-2xl border border-white/10">
            <p className="text-white/80 text-sm leading-relaxed mb-4">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              {t.avatar ? (
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-[#D4FF00]/20 flex items-center justify-center">
                  <span className="text-[#D4FF00] font-semibold">
                    {t.author.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="text-white font-medium text-sm">{t.author}</p>
                <p className="text-white/50 text-xs">
                  {t.role} at {t.company}
                </p>
              </div>
            </div>
          </div>
        ),
      })),
    [testimonials]
  )

  return (
    <InfiniteCarousel
      items={items}
      direction="right"
      speed={30}
      gap={24}
      className={className}
      pauseOnHover={true}
    />
  )
}

export default InfiniteCarousel
