/**
 * The eight lucide glyphs the prototype used, inlined so the concept page
 * doesn't add an icon dependency to SKOX for one private route.
 * Paths match lucide's 24×24 grid and stroke conventions.
 */
type Props = { size?: number };

function Icon({ size = 20, children }: Props & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const ArrowUpRight = (p: Props) => (
  <Icon {...p}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </Icon>
);

export const ArrowDown = (p: Props) => (
  <Icon {...p}>
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </Icon>
);

export const Check = (p: Props) => (
  <Icon {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Icon>
);

export const Coffee = (p: Props) => (
  <Icon {...p}>
    <path d="M10 2v2" />
    <path d="M14 2v2" />
    <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
    <path d="M6 2v2" />
  </Icon>
);

export const MapPin = (p: Props) => (
  <Icon {...p}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

export const Minus = (p: Props) => (
  <Icon {...p}>
    <path d="M5 12h14" />
  </Icon>
);

export const Plus = (p: Props) => (
  <Icon {...p}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </Icon>
);

export const ShoppingBag = (p: Props) => (
  <Icon {...p}>
    <path d="M16 10a4 4 0 0 1-8 0" />
    <path d="M3.103 6.034h17.794" />
    <path d="M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z" />
  </Icon>
);
