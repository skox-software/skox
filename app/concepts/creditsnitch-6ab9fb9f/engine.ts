/**
 * The CreditSnitch engine, in miniature.
 *
 * Section 7 of the vision doc promises a *deterministic* engine: every stage,
 * blocker, action and content recommendation is produced by defined rules over
 * the credit profile, never by a model. This file is that claim made
 * demonstrable — the mockup recomputes everything from one profile object, so
 * the client can toggle an action or switch goals and watch the whole app
 * re-derive in front of her.
 *
 * The numbers are illustrative. The shape of the calculation is the pitch.
 */

export type GoalId =
  | "home"
  | "car"
  | "card"
  | "loan"
  | "refinance"
  | "score"
  | "health"
  | "scratch"
  | "business"
  | "understand";

export type FactorId =
  | "utilization"
  | "collections"
  | "payment"
  | "inquiries"
  | "age"
  | "debt"
  | "scores"
  | "depth";

/** The four actions the demo lets you complete, each rewriting the profile. */
export type ActionId =
  | "utilization"
  | "collection"
  | "inquiries"
  | "payment"
  | "debt";

export type Profile = {
  revolvingBalance: number;
  revolvingLimit: number;
  openCollections: number;
  collectionAmount: number;
  recentLates: number;
  inquiries12mo: number;
  avgAgeMonths: number;
  openAccounts: number;
  installmentBalance: number;
  /** Points added to every bureau score by the actions completed so far. */
  scoreLift: number;
};

const BASE: Profile = {
  revolvingBalance: 9240,
  revolvingLimit: 13800,
  openCollections: 1,
  collectionAmount: 840,
  recentLates: 1,
  inquiries12mo: 3,
  avgAgeMonths: 50,
  openAccounts: 7,
  installmentBalance: 18400,
  scoreLift: 0,
};

/** What each completed action does to the profile. Deterministic, by design. */
const EFFECTS: Record<ActionId, (p: Profile) => Profile> = {
  utilization: (p) => ({ ...p, revolvingBalance: 2070, scoreLift: p.scoreLift + 42 }),
  collection: (p) => ({ ...p, openCollections: 0, scoreLift: p.scoreLift + 18 }),
  payment: (p) => ({ ...p, recentLates: 0, scoreLift: p.scoreLift + 21 }),
  inquiries: (p) => ({ ...p, inquiries12mo: 1, scoreLift: p.scoreLift + 6 }),
  debt: (p) => ({ ...p, installmentBalance: 11200, scoreLift: p.scoreLift + 5 }),
};

export function buildProfile(done: ActionId[]): Profile {
  return done.reduce((p, id) => EFFECTS[id](p), BASE);
}

export const utilization = (p: Profile) =>
  Math.round((p.revolvingBalance / p.revolvingLimit) * 100);

/* ---------------------------------------------------------------- goals -- */

type GoalSpec = {
  label: string;
  /** Shown on the home screen under the stage. */
  short: string;
  /** Which score group the goal puts first. */
  scoreGroup: string;
  /** Utilization the goal wants, and how hard it punishes overshoot. */
  idealUtil: number;
  utilPenalty: number;
  /** How much a single open collection costs, 0–100. */
  collectionFloor: number;
  /** How much one recent late costs, 0–100. */
  lateFloor: number;
  weights: Partial<Record<FactorId, number>>;
};

/**
 * Weights are the goal model. A mortgage is unforgiving about collections and
 * derogatory marks; an auto lender cares far more about payment history than
 * about a 45%-utilized credit card. Switching goals reshuffles the whole plan
 * because the weights, not the data, are what changed.
 */
