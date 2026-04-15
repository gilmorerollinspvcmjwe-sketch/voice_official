import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils'

const badgeVariants = cva(
  // Base styles
  'inline-flex items-center rounded-full font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-surface-tertiary text-text-secondary',
        primary: 'bg-primary/10 text-primary',
        accent: 'bg-accent/10 text-accent',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        error: 'bg-error/10 text-error',
        outline: 'border border-border text-text-secondary',
        gradient: 'bg-gradient-accent text-white',
      },
      size: {
        sm: 'px-2 py-0.5 text-caption',
        md: 'px-2.5 py-1 text-caption',
        lg: 'px-3 py-1.5 text-body-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

interface BadgeProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, size, icon, children, ...props }, ref) => {
    return (
      <div
        className={cn(badgeVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {icon && <span className="mr-1">{icon}</span>}
        {children}
      </div>
    )
  }
)

Badge.displayName = 'Badge'

// eslint-disable-next-line react-refresh/only-export-components
export { Badge, badgeVariants }
export type { BadgeProps }