"use client";

import { useEffect, useState } from "react";

export function SectionDividerConnector({
  fromLabel,
  toLabel,
  color = "#d8ff58",
}: {
  fromLabel?: string;
  toLabel?: string;
  color?: string;
}) {
  return (
    <div className="relative w-full py-12 flex items-center justify-center overflow-hidden pointer-events-none select-none">
      {/* Background ambient beam */}
      <div
        className="absolute h-[1px] w-full max-w-7xl"
        style={{
          background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 20%, ${color}40 50%, rgba(255,255,255,0.08) 80%, transparent 100%)`,
        }}
      />

      {/* Central kinetic pulse node */}
      <div className="relative z-10 flex items-center gap-4 px-6 py-2 rounded-full border border-white/10 bg-[#0c0d0e]/80 backdrop-blur-md text-[11px] font-mono tracking-widest text-[#989c99]">
        {fromLabel && <span className="opacity-70">{fromLabel}</span>}
        <div className="relative flex items-center justify-center w-3 h-3">
          <span
            className="absolute w-2 h-2 rounded-full animate-ping opacity-75"
            style={{ backgroundColor: color }}
          />
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: color }}
          />
        </div>
        {toLabel && <span className="text-[#f0f0e9] font-medium">{toLabel}</span>}
      </div>

      {/* Travelling light pulse particle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-32 h-[2px] blur-[1px] animate-pulse"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </div>
  );
}

export function KineticSideConduit({
  sections = [
    { id: "hero", label: "01 • Origin" },
    { id: "about", label: "02 • About" },
    { id: "projects", label: "03 • Projects" },
    { id: "signal", label: "04 • Speaking" },
    { id: "stack", label: "05 • Tech Stack" },
    { id: "contact", label: "06 • Contact" },
  ],
}: {
  sections?: { id: string; label: string }[];
}) {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollY / docHeight : 0;
      setScrollProgress(progress);

      const sectionEls = sections
        .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
        .filter((item): item is { id: string; el: HTMLElement } => item.el !== null);

      for (let i = sectionEls.length - 1; i >= 0; i--) {
        const rect = sectionEls[i].el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.45) {
          setActiveSection(sectionEls[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  return (
    <aside
      aria-label="Section navigation conduit"
      className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden 2xl:flex flex-col items-center gap-6 pointer-events-auto"
    >
      {/* Vertical background guide line */}
      <div className="relative w-[1px] h-64 bg-white/10 rounded-full overflow-hidden">
        {/* Animated fluid filler */}
        <div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#d8ff58] via-[#a786ff] to-[#ff806d] transition-all duration-300 ease-out"
          style={{ height: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Interactive section nodes */}
      <nav className="flex flex-col gap-4">
        {sections.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              className="group flex items-center gap-3 transition-transform duration-200"
            >
              <span
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-[#d8ff58] ring-4 ring-[#d8ff58]/20 scale-125"
                    : "bg-white/30 group-hover:bg-white/70"
                }`}
              />
              <span
                className={`text-[10px] font-mono tracking-wider transition-all duration-200 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 ${
                  isActive ? "text-[#d8ff58] opacity-90" : "text-[#989c99]"
                }`}
              >
                {sec.label}
              </span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}

