/** Lighthouse results for the demo, from a measured run. null hides the block on /pitch. */
export const demoLighthouse: { scores: { label: string; value: number }[]; note: string } | null = {
  scores: [
    { label: "Performance", value: 91 },
    { label: "Accessibility", value: 100 },
    { label: "Best practices", value: 100 },
    { label: "SEO", value: 100 },
  ],
  note:
    "Lighthouse 13.5, mobile, homepage, Oct 9, 2026, on the static build served with gzip. Mobile performance is 91 to 96 across pages and desktop is 100. SEO is 100 with indexing on; this demo is noindexed on purpose, which drops the live SEO score to 66.",
};
