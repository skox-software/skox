import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import { PrivacyChoices } from "@/components/PrivacyChoices";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What SKOX collects, why, and how to have it deleted.",
};

const UPDATED = "5 October 2026";

export default function Privacy() {
  return (
    <div className="landing-page">
      <main className="page-narrow">
        <div>
          <Link href="/" className="page-back">
            ← SKOX
          </Link>

          <h1>Privacy</h1>
          <p className="page-meta">Last updated {UPDATED}</p>

          <div className="page-prose">
            <Block title="What we collect">
              What you type into the enquiry form: your name, your email
              address, your project description and, optionally, the type of
              project. If you reached us from an ad or a search, the campaign
              parameters in the link are recorded alongside it.
            </Block>

            <Block title="The free scorecard">
              If you request the Monday Locations Scorecard, we collect your
              email address and, if you give them, your first name and how many
              locations you run. We use them to email you the download link and,
              at most, one personal note from a founder about it. The same
              visit details described below arrive with the request. We never
              add you to a newsletter or a sales sequence.
            </Block>

            <Block title="What arrives with an enquiry">
              When you send an enquiry, or leave one unfinished as described
              below, it also carries: the pages you viewed on this site during
              that visit, how many times you have visited, how you first found
              us, your approximate city and region (worked out from your IP
              address), and your device type. If you use a business email
              address, we look up public information about the company at that
              domain, such as its industry, size and location, through Apollo.io.
              This summary is only put together when you contact us.
            </Block>

            <Block title="Enquiries you don’t finish">
              If you enter your email address in the enquiry form and then leave
              without sending it, we receive what you had filled in at that
              point — your address, and anything already typed above it — and we
              may follow up about it. The form says so beside the address field.
              Reply to that email, or write to us at the address below, and we
              will delete the record and not contact you again.
            </Block>

            <Block title="Why we collect it">
              To reply to you and to prepare a scope for the work you have
              described, and to understand which kinds of businesses our
              advertising reaches. We do not sell it or rent it. The only
              sharing is the advertising measurement described below, which you
              can opt out of.
            </Block>

            <Block title="Who can see it">
              The two of us. Enquiries are delivered by email through Resend,
              and the site runs on Vercel — both process data on our behalf as
              hosting and delivery providers. Visit data from the website
              tracker and company lookups are processed by Apollo.io, usage
              data from Google Analytics is processed by Google, and the
              advertising tags described below are processed by Meta, Google
              and LinkedIn, and session recordings are processed by Microsoft
              Clarity.
            </Block>

            <Block title="Analytics">
              We use Vercel Analytics, which is privacy-focused and does not use
              cookies or fingerprinting to follow you across other websites. It
              tells us which pages get read and whether a form was started or
              submitted, which enquiry buttons were used and which examples were
              explored. Form contents are not sent as analytics events. It does
              not tell us who you are.
            </Block>

            <Block title="Google Analytics">
              We also use Google Analytics 4. It sets cookies to tell one visit
              from the next and records which pages you view, roughly where you
              are, what device you use and how you arrived. We use it to see
              how the site is found and used, not to identify you. Google
              processes this data under its own privacy policy. Blocking
              cookies, or installing Google’s{" "}
              <a href="https://tools.google.com/dlpage/gaoptout">
                Analytics opt-out add-on
              </a>
              , will stop it.
            </Block>

            <Block title="Website visitor tracking">
              We also use Apollo.io’s website tracker. It records which pages
              you visit and uses information such as your IP address to work
              out which company you may be visiting from, and it may set cookies
              to do that. We use it to understand which businesses are
              interested in what we build. Apollo processes this data under its
              own privacy policy. If you would rather not be tracked, blocking
              third-party scripts or cookies in your browser will stop it.
            </Block>

            <Block title="Session recordings">
              We use Microsoft Clarity to record how visitors use this site:
              mouse movements, clicks, scrolling and the pages you move
              between, which we can replay to see where the site is confusing
              or broken, and summarise as heatmaps. Anything you type into a
              form is masked and never recorded. If you send an enquiry, we
              link the recording of that visit to your enquiry so we can see
              how you found what you were looking for. Clarity sets cookies,
              and Microsoft processes this data under its own privacy
              statement. You can switch it off under “Your Privacy Choices”
              below.
            </Block>

            <Block title="Advertising">
              We advertise on Meta (Facebook and Instagram), Google and
              LinkedIn, and use their tags on this site to measure whether our
              ads lead to enquiries and to show our ads to people who have
              visited. These tags set cookies and tell each platform which pages
              you viewed. When you send an enquiry, we tell Meta and Google that
              an enquiry happened and share your email address in a hashed
              (scrambled) form so they can match it to an account on their
              platform; they cannot read the address itself. Under California
              law this may count as “sharing” personal information for
              advertising. You can opt out by turning on Global Privacy Control
              in your browser, which this site honours automatically, by using
              the switch under “Your Privacy Choices” below, or by emailing us. You can also manage ad
              preferences in your Meta, Google and LinkedIn account settings.
            </Block>

            <Block title="How long we keep it">
              Enquiries stay in our email for as long as the conversation is
              useful. Ask us to delete yours and we will, without asking why.
            </Block>

            <Block title="Your Privacy Choices" id="choices">
              You can switch off the analytics, session recording and
              advertising tools described above at any time. Your browser will
              remember it, and the site works exactly the same either way.{" "}
              <PrivacyChoices />
            </Block>

            <Block title="Your rights">
              Wherever you live, you can ask what we hold about you, ask for it
              to be corrected or deleted, or opt out of the advertising
              measurement described above. Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> and we will
              handle it ourselves, usually within a few days and always within
              45. We will never treat you differently for asking.
            </Block>

            <Block title="Global Privacy Control and Do Not Track">
              If your browser sends a Global Privacy Control signal, we treat it
              as a request to opt out and the tools above don’t load. Browsers
              have stopped agreeing on what the older Do Not Track signal means,
              so we don’t act on it separately; Global Privacy Control or the
              switch above does the same job.
            </Block>

            <Block title="Children">
              This site is for businesses and is not directed at anyone under
              16.
            </Block>

            <Block title="Changes">
              If this changes, the date at the top changes with it.
            </Block>
          </div>
        </div>
      </main>
    </div>
  );
}

function Block({
  title,
  id,
  children,
}: {
  title: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id}>
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}
