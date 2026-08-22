import { Link } from 'react-router-dom'
import { MarketingHeader } from '../components/MarketingHeader'
import { MarketingFooter } from '../components/MarketingFooter'
import { Seo } from '../components/Seo'
import { CONTACT_EMAIL, DISPLAY, Eyebrow } from '../components/shared'

const LAST_UPDATED = 'August 20, 2026'

// TODO (Kelly): fill in before publishing — see the callout in the
// "Governing law" section below for why these matter.
const GOVERNING_LAW_STATE = '[Your State]'
const BUSINESS_NAME = 'Kelly Woznicki, doing business as Empire of Light'

export default function TermsPage() {
  return (
    <div style={{ width: '100%', overflowX: 'hidden', background: '#FDFAF4', color: '#131114', fontFamily: "'Work Sans', system-ui, sans-serif" }}>
      <Seo
        title="Terms of Service | Empire of Light"
        description="The terms that govern your use of empireoflightcollective.com, including how the founding co-creator pilot engagement works."
        path="/terms"
      />
      <MarketingHeader />

      {/* Hero */}
      <section className="px-6 py-16 md:px-8 md:py-24" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-[840px]">
          <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.16em]" style={{ ...DISPLAY, color: '#FEE16A' }}>
            Terms of Service
          </div>
          <h1 className="m-0 mb-4 text-[32px] leading-[1.1] font-light md:text-[46px] md:leading-[1.06]" style={{ ...DISPLAY, letterSpacing: '.02em', color: '#FBF7F2' }}>
            The rules for using this website
          </h1>
          <p className="m-0 text-[15px]" style={{ color: 'rgba(251,247,242,.6)' }}>Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto flex max-w-[760px] flex-col gap-5">
          <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#131114' }}>
            These terms cover your use of <strong style={{ fontWeight: 600 }}>empireoflightcollective.com</strong> — this marketing site,
            including the thesis, about, advisory, and contact pages, and the process of booking a conversation and becoming a founding
            co-creator. By using this site, you agree to them.
          </p>
          <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
            The Empire of Light app, at <strong style={{ fontWeight: 600, color: '#131114' }}>app.empireoflightcollective.com</strong>, is
            governed by its own separate Terms of Service — once your team is invited in, those apply to your use of the product.
          </p>
        </div>
      </section>

      {/* Using this site */}
      <section className="px-6 py-16 md:px-8 md:py-20" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-[760px]">
          <Eyebrow color="#FEE16A">Using this site</Eyebrow>
          <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
            This site is here to explain the Empire of Light framework and the pilot program, and to give you a way to get in touch. You’re
            welcome to read it, share links to it, and reach out through it. You agree not to scrape, copy, or republish its content at scale,
            attempt to disrupt or gain unauthorized access to it, or use it for anything unlawful.
          </p>
        </div>
      </section>

      {/* The pilot program */}
      <section className="px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[760px]">
          <Eyebrow>The pilot program</Eyebrow>
          <div className="flex flex-col gap-4">
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#131114' }}>
              Booking a conversation through this site is a conversation, not a commitment — either of us can decide it’s not the right fit.
              If we move forward, your team becomes a founding co-creator for a 4&ndash;6 week facilitated engagement at a sliding-scale
              investment between $500 and $5,000, based on team size and scope, as described on the home page.
            </p>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#544D5A' }}>
              That investment is refunded if your team completes the program and doesn’t find it valuable. For larger or more complex
              engagements, we may put the specific scope, timeline, and payment terms in a separate written agreement — where that happens,
              its terms govern the engagement itself, and these website terms continue to cover your use of the site around it.
            </p>
          </div>
        </div>
      </section>

      {/* Booking & third parties */}
      <section className="px-6 py-16 md:px-8 md:py-20" style={{ background: '#000000' }}>
        <div className="mx-auto max-w-[760px]">
          <Eyebrow color="#FEE16A">Booking and other third-party services</Eyebrow>
          <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
            “Book a conversation” runs on Google Calendar’s scheduling tool, and “Follow us on Substack” takes you to Substack — both are
            separate services with their own terms and privacy policies, not ours. We’re not responsible for how those third-party services
            operate.
          </p>
        </div>
      </section>

      {/* Intellectual property */}
      <section className="px-6 py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-[760px]">
          <Eyebrow>Intellectual property</Eyebrow>
          <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#131114' }}>
            The Empire of Light framework — the Reimagine, Do, Unlearn, Evolve cycle, the thesis, and the content, design, and branding of
            this site — belongs to {BUSINESS_NAME}. You’re welcome to reference and link to it; you don’t have permission to reproduce,
            repackage, or teach it commercially as your own without asking first.
          </p>
        </div>
      </section>

      {/* Disclaimers, liability, law, changes */}
      <section className="px-6 py-16 md:px-8 md:py-20" style={{ background: '#000000' }}>
        <div className="mx-auto flex max-w-[760px] flex-col gap-10">
          <div>
            <Eyebrow color="#FEE16A">No guarantee of results</Eyebrow>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              The thesis, framework, and outcomes described on this site reflect our working theory and past experience — they’re not a
              promise of specific results for your team. Nothing on this site is professional, legal, financial, or medical advice.
            </p>
          </div>
          <div>
            <Eyebrow color="#FEE16A">Site provided as-is</Eyebrow>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              This site is provided “as is,” without warranties of any kind. We don’t guarantee it will be uninterrupted, error-free, or free
              of viruses or other harmful components. To the fullest extent permitted by law, {BUSINESS_NAME} isn’t liable for any indirect,
              incidental, or consequential damages arising from your use of this site.
            </p>
          </div>
          <div>
            <Eyebrow color="#FEE16A">Governing law</Eyebrow>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              These terms are governed by the laws of {GOVERNING_LAW_STATE}, without regard to conflict-of-law principles.
            </p>
          </div>
          <div>
            <Eyebrow color="#FEE16A">Children</Eyebrow>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              This site is intended for working professionals and is not directed at anyone under 18.
            </p>
          </div>
          <div>
            <Eyebrow color="#FEE16A">Changes to these terms</Eyebrow>
            <p className="m-0 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: 'rgba(251,247,242,.75)' }}>
              If we make material changes to these terms, we’ll update the date at the top of this page. Continuing to use the site after
              changes take effect means you accept the updated terms.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="px-6 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-[760px] text-center">
          <Eyebrow>Questions</Eyebrow>
          <p className="m-0 mb-2 text-[16px] leading-[1.7] md:text-[17px]" style={{ color: '#131114' }}>
            If you have questions about these terms, reach out any time.
          </p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-[16px] font-semibold" style={{ ...DISPLAY, color: '#A96D0F' }}>
            {CONTACT_EMAIL}
          </a>
          <p className="mt-8 text-[14px]" style={{ color: '#544D5A' }}>
            See also our <Link to="/privacy" style={{ color: '#A96D0F' }}>privacy policy</Link>.
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  )
}
