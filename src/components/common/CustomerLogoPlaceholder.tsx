import { cn } from '@/utils'

interface CustomerLogoPlaceholderProps {
  name?: string
  className?: string
}

export function CustomerLogoPlaceholder({ 
  name = 'Customer Logo', 
  className 
}: CustomerLogoPlaceholderProps) {
  return (
    <div 
      className={cn(
        'customer-logo-placeholder',
        'w-32 h-12 bg-surface-tertiary border-2 border-dashed border-border rounded-lg',
        'flex items-center justify-center',
        'text-caption text-text-muted',
        'opacity-60 hover:opacity-100 transition-opacity',
        className
      )}
    >
      <span className="text-center">{name}</span>
    </div>
  )
}