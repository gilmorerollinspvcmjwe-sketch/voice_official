/**
 * SplashCursor - 鼠标轨迹效果
 *
 * React Bits 组件适配版
 * 创建跟随鼠标的彩色轨迹效果
 *
 * @see https://reactbits.dev/components/splash-cursor
 */

import { useEffect, useRef, memo, useCallback } from 'react'

interface SplashCursorProps {
  /**
   * 轨迹颜色数组
   * @default ['#D4FF00', '#00FF88', '#8B5CF6']
   */
  colors?: string[]
  /**
   * 粒子数量
   * @default 20
   */
  particleCount?: number
  /**
   * 粒子大小范围
   * @default { min: 4, max: 12 }
   */
  sizeRange?: { min: number; max: number }
  /**
   * 粒子生命周期（帧数）
   * @default 60
   */
  lifeDuration?: number
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

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
  life: number
  maxLife: number
}

const SplashCursor = memo(function SplashCursor({
  colors = ['#D4FF00', '#00FF88', '#8B5CF6'],
  particleCount = 20,
  sizeRange = { min: 4, max: 12 },
  lifeDuration = 60,
  disabled = false,
  className = '',
}: SplashCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 })

  // 创建粒子
  const createParticle = useCallback((x: number, y: number) => {
    const color = colors[Math.floor(Math.random() * colors.length)]
    const size = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min
    const angle = Math.random() * Math.PI * 2
    const velocity = Math.random() * 2 + 0.5

    return {
      x,
      y,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity,
      size,
      color,
      life: lifeDuration,
      maxLife: lifeDuration,
    }
  }, [colors, sizeRange, lifeDuration])

  useEffect(() => {
    if (disabled || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // 鼠标移动事件
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x
      mouseRef.current.prevY = mouseRef.current.y
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY

      // 根据鼠标移动速度生成粒子
      const dx = mouseRef.current.x - mouseRef.current.prevX
      const dy = mouseRef.current.y - mouseRef.current.prevY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance > 5) {
        // 每移动一定距离生成粒子
        const count = Math.min(Math.floor(distance / 10), particleCount)
        for (let i = 0; i < count; i++) {
          const offsetX = (Math.random() - 0.5) * 20
          const offsetY = (Math.random() - 0.5) * 20
          particlesRef.current.push(
            createParticle(mouseRef.current.x + offsetX, mouseRef.current.y + offsetY)
          )
        }
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    // 动画循环
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 更新和绘制粒子
      particlesRef.current = particlesRef.current.filter((particle) => {
        // 更新位置
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life -= 1

        // 添加轻微重力
        particle.vy += 0.1

        if (particle.life <= 0) return false

        // 计算透明度
        const opacity = particle.life / particle.maxLife

        // 绘制粒子
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * opacity, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
        ctx.shadowColor = particle.color
        ctx.shadowBlur = particle.size * 2 * opacity
        ctx.fill()

        return true
      })

      // 绘制连接线（粒子之间）
      if (particlesRef.current.length > 1) {
        for (let i = 0; i < particlesRef.current.length - 1; i++) {
          const p1 = particlesRef.current[i]
          const p2 = particlesRef.current[i + 1]

          if (p1.color === p2.color) {
            const distance = Math.sqrt(
              Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)
            )

            if (distance < 50) {
              const opacity = Math.min(p1.life, p2.life) / lifeDuration
              ctx.beginPath()
              ctx.moveTo(p1.x, p1.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = `${p1.color}${Math.floor(opacity * 0.5 * 255).toString(16).padStart(2, '0')}`
              ctx.lineWidth = 1
              ctx.stroke()
            }
          }
        }
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [disabled, particleCount, createParticle, lifeDuration])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 z-50 pointer-events-none ${className}`}
      style={{ opacity: disabled ? 0 : 1 }}
    />
  )
})

SplashCursor.displayName = 'SplashCursor'

export default SplashCursor