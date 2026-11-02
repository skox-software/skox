type Item = { status: string; who: string; what: string; href?: string; linkLabel?: string };

/** The dot beside each status: green only for work running today, blue for testing, ink for shipped. */
const tone = (status: string) => (status === "Running daily" || status === "Live" ? "w-status ok" : status === "In testing" ? "w-status testing" : "w-status");

/** Work we've done, as ledger rows: what it is, what it does, its exact status. */
export function WorkCards({ items }: { items: readonly Item[] }) {
  return (
    <ul className="work-list">
      {items.map((item) => (
        <li key={item.who}>
          <h3>{item.who}</h3>
          <p>
            {item.what}
            {item.href && (
              <>
                {" "}
                <a className="link" href={item.href} target="_blank" rel="noopener">
                  {item.linkLabel}
                </a>
              </>
            )}
          </p>
          <span className={tone(item.status)}>
            <span className="w-dot" aria-hidden /> {item.status}
          </span>
        </li>
      ))}
    </ul>
  );
}
