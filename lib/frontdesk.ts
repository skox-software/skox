/**
 * Scripted front-desk agent for the hero demo.
 *
 * Deliberately NOT a live model call: no API cost, no latency, no abuse
 * surface, and no chance of the demo saying something wrong to a prospect.
 * The seam is `respond()` — swapping in a real backend is a one-file change.
 */

export type Msg = { id: number; from: "them" | "us"; text: string; kind?: "confirm" };

export const persona = {
  business: "Bloom Aesthetics",
  street: "Park Avenue",
  agentLabel: "Front desk",
  status: "Answering · 11:04pm",
};

export const greeting =
  "Bloom Aesthetics, this is the front desk. We're closed right now but I can answer questions and get you booked. What are you after?";

export const chips = [
  "How much is Botox?",
  "Do you do Sculptra?",
  "Can I book a consult?",
  "Are you open Saturday?",
];

type Intent = {
  id: string;
  test: RegExp;
  reply: string | string[];
  offersBooking?: boolean;
};

const INTENTS: Intent[] = [
  {
    id: "price-botox",
    test: /\b(botox|tox|units?|dysport|jeuveau)\b/i,
    reply: [
      "Botox runs $12 a unit. Most people land between 20 and 40 units depending on the areas, so typically $240–$480.",
      "First-timers usually start lower. I can put you in for a free consult and you'll get an exact number before anything happens — want me to find a time?",
    ],
    offersBooking: true,
  },
  {
    id: "price-filler",
    test: /\b(filler|sculptra|juvederm|restylane|lip)\b/i,
    reply: [
      "Yes — we do Sculptra, Juvéderm and Restylane. Sculptra is $850 a vial, most plans are 2–3 vials over a few months.",
      "That one really needs a look in person to quote properly. Consults are free and about twenty minutes — shall I book you one?",
    ],
    offersBooking: true,
  },
  {
    id: "hours",
    test: /\b(hours?|open|close|closed|saturday|sunday|weekend|today|tomorrow)\b/i,
    reply:
      "We're 9–6 Tuesday through Friday and 10–4 on Saturday. Closed Sunday and Monday. I can book you into any of those right now, even though nobody's here to pick up.",
    offersBooking: true,
  },
  {
    id: "location",
    test: /\b(where|address|location|parking|directions?|park ave)\b/i,
    reply:
      "We're on Park Avenue, just off the main strip — parking is free in the lot behind the building. Want me to text you the address?",
  },
  {
    id: "book",
    test: /\b(book|appointment|appt|schedule|consult|consultation|come in|availability|slot)\b/i,
    reply: "Happy to. Let me pull up what's open.",
    offersBooking: true,
  },
  {
    id: "human",
    test: /\b(human|person|real|speak to|talk to someone|manager|call me)\b/i,
    reply:
      "Of course. I'll flag this for the team first thing in the morning and someone will call you — and I can still hold a slot for you now so you don't lose it.",
    offersBooking: true,
  },
  {
    id: "insurance",
    test: /\b(insurance|covered|hsa|fsa|finance|payment plan|afterpay|cherry)\b/i,
    reply:
      "Aesthetic treatments aren't covered by insurance, but we take HSA/FSA cards and offer financing through Cherry. Most people split it over a few months.",
  },
  {
    id: "safety",
    test: /\b(safe|side effects?|bruis|swell|recovery|downtime|hurt|pain)\b/i,
    reply:
      "Downtime is minimal — some swelling or small bruising for a day or two is normal. Our injector is a nurse practitioner with nine years in. She'll go through all of it at the consult.",
    offersBooking: true,
  },
  {
    id: "cancel",
    test: /\b(cancel|reschedul|move my|change my)\b/i,
    reply:
      "No problem at all. If you give me the name on the booking I'll move it — there's no fee as long as it's more than 24 hours out.",
  },
  {
    id: "greet",
    test: /^\s*(hi|hey|hello|yo|good (morning|evening|afternoon))\b/i,
    reply: "Hi! What can I help you with tonight?",
  },
];

const FALLBACK =
  "Good question — I don't want to guess at that one. I'll put it in front of the team tonight and they'll come back to you in the morning. In the meantime I can hold you a consult slot so you don't lose the week.";

export const slots = ["Tue 10:30am", "Wed 2:00pm", "Thu 5:15pm", "Sat 11:00am"];

export function respond(input: string): { lines: string[]; offersBooking: boolean } {
  const text = input.trim();
  if (!text) return { lines: ["Sorry — I didn't catch that."], offersBooking: false };

  for (const intent of INTENTS) {
    if (intent.test.test(text)) {
      return {
        lines: Array.isArray(intent.reply) ? [...intent.reply] : [intent.reply],
        offersBooking: Boolean(intent.offersBooking),
      };
    }
  }
  return { lines: [FALLBACK], offersBooking: true };
}

export function confirmation(slot: string) {
  return `Done — you're in for ${slot}. I've sent a confirmation and a reminder the day before. Anything else before I let you go?`;
}
