import { ArrowRight } from 'lucide-react'
import CtaBand from '../components/CtaBand'
import { Section, SectionHeading } from '../components/Section'
import Reveal from '../components/kit/Reveal'

const VALUES = [
  {
    num: '01',
    title: 'Plain speech',
    body: 'Borrowers in trouble do not need jargon. Our agents say the number, the date, and the option. So do we.',
  },
  {
    num: '02',
    title: 'Show your work',
    body: 'Every claim in this company comes with a citation: in the product, in the audit trail, in the sales deck.',
  },
  {
    num: '03',
    title: 'Policy is code',
    body: 'If a rule matters, it executes. A rule that lives only in a training slide is a wish.',
  },
  {
    num: '04',
    title: 'Speed is respect',
    body: 'A borrower who asks a question at 11pm deserves an answer at 11pm. So does a customer who emails us.',
  },
]

const TIMELINE = [
  { year: '2024', event: 'Founded in New York by operators from consumer lending, contact centers, and applied AI.' },
  { year: '2025', event: 'First bank live. First examiner review passed with the audit trail as the primary exhibit.' },
  { year: '2026', event: 'Three million conversations handled across four kinds of institution and two continents.' },
]

const ROLES = [
  { title: 'Forward-deployed engineer', location: 'New York' },
  { title: 'Voice infrastructure engineer', location: 'London' },
  { title: 'Compliance program lead', location: 'New York' },
]

export default function Company() {
  return (
    <main>
      {/* Prose first. No hero headline, just the reason the company exists. */}
      <Section className="pt-36 sm:pt-44 pb-20 sm:pb-28">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
            Company
          </p>
          <p className="mt-8 font-serif font-normal text-3xl sm:text-5xl md:text-6xl leading-[1.15] tracking-tight text-[#191919] max-w-4xl">
            Money is emotional. The software that touches it mostly is not.
          </p>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mt-8 font-serif font-normal text-3xl sm:text-5xl md:text-6xl leading-[1.15] tracking-tight text-[#191919]/40 max-w-4xl">
            We build agents that treat a missed payment as a conversation to have, not a record to
            process.
          </p>
        </Reveal>
      </Section>

      {/* Values. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <SectionHeading label="How we work" title="Four rules, enforced." />
        <div className="mt-12 grid sm:grid-cols-2 gap-3">
          {VALUES.map((value, i) => (
            <Reveal key={value.num} delay={i * 0.06}>
              <div className="bg-[#F4F3F3] px-6 sm:px-8 py-8 sm:py-10 h-full">
                <p className="text-sm text-[#191919]/40 tabular-nums">{value.num}</p>
                <h3 className="mt-3 font-serif font-normal text-2xl sm:text-3xl leading-tight tracking-tight text-[#191919]">
                  {value.title}
                </h3>
                <p className="mt-4 text-sm md:text-[15px] text-[#191919]/70 leading-relaxed">
                  {value.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Timeline. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <SectionHeading label="So far" title="Short history, long records." />
        <div className="mt-12 border-t border-gray-200">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.06}>
              <div className="grid sm:grid-cols-[120px_1fr] gap-2 sm:gap-8 py-7 sm:py-9 border-b border-gray-200">
                <p className="font-serif font-normal text-2xl sm:text-3xl tracking-tight text-[#191919] tabular-nums">
                  {item.year}
                </p>
                <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed max-w-2xl self-center">
                  {item.event}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Careers. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <SectionHeading
          label="Careers"
          title="Work on the hard version."
          body="Regulated industries, real money, and users having a bad week. If that reads as interesting rather than tedious, we should talk."
        />
        <Reveal className="mt-12">
          <div className="border-t border-gray-200">
            {ROLES.map((role) => (
              <a
                key={role.title}
                href={`mailto:careers@boomerang.finance?subject=${encodeURIComponent(role.title)}`}
                className="group flex items-center justify-between gap-6 py-6 border-b border-gray-200"
              >
                <div className="flex items-baseline gap-6 flex-wrap">
                  <span className="font-serif font-normal text-2xl sm:text-3xl leading-tight tracking-tight text-[#191919]">
                    {role.title}
                  </span>
                  <span className="text-sm text-[#191919]/50">{role.location}</span>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 text-gray-400 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all duration-200" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-[#191919]/50">
            Nothing that fits? Write to{' '}
            <a
              href="mailto:careers@boomerang.finance"
              className="text-[#191919]/70 hover:text-[#191919] border-b border-[#191919]/20 hover:border-[#191919] transition-colors duration-200"
            >
              careers@boomerang.finance
            </a>{' '}
            anyway.
          </p>
        </Reveal>
      </Section>

      <CtaBand />
    </main>
  )
}
