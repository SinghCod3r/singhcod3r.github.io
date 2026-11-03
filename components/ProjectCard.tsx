"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./Icons";

export interface ProjectData {
  title: string;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  live: string;
  github: string;
  accent: "lime" | "violet" | "coral" | "cyan";
  year: string;
  category: string;
}

export default function ProjectCard({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setCoords({ x: mouseX, y: mouseY });

    const rotX = ((mouseY / rect.height) - 0.5) * -12;
    const rotY = ((mouseX / rect.width) - 0.5) * 12;

    setTilt({ rx: rotX, ry: rotY });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
  };

  const accentColorMap = {
    lime: "#d8ff58",
    violet: "#a786ff",
    coral: "#ff806d",
    cyan: "#7ff3da",
  };

  const accentHex = accentColorMap[project.accent] || "#d8ff58";

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      style={{
        transform: `perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: isHovered ? "transform 0.1s ease-out" : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      className="group relative rounded-2xl sm:rounded-3xl border border-white/15 bg-[#121316]/60 backdrop-blur-[30px] saturate-[190%] shadow-[0_15px_40px_rgba(0,0,0,0.35)] overflow-hidden flex flex-col justify-between [transform-style:preserve-3d] min-h-0 sm:min-h-[580px] active:scale-[0.99] transition-transform"
    >
      {/* Dynamic Specular Border & Light Reflection */}
      <div
        className="pointer-events-none absolute inset-0 z-20 rounded-2xl sm:rounded-3xl transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.18), transparent 70%)`,
        }}
      />

      {/* 1px Specular Border Highlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-[1px] rounded-2xl sm:rounded-3xl z-10 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, ${accentHex}90, transparent 65%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />

      {/* Top Preview Image with Elevated translateZ */}
      <div className="relative w-full h-[175px] sm:h-[270px] overflow-hidden bg-black/40 [transform:translateZ(30px)]">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/40 to-transparent" />

        {/* Index & Category Badges */}
        <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 z-10 flex items-center justify-between text-xs font-mono">
          <span
            className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/20 bg-black/60 backdrop-blur-md text-[11px] sm:text-xs font-medium"
            style={{ color: accentHex }}
          >
            {project.category}
          </span>
          <span className="text-[#989c99] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] sm:text-xs">
            0{index + 1}
          </span>
        </div>
      </div>

      {/* Content Area with Elevated translateZ */}
      <div className="p-4 sm:p-7 flex-1 flex flex-col justify-between [transform:translateZ(45px)]">
        <div>
          <div className="flex items-baseline justify-between mb-1.5 sm:mb-2">
            <h3 className="text-xl sm:text-2xl font-display font-semibold tracking-tight text-[#f0f0e9] group-hover:text-white transition-colors">
              {project.title}
            </h3>
            <span className="text-[11px] sm:text-xs font-mono text-[#989c99]">{project.year}</span>
          </div>

          <p className="text-[11px] sm:text-xs font-mono mb-2 sm:mb-3 tracking-wide" style={{ color: accentHex }}>
            {project.tagline}
          </p>

          <p className="text-xs sm:text-sm text-[#989c99] leading-relaxed line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-6 font-light">
            {project.description}
          </p>
        </div>

        {/* Bottom Tags & Action Links */}
        <div className="space-y-3 sm:space-y-5 pt-3 sm:pt-4 border-t border-white/10 [transform:translateZ(35px)]">
          {/* Tech Pills */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border border-white/10 bg-white/[0.03] text-[#f0f0e9]/80"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-xs font-mono font-medium transition-all duration-200 border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/15 text-[#f0f0e9]"
            >
              <span>Live Deployment</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.title} source code`}
              className="inline-flex items-center justify-center p-2 sm:p-2.5 rounded-full transition-all duration-200 border border-white/20 hover:border-[#d8ff58] bg-white/5 hover:bg-[#d8ff58]/10 text-[#f0f0e9] hover:text-[#d8ff58]"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
