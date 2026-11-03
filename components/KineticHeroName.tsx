"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface KineticCharProps {
  char: string;
  index: number;
  wordIndex: number;
}

function KineticChar({ char, index, wordIndex }: KineticCharProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [tilt, setTilt] = useState({ scaleY: 1, scaleX: 1, skewX: 0, rot: 0, y: 0 });
  const spanRef = useRef<HTMLSpanElement>(null);

  const handlePointerEnter = () => {
    setIsHovered(true);
    // Playful, elastic shape distortion
    const randomSkew = (Math.random() - 0.5) * 20;
    const randomRot = (Math.random() - 0.5) * 16;
    const stretchMode = Math.random() > 0.5;
    
    setTilt({
      scaleY: stretchMode ? 1.38 : 0.8,
      scaleX: stretchMode ? 0.72 : 1.32,
      skewX: randomSkew,
      rot: randomRot,
      y: -14,
    });
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    // Spring back to resting geometry
    setTilt({ scaleY: 1, scaleX: 1, skewX: 0, rot: 0, y: 0 });
  };

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 700);
  };

  return (
    <span
      ref={spanRef}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onTouchStart={handlePointerEnter}
      onTouchEnd={handlePointerLeave}
      onClick={handleClick}
      style={{
        transform: isClicked
          ? "rotateY(360deg) scale(1.15)"
          : `translate3d(0, ${tilt.y}px, 0) scaleX(${tilt.scaleX}) scaleY(${tilt.scaleY}) skewX(${tilt.skewX}deg) rotate(${tilt.rot}deg)`,
        transition: isHovered
          ? "transform 0.12s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s ease-out, text-shadow 0.15s ease-out"
          : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.4s ease-out, text-shadow 0.4s ease-out",
        textShadow: isHovered
          ? "0 0 28px rgba(216, 255, 88, 0.7), 0 0 50px rgba(216, 255, 88, 0.3)"
          : "none",
      }}
      className={`hero-char inline-block cursor-pointer select-none will-change-transform transition-colors duration-200 ${
        isHovered
          ? "text-[#d8ff58] z-20"
          : wordIndex === 1 && (index === 3 || index === 4)
          ? "text-[#f0f0e9] hover:text-[#d8ff58]"
          : "text-[#f0f0e9]"
      }`}
    >
      {char}
    </span>
  );
}

export default function KineticHeroName() {
  const containerRef = useRef<HTMLHeadingElement>(null);
  const word1 = "AYUSH".split("");
  const word2 = "SINGH".split("");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const chars = gsap.utils.toArray<HTMLElement>(".hero-char");
    if (chars.length === 0) return;

    // Entrance: Physical morphing shape-change from squished liquid disc into upright geometric letterform
    gsap.fromTo(
      chars,
      {
        y: 80,
        scaleY: 0.15,
        scaleX: 1.8,
        rotateX: -45,
        opacity: 0,
      },
      {
        y: 0,
        scaleY: 1,
        scaleX: 1,
        rotateX: 0,
        opacity: 1,
        stagger: 0.045,
        duration: 1.2,
        delay: 0.25,
        ease: "elastic.out(1, 0.55)",
      }
    );
  }, []);

  return (
    <h1
      ref={containerRef}
      className="text-[clamp(2.1rem,7.8vw,9.5rem)] sm:text-[clamp(3.5rem,8.6vw,10.5rem)] font-display font-bold tracking-tight leading-[0.92] sm:leading-[0.88] uppercase mb-5 sm:mb-8 select-none flex flex-wrap items-baseline gap-x-3 sm:gap-x-8 lg:gap-x-12"
      aria-label="Ayush Singh"
    >
      {/* Word 1: AYUSH (guaranteed never to break across lines) */}
      <span className="inline-flex whitespace-nowrap">
        {word1.map((char, i) => (
          <KineticChar key={`w1-${i}`} char={char} index={i} wordIndex={0} />
        ))}
      </span>

      {/* Word 2: SINGH (guaranteed never to break across lines) */}
      <span className="inline-flex whitespace-nowrap">
        {word2.map((char, i) => (
          <KineticChar key={`w2-${i}`} char={char} index={i} wordIndex={1} />
        ))}
      </span>
    </h1>
  );
}

