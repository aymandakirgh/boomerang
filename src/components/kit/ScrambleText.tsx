import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

// Characters enter scrambled and resolve left to right as the line crosses the
// viewport: noise settling into signal. Used once per page at most; the effect
// is the product story, and repeating it would make it wallpaper.
export default function ScrambleText({
  text,
  className = '',
  duration = 650,
}: {
  text: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -60px 0px' })
  const reduce = useReducedMotion()
  const [display, setDisplay] = useState(text)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!inView || reduce || started) return
    setStarted(true)
    const start = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const locked = Math.floor(progress * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (i < locked || ch === ' ' || ch === '.' || ch === ',') out += ch
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      setDisplay(out)
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setDisplay(text)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, started, text, duration])

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{reduce ? text : display}</span>
    </span>
  )
}
