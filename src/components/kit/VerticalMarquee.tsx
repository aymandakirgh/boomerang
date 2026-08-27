import { useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

// Two columns drifting in opposite directions; rows duplicated so the loop
// point is invisible; the whole group pauses while hovered. Reduced motion renders one
// static column with no duplication.
export default function VerticalMarquee({
  columnA,
  columnB,
  className = '',
}: {
  columnA: ReactNode[]
  columnB: ReactNode[]
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <div className={`grid sm:grid-cols-2 gap-x-8 ${className}`}>
        <div>{columnA}</div>
        <div>{columnB}</div>
      </div>
    )
  }
  return (
    <div className={`v-group grid sm:grid-cols-2 gap-x-8 overflow-hidden ${className}`}>
      <div className="relative overflow-hidden h-full">
        <div className="v-marquee">
          <div>{columnA}</div>
          <div aria-hidden>{columnA}</div>
        </div>
      </div>
      <div className="relative overflow-hidden h-full hidden sm:block">
        <div className="v-marquee v-reverse">
          <div>{columnB}</div>
          <div aria-hidden>{columnB}</div>
        </div>
      </div>
    </div>
  )
}
