import { company, mainPhone, serviceAreas } from "./site";

export type Faq = { q: string; a: string; placeholder?: boolean };

export const ownerFaqs: Faq[] = [
  {
    q: "How much does property management cost?",
    a: "Fees aren't listed online yet. Ask for current pricing when you request a free rent analysis or call (435) 619-5336.",
    placeholder: true,
  },
  {
    q: "Do you mark up maintenance?",
    a: "No. We do NOT mark up any maintenance. Work goes to licensed, screened and insured contractors, with multiple estimates, and owners can choose to approve requests themselves.",
  },
  {
    q: "How are applicants screened?",
    a: "Every applicant goes through an 8-point screening that covers credit, criminal background, rental history and rent-to-income ratio, applied consistently under fair housing law.",
  },
  {
    q: "How often are homes inspected?",
    a: "Twice a year. Tenants get a checklist ahead of time and the owner gets a report after each inspection. Every home is also video documented before move-in.",
  },
  {
    q: "How do owners get paid?",
    a: "By ACH deposit with an emailed monthly statement, or by mailed check. Statements and documents are always available in the AppFolio owner portal, and owners receive a detailed 1099 at year end.",
  },
  {
    q: "Which areas do you serve?",
    a: `Utah First serves ${serviceAreas.length} communities across Washington and Iron County, including ${serviceAreas
      .filter((a) => ["St. George", "Cedar City", "Washington", "Hurricane", "Ivins", "Santa Clara", "Springdale"].includes(a))
      .join(", ")}. Offices are in St. George and Cedar City.`,
  },
];

export const tenantFaqs: Faq[] = [
  {
    q: "When is rent due?",
    a: "Rent is due on the 1st of each month and is late at 5:00 pm on the 5th. Pay online any time through the AppFolio tenant portal.",
  },
  {
    q: "What do I do in a maintenance emergency after hours?",
    a: `Call ${mainPhone.display} and press 1 for after-hours emergencies. For anything that can wait, submit a non-emergency maintenance request online.`,
  },
  {
    q: "Do you have Spanish-speaking staff?",
    a: `Yes. Hablamos español. Call ${mainPhone.display} or email ${company.email}.`,
  },
];
