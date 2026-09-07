/**
 * Testimonial slot — intentionally empty and unrendered.
 *
 * SKOX has no client quotes yet, and inventing them is not an option. Two real
 * ones are the highest-leverage addition to this page: drop them in `quotes`
 * and this section starts rendering itself.
 */
type Quote = { body: string; name: string; role: string };

export const quotes: Quote[] = [];

export function Proof() {
  if (quotes.length === 0) return null;
  return (
    <section
      className="px-5 sm:px-8 md:px-[82px] py-24"
      style={{ background: "var(--surface-2)" }}
    >
      <div
        className="w-full max-w-[1800px] mx-auto grid md:grid-cols-2 gap-px"
        style={{ background: "var(--line)" }}
      >
        {quotes.map((q) => (
          <figure
            key={q.name}
            className="reveal p-10"
            style={{ background: "var(--surface-2)" }}
          >
            <blockquote
              className="text-[20px] leading-[1.45]"
              style={{ color: "var(--text)" }}
            >
              “{q.body}”
            </blockquote>
            <figcaption
              className="mt-5 font-mono text-[13px]"
              style={{ color: "var(--text-dim)" }}
            >
              {q.name} · {q.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
