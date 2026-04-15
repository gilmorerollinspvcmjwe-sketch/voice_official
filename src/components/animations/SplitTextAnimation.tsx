/**
 * SplitTextAnimation - 文字拆分入场动画
 *
 * GSAP SplitText 入场动画组件
 * 适合 Hero 标题、Section 标题
 */

import { useEffect, useRef, memo } from 'react'
import gsap from 'gsap'

interface SplitTextAnimationProps {
  /**
   * 文字内容
   */
  text: string
  /**
   * 拆分类型
   * @default 'chars'
   */
  splitType?: 'chars' | 'words' | 'lines'
  /**
   * 动画类型
   * @default 'fadeUp'
   */
  animationType?: 'fadeUp' | 'fadeDown' | 'slideLeft' | 'slideRight' | 'scale' | 'random'
  /**
   * 动画时长
   * @default 0.6
   */
  duration?: number
  /**
   * 错落间隔
   * @default 0.03
   */
  stagger?: number
  /**
   * 延迟
   * @default 0
   */
  delay?: number
  /**
   * 缓动函数
   * @default 'power4.out'
   */
  ease?: string
  /**
   * Y 偏移
   * @default 50
   */
  y?: number
  /**
   * 是否禁用
   * @default false
   */
  disabled?: boolean
  /**
   * 自定义类名
   */
  className?: string
}

// 检测减弱动画偏好
const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const SplitTextAnimation = memo(function SplitTextAnimation({
  text,
  splitType = 'chars',
  animationType = 'fadeUp',
  duration = 0.6,
  stagger = 0.03,
  delay = 0,
  ease = 'power4.out',
  y = 50,
  disabled = false,
  className = '',
}: SplitTextAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (disabled || prefersReducedMotion() || !containerRef.current) return

    // 简化的文字拆分（不使用 SplitText 插件）
    const splitText = (text: string, type: string) => {
      if (type === 'words') {
        return text.split(' ')
      } else if (type === 'lines') {
        return [text] // 简化处理
      }
      return text.split('')
    }

    const parts = splitText(text, splitType)

    // 创建文字元素容器
    if (textRef.current) {
      textRef.current.innerHTML = parts
        .map((part) => `<span class="split-char" style="display:inline-block;opacity:0">${part === ' ' ? '&nbsp;' : part}</span>`)
        .join(splitType === 'words' ? ' ' : '')
    }

    // 动画参数
    const animations: Record<string, gsap.TweenVars> = {
      fadeUp: { y, opacity: 0 },
      fadeDown: { y: -y, opacity: 0 },
      slideLeft: { x: 30, opacity: 0 },
      slideRight: { x: -30, opacity: 0 },
      scale: { scale: 0, opacity: 0 },
      random: { y: Math.random() * y, x: (Math.random() - 0.5) * 30, opacity: 0 },
    }

    // 执行动画
    const chars = containerRef.current.querySelectorAll('.split-char')
    gsap.from(chars, {
      ...animations[animationType],
      duration,
      stagger,
      delay,
      ease,
    })
  }, [text, splitType, animationType, duration, stagger, delay, ease, y, disabled])

  return (
    <div ref={containerRef} className={className}>
      <span
        ref={textRef}
        className="split-text-container"
        aria-label={text}
      >
        {text}
      </span>
    </div>
  )
})

SplitTextAnimation.displayName = 'SplitTextAnimation'

export default SplitTextAnimation