import Link from "next/link";

/** The brand device: a blue line drawn through the word, once, on load. */
export function Strike({ children, now = false }: { children: React.ReactNode; now?: boolean }) {
  return <span className={now ? "strike now" : "strike"}>{children}</span>;
}

/** The sample job's own numbers, on an ink band under the hero. */
export function Strip({ items }: { items: readonly { n: string; label: string }[] }) {
  return (
    <div className="strip">
      <div className="wrap num">
        {items.map((item) => (
          <div key={item.label}>
            <b>{item.n}</b>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Title in columns 1–6, intro bottom-aligned in 7–12: the head of every section. */
export function SectionHead({ title, intro, gap = 56 }: { title: string; intro: string; gap?: number }) {
  return (
    <div className="grid sec" style={{ marginBottom: gap }}>
      <div className="c1-6">
        <h2>{title}</h2>
      </div>
      <div className="c7-12" style={{ alignSelf: "end" }}>
        <p className="intro">{intro}</p>
      </div>
    </div>
  );
}

export function Steps({ steps }: { steps: readonly { title: string; body: string }[] }) {
  return (
    <ol className="steps">
      {steps.map((step) => (
        <li key={step.title}>
          <div>
            <h3>{step.title}</h3>
            <p>{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

type Fig = { amount: string; unit: string; title: string; points: readonly string[] };

export function Figures({ hire, desk, source }: { hire: Fig; desk: Fig; source: string }) {
  return (
    <>
      <div className="ledger-lines">
        {[hire, desk].map((fig, i) => (
          <div className={i ? "line desk" : "line"} key={fig.title}>
            <div>
              <h3>{fig.title}</h3>
              <ul>
                {fig.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="amt num">
              {fig.amount}
              <small>{fig.unit}</small>
            </div>
          </div>
        ))}
      </div>
      <p className="small source">{source}</p>
    </>
  );
}

/** The review, as the closing section of the home and industry pages. */
export function ReviewSection({ title, intro, steps, cta, proofTitle, proof }: {
  title: string;
  intro: string;
  steps: readonly { title: string; body: string }[];
  cta: string;
  proofTitle: string;
  proof: string;
}) {
  return (
    <section id="live" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <SectionHead title={title} intro={intro} />
        <div className="grid">
          <div className="c1-6">
            <Steps steps={steps} />
            <div style={{ marginTop: 32 }}>
              <Link className="btn blue" href="/review" data-cta="review-section">
                {cta} <span className="dot" />
              </Link>
            </div>
          </div>
          <div className="c7-12 proof">
            <h3>{proofTitle}</h3>
            <p>{proof}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
