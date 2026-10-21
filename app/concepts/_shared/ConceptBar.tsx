import type { ReactNode } from "react";
import AskForm from "./AskForm";

/**
 * The standing bar at the top of every preview: says it's a SKOX concept,
 * offers the one-field question and the booking link. Styled by the page's
 * own concept.css via .concept-bar and friends.
 */
export default function ConceptBar({
  slug,
  business,
  shortName = business,
  bookUrl,
  askPlaceholder,
  label,
  bookLabel = "Book 15 min with Reiss",
}: {
  slug: string;
  /** Full business name, sent with questions. */
  business: string;
  /** Name as said in the bar, if shorter. */
  shortName?: string;
  bookUrl: string;
  /** An example question this business would ask. */
  askPlaceholder: string;
  label?: ReactNode;
  bookLabel?: string;
}) {
  return (
    <div className="concept-bar" role="region" aria-label="About this concept">
      <p>
        {label ?? (
          <>
            <strong>Concept built by SKOX for {shortName}.</strong> Not live. Nothing here is public.
          </>
        )}
      </p>
      <div className="concept-bar-actions">
        <AskForm slug={slug} business={business} placeholder={askPlaceholder} />
        <a className="btn btn-small btn-primary" href={bookUrl}>
          {bookLabel}
        </a>
      </div>
    </div>
  );
}
