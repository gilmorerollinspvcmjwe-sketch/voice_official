/**
 * StarBorder - 流动光效边框组件
 *
 * 改造版：适配 voice-ai-website 设计系统
 * - 支持 Tailwind 类名
 * - 融入深色主题配色
 * - 支持减弱动画偏好
 */

import { type ReactNode } from 'react'

interface StarBorderProps {
  /**
   * 边框光效颜色
   * @default '#D4A574' (gold)
   */
  color?: string
  /**
   * 动画速度
   * @default '6s'
   */
  speed?: string
  /**
   * 边框厚度（px）
   * @default 3
   */
  thickness?: number
  /**
   * 内容区域样式变体
   * @default 'default'
   */
  variant?: 'default' | 'gold' | 'lime' | 'purple'
  /**
   * 是否禁用动画（减弱动画偏好）
   * @default false
   */
  noAnimation?: boolean
  /**
   * 子元素
   */
  children?: ReactNode
  /**
   * 自定义类名
   */
  className?: string
}

const StarBorder = ({
  className = '',
  color = '#D4A574',
  speed = '6s',
  thickness = 3,
  variant = 'default',
  noAnimation = false,
  children,
}: StarBorderProps) => {
  // 内容区域样式
  const getInnerClasses = () => {
    const baseClasses = 'relative z-10 rounded-xl'
    switch (variant) {
      case 'gold':
        return `${baseClasses} bg-background-card border border-gold/30 text-foreground-primary`
      case 'lime':
        return `${baseClasses} bg-background-card border border-accent-lime/30 text-foreground-primary`
      case 'purple':
        return `${baseClasses} bg-background-card border border-primary-purple/30 text-foreground-primary`
      default:
        return `${baseClasses} bg-background-card border border-border text-foreground-primary`
    }
  }

  return (
    <div
      className={`relative inline-block overflow-hidden rounded-xl ${className}`}
      style={{ padding: `${thickness}px 0` }}
    >
      {/* 上边框光效 */}
      <div
        className={`absolute w-[300%] h-1/2 opacity-70 rounded-full pointer-events-none z-0 ${
          noAnimation ? '' : 'animate-star-bottom'
        }`}
        style={{
          bottom: -12,
          right: '-250%',
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />

      {/* 下边框光效 */}
      <div
        className={`absolute w-[300%] h-1/2 opacity-70 rounded-full pointer-events-none z-0 ${
          noAnimation ? '' : 'animate-star-top'
        }`}
        style={{
          top: -12,
          left: '-250%',
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
        }}
      />

      {/* 内容区域 */}
      <div className={getInnerClasses()}>
        {children}
      </div>
    </div>
  )
}

StarBorder.displayName = 'StarBorder'

export default StarBorder