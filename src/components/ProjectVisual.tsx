"use client";

import type { ReactNode } from "react";
import { projects } from "@/data/projects";
import {
  CloudSun,
  Bot,
  Play,
  CheckCircle2,
  Kanban,
  TrendingUp,
  CreditCard,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Search,
  Bell,
  Cpu,
  Plus
} from "lucide-react";

/**
 * High-End Glassmorphic Application UI Mockups — ultra-creative, professional,
 * and custom-built for each project's functional domain.
 */

function WindowHeader({ url, title, accent }: { url: string; title: string; accent: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-black/60 backdrop-blur-md px-3.5 py-2 text-xs">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-[9px] text-white/40">{title}</span>
      </div>
      <div className="hidden sm:flex items-center gap-2 rounded-md bg-white/5 px-2.5 py-0.5 font-mono text-[9px] text-white/50 border border-white/5">
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
        {url}
      </div>
      <div className="flex items-center gap-2 text-[9px] font-mono text-white/40">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        LIVE 60FPS
      </div>
    </div>
  );
}

/* 1. Weather Intelligence Dashboard */
function WeatherMock({ accent }: { accent: string }) {
  const hourly = [
    { time: "12 PM", temp: "32°", icon: "☀️", bar: 80 },
    { time: "03 PM", temp: "34°", icon: "🌤️", bar: 95 },
    { time: "06 PM", temp: "29°", icon: "🌧️", bar: 50 },
    { time: "09 PM", temp: "26°", icon: "🌙", bar: 35 },
    { time: "12 AM", temp: "24°", icon: "✨", bar: 25 },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-[#07090e]">
      <WindowHeader url="https://weather.sourabhjoshi.dev" title="METEO INTELLIGENCE v2.4" accent={accent} />
      
      <div className="grid flex-1 grid-cols-1 gap-3 p-3.5 sm:grid-cols-12 overflow-hidden">
        {/* Left Weather Panel */}
        <div className="sm:col-span-5 flex flex-col justify-between rounded-xl bg-white/5 p-3.5 border border-white/10 backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between text-[10px] text-white/60">
              <span className="flex items-center gap-1 font-semibold text-white/80">
                <CloudSun size={12} className="text-amber-400" /> New Delhi, IN
              </span>
              <span className="rounded bg-accent/20 px-1.5 py-0.5 font-mono text-[8px] text-accent border border-accent/30">AQI 42 (GOOD)</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-display text-4xl font-bold tracking-tight text-white">32°C</span>
              <span className="font-body text-xs text-white/60">Partly Sunny</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-[9px]">
            <div className="rounded-lg bg-black/40 p-2 border border-white/5">
              <span className="text-white/40 block">HUMIDITY</span>
              <span className="font-mono text-white font-semibold">64%</span>
            </div>
            <div className="rounded-lg bg-black/40 p-2 border border-white/5">
              <span className="text-white/40 block">WIND SPEED</span>
              <span className="font-mono text-white font-semibold">14 km/h SW</span>
            </div>
          </div>
        </div>

        {/* Right AI Briefing & Hourly Forecast */}
        <div className="sm:col-span-7 flex flex-col justify-between gap-2.5">
          {/* AI Insights Card */}
          <div className="rounded-xl bg-accent/10 p-3 border border-accent/20 backdrop-blur-md">
            <div className="flex items-center justify-between text-[9px] text-accent mb-1.5">
              <span className="flex items-center gap-1 font-mono font-semibold">
                <Sparkles size={11} /> AI WEATHER BRIEFING
              </span>
              <span className="text-[8px] text-emerald-400 font-mono">98.4% Confidence</span>
            </div>
            <p className="text-[10px] text-white/80 leading-relaxed font-body">
              Expect peak temperatures around 3 PM (34°C). Mild precipitation probability at 6 PM. Outdoor activities ideal before 4 PM.
            </p>
          </div>

          {/* Hourly Forecast Bar Chart */}
          <div className="flex-1 rounded-xl bg-white/5 p-3 border border-white/10 flex flex-col justify-between">
            <span className="text-[9px] font-mono text-white/50 tracking-wider">HOURLY PRECIPITATION & TEMP</span>
            <div className="flex items-end justify-between gap-1.5 pt-2">
              {hourly.map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-1 w-full">
                  <span className="text-[8px] text-white/70">{h.temp}</span>
                  <div className="w-full rounded-t bg-white/10 h-10 flex items-end overflow-hidden">
                    <div className="w-full rounded-t bg-accent" style={{ height: `${h.bar}%` }} />
                  </div>
                  <span className="text-[7px] text-white/40">{h.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 2. Nova AI Assistant */
function NovaMock({ accent }: { accent: string }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#08080e]">
      <WindowHeader url="https://nova.sourabhjoshi.dev" title="NOVA AI ASSISTANT 4.0 PRO" accent={accent} />
      
      <div className="grid flex-1 grid-cols-12 gap-0 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden sm:flex col-span-3 flex-col gap-2 border-r border-white/10 bg-black/40 p-2.5 text-[9px]">
          <div className="flex items-center gap-1.5 rounded-lg bg-accent/20 p-2 text-accent border border-accent/30 font-semibold cursor-pointer">
            <Plus size={12} /> New Chat
          </div>
          <div className="mt-2 text-[8px] font-mono text-white/40 px-1">RECENT CHATS</div>
          <div className="space-y-1">
            <div className="rounded-md bg-white/10 p-1.5 text-white/80 font-medium truncate">⚡ Code Optimizer</div>
            <div className="rounded-md bg-transparent hover:bg-white/5 p-1.5 text-white/50 truncate">🌤️ Weather API Pipeline</div>
            <div className="rounded-md bg-transparent hover:bg-white/5 p-1.5 text-white/50 truncate">🚀 Next.js 15 Refactor</div>
          </div>
        </div>

        {/* Main Chat Thread */}
        <div className="col-span-12 sm:col-span-9 flex flex-col justify-between p-3 gap-2.5">
          {/* User Prompt */}
          <div className="flex items-start justify-end gap-2">
            <div className="rounded-2xl rounded-tr-xs bg-accent/80 px-3 py-2 text-[10px] text-white font-body shadow-md max-w-[80%]">
              Optimize this React async data fetch component for streaming.
            </div>
          </div>

          {/* AI Response Card */}
          <div className="flex items-start gap-2 max-w-[90%]">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Bot size={13} />
            </div>
            <div className="rounded-2xl rounded-tl-xs bg-white/5 p-2.5 text-[9px] text-white/85 border border-white/10 backdrop-blur-md space-y-2 w-full">
              <div className="flex items-center justify-between text-[8px] text-white/40 font-mono border-b border-white/10 pb-1">
                <span>NOVA AI STREAMING RESPONDER</span>
                <span className="text-emerald-400 font-mono">340 tokens/sec</span>
              </div>
              <p className="text-[9.5px]">Here is the optimized streaming implementation using Server Components:</p>
              <div className="rounded-lg bg-black/70 p-2 font-mono text-[8px] text-emerald-300 border border-white/5">
                <code>{`export default async function DataStream() {`}</code><br />
                <code className="text-white/60">{`  const data = await fetchStream();`}</code><br />
                <code>{`  return <Suspense fallback={<Loader />}>...`}</code>
              </div>
            </div>
          </div>

          {/* Prompt Bar */}
          <div className="mt-auto flex items-center gap-2 rounded-xl bg-white/5 p-2 border border-white/10 backdrop-blur-md">
            <span className="text-white/40 text-[10px] pl-1 flex-1 font-body">Ask Nova AI anything...</span>
            <div className="flex items-center gap-1">
              <span className="rounded bg-accent p-1.5 text-white text-[9px] font-mono cursor-pointer shadow-sm">
                <Zap size={11} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 3. Netflix Clone */
function NetflixMock({ accent }: { accent: string }) {
  const movies = [
    { title: "INTERSTELLAR", tag: "99% Match", bg: "from-indigo-600 via-purple-900 to-black" },
    { title: "CYBERPUNK", tag: "96% Match", bg: "from-cyan-600 via-blue-900 to-black" },
    { title: "SOLARIS", tag: "94% Match", bg: "from-amber-600 via-red-900 to-black" },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-[#050508]">
      <WindowHeader url="https://netflix.sourabhjoshi.dev" title="NETFLIX CLONE STREAMING UI" accent={accent} />
      
      <div className="flex-1 flex flex-col justify-between p-3 gap-3">
        {/* Featured Hero Movie Banner */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-red-950 via-red-900/40 to-black/80 p-3.5 border border-red-500/20 shadow-xl flex flex-col justify-end min-h-[90px]">
          <div className="absolute top-2 left-3 flex items-center gap-2">
            <span className="font-display font-black text-red-600 text-xs tracking-wider">NETFLIX</span>
            <span className="rounded bg-red-500/20 px-1.5 py-0.5 text-[7px] text-red-400 font-mono border border-red-500/30">ORIGINAL</span>
          </div>

          <div className="mt-4">
            <h4 className="font-display text-base font-bold text-white tracking-wide">DUNE: PART TWO</h4>
            <p className="text-[9px] text-white/70 max-w-sm line-clamp-1 mt-0.5">Paul Atreides unites with Chani and the Fremen while seeking revenge against conspirators.</p>
            
            <div className="mt-2.5 flex items-center gap-2">
              <span className="flex items-center gap-1 rounded bg-white px-2.5 py-1 text-[9px] font-bold text-black shadow-md hover:bg-white/90 cursor-pointer">
                <Play size={10} className="fill-black" /> Play Now
              </span>
              <span className="text-[8px] text-emerald-400 font-mono">98% Match · 4K Ultra HD</span>
            </div>
          </div>
        </div>

        {/* Movie Row */}
        <div>
          <div className="flex items-center justify-between text-[9px] text-white/60 mb-1.5">
            <span className="font-semibold text-white/80 tracking-wide">TRENDING SCI-FI IN INDIA</span>
            <span className="text-[8px] text-red-400 cursor-pointer">Explore All →</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {movies.map((m, i) => (
              <div key={i} className={`relative overflow-hidden rounded-lg bg-gradient-to-b ${m.bg} p-2 border border-white/10 flex flex-col justify-end h-16 shadow-md`}>
                <span className="text-[7px] text-emerald-400 font-mono">{m.tag}</span>
                <span className="text-[8px] font-bold text-white tracking-wider">{m.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* 4. Project Management System */
function PmsMock({ accent }: { accent: string }) {
  const columns = [
    { title: "TO DO", count: 3, task: "API Rate Limiter", priority: "HIGH", color: "#f59e0b" },
    { title: "IN PROGRESS", count: 2, task: "Kanban Drag-Drop UI", priority: "URGENT", color: "#38bdf8" },
    { title: "DONE", task: "Socket.io Integration", count: 5, priority: "RESOLVED", color: "#34d399" },
  ];

  return (
    <div className="flex h-full w-full flex-col bg-[#07090f]">
      <WindowHeader url="https://pms.sourabhjoshi.dev" title="WORKSPACE SPRINT BOARD 04" accent={accent} />
      
      <div className="flex-1 p-3 flex flex-col justify-between gap-2.5">
        {/* Workspace Toolbar */}
        <div className="flex items-center justify-between text-[9px] border-b border-white/10 pb-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 font-bold text-white">
              <Kanban size={12} className="text-sky-400" /> SPRINT BOARD 04
            </span>
            <span className="rounded bg-sky-500/20 px-1.5 py-0.5 font-mono text-[8px] text-sky-300 border border-sky-500/30">84% SPRINT COMPLETE</span>
          </div>
          <div className="flex items-center -space-x-1.5">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[7px] font-bold text-white ring-2 ring-black">AS</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[7px] font-bold text-white ring-2 ring-black">AV</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[7px] font-bold text-white ring-2 ring-black">VM</span>
          </div>
        </div>

        {/* 3 Kanban Columns */}
        <div className="grid flex-1 grid-cols-3 gap-2">
          {columns.map((col, i) => (
            <div key={i} className="flex flex-col justify-between rounded-xl bg-white/5 p-2 border border-white/10 backdrop-blur-md">
              <div>
                <div className="flex items-center justify-between text-[8px] font-bold tracking-wider mb-2" style={{ color: col.color }}>
                  <span>{col.title}</span>
                  <span className="rounded-full bg-white/10 px-1.5 text-white/70 font-mono">{col.count}</span>
                </div>
                <div className="rounded-lg bg-black/50 p-2 border border-white/5 space-y-1.5 shadow-sm">
                  <span className="rounded bg-white/10 px-1 py-0.5 text-[6.5px] font-mono text-white/80">{col.priority}</span>
                  <p className="text-[8.5px] font-semibold text-white/90 leading-tight">{col.task}</p>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between text-[7px] text-white/40 font-mono">
                <span>#TASK-{i + 101}</span>
                <CheckCircle2 size={9} className="text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 5. FinTrack - Budget Tracker */
function FinTrackMock({ accent }: { accent: string }) {
  const bars = [45, 75, 50, 90, 65, 100, 80];

  return (
    <div className="flex h-full w-full flex-col bg-[#090806]">
      <WindowHeader url="https://fintrack.sourabhjoshi.dev" title="FINTRACK DASHBOARD & ANALYTICS" accent={accent} />
      
      <div className="flex-1 p-3 flex flex-col justify-between gap-2.5">
        {/* Top Balance Header */}
        <div className="flex items-center justify-between rounded-xl bg-amber-500/10 p-2.5 border border-amber-500/20 backdrop-blur-md">
          <div>
            <span className="text-[8px] font-mono text-amber-400/80 block">TOTAL LIQUID BALANCE</span>
            <span className="font-display text-xl font-bold text-white">$24,850.00</span>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 font-mono text-[8px] text-emerald-400 border border-emerald-500/30 font-semibold">
            <TrendingUp size={10} /> +14.2% Growth
          </span>
        </div>

        {/* Analytics split: Bar chart & Spending Circle */}
        <div className="grid flex-1 grid-cols-12 gap-2">
          {/* Chart */}
          <div className="col-span-8 rounded-xl bg-white/5 p-2.5 border border-white/10 flex flex-col justify-between">
            <span className="text-[8px] font-mono text-white/50">WEEKLY EXPENSE ANALYTICS</span>
            <div className="flex items-end justify-between gap-1 pt-2 h-16">
              {bars.map((h, i) => (
                <div key={i} className="w-full rounded-t bg-gradient-to-t from-amber-600 to-amber-400" style={{ height: `${h}%` }} />
              ))}
            </div>
          </div>

          {/* Budget Gauge */}
          <div className="col-span-4 rounded-xl bg-white/5 p-2.5 border border-white/10 flex flex-col items-center justify-center text-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-amber-400 bg-amber-400/10 text-amber-400 font-bold font-mono text-[10px] shadow-[0_0_15px_rgba(251,191,36,0.3)]">
              68%
            </div>
            <span className="mt-1 text-[7.5px] font-mono text-white/60">BUDGET USED</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ImageMock({ url, title, accent, imageSrc }: { url: string; title: string; accent: string; imageSrc: string }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#06070a] overflow-hidden">
      <WindowHeader url={url} title={title} accent={accent} />
      <div className="relative flex-1 w-full overflow-hidden p-2 sm:p-3 bg-[#08090f] flex items-center justify-center">
        <img
          src={imageSrc}
          alt={title}
          className="max-h-full max-w-full object-contain object-center rounded-lg shadow-lg transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        {/* Subtle glass reflection & inner shadow scrim for depth */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0f]/30 via-transparent to-black/10 opacity-50 transition-opacity duration-500 group-hover:opacity-20" />
      </div>
    </div>
  );
}

const mocks: Record<string, (props: { accent: string }) => ReactNode> = {
  "weather-intelligence-dashboard": WeatherMock,
  "nova-ai": NovaMock,
  "netflix-clone": NetflixMock,
  "project-management-system": PmsMock,
  "fintrack-budget-tracker": FinTrackMock,
};

export default function ProjectVisual({ projectId }: { projectId: string }) {
  const project = projects.find((p) => p.id === projectId);
  
  if (project?.image) {
    return (
      <div
        className="relative h-full w-full overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 120% 90% at 20% 0%, ${project?.accent}22, transparent 55%), #07070a`,
        }}
        aria-hidden
      >
        <ImageMock
          url={`https://${project.id}.sourabhjoshi.dev`}
          title={`${project.title.toUpperCase()} v2.0`}
          accent={project.accent}
          imageSrc={project.image}
        />
      </div>
    );
  }

  const Mock = project ? mocks[project.id] : null;

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: `radial-gradient(ellipse 120% 90% at 20% 0%, ${project?.accent}22, transparent 55%), #07070a`,
      }}
      aria-hidden
    >
      {Mock && <Mock accent={project!.accent} />}
    </div>
  );
}
