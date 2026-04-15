/**
 * CTAButton - 统一的 CTA 按钮组件
 * 
 * 标准化按钮效果，确保全站一致性：
 * - primary: ElectricBorder 电光效果 + 金色渐变背景（主 CTA）
 * - secondary: StarBorder 流动光效 + 边框（次要按钮）
 * - default: 简洁边框样式（普通按钮）
 */

import { forwardRef, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@/utils'
import ElectricBorder from './ElectricBorder'
import StarBorder from './StarBorder'

interface CTAButtonProps {
  /**
   * 按钮变体
   * - primary: 电光效果 + 金色渐变（主 CTA）
   * - secondary: 流动光效边框（次要按钮）
   * - default: 简洁样式（普通按钮）
   * - outline: 边框样式（透明背景）
   */
  variant?: 'primary' | 'secondary' | 'default' | 'outline'
  /**
   * 按钮大小
   */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /**
   * 按钮内容
   */
  children?: ReactNode
  /**
   * 左侧图标
   */
  leftIcon?: ReactNode
  /**
   * 右侧图标
   */
  rightIcon?: ReactNode
  /**
   * 点击事件
   */
  onClick?: () => void
  /**
   * 链接地址（使用 Link 组件）
   */
  href?: string
  /**
   * 是否禁用
   */
  disabled?: boolean
  /**
   * 全宽
   */
  fullWidth?: boolean
  /**
   * 自定义类名
   */
  className?: string
}

const sizeStyles = {
  sm: 'px-4 py-2 text-body-sm',
  md: 'px-6 py-3 text-body',
  lg: 'px-8 py-4 text-body-lg',
  xl: 'px-10 py-5 text-subheading',
}

const CTAButton = forwardRef<HTMLButtonElement, CTAButtonProps>(
  ({
    variant = 'default',
    size = 'md',
    children,
    leftIcon,
    rightIcon,
    onClick,
    href,
    disabled = false,
    fullWidth = false,
    className = '',
  }, ref) => {
    const buttonContent = (
      <>
        {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </>
    )

    const motionProps = {
      whileHover: { scale: 1.02, y: -2 },
      whileTap: { scale: 0.98 },
    }

    // 主 CTA 按钮 - ElectricBorder + 金色渐变
    if (variant === 'primary') {
      const inner = (
        <motion.div {...motionProps}>
          <ElectricBorder color="#D4FF00" intensity={2} speed={1500}>
            <span
              className={cn(
                'inline-flex items-center justify-center gap-2 font-semibold rounded-xl',
                'bg-gradient-gold text-background-primary',
                sizeStyles[size],
                fullWidth && 'w-full',
                className
              )}
            >
              {buttonContent}
            </span>
          </ElectricBorder>
        </motion.div>
      )

      if (href) {
        return <Link to={href}>{inner}</Link>
      }
      return <button ref={ref} onClick={onClick} disabled={disabled}>{inner}</button>
    }

    // 次要按钮 - StarBorder + 边框
    if (variant === 'secondary') {
      const inner = (
        <motion.div {...motionProps}>
          <StarBorder color="#D4A574" speed="5s" thickness={2} variant="gold">
            <span
              className={cn(
                'inline-flex items-center justify-center gap-2 font-semibold rounded-xl',
                'bg-background-card/80 text-foreground-primary border border-gold/30',
                sizeStyles[size],
                fullWidth && 'w-full',
                className
              )}
            >
              {buttonContent}
            </span>
          </StarBorder>
        </motion.div>
      )

      if (href) {
        return <Link to={href}>{inner}</Link>
      }
      return <button ref={ref} onClick={onClick} disabled={disabled}>{inner}</button>
    }

    // 边框按钮 - StarBorder 紫色光效
    if (variant === 'outline') {
      const inner = (
        <motion.div {...motionProps}>
          <StarBorder color="#8B5CF6" speed="6s" thickness={2} variant="purple">
            <span
              className={cn(
                'inline-flex items-center justify-center gap-2 font-semibold rounded-xl',
                'bg-background-card/90 text-foreground-primary border border-primary-purple/30',
                sizeStyles[size],
                fullWidth && 'w-full',
                className
              )}
            >
              {buttonContent}
            </span>
          </StarBorder>
        </motion.div>
      )

      if (href) {
        return <Link to={href}>{inner}</Link>
      }
      return <button ref={ref} onClick={onClick} disabled={disabled}>{inner}</button>
    }

    // 默认按钮 - 简洁样式
    const inner = (
      <motion.button
        ref={ref}
        {...motionProps}
        onClick={onClick}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-300',
          'bg-background-hover text-foreground-primary hover:bg-background-elevated border border-border',
          sizeStyles[size],
          fullWidth && 'w-full',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        {buttonContent}
      </motion.button>
    )

    if (href) {
      return <Link to={href}>{inner}</Link>
    }
    return inner
  }
)

CTAButton.displayName = 'CTAButton'

export default CTAButton