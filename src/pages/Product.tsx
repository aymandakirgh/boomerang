import { ArrowRight } from 'lucide-react'
import CtaBand from '../components/CtaBand'
import { Section, SectionHeading } from '../components/Section'
import { PillLink, QuietLink } from '../components/kit/ArrowLink'
import DotGrid from '../components/kit/DotGrid'
import Reveal from '../components/kit/Reveal'
import TranscriptWindow from '../components/kit/TranscriptWindow'

const LIFECYCLE = [
  { num: '01', title: 'Welcome', body: 'First-payment reminders, autopay setup, and the questions every new borrower asks in week one.' },
  { num: '02', title: 'Verify', body: 'Identity checks, document chase, and income verification handled as a conversation, not a portal.' },
  { num: '03', title: 'Service', body: 'Balance, payoff quotes, due-date moves, hardship options. Answered in seconds on any channel.' },
  { num: '04', title: 'Collect', body: 'Early-stage outreach that negotiates real plans within your policy and takes the payment on the spot.' },
  { num: '05', title: 'Retain', body: 'Payoff congratulations, refi eligibility, and the next product, offered when the data says it fits.' },
]

const AUDIT_ROWS = [
  { t: '14:02:11', event: 'Outbound SMS initiated', cite: 'P-114 §2 contact window' },
  { t: '14:02:14', event: 'Frequency cap checked · 2 of 7 this week', cite: 'Reg F §1006.14' },
  { t: '14:03:38', event: 'Plan terms generated · 2 × $206.09', cite: 'P-114 §4 hardship matrix' },
  { t: '14:03:52', event: 'ACH authorization captured', cite: 'E-Sign consent on file' },
  { t: '14:04:01', event: 'Confirmation email sent · terms attached', cite: 'P-114 §6 disclosure' },
]

const INTEGRATIONS = [
  'Fiserv DNA', 'Jack Henry SilverLake', 'Temenos', 'Q2', 'nCino', 'Encompass',
  'Salesforce FSC', 'Plaid', 'Twilio', 'Five9', 'Genesys', 'Snowflake',
]

const VOICE_BARS = [12, 26, 18, 34, 22, 40, 16, 30, 24, 38, 14, 28, 20, 36, 18, 26]

