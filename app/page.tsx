"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowUpRight, ArrowDown, FileText } from "lucide-react";

import IntroLoader from "@/components/IntroLoader";
import AuroraCanvas from "@/components/AuroraCanvas";
import KineticHeroName from "@/components/KineticHeroName";
import { SectionDividerConnector } from "@/components/SectionConnector";
import ProjectCard, { ProjectData } from "@/components/ProjectCard";
import VelocityRibbon from "@/components/VelocityRibbon";
import PortraitCard from "@/components/PortraitCard";
import TechStackGrid from "@/components/TechStackGrid";
import ContactCard from "@/components/ContactCard";
import KineticFooter from "@/components/KineticFooter";

gsap.registerPlugin(ScrollTrigger);

const projectsData: ProjectData[] = [
  {
    title: "Printer Support Resolver",
    tagline: "Linux device driver resolver & capability pipeline",
    description: "A fast Linux tool that matches printers to the right driver in seconds using SQLite indexing and IEEE 1284 IDs, preventing system freezes.",
    image: "/psr.png",
    tags: ["Python", "SQLite", "CUPS", "PPD", "Pytest"],
    live: "https://github.com/SinghCod3r/printer-support-resolver",
    github: "https://github.com/SinghCod3r/printer-support-resolver",
    accent: "lime",
    year: "2025",
    category: "Linux & Systems",
  },
  {
    title: "Ezy Scripting Language",
    tagline: "Deterministic interpreter & automation runtime",
    description: "A programming language written from scratch in Python with an indentation-aware lexer, recursive-descent parser, AST, and CLI REPL.",
    image: "/ezy_page_image.png",
    tags: ["Python", "AST", "Lexer/Parser", "Pytest", "CLI"],
    live: "https://singhcod3r.github.io/ezy/",
    github: "https://github.com/SinghCod3r/ezy",
    accent: "violet",
    year: "2025",
    category: "Languages & Runtimes",
  },
  {
    title: "Aura AI Diagnostics",
    tagline: "Clinical review interface for doctors",
    description: "A clean medical web interface for reviewing patient test records, spotting health trends, and viewing vital health charts.",
    image: "/Aurai_landing.png",
    tags: ["Next.js 15", "TypeScript", "Tailwind", "Python", "PyTorch"],
    live: "https://github.com/SinghCod3r",
    github: "https://github.com/SinghCod3r",
    accent: "coral",
    year: "2025",
    category: "Full Stack Web",
  },
  {
    title: "MoodBite Gastronomy",
    tagline: "Personalized healthy meal finder",
    description: "A friendly web app that recommends wholesome meals based on your mood, daily energy, and routine.",
    image: "/moodbite_landing_page.png",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    live: "https://github.com/SinghCod3r",
    github: "https://github.com/SinghCod3r",
    accent: "lime",
    year: "2024",
    category: "Full Stack Web",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    const reqId = requestAnimationFrame(raf);

    // GSAP Kinetic Reveal for Hero Tagline Words
    const words = gsap.utils.toArray<HTMLElement>(".hero-tagline-word");
    if (words.length > 0) {
      gsap.fromTo(
        words,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.9,
          delay: 0.65,
          ease: "power3.out",
        }
      );
    }

    // GSAP Subtle Fade for Supporting Action Buttons
    gsap.fromTo(
      ".hero-fade",
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.95,
        ease: "power3.out",
      }
    );

    // Bidirectional GSAP ScrollTrigger reveals on sections
    const reveals = gsap.utils.toArray<HTMLElement>(".reveal-element");
    reveals.forEach((el) => {
      gsap.fromTo(
        el,
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      cancelAnimationFrame(reqId);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const taglineWords = ["Building", "open-source", "software", "&", "developer", "tools."];

  return (
    <main className="relative min-h-screen w-full bg-[#07080a] text-[#f0f0e9] overflow-x-hidden selection:bg-[#d8ff58] selection:text-[#0c0d0e]">
      {/* 1. Apple 'Hello'-style Calligraphic Intro Loader */}
      <IntroLoader />

      {/* 2. Fluid Liquid Silk Aurora Canvas */}
      <AuroraCanvas />

      {/* 3. Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl border-b border-white/10 bg-[#07080a]/65 transition-all duration-300">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-12 lg:px-16 2xl:px-20 h-16 sm:h-20 flex items-center justify-between">
          <a
            href="#hero"
            className="group flex items-center gap-1.5 text-lg sm:text-xl font-display font-bold tracking-tight text-[#f0f0e9]"
            aria-label="SinghCod3r Home"
          >
            <span>Singh</span>
            <span className="text-[#d8ff58] transition-all">Cod3r</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest text-[#989c99]">
            <a href="#about" className="hover:text-[#d8ff58] transition-colors">About</a>
            <a href="#projects" className="hover:text-[#d8ff58] transition-colors">Projects</a>
            <a href="#signal" className="hover:text-[#d8ff58] transition-colors">Speaking</a>
            <a href="#stack" className="hover:text-[#d8ff58] transition-colors">Tech Stack</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="/Ayush_Singh.pdf"
              download="Ayush_Singh_Resume.pdf"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#d8ff58]/40 bg-[#d8ff58]/10 hover:bg-[#d8ff58] hover:text-[#0c0d0e] text-[#d8ff58] text-[11px] sm:text-xs font-mono tracking-wider transition-all duration-200"
              aria-label="Download Ayush Singh Resume"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download</span>
              <span>Resume</span>
            </a>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full border border-white/20 bg-white/5 hover:bg-[#d8ff58] hover:text-[#0c0d0e] hover:border-[#d8ff58] text-[11px] sm:text-xs font-mono tracking-wider transition-all duration-200"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* 4. MINIMAL HERO SECTION: Spacious, fluid, perfectly fit for mobile */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-[calc(100svh-64px)] sm:min-h-[calc(100vh-80px)] w-full flex flex-col justify-center px-4 sm:px-12 lg:px-16 2xl:px-20 py-8 sm:py-16 max-w-[1720px] mx-auto overflow-hidden [perspective:1000px]"
      >
        <div className="max-w-6xl">
          {/* Large Kinetic Name with Interactive Shape-Changing Letters */}
          <KineticHeroName />

          {/* Minimal Animated Tagline with GSAP Staggered Words */}
          <p className="text-xl sm:text-3xl md:text-5xl font-sans font-light tracking-tight text-[#989c99] leading-snug sm:leading-tight mb-8 sm:mb-12">
            {taglineWords.map((word, i) => (
              <span
                key={i}
                className={`hero-tagline-word inline-block mr-2 sm:mr-3 will-change-transform ${
                  word === "open-source" || word === "tools." ? "text-[#f0f0e9] font-normal" : ""
                }`}
              >
                {word}
              </span>
            ))}
          </p>

          {/* Single Minimal Action */}
          <div className="hero-fade flex items-center gap-3 sm:gap-6">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 sm:gap-3 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-white/10 hover:bg-[#d8ff58] hover:text-[#0c0d0e] text-[#f0f0e9] text-xs font-mono uppercase tracking-wider transition-all duration-300 active:scale-95"
            >
              <span>View Projects</span>
              <ArrowDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-y-0.5 transition-transform" />
            </a>

            <a
              href="#about"
              className="text-xs font-mono uppercase tracking-wider text-[#989c99] hover:text-[#f0f0e9] transition-colors py-2 px-1"
            >
              Learn more →
            </a>
          </div>
        </div>
      </section>

      {/* Velocity-aware Scrolling Ribbon */}
      <VelocityRibbon
        direction={1}
        color="#d8ff58"
        items={[
          "Open Source Developer",
          "Python Tooling",
          "Linux Systems",
          "Clean Architecture",
          "Web Applications",
          "The Linux Foundation",
        ]}
      />

      {/* 5. ABOUT SECTION: Minimal 2-column layout + Pure Circular Portrait */}
      <section
        id="about"
        className="relative w-full py-12 sm:py-24 md:py-36 px-4 sm:px-12 lg:px-16 2xl:px-20 max-w-[1720px] mx-auto overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          {/* Left Column: Pure Circular Portrait with in/out theme shadows */}
          <div className="lg:col-span-5 reveal-element">
            <PortraitCard />
          </div>

          {/* Right Column: Minimal, Human Copy */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#d8ff58] mb-3 sm:mb-4">
              About Me
            </span>

            <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-medium tracking-tight leading-tight text-[#f0f0e9] mb-4 sm:mb-6">
              I build reliable software and contribute to open source.
            </h2>

            <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-[#989c99] leading-relaxed mb-6 sm:mb-8 max-w-2xl font-light">
              <p>
                I&apos;m Ayush, a software developer from Lucknow, India. As an open-source maintainer with The Linux Foundation (OpenPrinting), I investigated desktop UI freezing issues, unblocked event loops with background worker threads, and improved device detection for Ubuntu and Debian users.
              </p>
              <p>
                I also build custom interpreters in Python, design REST APIs, and develop responsive web applications.
              </p>
            </div>

            {/* Clean Proof Points */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="text-lg sm:text-xl font-display font-bold text-[#d8ff58]">Maintainer</div>
                <div className="text-[11px] sm:text-xs font-mono text-[#989c99]">The Linux Foundation</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="text-lg sm:text-xl font-display font-bold text-[#a786ff]">8.62 CGPA</div>
                <div className="text-[11px] sm:text-xs font-mono text-[#989c99]">B.Tech CSE • SRMCEM</div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.02] col-span-2 sm:col-span-1">
                <div className="text-lg sm:text-xl font-display font-bold text-[#7ff3da]">19 APIs</div>
                <div className="text-[11px] sm:text-xs font-mono text-[#989c99]">Shipped at Acxiom</div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              <a
                href="https://github.com/SinghCod3r"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 hover:bg-[#d8ff58] hover:text-[#0c0d0e] text-[#f0f0e9] font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200"
              >
                <span>GitHub Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="/Ayush_Singh.pdf"
                download="Ayush_Singh_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 hover:border-white/50 text-[#f0f0e9] font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-200"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDividerConnector fromLabel="ABOUT" toLabel="PROJECTS" color="#a786ff" />

      {/* 6. PROJECTS SECTION */}
      <section
        id="projects"
        className="relative w-full py-12 sm:py-24 md:py-36 px-4 sm:px-12 lg:px-16 2xl:px-20 max-w-[1720px] mx-auto overflow-hidden"
      >
        <div className="mb-8 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#a786ff] mb-2 block">
            Portfolio
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[#f0f0e9]">
            Selected Projects.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {projectsData.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </section>

      {/* Velocity-aware Scrolling Ribbon (Reverse) */}
      <VelocityRibbon
        direction={-1}
        color="#a786ff"
        items={[
          "Speaker at IIIT Allahabad",
          "Hacktoberfest Super Contributor",
          "Speaker at IIT Kanpur",
          "Medium Engineering Articles",
          "SQLite Caching",
        ]}
      />

      <SectionDividerConnector fromLabel="PROJECTS" toLabel="SPEAKING" color="#ff806d" />

      {/* 7. SPEAKING & COMMUNITY SECTION */}
      <section
        id="signal"
        className="relative w-full py-12 sm:py-24 md:py-36 px-4 sm:px-12 lg:px-16 2xl:px-20 max-w-[1720px] mx-auto overflow-hidden"
      >
        <div className="mb-8 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#ff806d] mb-2 block">
            Speaking &amp; Articles
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[#f0f0e9]">
            Talks &amp; Community.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="group rounded-2xl sm:rounded-3xl border border-white/15 bg-[#121316]/60 hover:bg-[#121316]/90 backdrop-blur-[30px] p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#ff806d]/40 min-h-0 sm:min-h-[340px]">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs font-mono">
                <span className="text-[#ff806d] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#ff806d]/10 border border-[#ff806d]/30 text-[11px] sm:text-xs">
                  Keynote Speaker
                </span>
                <span className="text-[#989c99]">IIIT Allahabad</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-display font-semibold text-[#f0f0e9] group-hover:text-white transition-colors mb-2 sm:mb-3">
                AI Overload: Using AI Wisely in Pull Requests
              </h3>
              <p className="text-xs sm:text-sm text-[#989c99] leading-relaxed font-light">
                Delivered at OOSC 4.0. Shared practical ways developers can use AI assistants responsibly without flooding open-source projects with messy code.
              </p>
            </div>
            <div className="pt-4 sm:pt-6 mt-4 border-t border-white/10 text-xs font-mono text-[#989c99] flex justify-between items-center">
              <span>Aug 2026</span>
              <span className="text-[#ff806d]">↗</span>
            </div>
          </div>

          <div className="group rounded-2xl sm:rounded-3xl border border-white/15 bg-[#121316]/60 hover:bg-[#121316]/90 backdrop-blur-[30px] p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#d8ff58]/40 min-h-0 sm:min-h-[340px]">
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs font-mono">
                <span className="text-[#d8ff58] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#d8ff58]/10 border border-[#d8ff58]/30 text-[11px] sm:text-xs">
                  Speaker &amp; Award
                </span>
                <span className="text-[#989c99]">IIT Kanpur</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-display font-semibold text-[#f0f0e9] group-hover:text-white transition-colors mb-2 sm:mb-3">
                Speaker at OOSC 3.0 &amp; Hacktoberfest Winner
              </h3>
              <p className="text-xs sm:text-sm text-[#989c99] leading-relaxed font-light">
                Awarded Super Contributor by The Linux Foundation (LFC102) for fixing system bugs and improving printer tools across Linux distributions.
              </p>
            </div>
            <div className="pt-4 sm:pt-6 mt-4 border-t border-white/10 text-xs font-mono text-[#989c99] flex justify-between items-center">
              <span>The Linux Foundation</span>
              <span className="text-[#d8ff58]">↗</span>
            </div>
          </div>

          <a
            href="https://medium.com/@Singhcod3r"
            target="_blank"
            rel="noreferrer"
            className="group rounded-2xl sm:rounded-3xl border border-white/15 bg-[#121316]/60 hover:bg-[#121316]/90 backdrop-blur-[30px] p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#a786ff]/40 min-h-0 sm:min-h-[340px]"
          >
            <div>
              <div className="flex items-center justify-between mb-4 sm:mb-6 text-xs font-mono">
                <span className="text-[#a786ff] px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#a786ff]/10 border border-[#a786ff]/30 text-[11px] sm:text-xs">
                  Technical Blog
                </span>
                <span className="text-[#989c99]">Medium</span>
              </div>
              <h3 className="text-lg sm:text-2xl font-display font-semibold text-[#f0f0e9] group-hover:text-[#a786ff] transition-colors mb-2 sm:mb-3">
                Engineering Notes on Medium
              </h3>
              <p className="text-xs sm:text-sm text-[#989c99] leading-relaxed font-light">
                Articles on debugging Linux desktop freezes, building interpreters from scratch, and real-world system engineering.
              </p>
            </div>
            <div className="pt-4 sm:pt-6 mt-4 border-t border-white/10 text-xs font-mono text-[#989c99] flex justify-between items-center">
              <span>@Singhcod3r</span>
              <span className="text-[#a786ff]">↗</span>
            </div>
          </a>
        </div>
      </section>

      <SectionDividerConnector fromLabel="SPEAKING" toLabel="TECH STACK" color="#7ff3da" />

      {/* 8. TECH STACK SECTION */}
      <section
        id="stack"
        className="relative w-full py-12 sm:py-24 md:py-36 px-4 sm:px-12 lg:px-16 2xl:px-20 max-w-[1720px] mx-auto overflow-hidden"
      >
        <div className="mb-8 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#7ff3da] mb-2 block">
            Skills
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-display font-medium tracking-tight text-[#f0f0e9]">
            My Tech Stack.
          </h2>
        </div>

        <TechStackGrid />
      </section>

      <SectionDividerConnector fromLabel="TECH STACK" toLabel="CONTACT" color="#d8ff58" />

      {/* 9. CONTACT SECTION */}
      <section
        id="contact"
        className="relative w-full py-12 sm:py-24 md:py-36 px-4 sm:px-12 lg:px-16 2xl:px-20 max-w-[1720px] mx-auto overflow-hidden"
      >
        <ContactCard />
      </section>

      {/* 10. MASSIVE KINETIC FOOTER */}
      <KineticFooter />
    </main>
  );
}
