import { cn } from '@/utils'
import { User } from 'lucide-react'

interface AvatarPlaceholderProps {
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

export function AvatarPlaceholder({ 
  name = 'Avatar', 
  size = 'md',
  className 
}: AvatarPlaceholderProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  const iconSizes = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 48,
  }

  return (
    <div 
      className={cn(
        'avatar-placeholder',
        'rounded-full bg-surface-tertiary border-2 border-dashed border-border',
        'flex items-center justify-center',
        'opacity-60 hover:opacity-100 transition-opacity',
        sizeClasses[size],
        className
      )}
      aria-label={name}
    >
      <User size={iconSizes[size]} className="text-text-muted" />
    </div>
  )
}