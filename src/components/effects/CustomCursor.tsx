/**
 * CustomCursor - 自定义光标组件
 * 
 * 功能：
 * - 自定义光标
 * - 悬停放大效果
 * 
 * 技术方案：Framer Motion + mouse tracking
 */

import { useEffect, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface CustomCursorProps {
  /**
   * 光标大小
   * @default 20
   */
  size?: number
  /**
   * 光标颜色
   * @default '#D4FF00'
   */
  color?: string
  /**
   * 悬停时放大倍数
   * @default 2
   */
  hoverScale?: number
  /**
   * 是否混合模式
   * @default true
   */
  blendMode?: boolean
  /**
   * 是否仅在特定元素上显示
   * @default false
   */
  targetOnly?: boolean
  /**
   * 目标选择器
   * @default '[data-cursor-hover]'
   */
  targetSelector?: string
}

export function CustomCursor({
  size = 20,
  color = '#D4FF00',
  hoverScale = 2,
  blendMode = true,
  targetOnly = false,
  targetSelector = '[data-cursor-hover]',
}: CustomCursorProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 400 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    // 检测触摸设备
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX - size / 2)
    cursorY.set(e.clientY - size / 2)
    setIsVisible(true)
  }, [cursorX, cursorY, size])

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false)
  }, [])

  useEffect(() => {
    if (isTouchDevice) return

    window.addEventListener('mousemove', handleMouseMove)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    // 监听悬停目标
    if (targetOnly) {
      const targets = document.querySelectorAll(targetSelector)
      targets.forEach((target) => {
        target.addEventListener('mouseenter', () => setIsHovering(true))
        target.addEventListener('mouseleave', () => setIsHovering(false))
      })
    } else {
      const handleElementHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        const isClickable =
          target.tagName === 'BUTTON' ||
          target.tagName === 'A' ||
          target.closest('button') ||
          target.closest('a') ||
          target.closest(targetSelector)
        setIsHovering(!!isClickable)
      }
      window.addEventListener('mouseover', handleElementHover)
      return () => {
        window.removeEventListener('mouseover', handleElementHover)
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseMove, handleMouseLeave, isTouchDevice, targetOnly, targetSelector])

  // 触摸设备不显示自定义光标
  if (isTouchDevice) return null

  return (
    <>
      {/* 隐藏默认光标 */}
      <style>{`
        * {
          cursor: none !important;
        }
        @media (pointer: coarse) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>

      {/* 主光标 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: size,
          height: size,
          backgroundColor: color,
          mixBlendMode: blendMode ? 'difference' : 'normal',
        }}
        animate={{
          scale: isHovering ? hoverScale : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.2 },
          opacity: { duration: 0.2 },
        }}
      />

      {/* 光标拖尾 */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border-2"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          width: size * 1.5,
          height: size * 1.5,
          borderColor: color,
          marginLeft: -size * 0.25,
          marginTop: -size * 0.25,
        }}
        animate={{
          scale: isHovering ? hoverScale * 1.2 : 1,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{
          scale: { duration: 0.3, delay: 0.05 },
          opacity: { duration: 0.2 },
        }}
      />
    </>
  )
}

/**
 * CursorProvider - 光标上下文提供者
 */
interface CursorProviderProps {
  children: React.ReactNode
  /**
   * 是否启用自定义光标
   * @default true
   */
  enabled?: boolean
}

export function CursorProvider({ children, enabled = true }: CursorProviderProps) {
  return (
    <>
      {enabled && <CustomCursor />}
      {children}
    </>
  )
}

/**
 * CursorHover - 悬停触发区域
 */
interface CursorHoverProps {
  children: React.ReactNode
  /**
   * 悬停时光标文本
   */
  text?: string
  /**
   * 悬停时缩放
   * @default 2
   */
  scale?: number
  className?: string
}

export function CursorHover({
  children,
  text,
  scale = 2,
  className = '',
}: CursorHoverProps) {
  return (
    <div
      className={className}
      data-cursor-hover
      data-cursor-text={text}
      data-cursor-scale={scale}
    >
      {children}
    </div>
  )
}

export default CustomCursor
