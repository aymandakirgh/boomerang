import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// Swaps one word in place without moving anything around it. The slot is locked
// to the widest candidate, measured off a hidden ruler holding every option, and
// re-measured on resize so the width is right after the web font loads rather
// than frozen at the fallback metrics. Pure crossfade: no travel, no scale, no
// blur (blur over text drops subpixel antialiasing and snaps when it comes off).
export default function SwapWord({
  words,
  interval = 2400,
  className = '',
}: {
  words: string[]
  interval?: number
  className?: string
}) {
  const [index, setIndex] = useState(0)
  const [width, setWidth] = useState<number | undefined>(undefined)
  const rulerRef = useRef<HTMLSpanElement>(null)
  const reduce = useReducedMotion()

  useLayoutEffect(() => {
    const ruler = rulerRef.current
    if (!ruler) return
    const measure = () => {
      let max = 0
      for (const child of Array.from(ruler.children)) {
        max = Math.max(max, (child as HTMLElement).offsetWidth)
      }
      setWidth(max)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(ruler)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => ro.disconnect()
  }, [words])

  useEffect(() => {
    if (reduce) return
    const t = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval)
    return () => window.clearInterval(t)
  }, [words.length, interval, reduce])

  return (
    <span
      className={`relative inline-block align-baseline ${className}`}
      style={{ width }}
    >
      <span ref={rulerRef} aria-hidden className="absolute left-0 top-0 invisible whitespace-pre">
        {words.map((w) => (
          <span key={w} className="inline-block">
            {w}
          </span>
        ))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[index]}
          className="inline-block whitespace-pre"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: 'easeInOut' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
