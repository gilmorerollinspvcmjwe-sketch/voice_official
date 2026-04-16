/**
 * MagneticCard - 磁吸聚光灯卡片
 *
 * 组合特效：
 * 1. Magnetic hover — 鼠标靠近时卡片跟随微移，松手弹簧回弹
 * 2. Spotlight — 径向渐变跟随光标，产生探照灯效果
 *
 * 性能：纯 transform + opacity，零重排，GPU 加速
 */

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticCardProps {
  children: React.ReactNode
  className?: string
  /** 磁吸强度 0-1，越大跟随越明显 @default 0.15 */
  strength?: number
  /** 聚光灯颜色 @default lime glow */
  spotlightColor?: string
  /** 是否启用聚光灯 @default true */
  spotlight?: boolean
  /** 是否尊重系统减弱动画设置 @default true */
  respectReducedMotion?: boolean
}

export function MagneticCard({
  children,
  className = '',
  strength = 0.15,
  spotlightColor = 'rgba(212, 255, 0, 0.08)',
  spotlight = true,
  respectReducedMotion = true,
}: MagneticCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [spotPos, setSpotPos] = useState({ x: 0, y: 0 })

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const xSpring = useSpring(x, { stiffness: 200, damping: 20, mass: 0.8 })
  const ySpring = useSpring(y, { stiffness: 200, damping: 20, mass: 0.8 })

  const prefersReduced =
    respectReducedMotion &&
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy

      if (!prefersReduced) {
        x.set(dx * strength)
        y.set(dy * strength)
      }
      if (spotlight) {
        setSpotPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }
    },
    [strength, spotlight, prefersReduced, x, y],
  )

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{ x: xSpring, y: ySpring }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={prefersReduced ? {} : { scale: 1.02 }}
      whileTap={prefersReduced ? {} : { scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {/* Spotlight 聚光灯层 */}
      {spotlight && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            background: `radial-gradient(400px circle at ${spotPos.x}px ${spotPos.y}px, ${spotlightColor}, transparent 60%)`,
          }}
        />
      )}

      {/* 内容层 */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

export default MagneticCard
