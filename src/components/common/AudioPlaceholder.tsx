import { cn } from '@/utils'
import { Play, Volume2 } from 'lucide-react'

interface AudioPlaceholderProps {
  title?: string
  scenario?: string
  duration?: string
  className?: string
}

export function AudioPlaceholder({ 
  title = 'Audio Demo', 
  scenario = 'Sample',
  duration = '0:00',
  className 
}: AudioPlaceholderProps) {
  return (
    <div 
      className={cn(
        'audio-placeholder',
        'bg-surface-secondary border border-border rounded-xl p-6',
        className
      )}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="badge badge-accent">{scenario}</span>
        <span className="text-body-sm text-text-muted">{duration}</span>
      </div>
      
      <h4 className="text-heading font-semibold mb-4">{title}</h4>
      
      {/* Waveform placeholder */}
      <div className="waveform-placeholder h-16 mb-4 flex items-center gap-1">
        {Array.from({ length: 40 }).map((_, i) => (
          <div 
            key={i} 
            className="waveform-bar h-8 bg-accent/30 rounded-full"
            style={{
              animationDelay: `${i * 50}ms`,
              height: `${Math.random() * 30 + 10}px`
            }}
          />
        ))}
      </div>
      
      {/* Controls placeholder */}
      <div className="flex items-center gap-4">
        <button 
          className="btn-ghost p-2 rounded-full bg-surface border border-border hover:bg-surface-secondary"
          aria-label="Play"
        >
          <Play size={20} className="text-accent" />
        </button>
        <span className="text-caption text-text-muted">00:00 / 02:30</span>
        <Volume2 size={16} className="text-text-muted ml-auto" />
      </div>
      
      {/* Upload hint */}
      <div className="mt-4 p-3 bg-surface-tertiary rounded-lg">
        <p className="text-caption text-text-muted text-center">
          📁 Replace with your audio file (MP3, WAV, M4A)
        </p>
      </div>
    </div>
  )
}