import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/utils'

const inputVariants = cva(
  // Base styles
  'flex w-full rounded-lg border bg-surface transition-all duration-200 file:border-0 file:bg-transparent file:text-body-sm file:font-medium placeholder:text-text-muted focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-border focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20',
        error: 'border-error focus-visible:border-error focus-visible:ring-2 focus-visible:ring-error/20',
        success: 'border-success focus-visible:border-success focus-visible:ring-2 focus-visible:ring-success/20',
        ghost: 'border-transparent bg-surface-secondary focus-visible:bg-surface',
      },
      inputSize: {
        sm: 'h-9 px-3 py-2 text-body-sm',
        md: 'h-11 px-4 py-2.5 text-body',
        lg: 'h-14 px-5 py-3 text-body-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'md',
    },
  }
)

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  error?: string
  label?: string
  description?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant, 
    inputSize, 
    type = 'text',
    leftIcon, 
    rightIcon, 
    error,
    label,
    description,
    id,
    ...props 
  }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).slice(2, 9)}`

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-body font-medium text-text mb-2">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
              {leftIcon}
            </div>
          )}
          <input
            type={type}
            id={inputId}
            className={cn(
              inputVariants({ variant: error ? 'error' : variant, inputSize }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted">
              {rightIcon}
            </div>
          )}
        </div>
        {description && !error && (
          <p className="mt-1 text-caption text-text-muted">{description}</p>
        )}
        {error && (
          <p className="mt-1 text-caption text-error">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

// eslint-disable-next-line react-refresh/only-export-components
export { Input, inputVariants }
export type { InputProps }