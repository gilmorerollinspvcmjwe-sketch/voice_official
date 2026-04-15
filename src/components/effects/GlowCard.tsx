/**
 * GlowCard - 光效卡片组件
 * 
 * 功能：
 * - 卡片悬停时光效扫过
 * - 按钮光效
 * - 边框发光动画
 * 
 * 技术方案：CSS pseudo-elements + animation
 */

import { useRef, useState, useCallback, useMemo } from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface GlowCardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  children: React.ReactNode
  /**
   * 发光颜色
   * @default '#D4FF00'
   */
  glowColor?: string
  /**
   * 发光强度
   * @default 20
   */
  glowIntensity?: number
  /**
   * 是否启用悬停光效
   * @default true
   */
  hoverGlow?: boolean
  /**
   * 是否启用边框发光
   * @default false
   */
  borderGlow?: boolean
  /**
   * 是否启用扫过光效
   * @default true
   */
  sweepEffect?: boolean
  /**
   * 卡片背景色
   * @default '#1A1A1A'
   */
  backgroundColor?: string
  /**
   * 是否支持减弱动画
   * @default true
   */
  respectReducedMotion?: boolean
}

export function GlowCard({
  children,
  glowColor = '#D4FF00',
  glowIntensity = 20,
  hoverGlow = true,
  borderGlow = false,
  sweepEffect = true,
  backgroundColor = '#1A1A1A',
  className = '',
  respectReducedMotion = true,
  ...props
}: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
  }, [])

  const glowStyle = useMemo(() => {
    if (!isHovered || !hoverGlow) return {}
    return {
      background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, ${glowColor}${Math.round(glowIntensity * 2.55).toString(16).padStart(2, '0')}, transparent 50%)`,
    }
  }, [isHovered, hoverGlow, mousePosition, glowColor, glowIntensity])

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ backgroundColor }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={respectReducedMotion ? {} : { scale: 1.02 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {/* 扫过光效层 */}
      {sweepEffect && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `linear-gradient(105deg, transparent 40%, ${glowColor}15 45%, ${glowColor}20 50%, ${glowColor}15 55%, transparent 60%)`,
            transform: isHovered ? 'translateX(100%)' : 'translateX(-100%)',
            transition: 'transform 0.6s ease-out, opacity 0.3s ease-out',
          }}
        />
      )}

      {/* 鼠标跟随光效 */}
      {hoverGlow && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            ...glowStyle,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* 边框发光 */}
      {borderGlow && (
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            boxShadow: isHovered
              ? `inset 0 0 ${glowIntensity}px ${glowColor}40, 0 0 ${glowIntensity}px ${glowColor}20`
              : 'none',
            transition: 'box-shadow 0.3s ease-out',
          }}
        />
      )}

      {/* 内容 */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

/**
 * GlowButton - 发光按钮组件
 */
interface GlowButtonProps {
  children: React.ReactNode
  /**
   * 发光颜色
   * @default '#D4FF00'
   */
  glowColor?: string
  /**
   * 按钮变体
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'outline'
  /**
   * 按钮尺寸
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 自定义类名
   */
  className?: string
  /**
   * 点击事件
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * 按钮类型
   */
  type?: 'button' | 'submit' | 'reset'
  /**
   * 无障碍标签
   */
  ariaLabel?: string
}

export function GlowButton({
  children,
  glowColor = '#D4FF00',
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  disabled,
  onClick,
  type = 'button',
  ariaLabel,
}: GlowButtonProps) {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantClasses = {
    primary: `bg-[${glowColor}] text-black hover:brightness-110`,
    secondary: 'bg-white/10 text-white hover:bg-white/20',
    outline: `border-2 border-[${glowColor}] text-[${glowColor}] hover:bg-[${glowColor}]/10`,
  }

  return (
    <motion.button
      className={`relative rounded-full font-medium transition-all duration-300 ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      style={{
        boxShadow: variant === 'primary'
          ? `0 0 20px ${glowColor}40, 0 0 40px ${glowColor}20`
          : 'none',
      }}
      whileHover={{ scale: disabled || loading ? 1 : 1.05 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.95 }}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
    >
      {/* 发光动画层 */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `radial-gradient(circle at center, ${glowColor}30, transparent 70%)`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* 内容 */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {loading && (
          <motion.span
            className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        )}
        {children}
      </span>
    </motion.button>
  )
}

/**
 * BorderGlowCard - 边框发光卡片
 */
interface BorderGlowCardProps {
  children: React.ReactNode
  /**
   * 边框发光颜色
   * @default '#D4FF00'
   */
  glowColor?: string
  /**
   * 发光强度
   * @default 2
   */
  glowIntensity?: number
  /**
   * 是否持续发光
   * @default true
   */
  persistent?: boolean
  className?: string
}

export function BorderGlowCard({
  children,
  glowColor = '#D4FF00',
  glowIntensity = 2,
  persistent = true,
  className = '',
}: BorderGlowCardProps) {
  return (
    <div
      className={`relative rounded-2xl bg-[#1A1A1A] p-1 ${className}`}
      style={{
        boxShadow: persistent
          ? `0 0 ${glowIntensity * 10}px ${glowColor}30, inset 0 0 ${glowIntensity * 5}px ${glowColor}10`
          : 'none',
      }}
    >
      {/* 边框光效 */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${glowColor}20 0%, transparent 50%, ${glowColor}20 100%)`,
        }}
      />
      
      {/* 内容区域 */}
      <div className="relative rounded-xl bg-[#0A0A0A] p-6">
        {children}
      </div>
    </div>
  )
}

export default GlowCard
