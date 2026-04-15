import { cn } from '@/utils'
import { Play, Video } from 'lucide-react'

interface VideoPlaceholderProps {
  title?: string
  duration?: string
  thumbnailUrl?: string
  className?: string
}

export function VideoPlaceholder({ 
  title = 'Video Demo', 
  duration = '2:30',
  thumbnailUrl,
  className 
}: VideoPlaceholderProps) {
  return (
    <div 
      className={cn(
        'video-placeholder',
        'relative bg-surface-secondary border border-border rounded-xl overflow-hidden',
        'aspect-video',
        className
      )}
    >
      {/* Thumbnail or placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
        ) : (
          <Video size={48} className="text-text-muted opacity-40" />
        )}
        
        {/* Play button */}
        <button 
          className="absolute inset-0 flex items-center justify-center group"
          aria-label="Play video"
        >
          <div className="w-16 h-16 rounded-full bg-accent/80 flex items-center justify-center group-hover:bg-accent transition-colors shadow-glow">
            <Play size={32} className="text-white ml-1" />
          </div>
        </button>
      </div>
      
      {/* Info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-primary/80 to-transparent">
        <h4 className="text-body font-semibold text-white">{title}</h4>
        <span className="text-caption text-white/80">{duration}</span>
      </div>
      
      {/* Upload hint overlay */}
      {!thumbnailUrl && (
        <div className="absolute top-2 right-2">
          <span className="badge bg-surface text-text-muted">
            📁 Upload MP4/WebM
          </span>
        </div>
      )}
    </div>
  )
}