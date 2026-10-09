export type Service = {
  id: string;
  title: string;
  summary: string;
  details: string[];
  /** Optional placeholder note for anything not yet confirmed by Utah First. */
  verify?: string;
};

export const services: Service[] = [
  {
    id: "full-management",
    title: "Full-service management",
    summary:
      "Long-term residential management for single-family homes, townhomes and condos across Washington and Iron County.",
    details: [
      "One local team handles marketing, screening, rent, repairs and reporting.",
      "Licensed, screened and insured vendors, with multiple estimates on repairs.",
      "We do NOT mark up any maintenance. You pay what the contractor charges.",
      "Owners can choose to approve maintenance requests themselves.",
    ],
    verify: "Management fee and any leasing or setup fees: confirm with Utah First before publishing.",
  },
  {
    id: "leasing",
    title: "Leasing and 8-point screening",
    summary:
      "Homes are marketed, shown and leased to applicants who pass an 8-point screening, applied consistently under fair housing law.",
    details: [
      "Screening covers credit, criminal background, rental history and rent-to-income ratio.",
      "Applications run through AppFolio, the same system tenants use to pay rent.",
      "If an eviction is ever needed, Utah First's legal team handles it.",
    ],
  },
  {
    id: "owner-statements",
    title: "Owner statements and payouts",
    summary:
      "See every dollar in the AppFolio owner portal, with a monthly statement and a year-end 1099.",
    details: [
      "Monthly statement emailed with your ACH deposit, or mailed with a check.",
      "Statements, documents and payment history available any time in the owner portal.",
      "A detailed 1099 at year end for your tax preparer.",
    ],
  },
  {
    id: "rent-collection",
    title: "Rent collection",
    summary: "Tenants pay online through the secure AppFolio tenant portal.",
    details: [
      "Rent is due on the 1st of each month.",
      "Rent is late at 5:00 pm on the 5th.",
      "Online payments make collection and owner payouts predictable.",
    ],
  },
  {
    id: "video-documentation",
    title: "Video documentation and inspections",
    summary:
      "Every home is filmed before move-in, then inspected twice a year with a report to the owner.",
    details: [
      "A time-stamped video record of condition before each move-in.",
      "Semi-annual inspections, with a checklist sent to tenants ahead of time.",
      "An inspection report to the owner after every visit.",
    ],
  },
  {
    id: "hoa-management",
    title: "HOA management",
    summary: "Utah First also manages homeowners associations in Southern Utah.",
    details: [
      "Ask for an HOA analysis alongside or instead of a rent analysis.",
    ],
    verify: "HOA service scope and pricing: confirm with Utah First.",
  },
];

export const highlights = [
  { title: "8-point screening", body: "Credit, criminal background, rental history and rent-to-income on every applicant." },
  { title: "Video before every move-in", body: "A recorded walkthrough of each home's condition before a tenant gets the keys." },
  { title: "Twice-yearly inspections", body: "Semi-annual visits with a written report to you after each one." },
  { title: "No maintenance markup", body: "\u201cWe do NOT mark up any maintenance.\u201d Licensed, insured vendors and multiple estimates." },
] as const;
