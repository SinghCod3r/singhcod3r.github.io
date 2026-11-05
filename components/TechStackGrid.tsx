"use client";

import React, { useState, useRef, useEffect } from "react";
import StackIcon from "tech-stack-icons";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TechItem {
  name: string;
  iconName: string;
  category: "Languages & Systems" | "Web & Frameworks" | "Databases" | "Testing & QA" | "Workflow & Tooling";
  simpleDesc: string;
  brandColor: string;
  experience: string;
}

const techItems: TechItem[] = [
  {
    name: "Python",
    iconName: "python",
    category: "Languages & Systems",
    simpleDesc: "Building tools, system daemons, and interpreters",
    brandColor: "#3776AB",
    experience: "Primary Language",
  },
  {
    name: "GoLang",
    iconName: "go",
    category: "Languages & Systems",
    simpleDesc: "Fast network services and device discovery",
    brandColor: "#00ADD8",
    experience: "Systems & Daemons",
  },
  {
    name: "Java",
    iconName: "java",
    category: "Languages & Systems",
    simpleDesc: "Object-oriented programming and core algorithms",
    brandColor: "#ED8B00",
    experience: "Backend & Systems",
  },
  {
    name: "Next.js 15",
    iconName: "nextjs2",
    category: "Web & Frameworks",
    simpleDesc: "Fast, modern web apps with server components",
    brandColor: "#ffffff",
    experience: "Full Stack Web",
  },
  {
    name: "React",
    iconName: "react",
    category: "Web & Frameworks",
    simpleDesc: "Interactive and smooth user interfaces",
    brandColor: "#61DAFB",
    experience: "Frontend UI",
  },
  {
    name: "Node.js",
    iconName: "nodejs",
    category: "Web & Frameworks",
    simpleDesc: "Lightweight and fast backend REST APIs",
    brandColor: "#5FA04E",
    experience: "API Development",
  },
  {
    name: "Tailwind CSS",
    iconName: "tailwindcss",
    category: "Web & Frameworks",
    simpleDesc: "Clean, responsive, and customizable designs",
    brandColor: "#38BDF8",
    experience: "Styling & Motion",
  },
  {
    name: "MySQL",
    iconName: "mysql",
    category: "Databases",
    simpleDesc: "Organized tables and relational data storage",
    brandColor: "#4479A1",
    experience: "Relational DB",
  },
  {
    name: "SQL",
    iconName: "sql",
    category: "Databases",
    simpleDesc: "Writing clear queries to search and manage data",
    brandColor: "#336791",
    experience: "Data Queries",
  },
  {
    name: "MongoDB",
    iconName: "mongodb",
    category: "Databases",
    simpleDesc: "Flexible document database for modern web apps",
    brandColor: "#47A248",
    experience: "Document DB",
  },
  {
    name: "Pytest",
    iconName: "pytest",
    category: "Testing & QA",
    simpleDesc: "Automated tests to prevent bugs in Python code",
    brandColor: "#0A9EDC",
    experience: "Python Testing",
  },
  {
    name: "Jest",
    iconName: "jest",
    category: "Testing & QA",
    simpleDesc: "Fast unit tests for JavaScript and React components",
    brandColor: "#C21325",
    experience: "JavaScript Testing",
  },
  {
    name: "Playwright",
    iconName: "playwright",
    category: "Testing & QA",
    simpleDesc: "Testing full user journeys in real web browsers",
    brandColor: "#2EAD33",
    experience: "Browser Automation",
  },
  {
    name: "Cypress",
    iconName: "cypress",
    category: "Testing & QA",
    simpleDesc: "Visual testing to make sure web pages work properly",
    brandColor: "#69D3A7",
    experience: "E2E Testing",
  },
  {
    name: "Selenium",
    iconName: "selenium",
    category: "Testing & QA",
    simpleDesc: "Checking web apps across different browsers",
    brandColor: "#43B02A",
    experience: "Cross-Browser QA",
  },
  {
    name: "GitHub Projects",
    iconName: "github",
    category: "Workflow & Tooling",
    simpleDesc: "Managing code changes, code reviews, and releases",
    brandColor: "#f0f0e9",
    experience: "Git & Open Source",
  },
  {
    name: "Jira",
    iconName: "jira",
    category: "Workflow & Tooling",
    simpleDesc: "Planning sprints, tracking tasks, and fixing issues",
    brandColor: "#0052CC",
    experience: "Sprint Planning",
  },
];

