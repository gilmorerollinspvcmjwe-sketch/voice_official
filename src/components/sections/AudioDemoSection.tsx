import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Play, Pause, RotateCcw, Volume2, ArrowRight } from 'lucide-react'
import { Container, Badge, Button } from '@/components/common'
import { getLocalizedPath } from '@/utils'
import { audioDemos } from '@/data/audio-demos'

const AudioDemoSection = () => {
  const { t, i18n } = useTranslation('home')
  const [activeScenario, setActiveScenario] = useState('customerService')
  const [isPlaying, setIsPlaying] = useState(false)

  const scenarios = t('audioDemo.scenarios', { returnObjects: true }) as Record<string, string>

  const currentDemo = audioDemos.find(d => d.scenario === activeScenario) || audioDemos[0]

  return (
    <section className="py-16 md:py-24 bg-surface-secondary">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-display font-bold text-text mb-4">
            {t('audioDemo.title')}
          </h2>
          <p className="text-body-lg text-text-secondary max-w-2xl mx-auto">
            {t('audioDemo.subtitle')}
          </p>
        </motion.div>

        {/* Audio player - 左右分栏 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex gap-6">
          {/* 左侧场景列表 */}
          <div className="hidden md:flex flex-col gap-1 w-[140px] flex-shrink-0 pt-2">
            {Object.entries(scenarios).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveScenario(key)}
                className={`relative text-left px-3 py-2.5 rounded-lg text-body-sm font-medium transition-all duration-200 ${
                  activeScenario === key
                    ? 'bg-accent/10 text-accent'
                    : 'text-text-secondary hover:text-text hover:bg-surface-secondary'
                }`}
              >
                <motion.div
                  className="absolute left-0 top-1.5 bottom-1.5 w-[2px] rounded-full bg-accent"
                  initial={false}
                  animate={{ opacity: activeScenario === key ? 1 : 0, scaleY: activeScenario === key ? 1 : 0 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                />
                {label}
              </button>
            ))}
          </div>

          {/* 右侧播放器 */}
          <div className="flex-1 bg-surface rounded-xl shadow-lg p-8 border border-border">
            {/* Demo header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <Badge variant="accent">{scenarios[activeScenario]}</Badge>
                <h3 className="text-subheading font-semibold text-text mt-2">
                  {i18n.language === 'zh' 
                    ? currentDemo.description.zh 
                    : currentDemo.description.en
                  }
                </h3>
              </div>
              <span className="text-body-sm text-text-muted">
                {currentDemo.duration}
              </span>
            </div>

            {/* Waveform visualization placeholder */}
            <div className="h-24 mb-6 flex items-center gap-1 rounded-lg bg-surface-secondary p-4">
              {Array.from({ length: 60 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 rounded-full bg-accent"
                  animate={isPlaying ? {
                    height: [10, 30 + Math.random() * 30, 10],
                  } : { height: 10 + Math.random() * 20 }}
                  transition={isPlaying ? {
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.02,
                  } : {}}
                  style={{ opacity: 0.6 }}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-accent flex items-center justify-center hover:bg-accent-dark transition-colors shadow-glow"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying 
                    ? <Pause size={24} className="text-white" /> 
                    : <Play size={24} className="text-white ml-1" />
                  }
                </button>
                <button 
                  className="p-2 rounded-lg text-text-secondary hover:text-text transition-colors"
                  aria-label="Restart"
                >
                  <RotateCcw size={20} />
                </button>
                <span className="text-body text-text-secondary">
                  00:00 / {currentDemo.duration}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Volume2 size={20} className="text-text-muted" />
                <div className="w-20 h-1 bg-surface-tertiary rounded-full">
                  <div className="w-3/4 h-full bg-accent rounded-full" />
                </div>
              </div>
            </div>

            {/* Upload hint */}
            <div className="mt-6 p-4 bg-surface-tertiary rounded-lg">
              <p className="text-caption text-text-muted text-center">
                📁 Replace with your audio files at: <code>public/audio/demos/</code>
              </p>
            </div>
          </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Link to={getLocalizedPath('/demo/live')}>
              <Button 
                variant="accent" 
                size="lg"
                rightIcon={<ArrowRight size={20} />}
              >
                {t('audioDemo.cta.text')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default AudioDemoSection