export type Service = {
  title: string;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    title: "Web Applications",
    description: "Modern, scalable web apps.",
    bullets: ["Full-stack builds", "Auth & data", "Production deployment"],
  },
  {
    title: "Interactive Websites",
    description: "Motion-rich experiences.",
    bullets: ["3D & WebGL", "Scroll storytelling", "Micro-interactions"],
  },
  {
    title: "AI-Powered Products",
    description: "AI integrations and intelligent features.",
    bullets: ["LLM integrations", "Streaming UX", "Prompt pipelines"],
  },
  {
    title: "Dashboard Systems",
    description: "Analytics and management platforms.",
    bullets: ["Data visualization", "Role-based access", "Real-time views"],
  },
  {
    title: "E-commerce",
    description: "Modern storefronts and product experiences.",
    bullets: ["Storefront UI", "Cart & checkout flow", "Performance focus"],
  },
];
