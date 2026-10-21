import type { Metadata } from "next";

/** Concept routes are `<business>-<8 hex>` so the path can't be guessed. */
const SLUG_SHAPE = /^[a-z0-9]+(?:-[a-z0-9]+)*-[0-9a-f]{8}$/;

/**
 * The noindex metadata every preview carries. Title and description name the
 * business and say plainly that this is a SKOX concept, not their live site.
 */
export function previewMetadata(
  slug: string,
  business: string,
  opts: { place?: string; description?: string } = {},
): Metadata {
  if (!SLUG_SHAPE.test(slug)) {
    throw new Error(`Preview slug "${slug}" must end in -<8 hex> so the route stays unguessable.`);
  }
  const where = opts.place ? ` in ${opts.place}` : "";
  return {
    title: `${business} — concept by SKOX`,
    description:
      opts.description ??
      `A private website concept for ${business}${where}, built by SKOX. Not the live site.`,
    robots: { index: false, follow: false, nocache: true },
  };
}
