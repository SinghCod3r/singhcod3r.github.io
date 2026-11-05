"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, ArrowRight, Layers, Terminal, Sparkles, Filter } from "lucide-react";
import { GithubIcon } from "@/components/Icons";
import { Project } from "@/lib/projects";

interface ProjectsIndexViewProps {
  projects: Project[];
}

export default function ProjectsIndexView({ projects }: ProjectsIndexViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { label: "All", count: projects.length },
    {
      label: "Linux & Systems",
      count: projects.filter((p) => p.category.includes("Linux") || p.category.includes("Open Source")).length,
    },
    {
      label: "Languages & Runtimes",
      count: projects.filter((p) => p.category.includes("Languages")).length,
    },
    {
      label: "Full Stack Web",
      count: projects.filter((p) => p.category.includes("Web")).length,
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory =
      activeCategory === "All" ||
      (activeCategory === "Linux & Systems" &&
        (project.category.includes("Linux") || project.category.includes("Open Source"))) ||
      (activeCategory === "Languages & Runtimes" && project.category.includes("Languages")) ||
      (activeCategory === "Full Stack Web" && project.category.includes("Web"));

    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.tagline.toLowerCase().includes(query) ||
      project.tags.some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const accentColorMap = {
    lime: "#d8ff58",
    violet: "#a786ff",
    coral: "#ff806d",
    cyan: "#7ff3da",
  };

  return (
    <div className="min-h-screen w-full bg-[#07080a] text-[#f0f0e9] selection:bg-[#d8ff58] selection:text-[#0c0d0e]">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-b from-[#d8ff58]/[0.06] via-[#a786ff]/[0.03] to-transparent blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7ff3da]/[0.02] blur-[150px]" />
      </div>

      {/* Top Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#07080a]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#989c99] hover:text-[#f0f0e9] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#d8ff58]" />
            <span>Back to Portfolio</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href="/blog/"
              className="text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-[#f0f0e9] transition-colors"
            >
              Read Blog →
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-10 px-4 sm:px-6 max-w-7xl mx-auto border-b border-white/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-wider bg-[#d8ff58]/10 text-[#d8ff58] border border-[#d8ff58]/20">
            <Terminal className="w-3 h-3" />
            Engineering Projects Archive
          </span>
          <span className="text-xs font-mono text-[#707471]">// {projects.length} Case Studies</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[#f0f0e9] mb-4">
          Engineered for <span className="italic font-serif font-normal text-[#d8ff58]">Scale</span>, Reliability &amp; Speed.
        </h1>

        <p className="text-sm sm:text-base text-[#989c99] max-w-3xl leading-relaxed">
          Detailed technical deep dives covering Linux kernel &amp; device driver architectures, custom language runtimes,
          low-latency voice streaming, and full-stack web applications by Ayush Singh.
        </p>

        {/* Filter Controls */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.label}
                onClick={() => setActiveCategory(cat.label)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all flex items-center gap-2 ${
                  activeCategory === cat.label
                    ? "bg-[#d8ff58] text-[#07080a] font-semibold shadow-md"
                    : "border border-white/10 bg-white/5 text-[#989c99] hover:bg-white/10 hover:text-[#f0f0e9]"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    activeCategory === cat.label ? "bg-black/20 text-[#07080a]" : "bg-white/10 text-[#989c99]"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stack, title, tags..."
              className="w-full pl-9 pr-4 py-1.5 text-xs font-mono rounded-full bg-white/[0.04] border border-white/10 focus:border-[#d8ff58]/50 focus:outline-none text-[#f0f0e9] placeholder-[#707471]"
            />
            <Terminal className="w-3.5 h-3.5 text-[#707471] absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const accentHex = accentColorMap[project.accent] || "#d8ff58";

            return (
              <article
                key={project.slug}
                className="group relative rounded-2xl border border-white/10 bg-[#121316]/70 backdrop-blur-md overflow-hidden hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image container */}
                  <div className="relative w-full h-48 bg-black/60 overflow-hidden border-b border-white/10">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                    <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
                      <span
                        className="font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-white/20 bg-black/80 backdrop-blur-md"
                        style={{ color: accentHex }}
                      >
                        0{idx + 1}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#989c99]">
                        {project.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 z-10">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#d8ff58]">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5">
                    <h2 className="text-xl font-display font-bold tracking-tight text-[#f0f0e9] group-hover:text-[#d8ff58] transition-colors mb-1.5">
                      <Link href={`/projects/${project.slug}/`}>
                        {project.title}
                      </Link>
                    </h2>

                    <p className="text-xs font-mono font-medium mb-3" style={{ color: accentHex }}>
                      {project.tagline}
                    </p>

                    <p className="text-xs text-[#989c99] leading-relaxed line-clamp-3 mb-4">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.03] text-[#f0f0e9]/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Links */}
                <div className="p-5 pt-0 border-t border-white/5 flex items-center justify-between gap-2 mt-auto">
                  <Link
                    href={`/projects/${project.slug}/`}
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-[#f0f0e9] hover:text-[#d8ff58] transition-colors py-2"
                  >
                    <span>Read Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d8ff58] group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <div className="flex items-center gap-2">
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Live Demo for ${project.title}`}
                        className="p-1.5 rounded-full border border-white/10 hover:border-white/30 text-[#989c99] hover:text-[#f0f0e9] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`GitHub source for ${project.title}`}
                        className="p-1.5 rounded-full border border-white/10 hover:border-white/30 text-[#989c99] hover:text-[#f0f0e9] transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 text-center text-xs font-mono text-[#707471]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Ayush Singh (SinghCod3r). Open Source Architecture.</p>
          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#f0f0e9] transition-colors">Home</Link>
            <Link href="/blog/" className="hover:text-[#f0f0e9] transition-colors">Blog</Link>
            <a href="https://github.com/SinghCod3r" target="_blank" rel="noreferrer" className="hover:text-[#f0f0e9] transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
