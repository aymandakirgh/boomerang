import { Section } from './Section'
import Reveal from './kit/Reveal'
import { PillLink, QuietLink } from './kit/ArrowLink'

export default function CtaBand() {
  return (
    <Section className="py-24 sm:py-32 border-t border-gray-200">
      <Reveal>
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
          Next step
        </p>
        <h2 className="mt-4 font-serif font-normal text-4xl sm:text-5xl md:text-7xl leading-[1.05] tracking-tighter text-[#191919] max-w-3xl">
          See it hold a real conversation.
        </h2>
        <p className="mt-6 max-w-md text-sm md:text-base text-[#191919]/70 leading-relaxed">
          Thirty minutes, your loan tape, live agents on the line. You leave with a
          transcript and an honest read on fit.
        </p>
        <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-6">
          <PillLink to="/demo">Book A Demo</PillLink>
          <QuietLink to="/pricing">See pricing</QuietLink>
        </div>
      </Reveal>
    </Section>
  )
}
