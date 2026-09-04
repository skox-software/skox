import Image from "next/image";
import { Section, SectionHead } from "@/components/Section";
import { team } from "@/content/site";

/**
 * The two of us, with faces. A named person with a photograph is harder to
 * dismiss than "a small team" — which is the whole claim the rest of the page
 * rests on.
 */
export function Team() {
  return (
    <Section id="team">
      <SectionHead kicker={team.kicker} headline={team.headline} sub={team.sub} />

      <div className="reveal mt-14 grid max-w-[860px] gap-12 sm:grid-cols-2 sm:gap-14">
        {team.members.map((m) => (
          <figure key={m.name}>
            <div
              className="chamfer relative aspect-[4/5] w-full max-w-[300px] overflow-hidden"
              style={{ background: "var(--surface-2)" }}
            >
              <Image
                src={m.photo}
                alt={`${m.name}, ${m.role} at SKOX`}
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="object-cover"
              />
            </div>

            <figcaption className="mt-5 max-w-[420px]">
              <p className="text-[20px] font-[450] tracking-[-0.01em]" style={{ color: "var(--text)" }}>
                {m.name}
              </p>
              <p
                className="mt-1.5 font-mono text-[11px] uppercase tracking-[0.16em]"
                style={{ color: "var(--color-amber-dim)" }}
              >
                {m.role}
              </p>
              {m.bio && (
                <p className="mt-4 text-[15px] leading-[1.6]" style={{ color: "var(--text-dim)" }}>
                  {m.bio}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
