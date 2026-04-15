/**
 * Hyperspeed - 超光速背景效果
 *
 * React Bits 组件适配版
 * 创建星空超光速穿梭效果，适合 Hero 区域背景
 *
 * @see https://reactbits.dev/components/hyperspeed
 */

import { useEffect, useRef, memo } from 'react'

interface HyperspeedProps {
  /**
   * 粒子数量
   * @default 100
   */
  particleCount?: number
  /**
   * 粒子颜色
   * @default '#FFFFFF'
   */
  particleColor?: string
  /**
   * 速度（像素/帧）
   * @default 3
   */
  speed?: number
  /**
   * 粒子大小范围
   * @default { min: 1, max: 3 }
   */
  sizeRange?: { min: number; max: number }
  /**
   * 中心点偏移 (相对画布中心)
   * @default { x: 0, y: 0 }
   */
  centerOffset?: { x: number; y: number }
  /**
   * 是否禁用动画
   * @default false
   */
  disabled?: boolean
  /**
   * 自定义类名
   */
  className?: string
}

interface Star {
  x: number
  y: number
  z: number
  prevX: number
  prevY: number
  size: number
}

const Hyperspeed = memo(function Hyperspeed({
  particleCount = 100,
  particleColor = '#FFFFFF',
  speed = 3,
  sizeRange = { min: 1, max: 3 },
  centerOffset = { x: 0, y: 0 },
  disabled = false,
  className = '',
}: HyperspeedProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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

    // 中心点
    const centerX = canvas.width / 2 + centerOffset.x
    const centerY = canvas.height / 2 + centerOffset.y

    // 初始化星星
    const stars: Star[] = []
    for (let i = 0; i < particleCount; i++) {
      stars.push({
        x: Math.random() * canvas.width - centerX,
        y: Math.random() * canvas.height - centerY,
        z: Math.random() * 1000,
        prevX: 0,
        prevY: 0,
        size: Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min,
      })
    }

    // 动画循环
    let animationId: number
    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.2)' // 半透明背景产生拖尾效果
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        // 更新 Z 位置（向前移动）
        star.z -= speed * 10

        // 如果超出范围，重置到后方
        if (star.z <= 0) {
          star.z = 1000
          star.x = Math.random() * canvas.width - centerX
          star.y = Math.random() * canvas.height - centerY
          star.prevX = centerX + star.x / star.z * 200
          star.prevY = centerY + star.y / star.z * 200
        }

        // 计算屏幕位置（透视投影）
        const scale = 200 / star.z
        const x = centerX + star.x * scale
        const y = centerY + star.y * scale

        // 计算大小（近的更大）
        const size = star.size * scale

        // 绘制轨迹线
        if (star.prevX && star.prevY) {
          ctx.beginPath()
          ctx.moveTo(star.prevX, star.prevY)
          ctx.lineTo(x, y)

          // 线条颜色渐变（近端更亮）
          const opacity = Math.min(1, (1000 - star.z) / 500)
          ctx.strokeStyle = `${particleColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`
          ctx.lineWidth = size * 0.5
          ctx.stroke()
        }

        // 绘制星星点
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.shadowColor = particleColor
        ctx.shadowBlur = size * 2
        ctx.fill()

        // 记录前一帧位置
        star.prevX = x
        star.prevY = y
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [disabled, particleCount, particleColor, speed, sizeRange, centerOffset])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{ background: 'transparent' }}
    />
  )
})

Hyperspeed.displayName = 'Hyperspeed'

export default Hyperspeed