/**
 * VideoHeroSection - 全宽视频占位区
 * 
 * 放在原来 "4步快速上手" 的位置
 * 后续替换为真实视频
 */

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

const VideoHeroSection = () => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative bg-background-primary overflow-hidden">
      {/* 全宽视频区域 */}
      <motion.div
        className="relative w-full overflow-hidden cursor-pointer"
        style={{ height: 'clamp(400px, 70vh, 800px)' }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '0px' }}
        transition={{ duration: 0.8 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {/* 背景图片（mmx 生成） */}
        <img
          src="/image_001.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 渐变遮罩 */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(180deg, rgba(10,10,15,0.3) 0%, transparent 30%, transparent 70%, rgba(10,10,15,0.6) 100%),
              radial-gradient(ellipse at 50% 50%, rgba(10,10,15,0.2) 0%, transparent 70%)
            `,
          }}
        />

        {/* 播放按钮 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative"
            animate={{ scale: isHovered ? 1.15 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* 外圈光晕 */}
            <motion.div
              className="absolute inset-0 -m-6 rounded-full"
              style={{
                border: '2px solid rgba(255,255,255,0.3)',
              }}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.4, 0, 0.4],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />

            {/* 主按钮 */}
            <div
              className="w-28 h-28 rounded-full flex items-center justify-center backdrop-blur-sm"
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: '0 0 60px rgba(255,255,255,0.15), inset 0 0 30px rgba(255,255,255,0.05)',
              }}
            >
              {isPlaying ? (
                <Pause size={48} color="white" />
              ) : (
                <Play size={48} color="white" className="ml-2" />
              )}
            </div>
          </motion.div>
        </div>

        {/* 悬浮光效层 */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, transparent 50%, rgba(59,130,246,0.1) 100%)',
          }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </section>
  )
}

export default VideoHeroSection
