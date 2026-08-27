import CtaBand from '../components/CtaBand'
import { Section, SectionHeading } from '../components/Section'
import { AccordionItem } from '../components/kit/Accordion'
import Reveal from '../components/kit/Reveal'
import VerticalMarquee from '../components/kit/VerticalMarquee'

const INSTITUTIONS = [
  {
    num: '01',
    title: 'Banks',
    body: 'Deposit servicing, card disputes, and retail lending outreach that holds up in front of the OCC. Boomerang runs inside your existing complaint-management and QA programs, and every conversation exports to the systems your second line already reads.',
    stat: 'A $9B regional bank moved 64% of tier-one servicing calls to agents in one quarter.',
  },
  {
    num: '02',
    title: 'Credit unions',
    body: 'Member service that still sounds like a credit union. Agents answer share and loan questions around the clock, chase documents for indirect lending, and hand anything sensitive to a human with full context attached.',
    stat: 'Members get answers at 11pm without a single new hire on the phones.',
  },
  {
    num: '03',
    title: 'Consumer lenders',
    body: 'From funding call to final payment. Welcome contact, autopay enrollment, early-delinquency outreach, and hardship plans negotiated within the policy matrix you configure. Contact rates go up because agents reach out when borrowers actually answer.',
    stat: 'Early-stage roll rates down double digits in the first ninety days.',
  },
  {
    num: '04',
    title: 'Loan servicers',
    body: 'Scale outreach across portfolios without scaling headcount. Per-client policy packs keep every portfolio inside its own rules, and per-jurisdiction controls handle the state patchwork automatically.',
    stat: 'One team, forty portfolios, every conversation on the record.',
  },
]

const USE_CASES_A = [
  { title: 'First-payment welcome', line: 'Set autopay before the first due date' },
  { title: 'Document chase', line: 'Stips collected as a conversation' },
  { title: 'Early delinquency', line: 'Day-3 outreach on the right channel' },
  { title: 'Payment plans', line: 'Negotiated inside your hardship matrix' },
  { title: 'Due-date moves', line: 'Handled in one exchange' },
  { title: 'Payoff quotes', line: 'Figures pulled live from the core' },
]

const USE_CASES_B = [
  { title: 'Autopay recovery', line: 'Failed drafts fixed the same day' },
  { title: 'Identity verification', line: 'KBA and doc checks in-channel' },
  { title: 'Insurance tracking', line: 'Force-place avoidance outreach' },
  { title: 'Skip tracing follow-up', line: 'New numbers tried politely' },
  { title: 'Refi eligibility', line: 'Offered when the data says it fits' },
  { title: 'Exit surveys', line: 'Why they left, in their words' },
]

const REGS = ['FDCPA', 'Reg F', 'TCPA', 'UDAAP', 'GLBA', 'FCRA', 'E-Sign']

const CONTROLS = [
  'Quiet hours enforced per borrower jurisdiction, including split time zones.',
  'Frequency caps counted across channels, not per channel.',
  'Required disclosures delivered word for word where state law demands them.',
  'Instant handoff to a human on dispute, cease request, or attorney representation.',
  'Full recordings and transcripts retained on your storage, under your keys.',
]

function UseCaseRow({ title, line }: { title: string; line: string }) {
  return (
    <div className="py-5 border-b border-gray-200">
      <p className="font-serif font-normal text-xl sm:text-2xl leading-tight tracking-tight text-[#191919]">
        {title}
      </p>
      <p className="mt-1 text-sm text-[#191919]/60">{line}</p>
    </div>
  )
}

export default function Solutions() {
  return (
    <main>
      <Section className="pt-36 sm:pt-44 pb-16 sm:pb-20">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
            Solutions
          </p>
          <h1 className="mt-4 font-serif font-normal text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tighter text-[#191919] max-w-3xl">
            Built for regulated balance sheets.
          </h1>
          <p className="mt-6 max-w-md text-sm md:text-base text-[#191919]/70 leading-relaxed">
            Banks, credit unions, lenders, and servicers run Boomerang because it treats their
            examiners as a first-class audience.
          </p>
        </Reveal>
      </Section>

      {/* Use cases: two columns drifting in opposite directions. */}
      <Section className="pb-20 sm:pb-28">
        <SectionHeading label="Use cases" title="The work it takes off your desk." />
        <Reveal className="mt-10">
          <div className="h-[380px] sm:h-[440px] relative">
            <VerticalMarquee
              className="h-full"
              columnA={USE_CASES_A.map((useCase) => (
                <UseCaseRow key={useCase.title} {...useCase} />
              ))}
              columnB={USE_CASES_B.map((useCase) => (
                <UseCaseRow key={useCase.title} {...useCase} />
              ))}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
          </div>
        </Reveal>
      </Section>

      {/* Institutions. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <SectionHeading label="Who it serves" title="Four kinds of institution, one platform." />
        <Reveal className="mt-12">
          <div className="border-b border-gray-200">
            {INSTITUTIONS.map((inst, i) => (
              <AccordionItem key={inst.num} meta={inst.num} title={inst.title} defaultOpen={i === 0}>
                <div className="grid md:grid-cols-2 gap-6 md:gap-16">
                  <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed">
                    {inst.body}
                  </p>
                  <p className="text-sm text-[#191919]/60 leading-relaxed bg-[#F4F3F3] px-5 py-4 self-start">
                    {inst.stat}
                  </p>
                </div>
              </AccordionItem>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* Compliance. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16">
          <div>
            <SectionHeading
              label="Compliance"
              title="Policy is code."
              body="Your compliance manual is not a PDF the agent read once. It is the runtime. Rules execute on every turn, and the ones below ship enforced by default."
            />
            <Reveal className="mt-8 flex flex-wrap gap-2" delay={0.1}>
              {REGS.map((reg) => (
                <span
                  key={reg}
                  className="text-xs font-medium text-[#191919]/70 border border-gray-200 rounded-full px-3.5 py-1.5"
                >
                  {reg}
                </span>
              ))}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="border-t border-gray-200">
              {CONTROLS.map((control, i) => (
                <div key={i} className="grid grid-cols-[48px_1fr] gap-3 py-4 border-b border-gray-200">
                  <p className="text-sm text-[#191919]/40 tabular-nums">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed">{control}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Quote. */}
      <Section className="py-24 sm:py-32 border-t border-gray-200">
        <Reveal>
          <p className="font-serif font-normal text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight text-[#191919] max-w-4xl">
            “Our examiners asked how we were supervising the AI. We handed them the audit trail and
            the meeting got shorter.”
          </p>
          <p className="mt-8 text-sm text-[#191919]/50">
            Chief Compliance Officer · $2.1B credit union · pilot partner
          </p>
        </Reveal>
      </Section>

      <CtaBand />
    </main>
  )
}
