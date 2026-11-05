"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import KineticHeroName from "@/components/KineticHeroName";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ========================================================================= */
/* CINEMATIC MINIMAL EDITORIAL HERO                                          */
/* Atmospheric dark photograph as background element                         */
/* Mobile sizing preserved; Laptop sized gracefully; Scroll retains blur     */
/* without darkening/turning black                                           */
/* ========================================================================= */
export default function HeroLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const photoEntranceRef = useRef<HTMLDivElement>(null);
  const photoScrollRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (photoEntranceRef.current) {
        photoEntranceRef.current.style.opacity = "0.9";
      }
      return;
    }

    const tl = gsap.timeline({ delay: 0.15 });

    // 1. Photograph slowly fades in from black on initial page load
    tl.fromTo(
      photoEntranceRef.current,
      {
        opacity: 0,
        scale: 1.03,
      },
      {
        opacity: 0.9,
        scale: 1,
        duration: 1.8,
        ease: "power2.out",
      }
    );

    // 2. Supporting text & understated CTA fade in gently
    tl.fromTo(
      ".hero-editorial-fade",
      {
        y: 18,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.08,
        duration: 0.9,
        ease: "power2.out",
      },
      "-=0.6"
    );

    // 3. Scroll effect: As user scrolls, the background image stays clearly visible and gains a soft blur on desktop
    // On mobile devices, scrubbing CSS filter: blur() causes GPU shader re-rasterization on every touch frame.
    // Disabling blur scrubbing on mobile keeps mobile scrolling at solid 120Hz refresh rate.
    if (photoScrollRef.current && containerRef.current && window.innerWidth >= 768) {
      gsap.fromTo(
        photoScrollRef.current,
        {
          filter: "blur(0px)",
        },
        {
          filter: "blur(9px)",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    setMousePos({ x, y });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-[100svh] bg-[#07080a] overflow-hidden flex flex-col justify-between items-center px-4 sm:px-8 pt-16 sm:pt-20 pb-5 sm:pb-7 select-none"
    >
      {/* 1. Deep Seamless Theme Atmosphere (#07080a) */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[#07080a]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_35%,rgba(216,255,88,0.025)_0%,rgba(167,134,255,0.015)_40%,transparent_75%)]" />

      {/* 2. THE PHOTOGRAPH AS ATMOSPHERIC BACKGROUND ELEMENT */}
      <div
        style={{
          transform: `translate3d(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px, 0)`,
          transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden will-change-transform"
      >
        {/* Entrance Fade Ref: controls initial load fade-in, decoupled from scroll */}
        <div
          ref={photoEntranceRef}
          className="relative w-full h-full flex items-center justify-center opacity-90 transition-opacity"
        >
          {/* Scroll Blur Ref: controls scroll blur without touching opacity or pushing downward */}
          {/* Seamless feathered mask: guarantees zero square box artifacts */}
          <div
            ref={photoScrollRef}
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 72%, transparent 98%)",
            }}
            className="relative w-[125vw] sm:w-[110vw] max-w-[1100px] md:max-w-[850px] lg:max-w-[880px] xl:max-w-[920px] h-[95vh] sm:h-[105vh] md:h-[80vh] lg:h-[80vh] xl:h-[82vh] -top-14 sm:-top-18 md:-top-4 lg:-top-4 xl:-top-4 flex items-center justify-center"
          >
            <Image
              src="/hero_cinematic_silhouette.webp"
              alt="Ayush Singh - Silhouette"
              fill
              priority
              sizes="(max-width: 768px) 125vw, (max-width: 1200px) 880px, 920px"
              className="object-contain object-center filter contrast-[1.12] brightness-[0.98]"
            />
          </div>
        </div>
      </div>

      {/* Full-bleed Edge-to-Edge Top & Bottom Theme Transitions (Zero Bounding Box) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#07080a] via-[#07080a]/75 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-48 bg-gradient-to-t from-[#07080a] via-[#07080a]/80 to-transparent z-10" />

      {/* Top spacer (ensures ample breathing room below the floating Dynamic Island) */}
      <div className="relative z-10 w-full h-8 sm:h-12" />

      {/* 3. HERO TYPOGRAPHY & LOWER POSITIONING (Positioned lower so it does not cover his chin/face) */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center justify-end mt-auto mb-2 sm:mb-5 pt-8 sm:pt-14 text-center">
        {/* ANIMATED EDITORIAL TITLE: AYUSH SINGH */}
        <div className="w-full flex flex-col items-center justify-center select-none px-4">
          <KineticHeroName />
        </div>

        {/* 4. REFINED EDITORIAL SUBTITLE & COPY */}
        <div className="hero-editorial-fade mt-5 sm:mt-7 flex flex-col items-center max-w-lg mx-auto px-4">
          <p className="text-[11px] sm:text-xs font-mono text-[#F2F2EE]/85 tracking-[0.25em] uppercase mb-1.5 font-medium">
            OPEN-SOURCE DEVELOPER
          </p>
          <p className="text-xs sm:text-sm text-[#8c908d] leading-relaxed font-light">
            Building tools, fixing printers, improving Linux.
          </p>

          {/* 5. SINGLE SUBTLE CTA */}
          <a
            href="#projects"
            className="mt-4 sm:mt-5 inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono tracking-wider text-[#F2F2EE] hover:text-[#d8ff58] transition-colors duration-200 group py-1 border-b border-white/20 hover:border-[#d8ff58]"
          >
            <span>VIEW PROJECTS</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      {/* 6. BOTTOM MINIMAL SCROLL PROMPT */}
      <div className="hero-editorial-fade relative z-10 w-full flex flex-col items-center pb-2 text-[#707471]">
        <a
          href="#about"
          className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-[0.22em] text-[#707471] hover:text-[#F2F2EE] transition-colors py-1 group"
        >
          <span>SCROLL</span>
          <span className="transition-transform duration-200 group-hover:translate-y-0.5">↓</span>
        </a>
      </div>
    </section>
  );
}
