export type JourneyStep = {
  year: string;
  title: string;
  detail: string;
};

export const journey: JourneyStep[] = [
  {
    year: "2023",
    title: "Started learning programming",
    detail:
      "Wrote the first lines of code. Fell in love with the moment an idea becomes something you can interact with.",
  },
  {
    year: "2024",
    title: "Built first web applications",
    detail:
      "Shipped interactive frontends, learned React properly, and started thinking in components, states and flows.",
  },
  {
    year: "2025",
    title: "Expanded into full-stack development",
    detail:
      "Moved beyond the browser — Node.js, Express, MongoDB, auth, APIs. Built complete products end to end.",
  },
  {
    year: "2026",
    title: "Building production-level applications",
    detail:
      "Focusing on performant, accessible, AI-integrated applications — and pushing into 3D and creative engineering.",
  },
];

export const stats = [
  { value: "10+", label: "PROJECTS" },
  { value: "8+", label: "TECHNOLOGIES" },
  { value: "3+", label: "FULL-STACK APPS" },
  { value: "∞", label: "CURIOSITY" },
];
