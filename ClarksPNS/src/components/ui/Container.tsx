import type { PropsWithChildren } from 'react'

export default function Container({ children }: PropsWithChildren) {
  return <div className="container max-w-screen-2xl">{children}</div>
}