function TechCard({ item }: { item: TechItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const rx = ((y / rect.height) - 0.5) * -12;
    const ry = ((x / rect.width) - 0.5) * 12;
    setTilt({ rx, ry });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      className="group relative rounded-xl sm:rounded-2xl border border-white/10 bg-[#121316]/65 hover:bg-[#121316]/95 backdrop-blur-[28px] p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden shadow-lg transition-all duration-300 min-h-[140px] sm:min-h-[175px] active:scale-[0.98]"
    >
      {/* Dynamic Cursor Radial Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl sm:rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(280px circle at ${mousePos.x}px ${mousePos.y}px, ${item.brandColor}25, transparent 70%)`,
        }}
      />

      {/* Top bar: Animated Icon + Tag */}
      <div className="flex items-start justify-between relative z-10 mb-2 sm:mb-3">
        {/* Animated Brand Icon with Glowing Aura */}
        <div className="relative flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl border border-white/10 bg-black/40 backdrop-blur-md p-1.5 sm:p-2.5 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
          {/* Ambient Brand Color Glow */}
          <div
            className="absolute inset-0 rounded-lg sm:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none"
            style={{ backgroundColor: `${item.brandColor}40` }}
          />
          {/* Actual SVG Stack Icon */}
          <div className="relative z-10 w-full h-full flex items-center justify-center">
            {item.iconName === "sql" ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke={item.brandColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full p-0.5"
              >
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            ) : (
              <StackIcon name={item.iconName as any} className="w-full h-full object-contain" />
            )}
          </div>
        </div>

        {/* Small experience badge */}
        <span
          className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#989c99] transition-colors group-hover:text-white"
          style={{ borderColor: isHovered ? `${item.brandColor}60` : "rgba(255,255,255,0.1)" }}
        >
          {item.experience}
        </span>
      </div>

      {/* Content: Title & Simple English Explanation */}
      <div className="relative z-10">
        <h4 className="text-sm sm:text-lg font-display font-semibold text-[#f0f0e9] group-hover:text-white transition-colors flex items-center gap-1.5 sm:gap-2">
          {item.name}
          <span
            className="w-1.5 h-1.5 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100"
            style={{ backgroundColor: item.brandColor }}
          />
        </h4>
        <p className="text-[11px] sm:text-xs text-[#989c99] leading-snug sm:leading-relaxed mt-0.5 sm:mt-1 group-hover:text-[#f0f0e9]/90 transition-colors line-clamp-2">
          {item.simpleDesc}
        </p>
      </div>

      {/* 1px Specular Border Glint on Hover */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(220px circle at ${mousePos.x}px ${mousePos.y}px, ${item.brandColor}80, transparent 70%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
    </div>
  );
}

/* ========================================================================= */
/* TACTILE MOBILE DOMAIN CLUSTERS (SHOW AT ONCE ON SCROLL, MINIMAL SCROLL FATIGUE) */
/* ========================================================================= */
function MobileDomainChip({ item }: { item: TechItem }) {
  return (
    <div
      className="group relative inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] active:bg-white/[0.08] backdrop-blur-md active:scale-95 transition-all select-none shadow-sm"
      style={{
        boxShadow: `0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      {/* Subtle brand glow on touch */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-active:opacity-100 transition-opacity pointer-events-none"
        style={{
          background: `radial-gradient(100px circle at center, ${item.brandColor}20, transparent 75%)`,
        }}
      />

      {/* Brand Icon */}
      <div className="relative flex items-center justify-center w-5 h-5 rounded-md border border-white/10 bg-black/60 p-0.5 flex-shrink-0">
        <div
          className="absolute inset-0 rounded-md opacity-40 blur-xs pointer-events-none"
          style={{ backgroundColor: `${item.brandColor}35` }}
        />
        <div className="relative z-10 w-full h-full flex items-center justify-center">
          {item.iconName === "sql" ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={item.brandColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-full h-full p-0.5"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
          ) : (
            <StackIcon name={item.iconName as any} className="w-full h-full object-contain" />
          )}
        </div>
      </div>

      {/* Info: Name & Experience Badge */}
      <div className="flex items-center gap-1.5 min-w-0">
        <span className="text-xs font-display font-medium text-[#f0f0e9] whitespace-nowrap">
          {item.name}
        </span>
        <span
          className="text-[9px] font-mono px-1.5 py-0.2 rounded-full border border-white/10 bg-black/40 text-[#989c99] whitespace-nowrap"
          style={{ color: item.brandColor }}
        >
          {item.experience.split(" ")[0]}
        </span>
      </div>
    </div>
  );
}

export default function TechStackGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = [
    { label: "All", key: "All" },
    { label: "Languages & Systems", key: "Languages & Systems" },
    { label: "Web & Frameworks", key: "Web & Frameworks" },
    { label: "Databases", key: "Databases" },
    { label: "Testing & QA", key: "Testing & QA" },
    { label: "Workflow & Tooling", key: "Workflow & Tooling" },
  ];

  const domainClusters = [
    {
      name: "Languages & Systems",
      tag: "Core Engineering",
      color: "#3776AB",
      items: techItems.filter((i) => i.category === "Languages & Systems"),
    },
    {
      name: "Web & Frameworks",
      tag: "Frontend & APIs",
      color: "#61DAFB",
      items: techItems.filter((i) => i.category === "Web & Frameworks"),
    },
    {
      name: "Databases & Storage",
      tag: "Relational & Document",
      color: "#4479A1",
      items: techItems.filter((i) => i.category === "Databases"),
    },
    {
      name: "Testing & QA Automation",
      tag: "Unit, E2E & Browser",
      color: "#0A9EDC",
      items: techItems.filter((i) => i.category === "Testing & QA"),
    },
    {
      name: "Workflow & Tooling",
      tag: "Version Control & Agile",
      color: "#f0f0e9",
      items: techItems.filter((i) => i.category === "Workflow & Tooling"),
    },
  ];

  const filteredItems =
    activeFilter === "All"
      ? techItems
      : techItems.filter((item) => item.category === activeFilter);

  const getItemCount = (catKey: string) => {
    return catKey === "All"
      ? techItems.length
      : techItems.filter((item) => item.category === catKey).length;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const clusters = gsap.utils.toArray<HTMLElement>(".mobile-tech-domain-cluster");
    if (clusters.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // "Come with animation, go with animation too" - Bidirectional smooth entrance & exit
    clusters.forEach((cluster) => {
      const anim = gsap.fromTo(
        cluster,
        {
          opacity: 0,
          y: 30,
          scale: 0.96,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: cluster,
            start: "top 88%",
            end: "bottom 12%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      if (anim.scrollTrigger) {
        triggers.push(anim.scrollTrigger);
      }
    });

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. DESKTOP / LAPTOP VIEW (100% UNCHANGED CATEGORY PILLS + 3D TILT GRID)   */}
      {/* ========================================================================= */}
      <div className="hidden md:flex items-center gap-2 mb-10 flex-wrap">
        {categories.map((cat) => {
          const count = getItemCount(cat.key);
          const isActive = activeFilter === cat.key;
          return (
            <button
              key={cat.key}
              onClick={() => setActiveFilter(cat.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 cursor-pointer ${
                isActive
                  ? "bg-[#d8ff58] text-[#0c0d0e] font-bold border-[#d8ff58] shadow-[0_0_20px_rgba(216,255,88,0.25)]"
                  : "border-white/10 bg-white/[0.03] text-[#989c99] hover:text-[#f0f0e9] hover:border-white/25"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-black/25 text-[#0c0d0e]" : "bg-white/10 text-[#989c99]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {filteredItems.map((item) => (
          <TechCard key={item.name} item={item} />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW: 5 DOMAIN CLUSTERS (VISIBLE AT ONCE, BIDIRECTIONAL SCROLL)  */}
      {/* ========================================================================= */}
      <div className="flex md:hidden flex-col gap-3.5 w-full">
        {domainClusters.map((cluster) => (
          <div
            key={cluster.name}
            className="mobile-tech-domain-cluster relative rounded-2xl border border-white/10 bg-[#121316]/75 backdrop-blur-[20px] p-3.5 overflow-hidden shadow-md will-change-transform"
            style={{
              boxShadow: `0 8px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
            }}
          >
            {/* Specular ambient edge glow */}
            <div
              className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-25"
              style={{
                background: `linear-gradient(135deg, ${cluster.color}30 0%, transparent 60%)`,
                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
                padding: "1px",
              }}
            />

            {/* Domain Cluster Header */}
            <div className="flex items-center justify-between mb-2.5 pb-2 border-b border-white/[0.07]">
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px]"
                  style={{ backgroundColor: cluster.color, boxShadow: `0 0 8px ${cluster.color}` }}
                />
                <h3 className="text-xs font-display font-semibold tracking-wide uppercase text-[#f0f0e9]">
                  {cluster.name}
                </h3>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/[0.06] text-[#989c99]">
                  {cluster.items.length}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#989c99]/70 tracking-tight">
                {cluster.tag}
              </span>
            </div>

            {/* Inline Tactile Domain Chips */}
            <div className="flex flex-wrap gap-2">
              {cluster.items.map((item) => (
                <MobileDomainChip key={item.name} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
