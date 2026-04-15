/**
 * AnimatedCounter - 数字滚动动画组件
 * 
 * 功能：
 * - 统计数据数字递增动画
 * - 参考 PolyAI 的数据卡片
 * 
 * 技术方案：Framer Motion useSpring
 */

import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, useSpring, useInView, useMotionValue } from 'framer-motion'

interface AnimatedCounterProps {
  /**
   * 目标数值
   */
  value: number
  /**
   * 动画持续时间（秒）
   * @default 2
   */
  duration?: number
  /**
   * 是否使用千分位分隔符
   * @default true
   */
  useGrouping?: boolean
  /**
   * 小数位数
   * @default 0
   */
  decimals?: number
  /**
   * 前缀（如 $、+ 等）
   */
  prefix?: string
  /**
   * 后缀（如 %、ms 等）
   */
  suffix?: string
  /**
   * 自定义格式化函数
   */
  formatter?: (value: number) => string
  /**
   * 容器类名
   */
  className?: string
  /**
   * 数值类名
   */
  valueClassName?: string
  /**
   * 标签类名
   */
  labelClassName?: string
  /**
   * 标签文字
   */
  label?: string
  /**
   * 是否支持减弱动画
   * @default true
   */
  respectReducedMotion?: boolean
}

export function AnimatedCounter({
  value,
  duration = 2,
  useGrouping = true,
  decimals = 0,
  prefix = '',
  suffix = '',
  formatter,
  className = '',
  valueClassName = '',
  labelClassName = '',
  label,
  respectReducedMotion = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [displayValue, setDisplayValue] = useState(0)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
    duration: duration * 1000,
  })

  // 检测减弱动画偏好
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  useEffect(() => {
    if (!respectReducedMotion) return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
  }, [respectReducedMotion])

  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, value, motionValue])

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(latest)
    })
    return () => unsubscribe()
  }, [springValue])

  const formattedValue = useMemo(() => {
    if (formatter) {
      return formatter(displayValue)
    }
    
    let num = displayValue
    if (decimals > 0) {
      num = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
    }
    
    let str = num.toFixed(decimals)
    
    if (useGrouping) {
      const parts = str.split('.')
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      str = parts.join('.')
    }
    
    return str
  }, [displayValue, decimals, useGrouping, formatter])

  // 减弱动画模式直接显示最终值
  if (isReducedMotion) {
    const finalFormatted = formatter
      ? formatter(value)
      : value.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        })
    
    return (
      <div ref={ref} className={className}>
        <span className={valueClassName}>
          {prefix}{finalFormatted}{suffix}
        </span>
        {label && <span className={labelClassName}>{label}</span>}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <span className={valueClassName}>
        {prefix}
        {formattedValue}
        {suffix}
      </span>
      {label && (
        <motion.span
          className={labelClassName}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: duration * 0.5, duration: 0.3 }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  )
}

/**
 * StatCard - 统计卡片组件
 */
interface StatCardProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

export function StatCard({
  value,
  label,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
}: StatCardProps) {
  return (
    <div className={`p-6 bg-[#1A1A1A] rounded-2xl border border-white/10 ${className}`}>
      <AnimatedCounter
        value={value}
        prefix={prefix}
        suffix={suffix}
        decimals={decimals}
        className="block"
        valueClassName="text-4xl md:text-5xl font-bold text-white block mb-2"
        labelClassName="text-sm text-white/60 block"
        label={label}
      />
    </div>
  )
}

/**
 * CountUp - 简单计数器
 */
interface CountUpProps {
  end: number
  start?: number
  duration?: number
  className?: string
}

export function CountUp({
  end,
  start = 0,
  duration = 2,
  className = '',
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(start)

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      // easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      
      setCount(Math.floor(start + (end - start) * easeProgress))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    
    requestAnimationFrame(animate)
  }, [isInView, start, end, duration])

  return <span ref={ref} className={className}>{count}</span>
}

export default AnimatedCounter
