import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils'

const cardVariants = cva(
  // Base styles
  'rounded-xl bg-surface transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'shadow-card',
        hover: 'shadow-card hover:shadow-card-hover hover:-translate-y-1',
        interactive: 'shadow-card hover:shadow-card-hover hover:-translate-y-1 cursor-pointer',
        outline: 'border border-border',
        elevated: 'shadow-lg',
        flat: '',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
        xl: 'p-10',
      },
      background: {
        surface: 'bg-surface',
        secondary: 'bg-surface-secondary',
        tertiary: 'bg-surface-tertiary',
        transparent: 'bg-transparent',
        gradient: 'bg-gradient-hero',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      background: 'surface',
    },
  }
)

interface CardProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  as?: 'div' | 'article' | 'section' | 'li'
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, background, as: Tag = 'div', children, ...props }, ref) => {
    return (
      <Tag
        className={cn(cardVariants({ variant, padding, background, className }))}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as unknown as any}
        {...(props as React.HTMLAttributes<HTMLElement>)}
      >
        {children}
      </Tag>
    )
  }
)

Card.displayName = 'Card'

// Card sub-components
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div className={cn('flex flex-col space-y-1.5', className)} ref={ref} {...props} />
  )
)

CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 className={cn('text-heading font-semibold leading-none tracking-tight', className)} ref={ref} {...props} />
  )
)

CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p className={cn('text-body-sm text-text-secondary', className)} ref={ref} {...props} />
  )
)

CardDescription.displayName = 'CardDescription'

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div className={cn('pt-4', className)} ref={ref} {...props} />
  )
)

CardContent.displayName = 'CardContent'

interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div className={cn('flex items-center pt-4', className)} ref={ref} {...props} />
  )
)

CardFooter.displayName = 'CardFooter'

// eslint-disable-next-line react-refresh/only-export-components
export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants }
export type { CardProps }