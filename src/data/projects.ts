export type Project = {
  id: string;
  index: string;
  title: string;
  category: string;
  oneLiner: string;
  description: string;
  tags: string[];
  role: string;
  timeline: string;
  problem: string;
  solution: string;
  features: string[];
  architecture: { label: string; detail: string }[];
  howItWorks: string[];
  challenges: string;
  result: string;
  accent: string;
  live: string;
  github: string;
  image?: string;
};

export const projects: Project[] = [
  {
    id: "weather-intelligence-dashboard",
    index: "01",
    title: "Weather Intelligence Dashboard",
    category: "AI · Full Stack",
    oneLiner: "AI-powered weather analytics platform.",
    description:
      "A full-stack weather platform that layers AI-generated insights on top of live meteorological data — forecasts, air quality and trends in one dashboard.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Node.js", "MongoDB", "AI API"],
    role: "Frontend + Full Stack",
    timeline: "6 weeks",
    problem:
      "Weather apps show raw numbers, but most people (and teams) need interpretation — what does a 40% rain chance actually mean for their day? There was no layer of plain-language intelligence on top of forecast data.",
    solution:
      "Built a dashboard that pulls live weather data, normalizes it, and runs it through an AI analysis pipeline that generates plain-language briefings, anomaly flags and trend summaries — while keeping every insight traceable to the underlying data.",
    features: [
      "Live weather & 7-day forecast with per-hour breakdown",
      "AI-generated daily briefings in plain language",
      "Air quality index with health guidance",
      "Search by city with autocomplete",
      "Saved locations with persistent storage",
      "Responsive, keyboard-accessible UI",
    ],
    architecture: [
      { label: "Frontend", detail: "Next.js · Server Components · Tailwind" },
      { label: "API Layer", detail: "Next.js API Routes · rate-limited" },
      { label: "Backend", detail: "Node.js / Express micro-service" },
      { label: "Database", detail: "MongoDB (locations, caching)" },
      { label: "External", detail: "Weather API + AI model" },
    ],
    howItWorks: [
      "User searches a city",
      "Weather API request is made",
      "Data is normalized & validated",
      "AI analysis generates insights",
      "Insights are cached & stored",
      "UI updates with briefing",
    ],
    challenges:
      "Keeping AI output honest. The model occasionally over-explained trivial data, so I added a confidence filter and grounded every generated line to a real measurement before showing it.",
    result:
      "A polished, production-ready dashboard that turns raw forecast data into genuinely useful briefings — and a strong demonstration of full-stack + AI integration.",
    accent: "#7C5CFF",
    live: "https://weather-dashboard-coral-kappa.vercel.app/",
    github: "https://github.com/sourabhjoshi/weather-dashboard",
    image: "/images/weather-dashboard.png",
  },
  {
    id: "nova-ai",
    index: "02",
    title: "Nova AI",
    category: "AI · Full Stack",
    oneLiner: "Your AI assistant for everyday tasks.",
    description:
      "A conversational AI assistant app with streaming responses, conversation memory, multi-file upload handling, and task-oriented tool actions — built as a complete full-stack product.",
    tags: ["React", "Node.js", "Express", "MongoDB", "OpenAI", "SSE"],
    role: "Full Stack",
    timeline: "8 weeks",
    problem:
      "Using multiple AI tools means context lives in silos. Nova AI needed to be a single assistant that remembers conversations, streams answers instantly and can act — not just chat.",
    solution:
      "Designed a streaming-first chat architecture: server-sent events push tokens to the UI as they generate, conversation history is stored per user, and tool actions (lookups, formatting, summaries) are dispatched from the server side.",
    features: [
      "Real-time token streaming (SSE)",
      "Persistent conversation memory",
      "Multi-format document & image processing",
      "Typing indicators & pause/resume",
      "Markdown + code rendering with syntax highlighting",
      "Message actions: copy, regenerate, share",
    ],
    architecture: [
      { label: "Frontend", detail: "React · streaming client · Zustand" },
      { label: "API Layer", detail: "Express REST + SSE endpoint" },
      { label: "Backend", detail: "Node.js · prompt pipeline" },
      { label: "Database", detail: "MongoDB (users, sessions)" },
      { label: "External", detail: "LLM provider API" },
    ],
    howItWorks: [
      "User sends a message",
      "Session context is loaded",
      "Prompt is assembled server-side",
      "LLM streams tokens via SSE",
      "UI renders tokens live",
      "Conversation is persisted",
    ],
    challenges:
      "Streaming reliability — dropped connections mid-generation. Solved with an SSE reconnect strategy and buffering partial responses so the UI never froze or duplicated text.",
    result:
      "A fast, dependable AI assistant with real product feel: streaming, memory and useful actions — proving the full pipeline from UI to model.",
    accent: "#34D399",
    live: "https://example.com/nova-ai",
    github: "https://github.com/sourabhjoshi/nova-ai",
    image: "/images/nova-ai.png",
  },
  {
    id: "netflix-clone",
    index: "03",
    title: "Netflix Clone",
    category: "Full Stack · Entertainment",
    oneLiner: "Cinematic movie streaming platform clone.",
    description:
      "A high-performance Netflix streaming application featuring dynamic video trailers, real-time movie categories, custom video player, and optimistic search.",
    tags: ["React", "Tailwind", "TMDB API", "Node.js", "Express", "Vite"],
    role: "Frontend + Full Stack",
    timeline: "4 weeks",
    problem:
      "Replicating the fluid visual feel and low-latency movie catalog experience of streaming giants requires fast video lazy-loading, smooth carousels, and responsive layouts.",
    solution:
      "Built a pixel-perfect, dark-mode streaming UI integrated with live TMDB data feeds, lazy-loaded iframe trailer players, genre filters, and local watchlists.",
    features: [
      "Cinematic hero trailer banner with auto-play preview",
      "Dynamic movie rows with smooth horizontal touch carousels",
      "Modal video player with HD trailer streaming",
      "Optimistic live search and genre filtering",
      "Responsive layout optimized for mobile, tablet, and desktop",
      "Persistent user watchlist & favorites list",
    ],
    architecture: [
      { label: "Frontend", detail: "React · Vite · Tailwind CSS" },
      { label: "State", detail: "Zustand · LocalStorage Persistence" },
      { label: "API Layer", detail: "TMDB REST API with local caching" },
      { label: "Media Player", detail: "HTML5 Video / Embed Player" },
    ],
    howItWorks: [
      "User opens streaming home",
      "TMDB catalog data fetches asynchronously",
      "Hero section previews trending title",
      "User interacts with video rows",
      "Trailer modal opens on title click",
      "User saves title to personal list",
    ],
    challenges:
      "Eliminating poster image loading lag during fast horizontal scrolling. Solved by implementing skeleton loaders, progressive webp images, and image pre-fetching.",
    result:
      "A visually stunning, lightning-fast streaming platform clone demonstrating high UI craft and video integration.",
    accent: "#F87171",
    live: "https://example.com/netflix-clone",
    github: "https://github.com/sourabhjoshi/netflix-clone",
  },
  {
    id: "project-management-system",
    index: "04",
    title: "Project Management System",
    category: "Full Stack · Enterprise",
    oneLiner: "Interactive Kanban boards, sprint tracking & team collaboration workspace.",
    description:
      "An enterprise project management workspace featuring interactive drag-and-drop task boards, sprint analytics, real-time team notifications, and role-based access control.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Node.js", "MongoDB", "Socket.io"],
    role: "Full Stack Developer",
    timeline: "5 weeks",
    problem:
      "Teams often struggle with fragmented communication across multiple task trackers, causing delayed sprint releases and unclear task ownership.",
    solution:
      "Engineered a centralized workspace with real-time WebSocket synchronization so team members see task updates instantly, complete with visual progress metrics and automated activity logs.",
    features: [
      "Drag-and-drop Kanban task boards with custom status columns",
      "Sprint velocity charts and burn-down visual metrics",
      "Real-time team presence and live task updates via WebSockets",
      "Role-based permission access (Admin, Project Manager, Developer)",
      "File attachment management and markdown discussion threads",
      "Automated email notifications for upcoming deadline alerts",
    ],
    architecture: [
      { label: "Frontend", detail: "Next.js · React DnD · Tailwind CSS" },
      { label: "API Layer", detail: "Next.js API Routes · REST endpoints" },
      { label: "Real-time", detail: "Socket.io WebSocket server" },
      { label: "Database", detail: "MongoDB · Mongoose schemas" },
    ],
    howItWorks: [
      "Team creates project & sprint goals",
      "Tasks are assigned with priority & deadlines",
      "Developers move task cards across Kanban columns",
      "Socket.io broadcasts changes live to team members",
      "Analytics engine computes sprint progress",
      "Activity audit log updates automatically",
    ],
    challenges:
      "Handling real-time state collisions when two team members move the same task simultaneously. Resolved by implementing optimistic UI updates with server-side optimistic locking.",
    result:
      "A robust, full-featured enterprise management workspace empowering teams to collaborate effortlessly in real-time.",
    accent: "#38BDF8",
    live: "https://project-management-system-rose-six.vercel.app/dashboard",
    github: "https://github.com/sourabhjoshi/project-management-system",
  },
  {
    id: "fintrack-budget-tracker",
    index: "05",
    title: "FinTrack - Budget Tracker",
    category: "FinTech · Full Stack",
    oneLiner: "Personal finance dashboard, expense tracking & budget analytics.",
    description:
      "A feature-packed personal finance platform providing visual expense breakdowns, recurring subscription alerts, custom savings goals, and multi-currency tracking.",
    tags: ["React", "TypeScript", "Chart.js", "Node.js", "Express", "MongoDB"],
    role: "Full Stack Developer",
    timeline: "4 weeks",
    problem:
      "Manual expense tracking in spreadsheets is tedious, while conventional bank apps lack predictive budgeting tools and multi-account analytics.",
    solution:
      "Created a clean, modern financial dashboard featuring interactive Chart.js visualizations, automated monthly category budgets, income vs expense breakdowns, and instant CSV export.",
    features: [
      "Interactive pie & bar charts for monthly expense breakdowns",
      "Category-based budget threshold alerts and progress rings",
      "Recurring bill tracking with upcoming payment reminders",
      "Multi-currency conversion engine with real-time exchange rates",
      "Transaction search, custom tagging, and date filtering",
      "Secure encrypted user authentication and data privacy",
    ],
    architecture: [
      { label: "Frontend", detail: "React · TypeScript · Chart.js" },
      { label: "Backend", detail: "Node.js · Express REST API" },
      { label: "Database", detail: "MongoDB (encrypted transaction records)" },
      { label: "Security", detail: "JWT Auth · bcrypt password hashing" },
    ],
    howItWorks: [
      "User logs into private dashboard",
      "Adds income & expense transactions",
      "System updates financial analytics charts live",
      "Budget limit progress bars evaluate threshold limits",
      "Upcoming recurring bills trigger alert notifications",
      "User exports monthly report as PDF or CSV",
    ],
    challenges:
      "Ensuring financial calculations and currency conversions remain accurate across complex transaction queries. Solved by implementing server-side decimal math validation and pre-computed monthly aggregations.",
    result:
      "A fast, secure, and visually appealing financial dashboard that gives users complete control over their personal finances.",
    accent: "#FBBF24",
    live: "https://example.com/fintrack",
    github: "https://github.com/sourabhjoshi/fintrack",
  },
];

export const featuredProjectIds = [
  "weather-intelligence-dashboard",
  "nova-ai",
  "netflix-clone",
  "project-management-system",
  "fintrack-budget-tracker",
];