export const GOALS: Record<GoalId, GoalSpec> = {
  home: {
    label: "Buy a home",
    short: "Mortgage readiness",
    scoreGroup: "Mortgage",
    idealUtil: 10,
    utilPenalty: 1.7,
    collectionFloor: 15,
    lateFloor: 40,
    weights: { scores: 0.26, collections: 0.18, payment: 0.16, utilization: 0.16, debt: 0.12, age: 0.07, inquiries: 0.05 },
  },
  car: {
    label: "Buy a car",
    short: "Auto financing readiness",
    scoreGroup: "Auto",
    idealUtil: 30,
    utilPenalty: 1.0,
    collectionFloor: 45,
    lateFloor: 52,
    weights: { scores: 0.3, payment: 0.24, utilization: 0.14, debt: 0.12, collections: 0.1, age: 0.06, inquiries: 0.04 },
  },
  card: {
    label: "Qualify for a credit card",
    short: "Card approval readiness",
    scoreGroup: "Credit cards",
    idealUtil: 20,
    utilPenalty: 1.4,
    collectionFloor: 35,
    lateFloor: 48,
    weights: { scores: 0.28, utilization: 0.24, payment: 0.16, inquiries: 0.12, collections: 0.1, age: 0.1 },
  },
  loan: {
    label: "Get a personal loan",
    short: "Personal loan readiness",
    scoreGroup: "General credit",
    idealUtil: 25,
    utilPenalty: 1.2,
    collectionFloor: 35,
    lateFloor: 45,
    weights: { scores: 0.28, debt: 0.2, payment: 0.18, utilization: 0.16, collections: 0.1, age: 0.08 },
  },
  refinance: {
    label: "Refinance",
    short: "Refinance readiness",
    scoreGroup: "Mortgage",
    idealUtil: 15,
    utilPenalty: 1.5,
    collectionFloor: 20,
    lateFloor: 40,
    weights: { scores: 0.28, payment: 0.2, debt: 0.16, utilization: 0.16, collections: 0.12, age: 0.08 },
  },
  score: {
    label: "Improve my score",
    short: "Score improvement",
    scoreGroup: "General credit",
    idealUtil: 10,
    utilPenalty: 1.5,
    collectionFloor: 30,
    lateFloor: 40,
    weights: { utilization: 0.28, payment: 0.24, collections: 0.16, scores: 0.12, inquiries: 0.1, age: 0.1 },
  },
  health: {
    label: "Improve my overall credit health",
    short: "Overall credit health",
    scoreGroup: "General credit",
    idealUtil: 20,
    utilPenalty: 1.2,
    collectionFloor: 30,
    lateFloor: 45,
    weights: { utilization: 0.2, payment: 0.2, debt: 0.16, collections: 0.14, scores: 0.12, age: 0.1, depth: 0.08 },
  },
  scratch: {
    label: "Build credit from scratch",
    short: "File-building progress",
    scoreGroup: "General credit",
    idealUtil: 10,
    utilPenalty: 1.2,
    collectionFloor: 35,
    lateFloor: 40,
    weights: { depth: 0.3, age: 0.24, payment: 0.2, utilization: 0.14, scores: 0.12 },
  },
  business: {
    label: "Build business credit",
    short: "Business credit readiness",
    scoreGroup: "General credit",
    idealUtil: 20,
    utilPenalty: 1.2,
    collectionFloor: 25,
    lateFloor: 45,
    weights: { scores: 0.24, payment: 0.22, debt: 0.18, utilization: 0.16, collections: 0.12, age: 0.08 },
  },
  understand: {
    label: "Understand my credit",
    short: "Getting oriented",
    scoreGroup: "General credit",
    idealUtil: 25,
    utilPenalty: 1.0,
    collectionFloor: 40,
    lateFloor: 50,
    weights: { scores: 0.24, utilization: 0.2, payment: 0.2, collections: 0.14, age: 0.12, depth: 0.1 },
  },
};

export const GOAL_ORDER: GoalId[] = [
  "home", "car", "card", "loan", "refinance",
  "score", "health", "scratch", "business", "understand",
];

/* --------------------------------------------------------------- scores -- */

export type Score = { model: string; bureau: string; value: number };
export type ScoreGroup = { name: string; note: string; scores: Score[] };

