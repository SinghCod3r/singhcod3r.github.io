"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  Rss,
  Search,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, MediumIcon } from "@/components/Icons";
import { MediumPost } from "@/lib/rss";

interface BlogViewProps {
  initialPosts: MediumPost[];
  isLiveRss: boolean;
}

export default function BlogView({ initialPosts, isLiveRss }: BlogViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const categories = [
    { label: "All", count: initialPosts.length },
    {
      label: "AI & Security",
      count: initialPosts.filter((p) => p.category === "AI & Security").length,
    },
    {
      label: "Open Source",
      count: initialPosts.filter((p) => p.category === "Open Source").length,
    },
    {
      label: "OpenPrinting",
      count: initialPosts.filter((p) => p.category === "OpenPrinting").length,
    },
  ];

  const filteredPosts = initialPosts.filter((post) => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === "" ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesSearch;
  });

  // Entrance animations on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      // 1. Hero elements reveal
      gsap.fromTo(
        ".blog-hero-anim",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        }
      );

      // 2. Filter bar entrance
      gsap.fromTo(
        ".blog-filter-bar",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2,
          ease: "power2.out",
        }
      );

      // 3. Sidebar entrance
      gsap.fromTo(
        ".blog-sidebar-card",
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay: 0.3,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Re-run card stagger animation when filter or search changes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const cards = gsap.utils.toArray<HTMLElement>(".blog-card");
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { y: 20, opacity: 0, scale: 0.985 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.45,
          stagger: 0.06,
          ease: "power2.out",
          overwrite: "auto",
        }
      );
    }
  }, [activeCategory, searchQuery]);

  const handleCardClick = (url: string) => {
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-[#07080a] text-[#f0f0e9] selection:bg-[#d8ff58] selection:text-[#0c0d0e]"
    >
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-b from-[#d8ff58]/[0.05] via-[#a786ff]/[0.02] to-transparent blur-[130px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-[#7ff3da]/[0.02] blur-[140px]" />
      </div>

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#07080a]/85 border-b border-white/[0.08]">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-3">
          {/* Back to Home Link */}
          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] hover:border-[#d8ff58]/40 text-xs sm:text-sm font-mono text-[#f0f0e9] transition-all active:scale-95 shrink-0"
          >
            <ArrowLeft className="w-4 h-4 text-[#d8ff58] transition-transform duration-200 group-hover:-translate-x-1" />
            <span>Portfolio</span>
          </Link>

          {/* Center: Live RSS Feed Status Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/60 text-[11px] font-mono text-[#989c99]">
            <span
              className={`w-2 h-2 rounded-full ${
                isLiveRss
                  ? "bg-[#d8ff58] shadow-[0_0_8px_#d8ff58] animate-pulse"
                  : "bg-[#7ff3da]"
              }`}
            />
            <span className="hidden min-[420px]:inline text-[#f0f0e9] font-medium">
              Medium RSS
            </span>
            <span className="text-white/20 hidden min-[420px]:inline">•</span>
            <a
              href="/blog/rss.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-[#d8ff58] transition-colors"
            >
              <Rss className="w-3 h-3 text-[#d8ff58]" />
              <span className="hidden sm:inline">/blog/rss.xml</span>
              <span className="sm:hidden">RSS Feed</span>
            </a>
          </div>

          {/* Right: Direct Medium Profile Button */}
          <a
            href="https://singhcod3r.medium.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-white/10 bg-white/[0.03] hover:bg-[#d8ff58] text-[#f0f0e9] hover:text-[#07080a] text-xs sm:text-sm font-mono transition-all duration-200 active:scale-95 shrink-0"
          >
            <MediumIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Follow on</span>
            <span>Medium</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-8 py-10 sm:py-16">
        {/* Hero Section */}
        <div className="mb-10 sm:mb-14">
          <div className="blog-hero-anim inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#d8ff58]/30 bg-[#d8ff58]/10 text-[#d8ff58] text-[11px] sm:text-xs font-mono uppercase tracking-widest mb-4">
            <Rss className="w-3.5 h-3.5 text-[#d8ff58]" />
            <span>Live RSS Feed Powered Articles</span>
          </div>

          <h1 className="blog-hero-anim text-3xl sm:text-5xl lg:text-6xl font-display font-medium tracking-tight text-[#f0f0e9] mb-4">
            Technical Writings.
          </h1>

          <p className="blog-hero-anim text-sm sm:text-lg text-[#989c99] max-w-2xl font-light leading-relaxed">
            Real-world systems engineering dispatches syndicated directly from{" "}
            <a
              href="https://singhcod3r.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d8ff58] hover:underline"
            >
              @Singhcod3r on Medium
            </a>
            . Deep dives into Linux driver pipelines, AI agent containment architectures, and open
            source reflections.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="blog-filter-bar flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.label;
              return (
                <button
                  key={cat.label}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`px-3.5 sm:px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 border whitespace-nowrap flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? "bg-[#d8ff58] text-[#07080a] font-bold border-[#d8ff58] shadow-[0_0_20px_rgba(216,255,88,0.2)]"
                      : "border-white/10 bg-white/[0.03] text-[#989c99] hover:text-[#f0f0e9] hover:border-white/25"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? "bg-black/25 text-[#07080a]" : "bg-white/10 text-[#989c99]"
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-[#989c99] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by keyword or tag..."
              className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 hover:border-white/20 focus:border-[#d8ff58] focus:outline-none text-xs font-mono text-[#f0f0e9] placeholder-[#989c99]/50 transition-colors"
            />
          </div>
        </div>

        {/* Two-Column Layout (Post Feed + Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Post Feed Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-5 sm:gap-6">
            {filteredPosts.length === 0 ? (
              <div className="p-8 rounded-2xl border border-white/10 bg-white/[0.02] text-center text-sm font-mono text-[#989c99]">
                No articles found matching &quot;{searchQuery}&quot; in {activeCategory}.
              </div>
            ) : (
              filteredPosts.map((post, idx) => (
                <article
                  key={post.id}
                  onClick={() => handleCardClick(post.mediumUrl)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCardClick(post.mediumUrl);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Read article: ${post.title} on Medium`}
                  className="blog-card group relative rounded-2xl border border-white/10 bg-[#121316]/75 hover:bg-[#121316]/95 backdrop-blur-[24px] p-4 sm:p-6 transition-all duration-300 hover:border-[#d8ff58]/40 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] shadow-xl overflow-hidden cursor-pointer"
                >
                  {/* Ambient edge glow on hover */}
                  <div
                    className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(135deg, ${post.categoryColor}30 0%, transparent 60%)`,
                      mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                      WebkitMaskComposite: "xor",
                      maskComposite: "exclude",
                      padding: "1px",
                    }}
                  />

                  <div className="flex flex-col-reverse sm:flex-row gap-4 sm:gap-6 justify-between items-start">
                    {/* Left Column: Post Meta, Title & Description */}
                    <div className="flex-1 min-w-0">
                      {/* Meta Top: Author, Date, Read Time, Category */}
                      <div className="flex flex-wrap items-center gap-2 mb-2.5 text-xs font-mono text-[#989c99]">
                        <div className="flex items-center gap-1.5 text-[#f0f0e9]">
                          <div className="relative w-4 h-4 rounded-full overflow-hidden border border-white/20">
                            <Image
                              src="/avatar_dynamic_island.webp"
                              alt="Ayush Singh"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium">Ayush Singh</span>
                        </div>
                        <span className="text-white/20">•</span>
                        <span>
                          {post.date}, {post.year}
                        </span>
                        <span className="text-white/20">•</span>
                        <span className="inline-flex items-center gap-1 text-[#989c99]">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                        <span className="text-white/20">•</span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/[0.04]"
                          style={{ color: post.categoryColor }}
                        >
                          {post.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-lg sm:text-xl font-display font-semibold tracking-tight text-[#f0f0e9] group-hover:text-white transition-colors mb-2 leading-snug">
                        <span className="group-hover:text-[#d8ff58] transition-colors underline-offset-4">
                          {post.title}
                        </span>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-xs sm:text-sm text-[#989c99] leading-relaxed line-clamp-3 font-light mb-4">
                        {post.excerpt}
                      </p>

                      {/* Tags & Action Link */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/[0.07]">
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-2 py-0.5 rounded-md border border-white/10 bg-white/[0.02] text-[#989c99]"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-xs font-mono text-[#d8ff58] group-hover:translate-x-1 transition-transform">
                          <span>Read on Medium</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    {/* Right Column: Live RSS Thumbnail */}
                    <div className="relative w-full sm:w-[140px] md:w-[160px] h-[100px] sm:h-[105px] rounded-xl overflow-hidden bg-black/60 border border-white/10 shrink-0 shadow-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.thumbnail}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.src = "/blog/ai-agents-containment.png";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                      <span className="absolute bottom-1.5 right-1.5 text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-md text-[#989c99] border border-white/10">
                        0{idx + 1}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* Sidebar Column (4 cols) */}
          <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-28">
            {/* Author Profile Card */}
            <div className="blog-sidebar-card rounded-2xl border border-white/10 bg-[#121316]/75 backdrop-blur-[24px] p-5 sm:p-6 shadow-xl">
              <div className="flex items-center gap-3.5 mb-4">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-[#d8ff58] shadow-[0_0_15px_rgba(216,255,88,0.25)] shrink-0">
                  <Image
                    src="/avatar_dynamic_island.webp"
                    alt="Ayush Singh"
                    fill
                    sizes="56px"
                    className="object-cover"
                  />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#d8ff58] ring-2 ring-black" />
                </div>
                <div>
                  <h3 className="text-base font-display font-bold text-[#f0f0e9]">
                    Ayush Singh
                  </h3>
                  <p className="text-xs font-mono text-[#d8ff58]">@Singhcod3r</p>
                  <p className="text-[11px] font-mono text-[#989c99] mt-0.5">
                    1 follower · {initialPosts.length} stories
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#989c99] leading-relaxed mb-4 pb-4 border-b border-white/[0.08]">
                Maintainer @TheLinuxFoundation || Open Source Contributor || Hacktoberfest &apos;25
                Super Contributor || Full Stack Engineer
              </p>

              {/* Follow Button */}
              <a
                href="https://singhcod3r.medium.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-mono font-bold bg-[#d8ff58] text-[#07080a] hover:opacity-90 transition-opacity mb-3"
              >
                <MediumIcon className="w-3.5 h-3.5" />
                <span>Follow on Medium</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              {/* RSS Link Pill */}
              <a
                href="/blog/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full text-[11px] font-mono border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] text-[#989c99] hover:text-[#f0f0e9] transition-colors mb-4"
              >
                <Rss className="w-3 h-3 text-[#d8ff58]" />
                <span>Raw RSS Feed (/blog/rss.xml)</span>
              </a>

              {/* Social Link Badges */}
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-white/[0.08]">
                <a
                  href="https://github.com/SinghCod3r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-[#989c99] hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/ayush-singh-46b5a3286/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-[#989c99] hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a
                  href="mailto:singhayush9424@gmail.com"
                  className="p-2 rounded-lg border border-white/10 bg-white/[0.03] hover:bg-white/[0.08] text-[#989c99] hover:text-white transition-colors text-xs font-mono"
                  aria-label="Email"
                >
                  @
                </a>
              </div>
            </div>

            {/* Publication / Publications Ayush Follows */}
            <div className="blog-sidebar-card rounded-2xl border border-white/10 bg-[#121316]/50 backdrop-blur-[20px] p-5 shadow-lg">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#989c99] mb-3">
                Publications Followed
              </h4>
              <div className="flex flex-col gap-2.5 text-xs font-display">
                {[
                  { name: "Code.org", desc: "CS Education" },
                  { name: "The Medium Handbook", desc: "Writing & Publishing" },
                  { name: "Level Up Coding", desc: "Software & Algorithms" },
                  { name: "Level Up", desc: "Tech & Careers" },
                  { name: "The Silent Script", desc: "Engineering Reflections" },
                ].map((pub) => (
                  <div
                    key={pub.name}
                    className="flex items-center justify-between py-1 border-b border-white/[0.04] last:border-0"
                  >
                    <span className="text-[#f0f0e9] font-medium">{pub.name}</span>
                    <span className="text-[10px] font-mono text-[#989c99]">{pub.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 sm:mt-24 border-t border-white/10 py-8 px-4 sm:px-8 text-center text-xs font-mono text-[#989c99]">
        <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © 2026 Ayush Singh. All writings syndicated from{" "}
            <a
              href="https://singhcod3r.medium.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d8ff58] hover:underline"
            >
              Medium
            </a>
            .
          </p>
          <Link
            href="/"
            className="text-[#d8ff58] hover:underline inline-flex items-center gap-1"
          >
            <span>← Return to Portfolio</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
