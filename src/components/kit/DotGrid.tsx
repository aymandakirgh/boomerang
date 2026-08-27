import { useEffect, useRef } from 'react'

// Quiet 2D-canvas dot field. Ink dots on white; the pointer displaces nearby
// dots and they spring home. Second canvas surface on the site, echoing the
// hero's capture-to-canvas identity without WebGL weight.
export default function DotGrid({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const GAP = 26
    const RADIUS = 1.2
    const INFLUENCE = 110
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    let dots: { x: number; y: number; ox: number; oy: number; vx: number; vy: number }[] = []
    let pointer = { x: -9999, y: -9999 }
    let raf = 0
    let running = true

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      dots = []
      for (let y = GAP / 2; y < rect.height; y += GAP) {
        for (let x = GAP / 2; x < rect.width; x += GAP) {
          dots.push({ x, y, ox: x, oy: y, vx: 0, vy: 0 })
        }
      }
    }

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.fillStyle = 'rgba(25,25,25,0.28)'
      for (const dot of dots) {
        if (!reduce) {
          const dx = dot.x - pointer.x
          const dy = dot.y - pointer.y
          const dist = Math.hypot(dx, dy)
          if (dist < INFLUENCE && dist > 0.01) {
            const force = ((INFLUENCE - dist) / INFLUENCE) * 1.6
            dot.vx += (dx / dist) * force
            dot.vy += (dy / dist) * force
          }
          dot.vx += (dot.ox - dot.x) * 0.06
          dot.vy += (dot.oy - dot.y) * 0.06
          dot.vx *= 0.86
          dot.vy *= 0.86
          dot.x += dot.vx
          dot.y += dot.vy
        }
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, RADIUS, 0, Math.PI * 2)
        ctx.fill()
      }
      if (!reduce && running) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => {
      pointer = { x: -9999, y: -9999 }
    }

    build()
    draw()
    const ro = new ResizeObserver(() => {
      build()
      if (reduce) draw()
    })
    ro.observe(canvas)
    // Pause the loop entirely while the canvas is off-screen.
    const io = new IntersectionObserver(([entry]) => {
      const visible = entry.isIntersecting
      if (visible && !running) {
        running = true
        if (!reduce) raf = requestAnimationFrame(draw)
      } else if (!visible && running) {
        running = false
        cancelAnimationFrame(raf)
      }
    })
    io.observe(canvas)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={`w-full h-full ${className}`} aria-hidden />
}
