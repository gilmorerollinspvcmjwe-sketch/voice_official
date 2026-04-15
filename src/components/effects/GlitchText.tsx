/**
 * GlitchText - 故障文字效果组件
 *
 * React Bits 组件适配版
 * 创建赛博朋克风格的文字故障效果
 *
 * @see https://reactbits.dev/components/glitch-text
 */

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from 'react'

interface GlitchTextProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'style'> {
  /**
   * 文字内容
   */
  children: string
  /**
   * 主色
   * @default '#FFFFFF'
   */
  color?: string
  /**
   * 故障色 1 (偏移红)
   * @default '#FF00FF'
   */
  glitchColor1?: string
  /**
   * 故障色 2 (偏移蓝)
   * @default '#00FFFF'
   */
  glitchColor2?: string
  /**
   * 故障强度
   * @default 'medium'
   */
  intensity?: 'low' | 'medium' | 'high'
  /**
   * 是否禁用动画
   * @default false
   */
  disabled?: boolean
  /**
   * 触发方式
   * @default 'auto'
   */
  trigger?: 'auto' | 'hover' | 'manual'
}

const GlitchText = forwardRef<HTMLSpanElement, GlitchTextProps>(
  ({
    children,
    className = '',
    color = '#FFFFFF',
    glitchColor1 = '#FF00FF',
    glitchColor2 = '#00FFFF',
    intensity = 'medium',
    disabled = false,
    trigger = 'auto',
    ...props
  }, ref) => {
    const textRef = useRef<HTMLSpanElement>(null)
    const [isGlitching, setIsGlitching] = useState(trigger === 'auto')
    const [randomChars, setRandomChars] = useState('')

    // 故障参数
    const glitchConfig = {
      low: { frequency: 0.01, duration: 100, offset: 2 },
      medium: { frequency: 0.03, duration: 150, offset: 4 },
      high: { frequency: 0.05, duration: 200, offset: 6 },
    }

    const config = glitchConfig[intensity]

    // 随机字符生成
    const generateRandomChars = (length: number) => {
      const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'
      return Array.from({ length })
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join('')
    }

    // 自动故障动画
    useEffect(() => {
      if (disabled || trigger !== 'auto') return

      const glitchInterval = setInterval(() => {
        if (Math.random() < config.frequency) {
          setIsGlitching(true)
          setRandomChars(generateRandomChars(children.length))

          setTimeout(() => {
            setIsGlitching(false)
            setRandomChars('')
          }, config.duration)
        }
      }, 100)

      return () => clearInterval(glitchInterval)
    }, [disabled, trigger, config.frequency, config.duration, children.length])

    // hover 触发
    useEffect(() => {
      if (trigger !== 'hover' || !textRef.current) return

      const handleMouseEnter = () => {
        setIsGlitching(true)
        setRandomChars(generateRandomChars(children.length))
      }

      const handleMouseLeave = () => {
        setIsGlitching(false)
        setRandomChars('')
      }

      textRef.current.addEventListener('mouseenter', handleMouseEnter)
      textRef.current.addEventListener('mouseleave', handleMouseLeave)

      return () => {
        if (textRef.current) {
          textRef.current.removeEventListener('mouseenter', handleMouseEnter)
          textRef.current.removeEventListener('mouseleave', handleMouseLeave)
        }
      }
    }, [trigger, children.length])

    // CSS 动画样式
    const glitchStyles = `
      @keyframes glitch-skew {
        0% { transform: skew(0deg); }
        20% { transform: skew(${Math.random() * 20 - 10}deg); }
        40% { transform: skew(-5deg); }
        60% { transform: skew(5deg); }
        80% { transform: skew(0deg); }
        100% { transform: skew(0deg); }
      }
      
      @keyframes glitch-move {
        0% { transform: translate(0); }
        20% { transform: translate(-${config.offset}px, ${config.offset}px); }
        40% { transform: translate(-${config.offset}px, -${config.offset}px); }
        60% { transform: translate(${config.offset}px, ${config.offset}px); }
        80% { transform: translate(${config.offset}px, -${config.offset}px); }
        100% { transform: translate(0); }
      }
      
      @keyframes glitch-flicker {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.8; }
        75% { opacity: 0.9; }
      }
    `

    return (
      <>
        {/* 注入样式 */}
        <style>{glitchStyles}</style>

        <span
          ref={ref || textRef}
          className={`relative inline-block ${className}`}
          style={{
            color,
            animation: disabled || !isGlitching ? 'none' : `glitch-skew ${config.duration}ms ease infinite`,
          }}
          {...props}
        >
          {/* 主文字 */}
          <span
            className="relative z-10"
            style={{
              animation: disabled || !isGlitching ? 'none' : `glitch-flicker ${config.duration}ms ease infinite`,
            }}
          >
            {isGlitching && randomChars ? randomChars : children}
          </span>

          {/* 故障层 1 */}
          {!disabled && (
            <span
              className="absolute inset-0"
              style={{
                color: glitchColor1,
                transform: isGlitching ? `translate(${config.offset}px, 0)` : 'none',
                clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                opacity: isGlitching ? 0.8 : 0,
                animation: isGlitching ? `glitch-move ${config.duration * 2}ms ease infinite` : 'none',
              }}
              aria-hidden="true"
            >
              {children}
            </span>
          )}

          {/* 故障层 2 */}
          {!disabled && (
            <span
              className="absolute inset-0"
              style={{
                color: glitchColor2,
                transform: isGlitching ? `translate(-${config.offset}px, 0)` : 'none',
                clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                opacity: isGlitching ? 0.8 : 0,
                animation: isGlitching ? `glitch-move ${config.duration * 1.5}ms ease infinite reverse` : 'none',
              }}
              aria-hidden="true"
            >
              {children}
            </span>
          )}

          {/* 扫描线效果 */}
          {!disabled && isGlitching && (
            <span
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(transparent 50%, ${color}20 50%)`,
                backgroundSize: '100% 4px',
                animation: `glitch-move ${config.duration * 3}ms linear infinite`,
              }}
              aria-hidden="true"
            />
          )}
        </span>
      </>
    )
  }
)

GlitchText.displayName = 'GlitchText'

export default GlitchText