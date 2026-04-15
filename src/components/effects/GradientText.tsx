/**
 * GradientText - 金属色流动文字效果组件
 * 
 * 功能：
 * - 类似 Apple 官网的渐变文字效果
 * - 金属质感 + 流动动画
 * - 用于 Hero 区域大标题
 * 
 * 技术方案：CSS background-clip + 渐变动画
 */

import { useMemo, type CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  /**
   * 渐变方向：horizontal | vertical | diagonal
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical' | 'diagonal'
  /**
   * 动画速度（秒）
   * @default 3
   */
  speed?: number
  /**
   * 是否启用动画
   * @default true
   */
  animated?: boolean
  /**
   * 自定义渐变颜色数组
   */
  colors?: string[]
  /**
   * 是否使用金属质感效果
   * @default true
   */
  metallic?: boolean
  /**
   * 是否支持减弱动画（无障碍）
   * @default true
   */
  respectReducedMotion?: boolean
}

const DEFAULT_COLORS = [
  '#D4FF00', // 荧光绿
  '#00FF88', // 青绿
  '#00D4FF', // 青色
  '#D4FF00', // 荧光绿
]

const METALLIC_COLORS = [
  '#E8E8E8',
  '#C0C0C0',
  '#FFFFFF',
  '#A0A0A0',
  '#D4D4D4',
  '#E8E8E8',
]

export function GradientText({
  children,
  className = '',
  direction = 'horizontal',
  speed = 3,
  animated = true,
  colors,
  metallic = true,
  respectReducedMotion = true,
}: GradientTextProps) {
  const gradientColors = useMemo(() => {
    if (colors) return colors
    return metallic ? METALLIC_COLORS : DEFAULT_COLORS
  }, [colors, metallic])

  const gradientStyle = useMemo<CSSProperties>(() => {
    const gradientString = gradientColors.join(', ')
    
    let gradientDirection: string
    switch (direction) {
      case 'vertical':
        gradientDirection = 'to bottom'
        break
      case 'diagonal':
        gradientDirection = '135deg'
        break
      case 'horizontal':
      default:
        gradientDirection = 'to right'
        break
    }

    return {
      background: `linear-gradient(${gradientDirection}, ${gradientString})`,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
    }
  }, [gradientColors, direction])

  const animationStyle = useMemo<CSSProperties>(() => {
    if (!animated) return {}

    const gradientSize = direction === 'horizontal' ? '200% 100%' : '100% 200%'
    
    return {
      backgroundSize: gradientSize,
      animation: `gradientShift ${speed}s ease infinite`,
    }
  }, [animated, direction, speed])

  const combinedStyle: CSSProperties = {
    ...gradientStyle,
    ...animationStyle,
  }

  return (
    <>
      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .gradient-text-animated {
            animation: none !important;
          }
        }
      `}</style>
      <motion.span
        className={`inline-block ${className}`}
        style={combinedStyle}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        {...(respectReducedMotion && { 'data-animated': animated })}
      >
        {children}
      </motion.span>
    </>
  )
}

/**
 * ShimmerText - 闪烁文字效果（增强版）
 */
interface ShimmerTextProps {
  children: React.ReactNode
  className?: string
  shimmerColor?: string
  baseColor?: string
}

export function ShimmerText({
  children,
  className = '',
  shimmerColor = '#D4FF00',
  baseColor = '#FFFFFF',
}: ShimmerTextProps) {
  return (
    <>
      <style>{`
        .shimmer-text {
          background: linear-gradient(
            90deg,
            ${baseColor} 0%,
            ${baseColor} 40%,
            ${shimmerColor} 50%,
            ${baseColor} 60%,
            ${baseColor} 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
        }
        
        @keyframes shimmer {
          0% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .shimmer-text {
            animation: none;
            background: ${baseColor};
            -webkit-text-fill-color: ${baseColor};
          }
        }
      `}</style>
      <motion.span
        className={`shimmer-text inline-block ${className}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.span>
    </>
  )
}

export default GradientText
