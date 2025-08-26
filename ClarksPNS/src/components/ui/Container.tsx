import { cn } from '@/lib/cn'
import type { PropsWithChildren } from 'react'

type ContainerProps = PropsWithChildren<{ className?: string }>
export default function Container({ className, children }: ContainerProps) {
  return <div className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}>{children}</div>
}
