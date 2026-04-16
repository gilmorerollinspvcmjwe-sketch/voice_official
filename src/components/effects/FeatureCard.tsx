/**
 * FeatureCard - 3D Tilt + Glow + Animated Border
 *
 * 动画特性：
 * - 3D 倾斜：鼠标跟随卡片倾斜（framer-motion transform3d）
 * - 鼠标跟随光效：径向渐变跟随鼠标位置
 * - 悬浮发光边框：hover 时边框发出柔和光晕
 * - GPU 加速：仅使用 transform + opacity，不触发重排
 */

import { useRef, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'

interface FeatureCardProps {
  children: React.ReactNode
  /**
   * 发光颜色（CSS 颜色值）
   * @default '#8B5CF6' (purple)
   */
  glowColor?: string
  /**
   * 倾斜强度（0-1），值越大倾斜越明显
   * @default 0.08
   */
  tiltStrength?: number
  /**
   * 最大倾斜角度（度）
   * @default 8
   */
  maxTilt?: number
  /**
   * 光效强度（0-100）
   * @default 15
   */
  glowIntensity?: number
  /**
   * 是否启用 3D 倾斜
   * @default true
   */
  enableTilt?: boolean
  /**
   * 是否启用鼠标跟随光效
   * @default true
   */
  enableGlow?: boolean
  /**
   * 是否启用发光边框
   * @default true
   */
  enableBorderGlow?: boolean
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 背景渐变色类名
   */
  bgGradient?: string
}

export function FeatureCard({
  children,
  glowColor = '#8B5CF6',
  tiltStrength = 0.08,
  maxTilt = 8,
  glowIntensity = 15,
  enableTilt = true,
  enableGlow = true,
  enableBorderGlow = true,
  className = '',
  bgGradient = '',
}: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || (!enableTilt && !enableGlow)) return
      const rect = cardRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePos({ x, y })
    },
    [enableTilt, enableGlow],
  )

  const handleMouseEnter = useCallback(() => setIsHovered(true), [])
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setMousePos({ x: 0, y: 0 })
  }, [])

  // 3D 倾斜计算
  const tilt = useMemo(() => {
    if (!isHovered || !enableTilt || !cardRef.current) {
      return { rotateX: 0, rotateY: 0 }
    }
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const deltaX = ((mousePos.x - centerX) / centerX) * maxTilt
    const deltaY = ((mousePos.y - centerY) / centerY) * maxTilt
    return {
      rotateX: -deltaY * tiltStrength * 100 / maxTilt,
      rotateY: deltaX * tiltStrength * 100 / maxTilt,
    }
  }, [isHovered, enableTilt, mousePos, maxTilt, tiltStrength])

  // 光效样式
  const glowStyle = useMemo(() => {
    if (!isHovered || !enableGlow) return {}
    return {
      background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}25, transparent 60%)`,
    }
  }, [isHovered, enableGlow, mousePos, glowColor])

  // 边框发光样式
  const borderGlowStyle = useMemo(() => {
    if (!isHovered || !enableBorderGlow) return {}
    return {
      boxShadow: `
        0 0 ${glowIntensity}px ${glowColor}40,
        0 0 ${glowIntensity * 2}px ${glowColor}20,
        inset 0 0 ${glowIntensity}px ${glowColor}15
      `,
    }
  }, [isHovered, enableBorderGlow, glowColor, glowIntensity])

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${className} ${bgGradient}`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        ...borderGlowStyle,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 250,
        damping: 20,
        mass: 0.8,
      }}
    >
      {/* 鼠标跟随光效层 */}
      {enableGlow && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            ...glowStyle,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* 扫光效果 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            105deg,
            transparent 35%,
            ${glowColor}10 42%,
            ${glowColor}20 48%,
            ${glowColor}10 54%,
            transparent 65%
          )`,
          transform: isHovered ? 'translateX(150%)' : 'translateX(-150%)',
          transition: 'transform 0.8s ease-out',
        }}
      />

      {/* 内容层 */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}