export default function Product() {
  return (
    <main>
      {/* Hero over a quiet dot field: the second canvas surface on the site. */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <DotGrid />
        </div>
        <div className="relative z-10 px-5 sm:px-8 md:px-14 pt-36 sm:pt-44 pb-20 sm:pb-28 pointer-events-none">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">
                Product
              </p>
              <h1 className="mt-4 font-serif font-normal text-4xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tighter text-[#191919] max-w-3xl">
                The borrower lifecycle, handled.
              </h1>
              <p className="mt-6 max-w-md text-sm md:text-base text-[#191919]/70 leading-relaxed">
                Boomerang agents work every account from welcome call to payoff. They read your
                policy, speak plainly, and write everything down.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-6 pointer-events-auto">
                <PillLink to="/demo">Book A Demo</PillLink>
                <QuietLink to="/pricing">Pricing</QuietLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The conversation, replayed. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <SectionHeading
            label="In conversation"
            title="It talks like your best agent on their best day."
            body="No scripts read aloud, no decision trees. The agent reads the account, checks what policy allows, and negotiates a real outcome. Scroll the window into view and watch one exchange, end to end."
          />
          <Reveal delay={0.1}>
            <TranscriptWindow />
          </Reveal>
        </div>
      </Section>

      {/* Lifecycle. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <SectionHeading label="Coverage" title="Five stages, one agent." />
        <div className="mt-12 border-t border-gray-200">
          {LIFECYCLE.map((stage, i) => (
            <Reveal key={stage.num} delay={i * 0.05}>
              <div className="grid sm:grid-cols-[80px_240px_1fr] gap-2 sm:gap-8 py-7 sm:py-9 border-b border-gray-200">
                <p className="text-sm text-[#191919]/40 tabular-nums">{stage.num}</p>
                <h3 className="font-serif font-normal text-2xl sm:text-3xl leading-tight tracking-tight text-[#191919]">
                  {stage.title}
                </h3>
                <p className="text-sm md:text-[15px] text-[#191919]/70 leading-relaxed max-w-xl">
                  {stage.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Channels, as surfaces. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <SectionHeading
          label="Channels"
          title="Email, SMS, and voice. Same agent, same memory."
        />
        <div className="mt-12 grid md:grid-cols-3 gap-3">
          <Reveal>
            <div className="bg-[#F4F3F3] p-6 sm:p-8 h-full">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">Email</p>
              <div className="mt-5 bg-white border border-gray-200 p-4 text-sm leading-relaxed">
                <p className="text-[#191919]/45 text-xs">Re: Your October payment</p>
                <p className="mt-2 text-[#191919]">
                  Hi Dana, the plan we set up yesterday is confirmed. First draft Oct 1, second Nov
                  1, both $206.09. Full terms attached.
                </p>
              </div>
              <p className="mt-4 text-sm text-[#191919]/60 leading-relaxed">
                Threads, attachments, disclosures. Written to be read, filed to be found.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="bg-[#F4F3F3] p-6 sm:p-8 h-full">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">SMS</p>
              <div className="mt-5 space-y-2">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-md px-4 py-2.5 text-sm max-w-[85%]">
                  Your payment posted. You are all set until Nov 1.
                </div>
                <div className="bg-[#191919] text-white rounded-2xl rounded-br-md px-4 py-2.5 text-sm max-w-[60%] ml-auto">
                  thank you!!
                </div>
              </div>
              <p className="mt-4 text-sm text-[#191919]/60 leading-relaxed">
                The channel borrowers answer. Caps and quiet hours enforced per jurisdiction.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="bg-[#F4F3F3] p-6 sm:p-8 h-full">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium">Voice</p>
              <div className="mt-5 bg-white border border-gray-200 p-4">
                <div className="flex items-end gap-[3px] h-12" aria-hidden>
                  {VOICE_BARS.map((height, i) => (
                    <span
                      key={i}
                      className="w-[3px] bg-[#191919]/70 rounded-full"
                      style={{ height: `${height}px` }}
                    />
                  ))}
                </div>
                <p className="mt-3 text-xs text-[#191919]/45 tabular-nums">Live call · 02:41 · transcribing</p>
              </div>
              <p className="mt-4 text-sm text-[#191919]/60 leading-relaxed">
                Natural conversation with barge-in. Recorded, transcribed, searchable.
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Shows its work. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
          <SectionHeading
            label="On the record"
            title="Every decision, cited."
            body="Each action an agent takes carries the policy line that allowed it. When the examiner asks why a borrower was contacted on a Tuesday at 2pm, the answer is one row, not one week of discovery."
          />
          <Reveal delay={0.1}>
            <div className="bg-[#F4F3F3] p-3 sm:p-4">
              <div className="bg-white border border-gray-200 shadow-sm px-4 sm:px-5 py-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#191919]/50 font-medium pb-3 border-b border-gray-200">
                  Audit trail · acct ····4417
                </p>
                {AUDIT_ROWS.map((row) => (
                  <div
                    key={row.t}
                    className="py-3 border-b border-gray-100 last:border-b-0 grid grid-cols-[64px_1fr] gap-3"
                  >
                    <p className="text-xs text-[#191919]/40 tabular-nums pt-0.5">{row.t}</p>
                    <div>
                      <p className="text-sm text-[#191919]">{row.event}</p>
                      <p className="text-xs text-[#191919]/45 mt-0.5">{row.cite}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Integrations wall. */}
      <Section className="py-20 sm:py-28 border-t border-gray-200">
        <SectionHeading
          label="Integrations"
          title="Plugged into the systems you already run."
          body="Cores, LOS, CRM, telephony, and the warehouse. Boomerang reads and writes where your team already works. No rip and replace."
        />
        <Reveal className="mt-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 border-t border-l border-gray-200">
            {INTEGRATIONS.map((name) => (
              <div
                key={name}
                className="group border-b border-r border-gray-200 px-5 py-8 flex items-center justify-between hover:bg-[#F4F3F3] transition-colors duration-200"
              >
                <span className="text-sm font-medium text-[#191919]">{name}</span>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-gray-700 group-hover:translate-x-0.5 transition-all duration-200" />
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <CtaBand />
    </main>
  )
}
