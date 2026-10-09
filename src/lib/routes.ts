/** Public pages, used by the sitemap, llms.txt and the build test. /pitch is internal and excluded. */
export const publicRoutes = [
  { path: "/", priority: 1 },
  { path: "/free-rent-analysis/", priority: 0.9 },
  { path: "/st-george/", priority: 0.9 },
  { path: "/cedar-city/", priority: 0.9 },
  { path: "/services/", priority: 0.8 },
  { path: "/residents/", priority: 0.7 },
  { path: "/es/", priority: 0.6 },
] as const;
