import { ArrowRight } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

// The two link treatments. Primary: the black pill from the hero. Quiet: text
// with the arrow nudge, same 200ms language as the hero panel rows.
export function PillLink({
  to,
  children,
  light = false,
  className = '',
}: {
  to: string
  children: ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <Link
      to={to}
      className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 text-sm font-medium rounded-lg transition-colors duration-200 ${
        light
          ? 'bg-white text-[#191919] hover:bg-white/90'
          : 'bg-[#191919] text-white hover:bg-[#191919]/90'
      } ${className}`}
    >
      {children}
    </Link>
  )
}

export function QuietLink({
  to,
  children,
  className = '',
}: {
  to: string
  children: ReactNode
  className?: string
}) {
  return (
    <Link
      to={to}
      className={`group inline-flex items-center gap-2 text-sm font-medium text-[#191919] ${className}`}
    >
      <span className="border-b border-[#191919]/20 group-hover:border-[#191919] transition-colors duration-200 pb-0.5">
        {children}
      </span>
      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all duration-200" />
    </Link>
  )
}