const BASE_SCORES: ScoreGroup[] = [
  {
    name: "Mortgage",
    note: "The older FICO versions mortgage lenders are required to pull. These usually read lower than the score in your banking app.",
    scores: [
      { model: "FICO Score 2", bureau: "Experian", value: 631 },
      { model: "FICO Score 5", bureau: "Equifax", value: 644 },
      { model: "FICO Score 4", bureau: "TransUnion", value: 638 },
      { model: "VantageScore 3.0", bureau: "TransUnion", value: 652 },
    ],
  },
  {
    name: "Auto",
    note: "FICO Auto Scores run on a 250–900 scale and weight auto-loan history more heavily.",
    scores: [
      { model: "FICO Auto Score 8", bureau: "Experian", value: 668 },
      { model: "FICO Auto Score 8", bureau: "Equifax", value: 659 },
      { model: "FICO Auto Score 8", bureau: "TransUnion", value: 672 },
    ],
  },
  {
    name: "Credit cards",
    note: "FICO Bankcard Scores are what most card issuers look at.",
    scores: [
      { model: "FICO Bankcard 8", bureau: "Experian", value: 661 },
      { model: "FICO Bankcard 8", bureau: "Equifax", value: 670 },
      { model: "FICO Bankcard 8", bureau: "TransUnion", value: 655 },
    ],
  },
  {
    name: "General credit",
    note: "The general-purpose models. VantageScore is what most free apps show you.",
    scores: [
      { model: "FICO Score 8", bureau: "Experian", value: 648 },
      { model: "FICO Score 9", bureau: "Experian", value: 655 },
      { model: "FICO Score 10 T", bureau: "Equifax", value: 651 },
      { model: "VantageScore 4.0", bureau: "TransUnion", value: 663 },
    ],
  },
];

export function scoreGroups(p: Profile): ScoreGroup[] {
  return BASE_SCORES.map((g) => ({
    ...g,
    scores: g.scores.map((s) => ({ ...s, value: s.value + p.scoreLift })),
  }));
}

/* -------------------------------------------------------------- factors -- */

const clamp = (n: number) => Math.max(0, Math.min(100, n));

export type Factor = {
  id: FactorId;
  label: string;
  /** 0–100, higher is healthier. */
  sub: number;
  /** Plain-English current state, shown under the blocker. */
  detail: string;
};

export function factors(p: Profile, goal: GoalId): Factor[] {
  const g = GOALS[goal];
  const util = utilization(p);
  const group = scoreGroups(p).find((s) => s.name === g.scoreGroup)!;
  const avg = Math.round(group.scores.reduce((a, s) => a + s.value, 0) / group.scores.length);

  return [
    {
      id: "utilization",
      label: "Credit card utilization",
      sub: clamp(100 - Math.max(0, util - g.idealUtil) * g.utilPenalty),
      detail: `Your revolving utilization is ${util}%.`,
    },
    {
      id: "collections",
      label: "Collection account",
      sub: p.openCollections === 0 ? 100 : clamp(g.collectionFloor - (p.openCollections - 1) * 20),
      detail:
        p.openCollections === 0
          ? "No open collections on your report."
          : `${p.openCollections} collection needs your attention.`,
    },
    {
      id: "payment",
      label: "Recent late payment",
      sub: p.recentLates === 0 ? 100 : clamp(g.lateFloor - (p.recentLates - 1) * 18),
      detail:
        p.recentLates === 0
          ? "No late payments in the last 24 months."
          : `${p.recentLates} account recently reported a late payment.`,
    },
    {
      id: "inquiries",
      label: "Recent hard inquiries",
      sub: p.inquiries12mo <= 1 ? 100 : clamp(100 - (p.inquiries12mo - 1) * 16),
      detail: `${p.inquiries12mo} hard ${p.inquiries12mo === 1 ? "inquiry" : "inquiries"} in the last 12 months.`,
    },
    {
      id: "age",
      label: "Length of credit history",
      sub: clamp((p.avgAgeMonths / 84) * 100),
      detail: `Your average account age is ${Math.floor(p.avgAgeMonths / 12)} years ${p.avgAgeMonths % 12} months.`,
    },
    {
      id: "debt",
      label: "Total debt load",
      sub: clamp(100 - ((p.revolvingBalance + p.installmentBalance) / 34000) * 100),
      detail: `$${(p.revolvingBalance + p.installmentBalance).toLocaleString()} in total reported debt.`,
    },
    {
      id: "scores",
      label: `${g.scoreGroup} scores`,
      sub: clamp(((avg - 560) / (740 - 560)) * 100),
      detail: `Your ${g.scoreGroup.toLowerCase()} scores average ${avg}.`,
    },
    {
      id: "depth",
      label: "Depth of credit file",
      sub: clamp((p.openAccounts / 9) * 100),
      detail: `${p.openAccounts} open accounts across cards and loans.`,
    },
  ];
}

