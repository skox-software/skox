/**
 * Illustrative data for the mockup. None of this is real: the consumer, the
 * partners and every figure are invented. The credit profile here is the same
 * one the engine reads, so the account list and the blockers always agree.
 */
import type { ActionId } from "./engine";

/* ------------------------------------------------------------- consumer -- */

export type Tradeline = {
  id: string;
  name: string;
  kind: "Credit card" | "Auto loan" | "Student loan" | "Collection";
  opened: string;
  balance: number;
  limit?: number;
  onTime: number;
  late: number;
  /** Set when one of the demo's actions rewrites this account. */
  fixedBy?: ActionId;
  fixedBalance?: number;
  says: string;
  saysAfter?: string;
};

export const TRADELINES: Tradeline[] = [
  {
    id: "chase",
    name: "Chase Freedom",
    kind: "Credit card",
    opened: "March 2019",
    balance: 4250,
    limit: 5000,
    onTime: 23,
    late: 1,
    fixedBy: "utilization",
    fixedBalance: 900,
    says: "This card's utilization is one of the biggest factors working against your goal. It is at 85% on its own, and lenders score each card as well as your total.",
    saysAfter: "This card now reports at 18%. It went from your heaviest drag to a healthy account in one statement cycle.",
  },
  {
    id: "capone",
    name: "Capital One Quicksilver",
    kind: "Credit card",
    opened: "August 2021",
    balance: 3180,
    limit: 5500,
    onTime: 41,
    late: 0,
    fixedBy: "utilization",
    fixedBalance: 770,
    says: "At 58% this card is above the range lenders like to see, but it is not your first move. Pay Chase down first.",
    saysAfter: "At 14% this card is comfortably inside the range lenders look for.",
  },
  {
    id: "discover",
    name: "Discover it",
    kind: "Credit card",
    opened: "June 2022",
    balance: 1810,
    limit: 3300,
    onTime: 33,
    late: 0,
    fixedBy: "utilization",
    fixedBalance: 400,
    says: "Perfect payment history. The balance is the only issue here.",
    saysAfter: "Perfect payment history and a low balance. Nothing to do on this account.",
  },
  {
    id: "auto",
    name: "Regions Auto Loan",
    kind: "Auto loan",
    opened: "October 2022",
    balance: 12400,
    onTime: 34,
    late: 1,
    fixedBy: "payment",
    fixedBalance: 12400,
    says: "This is the account that reported 30 days late in June. Installment lates carry more weight than you would expect.",
    saysAfter: "The late payment on this account is now more than twelve months old, and you have reported on time every month since.",
  },
  {
    id: "student",
    name: "Nelnet Student Loan",
    kind: "Student loan",
    opened: "September 2016",
    balance: 6000,
    onTime: 96,
    late: 0,
    says: "Your oldest account and a spotless record. Keep it open — it is doing a lot of quiet work for your average account age.",
  },
  {
    id: "abc",
    name: "ABC Collections",
    kind: "Collection",
    opened: "Reported January 2025",
    balance: 840,
    onTime: 0,
    late: 0,
    fixedBy: "collection",
    fixedBalance: 0,
    says: "Original creditor listed as Orlando Regional Medical. Confirm the amount and the original creditor before you pay anything.",
    saysAfter: "Resolved and removed from your report. This was the item most likely to stop a mortgage file.",
  },
];

export const DISPUTE_REASONS = [
  "This isn't mine",
  "The balance is wrong",
  "I already paid this",
  "The payment history is incorrect",
  "I don't recognize this inquiry",
];

/* ------------------------------------------------- progress and milestones */

export const TIMELINE = [
  { date: "Sep 15", label: "Profile connected", done: true },
  { date: "Oct 1", label: "Utilization dropped", needs: "utilization" as ActionId },
  { date: "Oct 18", label: "Collection resolved", needs: "collection" as ActionId },
  { date: "Nov 3", label: "Reached Almost Qualified", needs: "payment" as ActionId },
];

export const MILESTONES = [
  { label: "Utilization under 50%", needs: "utilization" as ActionId },
  { label: "90 days, no late payments", needs: "payment" as ActionId },
  { label: "No open collections", needs: "collection" as ActionId },
  { label: "Total debt under $20,000", needs: "debt" as ActionId },
  { label: "No new inquiries in 6 months", needs: "inquiries" as ActionId },
];

