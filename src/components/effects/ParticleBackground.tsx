import { useRef, useEffect, useCallback, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

interface ParticleBackgroundProps {
  particleCount?: number
  particleColor?: string
  connectionDistance?: number
  mouseInteraction?: boolean
  mouseRadius?: number
  speed?: number
  className?: string
  respectReducedMotion?: boolean
}

export function ParticleBackground({
  particleCount = 50,
  particleColor = '#D4FF00',
  connectionDistance = 150,
  mouseInteraction = true,
  mouseRadius = 200,
  speed = 0.5,
  className = '',
  respectReducedMotion = true,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, isActive: false })
  const animationRef = useRef<number>()
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    if (!respectReducedMotion) return
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReducedMotion(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [respectReducedMotion])

  const initParticles = useCallback((width: number, height: number) => {
    const particles: Particle[] = []
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        radius: Math.random() * 2 + 1,
      })
    }
    particlesRef.current = particles
  }, [particleCount, speed])

  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    const particles = particlesRef.current

    particles.forEach((particle) => {
      particle.x += particle.vx
      particle.y += particle.vy

      if (mouseInteraction && mouseRef.current.isActive) {
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < mouseRadius && distance > 0) {
          const force = (mouseRadius - distance) / mouseRadius
          particle.vx += (dx / distance) * force * 0.5
          particle.vy += (dy / distance) * force * 0.5
        }
      }

      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0

      const maxSpeed = speed * 2
      const currentSpeed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
      if (currentSpeed > maxSpeed) {
        particle.vx = (particle.vx / currentSpeed) * maxSpeed
        particle.vy = (particle.vy / currentSpeed) * maxSpeed
      }

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle = particleColor
      ctx.globalAlpha = 0.6
      ctx.fill()
      ctx.globalAlpha = 1
    })

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < connectionDistance) {
          const alpha = (1 - distance / connectionDistance) * 0.3
          ctx.beginPath()
          ctx.globalAlpha = alpha
          ctx.strokeStyle = particleColor
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
          ctx.globalAlpha = 1
        }
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [connectionDistance, mouseInteraction, mouseRadius, particleColor, speed])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, isActive: true }
  }, [])

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.isActive = false
  }, [])

  const handleResize = useCallback(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return
    const { width, height } = container.getBoundingClientRect()
    canvas.width = width
    canvas.height = height
    initParticles(width, height)
  }, [initParticles])

  useEffect(() => {
    if (isReducedMotion) return
    handleResize()
    window.addEventListener('resize', handleResize)
    const canvas = canvasRef.current
    if (canvas && mouseInteraction) {
      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseleave', handleMouseLeave)
    }
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (canvas) {
        canvas.removeEventListener('mousemove', handleMouseMove)
        canvas.removeEventListener('mouseleave', handleMouseLeave)
      }
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [animate, handleResize, handleMouseMove, handleMouseLeave, mouseInteraction, isReducedMotion])

  if (isReducedMotion) {
    return (
      <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: `radial-gradient(circle at 30% 20%, ${particleColor}10 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, ${particleColor}08 0%, transparent 50%)`,
          }}
        />
      </div>
    )
  }

  return (
    <div ref={containerRef} className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="absolute inset-0" style={{ touchAction: 'none' }} />
    </div>
  )
}

interface VoiceWaveBackgroundProps {
  barCount?: number
  color?: string
  maxHeight?: number
  className?: string
}

export function VoiceWaveBackground({
  barCount = 50,
  color = '#D4FF00',
  maxHeight = 200,
  className = '',
}: VoiceWaveBackgroundProps) {
  const bars = Array.from({ length: barCount }, (_, i) => ({
    id: i,
    delay: i * 0.05,
    duration: 0.8 + Math.random() * 0.4,
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center gap-1">
        {bars.map((bar) => (
          <motion.div
            key={bar.id}
            className="w-1 rounded-full"
            style={{ backgroundColor: color }}
            animate={{
              height: [20, maxHeight * (0.3 + Math.random() * 0.7), 20],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: bar.duration,
              delay: bar.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A]" />
    </div>
  )
}

interface NeuralNetworkBackgroundProps {
  nodeCount?: number
  className?: string
}

export function NeuralNetworkBackground({
  nodeCount = 30,
  className = '',
}: NeuralNetworkBackgroundProps) {
  const nodes = Array.from({ length: nodeCount }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    connections: Math.floor(Math.random() * 3) + 1,
  }))

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg className="absolute inset-0 w-full h-full">
        {nodes.map((node, i) =>
          Array.from({ length: node.connections }).map((_, j) => {
            const targetIndex = (i + j + 1) % nodes.length
            const target = nodes[targetIndex]
            return (
              <motion.line
                key={`${node.id}-${j}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="#D4FF00"
                strokeWidth="0.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.2 }}
                transition={{
                  duration: 2,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />
            )
          })
        )}
      </svg>

      {nodes.map((node) => (
        <motion.div
          key={node.id}
          className="absolute rounded-full bg-[#D4FF00]"
          style={{
            left: `${node.x}%`,
            top: `${node.y}%`,
            width: node.size,
            height: node.size,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default ParticleBackground