/**
 * VideoHeroSection - 圆角视频展示区 + 特效标题
 * 
 * 自动播放（静音），点击切换播放/暂停
 * 悬浮显示控制按钮
 * 左对齐大标题「无与伦比的通话体验」，「通话」为声波特效字
 */

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Container } from '@/components/common'

/**
 * CallText - 「通话」特效字组件
 * SVG 声波纹理填充 + 光泽流动动画
 */
const CallText = () => (
  <span className="call-text-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
    <style>{`
      .call-text-wrapper {
        position: relative;
        display: inline-block;
      }

      .call-text-svg {
        display: block;
        height: 1.15em;
        width: auto;
      }

      /* 声波线条动画 */
      @keyframes waveMove {
        0% { transform: translateX(0); }
        100% { transform: translateX(-60px); }
      }

      .wave-pattern {
        animation: waveMove 3s linear infinite;
      }

      /* 光泽扫过效果 */
      @keyframes sheen {
        0% { offset-distance: 0%; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { offset-distance: 100%; opacity: 0; }
      }

      /* 外发光脉冲 */
      @keyframes glowPulse {
        0%, 100% { filter: drop-shadow(0 0 8px rgba(212, 255, 0, 0.3)) drop-shadow(0 0 20px rgba(0, 212, 255, 0.15)); }
        50% { filter: drop-shadow(0 0 16px rgba(212, 255, 0, 0.5)) drop-shadow(0 0 40px rgba(0, 212, 255, 0.3)); }
      }

      .call-text-glow {
        animation: glowPulse 3s ease-in-out infinite;
      }

      @media (prefers-reduced-motion: reduce) {
        .wave-pattern { animation: none; }
        .call-text-glow { animation: none; }
      }
    `}</style>

    <svg
      className="call-text-svg call-text-glow"
      viewBox="0 0 200 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="通话"
      role="img"
    >
      <defs>
        {/* 声波纹理 pattern */}
        <pattern id="wavePattern" x="0" y="0" width="60" height="80" patternUnits="userSpaceOnUse">
          <g className="wave-pattern">
            {/* 声波线条 */}
            {[0, 15, 30, 45, 60, 75, 90, 105].map((x, i) => (
              <line
                key={i}
                x1={x}
                y1={20 + (i % 3) * 8}
                x2={x}
                y2={60 - (i % 3) * 8}
                stroke="url(#lineGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                opacity={0.4 + (i % 3) * 0.2}
              />
            ))}
          </g>
        </pattern>

        {/* 线条渐变 */}
        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D4FF00" />
          <stop offset="50%" stopColor="#00D4FF" />
          <stop offset="100%" stopColor="#D4FF00" />
        </linearGradient>

        {/* 文字主渐变 */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E0E0E0" />
          <stop offset="60%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D4FF00" />
        </linearGradient>

        {/* 文字裁切 */}
        <clipPath id="textClip">
          <text
            x="100"
            y="60"
            textAnchor="middle"
            fontSize="62"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            通话
          </text>
        </clipPath>
      </defs>

      {/* 底层：渐变填充文字 */}
      <text
        x="100"
        y="60"
        textAnchor="middle"
        fontSize="62"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="url(#textGradient)"
      >
        通话
      </text>

      {/* 中层：声波纹理叠加（裁切到文字形状） */}
      <g clipPath="url(#textClip)">
        <rect x="-60" y="0" width="320" height="80" fill="url(#wavePattern)" />
      </g>

      {/* 上层：描边 */}
      <text
        x="100"
        y="60"
        textAnchor="middle"
        fontSize="62"
        fontWeight="900"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="none"
        stroke="rgba(212, 255, 0, 0.15)"
        strokeWidth="0.5"
      >
        通话
      </text>
    </svg>
  </span>
)

const VideoHeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        setIsPlaying(false)
      })
    }
  }, [])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <section className="relative bg-background-primary overflow-hidden pt-2 md:pt-4 pb-6 md:pb-8">
      <Container>
        {/* 圆角视频播放器 */}
        <motion.div
          className="relative mx-auto overflow-hidden cursor-pointer rounded-2xl md:rounded-3xl"
          style={{
            maxWidth: '1400px',
            height: 'clamp(450px, 75vh, 860px)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={togglePlay}
        >
          {/* 视频 */}
          <video
            ref={videoRef}
            src="/videos/demo.mp4"
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* 中央播放/暂停按钮 */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            animate={{ opacity: !isPlaying || isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="relative"
              animate={{ scale: isHovered ? 1.1 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  border: '2px solid rgba(255,255,255,0.35)',
                  boxShadow: '0 0 40px rgba(255,255,255,0.1)',
                }}
              >
                {isPlaying ? (
                  <Pause size={36} color="white" />
                ) : (
                  <Play size={36} color="white" className="ml-1" />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* 右下角静音切换 */}
          <motion.button
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm z-10"
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? (
              <VolumeX size={18} color="white" />
            ) : (
              <Volume2 size={18} color="white" />
            )}
          </motion.button>
        </motion.div>
      </Container>
    </section>
  )
}

export default VideoHeroSection
