"use client";

import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, Play, RefreshCw, CheckCircle2 } from "lucide-react";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";

type CommandOutput = {
  command: string;
  output: string | React.ReactNode;
  time: string;
};

const COMMANDS = ["help", "whoami", "skills", "projects", "contact", "matrix", "clear"] as const;

export default function TerminalModule() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "whoami",
      output: (
        <div className="space-y-1 text-xs">
          <p className="text-amber-400 font-semibold">SOURABH JOSHI // FULL-STACK ARCHITECT</p>
          <p className="text-white/80">Specializing in Next.js, React, Three.js, Node.js & Enterprise Applications.</p>
          <p className="text-emerald-400 font-mono text-[11px]">STATUS: Available for select full-stack & high-impact projects.</p>
        </div>
      ),
      time: "19:42:01",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const clean = cmd.trim().toLowerCase();
    const time = new Date().toLocaleTimeString("en-US", { hour12: false });

    if (clean === "clear") {
      setHistory([]);
      return;
    }

    let result: React.ReactNode = "";

    switch (clean) {
      case "help":
        result = (
          <div className="space-y-1 text-xs font-mono text-white/80">
            <p className="text-amber-400">Available System Commands:</p>
            <p>• <strong className="text-white">whoami</strong> — Display developer background & bio overview</p>
            <p>• <strong className="text-white">skills</strong> — List core engineering stack & tech proficiencies</p>
            <p>• <strong className="text-white">projects</strong> — View featured live projects & flagship modules</p>
            <p>• <strong className="text-white">contact</strong> — Display direct contact details & social uplinks</p>
            <p>• <strong className="text-white">matrix</strong> — Trigger cyber matrix energy pulse</p>
            <p>• <strong className="text-white">clear</strong> — Clear terminal screen buffer</p>
          </div>
        );
        break;

      case "whoami":
        result = (
          <div className="space-y-1 text-xs">
            <p className="text-amber-400 font-semibold">SOURABH JOSHI // FULL-STACK ARCHITECT</p>
            <p className="text-white/80">Building production-grade web applications, AI tools & interactive 3D platforms.</p>
            <p className="text-white/60">Location: India • GitHub: SourabhJoshi1904</p>
          </div>
        );
        break;

      case "skills":
        result = (
          <div className="space-y-2 text-xs font-mono">
            {skillGroups.map((g) => (
              <div key={g.group}>
                <span className="text-amber-400 font-bold">[{g.group.toUpperCase()}]</span>:{" "}
                <span className="text-white/80">{g.items.map((i) => i.name).join(" • ")}</span>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        result = (
          <div className="space-y-1.5 text-xs font-mono">
            <p className="text-amber-400 font-semibold">FEATURED PRODUCTION PROJECTS:</p>
            {projects.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b border-white/10 pb-1">
                <span className="text-white font-medium">{p.title} ({p.category})</span>
                <span className="text-emerald-400 text-[10px]">OPERATIONAL</span>
              </div>
            ))}
          </div>
        );
        break;

      case "contact":
        result = (
          <div className="space-y-1 text-xs font-mono">
            <p className="text-amber-400">PRIMARY CONTACT DETAILS:</p>
            <p>• Email: <a href={`mailto:${site.email}`} className="text-amber-300 underline">{site.email}</a></p>
            <p>• GitHub: <a href="https://github.com/SourabhJoshi1904" target="_blank" className="text-amber-300 underline">SourabhJoshi1904</a></p>
            <p>• Response Time: &lt; 24 hours guaranteed</p>
          </div>
        );
        break;

      case "matrix":
        result = (
          <div className="font-mono text-xs text-emerald-400 animate-pulse">
            [MATRIX PULSE ACTIVE] 01001001 01001110 01001001 01010100 01001001 01000001 01010100 01001001 01001110 01000111...
          </div>
        );
        break;

      default:
        result = (
          <p className="text-red-400 text-xs font-mono">
            Command not recognized: '{clean}'. Type <strong className="text-amber-300">help</strong> to see available commands.
          </p>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: cmd, output: result, time }]);
    setInput("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    executeCommand(input);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-[#07080f]/95 shadow-2xl backdrop-blur-2xl">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-red-500/80" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
            <span className="h-3 w-3 rounded-full bg-green-500/80" />
          </div>
          <span className="h-3.5 w-px bg-white/20" />
          <span className="font-mono text-xs font-medium text-white/70 flex items-center gap-2">
            <TerminalIcon size={13} className="text-amber-400" />
            SOURABH-OS CLI v2.4 (x86_64)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-semibold">
            LIVE SYSTEM
          </span>
        </div>
      </div>

      {/* Preset Quick Command Buttons */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 bg-black/30 px-4 py-2 text-xs">
        <span className="font-mono text-[10px] text-white/40 uppercase">QUICK COMMANDS:</span>
        {COMMANDS.map((cmd) => (
          <button
            key={cmd}
            onClick={() => executeCommand(cmd)}
            className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-medium text-white/80 transition-all hover:border-amber-400/40 hover:bg-amber-400/10 hover:text-amber-300"
          >
            ${cmd}
          </button>
        ))}
      </div>

      {/* Terminal Screen Output Buffer */}
      <div className="p-4 md:p-5 font-mono min-h-[220px] max-h-[320px] overflow-y-auto space-y-4">
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs text-white/50">
              <span className="text-emerald-400">sourabh@portfolio:~$</span>
              <span className="text-white font-semibold">{item.command}</span>
              <span className="ml-auto text-[10px] opacity-40">{item.time}</span>
            </div>
            <div className="pl-4 border-l border-amber-400/30 py-1">
              {item.output}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Terminal Command Input Prompt */}
      <form onSubmit={handleFormSubmit} className="flex items-center gap-2 border-t border-white/10 bg-black/50 px-4 py-3">
        <span className="font-mono text-xs text-amber-400 font-semibold">sourabh@portfolio:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type command ('help', 'skills', 'projects', 'contact')..."
          className="flex-1 bg-transparent font-mono text-xs text-white placeholder:text-white/30 focus:outline-none"
        />
        <button
          type="submit"
          className="flex items-center gap-1 rounded-lg border border-amber-400/30 bg-amber-400/15 px-3 py-1.5 font-mono text-xs text-amber-300 transition-all hover:bg-amber-400/25"
        >
          <Play size={11} />
          EXEC
        </button>
      </form>
    </div>
  );
}
