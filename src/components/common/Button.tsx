import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/utils'
import { Loader2 } from 'lucide-react'

const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-cta text-white hover:bg-cta-hover shadow-button hover:shadow-button-hover hover:-translate-y-0.5',
        secondary: 'bg-surface text-primary border-2 border-primary hover:bg-primary hover:text-white',
        outline: 'bg-transparent text-primary border border-border hover:border-primary hover:bg-surface-secondary',
        ghost: 'bg-transparent text-text-secondary hover:text-text hover:bg-surface-secondary',
        accent: 'bg-accent text-white hover:bg-accent-dark shadow-button hover:shadow-button-hover hover:-translate-y-0.5',
        link: 'bg-transparent text-accent underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-9 px-3 text-body-sm',
        md: 'h-11 px-5 text-body',
        lg: 'h-14 px-8 text-body-lg',
        xl: 'h-16 px-10 text-subheading',
        icon: 'h-10 w-10',
        iconSm: 'h-8 w-8',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      fullWidth: false,
    },
  }
)

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    fullWidth, 
    isLoading, 
    leftIcon, 
    rightIcon, 
    disabled, 
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {!isLoading && leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
      </button>
    )
  }
)

Button.displayName = 'Button'

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants }
export type { ButtonProps }