import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What SKOX collects, why, and how to have it deleted.",
};

const UPDATED = "1 October 2026";

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
              described. Nothing else. We do not sell it, rent it, or share it
              with anyone for their own purposes.
            </Block>

            <Block title="Who can see it">
              The two of us. Enquiries are delivered by email through Resend,
              and the site runs on Vercel — both process data on our behalf as
              hosting and delivery providers. Visit data from the website
              tracker described below is processed by Apollo.io, and usage
              data from Google Analytics is processed by Google.
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

            <Block title="How long we keep it">
              Enquiries stay in our email for as long as the conversation is
              useful. Ask us to delete yours and we will, without asking why.
            </Block>

            <Block title="Your choices">
              You can ask what we hold about you, ask for it to be corrected, or
              ask for it to be deleted. Email{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> and we will
              handle it ourselves.
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
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{children}</p>
    </section>
  );
}