/* ------------------------------------------------------------- readiness -- */

export const STAGES = ["Building", "Improving", "Almost Qualified", "Qualified"] as const;
export type Stage = (typeof STAGES)[number];

export type Readiness = {
  value: number;
  stage: Stage;
  stageIndex: number;
  /** 0–100 position inside the current stage, for the in-stage progress bar. */
  withinStage: number;
};

/** Stage floors. Deliberately banded: the doc argues against showing "74% ready". */
const BANDS: { stage: Stage; min: number; max: number }[] = [
  { stage: "Building", min: 0, max: 45 },
  { stage: "Improving", min: 45, max: 68 },
  { stage: "Almost Qualified", min: 68, max: 86 },
  { stage: "Qualified", min: 86, max: 101 },
];

export function readiness(p: Profile, goal: GoalId): Readiness {
  const w = GOALS[goal].weights;
  const fs = factors(p, goal);
  let total = 0;
  let weight = 0;
  for (const f of fs) {
    const fw = w[f.id];
    if (!fw) continue;
    total += f.sub * fw;
    weight += fw;
  }
  const value = Math.round(total / weight);
  const band = BANDS.find((b) => value >= b.min && value < b.max) ?? BANDS[3];
  return {
    value,
    stage: band.stage,
    stageIndex: BANDS.indexOf(band),
    withinStage: Math.round(((value - band.min) / (band.max - band.min)) * 100),
  };
}

/* -------------------------------------------------- blockers and the plan -- */

export type Severity = "High" | "Medium" | "Low";

export type Blocker = Factor & {
  severity: Severity;
  /** weight × shortfall — this is the ranking, and it is goal-dependent. */
  impact: number;
};

export function blockers(p: Profile, goal: GoalId): Blocker[] {
  const w = GOALS[goal].weights;
  return factors(p, goal)
    .filter((f) => w[f.id] && f.sub < 72)
    .map((f) => ({
      ...f,
      severity: (f.sub < 45 ? "High" : f.sub < 60 ? "Medium" : "Low") as Severity,
      impact: Math.round((100 - f.sub) * (w[f.id] ?? 0) * 10) / 10,
    }))
    .sort((a, b) => b.impact - a.impact);
}

export type PlanItem = {
  actionId: ActionId | null;
  title: string;
  from: string;
  to: string;
  why: string;
  how: string;
  timing: string;
};

