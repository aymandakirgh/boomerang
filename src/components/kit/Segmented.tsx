import { motion, useReducedMotion } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import { SEGMENT_SPRING } from '../../lib/motion'

// Segmented control with a measured thumb: the thumb is sized to the target
// segment (so it survives uneven labels) and slides on the SEGMENT spring.
// Nested radii follow inner = outer - padding: track 16, thumb 13, 3px padding.
export default function Segmented<T extends string>({
  options,
  value,
  onChange,
  className = '',
}: {
  options: { value: T; label: string }[]
  value: T
  onChange: (v: T) => void
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<{ x: number; w: number } | null>(null)
  const reduce = useReducedMotion()
  const index = options.findIndex((o) => o.value === value)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const measure = () => {
      const target = container.querySelectorAll<HTMLButtonElement>('button')[index]
      if (!target) return
      setThumb({ x: target.offsetLeft, w: target.offsetWidth })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(container)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => ro.disconnect()
  }, [index])

  return (
    <div
      ref={containerRef}
      role="tablist"
      className={`relative inline-flex bg-[#F4F3F3] p-[3px] rounded-2xl ${className}`}
    >
      {thumb && (
        <motion.div
          className="absolute top-[3px] bottom-[3px] bg-white shadow-sm rounded-[13px]"
          initial={false}
          animate={{ x: thumb.x - 3, width: thumb.w }}
          transition={reduce ? { duration: 0 } : SEGMENT_SPRING}
          style={{ left: 3 }}
        />
      )}
      {options.map((option) => (
        <button
          key={option.value}
          role="tab"
          aria-selected={option.value === value}
          onClick={() => onChange(option.value)}
          className={`relative z-10 px-5 py-2 text-sm font-medium rounded-[13px] transition-colors duration-200 ${
            option.value === value ? 'text-[#191919]' : 'text-[#191919]/50 hover:text-[#191919]'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}
