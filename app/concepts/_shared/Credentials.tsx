import type { ReactNode } from "react";

/**
 * Credibility strip. Every item must trace to a ledger row; show no award,
 * licence or rating the research didn't find. Third-party marks are simple
 * inline glyphs in their own brand colours, used only to label a rating from
 * that platform.
 */

export type CredentialMark =
  | "google"
  | "facebook"
  | "tripadvisor"
  | { initials: string }
  | { image: string; size?: number };

export type Credential = {
  /** Source to verify it. Without one the item renders as plain text. */
  href?: string;
  mark: CredentialMark;
  /** The bold part: "4.3", "Member", "Incorporated 2007". */
  big: string;
  /** The rest of the line: "on Google". */
  text: string;
  /** Muted trailer: "27 reviews". */
  small?: string;
};

function GoogleG() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.5-5.2 3.5-8.7z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1C3.3 21.3 7.3 24 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3c-.3-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3V6.6H1.3C.5 8.2 0 10 0 12s.5 3.8 1.3 5.4l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C18 1.2 15.2 0 12 0 7.3 0 3.3 2.7 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}
function FacebookF() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#1877F2" />
      <path fill="#fff" d="M13.5 19.5v-6h2l.3-2.4h-2.3V9.6c0-.7.2-1.2 1.2-1.2h1.3V6.3c-.2 0-1-.1-1.9-.1-1.9 0-3.1 1.1-3.1 3.2v1.7H9v2.4h2v6h2.5z" />
    </svg>
  );
}
function Owl() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <circle cx="12" cy="12" r="12" fill="#34E0A1" />
      <circle cx="8" cy="12.5" r="3.2" fill="#fff" />
      <circle cx="16" cy="12.5" r="3.2" fill="#fff" />
      <circle cx="8" cy="12.5" r="1.4" fill="#000" />
      <circle cx="16" cy="12.5" r="1.4" fill="#000" />
    </svg>
  );
}

function Mark({ mark }: { mark: CredentialMark }) {
  if (mark === "google") return <GoogleG />;
  if (mark === "facebook") return <FacebookF />;
  if (mark === "tripadvisor") return <Owl />;
  if ("image" in mark) {
    const size = mark.size ?? 44;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={mark.image} alt="" width={size} height={size} />;
  }
  return (
    <span className="cred-mark" aria-hidden="true">
      {mark.initials}
    </span>
  );
}

export default function Credentials({ items, footnote }: { items: Credential[]; footnote?: ReactNode }) {
  return (
    <section className="cred shell" aria-label="Ratings and credentials">
      <ul className="cred-list">
        {items.map((c) => {
          const body = (
            <>
              <Mark mark={c.mark} />
              <span>
                <strong>{c.big}</strong> {c.text}
                {c.small && (
                  <>
                    {" "}
                    <small>{c.small}</small>
                  </>
                )}
              </span>
            </>
          );
          return (
            <li key={c.big + c.text}>
              {c.href ? <a href={c.href}>{body}</a> : <span className="cred-static">{body}</span>}
            </li>
          );
        })}
      </ul>
      {footnote && <p className="cred-clients">{footnote}</p>}
    </section>
  );
}
