import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "What SKOX collects, why, and how to have it deleted.",
};

const UPDATED = "4 September 2026";

export default function Privacy() {
  return (
    <main className="min-h-screen px-5 py-20 sm:px-8 md:px-[82px]" style={{ background: "var(--surface)" }}>
      <div className="mx-auto w-full max-w-[720px]">
        <Link href="/" className="font-mono text-[13px] underline underline-offset-4" style={{ color: "var(--text-dim)" }}>
          ← SKOX
        </Link>

        <h1 className="mt-8 text-[36px] font-normal leading-[1.05] tracking-[-0.025em] sm:text-[44px]" style={{ color: "var(--text)" }}>
          Privacy
        </h1>
        <p className="mt-3 font-mono text-[13px]" style={{ color: "var(--text-dim)" }}>
          Last updated {UPDATED}
        </p>

        <div className="mt-10 flex flex-col gap-8 text-[16px] leading-[1.65]" style={{ color: "var(--text-dim)" }}>
          <Block title="What we collect">
            Only what you type into a form on this site: your name, your email address, optionally your
            company, and whatever you write in the description field. If you use the cost calculator, the
            figures you enter are attached to your enquiry so we arrive at the call already understanding
            your numbers. If you reached us from an ad or a search, the campaign parameters in the link are
            recorded alongside it.
          </Block>

          <Block title="Why we collect it">
            To reply to you and to prepare a scope for the work you have described. Nothing else. We do not
            sell it, rent it, or share it with anyone for their own purposes.
          </Block>

          <Block title="Who can see it">
            The two of us. Enquiries are delivered by email through Resend, and the site runs on Vercel —
            both process data on our behalf as hosting and delivery providers.
          </Block>

          <Block title="Analytics">
            We use Vercel Analytics, which is privacy-focused and does not use cookies or fingerprinting to
            follow you across other websites. It tells us which pages get read and whether a form was
            submitted. It does not tell us who you are.
          </Block>

          <Block title="How long we keep it">
            Enquiries stay in our email for as long as the conversation is useful. Ask us to delete yours and
            we will, without asking why.
          </Block>

          <Block title="Your choices">
            You can ask what we hold about you, ask for it to be corrected, or ask for it to be deleted. Email{" "}
            <a href={`mailto:${site.email}`} className="underline underline-offset-4" style={{ color: "var(--color-amber-dim)" }}>
              {site.email}
            </a>{" "}
            and we will handle it ourselves.
          </Block>

          <Block title="Children">
            This site is for businesses and is not directed at anyone under 16.
          </Block>

          <Block title="Changes">
            If this changes, the date at the top changes with it.
          </Block>
        </div>
      </div>
    </main>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-[18px] font-[450]" style={{ color: "var(--text)" }}>
        {title}
      </h2>
      <p>{children}</p>
    </section>
  );
}
