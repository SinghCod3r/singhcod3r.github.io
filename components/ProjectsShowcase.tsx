"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink } from "lucide-react";
import ProjectCard, { ProjectData } from "./ProjectCard";
import { GithubIcon } from "./Icons";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsShowcase({ projects }: { projects: ProjectData[] }) {
  const mobileContainerRef = useRef<HTMLDivElement>(null);

  const accentColorMap = {
    lime: "#d8ff58",
    violet: "#a786ff",
    coral: "#ff806d",
    cyan: "#7ff3da",
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = gsap.utils.toArray<HTMLElement>(".mobile-project-scroll-card");
    if (cards.length === 0) return;

    const triggers: ScrollTrigger[] = [];

    // "Come with animation, go with animation too" - Bidirectional smooth entrance & exit
    cards.forEach((card) => {
      const anim = gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
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
  }, [projects]);

  return (
    <div className="w-full">
      {/* ========================================================================= */}
      {/* 1. DESKTOP / LAPTOP VIEW (100% UNCHANGED 4-COLUMN GRID)                    */}
      {/* ========================================================================= */}
      <div className="hidden md:grid md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {projects.map((project, idx) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>

      {/* ========================================================================= */}
      {/* 2. MOBILE VIEW: RICHER SPLIT-CARDS (LARGER IMAGE + 3-4 LINE DESCRIPTION) */}
      {/* ========================================================================= */}
      <div ref={mobileContainerRef} className="flex md:hidden flex-col gap-4 w-full">
        {projects.map((project, idx) => {
          const accentHex = accentColorMap[project.accent] || "#d8ff58";

          return (
            <div
              key={project.title}
              className="mobile-project-scroll-card relative rounded-2xl border border-white/10 bg-[#121316]/80 backdrop-blur-[24px] p-3 sm:p-3.5 flex flex-col min-[340px]:flex-row gap-3 min-[390px]:gap-3.5 overflow-hidden shadow-xl active:scale-[0.99] transition-transform select-none will-change-transform"
              style={{
                boxShadow: `0 10px 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`,
              }}
            >
              {/* Specular accent ambient glow */}
              <div
                className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-40"
                style={{
                  background: `linear-gradient(135deg, ${accentHex}35 0%, transparent 55%)`,
                  mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                  padding: "1px",
                }}
              />

              {/* Left Column: Enlarged Media Preview (~115-130px) */}
              <div className="relative w-full min-[340px]:w-[115px] min-[390px]:w-[130px] h-[140px] min-[340px]:h-[150px] min-[390px]:h-[160px] rounded-xl overflow-hidden bg-black/60 flex-shrink-0 border border-white/10 shadow-inner">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 340px) 100vw, (max-width: 390px) 115px, 130px"
                  className="object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" />

                {/* Index Pill Overlay */}
                <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5">
                  <span
                    className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-white/20 bg-black/80 backdrop-blur-md"
                    style={{ color: accentHex }}
                  >
                    0{idx + 1}
                  </span>
                </div>

                {/* Category & Year Overlay */}
                <div className="absolute bottom-2 left-2 right-2 z-10 flex items-center justify-between text-[9px] font-mono">
                  <span
                    className="px-1.5 py-0.2 rounded bg-black/80 backdrop-blur-md text-[#f0f0e9]"
                  >
                    {project.category.split(" ")[0]}
                  </span>
                  <span className="text-[#989c99] px-1.5 py-0.2 rounded bg-black/80 backdrop-blur-md">
                    {project.year}
                  </span>
                </div>
              </div>

              {/* Right Column: Title, 3-4 Line Description, Tech Tags & Links */}
              <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                <div>
                  {/* Title & Tagline */}
                  <div className="mb-1">
                    <h3 className="text-base font-display font-semibold tracking-tight text-[#f0f0e9]">
                      {project.title}
                    </h3>
                    <p
                      className="text-[11px] font-mono tracking-tight font-medium mt-0.5"
                      style={{ color: accentHex }}
                    >
                      {project.tagline}
                    </p>
                  </div>

                  {/* 3-4 Line Description */}
                  <p className="text-xs text-[#989c99] leading-relaxed line-clamp-3 sm:line-clamp-4 font-light mb-2.5">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[#f0f0e9]/85"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-white/5 bg-white/[0.02] text-[#707471]">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-medium border border-white/20 bg-white/5 active:bg-white/15 text-[#f0f0e9] transition-colors"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3 h-3" style={{ color: accentHex }} />
                  </a>

                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.title} on GitHub`}
                    className="inline-flex items-center justify-center p-1.5 rounded-full border border-white/20 bg-white/5 active:bg-white/15 text-[#f0f0e9] transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
