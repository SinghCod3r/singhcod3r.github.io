"use client";

import React, { useState, useRef } from "react";
import StackIcon from "tech-stack-icons";

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

export default function TechStackGrid() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = [
    "All",
    "Languages & Systems",
    "Web & Frameworks",
    "Databases",
    "Testing & QA",
    "Workflow & Tooling",
  ];

  const filteredItems =
    activeFilter === "All"
      ? techItems
      : techItems.filter((item) => item.category === activeFilter);

  return (
    <div className="w-full">
      {/* Category Filter Pills - Horizontally scrollable on mobile */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-6 sm:mb-10 overflow-x-auto no-scrollbar pb-2 sm:pb-0 sm:flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono transition-all duration-200 border whitespace-nowrap flex-shrink-0 ${
              activeFilter === cat
                ? "bg-[#d8ff58] text-[#0c0d0e] font-bold border-[#d8ff58] shadow-[0_0_20px_rgba(216,255,88,0.25)]"
                : "border-white/10 bg-white/[0.03] text-[#989c99] hover:text-[#f0f0e9] hover:border-white/25"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 2-Column on Mobile, 3 to 6-Column on Desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-2.5 sm:gap-4">
        {filteredItems.map((item) => (
          <TechCard key={item.name} item={item} />
        ))}
      </div>
    </div>
  );
}
