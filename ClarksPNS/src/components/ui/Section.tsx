import Container from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import type { PropsWithChildren } from 'react'

type SectionProps = PropsWithChildren<{ id?: string; className?: string; padded?: boolean; bg?: 'default'|'muted'|'brand' }>
export default function Section({ id, className, padded = true, bg = 'default', children }: SectionProps) {
  const bgClass = bg === 'muted' ? 'bg-neutral-50 dark:bg-neutral-900/40' : bg === 'brand' ? 'bg-blue-800' : 'bg-transparent'
  return (
    <section id={id} className={cn(bgClass, padded && 'py-12 sm:py-16 lg:py-20', className)}>
      <Container>{children}</Container>
    </section>
  )
}
