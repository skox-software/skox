/**
 * Shared building blocks for SKOX preview concepts (app/concepts/<slug>/).
 * Each renders plain class hooks (.concept-bar, .cmp, .est, .ob, .cred,
 * .video …) that the concept's own concept.css styles; none ships CSS.
 */
export { previewMetadata } from "./metadata";
export { sendPreviewLead, money } from "./contact";
export { default as ConceptBar } from "./ConceptBar";
export { default as AskForm } from "./AskForm";
export { default as Compare } from "./Compare";
export { default as Estimate } from "./Estimate";
export { default as OrderBuilder, type OrderItem, type OrderCopy } from "./OrderBuilder";
export { default as Credentials, type Credential, type CredentialMark } from "./Credentials";
export { default as Video } from "./Video";
export { default as Beacon } from "./Beacon";
export { default as Reveal } from "./Reveal";
