/**
 * GradientButton - 炫彩渐变按钮效果组件
 * 
 * 渐变背景 + 悬停发光 + 粒子跟随（可选）
 */

import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getLocalizedPath } from '@/utils'

interface GradientButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  onClick?: () => void
  disabled?: boolean
  className?: string
  showGlow?: boolean // 是否显示悬停光效
  particleTrail?: boolean // 是否显示粒子拖尾
}

const GradientButton = ({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  disabled = false,
  className = '',
  showGlow = true,
  particleTrail = false,
}: GradientButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const springX = useSpring(mouseX, { stiffness: 300, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 300, damping: 20 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    mouseX.set(x)
    mouseY.set(y)

    // Particle trail effect
    if (particleTrail && isHovered) {
      const newParticle = { id: Date.now(), x, y }
      setParticles(prev => [...prev.slice(-10), newParticle])
    }
  }, [mouseX, mouseY, particleTrail, isHovered])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setParticles([])
  }, [])

  const sizeClasses = {
    sm: 'px-4 py-2 text-body-sm',
    md: 'px-6 py-3 text-body',
    lg: 'px-8 py-4 text-body-lg',
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-purple via-primary-blue to-primary-cyan text-white',
    secondary: 'bg-gradient-to-r from-accent via-accent-lime to-accent text-background-primary',
    outline: 'border-2 border-accent bg-transparent text-accent hover:bg-accent/10',
  }

  const content = (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-xl font-semibold transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {/* Animated gradient background */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary-purple via-primary-blue to-primary-cyan opacity-90"
          animate={{
            backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : ['0% 50%'],
          }}
          transition={{
            duration: 3,
            repeat: isHovered ? Infinity : 0,
            ease: 'linear',
          }}
          style={{
            backgroundSize: '200% 100%',
          }}
        />
      )}

      {/* Glow effect on hover */}
      {showGlow && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute w-32 h-32 bg-accent/30 rounded-full blur-2xl"
            style={{
              left: mouseX,
              top: mouseY,
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              x: '-50%',
              y: '-50%',
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      )}

      {/* Follow cursor light */}
      {showGlow && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${springX}px ${springY}px, rgba(255,255,255,0.15) 0%, transparent 50%)`,
          }}
        />
      )}

      {/* Particle trail */}
      {particleTrail && (
        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-accent rounded-full pointer-events-none"
              initial={{ x: particle.x, y: particle.y, opacity: 1, scale: 1 }}
              animate={{ x: particle.x, y: particle.y - 50, opacity: 0, scale: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              style={{ transform: 'translate(-50%, -50%)' }}
            />
          ))}
        </AnimatePresence>
      )}

      {/* Button content */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>

      {/* Shine effect on hover */}
      {showGlow && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ x: '-100%', opacity: 0.5 }}
          animate={isHovered ? { x: '100%', opacity: 0 } : { x: '-100%', opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          }}
        />
      )}
    </motion.button>
  )

  if (href) {
    return (
      <Link to={getLocalizedPath(href)}>
        {content}
      </Link>
    )
  }

  return content
}

export default GradientButton
