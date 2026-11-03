"use client";

import { useEffect, useRef } from "react";

export default function VelocityRibbon({
  items = [
    "OpenPrinting Maintainer",
    "Upstream by Default",
    "The Linux Foundation",
    "Systems & Daemons",
    "Python Runtimes",
    "Deterministic Engines",
    "CUPS / IPP Architecture",
    "GTK Concurrency",
  ],
  direction = 1,
  color = "#d8ff58",
}: {
  items?: string[];
  direction?: 1 | -1;
  color?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(0);
  const speedRef = useRef(1);
  const targetSpeedRef = useRef(1);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // Accelerate proportionally to scroll velocity and flip direction if scrolling backwards
      const velocity = Math.min(Math.abs(delta) * 0.15, 8);
      const scrollDir = delta > 0 ? 1 : delta < 0 ? -1 : 1;

      targetSpeedRef.current = (1 + velocity) * scrollDir * direction;
    };

    const animate = () => {
      // Ease speed towards default
      const defaultSpeed = 1 * direction;
      targetSpeedRef.current += (defaultSpeed - targetSpeedRef.current) * 0.04;
      speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.1;

      positionRef.current -= speedRef.current * 1.2;

      if (trackRef.current) {
        // Reset translation when half-track moves
        const halfWidth = trackRef.current.scrollWidth / 2;
        if (halfWidth > 0) {
          if (positionRef.current <= -halfWidth) {
            positionRef.current += halfWidth;
          } else if (positionRef.current > 0) {
            positionRef.current -= halfWidth;
          }
        }
        trackRef.current.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [direction]);

  // Repeat items for seamless infinite loop
  const repeatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden py-4 border-y border-white/10 bg-white/[0.015] backdrop-blur-sm select-none"
    >
      <div ref={trackRef} className="flex items-center gap-8 whitespace-nowrap will-change-transform">
        {repeatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span
              className="text-lg sm:text-xl lg:text-2xl font-display font-semibold tracking-tight uppercase"
              style={{ color: idx % 2 === 0 ? "#f0f0e9" : color }}
            >
              {item}
            </span>
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        ))}
      </div>
    </div>
  );
}

