export type SkillGroup = {
  group: string;
  items: { name: string; usedIn: string }[];
};

/**
 * Skills are grouped by discipline — no meaningless percentages.
 * `usedIn` references real projects from src/data/projects.ts (hover to see).
 */
export const skillGroups: SkillGroup[] = [
  {
    group: "Frontend",
    items: [
      { name: "HTML", usedIn: "Every project" },
      { name: "CSS", usedIn: "Every project" },
      { name: "JavaScript", usedIn: "Every project" },
      { name: "React", usedIn: "Genie AI · Netflix AI · SMS" },
      { name: "Next.js", usedIn: "Weather Dashboard · Portfolio" },
      { name: "Tailwind", usedIn: "Weather Dashboard · Portfolio" },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", usedIn: "Genie AI · SMS · Weather API" },
      { name: "Express", usedIn: "Genie AI · Student System" },
      { name: "MongoDB", usedIn: "Genie AI · Student System" },
      { name: "REST API", usedIn: "Student System · Weather" },
      { name: "Auth / JWT", usedIn: "Student Management System" },
    ],
  },
  {
    group: "AI",
    items: [
      { name: "AI Integrations", usedIn: "Weather Dashboard · Genie AI" },
      { name: "Prompt Engineering", usedIn: "Weather Dashboard · Genie AI" },
      { name: "Embeddings", usedIn: "Netflix AI" },
      { name: "Streaming (SSE)", usedIn: "Genie AI" },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git", usedIn: "Every project" },
      { name: "GitHub", usedIn: "Every project" },
      { name: "VS Code", usedIn: "Daily driver" },
      { name: "Figma", usedIn: "UI design & mockups" },
      { name: "Three.js", usedIn: "Portfolio Experience" },
    ],
  },
];
