import type { ButtonHTMLAttributes, PropsWithChildren } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'outline'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  fullWidth,
  className,
  ...props
}: PropsWithChildren<ButtonProps>) {
  const base =
    'inline-flex items-center justify-center rounded-2xl px-5 py-3 text-base font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'
  const variants: Record<Variant, string> = {
    primary:
      'bg-brand text-text-onBrand hover:opacity-95 focus-visible:outline-brand',
    outline:
      'border border-brand text-brand hover:bg-brand/5 focus-visible:outline-brand',
  }
  return (
    <button
      className={clsx(base, variants[variant], fullWidth && 'w-full', className)}
      {...props}
    >
      {children}
    </button>
  )
}
