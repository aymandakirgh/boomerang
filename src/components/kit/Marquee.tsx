import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

// Continuous band. Content is rendered twice and translated -50%, so the loop
// point is invisible. Reduced motion gets a static, non-duplicated row.
export default function Marquee({
  children,
  seconds = 28,
  className = '',
}: {
  children: ReactNode
  seconds?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className={`overflow-hidden whitespace-nowrap ${className}`}>
        <div className="inline-flex items-baseline">{children}</div>
      </div>
    )
  }
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-flex w-max items-baseline animate-marquee"
        style={{ animationDuration: `${seconds}s` }}
      >
        <div className="inline-flex items-baseline">{children}</div>
        <div className="inline-flex items-baseline" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  )
}
