/**
 * FlipCard - 3D 卡片翻转组件
 * 
 * 功能：
 * - 功能卡片 3D 翻转展示
 * 
 * 技术方案：CSS transform-style: preserve-3d
 */

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface FlipCardProps {
  /**
   * 正面内容
   */
  front: React.ReactNode
  /**
   * 背面内容
   */
  back: React.ReactNode
  /**
   * 卡片宽度
   * @default '100%'
   */
  width?: string | number
  /**
   * 卡片高度
   * @default '300px'
   */
  height?: string | number
  /**
   * 翻转方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 是否默认翻转
   * @default false
   */
  defaultFlipped?: boolean
  /**
   * 触发翻转的方式
   * @default 'hover'
   */
  trigger?: 'hover' | 'click'
  /**
   * 翻转持续时间（秒）
   * @default 0.6
   */
  duration?: number
  /**
   * 容器类名
   */
  className?: string
}

export function FlipCard({
  front,
  back,
  width = '100%',
  height = '300px',
  direction = 'horizontal',
  defaultFlipped = false,
  trigger = 'hover',
  duration = 0.6,
  className = '',
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(defaultFlipped)

  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') setIsFlipped(true)
  }, [trigger])

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover') setIsFlipped(false)
  }, [trigger])

  const handleClick = useCallback(() => {
    if (trigger === 'click') setIsFlipped((prev) => !prev)
  }, [trigger])

  const rotateY = direction === 'horizontal' ? 180 : 0
  const rotateX = direction === 'vertical' ? 180 : 0

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      style={{ width, height }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{
          rotateY: isFlipped ? rotateY : 0,
          rotateX: isFlipped ? rotateX : 0,
        }}
        transition={{
          duration,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* 正面 */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </div>

        {/* 背面 */}
        <div
          className="absolute inset-0 backface-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: `rotateY(${direction === 'horizontal' ? 180 : 0}deg) rotateX(${direction === 'vertical' ? 180 : 0}deg)`,
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
}

/**
 * FeatureFlipCard - 功能翻转卡片
 */
interface FeatureFlipCardProps {
  icon: React.ReactNode
  title: string
  description: string
  details: string
  className?: string
}

export function FeatureFlipCard({
  icon,
  title,
  description,
  details,
  className = '',
}: FeatureFlipCardProps) {
  return (
    <FlipCard
      className={className}
      front={
        <div className="w-full h-full p-6 bg-[#1A1A1A] rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#D4FF00]/10 flex items-center justify-center mb-4">
            <div className="text-[#D4FF00] text-2xl">{icon}</div>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          <p className="text-white/60 text-sm">{description}</p>
          <p className="text-[#D4FF00] text-xs mt-4">Hover to learn more →</p>
        </div>
      }
      back={
        <div className="w-full h-full p-6 bg-[#D4FF00] rounded-2xl flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-semibold text-black mb-4">{title}</h3>
          <p className="text-black/80 text-sm leading-relaxed">{details}</p>
        </div>
      }
    />
  )
}

/**
 * TeamCard - 团队卡片（3D翻转展示详情）
 */
interface TeamCardProps {
  name: string
  role: string
  image: string
  bio: string
  socials?: { icon: React.ReactNode; url: string }[]
  className?: string
}

export function TeamCard({
  name,
  role,
  image,
  bio,
  socials = [],
  className = '',
}: TeamCardProps) {
  return (
    <FlipCard
      className={className}
      trigger="hover"
      front={
        <div className="w-full h-full bg-[#1A1A1A] rounded-2xl overflow-hidden">
          <div className="h-3/5 overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white">{name}</h3>
            <p className="text-[#D4FF00] text-sm">{role}</p>
          </div>
        </div>
      }
      back={
        <div className="w-full h-full p-6 bg-[#1A1A1A] rounded-2xl border border-[#D4FF00]/30 flex flex-col">
          <h3 className="text-lg font-semibold text-white mb-2">{name}</h3>
          <p className="text-[#D4FF00] text-sm mb-4">{role}</p>
          <p className="text-white/70 text-sm flex-grow">{bio}</p>
          {socials.length > 0 && (
            <div className="flex gap-3 mt-4">
              {socials.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-[#D4FF00] hover:text-black transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      }
    />
  )
}

export default FlipCard
