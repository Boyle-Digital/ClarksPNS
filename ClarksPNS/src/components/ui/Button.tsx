import { cn } from '@/lib/cn'
import type { ButtonHTMLAttributes } from 'react'   // ⬅️ type-only
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  rounded?: 'md' | 'xl' | 'pill'
}
export function Button({ className, variant = 'primary', rounded = 'md', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center px-6 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  const variants: Record<string, string> = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800 focus-visible:ring-blue-700',
    secondary: 'bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white/10 dark:text-white',
    ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100 dark:text-white/90 dark:hover:bg-white/10',
  }
  const radii: Record<string, string> = { md: 'rounded-xl', xl: 'rounded-2xl', pill: 'rounded-full' }
  return <button className={cn(base, variants[variant], radii[rounded], className)} {...props} />
}