/** Every blocker converts into exactly one plan item. Nothing else can. */
export function plan(p: Profile, goal: GoalId): PlanItem[] {
  const g = GOALS[goal];
  const util = utilization(p);
  const map: Partial<Record<FactorId, PlanItem>> = {
    utilization: {
      actionId: "utilization",
      title: "Lower revolving utilization",
      from: `${util}% used`,
      to: `Under ${g.idealUtil}%`,
      why: `${g.label} is the goal, and utilization is the fastest-moving factor you control. It re-reports every month.`,
      how: "Pay Chase Freedom down first: it is at 85% on its own, and per-card utilization is scored as well as the total.",
      timing: "Now",
    },
    collections: {
      actionId: "collection",
      title: "Review ABC Collections",
      from: `$${p.collectionAmount} reported`,
      to: "Resolved or disputed",
      why: "An open collection is the single heaviest drag on a mortgage file, and it is the first thing an underwriter asks about.",
      how: "Confirm the balance and the original creditor before you pay anything. If the details are wrong, flag it and we will take you into the dispute tools.",
      timing: "Next",
    },
    payment: {
      actionId: "payment",
      title: "Rebuild an on-time streak",
      from: `${p.recentLates} recent late`,
      to: "12 months clean",
      why: "Payment history is the largest single input to every model you are scored on.",
      how: "Autopay the minimum on every account, then pay extra by hand. The late itself ages off; the streak is what replaces it.",
      timing: "Ongoing",
    },
    inquiries: {
      actionId: "inquiries",
      title: "Avoid new hard inquiries",
      from: `${p.inquiries12mo} in 12 months`,
      to: "No new inquiries",
      why: "New inquiries read as new risk right when a lender is deciding.",
      how: "Rate-shopping for one mortgage or auto loan inside a short window counts as a single inquiry. Opening a store card does not.",
      timing: "Ongoing",
    },
    age: {
      actionId: null,
      title: "Keep your oldest accounts open",
      from: `${Math.floor(p.avgAgeMonths / 12)} yr average age`,
      to: "7 yr average age",
      why: "Age is the one factor you cannot rush. Protecting it is the whole strategy.",
      how: "Do not close your oldest card, even if you have stopped using it. Put one small recurring charge on it.",
      timing: "Ongoing",
    },
    debt: {
      actionId: "debt",
      title: "Bring down total debt",
      from: `$${(p.revolvingBalance + p.installmentBalance).toLocaleString()}`,
      to: "Under $20,000",
      why: "For a mortgage this drives your debt-to-income ratio, which is scored separately from your credit score.",
      how: "Installment balances come down on schedule. Revolving is where you can move the number yourself.",
      timing: "Ongoing",
    },
    scores: {
      actionId: null,
      title: "Lift your mortgage-model scores",
      from: "Below the tier",
      to: "Next pricing tier",
      why: "Lenders price in tiers. A few points at the right moment can be worth real money per month.",
      how: "This one is an outcome, not an action. The items above are what move it.",
      timing: "Outcome",
    },
    depth: {
      actionId: null,
      title: "Add depth to your file",
      from: `${p.openAccounts} accounts`,
      to: "A fuller mix",
      why: "A thin file gives the models very little to score.",
      how: "A secured card or a credit-builder account reported to all three bureaus is the usual starting point.",
      timing: "Next",
    },
  };

  return blockers(p, goal)
    .map((b) => map[b.id])
    .filter((x): x is PlanItem => Boolean(x));
}

/* ------------------------------------------------------------- education -- */

export type Lesson = { title: string; length: string; because: string };

const LIBRARY: Partial<Record<FactorId, Lesson[]>> = {
  utilization: [
    { title: "How Credit Utilization Works", length: "6 min", because: "Your utilization is your top blocker" },
    { title: "Statement Date vs. Due Date", length: "4 min", because: "Most people pay on time and still report high" },
    { title: "Which Card Should I Pay First?", length: "7 min", because: "One of your cards is at 85%" },
  ],
  collections: [
    { title: "What To Do About a Collection", length: "9 min", because: "You have one open collection" },
    { title: "Pay for Delete: What's Real", length: "5 min", because: "Before you pay anything" },
  ],
  payment: [
    { title: "Recovering From a Late Payment", length: "6 min", because: "One account reported late recently" },
  ],
  inquiries: [
    { title: "Hard vs. Soft Inquiries", length: "4 min", because: "You have inquiries in the last 12 months" },
  ],
  age: [
    { title: "Why Closing a Card Can Hurt", length: "5 min", because: "Your average account age is working against you" },
  ],
  debt: [
    { title: "Debt-to-Income, Explained", length: "8 min", because: "Your total debt load is a blocker" },
  ],
  depth: [
    { title: "Building Credit From Zero", length: "10 min", because: "Your file is still thin" },
  ],
};

const GOAL_LESSON: Partial<Record<GoalId, Lesson>> = {
  home: { title: "Preparing Your Credit for a Mortgage", length: "12 min", because: "Your goal is buying a home" },
  car: { title: "What Auto Lenders Actually Look At", length: "8 min", because: "Your goal is buying a car" },
  business: { title: "Business Credit vs. Personal Credit", length: "11 min", because: "Your goal is business credit" },
  scratch: { title: "Building Credit From Zero", length: "10 min", because: "Your goal is building from scratch" },
  refinance: { title: "Timing a Refinance", length: "9 min", because: "Your goal is refinancing" },
};

export function lessons(p: Profile, goal: GoalId): Lesson[] {
  const out: Lesson[] = [];
  const g = GOAL_LESSON[goal];
  if (g) out.push(g);
  for (const b of blockers(p, goal)) {
    for (const l of LIBRARY[b.id] ?? []) {
      if (!out.some((o) => o.title === l.title)) out.push(l);
    }
  }
  return out.slice(0, 5);
}
