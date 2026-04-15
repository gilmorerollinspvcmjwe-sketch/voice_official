/**
 * ElectricBorder - 电光边框组件
 *
 * React Bits 组件适配版
 * 创建电光流动的边框效果，适合 CTA 按钮
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'

interface ElectricBorderProps {
  /**
   * 电光颜色
   * @default '#D4FF00' (荧光绿)
   */
  color?: string
  /**
   * 电光强度 (px)
   * @default 3
   */
  intensity?: number
  /**
   * 动画速度 (ms)
   * @default 2000
   */
  speed?: number
  /**
   * 是否禁用动画
   * @default false
   */
  disabled?: boolean
  /**
   * 子元素
   */
  children?: ReactNode
  /**
   * 自定义类名
   */
  className?: string
}

const ElectricBorder = ({
  className = '',
  color = '#D4FF00',
  intensity = 3,
  speed = 2000,
  disabled = false,
  children,
}: ElectricBorderProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (disabled || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 设置画布尺寸
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (parent) {
        canvas.width = parent.offsetWidth
        canvas.height = parent.offsetHeight
      }
    }
    resizeCanvas()

    // 电光粒子
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      life: number
    }> = []

    // 创建电光粒子
    const createParticle = (x: number, y: number) => {
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        life: 1,
      })
    }

    // 动画循环
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 沿着边框生成电光
      const edgePoints = [
        { x: Math.random() * canvas.width, y: 0 },
        { x: canvas.width, y: Math.random() * canvas.height },
        { x: Math.random() * canvas.width, y: canvas.height },
        { x: 0, y: Math.random() * canvas.height },
      ]

      if (Math.random() < 0.3) {
        const point = edgePoints[Math.floor(Math.random() * edgePoints.length)]
        createParticle(point.x, point.y)
      }

      particles.forEach((p, i) => {
        p.x += p.vx
        p.y += p.vy
        p.life -= 0.02

        if (p.life <= 0) {
          particles.splice(i, 1)
          return
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, intensity * p.life, 0, Math.PI * 2)
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = intensity * 2 * p.life
        ctx.fill()

        if (particles.length > 1) {
          const nextP = particles[i + 1] || particles[0]
          if (nextP) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(nextP.x, nextP.y)
            ctx.strokeStyle = `${color}${Math.floor(p.life * 255).toString(16).padStart(2, '0')}`
            ctx.lineWidth = intensity * 0.5
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    const observer = new IntersectionObserver(
      (entries) => {
        setIsVisible(entries[0].isIntersecting)
      },
      { threshold: 0.1 }
    )
    observer.observe(canvas)

    return () => {
      cancelAnimationFrame(animationId)
      observer.disconnect()
    }
  }, [disabled, color, intensity])

  return (
    <div className={`relative inline-block overflow-hidden rounded-xl ${className}`}>
      {/* CSS 电光效果 */}
      <style>{`
        @keyframes electric-flow-${speed} {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>

      {/* Canvas 电光层 */}
      {!disabled && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 pointer-events-none z-0"
          style={{ opacity: isVisible ? 0.7 : 0 }}
        />
      )}

      {/* CSS 备用边框光效 */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-0 opacity-50"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          animation: disabled ? 'none' : `electric-flow-${speed} ${speed}ms linear infinite`,
          backgroundSize: '200% 100%',
        }}
      />

      {/* 内发光 */}
      <div
        className="absolute inset-0 rounded-xl pointer-events-none z-0"
        style={{
          boxShadow: `inset 0 0 ${intensity * 2}px ${color}40`,
        }}
      />

      {/* 内容区域 */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

ElectricBorder.displayName = 'ElectricBorder'

export default ElectricBorder