/* -------------------------------------------------------------- partners -- */

export type Referral = {
  name: string;
  referred: string;
  stage: "Building" | "Improving" | "Almost Qualified" | "Qualified" | "Under Contract";
  moved: boolean;
  lastActive: string;
  consent: boolean;
};

export const REFERRALS: Referral[] = [
  { name: "John D.", referred: "Mar 14", stage: "Qualified", moved: true, lastActive: "Yesterday", consent: true },
  { name: "Maria L.", referred: "Apr 2", stage: "Qualified", moved: true, lastActive: "2 days ago", consent: true },
  { name: "Tasha B.", referred: "Feb 27", stage: "Under Contract", moved: false, lastActive: "Last week", consent: true },
  { name: "Devin R.", referred: "May 9", stage: "Almost Qualified", moved: true, lastActive: "Today", consent: true },
  { name: "Alicia M.", referred: "Jan 30", stage: "Almost Qualified", moved: false, lastActive: "5 days ago", consent: true },
  { name: "Consumer #4471", referred: "Jun 18", stage: "Improving", moved: false, lastActive: "—", consent: false },
  { name: "Ray P.", referred: "Jul 6", stage: "Improving", moved: true, lastActive: "3 days ago", consent: true },
  { name: "Nia F.", referred: "Aug 21", stage: "Building", moved: false, lastActive: "Last month", consent: true },
];

export const PIPELINE = [
  { label: "Referred", value: 54 },
  { label: "Building", value: 18 },
  { label: "Improving", value: 20 },
  { label: "Almost Qualified", value: 9 },
  { label: "Qualified", value: 4 },
  { label: "Under Contract", value: 2 },
  { label: "Closed", value: 1 },
];

/* -------------------------------------------------------- command center -- */

export const KPIS = [
  { label: "Consumers", value: "1,284", delta: "+96 this month" },
  { label: "Active partners", value: "37", delta: "+4 this month" },
  { label: "Newly Qualified", value: "23", delta: "+7 vs. August" },
  { label: "White Glove", value: "61", delta: "4.8% of consumers" },
];

export const STAGE_MIX = [
  { label: "Building", value: 486 },
  { label: "Improving", value: 512 },
  { label: "Almost Qualified", value: 203 },
  { label: "Qualified", value: 83 },
];

export type Opportunity = {
  name: string;
  goal: string;
  stage: string;
  score: number;
  reason: string;
  next: string;
  partner: string;
};

export const OPPORTUNITIES: Opportunity[] = [
  {
    name: "Marcus W.",
    goal: "Buy a home",
    stage: "Almost Qualified",
    score: 94,
    reason: "Wants to buy in 30 days · logged in yesterday · +34 points this month",
    next: "Offer White Glove — profile and timeline both support it",
    partner: "Jane Smith · Century 21",
  },
  {
    name: "Priya N.",
    goal: "Buy a home",
    stage: "Almost Qualified",
    score: 88,
    reason: "One blocker left · opened three lessons this week",
    next: "Send the collections walkthrough, then check back in 14 days",
    partner: "Direct",
  },
  {
    name: "Andre J.",
    goal: "Build business credit",
    stage: "Improving",
    score: 81,
    reason: "Timeline is 60 days · high engagement · stalled on utilization",
    next: "Strategist call — this is a program fit, not a content fit",
    partner: "Direct",
  },
  {
    name: "Carmen V.",
    goal: "Buy a car",
    stage: "Qualified",
    score: 46,
    reason: "Qualified, but timeline is “maybe in two years”",
    next: "Do not contact yet · re-evaluate in 90 days",
    partner: "Luis Ortega · eXp",
  },
];

export const NEXT_BEST_ACTION = [
  { who: "Consumer", what: "Pay Chase Freedom below $1,500 before the Oct 3 statement date" },
  { who: "CreditSnitch", what: "Send the mortgage-prep series and offer a strategist call" },
  { who: "Partner", what: "Contact now — Jane Smith has been waiting on this referral since March" },
  { who: "Re-evaluate", what: "Next credit refresh: October 15" },
];
