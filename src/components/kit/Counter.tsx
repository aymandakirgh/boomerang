import { animate, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { EASE_OUT_EXPO } from '../../lib/motion'

// Counts up once when scrolled into view. Tabular numerals keep the layout
// still while digits change.
export default function Counter({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}: {
  to: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const reduce = useReducedMotion()
  const format = (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce) {
      el.textContent = format(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.4,
      ease: EASE_OUT_EXPO,
      onUpdate: (v) => {
        el.textContent = format(v)
      },
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, to, reduce])

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {format(reduce ? to : 0)}
    </span>
  )
}
