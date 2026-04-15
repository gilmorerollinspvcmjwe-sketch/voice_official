import { forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/utils'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  as?: 'div' | 'section' | 'article' | 'main' | 'header' | 'footer'
  size?: 'default' | 'sm' | 'lg' | 'xl' | 'full'
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as = 'div', size = 'default', children, ...props }, ref) => {
    const Component = as

    const sizeClasses = {
      sm: 'max-w-3xl',
      default: 'max-w-7xl',
      lg: 'max-w-[1400px]',
      xl: 'max-w-[1600px]',
      full: 'max-w-full',
    }

    return (
      <Component
        className={cn(
          'mx-auto w-full px-4 sm:px-6 lg:px-8',
          sizeClasses[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    )
  }
)

Container.displayName = 'Container'

export { Container }
export type { ContainerProps }