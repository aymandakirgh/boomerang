import type { ReactNode } from 'react'
import Reveal from './kit/Reveal'

export function MicroLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
      {children}
    </p>
  )
}

export function SectionHeading({
  label,
  title,
  body,
  className = '',
}: {
  label?: string
  title: ReactNode
  body?: ReactNode
  className?: string
}) {
  return (
    <Reveal className={className}>
      {label && <MicroLabel>{label}</MicroLabel>}
      <h2 className="mt-3 font-serif font-normal text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-[#191919]">
        {title}
      </h2>
      {body && (
        <p className="mt-5 max-w-xl text-sm md:text-[15px] text-[#191919]/70 leading-relaxed">
          {body}
        </p>
      )}
    </Reveal>
  )
}

export function Section({
  children,
  className = '',
  wide = false,
}: {
  children: ReactNode
  className?: string
  wide?: boolean
}) {
  return (
    <section className={`px-5 sm:px-8 md:px-14 ${className}`}>
      <div className={`mx-auto ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>{children}</div>
    </section>
  )
}
